"use client";

import * as React from "react";
import {
  HiOutlineCog6Tooth,
  HiOutlineGlobeAlt,
  HiOutlineQrCode,
  HiOutlineCalendarDays,
  HiOutlineEllipsisVertical
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Dropdown } from "@/components/ui/dropdown";
import { DatePicker } from "@/components/ui/date-picker";

type TabType = "general" | "location" | "qrcode";

export default function AttendanceSettingsPage() {
  const [activeTab, setActiveTab] = React.useState<TabType>("general");
  const [startDate, setStartDate] = React.useState("11 Feb 2023");
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  const tabClass = (tab: TabType) =>
    `w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all text-left ${
      activeTab === tab
        ? "bg-emerald-50 dark:bg-emerald-950/20 text-[#10B981] border border-emerald-100/50 dark:border-emerald-900/30"
        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/40"
    }`;

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setting Attendance</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Setting your Attendance</p>
      </div>

      {/* Main Settings Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Left Side settings nav */}
        <Card className="p-4 border border-gray-200 dark:border-gray-800 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("general")}
            className={tabClass("general")}
          >
            <HiOutlineCog6Tooth className="text-lg" />
            <span>General</span>
          </button>
          <button
            onClick={() => setActiveTab("location")}
            className={tabClass("location")}
          >
            <HiOutlineGlobeAlt className="text-lg" />
            <span>Location & Policy</span>
          </button>
          <button
            onClick={() => setActiveTab("qrcode")}
            className={tabClass("qrcode")}
          >
            <HiOutlineQrCode className="text-lg" />
            <span>QR Code</span>
          </button>
        </Card>

        {/* Right Side Settings Form Container */}
        <Card className="p-8 border border-gray-200 dark:border-gray-800 md:col-span-3">
          {activeTab === "general" && (
            <div className="flex flex-col gap-6 max-w-2xl">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">General</h2>
              </div>

              {/* Total Hours Calculation */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-900 dark:text-white">
                  Total Hours Calculation <span className="text-red-500">*</span>
                </label>
                <Dropdown
                  label="Every Valid Check-in & Check-out"
                  options={[
                    "Every Valid Check-in & Check-out",
                    "First Check-in & Last Check-out",
                    "Fixed Working Hours Only"
                  ]}
                  className="w-full select-dropdown-full"
                />
              </div>

              {/* Attendance Start Date */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-900 dark:text-white">
                  Attendance Start Date <span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <button
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span>{startDate}</span>
                    <HiOutlineCalendarDays className="text-gray-400 text-lg ml-auto" />
                  </button>
                  <DatePicker
                    isOpen={isDatePickerOpen}
                    onClose={() => setIsDatePickerOpen(false)}
                    onSave={(date) => setStartDate(date.split(" - ")[0] || date)}
                  />
                </div>
              </div>

              {/* Attendance Approval Cycle */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-900 dark:text-white">
                  Attendance Approval Cycle <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Dropdown
                    label="1"
                    options={["1", "2", "3", "4", "5", "10", "15", "20", "25", "28", "30"]}
                    className="w-full"
                  />
                  <Dropdown
                    label="Monthly"
                    options={["Monthly", "Weekly", "Bi-weekly"]}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Repeat On */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-900 dark:text-white">
                  Repeat On <span className="text-red-500">*</span>
                </label>
                <Dropdown
                  label="Monthly on Day 11"
                  options={[
                    "Monthly on Day 1",
                    "Monthly on Day 11",
                    "Monthly on Day 15",
                    "Monthly on Last Day"
                  ]}
                  className="w-full"
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-900 dark:text-white">
                  Location <span className="text-red-500">*</span>
                </label>
                <Dropdown
                  label="All Offices"
                  options={["All Offices", "Semarang Office", "Remote"]}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Location & Policy</h2>
              </div>

              {/* Location Detail Card */}
              <Card className="border border-gray-200 dark:border-gray-800 p-0 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Unpixel Office</h3>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <HiOutlineEllipsisVertical className="text-lg" />
                  </button>
                </div>

                {/* Details list */}
                <div className="flex flex-col">
                  {/* Row 1 */}
                  <div className="grid grid-cols-3 py-4 px-6 border-b border-gray-100 dark:border-gray-800/40">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Clocking in/out from</span>
                    <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white">Desktop, Mobile</span>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-3 py-4 px-6 border-b border-gray-100 dark:border-gray-800/40">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">QR Code</span>
                    <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white">Yes</span>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-3 py-4 px-6 border-b border-gray-100 dark:border-gray-800/40">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Geofencing</span>
                    <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white">Active</span>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-3 py-4 px-6 border-b border-gray-100 dark:border-gray-800/40">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Accurate Address</span>
                    <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white leading-normal">
                      100 Queen St W, Toronto, ON M5H 2N3, Kanada
                    </span>
                  </div>

                  {/* Row 5 */}
                  <div className="grid grid-cols-3 py-4 px-6 border-b border-gray-100 dark:border-gray-800/40">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Radius</span>
                    <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white">1 kilometers</span>
                  </div>

                  {/* Row 6 */}
                  <div className="grid grid-cols-3 py-4 px-6">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Policy</span>
                    <span className="col-span-2 text-xs font-bold text-gray-900 dark:text-white leading-normal">
                      Not allow clock in/out outside the office
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "qrcode" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">QR Code</h2>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 leading-relaxed max-w-2xl">
                  Generate a QR code to let everyone clock in / out easily by scanning with the GroveHR app.
                  Start displaying QR Code.
                </p>
              </div>

              {/* Form fields */}
              <div className="flex flex-col gap-6 max-w-2xl">
                {/* Auto generate timer */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-900 dark:text-white">
                    Auto generate new QR code every <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Dropdown
                      label="5"
                      options={["5", "10", "15", "30", "60"]}
                      className="w-full"
                    />
                    <Dropdown
                      label="Second"
                      options={["Second", "Minute"]}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Security Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-900 dark:text-white">
                    Security Type <span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    label="Public URL for Everyone"
                    options={[
                      "Public URL for Everyone",
                      "Restricted IP Only",
                      "Private QR Code"
                    ]}
                    className="w-full"
                  />
                </div>

                {/* Generate Button at bottom right */}
                <div className="flex justify-end mt-4">
                  <button className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors">
                    Generate QR Code
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
