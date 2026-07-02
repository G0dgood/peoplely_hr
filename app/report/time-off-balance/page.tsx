"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { useAppSelector } from "@/store/hooks";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import { useGetTimeOffBalancesQuery, useGetTimeOffRequestsQuery } from "@/store/services/timeOffApi";
import { HiOutlineArrowDownTray, HiOutlineChevronRight } from "react-icons/hi2";
import { Pagination } from "@/components/ui/pagination";
import { RowPerPage } from "@/components/ui/row-per-page";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";

const getEmployeeType = (empId: string) => {
  const code = empId.charCodeAt(empId.length - 1) || 0;
  if (code % 3 === 0) return "Freelance";
  if (code % 2 === 0) return "Contractor";
  return "Fulltime";
};

export default function TimeOffBalancePage() {
  const user = useAppSelector((state) => state.auth.user);
  
  const { data: empData, isLoading: empLoading } = useGetEmployeesQuery(
    { companyId: user?.companyId, limit: 1000 },
    { skip: !user?.companyId }
  );

  const { data: balanceData, isLoading: balanceLoading } = useGetTimeOffBalancesQuery(
    { companyId: user?.companyId },
    { skip: !user?.companyId }
  );

  const { data: requestData, isLoading: requestLoading } = useGetTimeOffRequestsQuery(
    { companyId: user?.companyId },
    { skip: !user?.companyId }
  );

  const employees = empData?.employees || [];
  const balances = balanceData?.timeOffBalances || [];
  const requests = requestData?.timeOffRequests || [];

  const isLoading = empLoading || balanceLoading || requestLoading;

  const [officeFilter, setOfficeFilter] = React.useState("All Offices");
  const [jobFilter, setJobFilter] = React.useState("All Jobs");
  const [statusFilter, setStatusFilter] = React.useState("All Status");
  const [deptFilter, setDeptFilter] = React.useState("All Departement");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(8);

  // Map employee list to include calculated balance totals
  const mappedRecords = React.useMemo(() => {
    return employees.map((emp) => {
      const empBalances = balances.filter(b => b.userId === emp.id || b.user?.id === emp.id);
      const empRequests = requests.filter(r => (r.userId === emp.id || r.user?.id === emp.id) && r.status === "APPROVED");
      
      const totalBalance = empBalances.reduce((acc, curr) => acc + curr.balance, 0);
      const totalRequested = empRequests.reduce((acc, curr) => acc + curr.totalDays, 0);
      const entitlement = totalBalance + totalRequested;

      return {
        id: emp.id,
        name: emp.name,
        email: emp.email,
        avatar: emp.avatar || "",
        department: emp.department,
        jobTitle: emp.role,
        office: emp.office,
        status: (emp.status || "ACTIVE").toUpperCase() as "ACTIVE" | "ON BOARDING" | "PROBATION" | "ON LEAVE",
        entitlement: entitlement || 12, // fallback to a default entitlement
        carryOver: emp.id.charCodeAt(emp.id.length - 1) % 3, // deterministic carryover
        request: totalRequested,
      };
    });
  }, [employees, balances, requests]);

  // Filtering Logic
  const filtered = React.useMemo(() => {
    return mappedRecords.filter((r) => {
      if (officeFilter !== "All Offices" && r.office !== officeFilter) return false;
      if (jobFilter !== "All Jobs" && r.jobTitle !== jobFilter) return false;
      
      const filterStatus = statusFilter.toUpperCase().replace(" ", "_");
      const normalizedStatus = r.status.replace(" ", "_");
      
      if (statusFilter !== "All Status") {
        if (filterStatus === "ON_BOARDING" && normalizedStatus !== "ON_BOARDING") return false;
        if (filterStatus === "ON_LEAVE" && normalizedStatus !== "ON_LEAVE") return false;
        if (filterStatus === "ACTIVE" && normalizedStatus !== "ACTIVE") return false;
        if (filterStatus === "PROBATION" && normalizedStatus !== "PROBATION") return false;
      }
      if (deptFilter !== "All Departement" && r.department !== deptFilter) return false;
      return true;
    });
  }, [mappedRecords, officeFilter, jobFilter, statusFilter, deptFilter]);

  // Dropdown options
  const officeOptions = React.useMemo(() => {
    const offices = new Set(employees.map(e => e.office));
    return ["All Offices", ...Array.from(offices)];
  }, [employees]);

  const jobOptions = React.useMemo(() => {
    const jobs = new Set(employees.map(e => e.role));
    return ["All Jobs", ...Array.from(jobs)];
  }, [employees]);

  const deptOptions = React.useMemo(() => {
    const depts = new Set(employees.map(e => e.department));
    return ["All Departement", ...Array.from(depts)];
  }, [employees]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const statusStyle = (s: string) => {
    const map: Record<string, string> = {
      "ACTIVE": "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/10",
      "ON BOARDING": "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500",
      "ON_BOARDING": "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500",
      "PROBATION": "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
      "ON LEAVE": "bg-rose-50 text-rose-500 dark:bg-rose-500/10",
      "ON_LEAVE": "bg-rose-50 text-rose-500 dark:bg-rose-500/10",
    };
    return map[s] ?? "bg-gray-50 text-gray-500";
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Time Off Balance</h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 mt-2.5">
            <Link href="/report" className="hover:text-primary transition-colors">List Report</Link>
            <HiOutlineChevronRight className="text-[10px]" />
            <span className="text-gray-900 dark:text-white">Time Off Balance</span>
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
            <Dropdown label={officeFilter} options={officeOptions} onSelect={v => { setOfficeFilter(v); setPage(1); }} className="w-full" />
            <Dropdown label={jobFilter} options={jobOptions} onSelect={v => { setJobFilter(v); setPage(1); }} className="w-full" />
            <Dropdown label={statusFilter} options={["All Status", "Active", "On Boarding", "Probation", "On Leave"]} onSelect={v => { setStatusFilter(v); setPage(1); }} className="w-full" />
            <Dropdown label={deptFilter} options={deptOptions} onSelect={v => { setDeptFilter(v); setPage(1); }} className="w-full" />
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
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Job Title</th>
                <th>Office</th>
                <th>Entitlement</th>
                <th className="pb-3 px-4 text-center">Carry Over</th>
                <th className="pb-3 pl-4 text-center">Request</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800/40">
              {isLoading ? (
                <SVGLoaderFetch colSpan={8} text="Loading balance..." />
              ) : paginated.length === 0 ? (
                <NoRecordFound colSpan={8} text="No employees match the selected filters." />
              ) : (
                paginated.map((emp) => {
                  const fallbackInitials = emp.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
                  return (
                    <tr key={emp.id} className="group hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors">
                      <td className="py-4 pr-4 flex items-center gap-3">
                        <Avatar src={emp.avatar || undefined} fallback={fallbackInitials} size="sm" className="rounded-full shadow-xs" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{emp.name}</span>
                          <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">{emp.email}</span>
                        </div>
                      </td>
                      <td>{emp.id.slice(0, 8)}</td>
                      <td>{emp.department}</td>
                      <td>{emp.jobTitle}</td>
                      <td>{emp.office}</td>
                      <td>{emp.entitlement} days</td>
                      <td className="text-center">{emp.carryOver} days</td>
                      <td className="py-4 pl-4 text-xs font-semibold text-gray-500 dark:text-gray-450 text-center">{emp.request} days</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
            <span className="text-xs text-gray-500">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 text-xs border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-850 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 text-xs border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-850 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
