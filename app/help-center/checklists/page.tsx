"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

export default function ChecklistsHelpPage() {
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
            <span className="text-gray-400">Checklists - On/offboarding</span>
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
          <span>Checklists - On/offboarding</span>
          <HiOutlineInformationCircle className="text-gray-400 text-lg" />
        </div>

        <Card className="p-8 flex flex-col gap-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 shadow-sm leading-relaxed text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
          {/* Introduction */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Introduction
            </h2>
            <p>
              Checklists are essential tools for standardizing your company's processes, particularly during the critical periods of employee onboarding and offboarding. They ensure that every necessary step is completed efficiently, providing a smooth experience for the employee and compliance for your organization.
            </p>
          </div>

          {/* Onboarding Checklists */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Creating an Onboarding Checklist
            </h2>
            <p>
              An effective onboarding checklist helps new hires integrate into your company culture and operations rapidly. To create an onboarding checklist:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Navigate to the Checklists module from your dashboard.</li>
              <li>Click on the <strong>Create New Checklist</strong> button.</li>
              <li>Select <strong>Onboarding</strong> as the checklist type.</li>
              <li>Add individual tasks such as setting up IT equipment, scheduling introductory meetings, and reviewing company policies.</li>
              <li>Assign responsibilities for each task (e.g., HR Manager, IT Department, or the new employee).</li>
            </ul>
          </div>

          {/* Offboarding Checklists */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Managing Offboarding Checklists
            </h2>
            <p>
              Offboarding checklists ensure a secure and amicable departure for leaving employees. They help you recover company assets, revoke system access, and conduct exit interviews properly. To manage offboarding:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Similarly, navigate to the Checklists module and create a new checklist of type <strong>Offboarding</strong>.</li>
              <li>Include steps such as returning company laptops, terminating email access, and finalizing payroll.</li>
              <li>Ensure all assigned tasks are checked off before the employee's final day.</li>
            </ul>
          </div>

          {/* Tracking Progress */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              Tracking Checklist Progress
            </h2>
            <p>
              You can monitor the progress of all active checklists directly from the Checklists dashboard. Each checklist displays a progress bar indicating the percentage of completed tasks. Managers will receive notifications when assigned tasks are overdue or completed.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
