"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import {
 HiOutlineChevronRight,
 HiOutlineArrowDownTray,
 HiOutlineChevronLeft,
 HiOutlineChevronRight as HiChevRight,
} from "react-icons/hi2";
import { Pagination } from "@/components/ui/pagination";
import { RowPerPage } from "@/components/ui/row-per-page";

interface ScheduleRecord {
 name: string;
 email: string;
 avatar: string;
 id: string;
 department: string;
 jobTitle: string;
 office: string;
 from: string;
 to: string;
 type: string;
 status: "ACTIVE" | "ON BOARDING" | "PROBATION" | "ON LEAVE";
}

const ALL_RECORDS: ScheduleRecord[] = [
 { name: "Pristia Candra", email: "lincoln@unixpixel.com", avatar: "https://i.pravatar.cc/150?u=pristia", id: "UN001", department: "Team Product", jobTitle: "UI UX Designer", office: "Unpixel Office", from: "Aug 21 2023", to: "Aug 28 2023", type: "Engagement", status: "ACTIVE" },
 { name: "Hanna Baptista", email: "hanna@unixpixel.com", avatar: "https://i.pravatar.cc/150?u=hanna", id: "UN002", department: "Team Product", jobTitle: "Graphic Designer", office: "Unpixel Office", from: "Jun 24 2023", to: "Jun 27 2023", type: "Unpaid Time Off", status: "ON BOARDING" },
 { name: "Miracle Geidt", email: "miracle@unixpixel.com", avatar: "https://i.pravatar.cc/150?u=miracle", id: "UN003", department: "Team Product", jobTitle: "Finance", office: "Unpixel Office", from: "Feb 10 2023", to: "Feb 12 2023", type: "Unpaid Time Off", status: "PROBATION" },
 { name: "Rayna Torff", email: "rayna@unixpixel.com", avatar: "https://i.pravatar.cc/150?u=rayna", id: "UN004", department: "Team Product", jobTitle: "Project Manager", office: "Unpixel Office", from: "Sep 01 2023", to: "Sep 02 2023", type: "Sick Leave (Unpaid)", status: "ACTIVE" },
 { name: "Giana Lipshutz", email: "giana@unixpixel.com", avatar: "https://i.pravatar.cc/150?u=giana", id: "UN005", department: "Team Product", jobTitle: "Creative Director", office: "Unpixel Office", from: "Jul 11 2023", to: "Jul 14 2023", type: "Relative Funneral", status: "ON LEAVE" },
 { name: "James George", email: "james@unixpixel.com", avatar: "https://i.pravatar.cc/150?u=james", id: "UN006", department: "Team Product", jobTitle: "Lead Designer", office: "Unpixel Office", from: "Aug 07 2023", to: "Aug 10 2023", type: "Annual", status: "ACTIVE" },
 { name: "Jordyn George", email: "jordyn@unixpixel.com", avatar: "https://i.pravatar.cc/150?u=jordyn", id: "UN007", department: "Team Product", jobTitle: "IT Support", office: "Unpixel Office", from: "Dec 18 2022", to: "Dec 20 2022", type: "Unpaid Time Off", status: "ON BOARDING" },
 { name: "Skylar Herwitz", email: "skylar@unixpixel.com", avatar: "https://i.pravatar.cc/150?u=skylar", id: "UN008", department: "Team Product", jobTitle: "3D Designer", office: "Unpixel Office", from: "Nov 25 2022", to: "Nov 28 2022", type: "Sick Leave (Unpaid)", status: "ACTIVE" },
 { name: "Kierra Bator", email: "kierra@unixpixel.com", avatar: "https://i.pravatar.cc/150?u=kierra", id: "UN009", department: "Team Product", jobTitle: "Backend Dev", office: "Pixel HQ", from: "Mar 05 2023", to: "Mar 07 2023", type: "Annual", status: "ACTIVE" },
 { name: "Lincoln Geidt", email: "lgeidt@unixpixel.com", avatar: "https://i.pravatar.cc/150?u=lgeidt", id: "UN010", department: "Team Product", jobTitle: "Frontend Dev", office: "Pixel HQ", from: "Apr 03 2023", to: "Apr 06 2023", type: "Engagement", status: "PROBATION" },
];

const PAGE_SIZE_OPTIONS = [8, 16, 24];

export default function TimeOffSchedulePage() {
 const [officeFilter, setOfficeFilter] = React.useState("All Offices");
 const [jobFilter, setJobFilter] = React.useState("All Jobs");
 const [statusFilter, setStatusFilter] = React.useState("All Status");
 const [deptFilter, setDeptFilter] = React.useState("All Departement");
 const [page, setPage] = React.useState(1);
 const [pageSize, setPageSize] = React.useState(8);

 const filtered = ALL_RECORDS.filter((r) => {
  if (officeFilter !== "All Offices" && r.office !== officeFilter) return false;
  if (jobFilter !== "All Jobs" && r.jobTitle !== jobFilter) return false;
  if (deptFilter !== "All Departement" && r.department !== deptFilter) return false;
  if (statusFilter !== "All Status") {
   const map: Record<string, string> = { "Active": "ACTIVE", "On Boarding": "ON BOARDING", "Probation": "PROBATION", "On Leave": "ON LEAVE" };
   if (r.status !== (map[statusFilter] ?? statusFilter)) return false;
  }
  return true;
 });

 const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
 const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

 const pageNumbers: (number | "...")[] = [];
 if (totalPages <= 5) {
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
 } else {
  pageNumbers.push(1, 2, 3, "...", totalPages);
 }

 const statusStyle = (s: ScheduleRecord["status"]) => {
  const map: Record<string, string> = {
   "ACTIVE": "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/10",
   "ON BOARDING": "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500",
   "PROBATION": "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
   "ON LEAVE": "bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400",
  };
  return map[s] ?? "";
 };

 return (
  <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
   {/* Header */}
   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
     <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Time Off Schedule</h1>
     <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 mt-2.5">
      <Link href="/report" className="hover:text-primary transition-colors">List Report</Link>
      <HiOutlineChevronRight className="text-[10px]" />
      <span className="text-gray-900 dark:text-white">Time Off Schedule</span>
     </div>
    </div>
    <button className="h-11 px-5 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 self-end sm:self-auto shadow-xs cursor-pointer">
     <HiOutlineArrowDownTray className="text-sm" />
     <span>Download Data</span>
    </button>
   </div>

   <Card className="p-2 md:p-8 border border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl shadow-xs flex flex-col gap-8">
    {/* Filters */}
    <div className="flex flex-col xl:flex-row gap-4">
     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50/50 dark:bg-gray-950/20 p-2.5 rounded-2xl border border-gray-50/50 dark:border-gray-800/40 flex-1">
      <Dropdown label={officeFilter} options={["All Offices", "Unpixel Office", "Pixel HQ"]} onSelect={v => { setOfficeFilter(v); setPage(1); }} className="w-full" />
      <Dropdown label={jobFilter} options={["All Jobs", "UI UX Designer", "Graphic Designer", "Finance", "Project Manager", "Creative Director", "Lead Designer", "IT Support", "3D Designer", "Backend Dev", "Frontend Dev"]} onSelect={v => { setJobFilter(v); setPage(1); }} className="w-full" />
      <Dropdown label={statusFilter} options={["All Status", "Active", "On Boarding", "Probation", "On Leave"]} onSelect={v => { setStatusFilter(v); setPage(1); }} className="w-full" />
      <Dropdown label={deptFilter} options={["All Departement", "Team Product"]} onSelect={v => { setDeptFilter(v); setPage(1); }} className="w-full" />
     </div>
     <div className="flex items-center justify-end xl:justify-start">
      <RowPerPage itemsPerPage={pageSize} onItemsPerPageChange={(v) => { setPageSize(v); setPage(1); }} />
     </div>
    </div>

    {/* Table */}
    <div className="overflow-x-auto -mx-8 px-8">
     <table className="w-full text-left border-collapse min-w-[860px]">
      <thead>
       <tr className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider h-12">
        <th className="pb-3 pr-4">Employee Name</th>
        <th className="pb-3 px-4">Employee ID</th>
        <th className="pb-3 px-4">Job Title</th>
        <th className="pb-3 px-4">From</th>
        <th className="pb-3 px-4">To</th>
        <th className="pb-3 px-4">Type</th>
        <th className="pb-3 pl-4 text-right">Employee Status</th>
       </tr>
      </thead>
      <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800/40">
       {paginated.map((emp) => (
        <tr key={emp.id} className="group hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors">
         <td className="py-4 pr-4 flex items-center gap-3">
          <Avatar src={emp.avatar} size="sm" className="rounded-full shadow-xs" />
          <div className="flex flex-col gap-0.5">
           <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{emp.name}</span>
           <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">{emp.email}</span>
          </div>
         </td>
         <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">{emp.id}</td>
         <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">{emp.jobTitle}</td>
         <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">{emp.from}</td>
         <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">{emp.to}</td>
         <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">{emp.type}</td>
         <td className="py-4 pl-4 text-right">
          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[9px] font-bold ${statusStyle(emp.status)}`}>
           {emp.status}
          </span>
         </td>
        </tr>
       ))}
       {paginated.length === 0 && (
        <tr><td colSpan={7} className="py-12 text-center text-xs font-semibold text-gray-400">No records match the selected filters.</td></tr>
       )}
      </tbody>
     </table>
    </div>

    <div className="pt-2 border-t border-gray-50 dark:border-gray-800 mt-4">
     <Pagination className="mt-0 w-full" />
    </div>
   </Card>
  </div>
 );
}
