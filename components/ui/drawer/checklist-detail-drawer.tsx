"use client";

import * as React from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface ChecklistTask {
  id: number;
  taskName: string;
  dueDate: string;
  employeeName: string;
  employeeAvatar: string;
  employeeInitials?: string;
  type: string;
  completed: boolean;
  description?: string;
}

interface ChecklistDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: ChecklistTask | null;
  onMarkAsComplete: (id: number) => void;
}

export function ChecklistDetailDrawer({
  isOpen,
  onClose,
  task,
  onMarkAsComplete,
}: ChecklistDetailDrawerProps) {
  if (!isOpen || !task) return null;

  const defaultDescription =
    task.description ||
    (task.taskName.toLowerCase().includes("collect documents")
      ? "Collect all necessary hard-copy documents from the new hire:\n1. ID card photocopies.\n2. Health check record."
      : "Please upload the scanned copy of the fully signed employment contract for verification.");

  const handleComplete = () => {
    onMarkAsComplete(task.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full flex flex-col shadow-2xl transition-all duration-300">
        {/* Dismiss button on left edge */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
          >
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </div>

        <div className="p-8 flex-1 overflow-y-auto flex flex-col h-full">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 leading-snug">
            {task.taskName}
          </h2>

          <div className="flex flex-col gap-7">
            {/* Due Date */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Due Date
              </span>
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                {task.dueDate}
              </span>
            </div>

            {/* Onboarding For */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Onboarding For
              </span>
              <div className="flex items-center gap-2.5">
                {task.employeeAvatar ? (
                  <Avatar
                    src={task.employeeAvatar}
                    size="sm"
                    className="rounded-full w-6 h-6"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                    {task.employeeInitials || "U"}
                  </div>
                )}
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {task.employeeName}
                </span>
              </div>
            </div>

            {/* Assignee */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Assignee
              </span>
              <div className="flex items-center gap-2.5">
                <Avatar
                  src="https://i.pravatar.cc/150?u=pristia"
                  size="sm"
                  className="rounded-full w-6 h-6"
                />
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  Pristia Candra (me)
                </span>
              </div>
            </div>

            {/* Description Text */}
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line mt-2">
              {defaultDescription}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-8 border-t border-gray-100/50 dark:border-gray-800/30 flex items-center gap-4 bg-white dark:bg-gray-900">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 font-bold h-12 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </Button>
          {!task.completed ? (
            <Button
              onClick={handleComplete}
              className="flex-1 font-bold h-12 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 hover:opacity-90"
            >
              Mark as Complete
            </Button>
          ) : (
            <Button
              disabled
              className="flex-1 font-bold h-12 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600"
            >
              Completed
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
