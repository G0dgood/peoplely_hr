"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineBell,
  HiOutlineCog6Tooth,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { useAppSelector } from "@/store/hooks";
import { useSocket } from "@/store/socket-context";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
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
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export function NotificationPopup() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  
  const user = useAppSelector((state) => state.auth.user);
  const { socket } = useSocket();

  const { data, refetch } = useGetNotificationsQuery(
    { userId: user?.id || "" },
    { skip: !user?.id }
  );

  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const notifications = data?.notifications || [];
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close on outside click
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  React.useEffect(() => {
    if (!socket || !user?.id) return;

    // Join user room
    socket.emit("join_user", user.id);

    // Listen for new notification
    const handleNewNotification = (notification: any) => {
      toast(notification.title, {
        description: notification.description,
        action: {
          label: "View",
          onClick: () => {
            window.location.href = "/notification";
          },
        },
      });
      refetch();
    };

    socket.on("new_notification", handleNewNotification);

    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, [socket, user?.id, refetch]);

  const handleNotificationClick = async (nId: string) => {
    try {
      await markAsRead(nId).unwrap();
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!user?.id) return;
    try {
      await markAllAsRead({ userId: user.id }).unwrap();
      toast.success("All notifications marked as read");
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  // Only show top 5 in the popup
  const displayedNotifications = notifications.slice(0, 5);

  return (
    <div className="relative" ref={ref}>
      {/* Bell trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-10 h-10 flex items-center justify-center rounded-xl relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <HiOutlineBell className="text-xl text-gray-500 dark:text-gray-400" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-gray-900" />
        )}
      </button>

      {/* Popup */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+12px)] w-[360px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900 dark:text-white">Notification</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* List */}
          <div className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800 max-h-[300px] overflow-y-auto">
            {displayedNotifications.length === 0 ? (
              <div className="px-5 py-8 text-center text-xs text-gray-400 dark:text-gray-500">
                No notifications yet
              </div>
            ) : (
              displayedNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n.id)}
                  className={`flex items-start gap-3.5 px-5 py-4 hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors cursor-pointer ${
                    n.unread ? "bg-blue-50/20 dark:bg-blue-900/5" : ""
                  }`}
                >
                  {/* Icon badge */}
                  <div
                    className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-base ${n.iconBg} ${n.iconColor}`}
                  >
                    {getIconComponent(n.icon)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
                        {n.title}
                      </span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 whitespace-nowrap">
                          {formatTime(n.createdAt)}
                        </span>
                        {n.unread && (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-2">
                      {n.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <Link
              href="/notification"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full h-11 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Show All Notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
