"use client";

import * as React from "react";
import {
 HiOutlineCog6Tooth,
 HiOutlineCalendarDays,
 HiOutlineCurrencyDollar,
 HiOutlineInformationCircle,
} from "react-icons/hi2";
import { SettingsTabs, SettingsTabItem } from "@/components/ui/settings-tabs";
import { Card } from "@/components/ui/card";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";


type TabType = "general" | "paycycle" | "compensation";

export default function PayrollSettingsPage() {
 const [activeTab, setActiveTab] = React.useState<TabType>("general");

 const tabs: SettingsTabItem[] = [
  { id: "general", label: "General", icon: <HiOutlineCog6Tooth className="text-lg" /> },
  { id: "paycycle", label: "Pay Cycle", icon: <HiOutlineCalendarDays className="text-lg" /> },
  { id: "compensation", label: "Compensation", icon: <HiOutlineCurrencyDollar className="text-lg" /> },
 ];

 return (
  <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
   {/* Header */}
   <PageHeader title="Setting Payroll" description="Setting your payroll" />

   {/* Settings Layout */}
   <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">

    {/* Left Nav */}
    <SettingsTabs
     tabs={tabs}
     activeTab={activeTab}
     onChange={(id) => setActiveTab(id as TabType)}
     variant="emerald"
    />

    {/* Right Content */}
    <Card className="p-4 md:p-8 border border-gray-300 dark:border-gray-800 md:col-span-3">

     {/* ── General ── */}
     {activeTab === "general" && (
      <div className="flex flex-col gap-6 max-w-2xl">
       <h2 className="text-lg font-bold text-gray-900 dark:text-white">General</h2>

       {/* Currency */}
       <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-900 dark:text-white">
         Currency <span className="text-red-500">*</span>
        </label>
        <Dropdown
         label="USD"
         options={["USD", "EUR", "GBP", "IDR", "SGD", "AUD"]}
         className="w-full"
        />
       </div>

       {/* Calculate Monthly Salary */}
       <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-900 dark:text-white">
         Calculate Monthly Salary Based On <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
         <Dropdown
          label="Fixed Day"
          options={["Fixed Day", "Calendar Days", "Working Days"]}
          className="w-full"
         />
         <Dropdown
          label="20 Workout Days"
          options={["20 Workout Days", "21 Workout Days", "22 Workout Days", "30 Calendar Days"]}
          className="w-full"
         />
        </div>

        {/* Info Note */}
        <div className="flex items-start gap-2 mt-1">
         <HiOutlineInformationCircle className="text-gray-400 text-sm shrink-0 mt-0.5" />
         <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 leading-normal">
          To calculate prorate salaries for employees who join in the middle of your payroll cycle
         </p>
        </div>
       </div>
      </div>
     )}

     {/* ── Pay Cycle ── */}
     {activeTab === "paycycle" && (
      <div className="flex flex-col gap-8 max-w-2xl">

       {/* ── New Pay Cycle section ── */}
       <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">New Pay Cycle</h2>

        {/* Name */}
        <Input
         label="Name"
         required
         placeholder="Pristia Candra"
         defaultValue="Pristia Candra"
        />

        {/* Description */}
        <div className="flex flex-col gap-2">
         <label className="text-xs font-bold text-gray-900 dark:text-white">
          Description <span className="text-red-500">*</span>
         </label>
         <textarea
          placeholder="Write description"
          rows={3}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 px-4 py-3 outline-none resize-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
         />
        </div>

        {/* Reapet Every */}
        <div className="flex flex-col gap-2">
         <label className="text-xs font-bold text-gray-900 dark:text-white">
          Reapet Every <span className="text-red-500">*</span>
         </label>
         <div className="grid grid-cols-2 gap-4">
          <Dropdown
           label="1"
           options={["1", "2", "3", "4", "6"]}
           className="w-full"
          />
          <Dropdown
           label="Monthly"
           options={["Monthly", "Weekly", "Bi-weekly"]}
           className="w-full"
          />
         </div>
        </div>

        {/* Cut-off Date */}
        <div className="flex flex-col gap-2">
         <label className="text-xs font-bold text-gray-900 dark:text-white">
          Cut-off Date <span className="text-red-500">*</span>
         </label>
         <div className="flex items-center gap-4">
          <div className="relative flex-1">
           <input
            type="text"
            placeholder="Select Date"
            readOnly
            className="w-full h-12 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-800 text-xs font-semibold text-gray-400 px-4 pr-12 outline-none cursor-pointer"
           />
           <HiOutlineCalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
          </div>
          <div className="flex items-start gap-2 flex-1">
           <HiOutlineInformationCircle className="text-gray-400 text-sm shrink-0 mt-0.5" />
           <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 leading-normal">
            This is the latest date that payroll information should be submitted to calculate payroll
           </p>
          </div>
         </div>
        </div>
       </div>

       {/* ── Who's in Charge ── */}
       <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Who's in Charge</h2>

        {/* Person in Charge */}
        <div className="flex flex-col gap-2">
         <label className="text-xs font-bold text-gray-900 dark:text-white">
          Person in Charge <span className="text-red-500">*</span>
         </label>
         <Dropdown
          label="Select Employee"
          options={["Pristia Candra", "Hanna Baptista", "James George", "Skylar Herwitz"]}
          className="w-full"
         />
        </div>

        {/* Review Before Cut-off Date */}
        <div className="flex flex-col gap-2">
         <label className="text-xs font-bold text-gray-900 dark:text-white">
          Review Befor Cut-off Date <span className="text-red-500">*</span>
         </label>
         <div className="flex items-center gap-4">
          <Dropdown
           label="5 Days"
           options={["1 Day", "2 Days", "3 Days", "5 Days", "7 Days", "10 Days"]}
           className="w-full flex-1"
          />
          <div className="flex items-start gap-2 flex-1">
           <HiOutlineInformationCircle className="text-gray-400 text-sm shrink-0 mt-0.5" />
           <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 leading-normal">
            Your person in charge will receive a reminder on that day
           </p>
          </div>
         </div>
        </div>
       </div>

       {/* ── Eligibility ── */}
       <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Eligibility</h2>

        {/* Criteria */}
        <div className="flex flex-col gap-2">
         <label className="text-xs font-bold text-gray-900 dark:text-white">
          Criteria <span className="text-red-500">*</span>
         </label>
         <Dropdown
          label="Al Active Employee"
          options={["Al Active Employee", "Full-time Only", "Part-time Only", "Contractors", "Custom"]}
          className="w-full"
         />
        </div>
       </div>

      </div>
     )}

     {/* ── Compensation ── */}
     {activeTab === "compensation" && (
      <div className="flex flex-col gap-6 max-w-2xl">
       <h2 className="text-lg font-bold text-gray-900 dark:text-white">Compensation</h2>

       {/* Overtime Rate */}
       <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-900 dark:text-white">
         Overtime Rate <span className="text-red-500">*</span>
        </label>
        <Dropdown
         label="1.5x Regular Rate"
         options={["1.5x Regular Rate", "2x Regular Rate", "Custom Rate"]}
         className="w-full"
        />
       </div>

       {/* Tax Method */}
       <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-900 dark:text-white">
         Tax Method <span className="text-red-500">*</span>
        </label>
        <Dropdown
         label="Gross Income"
         options={["Gross Income", "Net Income", "Gross Up"]}
         className="w-full"
        />
       </div>

       {/* BPJS Contribution */}
       <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-900 dark:text-white">
         BPJS Contribution <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
         <Dropdown
          label="Employee: 1%"
          options={["Employee: 1%", "Employee: 2%", "Employee: 3%"]}
          className="w-full"
         />
         <Dropdown
          label="Employer: 4%"
          options={["Employer: 4%", "Employer: 5%", "Employer: 6%"]}
          className="w-full"
         />
        </div>
       </div>
      </div>
     )}

    </Card>
   </div>
  </div>
 );
}
