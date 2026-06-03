"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import {
  HiOutlineCalendarDays,
  HiOutlinePlus,
  HiOutlineClock,
  HiOutlineMagnifyingGlass,
  HiOutlineNewspaper,
} from "react-icons/hi2";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { TableActions } from "@/components/ui/table-actions";
import { DeleteModal } from "@/components/ui/modal";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import {
  useGetNewsQuery,
  useDeleteNewsMutation,
  NewsItem,
} from "@/store/services/newsApi";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "sonner";

function NewsRowSkeleton() {
  return (
    <div className="p-6 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-between gap-6 animate-pulse">
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-4 w-56 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded" />
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800" />
          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

export default function NewsListPage() {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const [statusFilter, setStatusFilter] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [itemToDelete, setItemToDelete] = React.useState<NewsItem | null>(null);

  const { data, isLoading, error: loadError } = useGetNewsQuery(
    { companyId },
    { skip: !companyId }
  );
  const [deleteNews, { isLoading: isDeleting, error: deleteError }] = useDeleteNewsMutation();

  useApiError(!!loadError, loadError, "Failed to load news");
  useApiError(!!deleteError, deleteError, "Failed to delete news article");

  const allNews = data?.news || [];

  // Client-side filter (fast, no extra round-trip)
  const filteredNews = allNews.filter((item) => {
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Published" && item.status === "PUBLISHED") ||
      (statusFilter === "Draft" && item.status === "DRAFT");
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(q) ||
      item.authorName.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteNews(itemToDelete.id).unwrap();
      toast.success(`"${itemToDelete.title}" deleted successfully!`);
      setItemToDelete(null);
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

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <PageHeader title="Latest News" description="List News" />

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Dropdown */}
          <Dropdown
            label={statusFilter}
            options={["All", "Published", "Draft"]}
            onSelect={(val) => setStatusFilter(val)}
          />

          {/* Date Range (decorative) */}
          <div className="relative w-64">
            <Input
              readOnly
              value="01 Jan 2023 – Today"
              className="w-full h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl pl-4 pr-10 cursor-default"
            />
            <HiOutlineCalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
          </div>

          {/* Add New */}
          <Link
            href="/news/create"
            className="h-11 px-5 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center gap-2"
          >
            <HiOutlinePlus className="text-sm font-bold" />
            <span>Add New</span>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Input
          placeholder="Search news by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl pl-4 pr-10"
        />
        <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
      </div>

      {/* News List */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <>
            <NewsRowSkeleton />
            <NewsRowSkeleton />
            <NewsRowSkeleton />
          </>
        ) : filteredNews.length === 0 ? (
          <EmptyState
            icon={<HiOutlineNewspaper className="text-3xl text-gray-300" />}
            title="No news articles found"
            description="Create news, announcements, or updates to share with your organization and team members."
            actionLabel="Add News"
            onAction={() => router.push("/news/create")}
          />
        ) : (
          filteredNews.map((item) => (
            <Card
              key={item.id}
              className="p-6 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 rounded-2xl shadow-xs flex items-center justify-between gap-6 hover:shadow-sm transition-all"
            >
              <div className="flex flex-col gap-2 min-w-0">
                <Link
                  href={`/news/detail?id=${item.id}`}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  <h2 className="text-base font-bold text-gray-900 dark:text-white truncate">
                    {item.title}
                  </h2>
                </Link>

                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    {item.authorAvatar ? (
                      <Avatar src={item.authorAvatar} size="sm" className="rounded-full w-5 h-5" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[9px] font-bold text-gray-500">
                        {item.authorName.charAt(0)}
                      </div>
                    )}
                    <span className="text-gray-700 dark:text-gray-300 font-bold">
                      {item.authorName || "Unknown"}
                    </span>
                  </div>

                  <span className="text-gray-300 dark:text-gray-700">•</span>

                  <div className="flex items-center gap-1.5">
                    <HiOutlineClock className="text-sm text-gray-450" />
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Right: status badge + actions */}
              <div className="flex items-center gap-6 shrink-0">
                <span
                  className={`px-2.5 py-0.5 rounded text-[8px] font-bold tracking-wider ${
                    item.status === "PUBLISHED"
                      ? "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/15 dark:text-[#0FAF7A]"
                      : "bg-gray-100 text-gray-450 dark:bg-gray-800 dark:text-gray-500"
                  }`}
                >
                  {item.status}
                </span>

                <TableActions
                  onEdit={() => router.push(`/news/edit?id=${item.id}`)}
                  onDelete={() => setItemToDelete(item)}
                />
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDelete}
        itemName={itemToDelete?.title}
        title="Delete News Article"
        isLoading={isDeleting}
      />
    </div>
  );
}
