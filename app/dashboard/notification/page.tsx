"use client";

import * as React from "react";
import {
  HiOutlineBell,
  HiOutlineCog6Tooth,
  HiOutlineUserGroup,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

interface Notification {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}

const ALL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    icon: <HiOutlineBell />,
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
    iconColor: "text-rose-400",
    title: "Training session reminder",
    description: "Don't forget to join our upcoming training session on the HR Management Dashboard. Learn best practices and get the most out of our system.",
    time: "Now",
  },
  {
    id: "2",
    icon: <HiOutlineCog6Tooth />,
    iconBg: "bg-gray-100 dark:bg-gray-800",
    iconColor: "text-gray-500 dark:text-gray-400",
    title: "New Integration Announcement",
    description: "Don't forget to join our upcoming training session on the HR Management Dashboard. Learn best practices and get the most out of our system.",
    time: "9:00 AM",
  },
  {
    id: "3",
    icon: <HiOutlineUserGroup />,
    iconBg: "bg-teal-50 dark:bg-teal-500/10",
    iconColor: "text-[#0FAF7A]",
    title: "User feedback survey",
    description: "Don't forget to join our upcoming training session on the HR Management Dashboard. Learn best practices and get the most out of our system.",
    time: "1 Oct 2022",
  },
  {
    id: "4",
    icon: <HiOutlineBell />,
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
    iconColor: "text-rose-400",
    title: "Overdue Performance Review",
    description: "Your performance review was due on 1 Oct 2022. Please contact your manager to schedule a review as soon as possible.",
    time: "20 Sep 2022",
  },
  {
    id: "5",
    icon: <HiOutlineUserGroup />,
    iconBg: "bg-teal-50 dark:bg-teal-500/10",
    iconColor: "text-[#0FAF7A]",
    title: "New Training Opportunity",
    description: "A new training course has been added to the learning management system. Click here to view the course and enroll.",
    time: "1 Sep 2022",
  },
];

export default function AllNotificationsPage() {
  const [search, setSearch] = React.useState("");

  const filtered = ALL_NOTIFICATIONS.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notification
          </h1>
          <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 mt-1">
            This is All your notification
          </p>
        </div>

        {/* Search */}
        <div className="relative w-64">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search what you need..."
            className="w-full h-11 pl-4 pr-10 text-xs font-semibold rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <HiOutlineMagnifyingGlass className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base" />
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-xs overflow-hidden">
        {filtered.map((n, index) => (
          <div
            key={n.id}
            className={`flex items-start gap-5 px-7 py-6 hover:bg-gray-50/60 dark:hover:bg-gray-800/20 transition-colors cursor-pointer ${
              index < filtered.length - 1
                ? "border-b border-gray-50 dark:border-gray-800/50"
                : ""
            }`}
          >
            {/* Icon Badge */}
            <div
              className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-base ${n.iconBg} ${n.iconColor} mt-0.5`}
            >
              {n.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {n.title}
                </span>
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 flex-shrink-0 whitespace-nowrap">
                  {n.time}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 leading-relaxed">
                {n.description}
              </p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-16 text-center text-xs font-semibold text-gray-400">
            No notifications match your search.
          </div>
        )}
      </div>
    </div>
  );
}
