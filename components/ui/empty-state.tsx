"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 py-16 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xs transition-all ${className}`}
    >
      {/* Icon Area */}
      {icon && (
        <div className="mb-4 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:scale-105 transition-transform duration-300">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-xs text-gray-400 dark:text-gray-500 max-w-sm font-semibold mb-5 leading-relaxed">
          {description}
        </p>
      )}

      {/* Action Button */}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="h-10 px-5 text-xs font-bold bg-[#11131A] dark:bg-white text-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
