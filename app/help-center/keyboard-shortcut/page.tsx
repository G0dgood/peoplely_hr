"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineChevronUpDown,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

interface ShortcutRow {
  windows: string;
  mac: string;
  action: string;
}

const SHORTCUTS: ShortcutRow[] = [
  { windows: "Alt + /", mac: "Option + /", action: "Global Search to search an employee" },
  { windows: "Alt + Shift + O", mac: "Option + Shift + O", action: "Open Dashboard" },
  { windows: "Alt + Shift + W", mac: "Option + Shift + W", action: "Open News" },
  { windows: "Alt + Shift + E", mac: "Option + Shift + E", action: "Open Employees" },
  { windows: "Alt + Shift + L", mac: "Option + Shift + L", action: "Open Checklists" },
  { windows: "Alt + Shift + T", mac: "Option + Shift + T", action: "Open Time off request" },
  { windows: "Alt + Shift + C", mac: "Option + Shift + C", action: "Open Attendance" },
  { windows: "Alt + Shift + P", mac: "Option + Shift + P", action: "Open Payroll" },
];

export default function KeyboardShortcutPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredShortcuts = SHORTCUTS.filter(
    (row) =>
      row.windows.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.mac.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Title area with Breadcrumbs and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help Center</h1>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-500">
            <Link href="/help-center" className="hover:text-primary transition-colors">
              Help Center
            </Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-gray-400">Keyboard Shortcut</span>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search what you need"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-11 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
        </div>
      </div>

      {/* Main card panel */}
      <div className="flex flex-col gap-6 max-w-5xl">
        <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
          <span>Keyboard Shortcut For Peoplely HR</span>
          <HiOutlineInformationCircle className="text-gray-400 text-lg" />
        </div>

        <Card className="p-4 md:p-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 flex flex-col gap-6">
          <div>
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1.5">
              A list of Keyboard Shortcuts to help you navigate Peoplely HR quicker
            </h2>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
              Here are {SHORTCUTS.length} Keyboard shortcuts that you can use on Peoplely HR to save your time.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5 cursor-pointer select-none">
                      <span>Shortcuts Key on Windows</span>
                      <HiOutlineChevronUpDown className="text-sm" />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5 cursor-pointer select-none">
                      <span>Shortcuts Key on MacOS</span>
                      <HiOutlineChevronUpDown className="text-sm" />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5 cursor-pointer select-none">
                      <span>Header title</span>
                      <HiOutlineChevronUpDown className="text-sm" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredShortcuts.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/30 dark:hover:bg-gray-800/20"
                  >
                    <td className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400">
                      {row.windows}
                    </td>
                    <td className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400">
                      {row.mac}
                    </td>
                    <td className="py-4 px-6 text-xs font-bold text-gray-900 dark:text-white">
                      {row.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredShortcuts.length === 0 && (
              <div className="text-center py-10 text-xs text-gray-400 dark:text-gray-500">
                No matching shortcuts found.
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white">Note :</h3>
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-550 leading-relaxed">
              Make sure that your browser or other browser extensions do not override these shortcuts to function correctly.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
