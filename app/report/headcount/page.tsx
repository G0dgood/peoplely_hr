"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import {
  HiOutlineChevronRight,
  HiOutlineArrowUpTray,
} from "react-icons/hi2";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Employee {
  name: string;
  email: string;
  avatar: string;
  id: string;
  department: string;
  employeeType: "Fulltime" | "Contractor" | "Freelance";
  office: string;
  jobTitle: string;
  gender: "Female" | "Male";
  status: "ACTIVE" | "ON BOARDING" | "PROBATION";
  category: "Management" | "Designer" | "Team Product" | "Finance";
}

const INITIAL_EMPLOYEES: Employee[] = [
  {
    name: "Pristia Candra",
    email: "lincoln@unixpixel.com",
    avatar: "https://i.pravatar.cc/150?u=pristia",
    id: "UN001",
    department: "Team Product",
    employeeType: "Fulltime",
    office: "Pixel HQ",
    jobTitle: "UI UX Designer",
    gender: "Female",
    status: "ACTIVE",
    category: "Designer",
  },
  {
    name: "Hanna Baptista",
    email: "hanna@unixpixel.com",
    avatar: "https://i.pravatar.cc/150?u=hanna",
    id: "UN002",
    department: "Team Product",
    employeeType: "Contractor",
    office: "Pixel HQ",
    jobTitle: "Graphic Designer",
    gender: "Female",
    status: "ON BOARDING",
    category: "Designer",
  },
  {
    name: "Miracle Geidt",
    email: "miracle@unixpixel.com",
    avatar: "https://i.pravatar.cc/150?u=miracle",
    id: "UN003",
    department: "Team Product",
    employeeType: "Freelance",
    office: "Pixel HQ",
    jobTitle: "Finance",
    gender: "Female",
    status: "PROBATION",
    category: "Finance",
  },
  {
    name: "Rayna Torff",
    email: "rayna@unixpixel.com",
    avatar: "https://i.pravatar.cc/150?u=rayna",
    id: "UN004",
    department: "Team Product",
    employeeType: "Fulltime",
    office: "Pixel HQ",
    jobTitle: "Project Manager",
    gender: "Male",
    status: "ACTIVE",
    category: "Management",
  },
  {
    name: "Giana Lipshutz",
    email: "giana@unixpixel.com",
    avatar: "https://i.pravatar.cc/150?u=giana",
    id: "UN005",
    department: "Team Product",
    employeeType: "Fulltime",
    office: "Pixel HQ",
    jobTitle: "Creative Director",
    gender: "Female",
    status: "ACTIVE",
    category: "Team Product",
  },
];

export default function HeadcountReportPage() {
  // Filters State
  const [typeFilter, setTypeFilter] = React.useState("All Types");
  const [genderFilter, setGenderFilter] = React.useState("All Gender");
  const [deptFilter, setDeptFilter] = React.useState("All Departements");
  const [jobFilter, setJobFilter] = React.useState("All Jobs");
  const [officeFilter, setOfficeFilter] = React.useState("All Office");

  // Filtering Logic
  const filteredEmployees = INITIAL_EMPLOYEES.filter((emp) => {
    if (typeFilter !== "All Types" && emp.employeeType !== typeFilter) return false;
    if (genderFilter !== "All Gender" && emp.gender !== genderFilter) return false;
    if (deptFilter !== "All Departements" && emp.department !== deptFilter) return false;
    if (jobFilter !== "All Jobs" && emp.jobTitle !== jobFilter) return false;
    if (officeFilter !== "All Office" && emp.office !== officeFilter) return false;
    return true;
  });

  // Recharts Donut Data based on filtered state
  const chartData = React.useMemo(() => {
    let management = 0, designer = 0, teamProduct = 0, finance = 0;
    filteredEmployees.forEach((emp) => {
      if (emp.category === "Management") management++;
      else if (emp.category === "Designer") designer++;
      else if (emp.category === "Team Product") teamProduct++;
      else if (emp.category === "Finance") finance++;
    });
    const total = Math.max(1, filteredEmployees.length);
    return [
      { name: "Management", value: management, percentage: Math.round((management / total) * 100), color: "#8B5CF6" },
      { name: "Designer", value: designer, percentage: Math.round((designer / total) * 100), color: "#0FAF7A" },
      { name: "Team Product", value: teamProduct, percentage: Math.round((teamProduct / total) * 100), color: "#F59E0B" },
      { name: "Finance", value: finance, percentage: Math.round((finance / total) * 100), color: "#EAB308" },
    ];
  }, [filteredEmployees]);

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Headcount (Point-in-time)
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 mt-2.5">
            <Link href="/report" className="hover:text-primary transition-colors">
              List Report
            </Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <span className="text-gray-900 dark:text-white">Headcount</span>
          </div>
        </div>

        <button className="h-11 px-5 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 self-end sm:self-auto shadow-xs cursor-pointer">
          <HiOutlineArrowUpTray className="text-sm font-bold" />
          <span>Import Data</span>
        </button>
      </div>

      <Card className="p-2 md:p-8 border border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl shadow-xs flex flex-col gap-8">
        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-gray-50/50 dark:bg-gray-950/20 p-2.5 rounded-2xl border border-gray-50/50 dark:border-gray-800/40">
          <Dropdown
            label={typeFilter}
            options={["All Types", "Fulltime", "Contractor", "Freelance"]}
            onSelect={(val) => setTypeFilter(val)}
            className="w-full"
          />
          <Dropdown
            label={genderFilter}
            options={["All Gender", "Female", "Male"]}
            onSelect={(val) => setGenderFilter(val)}
            className="w-full"
          />
          <Dropdown
            label={deptFilter}
            options={["All Departements", "Team Product"]}
            onSelect={(val) => setDeptFilter(val)}
            className="w-full"
          />
          <Dropdown
            label={jobFilter}
            options={[
              "All Jobs",
              "UI UX Designer",
              "Graphic Designer",
              "Finance",
              "Project Manager",
              "Creative Director",
            ]}
            onSelect={(val) => setJobFilter(val)}
            className="w-full"
          />
          <Dropdown
            label={officeFilter}
            options={["All Office", "Pixel HQ"]}
            onSelect={(val) => setOfficeFilter(val)}
            className="w-full col-span-2 md:col-span-1"
          />
        </div>

        {/* Donut Chart and Legend */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6 border-b border-gray-50 dark:border-gray-850">
          {/* Chart container */}
          <div className="w-56 h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#11131A",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Total Label */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Total Headcount
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
                {filteredEmployees.length}
              </span>
            </div>
          </div>

          {/* Legends */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 max-w-md">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 min-w-[90px]">
                  {item.name}
                </span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto -mx-8 px-8">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider h-12">
                <th className="pb-3 pr-4">Employee Name</th>
                <th className="pb-3 px-4">Employee ID</th>
                <th className="pb-3 px-4">Department</th>
                <th className="pb-3 px-4">Employee Type</th>
                <th className="pb-3 px-4">Office</th>
                <th className="pb-3 px-4">Job Title</th>
                <th className="pb-3 pl-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800/40">
              {filteredEmployees.map((emp) => {
                let statusBg = "";
                let statusText = "";
                if (emp.status === "ACTIVE") {
                  statusBg = "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/10";
                  statusText = "ACTIVE";
                } else if (emp.status === "ON BOARDING") {
                  statusBg = "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500";
                  statusText = "ON BOARDING";
                } else {
                  statusBg = "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400";
                  statusText = "PROBATION";
                }

                return (
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
                      {emp.employeeType}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                      {emp.office}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                      {emp.jobTitle}
                    </td>
                    <td className="py-4 pl-4 text-right">
                      <span
                        className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[9px] font-bold ${statusBg}`}
                      >
                        {statusText}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredEmployees.length === 0 && (
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
