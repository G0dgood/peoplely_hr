"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

export default function IntegrationsHelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Title area with Breadcrumbs and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help Center</h1>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-500">
            <Link href="/help-center" className="hover:text-primary transition-colors">
              Help Center
            </Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-gray-400">Integrations</span>
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
          <span>Integrations</span>
          <HiOutlineInformationCircle className="text-gray-400 text-lg" />
        </div>

        <Card className="p-8 flex flex-col gap-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 shadow-sm leading-relaxed text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Connecting Third-Party Services
            </h2>
            <p>
              Peoplely HR supports seamless integrations with a variety of third-party applications to streamline your workflows. By connecting your favorite tools, you can automate data syncing and reduce manual entry.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Supported Integrations
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Slack:</strong> Receive notifications for time-off requests, new company news, and candidate updates directly in your Slack channels.</li>
              <li><strong>Google Workspace:</strong> Sync employee calendars, schedule interviews seamlessly via Google Meet, and export reports to Google Sheets.</li>
              <li><strong>Microsoft Teams:</strong> Bring HR notifications into your Teams environment.</li>
              <li><strong>Payroll Providers:</strong> Connect with providers like Gusto or QuickBooks to automate payroll data transfer based on timesheets and approved leaves.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              How to Set Up an Integration
            </h2>
            <p>
              To set up a new integration, navigate to <strong>Settings</strong> and select the <strong>Integrations</strong> tab. Find the service you wish to connect and click <strong>Connect</strong>. You will be prompted to log in to the third-party service and grant the necessary permissions.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
