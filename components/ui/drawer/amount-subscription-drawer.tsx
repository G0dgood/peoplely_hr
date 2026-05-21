"use client";

import * as React from "react";
import { HiOutlineChevronRight, HiCheck, HiChevronDown } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";

interface AmountSubscriptionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AmountSubscriptionDrawer({ isOpen, onClose }: AmountSubscriptionDrawerProps) {
  const [employees, setEmployees] = React.useState("1");
  const [billingCycle, setBillingCycle] = React.useState("Annual");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 !bg-black/20  transition-opacity"
        onClick={onClose}
      />
      {/* Drawer Panel */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-950 h-full flex flex-col border-l border-gray-300 dark:border-gray-800 transition-transform duration-300 ease-in-out transform translate-x-0">
        {/* Dismiss slide button on left edge */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-800 hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
          >
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </div>

        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between bg-white dark:bg-gray-950">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Amount of subscription
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8 bg-white dark:bg-gray-950 flex flex-col gap-6">

          {/* Selected Plan Summary Card */}
          <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Engage Plan</h3>
                  <span className="px-2 py-0.5 rounded bg-[#FF8A00] text-white text-[10px] font-bold uppercase tracking-widest">BEST VALUE</span>
                </div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">Start building an engaging and distributed work culture.</p>
              </div>
              <HiChevronDown className="text-gray-400 text-xl cursor-pointer" />
            </div>

            <div className="flex items-end gap-1 mt-2">
              <span className="text-2xl font-bold text-[#0FAF7A]">$6</span>
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">/Employee/month</span>
            </div>

            <p className="text-xs font-bold text-gray-900 dark:text-white mt-2">Perform plan, plus Employee Engagement features</p>
            <div className="flex flex-col gap-3">
              {['Peer Feedback & Recognition', 'Polls & Pulse Surveys', 'Company Social Feed', 'Interest Groups', 'Instant Messages'].map(feature => (
                <div key={feature} className="flex items-center gap-3">
                  <HiCheck className="text-lg text-[#0FAF7A]" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-800/50">
              <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">14-day free trial · No credit card required</span>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="flex flex-col gap-6 mt-4">
            <Input
              label="Number of employees *"
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
              className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800"
            />

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                Billing Circle <span className="text-red-500">*</span>
              </span>
              <Dropdown
                label={billingCycle}
                options={["Monthly", "Annual"]}
                onSelect={(val) => setBillingCycle(val)}
                className="w-full h-12 rounded-xl"
              />
              <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 mt-1">
                Unit price: $72 / employee / year
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-300 dark:border-gray-800 flex items-center justify-end gap-4 bg-white dark:bg-gray-950">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-32 font-bold h-12 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="w-32 font-bold h-12 !bg-black dark:bg-white text-white dark:text-gray-900 hover:opacity-90"
          >
            Continue
          </Button>
        </div>

      </div>
    </div>
  );
}
