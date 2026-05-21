"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import {
  HiChevronRight,
  HiOutlineCalendar,
  HiOutlineClock,
} from "react-icons/hi2";

interface AddWorkScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddWorkScheduleDrawer({ isOpen, onClose }: AddWorkScheduleDrawerProps) {
  const [scheduleName, setScheduleName] = React.useState("Remote Work");
  const [scheduleType, setScheduleType] = React.useState("duration");
  const [workingDays, setWorkingDays] = React.useState([
    { day: "Monday", active: true, time: "8h 00" },
    { day: "Tuesday", active: true, time: "8h 00" },
    { day: "Wednesday", active: true, time: "8h 00" },
    { day: "Thursday", active: true, time: "8h 00" },
    { day: "Friday", active: true, time: "8h 00" },
    { day: "Saturday", active: false, time: "0h 00" },
    { day: "Sunday", active: false, time: "0h 00" },
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 !bg-black/20 dark:bg-black/40  transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-950 h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
        {/* Floating Close Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-start pl-3 shadow-lg hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer text-gray-400"
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
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Effective from"
                required
                value="09 Mar 2023"
                onChange={() => { }}
                rightIcon={<HiOutlineCalendar className="text-gray-400 dark:text-gray-500 text-lg" />}
              />
              <Input
                label="Standard working hours/day"
                value="8h 00m"
                onChange={() => { }}
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
                  onClick={() => setScheduleType("duration")}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${scheduleType === "duration"
                    ? "border-[#0FAF7A] bg-emerald-50/30 dark:bg-emerald-900/10"
                    : "border-gray-300 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Duration-based</span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${scheduleType === "duration" ? "border-[#0FAF7A]" : "border-gray-300 dark:border-gray-600"
                      }`}>
                      {scheduleType === "duration" && <div className="w-2 h-2 rounded-full bg-[#0FAF7A]" />}
                    </div>
                  </div>
                  <p className="text-[10px] leading-relaxed font-semibold text-gray-400 dark:text-gray-500">
                    Schedule based on a duration without a start and end time. Any time clocked will be counted as paid time.
                  </p>
                </div>
                {/* Clock-based */}
                <div
                  onClick={() => setScheduleType("clock")}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${scheduleType === "clock"
                    ? "border-[#0FAF7A] bg-emerald-50/30 dark:bg-emerald-900/10"
                    : "border-gray-300 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Clock-based</span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${scheduleType === "clock" ? "border-[#0FAF7A]" : "border-gray-300 dark:border-gray-600"
                      }`}>
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
                  <div className="flex-1">Time</div>
                </div>
                <div className="flex flex-col">
                  {workingDays.map((day, idx) => (
                    <div key={day.day} className={`flex items-center px-6 py-4 ${idx !== workingDays.length - 1 ? 'border-b border-gray-300 dark:border-gray-800/50' : ''}`}>
                      <div className="flex-1 flex items-center gap-4">
                        <Toggle
                          checked={day.active}
                          onChange={() => {
                            const newDays = [...workingDays];
                            newDays[idx].active = !newDays[idx].active;
                            setWorkingDays(newDays);
                          }}
                        />
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{day.day}</span>
                      </div>
                      <div className="flex-1">
                        <Input
                          value={day.time}
                          onChange={(e) => {
                            const newDays = [...workingDays];
                            newDays[idx].time = e.target.value;
                            setWorkingDays(newDays);
                          }}
                          disabled={!day.active}
                          rightIcon={<HiOutlineClock className={`text-lg ${day.active ? 'text-gray-400 dark:text-gray-500' : 'text-gray-300 dark:text-gray-600'}`} />}
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
            Total Working Time : <span className="text-[#0FAF7A]">40h 00m</span>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none h-11 px-8 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none h-11 px-8 rounded-xl !bg-black dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
