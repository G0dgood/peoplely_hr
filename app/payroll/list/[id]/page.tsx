"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
 HiOutlineChevronLeft,
 HiOutlineChevronDown,
 HiOutlineChevronUp,
 HiOutlinePencilSquare,
 HiOutlineTrash,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ─── Mock data ───────────────────────────────────────────────────────
const EMPLOYEE_PAYROLL = {
 id: 1,
 name: "Pristia Candra",
 jobTitle: "3D Designer",
 avatar: "https://i.pravatar.cc/150?u=pristia",
 status: "Active" as const,
 employmentType: "Contractor",
 geofencing: "30 Sep 2024",
 title: "Junior UI/UX Designer",
 jobDate: "16 Feb 2020",
 lastWorkingDate: "-",
 totalCompensation: "$ 3,729,00",
 salary: "$ 3,500,00",
 recurring: "$ 0",
 oneOff: "$ 0",
 offsets: [
  {
   label: "Offset",
   value: "$ 0",
   rows: [
    { hours: "-13h 30m", type: "Regular", amount: "$229,00" },
    { hours: "-14h 30m", type: "Regular", amount: "$300.00" },
   ],
  },
  { label: "Offset", value: "$ 0", rows: [] },
 ],
 attendance: {
  value: "40h 30m",
  rows: [{ period: "1 Feb 2023 - 28 Feb 2023", actualWorkHours: "40h 30m" }],
 },
 carryOverOfOvertime: "-",
 dependents: 0,
 bankInfo: {
  bankName: "Bank Central Asia",
  branch: "Banyumanik",
  swiftBic: "-",
  accountName: "Pristia Candra Arum",
  accountNumber: "001302490134920034",
  iban: "-",
 },
};

// ─── Reusable expandable section component ───────────────────────────
interface SectionRowProps {
 label: string;
 value: string;
 defaultOpen?: boolean;
 children?: React.ReactNode;
}

function SectionRow({ label, value, defaultOpen = false, children }: SectionRowProps) {
 const [open, setOpen] = React.useState(defaultOpen);
 const isExpandable = !!children;

 return (
  <Card className="border border-gray-300 dark:border-gray-800 rounded-2xl overflow-hidden">
   <button
    className={`w-full flex items-center justify-between px-6 py-5 transition-colors ${isExpandable ? "hover:bg-gray-50/50 dark:hover:bg-gray-800/30" : "cursor-default"
     }`}
    onClick={() => isExpandable && setOpen(!open)}
   >
    <span className="text-sm font-bold text-gray-900 dark:text-white">{label}</span>
    <div className="flex items-center gap-3">
     <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
     {isExpandable && (
      open
       ? <HiOutlineChevronUp className="text-gray-400 dark:text-gray-500" />
       : <HiOutlineChevronDown className="text-gray-400 dark:text-gray-500" />
     )}
    </div>
   </button>
   {open && children && (
    <div className="border-t border-gray-300 dark:border-gray-800">
     {children}
    </div>
   )}
  </Card>
 );
}

export default function PayrollDetailPage() {
 const router = useRouter();
 const e = EMPLOYEE_PAYROLL;

 return (
  <div className="flex flex-col gap-8 p-8 min-h-full">
   {/* Back Header */}
   <div className="flex items-center justify-between">
    <button
     onClick={() => router.back()}
     className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-primary transition-colors"
    >
     <HiOutlineChevronLeft className="text-lg" />
     Detail Payroll
    </button>
    <div className="flex items-center gap-3">
     <Button
      variant="outline"
      className="h-10 px-4 bg-white dark:bg-gray-900"
      leftIcon={<HiOutlinePencilSquare className="text-lg" />}
     >
      Edit
     </Button>
     <Button
      variant="outline"
      className="h-10 px-4 bg-white dark:bg-gray-900 text-red-500 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/20"
      leftIcon={<HiOutlineTrash className="text-lg text-red-500" />}
     >
      Delete
     </Button>
    </div>
   </div>

   {/* Main Detail Card */}
   <Card className="p-8 border border-gray-300 dark:border-gray-800">

    {/* Employee Profile Header */}
    <div className="flex items-center gap-5 mb-8">
     <Avatar src={e.avatar} size="xl" className="w-16 h-16 shrink-0" />
     <div className="flex flex-col gap-1">
      <h2 className="text-lg font-black text-gray-900 dark:text-white">{e.name}</h2>
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">{e.jobTitle}</p>
     </div>
     <div className="ml-auto">
      <Badge variant="success" tinted className="text-[10px] uppercase tracking-wider px-2.5 py-1">
       {e.status}
      </Badge>
     </div>
    </div>

    {/* Employee Info Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 pb-8 border-b border-gray-300 dark:border-gray-800 mb-8">
     {[
      { label: "Employee Status", value: e.status },
      { label: "Job Title", value: e.title },
      { label: "Employment Type", value: e.employmentType },
      { label: "Job Date", value: e.jobDate },
      { label: "Geofencing", value: e.geofencing },
      { label: "Last Working Date", value: e.lastWorkingDate },
     ].map(({ label, value }) => (
      <div key={label} className="flex items-center gap-4">
       <span className="w-40 text-xs font-bold text-gray-400 dark:text-gray-500 shrink-0">{label}</span>
       <span className="text-xs font-bold text-gray-900 dark:text-white">{value}</span>
      </div>
     ))}
    </div>

    {/* Compensation Breakdown */}
    <div className="flex flex-col gap-4">

     {/* Total Compensation */}
     <div className="flex items-center justify-between px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-800/40">
      <span className="text-sm font-bold text-gray-900 dark:text-white">Total Compesation</span>
      <span className="text-lg font-black text-gray-900 dark:text-white">{e.totalCompensation}</span>
     </div>

     {/* Salary */}
     <SectionRow label="Salary" value={e.salary} />

     {/* Recurring */}
     <SectionRow label="Recurring" value={e.recurring}>
      <p className="px-6 py-4 text-xs text-gray-400 dark:text-gray-500">No recurring components set up yet.</p>
     </SectionRow>

     {/* One-off */}
     <SectionRow label="One-off" value={e.oneOff}>
      <p className="px-6 py-4 text-xs text-gray-400 dark:text-gray-500">No one-off payments recorded.</p>
     </SectionRow>

     {/* Offsets */}
     {e.offsets.map((offset, i) => (
      <SectionRow key={i} label={offset.label} value={offset.value}>
       {offset.rows.length > 0 ? (
        <div className="flex flex-col">
         <div className="grid grid-cols-3 px-6 py-3 bg-gray-50 dark:bg-gray-800/30">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Hours</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Type</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 text-right">Amount</span>
         </div>
         {offset.rows.map((row, ri) => (
          <div
           key={ri}
           className="grid grid-cols-3 px-6 py-4 border-t border-gray-300 dark:border-gray-800"
          >
           <span className="text-xs font-bold text-gray-900 dark:text-white">{row.hours}</span>
           <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{row.type}</span>
           <span className="text-xs font-bold text-gray-900 dark:text-white text-right">{row.amount}</span>
          </div>
         ))}
        </div>
       ) : (
        <p className="px-6 py-4 text-xs text-gray-400 dark:text-gray-500">No offset items configured.</p>
       )}
      </SectionRow>
     ))}

     {/* Attendance */}
     <SectionRow label="Attendance" value={e.attendance.value} defaultOpen>
      <div className="flex flex-col">
       <div className="grid grid-cols-2 px-6 py-3 bg-gray-50 dark:bg-gray-800/30">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Deficit</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Actual Work Hours</span>
       </div>
       {e.attendance.rows.map((row, ri) => (
        <div
         key={ri}
         className="grid grid-cols-2 px-6 py-4 border-t border-gray-300 dark:border-gray-800"
        >
         <span className="text-xs font-bold text-gray-900 dark:text-white">{row.period}</span>
         <span className="text-xs font-bold text-gray-900 dark:text-white">{row.actualWorkHours}</span>
        </div>
       ))}
      </div>
     </SectionRow>

     {/* Carry Over of Overtime */}
     <SectionRow label="Carry Over of Overtime" value={e.carryOverOfOvertime}>
      <p className="px-6 py-4 text-xs text-gray-400 dark:text-gray-500">No carry-over overtime recorded.</p>
     </SectionRow>

     {/* Dependents */}
     <SectionRow label="Dependents" value={`${e.dependents} Dependents`}>
      <p className="px-6 py-4 text-xs text-gray-400 dark:text-gray-500">No dependents added.</p>
     </SectionRow>

     {/* Bank Information */}
     <SectionRow label="Bank Information" value="" defaultOpen>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 px-6 py-6">
       {[
        { label: "Bank Name", value: e.bankInfo.bankName },
        { label: "Account Name", value: e.bankInfo.accountName },
        { label: "Branch", value: e.bankInfo.branch },
        { label: "Account Number", value: e.bankInfo.accountNumber },
        { label: "SWIFT/BIC", value: e.bankInfo.swiftBic },
        { label: "IBAN", value: e.bankInfo.iban },
       ].map(({ label, value }) => (
        <div key={label} className="flex items-center gap-4">
         <span className="w-36 text-xs font-bold text-gray-400 dark:text-gray-500 shrink-0">{label}</span>
         <span className="text-xs font-bold text-gray-900 dark:text-white">{value}</span>
        </div>
       ))}
      </div>
     </SectionRow>

    </div>
   </Card>
  </div>
 );
}
