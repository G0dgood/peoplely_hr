"use client";

import * as React from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { Card } from "@/components/ui/card";

export function PayrollSection() {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary Info Section */}
      <Card className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div className="flex flex-col gap-6">
            {[
              { label: "Employee Status", value: "Active" },
              { label: "Employment Type", value: "Contractor" },
              { label: "Geofencing", value: "30 Sep 2024" },
            ].map((item) => (
              <div key={item.label} className="flex items-center">
                <span className="w-32 text-xs font-bold text-gray-400 tracking-wider shrink-0">{item.label}</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {[
              { label: "Job Title", value: "Junior UI/UX Designer" },
              { label: "Job Date", value: "16 Feb 2020" },
              { label: "Last Working Date", value: "-" },
            ].map((item) => (
              <div key={item.label} className="flex items-center">
                <span className="w-32 text-xs font-bold text-gray-400 tracking-wider shrink-0">{item.label}</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Total Compensation Card */}
      <Card className="p-6 bg-gray-50/50 dark:bg-gray-800/30 border-none rounded-2xl">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Total Compesation</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">$ 3,729,00</span>
        </div>
      </Card>

      {/* Salary Card */}
      <Card className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Salary</span>
        </div>
      </Card>

      {/* Recurring Card */}
      <Card className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Recurring</span>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-900 dark:text-white">$ 0</span>
            <HiOutlineChevronDown className="text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      </Card>

      {/* One-off Card */}
      <Card className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">One-off</span>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-900 dark:text-white">$ 0</span>
            <HiOutlineChevronDown className="text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      </Card>

      {/* Offset Cards */}
      <Card className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Offset</span>
        </div>
      </Card>

      <Card className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Offset</span>
        </div>
      </Card>
    </div>
  );
}
