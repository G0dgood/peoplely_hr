"use client";

import * as React from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SVGLoader } from "@/components/ui/options";

interface NewTemplateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => Promise<void> | void;
}

export function NewTemplateDrawer({ isOpen, onClose, onCreate }: NewTemplateDrawerProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setDescription("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      await onCreate(name, description);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
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
            New Template
          </h2>

          {/* Template Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Template Name *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Description
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl"
            />
          </div>
        </div>

        {/* Footer Actions */}
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
            disabled={isSubmitting}
            leftIcon={isSubmitting ? <SVGLoader width={16} height={16} color="currentColor" /> : undefined}
            className="flex-1 font-bold h-12 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 hover:opacity-90"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
