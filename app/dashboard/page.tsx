"use client";

import React, { useState, useMemo } from "react";
import { HiOutlineUsers, HiOutlineBriefcase, HiOutlineUserAdd } from "react-icons/hi";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineMagnifyingGlass,
  HiOutlineUserMinus,
  HiOutlineSparkles,
  HiOutlinePresentationChartLine,
  HiOutlineInboxStack,
} from "react-icons/hi2";
import { Dropdown } from "@/components/ui/dropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page-header";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import { useGetCandidatesQuery } from "@/store/services/recruitmentApi";
import { useGetPerformanceEvaluationsQuery } from "@/store/services/performanceApi";
import { useGetOfficesQuery } from "@/store/services/officeApi";
import { useGetJobTitlesQuery } from "@/store/services/jobTitleApi";
import { SVGLoaderFetch } from "@/components/ui/options";

export default function DashboardPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  // Database Queries
  const { data: empData, isLoading: isLoadingEmps } = useGetEmployeesQuery(
    { companyId, limit: 1000 },
    { skip: !companyId }
  );

  const { data: candidateData, isLoading: isLoadingCandidates } = useGetCandidatesQuery(
    { companyId },
    { skip: !companyId }
  );

  const { data: perfData, isLoading: isLoadingPerf } = useGetPerformanceEvaluationsQuery(
    { companyId },
    { skip: !companyId }
  );

  const { data: officeData } = useGetOfficesQuery(
    { companyId },
    { skip: !companyId }
  );

  const { data: jobTitleData } = useGetJobTitlesQuery(
    { companyId },
    { skip: !companyId }
  );

  // Filters & Table States
  const [search, setSearch] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("All Offices");
  const [selectedJobTitle, setSelectedJobTitle] = useState("All Job Titles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [checkedEmployees, setCheckedEmployees] = useState<Record<string, boolean>>({});

  const employees = empData?.employees || [];
  const candidates = candidateData?.candidates || [];
  const evaluations = perfData?.evaluations || [];

  // Dropdown options
  const officeOptions = useMemo(() => {
    const list = officeData?.offices.map((o) => o.name) || [];
    return ["All Offices", ...list];
  }, [officeData]);

  const jobTitleOptions = useMemo(() => {
    const list = jobTitleData?.jobTitles.map((j) => j.title) || [];
    return ["All Job Titles", ...list];
  }, [jobTitleData]);

  const statusOptions = ["All Status", "Active", "On Boarding", "Probation", "On Leave"];

  // Filtered employees list
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.role.toLowerCase().includes(search.toLowerCase());
      
      const matchesOffice =
        selectedOffice === "All Offices" || emp.office === selectedOffice;
      
      const matchesJob =
        selectedJobTitle === "All Job Titles" ||
        emp.role.toLowerCase() === selectedJobTitle.toLowerCase();
      
      const matchesStatus =
        selectedStatus === "All Status" ||
        emp.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesOffice && matchesJob && matchesStatus;
    });
  }, [employees, search, selectedOffice, selectedJobTitle, selectedStatus]);

  // Master checkbox toggle
  const isAllChecked = useMemo(() => {
    if (filteredEmployees.length === 0) return false;
    return filteredEmployees.every((emp) => checkedEmployees[emp.id]);
  }, [filteredEmployees, checkedEmployees]);

  const handleToggleAll = () => {
    const newChecked: Record<string, boolean> = { ...checkedEmployees };
    if (isAllChecked) {
      filteredEmployees.forEach((emp) => {
        newChecked[emp.id] = false;
      });
    } else {
      filteredEmployees.forEach((emp) => {
        newChecked[emp.id] = true;
      });
    }
    setCheckedEmployees(newChecked);
  };

  const handleToggleRow = (id: string) => {
    setCheckedEmployees((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Stats Card Calculations
  const totalEmpCount = employees.length;
  const applicantCount = candidates.length;
  const onboardingCount = employees.filter((emp) => emp.status === "ON BOARDING").length;
  const onLeaveCount = employees.filter((emp) => emp.status === "ON LEAVE").length;

  const STATS = [
    {
      label: "Total Employees",
      value: totalEmpCount.toLocaleString(),
      change: "+2.4%",
      trend: "up" as const,
      icon: <HiOutlineUsers />,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    },
    {
      label: "Job Applicants",
      value: applicantCount.toLocaleString(),
      change: "+12.1%",
      trend: "up" as const,
      icon: <HiOutlineBriefcase />,
      color: "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    },
    {
      label: "Onboarding Hires",
      value: onboardingCount.toLocaleString(),
      change: "+8.5%",
      trend: "up" as const,
      icon: <HiOutlineUserAdd />,
      color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    },
    {
      label: "Absences / Leave",
      value: onLeaveCount.toLocaleString(),
      change: "-3.1%",
      trend: "down" as const,
      icon: <HiOutlineUserMinus />,
      color: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
    },
  ];

  // Circle chart calculation
  const circleStats = useMemo(() => {
    const active = employees.filter((e) => e.status === "ACTIVE" || e.status === "PROBATION").length;
    const onboarding = onboardingCount;
    const offboarding = onLeaveCount;
    const total = active + onboarding + offboarding;

    if (total === 0) {
      return {
        activeCount: 0,
        onboardingCount: 0,
        offboardingCount: 0,
        activeDash: "0 251.2",
        onboardingDash: "0 251.2",
        offboardingDash: "0 251.2",
        activeOffset: 0,
        onboardingOffset: 0,
        total,
      };
    }

    const c = 251.2; // Circumference (2 * Math.PI * 40)
    const activeDash = `${(active / total) * c} ${c}`;
    const onboardingDash = `${(onboarding / total) * c} ${c}`;
    const offboardingDash = `${(offboarding / total) * c} ${c}`;

    const activeOffset = 0;
    const onboardingOffset = -((active / total) * c);
    const offboardingOffset = -(((active + onboarding) / total) * c);

    return {
      activeCount: active,
      onboardingCount: onboarding,
      offboardingCount: offboarding,
      activeDash,
      onboardingDash,
      offboardingDash,
      activeOffset,
      onboardingOffset,
      offboardingOffset,
      total,
    };
  }, [employees, onboardingCount, onLeaveCount]);

  // Performance Trend Calculations (Line Chart)
  const lineChartData = useMemo(() => {
    const periods = ["Q1 2026", "Q2 2026", "Mid-Year 2026", "Annual 2026"];
    const periodScores = periods.map((period) => {
      const periodReviews = evaluations.filter((e) => e.reviewPeriod === period);
      if (periodReviews.length === 0) {
        // Fallback default mockup scores if no entries exist
        if (period === "Q1 2026") return 3.8;
        if (period === "Q2 2026") return 4.2;
        if (period === "Mid-Year 2026") return 4.0;
        return 4.5;
      }
      const sum = periodReviews.reduce((acc, curr) => {
        return acc + (curr.workQuality + curr.communication + curr.teamwork + curr.punctuality) / 4;
      }, 0);
      return sum / periodReviews.length;
    });

    // Translate ratings (1.0 - 5.0) to Y coords (heights from 30px to 170px in 200px viewBox)
    // 5.0 -> 30px (top), 1.0 -> 170px (bottom)
    const getCoords = (score: number) => {
      return 170 - ((score - 1) / 4) * 140;
    };

    const coords = periodScores.map((score) => getCoords(score));

    // Construct SVG path string
    const pathString = `M 50,${coords[0]} C 150,${coords[0] - 20} 200,${coords[1] + 20} 250,${coords[1]} C 350,${coords[1] - 20} 400,${coords[2] + 20} 450,${coords[2]} C 550,${coords[2] - 20} 600,${coords[3] + 20} 650,${coords[3]}`;

    return {
      periods,
      scores: periodScores,
      coords,
      pathString,
      isDemo: evaluations.length === 0,
    };
  }, [evaluations]);

  if (isLoadingEmps || isLoadingCandidates || isLoadingPerf) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFCFF] dark:bg-gray-950">
        <SVGLoaderFetch text="Loading dashboard indicators..." asTable={false} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 bg-[#FAFCFF] dark:bg-gray-950 min-h-full">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader title={`Hi, ${currentUser?.name || "Pristia"}`} description="This is your HR report so far" />
        {evaluations.length > 0 && (
          <Badge variant="success" tinted className="h-7 text-xs font-bold rounded-lg self-start md:self-auto flex items-center gap-1">
            <HiOutlineSparkles /> Real-time DB Synced
          </Badge>
        )}
      </div>

      {/* Stats and Performance Chart Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Stats Cards */}
        <div className="grid grid-cols-2 gap-4 xl:col-span-1">
          {STATS.map((stat) => (
            <Card key={stat.label} className="p-6 flex flex-col gap-4 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl shadow-xs">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                  <Badge
                    variant={stat.trend === "up" ? "success" : "error"}
                    tinted
                    className="text-[10px] px-1.5 py-0.5 rounded-lg"
                  >
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mt-1.5">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Performance Chart Card */}
        <Card className="p-4 md:p-8 xl:col-span-2 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 dark:text-white">Team Performance</h3>
              {lineChartData.isDemo && (
                <span className="text-[9px] font-bold text-amber-600 bg-amber-50 dark:bg-yellow-950/20 px-1.5 py-0.5 rounded uppercase">
                  Demo Graph
                </span>
              )}
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quality Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">Averages</span>
              </div>
            </div>
          </div>

          {/* Dynamic SVG line chart */}
          <div className="h-48 relative mt-4">
            <div className="absolute inset-x-0 bottom-0 flex justify-between px-10 text-[9px] font-bold text-gray-400 dark:text-gray-500">
              {lineChartData.periods.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>

            <svg className="w-full h-[85%] overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="700" y2="30" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-800" />
              <line x1="0" y1="100" x2="700" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-800" />
              <line x1="0" y1="170" x2="700" y2="170" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-800" />

              {/* Dynamic Path */}
              <path d={lineChartData.pathString} fill="none" stroke="#27A376" strokeWidth="3" strokeLinecap="round" />

              {/* Data points */}
              {lineChartData.scores.map((score, i) => {
                const x = 50 + i * 200;
                const y = lineChartData.coords[i];
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#27A376"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-7 transition-all"
                    />
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      className="text-[10px] font-black fill-gray-900 dark:fill-white font-mono"
                    >
                      {score.toFixed(1)} ★
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[8px] font-bold text-gray-400 dark:text-gray-550 pl-1 pb-6">
              <span>5.0</span>
              <span>3.0</span>
              <span>1.0</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Employees Table and Total Employee Chart Row */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Employees Table */}
        <Card className="p-4 md:p-8 xl:col-span-3 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white">Employees Ledger</h3>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Search name, email, or title..."
                leftIcon={<HiOutlineMagnifyingGlass />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 h-10 bg-gray-50/50 dark:bg-gray-800/50"
                containerClassName="w-auto"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <Dropdown
              label={selectedOffice}
              options={officeOptions}
              onSelect={setSelectedOffice}
            />
            <Dropdown
              label={selectedJobTitle}
              options={jobTitleOptions}
              onSelect={setSelectedJobTitle}
            />
            <Dropdown
              label={selectedStatus}
              options={statusOptions}
              onSelect={setSelectedStatus}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-850 text-[10px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-wider h-11">
                  <th className="w-[50px] py-4 px-2">
                    <Checkbox checked={isAllChecked} onChange={handleToggleAll} />
                  </th>
                  <th>Employee Name</th>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Office</th>
                  <th className="text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-105 dark:divide-gray-850">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-2">
                      <Checkbox
                        checked={!!checkedEmployees[emp.id]}
                        onChange={() => handleToggleRow(emp.id)}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">
                          {emp.avatar ? (
                            <img src={emp.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            emp.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white">{emp.name}</p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-bold text-gray-600 dark:text-gray-400">{emp.role}</td>
                    <td className="py-4 px-4 text-xs font-bold text-gray-600 dark:text-gray-400">{emp.department}</td>
                    <td className="py-4 px-4 text-xs font-bold text-gray-600 dark:text-gray-400">{emp.office}</td>
                    <td className="py-4 px-4 text-right">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        emp.status === "ACTIVE"
                          ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600"
                          : emp.status === "ON BOARDING"
                          ? "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600"
                          : "bg-blue-50 dark:bg-blue-950/20 text-blue-600"
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-12 flex flex-col items-center justify-center gap-3">
                <HiOutlineInboxStack className="text-gray-300 text-3xl" />
                <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold">No employee records match filters.</span>
              </div>
            )}
          </div>
        </Card>

        {/* Total Employee Chart */}
        <Card className="p-4 md:p-8 xl:col-span-1 border border-gray-150/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white">Active Statuses</h3>
            <span className="text-[9px] font-black text-teal-650 bg-teal-50 dark:bg-teal-950/20 px-1.5 py-0.5 rounded">
              Distribution
            </span>
          </div>

          <div className="relative w-44 h-44 mx-auto mb-8 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth="11" />
              
              {/* Active Segment */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#27A376"
                strokeWidth="11"
                strokeDasharray={circleStats.activeDash}
                strokeDashoffset={circleStats.activeOffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              
              {/* Onboarding Segment */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#FACC15"
                strokeWidth="11"
                strokeDasharray={circleStats.onboardingDash}
                strokeDashoffset={circleStats.onboardingOffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              
              {/* Leave Segment */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#0062FF"
                strokeWidth="11"
                strokeDasharray={circleStats.offboardingDash}
                strokeDashoffset={circleStats.offboardingOffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-gray-900 dark:text-white">{circleStats.total}</span>
              <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Total Headcount</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-xs font-semibold">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-gray-500 dark:text-gray-400">Active / Probation</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{circleStats.activeCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-gray-500 dark:text-gray-400">Onboarding</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{circleStats.onboardingCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-500 dark:text-gray-400">On Leave / Absences</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{circleStats.offboardingCount}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
