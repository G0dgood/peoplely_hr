"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { SVGLoader } from "@/components/ui/options";
import {
  HiChevronRight,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineChevronLeft,
  HiOutlineChevronRight as HiChevronRightSm,
} from "react-icons/hi2";

interface DayEntry {
  day: string;
  active: boolean;
  time: string;
}

interface AddWorkScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (data: {
    title: string;
    scheduleType: string;
    standardHours: string;
    effectiveFrom: string;
    totalHours: string;
    dailyHours: { day: string; hours: string; active: boolean }[];
  }) => Promise<void> | void;
  isLoading?: boolean;
}


const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function formatDate(d: Date): string {
  const day = d.getDate().toString().padStart(2, "0");
  const month = MONTH_SHORT[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function getCalendarDays(year: number, month: number) {
  // month is 0-indexed
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; // shift to Mon-start
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const cells: { day: number; currentMonth: boolean }[] = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, currentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, currentMonth: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - startOffset - daysInMonth + 1, currentMonth: false });
  }
  return cells;
}

interface DatePickerPopoverProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

function DatePickerPopover({ value, onChange, disabled }: DatePickerPopoverProps) {
  const today = new Date();
  const [open, setOpen] = React.useState(false);
  const [viewYear, setViewYear] = React.useState(today.getFullYear());
  const [viewMonth, setViewMonth] = React.useState(today.getMonth());
  const ref = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells = getCalendarDays(viewYear, viewMonth);

  const selectedDate = (() => {
    if (!value) return null;
    const parts = value.split(" ");
    if (parts.length !== 3) return null;
    const d = parseInt(parts[0]);
    const m = MONTH_SHORT.indexOf(parts[1]);
    const y = parseInt(parts[2]);
    if (isNaN(d) || m === -1 || isNaN(y)) return null;
    return new Date(y, m, d);
  })();

  const isSelected = (day: number) =>
    selectedDate !== null &&
    selectedDate.getFullYear() === viewYear &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getDate() === day;

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const handleSelect = (day: number) => {
    onChange(formatDate(new Date(viewYear, viewMonth, day)));
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <label className="block text-body-sm font-bold text-gray-900 dark:text-white mb-1.5">
        Effective from <span className="text-red-500">*</span>
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        className={`w-full h-11 px-4 flex items-center justify-between rounded-xl border text-xs font-semibold transition-all outline-none
          ${
            open
              ? "border-[#0FAF7A] ring-2 ring-[#0FAF7A]/20"
              : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
          }
          ${ disabled ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900 cursor-pointer" }
          text-left`}
      >
        <span className={value ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}>
          {value || "Select a date"}
        </span>
        <HiOutlineCalendarDays className={`text-lg flex-shrink-0 ${ open ? "text-[#0FAF7A]" : "text-gray-400 dark:text-gray-500" }`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-[200] w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-5">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
              <HiOutlineChevronLeft className="text-base" />
            </button>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
              <HiChevronRightSm className="text-base" />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_LABELS.map(l => (
              <div key={l} className="text-center text-[10px] font-bold text-gray-400 dark:text-gray-500 py-1">{l}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((cell, i) => {
              const sel = cell.currentMonth && isSelected(cell.day);
              const tod = cell.currentMonth && isToday(cell.day) && !sel;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!cell.currentMonth}
                  onClick={() => cell.currentMonth && handleSelect(cell.day)}
                  className={`h-8 w-full text-xs font-bold rounded-lg transition-colors
                    ${ sel
                        ? "bg-[#0FAF7A] text-white"
                        : tod
                        ? "border border-[#0FAF7A] text-[#0FAF7A]"
                        : cell.currentMonth
                        ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        : "text-gray-300 dark:text-gray-700 cursor-default"
                    }`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function parseHoursToMinutes(hoursStr: string): number {
  const match = hoursStr.match(/(\d+)h\s*(\d+)?m?/);
  if (!match) return 0;
  const h = parseInt(match[1]) || 0;
  const m = parseInt(match[2]) || 0;
  return h * 60 + m;
}

function formatMinutesToHours(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function AddWorkScheduleDrawer({ isOpen, onClose, onCreate, isLoading = false }: AddWorkScheduleDrawerProps) {
  const [scheduleName, setScheduleName] = React.useState("");
  const [scheduleType, setScheduleType] = React.useState("duration");
  const [effectiveFrom, setEffectiveFrom] = React.useState("");
  const [standardHours, setStandardHours] = React.useState("8h 00m");
  const [workingDays, setWorkingDays] = React.useState<DayEntry[]>([]);

  const totalHoursCalc = React.useMemo(() => {
    const total = workingDays
      .filter((d) => d.active)
      .reduce((sum, d) => sum + parseHoursToMinutes(d.time), 0);
    return formatMinutesToHours(total);
  }, [workingDays]);

  // Reset form when closed
  React.useEffect(() => {
    if (!isOpen) {
      setScheduleName("");
      setScheduleType("duration");
      setEffectiveFrom("");
      setStandardHours("8h 00m");
      setWorkingDays([]);
    }
  }, [isOpen]);

  const handleDayToggle = (idx: number) => {
    setWorkingDays((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], active: !next[idx].active };
      return next;
    });
  };

  const handleDayTime = (idx: number, value: string) => {
    setWorkingDays((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], time: value };
      return next;
    });
  };

  const handleCreate = async () => {
    if (!scheduleName.trim() || !effectiveFrom.trim() || isLoading) return;
    await onCreate?.({
      title: scheduleName.trim(),
      scheduleType,
      standardHours,
      effectiveFrom: effectiveFrom.trim(),
      totalHours: totalHoursCalc,
      dailyHours: workingDays
        .filter((d) => d.active)
        .map((d) => ({ day: d.day, hours: d.time, active: d.active })),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 !bg-black/20 dark:bg-black/40 transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-950 h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
        {/* Floating Close Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={!isLoading ? onClose : undefined}
            disabled={isLoading}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-start pl-3 shadow-lg hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer text-gray-400 disabled:opacity-50"
          >
            <HiChevronRight className="text-xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 relative z-10 bg-white dark:bg-gray-950">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Work Schedule</h2>

          <div className="flex flex-col gap-6">
            <Input
              label="Schedule Name"
              required
              placeholder="e.g. Mon-Fri, Duration 40 hours/week"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              disabled={isLoading}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DatePickerPopover
                value={effectiveFrom}
                onChange={setEffectiveFrom}
                disabled={isLoading}
              />
              <Input
                label="Standard working hours/day"
                value={standardHours}
                onChange={(e) => setStandardHours(e.target.value)}
                disabled={isLoading}
                rightIcon={<HiOutlineClock className="text-gray-400 dark:text-gray-500 text-lg" />}
              />
            </div>

            {/* Schedule Type */}
            <div className="flex flex-col gap-3">
              <label className="text-body-sm font-bold text-gray-900 dark:text-white">
                Schedule type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Duration-based */}
                <div
                  onClick={() => !isLoading && setScheduleType("duration")}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${scheduleType === "duration"
                    ? "border-[#0FAF7A] bg-emerald-50/30 dark:bg-emerald-900/10"
                    : "border-gray-300 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Duration-based</span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${scheduleType === "duration" ? "border-[#0FAF7A]" : "border-gray-300 dark:border-gray-600"}`}>
                      {scheduleType === "duration" && <div className="w-2 h-2 rounded-full bg-[#0FAF7A]" />}
                    </div>
                  </div>
                  <p className="text-[10px] leading-relaxed font-semibold text-gray-400 dark:text-gray-500">
                    Schedule based on a duration without a start and end time. Any time clocked will be counted as paid time.
                  </p>
                </div>
                {/* Clock-based */}
                <div
                  onClick={() => !isLoading && setScheduleType("clock")}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${scheduleType === "clock"
                    ? "border-[#0FAF7A] bg-emerald-50/30 dark:bg-emerald-900/10"
                    : "border-gray-300 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Clock-based</span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${scheduleType === "clock" ? "border-[#0FAF7A]" : "border-gray-300 dark:border-gray-600"}`}>
                      {scheduleType === "clock" && <div className="w-2 h-2 rounded-full bg-[#0FAF7A]" />}
                    </div>
                  </div>
                  <p className="text-[10px] leading-relaxed font-semibold text-gray-400 dark:text-gray-500">
                    Schedule with a fixed start and end time. Only time clocked during the schedule will be counted as paid time.
                  </p>
                </div>
              </div>
            </div>

            {/* Working Time Table */}
            <div className="flex flex-col gap-3 mt-2">
              <label className="text-body-sm font-bold text-gray-900 dark:text-white">
                Working Time
              </label>
              <div className="border border-gray-300 dark:border-gray-800 rounded-xl overflow-hidden">
                <div className="flex px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 text-[11px] font-bold text-gray-400 dark:text-gray-500 border-b border-gray-300 dark:border-gray-800">
                  <div className="flex-1">Working Day</div>
                  <div className="flex-1">Hours</div>
                </div>
                <div className="flex flex-col">
                  {workingDays.map((day, idx) => (
                    <div key={day.day} className={`flex items-center px-6 py-4 ${idx !== workingDays.length - 1 ? "border-b border-gray-300 dark:border-gray-800/50" : ""}`}>
                      <div className="flex-1 flex items-center gap-4">
                        <Toggle
                          checked={day.active}
                          onChange={() => handleDayToggle(idx)}
                        />
                        <span className={`text-xs font-bold transition-colors ${day.active ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
                          {day.day}
                        </span>
                      </div>
                      <div className="flex-1">
                        <Input
                          value={day.time}
                          onChange={(e) => handleDayTime(idx, e.target.value)}
                          disabled={!day.active || isLoading}
                          rightIcon={<HiOutlineClock className={`text-lg ${day.active ? "text-gray-400 dark:text-gray-500" : "text-gray-300 dark:text-gray-600"}`} />}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="text-xs font-bold text-gray-900 dark:text-white">
            Total Working Time : <span className="text-[#0FAF7A]">{totalHoursCalc}</span>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={!isLoading ? onClose : undefined}
              disabled={isLoading}
              className="flex-1 sm:flex-none h-11 px-8 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={isLoading || !scheduleName.trim() || !effectiveFrom.trim()}
              className="flex-1 sm:flex-none h-11 px-8 rounded-xl !bg-black dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <SVGLoader width={16} height={16} color="#ffffff" />}
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
