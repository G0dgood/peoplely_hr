"use client";

import * as React from "react";
import { HiChevronRight } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";

interface EditPayrollDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditPayrollDrawer({ isOpen, onClose }: EditPayrollDrawerProps) {
  const [salary, setSalary] = React.useState("3500.00");
  const [bonus, setBonus] = React.useState("0.00");
  const [deductions, setDeductions] = React.useState("0.00");
  const [status, setStatus] = React.useState("Active");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 !bg-black/20 dark:bg-black/40 transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-950 h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
        {/* Floating Close Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-start pl-3 shadow-lg hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer text-gray-400"
          >
            <HiChevronRight className="text-xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 relative z-10 bg-white dark:bg-gray-950">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Payroll</h2>
            <p className="text-sm text-gray-500 mt-1">Update payroll details for Pristia Candra</p>
          </div>

          <div className="flex flex-col gap-6">
            <Input
              label="Base Salary ($)"
              type="number"
              required
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />

            <Input
              label="Bonus / Extras ($)"
              type="number"
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
            />

            <Input
              label="Deductions ($)"
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
            />

            <div className="flex flex-col gap-2">
              <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                Status <span className="text-error">*</span>
              </label>
              <Dropdown
                label={status}
                options={["Active", "Pending", "Processing", "Failed"]}
                onSelect={(val) => setStatus(val)}
                className="w-full"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                Note / Description
              </label>
              <textarea
                placeholder="Optional notes for this update..."
                rows={4}
                className="w-full rounded-xl text-body-md bg-white border border-gray-300 ring-1 ring-transparent focus:ring-[#0FAF7A]/20 focus:border-[#0FAF7A] outline-none transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white p-4 resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center gap-4 relative z-10">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-xl !bg-black dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
