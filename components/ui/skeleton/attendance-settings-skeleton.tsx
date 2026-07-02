import * as React from "react";
import { Card } from "@/components/ui/card";

export function AttendanceSettingsSkeleton() {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full animate-pulse">
      {/* Header Placeholder */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      </div>

      {/* Main Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Left Nav Placeholder */}
        <div className="flex flex-col gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
              <div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          ))}
        </div>

        {/* Right Form Card Placeholder */}
        <Card className="p-4 md:p-8 border border-gray-200 dark:border-gray-800 md:col-span-3 flex flex-col gap-6">
          {/* Section Title */}
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg" />

          {/* Form Rows */}
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="flex flex-col gap-2 w-full max-w-2xl">
              {/* Label */}
              <div className="h-3.5 w-28 bg-gray-200 dark:bg-gray-800 rounded" />
              {/* Input field */}
              <div className="h-11 w-full bg-gray-100 dark:bg-gray-800/40 rounded-xl" />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
