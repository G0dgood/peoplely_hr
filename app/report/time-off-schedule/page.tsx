"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { useAppSelector } from "@/store/hooks";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import { useGetTimeOffRequestsQuery } from "@/store/services/timeOffApi";
import {
  HiOutlineChevronRight,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";
import { Pagination } from "@/components/ui/pagination";
import { RowPerPage } from "@/components/ui/row-per-page";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

export default function TimeOffSchedulePage() {
  const user = useAppSelector((state) => state.auth.user);

  const { data: empData, isLoading: empLoading } = useGetEmployeesQuery(
    { companyId: user?.companyId, limit: 1000 },
    { skip: !user?.companyId }
  );

  const { data: requestData, isLoading: requestsLoading } = useGetTimeOffRequestsQuery(
    { companyId: user?.companyId },
    { skip: !user?.companyId }
  );

  const employees = empData?.employees || [];
  const requests = requestData?.timeOffRequests || [];

  const isLoading = empLoading || requestsLoading;

  const [officeFilter, setOfficeFilter] = React.useState("All Offices");
  const [jobFilter, setJobFilter] = React.useState("All Jobs");
  const [statusFilter, setStatusFilter] = React.useState("All Status");
  const [deptFilter, setDeptFilter] = React.useState("All Departement");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(8);

  // Map requests to include employee details
  const mappedRecords = React.useMemo(() => {
    return requests.map((req) => {
      const emp = employees.find(e => e.id === req.userId || e.email === req.user?.email);
      return {
        id: req.id,
        empId: emp?.id || req.userId,
        name: req.user?.name || emp?.name || "Employee",
        email: req.user?.email || emp?.email || "",
        avatar: emp?.avatar || "",
        department: emp?.department || "General",
        jobTitle: emp?.role || "Employee",
        office: emp?.office || "HQ Office",
        from: formatDate(req.startDate),
        to: formatDate(req.endDate),
        type: req.policy?.name || "Time Off",
        status: (emp?.status || "ACTIVE").toUpperCase() as "ACTIVE" | "ON BOARDING" | "PROBATION" | "ON LEAVE",
      };
    });
  }, [requests, employees]);

  // Filtering Logic
  const filtered = React.useMemo(() => {
    return mappedRecords.filter((r) => {
      if (officeFilter !== "All Offices" && r.office !== officeFilter) return false;
      if (jobFilter !== "All Jobs" && r.jobTitle !== jobFilter) return false;
      if (deptFilter !== "All Departement" && r.department !== deptFilter) return false;
      if (statusFilter !== "All Status") {
        const map: Record<string, string> = {
          "Active": "ACTIVE",
          "On Boarding": "ON BOARDING",
          "Probation": "PROBATION",
          "On Leave": "ON LEAVE"
        };
        if (r.status !== (map[statusFilter] ?? statusFilter.toUpperCase())) return false;
      }
      return true;
    });
  }, [mappedRecords, officeFilter, jobFilter, deptFilter, statusFilter]);

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
      "PROBATION": "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
      "ON LEAVE": "bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-450",
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
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-semibold text-gray-455">
                    Loading schedule...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-semibold text-gray-455">
                    No records match the selected filters.
                  </td>
                </tr>
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
                      <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">{emp.empId.slice(0, 8)}</td>
                      <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">{emp.jobTitle}</td>
                      <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-455">{emp.from}</td>
                      <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-455">{emp.to}</td>
                      <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-455">{emp.type}</td>
                      <td className="py-4 pl-4 text-right">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[9px] font-bold ${statusStyle(emp.status)}`}>
                          {emp.status}
                        </span>
                      </td>
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
