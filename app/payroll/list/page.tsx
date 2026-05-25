"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineCalendarDays,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowDownTray,
  HiOutlineEllipsisVertical,
  HiOutlineEye,
  HiOutlineCheck,
  HiOutlineXMark,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { RowPerPage } from "@/components/ui/row-per-page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { PageHeader } from "@/components/ui/page-header";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

type PayrollStatus = "PAID" | "PENDING" | "PROCESSING" | "FAILED";

interface PayrollRecord {
  id: number;
  name: string;
  email: string;
  fallback: string;
  department: string;
  jobTitle: string;
  baseSalary: string;
  bonus: string;
  deductions: string;
  netPay: string;
  period: string;
  status: PayrollStatus;
}

const PAYROLL_DATA: PayrollRecord[] = [
  {
    id: 1,
    name: "Pristia Candra",
    email: "lincoln@unpixel.com",
    fallback: "PC",
    department: "Design",
    jobTitle: "UI/UX Designer",
    baseSalary: "$4,500",
    bonus: "$300",
    deductions: "$450",
    netPay: "$4,350",
    period: "Apr 2023",
    status: "PAID",
  },
  {
    id: 2,
    name: "Hanna Baptista",
    email: "hanna@unpixel.com",
    fallback: "HB",
    department: "Engineering",
    jobTitle: "Frontend Developer",
    baseSalary: "$5,200",
    bonus: "$500",
    deductions: "$520",
    netPay: "$5,180",
    period: "Apr 2023",
    status: "PAID",
  },
  {
    id: 3,
    name: "Miracle Geidt",
    email: "miracle@unpixel.com",
    fallback: "MG",
    department: "Engineering",
    jobTitle: "Backend Developer",
    baseSalary: "$5,800",
    bonus: "$0",
    deductions: "$580",
    netPay: "$5,220",
    period: "Apr 2023",
    status: "PROCESSING",
  },
  {
    id: 4,
    name: "Rayna Torff",
    email: "rayna@unpixel.com",
    fallback: "RT",
    department: "Marketing",
    jobTitle: "Marketing Lead",
    baseSalary: "$4,000",
    bonus: "$200",
    deductions: "$400",
    netPay: "$3,800",
    period: "Apr 2023",
    status: "PENDING",
  },
  {
    id: 5,
    name: "Giana Lipshutz",
    email: "giana@unpixel.com",
    fallback: "GL",
    department: "Product",
    jobTitle: "Product Manager",
    baseSalary: "$6,000",
    bonus: "$800",
    deductions: "$600",
    netPay: "$6,200",
    period: "Apr 2023",
    status: "PAID",
  },
  {
    id: 6,
    name: "James George",
    email: "james@unpixel.com",
    fallback: "JG",
    department: "Design",
    jobTitle: "Graphic Designer",
    baseSalary: "$3,800",
    bonus: "$150",
    deductions: "$380",
    netPay: "$3,570",
    period: "Apr 2023",
    status: "PAID",
  },
  {
    id: 7,
    name: "Jordyn George",
    email: "jordyn@unpixel.com",
    fallback: "JG",
    department: "HR",
    jobTitle: "HR Specialist",
    baseSalary: "$4,200",
    bonus: "$0",
    deductions: "$420",
    netPay: "$3,780",
    period: "Apr 2023",
    status: "FAILED",
  },
  {
    id: 8,
    name: "Skylar Herwitz",
    email: "skylar@unpixel.com",
    fallback: "SH",
    department: "Engineering",
    jobTitle: "DevOps Engineer",
    baseSalary: "$6,500",
    bonus: "$600",
    deductions: "$650",
    netPay: "$6,450",
    period: "Apr 2023",
    status: "PROCESSING",
  },
];

const STATUS_CONFIG: Record<PayrollStatus, { variant: "success" | "warning" | "error" | "primary"; label: string }> = {
  PAID: { variant: "success", label: "Paid" },
  PENDING: { variant: "warning", label: "Pending" },
  PROCESSING: { variant: "primary", label: "Processing" },
  FAILED: { variant: "error", label: "Failed" },
};

export default function PayrollListPage() {
  const [records, setRecords] = React.useState(PAYROLL_DATA);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [dateRange, setDateRange] = React.useState("01 Apr 2023 - 30 Apr 2023");
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = React.useState<number | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const handleOutsideClick = () => setActiveMenuIndex(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? records.map((r) => r.id) : []);
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };

  const handleMarkPaid = (index: number) => {
    const updated = [...records];
    updated[index].status = "PAID";
    setRecords(updated);
    setActiveMenuIndex(null);
  };

  const totalNetPay = records.reduce((sum, r) => {
    const val = parseFloat(r.netPay.replace(/[$,]/g, "")) || 0;
    return sum + val;
  }, 0);

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Payroll" description="Manage your team's payroll" />
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search employee"
            leftIcon={<HiOutlineMagnifyingGlass />}
            className="w-64 h-11 bg-white dark:bg-gray-900"
            containerClassName="w-auto"
          />
          <Button
            variant="primary"
            className="h-11 px-6 bg-[#11131A] dark:bg-white dark:text-gray-900 whitespace-nowrap"
            leftIcon={<HiOutlineArrowDownTray className="text-lg" />}
          >
            Download CSV
          </Button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Payroll", value: `$${totalNetPay.toLocaleString()}`, sub: "Apr 2023" },
          { label: "Employees Paid", value: `${records.filter((r) => r.status === "PAID").length}`, sub: "Completed payouts" },
          { label: "Pending", value: `${records.filter((r) => r.status === "PENDING").length}`, sub: "Awaiting approval" },
          { label: "Processing", value: `${records.filter((r) => r.status === "PROCESSING").length}`, sub: "In progress" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border border-gray-300 dark:border-gray-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{stat.sub}</p>
          </Card>
        ))}
      </div>

      {/* Main Table Card */}
      <Card className="p-8 border border-gray-300 dark:border-gray-800">
        <div className="flex flex-col gap-8">

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Date Range Picker */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDatePickerOpen(!isDatePickerOpen);
                }}
                className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white min-w-[260px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span>{dateRange}</span>
                <HiOutlineCalendarDays className="text-gray-400 text-lg ml-auto" />
              </button>
              <DatePicker
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSave={(range) => setDateRange(range)}
              />
            </div>
            <Dropdown
              label="All Departments"
              options={["Design", "Engineering", "Marketing", "Product", "HR"]}
            />
            <Dropdown
              label="All Status"
              options={["Paid", "Pending", "Processing", "Failed"]}
            />
            <div className="ml-auto">
              <RowPerPage itemsPerPage={8} />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-gray-50/50 dark:bg-gray-800/30 rounded-xl">
                  <TableHead className="py-4 px-4 rounded-l-xl w-12">
                    <Checkbox
                      checked={selectedRows.length === records.length && records.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Department
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Base Salary
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Bonus
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Deductions
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Net Pay
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Period
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right rounded-r-xl">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((row, index) => {
                  const isChecked = selectedRows.includes(row.id);
                  const isMenuOpen = activeMenuIndex === index;
                  const statusCfg = STATUS_CONFIG[row.status];

                  return (
                    <TableRow
                      key={row.id}
                      className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-300 dark:border-gray-800"
                    >
                      <TableCell className="py-5 px-4">
                        <Checkbox
                          checked={isChecked}
                          onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                        />
                      </TableCell>

                      {/* Employee */}
                      <TableCell className="py-5 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar fallback={row.fallback} size="sm" />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">{row.name}</span>
                            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">{row.email}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Department */}
                      <TableCell className="py-5 px-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-900 dark:text-white">{row.department}</span>
                          <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">{row.jobTitle}</span>
                        </div>
                      </TableCell>

                      {/* Base Salary */}
                      <TableCell className="py-5 px-4 text-xs font-bold text-gray-900 dark:text-white">
                        {row.baseSalary}
                      </TableCell>

                      {/* Bonus */}
                      <TableCell className="py-5 px-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {row.bonus}
                      </TableCell>

                      {/* Deductions */}
                      <TableCell className="py-5 px-4 text-xs font-semibold text-red-500 dark:text-red-400">
                        -{row.deductions}
                      </TableCell>

                      {/* Net Pay */}
                      <TableCell className="py-5 px-4 text-xs font-black text-gray-900 dark:text-white">
                        {row.netPay}
                      </TableCell>

                      {/* Period */}
                      <TableCell className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {row.period}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-5 px-4">
                        <Badge variant={statusCfg.variant} tinted className="text-[10px] uppercase tracking-wider px-2.5 py-1">
                          {statusCfg.label}
                        </Badge>
                      </TableCell>

                      {/* Action */}
                      <TableCell className="py-5 px-4 text-right relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuIndex(isMenuOpen ? null : index);
                          }}
                          className="inline-flex w-8 h-8 items-center justify-center bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                        >
                          <HiOutlineEllipsisVertical className="text-sm" />
                        </button>

                        {isMenuOpen && (
                          <div className="absolute right-4 mt-1 w-40 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden text-left">
                            <button
                              onClick={() => router.push(`/payroll/list/${row.id}`)}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <HiOutlineEye className="text-gray-400 text-sm" />
                              View Details
                            </button>
                            {row.status !== "PAID" && (
                              <button
                                onClick={() => handleMarkPaid(index)}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border-t border-gray-300 dark:border-gray-800/60 transition-colors"
                              >
                                <HiOutlineCheck className="text-gray-400 text-sm" />
                                Mark as Paid
                              </button>
                            )}
                            {row.status === "PENDING" && (
                              <button
                                onClick={() => {
                                  const updated = [...records];
                                  updated[index].status = "FAILED";
                                  setRecords(updated);
                                  setActiveMenuIndex(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 border-t border-gray-300 dark:border-gray-800/60 transition-colors"
                              >
                                <HiOutlineXMark className="text-red-400 text-sm" />
                                Reject
                              </button>
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Footer */}
          <div className="pt-6 border-t border-gray-300 dark:border-gray-800">
            <Pagination className="mt-0 w-full" />
          </div>

        </div>
      </Card>
    </div>
  );
}
