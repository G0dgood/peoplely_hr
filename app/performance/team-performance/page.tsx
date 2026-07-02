"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import { useGetPerformanceEvaluationsQuery } from "@/store/services/performanceApi";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";
import { TableActions } from "@/components/ui/table-actions";

export default function TeamPerformancePage() {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  // Queries
  const { data: empData, isLoading: isLoadingEmps } = useGetEmployeesQuery(
    { companyId, limit: 1000 },
    { skip: !companyId }
  );

  const { data: perfData, isLoading: isLoadingPerf } = useGetPerformanceEvaluationsQuery(
    { companyId },
    { skip: !companyId }
  );

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDept, setSelectedDept] = React.useState("All Departments");

  const employees = empData?.employees || [];
  const evaluations = perfData?.evaluations || [];

  // Group evaluations by employee email or ID
  const employeePerformanceMap = React.useMemo(() => {
    const map: Record<string, { totalRating: number; count: number; evaluationsList: any[] }> = {};
    evaluations.forEach((evalItem) => {
      const key = evalItem.employeeEmail.toLowerCase();
      if (!map[key]) {
        map[key] = { totalRating: 0, count: 0, evaluationsList: [] };
      }
      const avg = (evalItem.workQuality + evalItem.communication + evalItem.teamwork + evalItem.punctuality) / 4;
      map[key].totalRating += avg;
      map[key].count += 1;
      map[key].evaluationsList.push(evalItem);
    });
    return map;
  }, [evaluations]);

  // Build employee list items with performance statistics
  const teamPerformanceList = React.useMemo(() => {
    return employees.map((emp) => {
      const stats = employeePerformanceMap[emp.email.toLowerCase()];
      const averageScore = stats ? (stats.totalRating / stats.count).toFixed(1) : null;
      return {
        id: emp.id,
        name: emp.name,
        email: emp.email,
        avatar: emp.avatar,
        role: emp.role,
        department: emp.department,
        office: emp.office,
        status: emp.status,
        averageScore,
        reviewCount: stats ? stats.count : 0,
      };
    });
  }, [employees, employeePerformanceMap]);

  // Filter list
  const filteredTeamList = React.useMemo(() => {
    return teamPerformanceList.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === "All Departments" || item.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [teamPerformanceList, searchQuery, selectedDept]);

  // Departments List
  const departments = React.useMemo(() => {
    const set = new Set<string>();
    employees.forEach((e) => {
      if (e.department) set.add(e.department);
    });
    return ["All Departments", ...Array.from(set)];
  }, [employees]);



  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950 font-sans">

      {/* Header & Breadcrumbs matching my-performance page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Performance Evaluation
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-550 mt-2.5">
            <Link href="/help-center" className="hover:text-primary transition-colors">
              Help Center
            </Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <span className="text-gray-900 dark:text-white">Performance Evaluation</span>
          </div>
        </div>
      </div>

      {/* Main card with Filters and Table to match the global admin-table pattern */}
      <Card className="p-6">
        <div className="flex flex-col gap-6">

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<HiOutlineMagnifyingGlass className="text-lg text-[#94A3B8]" />}
              containerClassName="w-full max-w-sm"
              className="h-10 bg-gray-55/30 dark:bg-gray-800/50"
            />

            <Dropdown
              label={selectedDept === "All Departments" ? "Filter" : selectedDept}
              options={departments}
              onSelect={(opt) => setSelectedDept(opt)}
              align="right"
            />
          </div>

          {/* Custom Admin Table Pattern */}
          <div className="admin-table-container">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Manager</th>
                  <th>Overall Rating</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingEmps || isLoadingPerf ? (
                  <SVGLoaderFetch colSpan={6} text="Loading team performance..." />
                ) : filteredTeamList.length === 0 ? (
                  <NoRecordFound colSpan={6} text="No performance evaluation records found." asTable={true} />
                ) : (
                  filteredTeamList.map((item) => {
                    // Find the latest evaluation for this employee to get the reviewer (manager) name
                    const empEvals = employeePerformanceMap[item.email.toLowerCase()];
                    const latestEval = empEvals?.evaluationsList?.[empEvals.evaluationsList.length - 1];
                    const managerName = latestEval?.reviewerName || "—";

                    return (
                      <tr key={item.id} className="group">
                        <td>
                          <p className="text-xs font-bold text-gray-900 dark:text-white">
                            {item.name}
                          </p>
                        </td>
                        <td>{item.role}</td>
                        <td>{item.department}</td>
                        <td>{managerName}</td>
                        <td>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {item.averageScore || "—"}
                          </span>
                        </td>
                        <td className="text-right">
                          <TableActions
                            onView={() => router.push(`/performance/team-performance/${item.id}`)}
                            className="justify-end"
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>
      </Card>

    </div>
  );
}
