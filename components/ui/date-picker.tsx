"use client";

import * as React from "react";
import { 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight,
  HiOutlineCalendarDays
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (range: string) => void;
  anchorRef?: React.RefObject<HTMLElement>;
}

export function DatePicker({ isOpen, onClose, onSave }: DatePickerProps) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Simulated January 2023 data
  const calendarDays = [
    { day: 29, isCurrentMonth: false }, { day: 30, isCurrentMonth: false }, { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true }, { day: 2, isCurrentMonth: true }, { day: 3, isCurrentMonth: true }, { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true }, { day: 6, isCurrentMonth: true }, { day: 7, isCurrentMonth: true }, { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true, isSelected: true, isStart: true }, { day: 10, isCurrentMonth: true, isInRange: true }, { day: 11, isCurrentMonth: true, isInRange: true },
    { day: 12, isCurrentMonth: true, isInRange: true }, { day: 13, isCurrentMonth: true, isInRange: true }, { day: 14, isCurrentMonth: true, isInRange: true }, { day: 15, isCurrentMonth: true, isSelected: true, isEnd: true },
    { day: 16, isCurrentMonth: true }, { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true }, { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true }, { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true }, { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true }, { day: 26, isCurrentMonth: true }, { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true }, { day: 30, isCurrentMonth: true }, { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false }
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 z-50">
      <div 
        className="fixed inset-0 bg-transparent" 
        onClick={onClose}
      />
      <div className="relative w-[320px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden p-6">
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Set Date</h3>
          
          <div className="flex flex-col gap-4">
            {/* Month/Year Header */}
            <div className="flex items-center justify-between">
              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <HiOutlineChevronLeft className="text-lg" />
              </button>
              <span className="text-sm font-bold text-gray-900 dark:text-white text-center">January 2023</span>
              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <HiOutlineChevronRight className="text-lg" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div>
              <div className="grid grid-cols-7 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-[10px] font-bold text-gray-300 dark:text-gray-600 text-center py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {calendarDays.map((date, index) => {
                  let cellClass = "relative h-8 flex items-center justify-center text-xs font-bold transition-all ";
                  
                  if (date.isSelected) {
                    cellClass += "bg-primary text-white rounded-lg z-10 ";
                  } else if (date.isInRange) {
                    cellClass += "bg-primary/10 text-primary ";
                  } else if (!date.isCurrentMonth) {
                    cellClass += "text-gray-200 dark:text-gray-700 ";
                  } else {
                    cellClass += "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg ";
                  }

                  return (
                    <div key={index} className={cellClass}>
                      {date.day}
                      {date.isInRange && !date.isSelected && (
                        <div className="absolute inset-0 bg-primary/10 -z-10" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="flex-1 h-10 text-xs font-bold"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="flex-1 h-10 text-xs font-bold"
              onClick={() => {
                onSave?.("01 Jan 2023 - 15 Jan 2023");
                onClose();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
