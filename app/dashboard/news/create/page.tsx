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

export default function CreateNewsPage() {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [shareOption, setShareOption] = React.useState("To Everyone");
  const [content, setContent] = React.useState("");

  const handleSubmit = (e: React.FormEvent, status: "PUBLISHED" | "DRAFT") => {
    e.preventDefault();
    // Simulate save or publish action
    router.push("/dashboard/news");
  };

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header section with back button */}
      <div>
        <Link
          href="/dashboard/news"
          className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white hover:text-primary transition-colors select-none"
        >
          <HiOutlineChevronLeft className="text-2xl font-bold" />
          <span>Create News</span>
        </Link>
      </div>

      <form onSubmit={(e) => handleSubmit(e, "PUBLISHED")} className="flex flex-col gap-6">
        <Card className="p-8 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl shadow-sm flex flex-col gap-6">
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
                className="h-11 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-xs font-semibold rounded-xl"
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
            <div className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col bg-white dark:bg-gray-900">
              {/* Toolbar */}
              <div className="flex items-center gap-1.5 px-6 py-4 border-b border-gray-100 dark:border-gray-800 text-gray-550 dark:text-gray-455 bg-gray-50/20 dark:bg-gray-900/50">
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors"
                >
                  <HiOutlineBold className="font-bold text-base" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors"
                >
                  <HiOutlineItalic className="text-base" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors"
                >
                  <HiOutlineUnderline className="text-base" />
                </button>
                <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-800 mx-2" />
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors"
                >
                  <HiOutlineFaceSmile className="text-base" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors"
                >
                  <HiOutlineLink className="text-base" />
                </button>
                <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-880 mx-2" />
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors"
                >
                  <HiOutlineListBullet className="text-base" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors"
                >
                  <HiOutlineBars3BottomLeft className="text-base" />
                </button>
              </div>

              {/* Textarea */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Input content news"
                rows={14}
                required
                className="p-6 bg-transparent outline-none text-xs font-semibold text-gray-700 dark:text-gray-300 resize-none leading-relaxed placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-4 max-w-xs">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => handleSubmit(e, "DRAFT")}
              className="flex-1 font-bold h-11 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              className="flex-1 font-bold h-11 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 hover:opacity-90"
            >
              Publish
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
