"use client";

import * as React from "react";
import { 
  HiOutlineCalendarDays, 
  HiOutlineDocumentArrowUp,
  HiOutlineMagnifyingGlass,
  HiOutlineChevronRight
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddTimeOffDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTimeOffDrawer({ isOpen, onClose }: AddTimeOffDrawerProps) {
  const [dayType, setDayType] = React.useState<"single" | "multiple">("multiple");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col">
        {/* Dismiss slide button (vertically centered on the left border of the drawer panel) */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
          >
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </div>
        <div className="p-8 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
            Add New Time Off
          </h2>

          <div className="flex flex-col gap-6">
            {/* Time Off Type */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Time Off Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-400 dark:text-gray-500 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 text-left">
                  Select date
                  <HiOutlineCalendarDays className="text-lg" />
                </button>
              </div>
            </div>

            {/* Day Type Toggle */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setDayType("single")}
                className={`flex items-center justify-between px-4 py-4 rounded-xl border transition-all ${
                  dayType === "single" 
                    ? "border-primary bg-primary/5 text-primary" 
                    : "border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white"
                }`}
              >
                <span className="text-xs font-bold">Single Day</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  dayType === "single" ? "border-primary" : "border-gray-200 dark:border-gray-700"
                }`}>
                  {dayType === "single" && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
              </button>
              <button 
                onClick={() => setDayType("multiple")}
                className={`flex items-center justify-between px-4 py-4 rounded-xl border transition-all ${
                  dayType === "multiple" 
                    ? "border-primary bg-primary/5 text-primary" 
                    : "border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white"
                }`}
              >
                <span className="text-xs font-bold">Multiple Day</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  dayType === "multiple" ? "border-primary" : "border-gray-200 dark:border-gray-700"
                }`}>
                  {dayType === "multiple" && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
              </button>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 text-left">
                  Select Date
                  <HiOutlineCalendarDays className="text-lg text-gray-400" />
                </button>
              </div>
              <div className="relative">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 text-left">
                  Select Date
                  <HiOutlineCalendarDays className="text-lg text-gray-400" />
                </button>
              </div>
            </div>

            {/* Note */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Note
              </label>
              <textarea 
                placeholder="Give notes"
                className="w-full h-24 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-gray-300 dark:placeholder:text-gray-600 resize-none"
              />
            </div>

            {/* Attachment */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Attachment
              </label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">Upload attachment</span>
                  <HiOutlineDocumentArrowUp className="text-gray-400 dark:text-gray-500 text-xl" />
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">
                  Max file size : 5MB. File format : pdf, docx, png, and jpeg
                </p>
              </div>
            </div>

            {/* Assign To */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Assign To
              </label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search member name"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-gray-300 dark:placeholder:text-gray-600"
                />
                <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <Button
            variant="outline"
            className="flex-1 font-bold h-12"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="primary" className="flex-1 font-bold h-12">
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
