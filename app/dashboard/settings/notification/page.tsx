"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const INITIAL_SETTINGS: NotificationSetting[] = [
  {
    id: "time-off",
    title: "Time off management",
    description: "Enable/disable time off management feature for HR management dashboard",
    enabled: true,
  },
  {
    id: "performance",
    title: "Performance Reviews",
    description: "Enable/disable notifications for upcoming or overdue performance reviews",
    enabled: false,
  },
  {
    id: "payroll",
    title: "Payroll",
    description: "Enable/disable notifications for new payroll information or changes",
    enabled: true,
  },
  {
    id: "company-news",
    title: "Company News",
    description: "Enable/disable notifications for company news and updates",
    enabled: false,
  },
  {
    id: "job-openings",
    title: "New Job Openings",
    description: "Enable/disable notifications for new job openings within the company",
    enabled: true,
  },
];

export default function NotificationSettingPage() {
  const [settings, setSettings] = React.useState<NotificationSetting[]>(INITIAL_SETTINGS);
  const [saved, setSaved] = React.useState(false);

  const toggle = (id: string) => {
    setSaved(false);
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Notification Setting
        </h1>
        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 mt-1">
          Setting your notification
        </p>
      </div>

      {/* Settings List */}
      <div className="flex flex-col gap-4">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-center justify-between gap-6 p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-xs"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {setting.title}
              </span>
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 leading-relaxed max-w-xl">
                {setting.description}
              </span>
            </div>
            <div className="flex-shrink-0">
              <Toggle checked={setting.enabled} onChange={() => toggle(setting.id)} />
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-2">
        <button
          onClick={handleSave}
          className={`h-11 px-8 text-sm font-bold rounded-xl transition-all cursor-pointer ${
            saved
              ? "bg-[#0FAF7A] text-white"
              : "bg-[#11131A] dark:bg-white text-white dark:text-gray-900 hover:opacity-90"
          }`}
        >
          {saved ? "Changes Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
