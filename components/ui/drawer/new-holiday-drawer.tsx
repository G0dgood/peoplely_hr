"use client";

import * as React from "react";
import { HiOutlineCalendarDays, HiOutlineChevronRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { useAppSelector } from "@/store/hooks";
import { useCreateHolidayMutation } from "@/store/services/timeOffApi";
import { toast } from "sonner";

interface NewHolidayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewHolidayDrawer({ isOpen, onClose }: NewHolidayDrawerProps) {
  const user = useAppSelector((state) => state.auth.user);
  const [createHoliday, { isLoading: isCreating }] = useCreateHolidayMutation();

  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("Select Date");
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  const handleAdd = async () => {
    if (!name || date === "Select Date") {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createHoliday({
        name,
        date: new Date(date).toISOString(),
        companyId: user?.companyId,
      }).unwrap();

      toast.success("Holiday added successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to add holiday");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/20 "
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full flex flex-col shadow-2xl">
        {/* Dismiss slide button (vertically centered on the left border of the drawer panel) */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
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
            New Holiday
          </h2>

          <div className="flex flex-col gap-6">
            {/* Holiday Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Holiday Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Eid Mubarak"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold"
              />
            </div>

            {/* Date Range Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 text-left"
                >
                  <span>{date}</span>
                  <HiOutlineCalendarDays className="text-lg text-gray-400" />
                </button>
                <DatePicker
                  isOpen={isDatePickerOpen}
                  onClose={() => setIsDatePickerOpen(false)}
                  onSave={(selectedDate) => setDate(selectedDate)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-8 border-t border-gray-300 dark:border-gray-800 flex items-center gap-4">
          <Button
            variant="outline"
            className="flex-1 font-bold h-12"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            className="flex-1 font-bold h-12"
            onClick={handleAdd}
            disabled={isCreating}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
