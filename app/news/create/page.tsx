"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import {
  HiOutlineChevronLeft,
  HiOutlineBold,
  HiOutlineItalic,
  HiOutlineUnderline,
  HiOutlineFaceSmile,
  HiOutlineLink,
  HiOutlineListBullet,
  HiOutlineBars3BottomLeft,
} from "react-icons/hi2";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useCreateNewsMutation } from "@/store/services/newsApi";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "sonner";

export default function CreateNewsPage() {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const [title, setTitle] = React.useState("");
  const [shareOption, setShareOption] = React.useState("To Everyone");
  const [content, setContent] = React.useState("");
  const [submittingAs, setSubmittingAs] = React.useState<"PUBLISHED" | "DRAFT" | null>(null);

  const [createNews, { isLoading, error: createError }] = useCreateNewsMutation();
  useApiError(!!createError, createError, "Failed to create news article");

  const shareWithMap: Record<string, string> = {
    "To Everyone": "everyone",
    "To Department": "department",
    "To Specific Employees": "specific",
  };

  const handleSubmit = async (status: "PUBLISHED" | "DRAFT") => {
    if (!title.trim()) {
      toast.error("Please enter a title.");
      return;
    }
    setSubmittingAs(status);
    try {
      await createNews({
        title,
        content,
        shareWith: shareWithMap[shareOption] || "everyone",
        status,
        authorName: currentUser?.name || "HR Admin",
        authorAvatar: "",
        companyId,
      }).unwrap();
      toast.success(
        status === "PUBLISHED"
          ? `"${title}" published successfully!`
          : `"${title}" saved as draft!`
      );
      router.push("/news");
    } catch {
      // error handled by useApiError
    } finally {
      setSubmittingAs(null);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header */}
      <div>
        <Link
          href="/news"
          className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white hover:text-primary transition-colors select-none"
        >
          <HiOutlineChevronLeft className="text-xl font-bold" />
          <span>Create News</span>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="p-4 md:p-8 border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl flex flex-col gap-6">
          {/* Title & Share Options */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500">
                Title *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Input news title"
                required
                className="h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500">
                Share *
              </label>
              <Dropdown
                label={shareOption}
                options={["To Everyone", "To Department", "To Specific Employees"]}
                onSelect={(val) => setShareOption(val)}
                className="w-full"
              />
            </div>
          </div>

          {/* Content field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 dark:text-gray-500">
              Content *
            </label>
            <div className="border border-gray-300 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col bg-white dark:bg-gray-900">
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

              {/* Textarea */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Input content news"
                rows={14}
                className="p-6 bg-transparent outline-none text-xs font-semibold text-gray-700 dark:text-gray-300 resize-none leading-relaxed placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-start gap-4 max-w-xs">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => handleSubmit("DRAFT")}
              className="flex-1 font-bold h-11 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {submittingAs === "DRAFT" && isLoading ? "Saving…" : "Save Draft"}
            </Button>
            <Button
              type="button"
              disabled={isLoading}
              onClick={() => handleSubmit("PUBLISHED")}
              className="flex-1 font-bold h-11 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 hover:opacity-90"
            >
              {submittingAs === "PUBLISHED" && isLoading ? "Publishing…" : "Publish"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
