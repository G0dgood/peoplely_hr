"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineUser,
  HiOutlineQuestionMarkCircle,
  HiOutlineDocumentText,
  HiOutlineStar,
  HiOutlineArrowUturnRight,
  HiOutlinePhone,
  HiOutlineCurrencyDollar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";


interface HelpCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

const HELP_CATEGORIES: HelpCategory[] = [
  {
    icon: <HiOutlineUser />,
    title: "Get Started",
    description: "Discover Unpixel Company",
    href: "/dashboard/help-center/privacy-policy",
  },
  {
    icon: <HiOutlineQuestionMarkCircle />,
    title: "FAQ",
    description: "Frequently Asked Questions",
    href: "/dashboard/help-center/faq",
  },
  {
    icon: <HiOutlineDocumentText />,
    title: "Employee Profile",
    description: "Instructions for employees",
  },
  {
    icon: <HiOutlineStar />,
    title: "Checklists - On/offboarding",
    description: "Instructions for employees",
  },
  {
    icon: <HiOutlineArrowUturnRight />,
    title: "Keyboard Shortcut",
    description: "Instructions for employees",
    href: "/dashboard/help-center/keyboard-shortcut",
  },
  {
    icon: <HiOutlinePhone />,
    title: "Contact Support",
    description: "Get support if you having trouble",
    href: "/dashboard/help-center/contact-support",
  },
  {
    icon: <HiOutlineCurrencyDollar />,
    title: "Pricing Plan",
    description: "Information about pricing plan",
  },
  {
    icon: <HiOutlineChatBubbleLeftRight />,
    title: "Company News",
    description: "Latest news about unpixel studio",
  },
  {
    icon: <HiOutlineCog6Tooth />,
    title: "Integrations",
    description: "Setting integration third party",
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCategories = HELP_CATEGORIES.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header section with title and search bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader title="Help Center" description="What can we help you with?" />
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search what you need"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-11 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
        </div>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const CardContent = (
            <Card
              className="p-8 h-full flex flex-col gap-6 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-0.5 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900"
            >
              <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-950/20 flex items-center justify-center text-teal-600 dark:text-teal-400 text-xl transition-all group-hover:scale-105">
                {category.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 transition-colors group-hover:text-primary">
                  {category.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-405 leading-normal">
                  {category.description}
                </p>
              </div>
            </Card>
          );

          if (category.href) {
            return (
              <Link key={category.title} href={category.href}>
                {CardContent}
              </Link>
            );
          }

          return <div key={category.title}>{CardContent}</div>;
        })}
      </div>
    </div>
  );
}

