import * as React from "react";
import { Card } from "@/components/ui/card";

export function RecruitmentSettingsSkeleton() {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full w-full animate-pulse">
      {/* Header Placeholder */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      </div>

      {/* Main Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Left Nav Placeholder */}
        <div className="flex flex-col gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
              <div className="w-5 h-5 rounded bg-gray-250 dark:bg-gray-800" />
              <div className="h-4 w-24 bg-gray-255 dark:bg-gray-800 rounded" />
            </div>
          ))}
        </div>

        {/* Right Content Placeholder */}
        <Card className="p-4 md:p-8 border border-gray-200 dark:border-gray-800 md:col-span-3 flex flex-col gap-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-10 w-28 bg-gray-200 dark:bg-gray-800 rounded-xl" />
          </div>

          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800/40 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
                <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-850" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function RecruitmentJobsSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="px-8 py-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex items-center gap-3">
                <div className="h-5 w-40 bg-gray-200 dark:bg-gray-800 rounded-md" />
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded-full" />
              </div>
              <div className="h-3 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-250 dark:bg-gray-800 ring-2 ring-white dark:ring-gray-900" />
                  <div className="w-8 h-8 rounded-full bg-gray-255 dark:bg-gray-800 ring-2 ring-white dark:ring-gray-900" />
                  <div className="w-8 h-8 rounded-full bg-gray-260 dark:bg-gray-800 ring-2 ring-white dark:ring-gray-900" />
                </div>
                <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-3 self-center">
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <div className="w-9 h-9 rounded-xl bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function RecruitmentCandidatesSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={i} className="border-b border-gray-200 dark:border-gray-850 animate-pulse">
          <td className="py-4 px-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="flex flex-col gap-1.5">
                <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-2.5 w-36 bg-gray-150 dark:bg-gray-850 rounded" />
              </div>
            </div>
          </td>
          <td className="py-4 px-4">
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
          </td>
          <td className="py-4 px-4">
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
          </td>
          <td className="py-4 px-4">
            <div className="h-3.5 w-16 bg-gray-200 dark:bg-gray-800 rounded-md" />
          </td>
          <td className="py-4 px-4">
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
          </td>
          <td className="py-4 px-4">
            <div className="h-8 w-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          </td>
          <td className="py-4 px-4 text-right">
            <div className="flex justify-end gap-2">
              <div className="w-8 h-8 rounded bg-gray-150 dark:bg-gray-800" />
              <div className="w-8 h-8 rounded bg-gray-150 dark:bg-gray-800" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export function RecruitmentJobDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full w-full animate-pulse">
      {/* Header Placeholder */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          <div className="h-4 w-60 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-11 w-40 bg-gray-200 dark:bg-gray-800 rounded-xl" />
          <div className="h-11 w-28 bg-gray-200 dark:bg-gray-800 rounded-xl" />
          <div className="h-9 w-20 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        </div>
      </div>

      {/* Kanban Board Columns Placeholder */}
      <div className="flex gap-4 overflow-x-auto pb-4 items-start min-h-[500px] mt-6">
        {[1, 2, 3, 4].map((col) => (
          <div key={col} className="flex flex-col gap-4 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-300 dark:border-gray-800 rounded-3xl p-4 min-h-[450px] w-[290px] shrink-0">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>
            {[1, 2].map((card) => (
              <Card key={card} className="p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
                  <div className="flex flex-col gap-1">
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="h-2 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                  </div>
                </div>
                <div className="h-2 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="h-2 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-2 w-10 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
