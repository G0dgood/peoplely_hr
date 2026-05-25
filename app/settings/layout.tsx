"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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

 return (
  <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
   {/* Header */}
   <PageHeader
    title="Settings"
    description="Manage your dashboard here"
   />

   <div className="flex flex-col md:flex-row items-start gap-8 flex-1">
    {/* Settings Sidebar */}
    <div className="w-full md:w-64 flex-shrink-0 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800/80 rounded-2xl p-4 shadow-xs">
     <nav className="flex flex-col gap-2">
      {SETTINGS_NAV.map((item) => {
       const active = pathname.startsWith(item.href);
       const Icon = item.icon;
       return (
        <Link
         key={item.name}
         href={item.href}
         className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${active
           ? "text-[#0FAF7A]"
           : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
         {active && (
          <motion.div
           layoutId="activeSettingTab"
           className="absolute inset-0 bg-gray-50 dark:bg-gray-800 rounded-xl z-0"
           initial={false}
           transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
         )}
         <Icon className={`relative z-10 text-lg transition-colors ${active ? "text-[#0FAF7A]" : "text-gray-400 dark:text-gray-500"}`} />
         <span className="relative z-10">{item.name}</span>
        </Link>
       );
      })}
     </nav>
    </div>

    {/* Content Area */}
    <div className="flex-1 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800/80 rounded-2xl shadow-xs overflow-hidden">
     {children}
    </div>
   </div>
  </div>
 );
}
