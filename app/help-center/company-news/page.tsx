"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

export default function CompanyNewsHelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Title area with Breadcrumbs and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help Center</h1>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-500">
            <Link href="/help-center" className="hover:text-primary transition-colors">
              Help Center
            </Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-gray-400">Company News</span>
          </div>
        </div>
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

      {/* Main Content card */}
      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
          <span>Company News</span>
          <HiOutlineInformationCircle className="text-gray-400 text-lg" />
        </div>

        <Card className="p-2 md:p-8 flex flex-col gap-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 shadow-sm leading-relaxed text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Staying Informed with Company News
            </h2>
            <p>
              The Company News feature allows organizations to broadcast important announcements, updates, and milestones directly to all employees. It ensures that everyone in the company is on the same page and engaged with the company's progress.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              How to Publish a News Article
            </h2>
            <p>
              Administrators and HR managers have the ability to create and publish news articles. To do so:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Navigate to the <strong>News</strong> module from your dashboard.</li>
              <li>Click on the <strong>Create News</strong> button.</li>
              <li>Provide an engaging title, a descriptive body, and optionally attach a cover image or relevant documents.</li>
              <li>Select whether to publish immediately or schedule the post for a later date.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Employee Notifications
            </h2>
            <p>
              When a new company news article is published, employees will receive an in-app notification and an email summary, ensuring that critical information reaches everyone promptly.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
