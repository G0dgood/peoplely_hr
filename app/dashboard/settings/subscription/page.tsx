"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { UpgradePlanDrawer } from "@/components/ui/drawer";
import { HiChevronUpDown, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const BILLING_HISTORY = [
  { id: 1, plan: "Perform Plan", status: "UNPAID", cycle: "3", createdDate: "20 Jan 2023", endDate: "20 Apr 2023" },
  { id: 2, plan: "Perform Plan", status: "PAID OFF", cycle: "2", createdDate: "20 Jan 2023", endDate: "20 Apr 2023" },
  { id: 3, plan: "Perform Plan", status: "PAID OFF", cycle: "1", createdDate: "20 Jan 2023", endDate: "20 Apr 2023" },
  { id: 4, plan: "Free Plan", status: "NOT ACTIVE", cycle: "0", createdDate: "01 Jan 2023", endDate: "19 Jan 2023" },
];

export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = React.useState("Plan");
  const [isUpgradeOpen, setIsUpgradeOpen] = React.useState(false);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Top Header */}
      <div className="px-8 pt-8 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Subscription
          </h2>
          <Button 
            onClick={() => setIsUpgradeOpen(true)}
            className="h-10 px-6 rounded-xl !bg-black dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Upgrade Plan
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 mt-8">
          <button
            onClick={() => setActiveTab("Plan")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "Plan"
                ? "border-[#0FAF7A] text-[#0FAF7A]"
                : "border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Plan
          </button>
          <button
            onClick={() => setActiveTab("History")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "History"
                ? "border-[#0FAF7A] text-[#0FAF7A]"
                : "border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8 flex-1 overflow-y-auto">
        <div className="max-w-4xl flex flex-col gap-8">
          {activeTab === "Plan" ? (
            <div className="border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col bg-white dark:bg-gray-900">
              {/* Card Header */}
              <div className="px-6 py-6 flex items-center gap-3 border-b border-gray-100 dark:border-gray-800/50">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Perform Plan
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/30 text-[#0FAF7A] text-[10px] font-bold uppercase tracking-widest border border-emerald-100 dark:border-emerald-800/50">
                  ACTIVE
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-6">
                <div className="flex items-center">
                  <span className="w-48 text-sm font-semibold text-gray-400 dark:text-gray-500">
                    Current employees
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    100 Employee
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-48 text-sm font-semibold text-gray-400 dark:text-gray-500">
                    Price
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    $400
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Table Header */}
              <div className="flex items-center px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-2">
                <div className="flex-[1.5] flex items-center gap-1 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">Plan <HiChevronUpDown className="text-sm" /></div>
                <div className="flex-1 flex items-center gap-1 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">Status <HiChevronUpDown className="text-sm" /></div>
                <div className="flex-1 flex items-center gap-1 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">Billing cycle <HiChevronUpDown className="text-sm" /></div>
                <div className="flex-[1.5] flex items-center gap-1 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">Created Date <HiChevronUpDown className="text-sm" /></div>
                <div className="flex-[1.5] flex items-center gap-1 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">End Date <HiChevronUpDown className="text-sm" /></div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col">
                {BILLING_HISTORY.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center px-6 py-4 transition-colors hover:bg-gray-50/30 dark:hover:bg-gray-800/20 ${
                      index !== BILLING_HISTORY.length - 1
                        ? "border-b border-gray-100 dark:border-gray-800/50"
                        : ""
                    }`}
                  >
                    <div className="flex-[1.5] text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {item.plan}
                    </div>
                    <div className="flex-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                        item.status === 'PAID OFF' ? 'bg-emerald-50 text-[#0FAF7A] dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/50' : 
                        item.status === 'UNPAID' ? 'bg-red-50 text-red-500 dark:bg-red-900/30 border border-red-100 dark:border-red-800/50' : 
                        'bg-gray-50 text-gray-400 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {item.cycle}
                    </div>
                    <div className="flex-[1.5] text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {item.createdDate}
                    </div>
                    <div className="flex-[1.5] text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {item.endDate}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-2 mt-6">
                <button className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <HiChevronLeft className="text-sm" />
                </button>
                <button className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-900 dark:text-white font-bold text-xs bg-white dark:bg-gray-900 transition-colors">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <HiChevronRight className="text-sm" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <UpgradePlanDrawer isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />
    </div>
  );
}
