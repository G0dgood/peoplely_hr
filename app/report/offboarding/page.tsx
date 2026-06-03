"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import {
  HiOutlineChevronRight,
  HiOutlineCalendarDays,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface OffboardingRecord {
  name: string;
  email: string;
  avatar: string;
  id: string;
  department: string;
  jobTitle: string;
  employeeType: "Fulltime" | "Contractor" | "Freelance";
  resignationDate: string;
  lastWorkingDate: string;
  reason: "Personal" | "Better Offer" | "Career Change" | "Retirement";
  office: string;
  monthYear: string; // e.g. "02/2023"
}

const INITIAL_RECORDS: OffboardingRecord[] = [
  {
    name: "Pristia Candra",
    email: "lincoln@unixpixel.com",
    avatar: "https://i.pravatar.cc/150?u=pristia",
    id: "UN001",
    department: "Designer",
    jobTitle: "UI UX Designer",
    employeeType: "Fulltime",
    resignationDate: "21 Feb 2023",
    lastWorkingDate: "21 Feb 2023",
    reason: "Better Offer",
    office: "Pixel HQ",
    monthYear: "02/2023",
  },
  {
    name: "Hanna Baptista",
    email: "hanna@unixpixel.com",
    avatar: "https://i.pravatar.cc/150?u=hanna",
    id: "UN002",
    department: "Designer",
    jobTitle: "Graphic Designer",
    employeeType: "Contractor",
    resignationDate: "21 Feb 2023",
    lastWorkingDate: "21 Feb 2023",
    reason: "Career Change",
    office: "Pixel HQ",
    monthYear: "02/2023",
  },
  {
    name: "Miracle Geidt",
    email: "miracle@unixpixel.com",
    avatar: "https://i.pravatar.cc/150?u=miracle",
    id: "UN003",
    department: "CFO",
    jobTitle: "Finance",
    employeeType: "Freelance",
    resignationDate: "21 Feb 2023",
    lastWorkingDate: "21 Feb 2023",
    reason: "Personal",
    office: "Pixel HQ",
    monthYear: "02/2023",
  },
  {
    name: "Rayna Torff",
    email: "rayna@unixpixel.com",
    avatar: "https://i.pravatar.cc/150?u=rayna",
    id: "UN004",
    department: "Designer",
    jobTitle: "UI UX Designer",
    employeeType: "Fulltime",
    resignationDate: "15 Jan 2023",
    lastWorkingDate: "15 Jan 2023",
    reason: "Personal",
    office: "Pixel HQ",
    monthYear: "01/2023",
  },
  {
    name: "Giana Lipshutz",
    email: "giana@unixpixel.com",
    avatar: "https://i.pravatar.cc/150?u=giana",
    id: "UN005",
    department: "Designer",
    jobTitle: "Creative Director",
    employeeType: "Fulltime",
    resignationDate: "10 Mar 2023",
    lastWorkingDate: "10 Mar 2023",
    reason: "Retirement",
    office: "Pixel HQ",
    monthYear: "03/2023",
  },
];

export default function OffboardingReportPage() {
  const [dateRange, setDateRange] = React.useState("01 Jan 2023 - 10 Mar 2023");
  const [reasonFilter, setReasonFilter] = React.useState("All Reason");
  const [typeFilter, setTypeFilter] = React.useState("All Types");
  const [deptFilter, setDeptFilter] = React.useState("All Departements");
  const [officeFilter, setOfficeFilter] = React.useState("All Office");

  // Filtering Logic
  const filteredRecords = INITIAL_RECORDS.filter((emp) => {
    if (reasonFilter !== "All Reason" && emp.reason !== reasonFilter) return false;
    if (typeFilter !== "All Types" && emp.employeeType !== typeFilter) return false;
    if (deptFilter !== "All Departements" && emp.department !== deptFilter) return false;
    if (officeFilter !== "All Office" && emp.office !== officeFilter) return false;
    return true;
  });

  // Calculate Chart Volume dynamically based on filtered set
  const chartData = React.useMemo(() => {
    const months = [
      "01/2023", "02/2023", "03/2023", "04/2023", "05/2023", "06/2023",
      "07/2023", "08/2023", "09/2023", "10/2023", "11/2023", "12/2023"
    ];
    return months.map((m) => {
      const count = filteredRecords.filter((rec) => rec.monthYear === m).length;
      return { name: m, count };
    });
  }, [filteredRecords]);

  // Custom Bar Label Renderer
  const renderCustomBarLabel = ({ x, y, width, value }: { x: number, y: number, width: number, value: number }) => {
    if (value === 0) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 8}
        fill="#11131A"
        className="font-bold text-[10px]"
        textAnchor="middle"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Offboarding
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 mt-2.5">
            <Link href="/report" className="hover:text-primary transition-colors">
              List Report
            </Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <span className="text-gray-900 dark:text-white">Offboarding</span>
          </div>
        </div>

        <button className="h-11 px-5 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 self-end sm:self-auto shadow-xs cursor-pointer">
          <HiOutlineArrowDownTray className="text-sm font-bold" />
          <span>Download Data</span>
        </button>
      </div>

      <Card className="p-2 md:p-8 border border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl shadow-xs flex flex-col gap-8">
        {/* Filters Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 bg-gray-50/50 dark:bg-gray-950/20 p-2.5 rounded-2xl border border-gray-50/50 dark:border-gray-800/40">
          <div className="relative w-full">
            <Input
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl pl-4 pr-10"
            />
            <HiOutlineCalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
          </div>

          <Dropdown
            label={reasonFilter}
            options={["All Reason", "Personal", "Better Offer", "Career Change", "Retirement"]}
            onSelect={(val) => setReasonFilter(val)}
            className="w-full"
          />
          <Dropdown
            label={typeFilter}
            options={["All Types", "Fulltime", "Contractor", "Freelance"]}
            onSelect={(val) => setTypeFilter(val)}
            className="w-full"
          />
          <Dropdown
            label={deptFilter}
            options={["All Departements", "Designer", "CFO"]}
            onSelect={(val) => setDeptFilter(val)}
            className="w-full"
          />
          <Dropdown
            label={officeFilter}
            options={["All Office", "Pixel HQ"]}
            onSelect={(val) => setOfficeFilter(val)}
            className="w-full col-span-1 sm:col-span-2 md:col-span-1"
          />
        </div>

        {/* Volume Bar Chart */}
        <div className="h-80 w-full text-xs font-semibold py-4 border-b border-gray-50 dark:border-gray-850">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 4]}
                ticks={[0, 1, 2, 3, 4]}
                tick={{ fill: "#94A3B8" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#11131A",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="count"
                fill="#0FAF7A"
                radius={[6, 6, 0, 0]}
                barSize={32}
                label={renderCustomBarLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto -mx-8 px-8">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider h-12">
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Job Title</th>
                <th>Employee Type</th>
                <th>Resignation Date</th>
                <th className="text-right">Last Working Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800/40">
              {filteredRecords.slice(0, 5).map((emp) => (
                <tr
                  key={emp.id}
                  className="group hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors"
                >
                  <td className="py-4 pr-4 flex items-center gap-3">
                    <Avatar src={emp.avatar} size="sm" className="rounded-full shadow-xs" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {emp.name}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">
                        {emp.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">
                    {emp.id}
                  </td>
                  <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                    {emp.department}
                  </td>
                  <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                    {emp.jobTitle}
                  </td>
                  <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                    {emp.employeeType}
                  </td>
                  <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                    {emp.resignationDate}
                  </td>
                  <td className="py-4 pl-4 text-xs font-semibold text-gray-500 dark:text-gray-450 text-right">
                    {emp.lastWorkingDate}
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-semibold text-gray-400">
                    No employees match the selected filters.
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
