import * as React from "react";
import { Card } from "@/components/ui/card";

export function EmployeePerformanceDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950 font-sans w-full animate-pulse">
      
      {/* Title & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          {/* Title */}
          <div className="h-7 w-56 bg-gray-200 dark:bg-gray-800 rounded-md" />
          {/* Breadcrumb */}
          <div className="h-3 w-72 bg-gray-200 dark:bg-gray-800 rounded-md mt-1" />
        </div>
        {/* Back Button */}
        <div className="h-10 w-40 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>

      {/* Profile Details & Score Card */}
      <Card className="overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
          {/* Left Metadata */}
          <div className="md:col-span-2 p-8 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-y-5 gap-x-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="h-2.5 w-24 bg-gray-200 dark:bg-gray-800 rounded-md" />
                  <div className="h-4 w-36 bg-gray-200 dark:bg-gray-800 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Right score */}
          <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="h-12 w-16 bg-gray-200 dark:bg-gray-800 rounded-md my-1" />
            <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded-md" />
          </div>
        </div>
      </Card>

      {/* Performance Metrics Stack */}
      <div className="flex flex-col gap-3">
        <div className="px-1">
          <div className="h-4 w-36 bg-gray-200 dark:bg-gray-800 rounded-md mb-1" />
          <div className="h-2.5 w-80 bg-gray-200 dark:bg-gray-800 rounded-md" />
        </div>

        {/* Table Header Row Placeholder */}
        <div className="grid grid-cols-12 gap-4 px-6 py-2">
          <div className="col-span-5"><div className="h-2 w-32 bg-gray-200 dark:bg-gray-800 rounded-md" /></div>
          <div className="col-span-2"><div className="h-2 w-12 bg-gray-200 dark:bg-gray-800 rounded-md mx-auto" /></div>
          <div className="col-span-2"><div className="h-2 w-20 bg-gray-200 dark:bg-gray-800 rounded-md mx-auto" /></div>
          <div className="col-span-2"><div className="h-2 w-20 bg-gray-200 dark:bg-gray-800 rounded-md mx-auto" /></div>
          <div className="col-span-1"><div className="h-2 w-8 bg-gray-200 dark:bg-gray-800 rounded-md ml-auto" /></div>
        </div>

        {/* KPI list placeholders */}
        <div className="flex flex-col gap-2.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 grid grid-cols-12 gap-4 items-center"
            >
              <div className="col-span-5">
                <div className="h-3 w-40 bg-gray-200 dark:bg-gray-800 rounded-md" />
              </div>
              <div className="col-span-2 flex justify-center">
                <div className="h-9 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              </div>
              <div className="col-span-2 flex justify-center">
                <div className="h-9 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              </div>
              <div className="col-span-2 flex justify-center">
                <div className="h-9 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              </div>
              <div className="col-span-1 text-right">
                <div className="h-3 w-8 bg-gray-200 dark:bg-gray-800 rounded-md ml-auto" />
              </div>
            </div>
          ))}

          {/* Total row placeholder */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-11 text-right pr-4">
              <div className="h-3 w-12 bg-gray-200 dark:bg-gray-800 rounded-md ml-auto" />
            </div>
            <div className="col-span-1 text-right">
              <div className="h-3.5 w-10 bg-gray-200 dark:bg-gray-800 rounded-md ml-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Comments section placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col gap-3">
          <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded-md" />
          <div className="h-24 bg-gray-55/40 dark:bg-gray-950/20 rounded-xl border border-gray-200 dark:border-gray-800" />
        </Card>
        <Card className="p-6 flex flex-col gap-3">
          <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded-md" />
          <div className="h-24 bg-gray-55/40 dark:bg-gray-950/20 rounded-xl border border-gray-200 dark:border-gray-800" />
        </Card>
      </div>

      {/* Action Buttons placeholder */}
      <div className="flex justify-end gap-4">
        <div className="h-11 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        <div className="h-11 w-44 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>
      
    </div>
  );
}
