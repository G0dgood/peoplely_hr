"use client";

import * as React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Modal } from "./modal";

interface ClockOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes: string) => void;
  formattedTime: string;
}

export function ClockOutModal({
  isOpen,
  onClose,
  onConfirm,
  formattedTime,
}: ClockOutModalProps) {
  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setNotes("");
    }
  }, [isOpen]);

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
            Clock out at 08:00:05
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <HiOutlineInformationCircle className="text-gray-400 text-base shrink-0" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your total working time for today is <span className="font-bold text-gray-900 dark:text-white">{formattedTime}</span>
            </p>
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
            onClick={() => onConfirm(notes)}
          >
            Clock Out
          </Button>
        </div>
      </div>
    </Modal>
  );
}
