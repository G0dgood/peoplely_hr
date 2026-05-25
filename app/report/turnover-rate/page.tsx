"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import {
  HiOutlineChevronRight,
  HiOutlineArrowUpTray,
  HiOutlineArrowTrendingUp,
  HiOutlineUserMinus,
  HiOutlineUsers
} from "react-icons/hi2";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

// Mock Data for Turnover Chart
const TURNOVER_DATA = [
  { month: "Jan", rate: 2.1, resigned: 3, active: 140 },
  { month: "Feb", rate: 1.4, resigned: 2, active: 142 },
  { month: "Mar", rate: 3.5, resigned: 5, active: 139 },
  { month: "Apr", rate: 0.7, resigned: 1, active: 145 },
  { month: "May", rate: 2.7, resigned: 4, active: 147 },
  { month: "Jun", rate: 1.3, resigned: 2, active: 151 },
];

interface ResignedEmployee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  jobTitle: string;
  resignDate: string;
  reason: string;
}

const RESIGNED_EMPLOYEES: ResignedEmployee[] = [
  {
    id: "UN012",
    name: "Alex Johnson",
    email: "alex@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=alex",
    department: "Team Product",
    jobTitle: "Senior Developer",
    resignDate: "15 Jun 2023",
    reason: "Career Change",
  },
  {
    id: "UN045",
    name: "Samantha Lee",
    email: "sam@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=sam",
    department: "Design",
    jobTitle: "UI UX Designer",
    resignDate: "02 Jun 2023",
    reason: "Relocation",
  },
  {
    id: "UN028",
    name: "Michael Chen",
    email: "michael@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=michael",
    department: "Marketing",
    jobTitle: "Growth Hacker",
    resignDate: "28 May 2023",
    reason: "Better Offer",
  },
  {
    id: "UN076",
    name: "Jessica Davis",
    email: "jessica@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=jessica",
    department: "Finance",
    jobTitle: "Accountant",
    resignDate: "14 May 2023",
    reason: "Personal Reasons",
  },
];

export default function TurnoverRateReportPage() {
  const [periodFilter, setPeriodFilter] = React.useState("Last 6 Months");
  const [deptFilter, setDeptFilter] = React.useState("All Departments");

  // Summary Statistics
  const avgTurnoverRate = (TURNOVER_DATA.reduce((acc, curr) => acc + curr.rate, 0) / TURNOVER_DATA.length).toFixed(1);
  const totalResigned = TURNOVER_DATA.reduce((acc, curr) => acc + curr.resigned, 0);
  const currentActive = TURNOVER_DATA[TURNOVER_DATA.length - 1].active;

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Employee Turnover Rate
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 mt-2.5">
            <Link href="/report" className="hover:text-primary transition-colors">
              List Report
            </Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <span className="text-gray-900 dark:text-white">Turnover Rate</span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button className="h-11 px-5 text-xs font-bold text-gray-700 bg-white border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2 shadow-xs cursor-pointer">
            <HiOutlineArrowUpTray className="text-sm font-bold" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Dropdown
          label={periodFilter}
          options={["Last 3 Months", "Last 6 Months", "This Year", "Last Year"]}
          onSelect={setPeriodFilter}
        />
        <Dropdown
          label={deptFilter}
          options={["All Departments", "Team Product", "Design", "Marketing", "Finance"]}
          onSelect={setDeptFilter}
        />
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <HiOutlineArrowTrendingUp className="text-2xl" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Avg Turnover Rate</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{avgTurnoverRate}%</h3>
          </div>
        </Card>
        
        <Card className="p-6 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <HiOutlineUserMinus className="text-2xl" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Total Resigned</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalResigned}</h3>
          </div>
        </Card>

        <Card className="p-6 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
            <HiOutlineUsers className="text-2xl" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Current Active</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{currentActive}</h3>
          </div>
        </Card>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Turnover Trend Chart */}
        <Card className="p-6 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Turnover Rate Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TURNOVER_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 600 }} dx={-10} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '12px', fontWeight: 600 }}
                  itemStyle={{ color: '#0FAF7A' }}
                  cursor={{ stroke: '#4B5563', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#0FAF7A" 
                  strokeWidth={4} 
                  dot={{ fill: '#0FAF7A', strokeWidth: 2, r: 4, stroke: '#fff' }} 
                  activeDot={{ r: 6, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Resigned vs Active Chart */}
        <Card className="p-6 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Resigned vs Active Employees</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TURNOVER_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 600 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '12px', fontWeight: 600 }}
                  cursor={{ fill: '#374151', opacity: 0.1 }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '20px' }} />
                <Bar dataKey="active" name="Active" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="resigned" name="Resigned" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Resigned Employees Table */}
      <Card className="border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Resignations</h3>
          <button className="text-xs font-bold text-primary hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Department</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Resign Date</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Reason</th>
              </tr>
            </thead>
            <tbody>
              {RESIGNED_EMPLOYEES.map((emp, index) => (
                <tr key={index} className="border-b border-gray-50 dark:border-gray-800 last:border-none hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar src={emp.avatar} size="sm" className="w-8 h-8 rounded-full" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{emp.name}</span>
                        <span className="text-[10px] text-gray-400 font-semibold">{emp.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400">{emp.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{emp.department}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">{emp.jobTitle}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400">{emp.resignDate}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300">
                      {emp.reason}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
