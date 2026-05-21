"use client";

import * as React from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewTypeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (type: { name: string; status: "PAID" | "UNPAID"; unit: "Days" | "Hours" }) => void;
}

export function NewTypeDrawer({ isOpen, onClose, onAdd }: NewTypeDrawerProps) {
  const [name, setName] = React.useState("");
  const [paidType, setPaidType] = React.useState<"paid" | "unpaid">("unpaid");
  const [unit, setUnit] = React.useState<"days" | "hours">("days");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd?.({
      name,
      status: paidType === "paid" ? "PAID" : "UNPAID",
      unit: unit === "days" ? "Days" : "Hours"
    });
    setName("");
    setPaidType("unpaid");
    setUnit("days");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/20 "
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full flex flex-col shadow-2xl"
      >
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
            Add Type
          </h2>

          <div className="flex flex-col gap-6">
            {/* Type Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Type Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Engagement"
                className="h-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800"
                required
              />
            </div>

            {/* Paid/Unpaid */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Paid/Unpaid <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaidType("paid")}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${paidType === "paid"
                    ? "border-primary bg-white dark:bg-gray-900"
                    : "border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900"
                    }`}
                >
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Paid</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${paidType === "paid"
                    ? "border-primary animate-scaleIn"
                    : "border-gray-300 dark:border-gray-800"
                    }`}>
                    {paidType === "paid" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaidType("unpaid")}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${paidType === "unpaid"
                    ? "border-primary bg-white dark:bg-gray-900"
                    : "border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900"
                    }`}
                >
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Unpaid</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${paidType === "unpaid"
                    ? "border-primary"
                    : "border-gray-300 dark:border-gray-800"
                    }`}>
                    {paidType === "unpaid" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Unit */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Unit <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setUnit("days")}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${unit === "days"
                    ? "border-primary bg-white dark:bg-gray-900"
                    : "border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900"
                    }`}
                >
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Days</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${unit === "days"
                    ? "border-primary"
                    : "border-gray-300 dark:border-gray-800"
                    }`}>
                    {unit === "days" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("hours")}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${unit === "hours"
                    ? "border-primary bg-white dark:bg-gray-900"
                    : "border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900"
                    }`}
                >
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Hours</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${unit === "hours"
                    ? "border-primary"
                    : "border-gray-300 dark:border-gray-800"
                    }`}>
                    {unit === "hours" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-8 border-t border-gray-300 dark:border-gray-800 flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 font-bold h-12"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1 font-bold h-12 bg-[#11131A] dark:bg-white dark:text-gray-900">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
