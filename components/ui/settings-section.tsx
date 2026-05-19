"use client";

import * as React from "react";
import { HiOutlinePencilSquare, HiOutlineChevronDown } from "react-icons/hi2";
import { Card } from "@/components/ui/card";

export function SettingsSection() {
  return (
    <div className="flex flex-col gap-6">
      {/* Account Settings Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Account Settings</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <HiOutlinePencilSquare className="text-xl" />
          </button>
        </div>
        
        <div className="flex items-center">
          <span className="w-32 text-xs font-bold text-gray-400 tracking-wider shrink-0">Timezone</span>
          <span className="text-xs font-bold text-gray-900 dark:text-white">GMT +07:00 Bangkok, Ha Noi, Jakarta</span>
        </div>
      </Card>

      {/* Privacy Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Privacy</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <HiOutlinePencilSquare className="text-xl" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400">Who can see your birthday on calendar?</p>
          <div className="relative group min-w-[160px]">
            <button className="w-full flex items-center justify-between px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
              Everyone
              <HiOutlineChevronDown className="text-gray-400 dark:text-gray-500" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
