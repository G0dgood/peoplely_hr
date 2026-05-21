"use client";

import * as React from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddFolderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

export function AddFolderDrawer({ isOpen, onClose, onCreate }: AddFolderDrawerProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name, description);
    setName("");
    setDescription("");
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
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full flex flex-col shadow-2xl transition-all duration-300">
        {/* Dismiss slide button on left edge */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
          >
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col h-full">
          <div className="p-8 flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
              Add New Folder
            </h2>

            <div className="flex flex-col gap-6">
              {/* Folder Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Designer Essensial"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Description
                </label>
                <Input
                  placeholder="Input description folder"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold"
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
              className="flex-1 font-bold h-12 border-gray-300 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-800"
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
    </div>
  );
}
