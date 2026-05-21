"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

const NOTIFICATION_SETTINGS = [
  {
    id: "job-interview",
    title: "Job interview Reminder",
    description: "Allows a user to receive alerts regarding scheduled job interviews",
    isActive: true,
  },
  {
    id: "email-invitation",
    title: "Email Invitation to Join the team",
    description: "Enables users to receive alerts about upcoming job interviews that they have been invited to join",
    isActive: false,
  },
  {
    id: "mention-board",
    title: "Mention In board",
    description: "Enables users to receive alerts about upcoming job interviews that they have been invited to join",
    isActive: true,
  },
  {
    id: "update-status",
    title: "Update Employee Status",
    description: "Enables users to receive alerts about upcoming job interviews that they have been invited to join",
    isActive: true,
  },
];

export default function NotificationPage() {
  const [notifications, setNotifications] = React.useState(NOTIFICATION_SETTINGS);

  const handleToggle = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-8 flex-1 overflow-y-auto">
        <div className="max-w-4xl flex flex-col">
          
          <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-8 flex flex-col gap-8 bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="pb-6 border-b border-gray-300 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Notification
              </h2>
            </div>

            {/* List of Toggles */}
            <div className="flex flex-col gap-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between p-6 rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900"
                >
                  <div className="flex flex-col gap-1.5 max-w-xl">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      {notification.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                      {notification.description}
                    </p>
                  </div>
                  <Toggle
                    checked={notification.isActive}
                    onChange={() => handleToggle(notification.id)}
                  />
                </div>
              ))}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <Button className="h-12 px-8 rounded-xl !bg-black dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:opacity-90 transition-opacity">
                Save
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
