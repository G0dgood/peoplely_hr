"use client";

import * as React from "react";
import { 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight,
  HiOutlineCalendarDays
} from "react-icons/hi2";

export function TeamTimeOffCalendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Simulated April 2023 calendar data
  const calendarDays = [
    { day: 26, isCurrentMonth: false }, { day: 27, isCurrentMonth: false }, { day: 28, isCurrentMonth: false }, { day: 29, isCurrentMonth: false }, { day: 30, isCurrentMonth: false }, { day: 31, isCurrentMonth: false }, { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true }, { day: 3, isCurrentMonth: true }, { day: 4, isCurrentMonth: true }, { day: 5, isCurrentMonth: true }, { day: 6, isCurrentMonth: true }, { day: 7, isCurrentMonth: true }, { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true }, { day: 10, isCurrentMonth: true }, { day: 11, isCurrentMonth: true }, { day: 12, isCurrentMonth: true }, { day: 13, isCurrentMonth: true }, { day: 14, isCurrentMonth: true }, { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true }, { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true }, { day: 19, isCurrentMonth: true }, { day: 20, isCurrentMonth: true }, { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true }, { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true }, { day: 26, isCurrentMonth: true }, { day: 27, isCurrentMonth: true }, { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true }, { day: 31, isCurrentMonth: true }, { day: 1, isCurrentMonth: false }, { day: 2, isCurrentMonth: false }, { day: 3, isCurrentMonth: false }, { day: 4, isCurrentMonth: false }, { day: 5, isCurrentMonth: false },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Month Selector */}
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl">
        <span className="text-sm font-bold text-gray-900 dark:text-white">April 2023</span>
        <HiOutlineCalendarDays className="text-gray-400 text-lg" />
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-gray-50 dark:border-gray-800">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-4 text-center text-xs font-bold text-gray-400 dark:text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Cells */}
        <div className="grid grid-cols-7">
          {calendarDays.map((date, index) => (
            <div 
              key={index} 
              className={`min-h-[120px] p-4 border-r border-b border-gray-50 dark:border-gray-800 last:border-r-0 flex flex-col items-end transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/30 ${
                !date.isCurrentMonth ? "bg-gray-50/20 dark:bg-gray-800/10" : ""
              }`}
            >
              <span className={`text-xs font-bold ${
                date.isCurrentMonth 
                  ? "text-gray-400 dark:text-gray-500" 
                  : "text-gray-200 dark:text-gray-700"
              }`}>
                {date.day}
              </span>
              
              {/* Event placeholders could go here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
