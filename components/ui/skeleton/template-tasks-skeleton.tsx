import * as React from "react";
import { Card } from "@/components/ui/card";

export function TemplateTasksSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <Card
          key={i}
          className="border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xs p-6 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            {/* Chevron expand placeholder */}
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded" />
            
            {/* Task Name placeholder */}
            <div className="h-4 w-40 sm:w-60 bg-gray-200 dark:bg-gray-800 rounded" />
            
            {/* Tag placeholder */}
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>

          {/* Action buttons placeholder */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800" />
          </div>
        </Card>
      ))}
    </div>
  );
}
