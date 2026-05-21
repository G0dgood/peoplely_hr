import * as React from "react";

export interface PolicySection {
  heading: string;
  body: string;
}

export interface PolicyCardProps {
  title: string;
  sections: PolicySection[];
  className?: string;
}

export function PolicyCard({ title, sections, className = "" }: PolicyCardProps) {
  return (
    <div
      className={`border rounded-3xl p-6 sm:p-10 shadow-sm bg-white border-gray-300 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-6 mb-6 border-gray-300 dark:border-gray-800">
        <h1 className="text-h4 font-bold text-gray-900 dark:text-white">{title}</h1>
        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold select-none">
          i
        </span>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-8 text-body-sm leading-relaxed font-medium text-gray-700 dark:text-gray-300">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col gap-3">
            <h3 className="text-body-md font-bold text-gray-900 dark:text-white">
              {section.heading}
            </h3>
            <p>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
