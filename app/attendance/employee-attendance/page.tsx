"use client";

import * as React from "react";
import {
  HiOutlineCalendarDays,
  HiOutlineInformationCircle,
  HiOutlineEllipsisVertical,
  HiOutlineCheck,
  HiOutlinePencilSquare
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Dropdown } from "@/components/ui/dropdown";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EditPaidTimeModal } from "@/components/ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const INITIAL_EMPLOYEE_DATA = [
  {
    id: 1,
    name: "Pristia Candra",
    email: "lincoln@unpixel.com",
    avatar: "",
    fallback: "PC",
    type: "Fulltime",
    schedule: "8h",
    logged: "8h 00m 05s",
    paid: "6h",
    overtime: "2h",
    status: "",
    dateVal: "6h"
  },
  {
    id: 2,
    name: "Hanna Baptista",
    email: "hanna@unpixel.com",
    avatar: "",
    fallback: "HB",
    type: "Fulltime",
    schedule: "8h",
    logged: "8h 00m 05s",
    paid: "5h",
    overtime: "1h",
    status: "APPROVE",
    dateVal: "5h"
  },
  {
    id: 3,
    name: "Miracle Geidt",
    email: "miracle@unpixel.com",
    avatar: "",
    fallback: "MG",
    type: "Fulltime",
    schedule: "8h",
    logged: "8h 00m 05s",
    paid: "3h",
    overtime: "1h",
    status: "APPROVE",
    dateVal: "3h"
  },
  {
    id: 4,
    name: "Rayna Torff",
    email: "rayna@unpixel.com",
    avatar: "",
    fallback: "RT",
    type: "Fulltime",
    schedule: "8h",
    logged: "8h 00m 05s",
    paid: "7h",
    overtime: "0h",
    status: "",
    dateVal: "7h"
  },
  {
    id: 5,
    name: "James George",
    email: "james@unpixel.com",
    avatar: "",
    fallback: "JG",
    type: "Fulltime",
    schedule: "8h",
    logged: "8h 00m 05s",
    paid: "8h",
    overtime: "0h",
    status: "APPROVE",
    dateVal: "8h"
  },
  {
    id: 6,
    name: "Jordyn George",
    email: "jordyn@unpixel.com",
    avatar: "",
    fallback: "JG",
    type: "Fulltime",
    schedule: "8h",
    logged: "8h 00m 05s",
    paid: "8h",
    overtime: "0h",
    status: "APPROVE",
    dateVal: "8h"
  },
  {
    id: 7,
    name: "Skylar Herwitz",
    email: "skylar@unpixel.com",
    avatar: "",
    fallback: "SH",
    type: "Fulltime",
    schedule: "8h",
    logged: "8h 00m 05s",
    paid: "8h",
    overtime: "0h",
    status: "APPROVE",
    dateVal: "8h"
  }
];

export default function EmployeeAttendancePage() {
  const [records, setRecords] = React.useState(INITIAL_EMPLOYEE_DATA);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [dateRange, setDateRange] = React.useState("01 Jan 2023 - 10 Mar 2023");
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = React.useState<number | null>(null);
  const [editingRecordIndex, setEditingRecordIndex] = React.useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleOutsideClick = () => setActiveMenuIndex(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(records.map((r) => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleApprove = (index: number) => {
    const updated = [...records];
    updated[index].status = "APPROVE";
    setRecords(updated);
    setActiveMenuIndex(null);
  };

  const handleEditSave = (newDate: string, newTime: string, newNotes: string) => {
    if (editingRecordIndex === null) return;
    const updated = [...records];
    updated[editingRecordIndex].paid = newTime;
    updated[editingRecordIndex].dateVal = newTime;
    setRecords(updated);
    setIsEditModalOpen(false);
    setEditingRecordIndex(null);
  };

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Attendance</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your Team Attendance</p>
        </div>
      </div>

      {/* Main Content Area */}
      <Card className="p-8 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col gap-8">
          {/* Info Alert Banner */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-blue-50/55 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl">
            <HiOutlineInformationCircle className="text-blue-500 dark:text-blue-400 text-xl shrink-0" />
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 leading-normal">
              You can only update the attendance record within the last 31 days.
            </p>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDatePickerOpen(!isDatePickerOpen);
                }}
                className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white min-w-[260px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
              label="All Record"
              options={["All Record", "Regular Shifts", "Overtime Shifts"]}
              className="min-w-[180px]"
            />
            <Dropdown
              label="All Location"
              options={["All Location", "Office (Semarang)", "Remote"]}
              className="min-w-[180px]"
            />
            <Dropdown
              label="All Status"
              options={["All Status", "On Time", "Late", "Deficit"]}
              className="min-w-[180px]"
            />
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-gray-50/50 dark:bg-gray-800/30 rounded-xl">
                  <TableHead className="py-4 px-4 rounded-l-xl w-12">
                    <Checkbox
                      checked={selectedRows.length === records.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Employee Type
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Paid Time/ Work Schedule
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Overtime
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    11 Apr
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
                  return (
                    <TableRow
                      key={row.id}
                      className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-800"
                    >
                      <TableCell className="py-5 px-4">
                        <Checkbox
                          checked={isChecked}
                          onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                        />
                      </TableCell>
                      <TableCell className="py-5 px-4 text-xs font-bold text-gray-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <Avatar fallback={row.fallback} size="sm" />
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900 dark:text-white">{row.name}</span>
                            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">{row.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {row.type}
                      </TableCell>
                      <TableCell className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {row.paid}/{row.schedule}
                      </TableCell>
                      <TableCell className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {row.overtime}
                      </TableCell>
                      <TableCell className="py-5 px-4 text-xs">
                        {row.status ? (
                          <Badge variant="success" tinted>
                            {row.status}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="py-5 px-4 text-xs font-semibold text-gray-900 dark:text-white">
                        {row.dateVal}
                      </TableCell>
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

                        {/* Action Dropdown Menu */}
                        {isMenuOpen && (
                          <div className="absolute right-4 mt-1 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden text-left">
                            <button
                              onClick={() => handleApprove(index)}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <HiOutlineCheck className="text-gray-400 text-sm" />
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                setEditingRecordIndex(index);
                                setIsEditModalOpen(true);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border-t border-gray-100 dark:border-gray-800/60 transition-colors"
                            >
                              <HiOutlinePencilSquare className="text-gray-400 text-sm" />
                              Edit Paid Time
                            </button>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-6 border-t border-gray-200 dark:border-gray-800">
            <Pagination className="mt-0 justify-start w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div className="flex items-center gap-6">
              <p className="text-xs font-bold text-gray-400">Showing 1 to {records.length} of 50 entries</p>
              <div className="flex items-center gap-3">
                <p className="text-xs font-bold text-gray-900 dark:text-white">Show 8</p>
                <Dropdown
                  label="8"
                  options={["5", "8", "10", "20", "50"]}
                  className="min-w-[80px]"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <EditPaidTimeModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRecordIndex(null);
        }}
        onSave={handleEditSave}
        initialDate="11 Apr 2023"
        loggedTime={editingRecordIndex !== null ? records[editingRecordIndex].logged : ""}
        initialPaidTime={editingRecordIndex !== null ? records[editingRecordIndex].paid : ""}
        initialNotes=""
      />
    </div>
  );
}
