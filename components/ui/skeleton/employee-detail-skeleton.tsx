import * as React from "react";
import { Card } from "@/components/ui/card";

export function EmployeeDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full w-full animate-pulse">
      {/* Back Button Placeholder */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Profile Card Skeleton */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="p-4 md:p-8 flex flex-col items-center text-center">
            {/* Avatar Placeholder */}
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 mb-6" />
            {/* Name Placeholder */}
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded-md mb-2" />
            {/* Role Placeholder */}
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-md mb-4" />
            {/* Badge Placeholder */}
            <div className="h-7 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl mb-8" />

            {/* Contact Details List */}
            <div className="w-full flex flex-col gap-4 pt-8 border-t border-gray-100 dark:border-gray-850">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
                  <div className="h-3 w-40 bg-gray-200 dark:bg-gray-800 rounded-md" />
                </div>
              ))}
            </div>

            {/* Department/Office/Manager Section */}
            <div className="w-full flex flex-col gap-6 mt-10 pt-8 border-t border-gray-100 dark:border-gray-850 text-left">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="h-2.5 w-16 bg-gray-200 dark:bg-gray-800 rounded-md" />
                    <div className="h-3.5 w-28 bg-gray-200 dark:bg-gray-800 rounded-md" />
                  </div>
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded-md" />
                </div>
              ))}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  <div className="h-2.5 w-20 bg-gray-200 dark:bg-gray-800 rounded-md" />
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
                    <div className="h-3.5 w-24 bg-gray-200 dark:bg-gray-800 rounded-md" />
                  </div>
                </div>
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded-md" />
              </div>
            </div>

            {/* Action Button Placeholder */}
            <div className="h-11 w-full bg-gray-200 dark:bg-gray-800 rounded-xl mt-10" />
          </Card>
        </div>

        {/* Right Column - Tabs and Content Skeleton */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Tabs bar */}
          <Card className="p-2 rounded-xl">
            <div className="flex items-center gap-1 p-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-20 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg" />
              ))}
            </div>
          </Card>

          <div className="flex flex-col gap-6">
            {/* Personal Info Card */}
            <Card className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded-md" />
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-800 rounded-md" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <div key={i} className="flex items-center border-b border-gray-50 dark:border-gray-800/50 pb-4">
                    <div className="w-28 h-3 bg-gray-200 dark:bg-gray-800 rounded-md shrink-0 mr-4" />
                    <div className="h-3 w-40 bg-gray-200 dark:bg-gray-800 rounded-md" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Address Card */}
            <Card className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded-md" />
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-800 rounded-md" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center border-b border-gray-50 dark:border-gray-800/50 pb-4">
                    <div className="w-28 h-3 bg-gray-200 dark:bg-gray-800 rounded-md shrink-0 mr-4" />
                    <div className="h-3 w-48 bg-gray-200 dark:bg-gray-800 rounded-md" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
