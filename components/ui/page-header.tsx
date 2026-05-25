import * as React from "react";

export interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <div className={className}>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      )}
    </div>
  );
}
