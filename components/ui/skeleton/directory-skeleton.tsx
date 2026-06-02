import * as React from "react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export function DirectorySkeleton() {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full w-full animate-pulse">
      {/* Header Section */}
      <PageHeader title="Directory" description="This is director board" />

      {/* Directory Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i} className="p-4 md:p-8 flex flex-col items-center h-full">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 mb-6" />
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded-md mb-2" />
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded-md mb-6" />
            <div className="w-full flex flex-col gap-3 pt-6 border-t border-gray-50 dark:border-gray-800">
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded-md" />
              <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-md" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
