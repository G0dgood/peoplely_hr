"use client";

import * as React from "react";
import { PageHeader } from "@/components/ui/page-header";
import {
  HiOutlineBell,
  HiOutlineCog6Tooth,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiOutlineMagnifyingGlass,
  HiOutlineTrash,
  HiOutlineCheck,
} from "react-icons/hi2";
import { useAppSelector } from "@/store/hooks";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation,
} from "@/store/services/notificationApi";
import { toast } from "sonner";

function getIconComponent(iconName: string) {
  switch (iconName) {
    case "bell":
      return <HiOutlineBell />;
    case "cog":
      return <HiOutlineCog6Tooth />;
    case "users":
      return <HiOutlineUserGroup />;
    case "calendar":
      return <HiOutlineCalendar />;
    case "briefcase":
      return <HiOutlineBriefcase />;
    case "currency":
      return <HiOutlineCurrencyDollar />;
    default:
      return <HiOutlineBell />;
  }
}

function formatTime(createdAt: string) {
  const date = new Date(createdAt);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AllNotificationsPage() {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | "unread">("all");

  const user = useAppSelector((state) => state.auth.user);

  const { data, isLoading } = useGetNotificationsQuery(
    { userId: user?.id || "" },
    { skip: !user?.id }
  );

  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [clearAllNotifications] = useClearAllNotificationsMutation();

  const notifications = data?.notifications || [];

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await markAsRead(id).unwrap();
      toast.success("Notification marked as read");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update notification");
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteNotification(id).unwrap();
      toast.success("Notification deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete notification");
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!user?.id) return;
    try {
      await markAllAsRead({ userId: user.id }).unwrap();
      toast.success("All notifications marked as read");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update notifications");
    }
  };

  const handleClearAll = async () => {
    if (!user?.id) return;
    if (!confirm("Are you sure you want to clear all notifications?")) return;
    try {
      await clearAllNotifications({ userId: user.id }).unwrap();
      toast.success("Cleared all notifications");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear notifications");
    }
  };

  const filtered = notifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === "all" ? true : n.unread;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <PageHeader title="Notification" description="This is All your notification" />

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search what you need..."
              className="w-full h-11 pl-4 pr-10 text-xs font-semibold rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <HiOutlineMagnifyingGlass className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base" />
          </div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              filter === "all"
                ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              filter === "unread"
                ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Unread
          </button>
        </div>

        {/* Global Actions */}
        {notifications.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 h-10 border border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors"
            >
              Mark all as read
            </button>
            <button
              onClick={handleClearAll}
              className="px-4 h-10 bg-red-500 hover:bg-red-600 rounded-xl text-xs font-bold text-white transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Notification List */}
      <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800/80 rounded-2xl shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-xs font-semibold text-gray-400">
            Loading notifications...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-xs font-semibold text-gray-400">
            No notifications found.
          </div>
        ) : (
          filtered.map((n, index) => (
            <div
              key={n.id}
              onClick={(e) => {
                if (n.unread) handleMarkAsRead(n.id, e);
              }}
              className={`flex items-start gap-5 px-7 py-6 hover:bg-gray-50/60 dark:hover:bg-gray-800/20 transition-colors cursor-pointer relative group ${
                n.unread ? "bg-blue-50/10 dark:bg-blue-900/5" : ""
              } ${
                index < filtered.length - 1
                  ? "border-b border-gray-100 dark:border-gray-800/50"
                  : ""
              }`}
            >
              {/* Icon Badge */}
              <div
                className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-lg ${n.iconBg} ${n.iconColor} mt-0.5`}
              >
                {getIconComponent(n.icon)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-16">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {n.title}
                  </span>
                  {n.unread && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 animate-pulse" />
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 leading-relaxed mb-1">
                  {n.description}
                </p>
                <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-600">
                  {formatTime(n.createdAt)}
                </span>
              </div>

              {/* Action Buttons (Visible on hover or mobile) */}
              <div className="absolute right-7 top-1/2 -translate-y-1/2 flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                {n.unread && (
                  <button
                    onClick={(e) => handleMarkAsRead(n.id, e)}
                    title="Mark as read"
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <HiOutlineCheck className="text-base text-green-500" />
                  </button>
                )}
                <button
                  onClick={(e) => handleDelete(n.id, e)}
                  title="Delete"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 transition-colors"
                >
                  <HiOutlineTrash className="text-base" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
