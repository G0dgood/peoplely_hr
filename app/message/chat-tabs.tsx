"use client";

import * as React from "react";

interface ChatTabsProps {
  activeTab: "all" | "unread";
  setActiveTab: (tab: "all" | "unread") => void;
}

export function ChatTabs({ activeTab, setActiveTab }: ChatTabsProps) {
  return (
    <div className="flex items-center gap-5 px-5 pb-3 border-b border-gray-55 dark:border-gray-800">
      {(["all", "unread"] as const).map((t) => (
        <button
          key={t}
          onClick={() => setActiveTab(t)}
          className={`text-xs font-bold pb-2 border-b-2 transition-colors capitalize ${activeTab === t
            ? "text-primary border-primary"
            : "text-gray-405 dark:text-gray-500 border-transparent hover:text-gray-700"
            }`}
        >
          {t === "all" ? "All" : "Unread"}
        </button>
      ))}
    </div>
  );
}
