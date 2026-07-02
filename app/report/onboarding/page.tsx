"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store/hooks";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import {
  HiOutlineChevronRight,
  HiOutlineCalendarDays,
  HiOutlineArrowUpTray,
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

const getEmployeeType = (empId: string) => {
  const code = empId.charCodeAt(empId.length - 1) || 0;
  if (code % 3 === 0) return "Freelance";
  if (code % 2 === 0) return "Contractor";
  return "Fulltime";
};

const formatJoinDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

const getMonthYear = (dateStr: string) => {
  const date = new Date(dateStr);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${m}/${y}`;
};

export default function OnboardingReportPage() {
  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading } = useGetEmployeesQuery(
    { companyId: user?.companyId, limit: 1000 },
    { skip: !user?.companyId }
  );

  const employees = data?.employees || [];

  const [dateRange, setDateRange] = React.useState("01 Jan 2023 - 31 Dec 2026");
  const [statusFilter, setStatusFilter] = React.useState("All Status");
  const [typeFilter, setTypeFilter] = React.useState("All Types");
  const [deptFilter, setDeptFilter] = React.useState("All Departements");
  const [officeFilter, setOfficeFilter] = React.useState("All Office");

  // Filtering Logic
  const filteredRecords = React.useMemo(() => {
    return employees.filter((emp) => {
      const empType = getEmployeeType(emp.id);

      const normalizedStatus = (emp.status || "").toUpperCase().replace(/_/g, " ");
      const filterStatus = statusFilter.toUpperCase();

      if (statusFilter !== "All Status") {
        if (filterStatus === "ON BOARDING" && normalizedStatus !== "ON BOARDING") return false;
        if (filterStatus === "ACTIVE" && normalizedStatus !== "ACTIVE") return false;
        if (filterStatus === "PROBATION" && normalizedStatus !== "PROBATION") return false;
      }
      if (typeFilter !== "All Types" && empType !== typeFilter) return false;
      if (deptFilter !== "All Departements" && emp.department !== deptFilter) return false;
      if (officeFilter !== "All Office" && emp.office !== officeFilter) return false;
      return true;
    });
  }, [employees, statusFilter, typeFilter, deptFilter, officeFilter]);

  // Unique lists for filters
  const deptOptions = React.useMemo(() => {
    const depts = new Set(employees.map(e => e.department));
    return ["All Departements", ...Array.from(depts)];
  }, [employees]);

  const officeOptions = React.useMemo(() => {
    const offices = new Set(employees.map(e => e.office));
    return ["All Office", ...Array.from(offices)];
  }, [employees]);

  // Calculate Chart Volume dynamically based on filtered set
  const chartData = React.useMemo(() => {
    const months = [
      "01/2023", "02/2023", "03/2023", "04/2023", "05/2023", "06/2023",
      "07/2023", "08/2023", "09/2023", "10/2023", "11/2023", "12/2023",
      "01/2026", "02/2026", "03/2026", "04/2026", "05/2026", "06/2026",
      "07/2026", "08/2026", "09/2026", "10/2026", "11/2026", "12/2026"
    ];

    // Filter active month keys to not pollute the chart with 0s across empty years
    const activeMonths = new Set(filteredRecords.map(r => getMonthYear(r.createdAt)));
    const monthsToShow = months.filter(m => activeMonths.has(m) || m.endsWith("/2026"));

    return monthsToShow.map((m) => {
      const count = filteredRecords.filter((rec) => getMonthYear(rec.createdAt) === m).length;
      return { name: m, count };
    });
  }, [filteredRecords]);

  // Custom Bar Label Renderer
  const renderCustomBarLabel = ({ x, y, width, value }: any) => {
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
            Onboarding
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 mt-2.5">
            <Link href="/report" className="hover:text-primary transition-colors">
              List Report
            </Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <span className="text-gray-900 dark:text-white">Onboarding</span>
          </div>
        </div>

        <button className="h-11 px-5 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 self-end sm:self-auto shadow-xs cursor-pointer">
          <HiOutlineArrowUpTray className="text-sm font-bold" />
          <span>Import Data</span>
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
            label={statusFilter}
            options={["All Status", "Active", "On Boarding", "Probation"]}
            onSelect={(val) => setStatusFilter(val)}
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
            options={deptOptions}
            onSelect={(val) => setDeptFilter(val)}
            className="w-full"
          />
          <Dropdown
            label={officeFilter}
            options={officeOptions}
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
                domain={[0, 'dataMax + 1']}
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
                <th>Join Date</th>
                <th className="pb-3 pl-4 text-right">Office</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800/40">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-semibold text-gray-400">
                    Loading onboarding data...
                  </td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-semibold text-gray-400">
                    No employees match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((emp) => {
                  const fallbackInitials = emp.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
                  return (
                    <tr
                      key={emp.id}
                      className="group hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors"
                    >
                      <td className="py-4 pr-4 flex items-center gap-3">
                        <Avatar src={emp.avatar || undefined} fallback={fallbackInitials} size="sm" className="rounded-full shadow-xs" />
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
                        {emp.id.slice(0, 8)}
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                        {emp.department}
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                        {emp.role}
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                        {getEmployeeType(emp.id)}
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                        {formatJoinDate(emp.createdAt)}
                      </td>
                      <td className="py-4 pl-4 text-xs font-semibold text-gray-500 dark:text-gray-450 text-right">
                        {emp.office}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
