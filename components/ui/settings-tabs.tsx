"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";

export interface SettingsTabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SettingsTabsProps {
  tabs: SettingsTabItem[];
  activeTab: string;
  onChange: (id: any) => void;
  variant?: "emerald" | "gray" | "primary";
  className?: string;
}

export function SettingsTabs({
  tabs,
  activeTab,
  onChange,
  variant = "emerald",
  className = "",
}: SettingsTabsProps) {
  const getTabClass = (tabId: string) => {
    const base = "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer";
    if (activeTab === tabId) {
      if (variant === "emerald") {
        return `${base} bg-emerald-50 dark:bg-emerald-950/20 text-[#10B981] border border-emerald-100/50 dark:border-emerald-900/30`;
      }
      if (variant === "primary") {
        return `${base} bg-primary/5 text-primary`;
      }
      // "gray" variant
      return `${base} bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white`;
    }
    return `${base} text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/40`;
  };

  return (
    <Card className={`p-4 border border-gray-300 dark:border-gray-800 flex flex-col gap-2 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={getTabClass(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </Card>
  );
}
