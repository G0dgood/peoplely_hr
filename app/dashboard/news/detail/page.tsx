"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  HiOutlineChevronRight,
  HiOutlineClock,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineBold,
  HiOutlineItalic,
  HiOutlineUnderline,
  HiOutlineFaceSmile,
  HiOutlineLink,
  HiOutlineListBullet,
  HiOutlineBars3BottomLeft,
} from "react-icons/hi2";

export default function NewsDetailPage() {
  const [content, setContent] = React.useState(
    `Ladies and Gentlemen:\n\nIt is with great pleasure that I am announcing the promotion of Hugh Gough as one of the new Marketing Directors of InfoTech.\n\nHugh has been with InfoTech for close to ten years, painstakingly climbing the ranks with his dedication and commitment to his work. Three out of those ten years were spent as a marketing manager, where he has shown exemplary performance, as shown in the annual sales and customer retention reports.\n\nHugh has always shown initiative in the performance of his duties, even going above and beyond what is expected of him, in order to ensure that InfoTech delivers quality customer service while producing the expected outputs, well before their respective deadlines. We expect this same level of dedication and commitment to be applied in his new position as one of the heads of the Marketing Department.\n\nAs a Marketing Director, Hugh will be more closely involved in the formulation of marketing plans, with particular focus on the two biggest projects of InfoTech - the Deuz Project and the highly anticipated MegaWide Project, a five-year undertaking expected to launch in the coming year. Of course, these are on top of any other concurrent marketing projects requiring his marketing expertise and leadership.\n\nLet us all congratulate Hughon this promotion, and wish him luck for all his future undertakings.\n\nRegards`
  );

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header section with breadcrumbs and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Promotion Announcement
          </h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Link
              href="/dashboard/news"
              className="hover:text-primary transition-colors cursor-pointer"
            >
              List News
            </Link>
            <HiOutlineChevronRight className="text-[10px] text-gray-300" />
            <span className="text-gray-900 dark:text-white font-bold">Detail</span>
          </div>
        </div>

        {/* Action icons on right */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/news/edit"
            title="Edit news"
            className="w-10 h-10 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-center transition-all bg-white dark:bg-gray-900 shadow-xs cursor-pointer"
          >
            <HiOutlinePencil className="text-base" />
          </Link>

          <button
            title="Delete news"
            className="w-10 h-10 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 flex items-center justify-center transition-all bg-white dark:bg-gray-900 shadow-xs"
          >
            <HiOutlineTrash className="text-base" />
          </button>
        </div>
      </div>

      {/* Author and status bar */}
      <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 -mt-2">
        <div className="flex items-center gap-2">
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
            size="sm"
            className="rounded-full w-6 h-6"
          />
          <span className="text-gray-700 dark:text-gray-300 font-bold">Jakob Geidt</span>
        </div>

        <span className="text-gray-300 dark:text-gray-700">•</span>

        <div className="flex items-center gap-1.5">
          <HiOutlineClock className="text-sm text-gray-450" />
          <span>09 Feb 2023</span>
        </div>

        <span
          className="px-2.5 py-0.5 rounded text-[8px] font-bold tracking-wider bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/15 dark:text-[#0FAF7A]"
        >
          PUBLISHED
        </span>
      </div>

      {/* Rich Text Editor Style Content Card */}
      <Card className="border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm flex flex-col">
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

        {/* Text Body */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={18}
          className="p-8 bg-transparent outline-none text-xs font-semibold text-gray-700 dark:text-gray-300 resize-none leading-relaxed"
        />
      </Card>
    </div>
  );
}
