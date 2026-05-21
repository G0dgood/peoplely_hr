"use client";

import * as React from "react";
import {
  HiOutlineChevronRight,
  HiOutlineCalendarDays,
  HiOutlineMagnifyingGlass,
  HiOutlineBold,
  HiOutlineItalic,
  HiOutlineUnderline,
  HiOutlineFaceSmile,
  HiOutlineLink,
  HiOutlineListBullet,
  HiOutlineBars3BottomLeft,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";

interface NewTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (taskData: {
    taskName: string;
    dueDate: string;
    employeeName: string;
    description: string;
  }) => void;
}

export function NewTaskDrawer({ isOpen, onClose, onCreate }: NewTaskDrawerProps) {
  const [taskName, setTaskName] = React.useState("Prepare company welcome kit");
  const [taskType, setTaskType] = React.useState("Checkbox");
  const [assigneeType, setAssigneeType] = React.useState("Specific Employee");
  const [assigneeName, setAssigneeName] = React.useState("Dulce Philips");
  const [dueDate, setDueDate] = React.useState("14 Feb 2023");
  const [description, setDescription] = React.useState(
    "Please ensure that your new team member have a prepared workstation with:\n1. Laptop\n2. Work email\n3. Internet/Team sites access"
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !dueDate || !assigneeName) return;
    onCreate({
      taskName,
      dueDate,
      employeeName: assigneeName,
      description,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 "
        onClick={onClose}
      />
      {/* Drawer Panel */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-xl bg-white dark:bg-gray-900 h-full flex flex-col shadow-2xl transition-all duration-300"
      >
        {/* Dismiss button on left edge */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
          >
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </div>

        <div className="p-8 flex-1 overflow-y-auto flex flex-col h-full gap-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            New Task
          </h2>

          {/* Task Name & Task Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Task Name *
              </label>
              <Input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                className="h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Task Type *
              </label>
              <Dropdown
                label={taskType}
                options={["Checkbox", "File Upload", "Input Text"]}
                onSelect={(val) => setTaskType(val)}
                className="w-full"
              />
            </div>
          </div>

          {/* Assignee Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Assignee *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <Dropdown
                label={assigneeType}
                options={["Specific Employee", "All Employees", "Manager"]}
                onSelect={(val) => setAssigneeType(val)}
                className="w-full"
              />

              <div className="relative">
                <Input
                  value={assigneeName}
                  onChange={(e) => setAssigneeName(e.target.value)}
                  required
                  placeholder="Employee name"
                  className="h-11 pr-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl"
                />
                <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Due Date *
            </label>
            <div className="relative">
              <Input
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="h-11 pr-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl"
              />
              <HiOutlineCalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            </div>
          </div>

          {/* Description with formatting toolbar */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Description
            </label>
            <div className="border border-gray-300 dark:border-gray-800 rounded-xl overflow-hidden flex flex-col bg-white dark:bg-gray-900">
              {/* Toolbar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-300 dark:border-gray-800 text-gray-550 dark:text-gray-455 bg-gray-50/40 dark:bg-gray-900/50">
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm transition-colors"
                >
                  <HiOutlineBold className="font-bold text-base" />
                </button>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm transition-colors"
                >
                  <HiOutlineItalic className="text-base" />
                </button>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm transition-colors"
                >
                  <HiOutlineUnderline className="text-base" />
                </button>
                <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-850 mx-1" />
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm transition-colors"
                >
                  <HiOutlineFaceSmile className="text-base" />
                </button>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm transition-colors"
                >
                  <HiOutlineLink className="text-base" />
                </button>
                <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-850 mx-1" />
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm transition-colors"
                >
                  <HiOutlineListBullet className="text-base" />
                </button>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm transition-colors"
                >
                  <HiOutlineBars3BottomLeft className="text-base" />
                </button>
              </div>

              {/* Textarea */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="p-4 bg-transparent outline-none text-xs font-semibold text-gray-800 dark:text-gray-200 resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-8 border-t border-gray-300 dark:border-gray-800 flex items-center gap-4 bg-white dark:bg-gray-900">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 font-bold h-12 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 font-bold h-12 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 hover:opacity-90"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
