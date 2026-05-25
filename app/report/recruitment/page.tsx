"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Dropdown } from "@/components/ui/dropdown";
import {
  HiOutlineChevronRight,
  HiOutlineArrowUpTray,
  HiOutlineBriefcase,
  HiOutlineUsers,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineCheckBadge,
} from "react-icons/hi2";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface JobPipeline {
  id: string;
  title: string;
  department: string;
  office: string;
  applied: number;
  interviewed: number;
  hired: number;
  status: "OPEN" | "CLOSED";
}

const INITIAL_PIPELINE: JobPipeline[] = [
  {
    id: "JOB001",
    title: "UI/UX Designer",
    department: "Team Product",
    office: "Pixel HQ",
    applied: 120,
    interviewed: 24,
    hired: 2,
    status: "OPEN",
  },
  {
    id: "JOB002",
    title: "Frontend Developer",
    department: "IT Development",
    office: "Pixel HQ",
    applied: 85,
    interviewed: 15,
    hired: 1,
    status: "OPEN",
  },
  {
    id: "JOB003",
    title: "Marketing Manager",
    department: "Marketing",
    office: "Remote",
    applied: 65,
    interviewed: 10,
    hired: 1,
    status: "CLOSED",
  },
  {
    id: "JOB004",
    title: "Product Manager",
    department: "Team Product",
    office: "Pixel HQ",
    applied: 45,
    interviewed: 8,
    hired: 0,
    status: "OPEN",
  },
  {
    id: "JOB005",
    title: "QA Engineer",
    department: "IT Development",
    office: "Pixel HQ",
    applied: 110,
    interviewed: 20,
    hired: 3,
    status: "CLOSED",
  },
];

const FUNNEL_DATA = [
  { name: "Applied", value: 425, color: "#3B82F6" },
  { name: "Screened", value: 210, color: "#8B5CF6" },
  { name: "Interviewed", value: 77, color: "#F59E0B" },
  { name: "Offered", value: 12, color: "#0FAF7A" },
  { name: "Hired", value: 7, color: "#10B981" },
];

export default function RecruitmentPipelineReportPage() {
  const [periodFilter, setPeriodFilter] = React.useState("This Month");
  const [deptFilter, setDeptFilter] = React.useState("All Departments");
  const [statusFilter, setStatusFilter] = React.useState("All Status");

  // Filtering Logic
  const filteredJobs = INITIAL_PIPELINE.filter((job) => {
    if (deptFilter !== "All Departments" && job.department !== deptFilter) return false;
    if (statusFilter !== "All Status" && job.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recruitment Pipeline
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 mt-2.5">
            <Link href="/report" className="hover:text-primary transition-colors">
              List Report
            </Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <span className="text-gray-900 dark:text-white">Recruitment Pipeline</span>
          </div>
        </div>

        <button className="h-11 px-5 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 self-end sm:self-auto shadow-xs cursor-pointer">
          <HiOutlineArrowUpTray className="text-sm font-bold" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
            <HiOutlineUsers className="text-lg text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">425</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Applied</p>
          </div>
        </Card>
        <Card className="p-6 border border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
            <HiOutlineDocumentMagnifyingGlass className="text-lg text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">210</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Candidates Screened</p>
          </div>
        </Card>
        <Card className="p-6 border border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
            <HiOutlineBriefcase className="text-lg text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">77</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Interviews Held</p>
          </div>
        </Card>
        <Card className="p-6 border border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
            <HiOutlineCheckBadge className="text-lg text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">7</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Candidates Hired</p>
          </div>
        </Card>
      </div>

      <Card className="p-2 md:p-8 border border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl shadow-xs flex flex-col gap-8">
        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50/50 dark:bg-gray-950/20 p-2.5 rounded-2xl border border-gray-50/50 dark:border-gray-800/40">
          <Dropdown
            label={periodFilter}
            options={["This Month", "Last Month", "This Quarter", "This Year"]}
            onSelect={(val) => setPeriodFilter(val)}
            className="w-full"
          />
          <Dropdown
            label={deptFilter}
            options={["All Departments", "Team Product", "IT Development", "Marketing"]}
            onSelect={(val) => setDeptFilter(val)}
            className="w-full"
          />
          <Dropdown
            label={statusFilter}
            options={["All Status", "OPEN", "CLOSED"]}
            onSelect={(val) => setStatusFilter(val)}
            className="w-full"
          />
        </div>

        {/* Funnel Chart */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Pipeline Conversion Funnel</h2>
          <div className="w-full h-72 border border-gray-100 dark:border-gray-800/60 rounded-xl p-4 bg-gray-50/30 dark:bg-gray-900/50">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" opacity={0.2} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 600 }} width={100} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: "#11131A",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28}>
                  {FUNNEL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto -mx-8 px-8 mt-4">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider h-12">
                <th className="pb-3 pr-4">Job Title</th>
                <th className="pb-3 px-4">Department</th>
                <th className="pb-3 px-4">Office</th>
                <th className="pb-3 px-4">Applied</th>
                <th className="pb-3 px-4">Interviewed</th>
                <th className="pb-3 px-4">Hired</th>
                <th className="pb-3 pl-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800/40">
              {filteredJobs.map((job) => {
                const statusBg = job.status === "OPEN"
                  ? "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/10"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";

                return (
                  <tr
                    key={job.id}
                    className="group hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                          {job.title}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">
                          {job.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                      {job.department}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                      {job.office}
                    </td>
                    <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">
                      {job.applied}
                    </td>
                    <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">
                      {job.interviewed}
                    </td>
                    <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">
                      {job.hired}
                    </td>
                    <td className="py-4 pl-4 text-right">
                      <span
                        className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[9px] font-bold ${statusBg}`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-semibold text-gray-400">
                    No jobs match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
