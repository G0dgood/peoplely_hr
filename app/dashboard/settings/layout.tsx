"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineInformationCircle,
  HiOutlineBuildingOffice2,
  HiOutlineGlobeAlt,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineArrowsRightLeft,
  HiOutlineBolt,
  HiOutlineLockClosed,
  HiOutlineBell,
} from "react-icons/hi2";

const SETTINGS_NAV = [
  { name: "Company Info", href: "/dashboard/settings/company-info", icon: HiOutlineInformationCircle },
  { name: "Offices", href: "/dashboard/settings/offices", icon: HiOutlineBuildingOffice2 },
  { name: "Department", href: "/dashboard/settings/department", icon: HiOutlineGlobeAlt },
  { name: "Job Titles", href: "/dashboard/settings/job-titles", icon: HiOutlineBriefcase },
  { name: "Work Schedule", href: "/dashboard/settings/work-schedule", icon: HiOutlineCalendarDays },
  { name: "Permission", href: "/dashboard/settings/permission", icon: HiOutlineCog6Tooth },
  { name: "Integration", href: "/dashboard/settings/integration", icon: HiOutlineArrowsRightLeft },
  { name: "Subscription", href: "/dashboard/settings/subscription", icon: HiOutlineBolt },
  { name: "Password", href: "/dashboard/settings/password", icon: HiOutlineLockClosed },
  { name: "Notification", href: "/dashboard/settings/notification", icon: HiOutlineBell },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 mt-1">
          Manage your dashboard here
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8 flex-1">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-4 shadow-xs">
          <nav className="flex flex-col gap-2">
            {SETTINGS_NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? "bg-gray-50 dark:bg-gray-800 text-[#0FAF7A]"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className={`text-lg ${active ? "text-[#0FAF7A]" : "text-gray-400 dark:text-gray-500"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-xs overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
