"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import {
  HiOutlineUsers,
  HiOutlineUserPlus,
  HiOutlineUserMinus,
  HiOutlineClock,
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineCalendarDays,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";

interface ReportCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const REPORT_CARDS: ReportCardProps[] = [
  {
    icon: <HiOutlineUsers className="text-lg text-[#0FAF7A]" />,
    title: "Headcount (Point-in-time)",
    description: "Breakdown of all current employees.",
    href: "/report/headcount",
  },
  {
    icon: <HiOutlineUserPlus className="text-lg text-[#0FAF7A]" />,
    title: "Onboarding",
    description: "Onboarding employees by month of their Join Date.",
    href: "/report/onboarding",
  },
  {
    icon: <HiOutlineUserMinus className="text-lg text-[#0FAF7A]" />,
    title: "Offboarding",
    description: "Offboarding and inactive employees by month of their Last Working Date.",
    href: "/report/offboarding",
  },
  {
    icon: <HiOutlineClock className="text-lg text-[#0FAF7A]" />,
    title: "Time Off Balance",
    description: "An overview of employees' time off balances.",
    href: "/report/time-off-balance",
  },
  {
    icon: <HiOutlineBriefcase className="text-lg text-[#0FAF7A]" />,
    title: "Recruitment Pipeline",
    description: "An overview of the hiring progress during a period of time.",
    href: "/report/recruitment",
  },
  {
    icon: <HiOutlineDocumentText className="text-lg text-[#0FAF7A]" />,
    title: "Employee Data Reports",
    description: "An overview of employee information.",
    href: "/report/employee-data",
  },
  {
    icon: <HiOutlineCalendarDays className="text-lg text-[#0FAF7A]" />,
    title: "Time Off Schedule",
    description: "An overview of employees' time off schedules.",
    href: "/report/time-off-schedule",
  },
  {
    icon: <HiOutlinePresentationChartLine className="text-lg text-[#0FAF7A]" />,
    title: "Employee Turnover Rate",
    description: "An overview of the resigned employees over the active employees.",
    href: "/report/turnover-rate",
  },
];

export default function ReportPage() {
  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      <PageHeader title="Report" description="Here's report so far" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REPORT_CARDS.map((card, index) => (
          <Link key={index} href={card.href}>
            <Card className="p-8 border border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4 cursor-pointer group h-full">
              {/* Icon badge */}
              <div className="w-10 h-10 rounded-xl bg-[#E8FAF4] dark:bg-[#0FAF7A]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-1.5">
                <h2 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {card.title}
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
