"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { useAppSelector } from "@/store/hooks";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import {
  HiOutlineChevronRight,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineCake,
  HiOutlineBriefcase,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type TabId = "age" | "gender" | "birthday" | "tenure";

const getEmployeeAge = (empId: string) => {
  const code = empId.charCodeAt(empId.length - 1) || 0;
  return 22 + (code % 28); // deterministic age between 22 and 50
};

const getGender = (name: string) => {
  const code = name.charCodeAt(0) || 0;
  return code % 2 === 0 ? "Female" : "Male";
};

const getBirthdayMonth = (empId: string) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const code = empId.charCodeAt(empId.length - 2) || 0;
  return months[code % 12];
};

const getTenureYears = (createdAt: string) => {
  const joinDate = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - joinDate.getTime();
  const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(0, Math.floor(diffYears));
};

const getEmployeeType = (empId: string) => {
  const code = empId.charCodeAt(empId.length - 1) || 0;
  if (code % 3 === 0) return "Contract";
  if (code % 2 === 0) return "Part-time";
  return "Full-time";
};

export default function EmployeeDataReportsPage() {
  const [activeTab, setActiveTab] = React.useState<TabId>("age");

  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading } = useGetEmployeesQuery(
    { companyId: user?.companyId, limit: 1000 },
    { skip: !user?.companyId }
  );

  const employees = data?.employees || [];

  // Filters State
  const [statusFilter, setStatusFilter] = React.useState("All Status");
  const [typeFilter, setTypeFilter] = React.useState("All Types");
  const [deptFilter, setDeptFilter] = React.useState("All Departments");
  const [jobFilter, setJobFilter] = React.useState("All Jobs");

  // Map employee list to include calculated demographic fields
  const mappedEmployees = React.useMemo(() => {
    return employees.map((emp) => ({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      avatar: emp.avatar || "",
      department: emp.department,
      jobTitle: emp.role,
      age: getEmployeeAge(emp.id),
      gender: getGender(emp.name),
      status: (emp.status || "ACTIVE").toUpperCase() as "ACTIVE" | "ON BOARDING" | "PROBATION" | "ON LEAVE",
      type: getEmployeeType(emp.id),
      birthdayMonth: getBirthdayMonth(emp.id),
      tenureYears: getTenureYears(emp.createdAt),
    }));
  }, [employees]);

  // Filter Logic
  const filteredEmployees = React.useMemo(() => {
    return mappedEmployees.filter((emp) => {
      const filterStatus = statusFilter.toUpperCase().replace(" ", "_");
      const normalizedStatus = emp.status.replace(" ", "_");

      if (statusFilter !== "All Status") {
        if (filterStatus === "ON_BOARDING" && normalizedStatus !== "ON_BOARDING") return false;
        if (filterStatus === "ON_LEAVE" && normalizedStatus !== "ON_LEAVE") return false;
        if (filterStatus === "ACTIVE" && normalizedStatus !== "ACTIVE") return false;
        if (filterStatus === "PROBATION" && normalizedStatus !== "PROBATION") return false;
      }
      if (typeFilter !== "All Types" && emp.type !== typeFilter) return false;
      if (deptFilter !== "All Departments" && emp.department !== deptFilter) return false;
      if (jobFilter !== "All Jobs" && emp.jobTitle !== jobFilter) return false;
      return true;
    });
  }, [mappedEmployees, statusFilter, typeFilter, deptFilter, jobFilter]);

  // Unique Filter Options
  const deptOptions = React.useMemo(() => {
    const depts = new Set(employees.map(e => e.department));
    return ["All Departments", ...Array.from(depts)];
  }, [employees]);

  const jobOptions = React.useMemo(() => {
    const jobs = new Set(employees.map(e => e.role));
    return ["All Jobs", ...Array.from(jobs)];
  }, [employees]);

  // Recharts Pie Chart Data generation based on current filtered set
  const ageData = React.useMemo(() => {
    let g1 = 0, g2 = 0, g3 = 0, g4 = 0;
    filteredEmployees.forEach((emp) => {
      if (emp.age >= 18 && emp.age <= 30) g1++;
      else if (emp.age >= 31 && emp.age <= 50) g2++;
      else if (emp.age >= 51 && emp.age <= 60) g3++;
      else g4++;
    });
    const total = Math.max(1, filteredEmployees.length);
    return [
      { name: "18-30", value: g1, percentage: Math.round((g1 / total) * 100), color: "#8B5CF6" },
      { name: "31-50", value: g2, percentage: Math.round((g2 / total) * 100), color: "#0FAF7A" },
      { name: "51-60", value: g3, percentage: Math.round((g3 / total) * 100), color: "#F59E0B" },
      { name: "61+", value: g4, percentage: Math.round((g4 / total) * 100), color: "#EAB308" },
    ];
  }, [filteredEmployees]);

  const genderData = React.useMemo(() => {
    let female = 0, male = 0;
    filteredEmployees.forEach((emp) => {
      if (emp.gender === "Female") female++;
      else male++;
    });
    const total = Math.max(1, filteredEmployees.length);
    return [
      { name: "Female", value: female, percentage: Math.round((female / total) * 100), color: "#EC4899" },
      { name: "Male", value: male, percentage: Math.round((male / total) * 100), color: "#3B82F6" },
    ];
  }, [filteredEmployees]);

  const birthdayData = React.useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const colors = ["#8B5CF6", "#0FAF7A", "#F59E0B", "#EC4899", "#3B82F6", "#F43F5E", "#10B981", "#6366F1", "#A855F7", "#F97316", "#06B6D4", "#14B8A6"];
    return months.map((m, idx) => {
      const count = filteredEmployees.filter((e) => e.birthdayMonth === m).length;
      const total = Math.max(1, filteredEmployees.length);
      return {
        name: m,
        value: count,
        percentage: Math.round((count / total) * 100),
        color: colors[idx % colors.length],
      };
    }).filter(item => item.value > 0); // Only show months with births to avoid empty slices
  }, [filteredEmployees]);

  const tenureData = React.useMemo(() => {
    let t1 = 0, t2 = 0, t3 = 0;
    filteredEmployees.forEach((emp) => {
      if (emp.tenureYears < 2) t1++;
      else if (emp.tenureYears <= 3) t2++;
      else t3++;
    });
    const total = Math.max(1, filteredEmployees.length);
    return [
      { name: "< 2 Years", value: t1, percentage: Math.round((t1 / total) * 100), color: "#3B82F6" },
      { name: "2-3 Years", value: t2, percentage: Math.round((t2 / total) * 100), color: "#0FAF7A" },
      { name: "4+ Years", value: t3, percentage: Math.round((t3 / total) * 100), color: "#8B5CF6" },
    ];
  }, [filteredEmployees]);

  const activeChartData = React.useMemo(() => {
    switch (activeTab) {
      case "age":
        return ageData;
      case "gender":
        return genderData;
      case "birthday":
        return birthdayData;
      case "tenure":
        return tenureData;
    }
  }, [activeTab, ageData, genderData, birthdayData, tenureData]);

  // Sidebar Tabs Config
  const tabs = [
    { id: "age" as TabId, label: "Age Profile", icon: <HiOutlineUser /> },
    { id: "gender" as TabId, label: "Gender Profile", icon: <HiOutlineUsers /> },
    { id: "birthday" as TabId, label: "Birthday", icon: <HiOutlineCake /> },
    { id: "tenure" as TabId, label: "Employee Tenure", icon: <HiOutlineBriefcase /> },
  ];

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header & Breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Employee Data Reports
        </h1>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 mt-2.5">
          <Link href="/report" className="hover:text-primary transition-colors">
            List Report
          </Link>
          <HiOutlineChevronRight className="text-[10px]" />
          <span className="text-gray-900 dark:text-white">Employee Data Report</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-2">
        {/* Left Side Navigation Card */}
        <Card className="w-full lg:w-72 p-4 border border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl h-fit flex flex-col gap-1.5 shadow-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-bold transition-all text-left ${isActive
                    ? "bg-[#FAFAFB] dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
              >
                <span className={`text-base ${isActive ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </Card>

        {/* Right Side Main Content Panel */}
        <Card className="flex-1 p-2 md:p-8 border border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl shadow-xs flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
              {activeTab} Profile
            </h2>
            <button className="h-11 px-5 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 self-end sm:self-auto shadow-xs cursor-pointer">
              <HiOutlineArrowDownTray className="text-sm font-bold" />
              <span>Download Data</span>
            </button>
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50/50 dark:bg-gray-950/20 p-2.5 rounded-2xl border border-gray-50/50 dark:border-gray-800/40">
            <Dropdown
              label={statusFilter}
              options={["All Status", "Active", "On Boarding", "Probation", "On Leave"]}
              onSelect={(val) => setStatusFilter(val)}
              className="w-full"
            />
            <Dropdown
              label={typeFilter}
              options={["All Types", "Full-time", "Part-time", "Contract"]}
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
              label={jobFilter}
              options={jobOptions}
              onSelect={(val) => setJobFilter(val)}
              className="w-full"
            />
          </div>

          {/* Donut Chart & Percentages Legend */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6 border-b border-gray-50 dark:border-gray-850">
            {/* Chart Area */}
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
                    data={activeChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {activeChartData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Circle Info */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Total Active
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
                  {filteredEmployees.length}
                </span>
              </div>
            </div>

            {/* Legends */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 max-w-md">
              {activeChartData?.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 min-w-[70px]">
                    {item.name}
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Employee List Table */}
          <div className="overflow-x-auto -mx-8 px-8">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider h-12">
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Job Title</th>
                  <th className="text-center">Age</th>
                  <th className="text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800/40">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs font-semibold text-gray-400">
                      Loading data...
                    </td>
                  </tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs font-semibold text-gray-400">
                      No employees match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => {
                    let statusBg = "";
                    let statusText = (emp.status || "").toUpperCase();
                    if (statusText === "ACTIVE") {
                      statusBg = "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/10";
                    } else if (statusText === "ON_BOARDING" || statusText === "ON BOARDING") {
                      statusBg = "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500";
                      statusText = "ON BOARDING";
                    } else if (statusText === "PROBATION") {
                      statusBg = "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400";
                      statusText = "PROBATION";
                    } else {
                      statusBg = "bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-450";
                      statusText = "ON LEAVE";
                    }

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
                          {emp.jobTitle}
                        </td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-center">
                          {emp.age}
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
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
