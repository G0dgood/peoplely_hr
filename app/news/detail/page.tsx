"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  HiOutlineChevronRight,
  HiOutlineClock,
  HiOutlineBold,
  HiOutlineItalic,
  HiOutlineUnderline,
  HiOutlineFaceSmile,
  HiOutlineLink,
  HiOutlineListBullet,
  HiOutlineBars3BottomLeft,
} from "react-icons/hi2";
import { DeleteModal } from "@/components/ui/modal";
import { TableActions } from "@/components/ui/table-actions";
import { Suspense } from "react";
import { useGetNewsItemQuery, useDeleteNewsMutation } from "@/store/services/newsApi";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "sonner";

function NewsDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [hasInit, setHasInit] = React.useState(false);

  const { data, isLoading, error: loadError } = useGetNewsItemQuery(id, { skip: !id });
  const [deleteNews, { isLoading: isDeleting, error: deleteError }] = useDeleteNewsMutation();

  useApiError(!!loadError, loadError, "Failed to load news article");
  useApiError(!!deleteError, deleteError, "Failed to delete news article");

  const newsItem = data?.newsItem;

  // Prefill content when article loads
  React.useEffect(() => {
    if (newsItem && !hasInit) {
      setContent(newsItem.content);
      setHasInit(true);
    }
  }, [newsItem, hasInit]);

  const handleDelete = async () => {
    if (!newsItem) return;
    try {
      await deleteNews(newsItem.id).unwrap();
      toast.success(`"${newsItem.title}" deleted successfully!`);
      router.push("/news");
    } catch {
      // error handled by useApiError
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950 animate-pulse">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-7 w-64 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-40 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800" />
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-96" />
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
        <p className="text-sm text-gray-500">News article not found.</p>
        <Link href="/news" className="text-xs font-bold text-primary hover:underline">← Back to News</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {newsItem.title}
          </h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/news" className="hover:text-primary transition-colors cursor-pointer">
              List News
            </Link>
            <HiOutlineChevronRight className="text-[10px] text-gray-300" />
            <span className="text-gray-900 dark:text-white font-bold">Detail</span>
          </div>
        </div>

        <TableActions
          onEdit={() => router.push(`/news/edit?id=${newsItem.id}`)}
          onDelete={() => setShowDeleteModal(true)}
        />
      </div>

      {/* Author & status */}
      <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 -mt-2">
        <div className="flex items-center gap-2">
          {newsItem.authorAvatar ? (
            <Avatar src={newsItem.authorAvatar} size="sm" className="rounded-full w-6 h-6" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-500">
              {newsItem.authorName.charAt(0)}
            </div>
          )}
          <span className="text-gray-700 dark:text-gray-300 font-bold">{newsItem.authorName || "Unknown"}</span>
        </div>

        <span className="text-gray-300 dark:text-gray-700">•</span>

        <div className="flex items-center gap-1.5">
          <HiOutlineClock className="text-sm text-gray-450" />
          <span>{formatDate(newsItem.createdAt)}</span>
        </div>

        <span
          className={`px-2.5 py-0.5 rounded text-[8px] font-bold tracking-wider ${
            newsItem.status === "PUBLISHED"
              ? "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/15 dark:text-[#0FAF7A]"
              : "bg-gray-100 text-gray-450 dark:bg-gray-800 dark:text-gray-500"
          }`}
        >
          {newsItem.status}
        </span>
      </div>

      {/* Content editor card */}
      <Card className="border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-1.5 px-6 py-4 border-b border-gray-300 dark:border-gray-800 text-gray-550 dark:text-gray-455 bg-gray-50/20 dark:bg-gray-900/50">
          <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors">
            <HiOutlineBold className="font-bold text-base" />
          </button>
          <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors">
            <HiOutlineItalic className="text-base" />
          </button>
          <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors">
            <HiOutlineUnderline className="text-base" />
          </button>
          <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-800 mx-2" />
          <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors">
            <HiOutlineFaceSmile className="text-base" />
          </button>
          <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors">
            <HiOutlineLink className="text-base" />
          </button>
          <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-800 mx-2" />
          <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors">
            <HiOutlineListBullet className="text-base" />
          </button>
          <button type="button" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors">
            <HiOutlineBars3BottomLeft className="text-base" />
          </button>
        </div>

        {/* Text body */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={18}
          className="p-4 md:p-8 bg-transparent outline-none text-xs font-semibold text-gray-700 dark:text-gray-300 resize-none leading-relaxed"
        />
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        itemName={newsItem.title}
        title="Delete News Article"
        isLoading={isDeleting}
      />
    </div>
  );
}

export default function NewsDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950 animate-pulse">
        <div className="h-7 w-64 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-96" />
      </div>
    }>
      <NewsDetailContent />
    </Suspense>
  );
}
