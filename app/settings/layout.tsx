"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { PageHeader } from "@/components/ui/page-header";
import { SettingsTabs } from "@/components/ui/settings-tabs";

const SETTINGS_NAV = [
  { name: "Company Info", href: "/settings/company-info", icon: HiOutlineInformationCircle },
  { name: "Offices", href: "/settings/offices", icon: HiOutlineBuildingOffice2 },
  { name: "Department", href: "/settings/department", icon: HiOutlineGlobeAlt },
  { name: "Job Titles", href: "/settings/job-titles", icon: HiOutlineBriefcase },
  { name: "Work Schedule", href: "/settings/work-schedule", icon: HiOutlineCalendarDays },
  { name: "Permission", href: "/settings/permission", icon: HiOutlineCog6Tooth },
  { name: "Integration", href: "/settings/integration", icon: HiOutlineArrowsRightLeft },
  { name: "Subscription", href: "/settings/subscription", icon: HiOutlineBolt },
  { name: "Password", href: "/settings/password", icon: HiOutlineLockClosed },
  { name: "Notification", href: "/settings/notification", icon: HiOutlineBell },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = SETTINGS_NAV.map((item) => {
    const Icon = item.icon;
    const active = pathname.startsWith(item.href);
    return {
      id: item.href,
      label: item.name,
      icon: <Icon className={`text-lg transition-colors ${active ? "text-[#10B981]" : "text-gray-400 dark:text-gray-500"}`} />,
    };
  });

  const activeTab = SETTINGS_NAV.find((item) => pathname.startsWith(item.href))?.href || "";

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-955">
      {/* Header */}
      <PageHeader
        title="Settings"
        description="Manage your dashboard here"
      />

      <div className="flex flex-col md:flex-row items-start gap-8 flex-1">
        {/* Settings Sidebar */}
        <SettingsTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(href) => router.push(href)}
          variant="emerald"
          className="w-full md:w-64 flex-shrink-0"
        />

        {/* Content Area */}
        <div className="flex-1 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800/80 rounded-2xl shadow-xs overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
