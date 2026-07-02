"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineInformationCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineChevronUpDown,
  HiOutlineSparkles,
  HiOutlineCommandLine,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ShortcutRow {
  windows: string[];
  mac: string[];
  action: string;
  code: string; // identifier for shortcut trigger
}

const SHORTCUTS: ShortcutRow[] = [
  { windows: ["Alt", "/"], mac: ["Option", "/"], action: "Global Search to search an employee", code: "SEARCH" },
  { windows: ["Alt", "Shift", "O"], mac: ["Option", "Shift", "O"], action: "Open Dashboard", code: "DASHBOARD" },
  { windows: ["Alt", "Shift", "W"], mac: ["Option", "Shift", "W"], action: "Open News", code: "NEWS" },
  { windows: ["Alt", "Shift", "E"], mac: ["Option", "Shift", "E"], action: "Open Employees", code: "EMPLOYEES" },
  { windows: ["Alt", "Shift", "L"], mac: ["Option", "Shift", "L"], action: "Open Checklists", code: "CHECKLISTS" },
  { windows: ["Alt", "Shift", "T"], mac: ["Option", "Shift", "T"], action: "Open Time off request", code: "TIMEOFF" },
  { windows: ["Alt", "Shift", "C"], mac: ["Option", "Shift", "C"], action: "Open Attendance", code: "ATTENDANCE" },
  { windows: ["Alt", "Shift", "P"], mac: ["Option", "Shift", "P"], action: "Open Payroll", code: "PAYROLL" },
];

export default function KeyboardShortcutPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeKeys, setActiveKeys] = React.useState<string[]>([]);
  const [lastTriggered, setLastTriggered] = React.useState<string | null>(null);

  // Keyboard shortcut listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keysPressed: string[] = [];
      if (e.altKey) keysPressed.push("Alt/Option");
      if (e.shiftKey) keysPressed.push("Shift");
      if (e.key && e.key !== "Alt" && e.key !== "Shift") {
        keysPressed.push(e.key.toUpperCase());
      }
      setActiveKeys(keysPressed);

      // Check matches
      const isAlt = e.altKey;
      const isShift = e.shiftKey;
      const upperKey = e.key.toUpperCase();

      let matched: ShortcutRow | undefined;

      if (isAlt && !isShift && e.key === "/") {
        matched = SHORTCUTS.find((s) => s.code === "SEARCH");
      } else if (isAlt && isShift) {
        if (upperKey === "O") matched = SHORTCUTS.find((s) => s.code === "DASHBOARD");
        else if (upperKey === "W") matched = SHORTCUTS.find((s) => s.code === "NEWS");
        else if (upperKey === "E") matched = SHORTCUTS.find((s) => s.code === "EMPLOYEES");
        else if (upperKey === "L") matched = SHORTCUTS.find((s) => s.code === "CHECKLISTS");
        else if (upperKey === "T") matched = SHORTCUTS.find((s) => s.code === "TIMEOFF");
        else if (upperKey === "C") matched = SHORTCUTS.find((s) => s.code === "ATTENDANCE");
        else if (upperKey === "P") matched = SHORTCUTS.find((s) => s.code === "PAYROLL");
      }

      if (matched) {
        e.preventDefault();
        triggerShortcut(matched);
      }
    };

    const handleKeyUp = () => {
      setActiveKeys([]);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const triggerShortcut = (shortcut: ShortcutRow) => {
    setLastTriggered(shortcut.action);
    toast.success(`Shortcut Triggered: ${shortcut.action}`, {
      description: `Action simulated successfully.`,
      icon: <HiOutlineSparkles className="text-teal-500 w-5 h-5" />,
    });
    setTimeout(() => setLastTriggered(null), 3000);
  };

  const filteredShortcuts = SHORTCUTS.filter(
    (row) =>
      row.windows.join(" ").toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.mac.join(" ").toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            placeholder="Search shortcut or action"
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
          <span>Keyboard Shortcuts for Peoplely HR</span>
          <HiOutlineInformationCircle className="text-gray-400 text-lg" />
        </div>

        {/* Real-time Event Listener Status Overlay */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 md:p-6 bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-transparent border border-teal-500/20 dark:border-teal-500/10 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center text-teal-600 dark:text-teal-400 text-lg animate-pulse">
              <HiOutlineCommandLine />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white">Live Shortcut Listener Active</p>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500">Press the keys on your keyboard to trigger actions</p>
            </div>
          </div>
          
          <div className="flex gap-2 items-center min-h-10 mt-3 md:mt-0">
            {activeKeys.length > 0 ? (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 mr-1 animate-pulse">Detecting:</span>
                {activeKeys.map((k, idx) => (
                  <kbd key={idx} className="px-2.5 py-1 bg-teal-600 text-white border border-teal-700 rounded-lg font-mono text-xs font-black shadow-md">
                    {k}
                  </kbd>
                ))}
              </div>
            ) : lastTriggered ? (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-bounce flex items-center gap-1">
                <HiOutlineSparkles /> Action Triggered: {lastTriggered}!
              </span>
            ) : (
              <span className="text-[10px] font-bold text-gray-450 dark:text-gray-600 italic">No keys pressed currently</span>
            )}
          </div>
        </div>

        <Card className="p-4 md:p-8 border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-gray-900 flex flex-col gap-6 shadow-sm rounded-2xl">
          <div>
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1.5">
              Navigate Peoplely HR Quicker
            </h2>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
              We have set up {SHORTCUTS.length} keyboard shortcuts that allow you to glide through the employee, checklist, payroll, and dashboard views instantly.
            </p>
          </div>

          <div className="overflow-x-auto border border-gray-100 dark:border-gray-800/60 rounded-xl">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-900/30">
                  <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Windows & Linux
                  </th>
                  <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    macOS
                  </th>
                  <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Action Performed
                  </th>
                  <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">
                    Quick Test
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                {filteredShortcuts.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors"
                  >
                    <td className="py-4 px-6 text-xs font-bold text-gray-600 dark:text-gray-300">
                      <div className="flex gap-1 items-center">
                        {row.windows.map((key, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && <span className="text-gray-300 dark:text-gray-700">+</span>}
                            <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-300/60 dark:border-gray-700 rounded-md font-mono text-[10px] text-gray-750 dark:text-gray-300 shadow-sm font-bold">
                              {key}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-bold text-gray-600 dark:text-gray-300">
                      <div className="flex gap-1 items-center">
                        {row.mac.map((key, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && <span className="text-gray-300 dark:text-gray-700">+</span>}
                            <kbd className="px-2 py-0.5 bg-gray-105 dark:bg-gray-800 border border-gray-300/60 dark:border-gray-700 rounded-md font-mono text-[10px] text-gray-750 dark:text-gray-300 shadow-sm font-bold">
                              {key}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-bold text-gray-900 dark:text-white">
                      {row.action}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => triggerShortcut(row)}
                        className="px-2.5 py-1 text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 rounded-lg hover:bg-teal-100/60 dark:hover:bg-teal-950/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                      >
                        Simulate
                      </button>
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
            <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <HiOutlineInformationCircle className="text-teal-600" />
              Note :
            </h3>
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 leading-relaxed pl-5">
              Make sure that your browser or operating system does not override these combinations (e.g. system utility triggers) so that Peoplely HR can intercept and run them successfully.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
