"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineBell,
  HiOutlineCog6Tooth,
  HiOutlineUserGroup,
  HiEllipsisHorizontal,
} from "react-icons/hi2";

interface Notification {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    icon: <HiOutlineBell />,
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
    iconColor: "text-rose-400",
    title: "Training session reminder",
    description: "Don't forget to join our upcoming training session on the...",
    time: "Now",
    unread: true,
  },
  {
    id: "2",
    icon: <HiOutlineCog6Tooth />,
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-400",
    title: "New integration announcement",
    description: "Our HR Management Dashboard now integrates with...",
    time: "9:00 AM",
    unread: false,
  },
  {
    id: "3",
    icon: <HiOutlineUserGroup />,
    iconBg: "bg-teal-50 dark:bg-teal-500/10",
    iconColor: "text-[#0FAF7A]",
    title: "User feedback survey",
    description: "We want to hear from you! Take our quick user feedback...",
    time: "10 Oct 2022",
    unread: false,
  },
];

export function NotificationPopup() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

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

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

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
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <span className="text-sm font-bold text-gray-900 dark:text-white">Notification</span>
          <Link
              href="/dashboard/settings/notification"
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400 dark:text-gray-500"
            >
              <HiEllipsisHorizontal className="text-lg" />
            </Link>
          </div>

          {/* List */}
          <div className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800">
            {NOTIFICATIONS.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3.5 px-5 py-4 hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors cursor-pointer"
              >
                {/* Icon badge */}
                <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-base ${n.iconBg} ${n.iconColor}`}>
                  {n.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {n.title}
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 whitespace-nowrap">
                        {n.time}
                      </span>
                      {n.unread && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-1">
                    {n.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="p-4">
            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full h-11 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Show All Notification
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
