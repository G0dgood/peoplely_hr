"use client";

import * as React from "react";
import { HiOutlineInformationCircle, HiOutlineCalendarDays, HiOutlineClock } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Modal } from "./modal";
import { DatePicker } from "@/components/ui/date-picker";

interface EditPaidTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (date: string, time: string, notes: string) => void;
  initialDate: string;
  loggedTime: string;
  initialPaidTime: string;
  initialNotes: string;
}

export function EditPaidTimeModal({
  isOpen,
  onClose,
  onSave,
  initialDate,
  loggedTime,
  initialPaidTime,
  initialNotes,
}: EditPaidTimeModalProps) {
  const [selectedDate, setSelectedDate] = React.useState(initialDate);
  const [selectedTime, setSelectedTime] = React.useState(initialPaidTime);
  const [notes, setNotes] = React.useState(initialNotes);
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedDate(initialDate);
      setSelectedTime(initialPaidTime);
      setNotes(initialNotes);
    }
  }, [isOpen, initialDate, initialPaidTime, initialNotes]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="p-8 border border-gray-200 dark:border-gray-800"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Edit Paid Time
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <HiOutlineInformationCircle className="text-gray-400 text-base shrink-0" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your total working time for today is <span className="font-bold text-gray-900 dark:text-white">{loggedTime}</span>
            </p>
          </div>
        </div>

        {/* Date and Time selectors side-by-side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span>{selectedDate}</span>
                <HiOutlineCalendarDays className="text-gray-400 text-lg" />
              </button>
              <DatePicker
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSave={(range) => {
                  setSelectedDate(range.split(" - ")[0] || range);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                type="text"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                placeholder="00:00"
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
              <HiOutlineClock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Input notes here"
            className="w-full min-h-[100px] px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="flex-1 font-bold h-12"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1 font-bold h-12 bg-[#11131A] dark:bg-white dark:text-gray-900"
            onClick={() => onSave(selectedDate, selectedTime, notes)}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
