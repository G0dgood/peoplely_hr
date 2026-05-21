"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { AddWorkScheduleDrawer } from "@/components/ui/drawer";
import {
  HiOutlineMagnifyingGlass,
  HiPlus,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";

interface Schedule {
  id: string;
  title: string;
  isDefault: boolean;
  active: boolean;
  standardHours: string;
  effectiveFrom: string;
  type: string;
  totalHours: string;
  dailyHours: { day: string; hours: string }[];
}

const INITIAL_DATA: Schedule[] = [
  {
    id: "1",
    title: "Mon-Fri, Duration 40 hours/week",
    isDefault: true,
    active: true,
    standardHours: "8h 00m",
    effectiveFrom: "01 Jan 2023",
    type: "Duration-based",
    totalHours: "40h 00m",
    dailyHours: [
      { day: "Monday", hours: "8h 00m" },
      { day: "Tuesday", hours: "8h 00m" },
      { day: "Wednesday", hours: "8h 00m" },
      { day: "Thursday", hours: "8h 00m" },
      { day: "Friday", hours: "8h 00m" },
    ],
  },
  {
    id: "2",
    title: "Mon-Fri, Duration 35 hours/week",
    isDefault: false,
    active: false,
    standardHours: "7h 00m",
    effectiveFrom: "01 Jan 2023",
    type: "Duration-based",
    totalHours: "35h 00m",
    dailyHours: [
      { day: "Monday", hours: "7h 00m" },
      { day: "Tuesday", hours: "7h 00m" },
      { day: "Wednesday", hours: "7h 00m" },
      { day: "Thursday", hours: "7h 00m" },
      { day: "Friday", hours: "7h 00m" },
    ],
  },
];

export default function WorkSchedulePage() {
  const [search, setSearch] = React.useState("");
  const [schedules, setSchedules] = React.useState<Schedule[]>(INITIAL_DATA);
  const [expanded, setExpanded] = React.useState<string[]>(["1"]);
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  const toggleScheduleActive = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-300 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Work Schedule
        </h2>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-64">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search schedule"
              className="w-full h-10 pl-4 pr-10 text-xs font-semibold rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <HiOutlineMagnifyingGlass className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>
          {/* Add New Button */}
          <button 
            onClick={() => setIsAddOpen(true)}
            className="h-10 px-4 rounded-xl bg-[#11131A] dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <HiPlus className="text-base" />
            Add New
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 overflow-y-auto flex flex-col gap-6">
        {schedules.map((schedule) => {
          const isExpanded = expanded.includes(schedule.id);

          return (
            <div
              key={schedule.id}
              className="border border-gray-300 dark:border-gray-800/80 rounded-2xl bg-white dark:bg-gray-900 shadow-xs overflow-hidden transition-all"
            >
              {/* Card Header */}
              <div
                onClick={() => toggleExpand(schedule.id)}
                className="flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {schedule.title}
                  </span>
                  {schedule.isDefault && (
                    <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      Default
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div onClick={(e) => e.stopPropagation()}>
                    <Toggle
                      checked={schedule.active}
                      onChange={(e) => toggleScheduleActive(schedule.id, e as any)}
                    />
                  </div>
                  <div className="text-gray-400 dark:text-gray-500">
                    {isExpanded ? (
                      <HiChevronDown className="text-lg" />
                    ) : (
                      <HiChevronUp className="text-lg" />
                    )}
                  </div>
                </div>
              </div>

              {/* Card Body (Expanded) */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-50 dark:border-gray-800/50">
                  <div className="flex flex-col md:flex-row gap-8 max-w-4xl">
                    {/* Left Column */}
                    <div className="flex-1 flex flex-col gap-5">
                      <div className="flex items-start">
                        <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                          Standard working hours/day
                        </span>
                        <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                          {schedule.standardHours}
                        </span>
                      </div>

                      <div className="flex items-start">
                        <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                          Effective from
                        </span>
                        <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                          {schedule.effectiveFrom}
                        </span>
                      </div>

                      <div className="flex items-start">
                        <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                          Schedule type
                        </span>
                        <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                          {schedule.type}
                        </span>
                      </div>

                      <div className="flex items-start">
                        <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                          Total working hours/week
                        </span>
                        <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                          {schedule.totalHours}
                        </span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 flex items-start">
                      <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                        Daily working hours
                      </span>
                      <div className="w-1/2 flex flex-col gap-3">
                        {schedule.dailyHours.map((dh, idx) => (
                          <div key={idx} className="flex justify-between items-center max-w-[140px]">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                              {dh.day}
                            </span>
                            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                              {dh.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Slide-over Drawer Component */}
      <AddWorkScheduleDrawer isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
}
