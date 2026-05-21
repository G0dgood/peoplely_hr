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
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineClock,
  HiOutlineChevronDown,
  HiOutlineMagnifyingGlass,
  HiOutlineNewspaper,
} from "react-icons/hi2";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { TableActions } from "@/components/ui/table-actions";

interface NewsItem {
  id: string;
  title: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  status: "PUBLISHED" | "DRAFT";
}

const INITIAL_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "Promotion Announcement",
    authorName: "Jakob Geidt",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    date: "09 Feb 2023",
    status: "PUBLISHED",
  },
  {
    id: "news-2",
    title: "Security Policy",
    authorName: "Brandon Curtis",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    date: "09 Feb 2023",
    status: "PUBLISHED",
  },
  {
    id: "news-3",
    title: "Use of Company Property Policy",
    authorName: "Madelyn Saris",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    date: "09 Feb 2023",
    status: "PUBLISHED",
  },
  {
    id: "news-4",
    title: "Company Vehicle Policy",
    authorName: "Marilyn Saris",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
    date: "09 Feb 2023",
    status: "DRAFT",
  },
];

export default function NewsListPage() {
  const router = useRouter();
  const [news, setNews] = React.useState<NewsItem[]>(INITIAL_NEWS);
  const [statusFilter, setStatusFilter] = React.useState("Published");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [dateRange, setDateRange] = React.useState("01 Jan 2023 - 10 Mar 2023");

  const handleDelete = (id: string) => {
    setNews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddNew = () => {
    const newArticle: NewsItem = {
      id: `news-${Date.now()}`,
      title: "New Policy Update Announcement",
      authorName: "Jakob Geidt",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
      date: "20 May 2026",
      status: "PUBLISHED",
    };
    setNews((prev) => [newArticle, ...prev]);
  };

  // Filter list
  const filteredNews = news.filter((item) => {
    // Status filter
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Published" && item.status === "PUBLISHED") ||
      (statusFilter === "Draft" && item.status === "DRAFT");

    // Search query filter
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header section with breadcrumbs and filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <PageHeader title="Latest News" description="List News" />

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Dropdown */}
          <Dropdown
            label={statusFilter}
            options={["All", "Published", "Draft"]}
            onSelect={(val) => setStatusFilter(val)}
            className="min-w-[120px]"
          />

          {/* Date Picker Range Input */}
          <div className="relative w-64">
            <Input
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl pl-4 pr-10"
            />
            <HiOutlineCalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
          </div>

          {/* Add New Button */}
          <Link
            href="/dashboard/news/create"
            className="h-11 px-5 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
          >
            <HiOutlinePlus className="text-sm font-bold" />
            <span>Add New</span>
          </Link>
        </div>
      </div>

      {/* Search Bar filter */}
      <div className="relative max-w-md">
        <Input
          placeholder="Search news by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl pl-4 pr-10"
        />
        <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
      </div>

      {/* News Card Grid / List */}
      <div className="flex flex-col gap-4">
        {filteredNews.map((item) => (
          <Card
            key={item.id}
            className="p-6 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 rounded-2xl shadow-xs flex items-center justify-between gap-6 hover:shadow-sm transition-all"
          >
            <div className="flex flex-col gap-2">
              <Link href="/dashboard/news/detail" className="hover:text-primary transition-colors cursor-pointer">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h2>
              </Link>

              <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Avatar src={item.authorAvatar} size="sm" className="rounded-full w-5 h-5" />
                  <span className="text-gray-700 dark:text-gray-300 font-bold">
                    {item.authorName}
                  </span>
                </div>

                <span className="text-gray-300 dark:text-gray-700">•</span>

                <div className="flex items-center gap-1.5">
                  <HiOutlineClock className="text-sm text-gray-450" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>

            {/* Right side actions and status tag */}
            <div className="flex items-center gap-6">
              {/* Status tag badge */}
              <span
                className={`px-2.5 py-0.5 rounded text-[8px] font-bold tracking-wider ${
                  item.status === "PUBLISHED"
                    ? "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/15 dark:text-[#0FAF7A]"
                    : "bg-gray-100 text-gray-450 dark:bg-gray-800 dark:text-gray-500"
                }`}
              >
                {item.status}
              </span>

              {/* Action buttons */}
              <TableActions 
                onEdit={() => router.push("/dashboard/news/detail")}
                onDelete={() => handleDelete(item.id)}
              />
            </div>
          </Card>
        ))}

        {filteredNews.length === 0 && (
          <EmptyState
            icon={<HiOutlineNewspaper className="text-3xl text-gray-300" />}
            title="No news articles found"
            description="Create news, announcements, or updates to share with your organization and team members."
            actionLabel="Add News"
            onAction={() => router.push("/dashboard/news/create")}
          />
        )}
      </div>
    </div>
  );
}
