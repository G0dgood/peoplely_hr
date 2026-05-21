"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  HiOutlineMagnifyingGlass,
  HiPlus,
  HiOutlineLink,
  HiOutlineTrash,
  HiChevronUpDown,
} from "react-icons/hi2";

interface JobTitle {
  id: string;
  title: string;
  employees: number;
  active: boolean;
}

const INITIAL_DATA: JobTitle[] = [
  { id: "1", title: "UI UX Designer", employees: 10, active: true },
  { id: "2", title: "UI UX Designer", employees: 10, active: true },
  { id: "3", title: "UI UX Designer", employees: 10, active: true },
  { id: "4", title: "UI UX Designer", employees: 10, active: true },
];

export default function JobTitlesPage() {
  const [search, setSearch] = React.useState("");
  const [jobs, setJobs] = React.useState<JobTitle[]>(INITIAL_DATA);

  const toggleJob = (id: string) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, active: !job.active } : job))
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Job Titles
        </h2>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-64">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job title"
              className="w-full h-10 pl-4 pr-10 text-xs font-semibold rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <HiOutlineMagnifyingGlass className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>
          {/* Add New Button */}
          <button className="h-10 px-4 rounded-xl bg-[#11131A] dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
            <HiPlus className="text-base" />
            Add New
          </button>
        </div>
      </div>

      {/* Content Area / Table */}
      <div className="p-8 flex-1 overflow-x-auto">
        <div className="min-w-[700px] flex flex-col">
          {/* Table Header */}
          <div className="flex items-center pb-4 border-b border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-400 dark:text-gray-500">
            <div className="flex-[2]">Job Title</div>
            <div className="flex-[2] flex items-center gap-1">
              Number of Employees
              <HiChevronUpDown className="text-sm cursor-pointer" />
            </div>
            <div className="flex-1 text-center">Active</div>
            <div className="flex-1 text-right">Action</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
            {jobs.map((job, index) => (
              <div
                key={job.id}
                className={`flex items-center py-4 ${
                  index !== jobs.length - 1
                    ? "border-b border-gray-50 dark:border-gray-800/50"
                    : ""
                }`}
              >
                {/* Job Title */}
                <div className="flex-[2] text-xs font-bold text-gray-900 dark:text-white">
                  {job.title}
                </div>

                {/* Number of Employees */}
                <div className="flex-[2] text-xs font-bold text-gray-900 dark:text-white">
                  {job.employees}
                </div>

                {/* Active Toggle */}
                <div className="flex-1 flex justify-center">
                  <Toggle checked={job.active} onChange={() => toggleJob(job.id)} />
                </div>

                {/* Action Buttons */}
                <div className="flex-1 flex items-center justify-end gap-2">
                  <button className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                    <HiOutlineLink className="text-sm" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                    <HiOutlineTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
            
            {jobs.length === 0 && (
              <div className="py-8 text-center text-xs font-semibold text-gray-400">
                No job titles found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
