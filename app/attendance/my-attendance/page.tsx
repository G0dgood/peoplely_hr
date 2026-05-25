"use client";

import * as React from "react";
import {
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineInformationCircle,
  HiOutlineMapPin,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineArrowUpTray,
  HiOutlinePencilSquare
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { DatePicker } from "@/components/ui/date-picker";
import { ClockOutModal, EditPaidTimeModal } from "@/components/ui/modal";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PageHeader } from "@/components/ui/page-header";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { RowPerPage } from "@/components/ui/row-per-page";




const ATTENDANCE_DATA = [
  {
    date: "01 Mar 2023",
    clockIn: "08:00 (GMT+7)",
    clockInLoc: "Semarang, Indonesia",
    clockOut: "14:30 (GMT+7)",
    clockOutLoc: "Semarang, Indonesia",
    schedule: "8h",
    logged: "8h 30m",
    paid: "8h",
    overtime: "30m",
    status: "PENDING",
    isPositive: true,
    details: {
      notes: "Completed standard shifts with minor overtime to finalize customer report.",
      device: "Web Browser (Chrome)",
      ipAddress: "192.168.1.15"
    }
  },
  {
    date: "02 Mar 2023",
    clockIn: "08:00 (GMT+7)",
    clockInLoc: "Semarang, Indonesia",
    clockOut: "14:30 (GMT+7)",
    clockOutLoc: "Semarang, Indonesia",
    schedule: "8h",
    logged: "8h 30m",
    paid: "8h",
    overtime: "30m",
    status: "PENDING",
    isPositive: true,
    details: {
      notes: "Standard operational work. No disruptions.",
      device: "Mobile App (Android)",
      ipAddress: "192.168.1.18"
    }
  },
  {
    date: "03 Mar 2023",
    clockIn: "08:00 (GMT+7)",
    clockInLoc: "Semarang, Indonesia",
    clockOut: "14:30 (GMT+7)",
    clockOutLoc: "Semarang, Indonesia",
    schedule: "8h",
    logged: "8h 30m",
    paid: "8h",
    overtime: "30m",
    status: "PENDING",
    isPositive: true,
    details: {
      notes: "Regular desk duty.",
      device: "Web Browser (Firefox)",
      ipAddress: "192.168.1.20"
    }
  },
  {
    date: "04 Mar 2023",
    clockIn: "08:00 (GMT+7)",
    clockInLoc: "Semarang, Indonesia",
    clockOut: "14:30 (GMT+7)",
    clockOutLoc: "Semarang, Indonesia",
    schedule: "8h",
    logged: "8h 30m",
    paid: "8h",
    overtime: "30m",
    status: "PENDING",
    isPositive: true,
    details: {
      notes: "Regular desk duty.",
      device: "Web Browser (Safari)",
      ipAddress: "192.168.1.21"
    }
  },
  {
    date: "05 Mar 2023",
    clockIn: "08:00 (GMT+7)",
    clockInLoc: "Semarang, Indonesia",
    clockOut: "14:30 (GMT+7)",
    clockOutLoc: "Semarang, Indonesia",
    schedule: "8h",
    logged: "8h 30m",
    paid: "8h",
    overtime: "30m",
    status: "PENDING",
    isPositive: true,
    details: {
      notes: "Regular desk duty.",
      device: "Web Browser (Chrome)",
      ipAddress: "192.168.1.15"
    }
  }
];

export default function MyAttendancePage() {
  const [isClockedIn, setIsClockedIn] = React.useState(false);
  const [seconds, setSeconds] = React.useState(5);
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState("01 Jan 2023 - 10 Mar 2023");
  const [expandedRows, setExpandedRows] = React.useState<number[]>([]);
  const [records, setRecords] = React.useState(ATTENDANCE_DATA);
  const [isClockOutModalOpen, setIsClockOutModalOpen] = React.useState(false);
  const [editingRecordIndex, setEditingRecordIndex] = React.useState<number | null>(null);
  const [isEditPaidTimeModalOpen, setIsEditPaidTimeModalOpen] = React.useState(false);

  // Clock timer simulation
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isClockedIn) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}h ${mins
      .toString()
      .padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
  };

  const toggleRow = (index: number) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((r) => r !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const handleClockInOutClick = () => {
    if (isClockedIn) {
      setIsClockOutModalOpen(true);
    } else {
      setIsClockedIn(true);
      setSeconds(5); // Reset to start counting
    }
  };

  const handleClockOutConfirm = (noteText: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " (GMT+7)";

    // 8 hours in seconds is 28800
    const deficitText = seconds >= 28800
      ? `+ ${Math.round((seconds - 28800) / 60)}m`
      : `-${Math.round((28800 - seconds) / 60)}m`;

    const newRecord = {
      date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      clockIn: "08:00 (GMT+7)",
      clockInLoc: "Semarang, Indonesia",
      clockOut: timeString,
      clockOutLoc: "Semarang, Indonesia",
      schedule: "8h",
      logged: formatTime(seconds),
      paid: "8h",
      overtime: deficitText,
      status: "PENDING",
      isPositive: seconds >= 28800,
      details: {
        notes: noteText || "No notes provided.",
        device: "Web Browser (Chrome)",
        ipAddress: "192.168.1.15"
      }
    };

    setRecords([newRecord, ...records]);
    setIsClockedIn(false);
    setIsClockOutModalOpen(false);
  };

  const handleEditPaidTimeSave = (newDate: string, newTime: string, newNotes: string) => {
    if (editingRecordIndex === null) return;
    const updated = [...records];
    updated[editingRecordIndex] = {
      ...updated[editingRecordIndex],
      date: newDate,
      paid: newTime,
      status: "PENDING",
      details: {
        ...updated[editingRecordIndex].details,
        notes: newNotes
      }
    };
    setRecords(updated);
    setIsEditPaidTimeModalOpen(false);
    setEditingRecordIndex(null);
  };

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="My Attendance" description="Manage your Attendance" />

        {/* Dynamic Interactive Clock-In Button */}
        <button
          onClick={handleClockInOutClick}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all border border-transparent ${isClockedIn
            ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
            : "bg-[#11131A] dark:bg-white text-white dark:text-gray-900 hover:opacity-90"
            }`}
        >
          <HiOutlineClock className="text-lg" />
          <span>{isClockedIn ? `Check Out ${formatTime(seconds)}` : `Check In ${formatTime(seconds)}`}</span>
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Work Schedule", value: "48 Hours", sub: "Scheduled hours" },
          { title: "Logged Time", value: "30 Hours", sub: "Logged time" },
          { title: "Paid Time", value: "29 Hours", sub: "Paid work hours" },
          { title: "Overtime", value: "1 Hours", sub: "Approved overtime" },
        ].map((card, idx) => (
          <Card key={idx} className="p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.title}</span>
              <HiOutlineInformationCircle className="text-gray-400 text-lg cursor-pointer hover:text-gray-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{card.value}</h3>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{card.sub}</p>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <Card className="p-4 md:p-8 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col gap-8">

          {/* Info Alert Banner */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl">
            <HiOutlineInformationCircle className="text-blue-500 dark:text-blue-400 text-xl shrink-0" />
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 leading-normal">
              You can only update the attendance record within the last 31 days.
            </p>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
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
            />
            <Dropdown
              label="All Location"
              options={["All Location", "Office (Semarang)", "Remote"]}
            />
            <Dropdown
              label="All Status"
              options={["All Status", "On Time", "Late", "Deficit"]}
            />
            <div className="ml-auto">
              <RowPerPage itemsPerPage={5} />
            </div>
          </div>

          {/* Collapsible Attendance Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-gray-50/50 dark:bg-gray-800/30 rounded-xl">
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider rounded-l-xl">Date</TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Clock In</TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Clock Out</TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Work Schedule</TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Logged Time</TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Paid Time</TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Overtime</TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Status</TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Note</TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right rounded-r-xl">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((row, index) => {
                  const isExpanded = expandedRows.includes(index);
                  return (
                    <React.Fragment key={index}>
                      <TableRow
                        onClick={() => toggleRow(index)}
                        className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-800 cursor-pointer"
                      >
                        <TableCell className="py-5 px-4 text-xs font-bold text-gray-900 dark:text-white">
                          <div className="flex items-center gap-2">
                            {isExpanded ? (
                              <HiOutlineChevronUp className="text-gray-400 text-xs shrink-0" />
                            ) : (
                              <HiOutlineChevronDown className="text-gray-400 text-xs shrink-0" />
                            )}
                            <span>{row.date}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">{row.clockIn}</TableCell>
                        <TableCell className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">{row.clockOut}</TableCell>
                        <TableCell className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">{row.schedule}</TableCell>
                        <TableCell className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">{row.logged}</TableCell>
                        <TableCell className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">{row.paid}</TableCell>
                        <TableCell className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">{row.overtime}</TableCell>
                        <TableCell className="py-5 px-4 text-xs">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.status === "PENDING" ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"}`}>
                            {row.status}
                          </span>
                        </TableCell>
                        <TableCell className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 max-w-[120px] truncate">{row.details?.notes || "-"}</TableCell>
                        <TableCell className="py-5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingRecordIndex(index);
                              setIsEditPaidTimeModalOpen(true);
                            }}
                            className="inline-flex w-8 h-8 items-center justify-center bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                          >
                            <HiOutlinePencilSquare className="text-sm" />
                          </button>
                        </TableCell>
                      </TableRow>

                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <TableRow className="bg-gray-50/20 dark:bg-gray-800/10 border-b border-gray-200 dark:border-gray-800">
                          <TableCell colSpan={10} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Clock In Location</span>
                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                  <HiOutlineMapPin className="text-gray-400 text-sm" />
                                  {row.clockInLoc}
                                </span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Clock Out Location</span>
                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                  <HiOutlineMapPin className="text-gray-400 text-sm" />
                                  {row.clockOutLoc}
                                </span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Device Info</span>
                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{row.details?.device || "Web Browser"}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">IP Address</span>
                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{row.details?.ipAddress || "-"}</span>
                              </div>
                              <div className="flex flex-col gap-1 col-span-1 md:col-span-4">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Shift Notes</span>
                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 leading-normal">{row.details?.notes || "-"}</span>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Footer */}
          <div className="mt-4 pt-6 border-t border-gray-200 dark:border-gray-800">
            <Pagination className="mt-0 w-full" />
          </div>
        </div>

      </Card>


      <ClockOutModal
        isOpen={isClockOutModalOpen}
        onClose={() => setIsClockOutModalOpen(false)}
        onConfirm={handleClockOutConfirm}
        formattedTime={formatTime(seconds)}
      />

      <EditPaidTimeModal
        isOpen={isEditPaidTimeModalOpen}
        onClose={() => {
          setIsEditPaidTimeModalOpen(false);
          setEditingRecordIndex(null);
        }}
        onSave={handleEditPaidTimeSave}
        initialDate={editingRecordIndex !== null ? records[editingRecordIndex].date : ""}
        loggedTime={editingRecordIndex !== null ? records[editingRecordIndex].logged : ""}
        initialPaidTime={editingRecordIndex !== null ? records[editingRecordIndex].paid : ""}
        initialNotes={editingRecordIndex !== null ? (records[editingRecordIndex].details?.notes || "") : ""}
      />
    </div >
  );
}
