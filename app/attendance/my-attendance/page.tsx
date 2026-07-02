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
import { Pagination } from "@/components/ui/pagination";
import { PageHeader } from "@/components/ui/page-header";
import { RowPerPage } from "@/components/ui/row-per-page";
import { useAppSelector } from "@/store/hooks";
import {
 useGetAttendanceRecordsQuery,
 useClockInMutation,
 useClockOutMutation,
 useUpdateAttendanceRecordMutation,
 useGetAttendanceSettingsQuery
} from "@/store/services/attendanceApi";
import { toast } from "sonner";
import { useApiError } from "@/hooks/useApiError";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";

export default function MyAttendancePage() {
 const user = useAppSelector((state) => state.auth.user);

 // States
 const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
 const [dateRange, setDateRange] = React.useState(() => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30);
  const formatDate = (date: Date) => {
   const day = String(date.getDate()).padStart(2, '0');
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   const m = months[date.getMonth()];
   const y = date.getFullYear();
   return `${day} ${m} ${y}`;
  };
  return `${formatDate(start)} - ${formatDate(end)}`;
 });

 const [recordType, setRecordType] = React.useState("All Record");
 const [location, setLocation] = React.useState("All Location");
 const [status, setStatus] = React.useState("All Status");
 const [expandedRows, setExpandedRows] = React.useState<string[]>([]);
 const [isClockOutModalOpen, setIsClockOutModalOpen] = React.useState(false);
 const [editingRecordId, setEditingRecordId] = React.useState<string | null>(null);
 const [isEditPaidTimeModalOpen, setIsEditPaidTimeModalOpen] = React.useState(false);

 const [currentPage, setCurrentPage] = React.useState(1);
 const [itemsPerPage, setItemsPerPage] = React.useState(5);

 // Queries & Mutations
 const { data: recordsData, isLoading, error } = useGetAttendanceRecordsQuery(
  {
   userId: user?.id,
   dateRange,
   recordType,
   location,
   status
  },
  { skip: !user?.id }
 );

 const { data: settingsData } = useGetAttendanceSettingsQuery(
  user?.companyId || "",
  { skip: !user?.companyId }
 );
 const settings = settingsData?.attendanceSetting;

 const [clockInMutation, { isLoading: isClockingIn }] = useClockInMutation();
 const [clockOutMutation, { isLoading: isClockingOut }] = useClockOutMutation();
 const [updateRecordMutation] = useUpdateAttendanceRecordMutation();

 useApiError(!!error, error);

 // Sync date range with settings start date on load
 React.useEffect(() => {
  if (settings?.startDate) {
   const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const m = months[date.getMonth()];
    const y = date.getFullYear();
    return `${day} ${m} ${y}`;
   };
   const end = new Date();
   setDateRange(`${settings.startDate} - ${formatDate(end)}`);
  }
 }, [settings?.startDate]);

 // Find active clock-in
 const activeRecord = recordsData?.attendanceRecords?.find(r => r.clockOut === null);
 const isClockedIn = !!activeRecord;

 // Clock timer state
 const [seconds, setSeconds] = React.useState(0);

 React.useEffect(() => {
  if (!activeRecord) {
   setSeconds(0);
   return;
  }

  const clockInTime = new Date(activeRecord.createdAt).getTime();

  const updateTimer = () => {
   const now = new Date().getTime();
   const diffSecs = Math.max(0, Math.floor((now - clockInTime) / 1000));
   setSeconds(diffSecs);
  };

  updateTimer();
  const interval = setInterval(updateTimer, 1000);

  return () => clearInterval(interval);
 }, [activeRecord]);

 const formatTime = (totalSeconds: number) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${hrs.toString().padStart(2, "0")}h ${mins
   .toString()
   .padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
 };

 const toggleRow = (id: string) => {
  if (expandedRows.includes(id)) {
   setExpandedRows(expandedRows.filter((r) => r !== id));
  } else {
   setExpandedRows([...expandedRows, id]);
  }
 };

 const handleClockInOutClick = async () => {
  if (!user) return;
  if (isClockedIn) {
   setIsClockOutModalOpen(true);
  } else {
   try {
    const defaultLoc = settings?.location === "All Offices" ? "Semarang Office" : (settings?.location || "Remote");
    await clockInMutation({
     userId: user.id,
     companyId: user.companyId || undefined,
     clockInLoc: defaultLoc,
     device: "Web Browser (Chrome)",
     ipAddress: "192.168.1.15",
     notes: ""
    }).unwrap();
    toast.success("Clocked in successfully");
   } catch (err: any) {
    toast.error(err?.data?.error || "Failed to clock in");
   }
  }
 };

 const handleClockOutConfirm = async (noteText: string) => {
  if (!activeRecord) return;
  try {
   await clockOutMutation({
    id: activeRecord.id,
    clockOutLoc: "Remote",
    notes: noteText
   }).unwrap();
   setIsClockOutModalOpen(false);
   toast.success("Clocked out successfully");
  } catch (err: any) {
   toast.error(err?.data?.error || "Failed to clock out");
  }
 };

 const handleEditPaidTimeSave = async (newDate: string, newTime: string, newNotes: string) => {
  if (editingRecordId === null) return;
  try {
   await updateRecordMutation({
    id: editingRecordId,
    paid: newTime,
    notes: newNotes,
    status: "PENDING"
   }).unwrap();
   setIsEditPaidTimeModalOpen(false);
   setEditingRecordId(null);
   toast.success("Record updated successfully");
  } catch (err: any) {
   toast.error(err?.data?.error || "Failed to update record");
  }
 };

  // Stats calculations
  const rawRecords = recordsData?.attendanceRecords || [];
  const totalRecords = rawRecords.length;

  let totalLoggedSeconds = 0;
  if (settings?.totalHoursCalculation === "First Check-in & Last Check-out") {
   // Group by date
   const recordsByDate: Record<string, typeof rawRecords> = {};
   for (const r of rawRecords) {
    if (!recordsByDate[r.date]) {
     recordsByDate[r.date] = [];
    }
    recordsByDate[r.date].push(r);
   }

   for (const dayRecords of Object.values(recordsByDate)) {
    let earliestIn: Date | null = null;
    let latestOut: Date | null = null;

    for (const r of dayRecords) {
     const inTime = new Date(r.createdAt);
     if (!earliestIn || inTime < earliestIn) {
      earliestIn = inTime;
     }
     if (r.clockOut) {
      const outTime = new Date(r.updatedAt);
      if (!latestOut || outTime > latestOut) {
       latestOut = outTime;
      }
     }
    }

    if (earliestIn && latestOut) {
     const diffSecs = Math.max(0, Math.floor((latestOut.getTime() - earliestIn.getTime()) / 1000));
     totalLoggedSeconds += diffSecs;
    } else if (earliestIn) {
     const now = new Date().getTime();
     const diffSecs = Math.max(0, Math.floor((now - earliestIn.getTime()) / 1000));
     totalLoggedSeconds += diffSecs;
    }
   }
  } else if (settings?.totalHoursCalculation === "Fixed Working Hours Only") {
   // Cap daily logged time at 8 hours (28800 seconds)
   const recordsByDate: Record<string, typeof rawRecords> = {};
   for (const r of rawRecords) {
    if (!recordsByDate[r.date]) {
     recordsByDate[r.date] = [];
    }
    recordsByDate[r.date].push(r);
   }

   for (const dayRecords of Object.values(recordsByDate)) {
    let dayLoggedSeconds = 0;
    for (const r of dayRecords) {
     const match = r.logged.match(/(\d+)h\s*(\d+)m\s*(\d+)s/);
     if (match) {
      const hrs = parseInt(match[1], 10);
      const mins = parseInt(match[2], 10);
      const secs = parseInt(match[3], 10);
      dayLoggedSeconds += hrs * 3600 + mins * 60 + secs;
     } else {
      const match2 = r.logged.match(/(\d+)h\s*(\d+)m/);
      if (match2) {
       const hrs = parseInt(match2[1], 10);
       const mins = parseInt(match2[2], 10);
       dayLoggedSeconds += hrs * 3600 + mins * 60;
      }
     }
    }
    totalLoggedSeconds += Math.min(dayLoggedSeconds, 28800);
   }
  } else {
   for (const r of rawRecords) {
    const match = r.logged.match(/(\d+)h\s*(\d+)m\s*(\d+)s/);
    if (match) {
     const hrs = parseInt(match[1], 10);
     const mins = parseInt(match[2], 10);
     const secs = parseInt(match[3], 10);
     totalLoggedSeconds += hrs * 3600 + mins * 60 + secs;
    } else {
     const match2 = r.logged.match(/(\d+)h\s*(\d+)m/);
     if (match2) {
      const hrs = parseInt(match2[1], 10);
      const mins = parseInt(match2[2], 10);
      totalLoggedSeconds += hrs * 3600 + mins * 60;
     }
    }
   }
  }

  const formatLoggedHours = (seconds: number) => {
   const hrs = Math.floor(seconds / 3600);
   const mins = Math.floor((seconds % 3600) / 60);
   return `${hrs} Hours ${mins} Mins`;
  };

  const loggedTimeDisplay = formatLoggedHours(totalLoggedSeconds);

  let totalPaidHours = 0;
  if (settings?.totalHoursCalculation === "Fixed Working Hours Only") {
   const recordsByDate: Record<string, typeof rawRecords> = {};
   for (const r of rawRecords) {
    if (!recordsByDate[r.date]) {
     recordsByDate[r.date] = [];
    }
    recordsByDate[r.date].push(r);
   }

   for (const dayRecords of Object.values(recordsByDate)) {
    let dayPaid = 0;
    for (const r of dayRecords) {
     const match = r.paid.match(/(\d+)h/);
     if (match) {
      dayPaid += parseInt(match[1], 10);
     }
    }
    totalPaidHours += Math.min(dayPaid, 8);
   }
  } else {
   for (const r of rawRecords) {
    const match = r.paid.match(/(\d+)h/);
    if (match) {
     totalPaidHours += parseInt(match[1], 10);
    }
   }
  }
  const paidTimeDisplay = `${totalPaidHours} Hours`;

  let totalOvertimeMins = 0;
  if (settings?.totalHoursCalculation !== "Fixed Working Hours Only") {
   for (const r of rawRecords) {
    const match = r.overtime.match(/([+-]?)\s*(\d+)([mh])/);
    if (match) {
     const val = parseInt(match[2], 10);
     const unit = match[3];
     const factor = match[1] === "-" ? -1 : 1;
     const minsVal = unit === "h" ? val * 60 : val;
     totalOvertimeMins += factor * minsVal;
    }
   }
  }

 const formatOvertime = (totalMins: number) => {
  const isNeg = totalMins < 0;
  const absMins = Math.abs(totalMins);
  const hrs = Math.floor(absMins / 60);
  const mins = absMins % 60;
  const sign = isNeg ? "-" : "+";
  return `${sign}${hrs}h ${mins}m`;
 };
 const overtimeDisplay = formatOvertime(totalOvertimeMins);

 const scheduledTimeDisplay = `${totalRecords * 8} Hours`;

 // Pagination & Filtering client side slice
 const totalPages = Math.ceil(totalRecords / itemsPerPage);
 const paginatedRecords = rawRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

 const editingRecord = rawRecords.find(r => r.id === editingRecordId) || null;

 return (
  <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
   {/* Header Section */}
   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <PageHeader title="My Attendance" description="Manage your Attendance" />

    {/* Dynamic Interactive Clock-In Button */}
    <button
     onClick={handleClockInOutClick}
     disabled={isClockingIn || isClockingOut}
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
     { title: "Work Schedule", value: scheduledTimeDisplay, sub: "Scheduled hours" },
     { title: "Logged Time", value: loggedTimeDisplay, sub: "Logged time" },
     { title: "Paid Time", value: paidTimeDisplay, sub: "Paid work hours" },
     { title: "Overtime", value: overtimeDisplay, sub: "Approved overtime" },
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
        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
        className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white min-w-[260px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
       >
        <span>{dateRange || "Select Date Range"}</span>
        <HiOutlineCalendarDays className="text-gray-400 text-lg ml-auto" />
       </button>
       <DatePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onSave={(range) => {
         setDateRange(range);
         setCurrentPage(1);
        }}
       />
      </div>
      <Dropdown
       label={recordType}
       options={["All Record", "Regular Shifts", "Overtime Shifts"]}
       onSelect={(val) => {
        setRecordType(val);
        setCurrentPage(1);
       }}
      />
      <Dropdown
       label={location}
       options={["All Location", "Office (Semarang)", "Remote"]}
       onSelect={(val) => {
        setLocation(val);
        setCurrentPage(1);
       }}
      />
      <Dropdown
       label={status}
       options={["All Status", "On Time", "Late", "Deficit"]}
       onSelect={(val) => {
        setStatus(val);
        setCurrentPage(1);
       }}
      />
      <div className="ml-auto">
       <RowPerPage
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(val) => {
         setItemsPerPage(val);
         setCurrentPage(1);
        }}
       />
      </div>
     </div>

     {/* Collapsible Attendance Table */}
     {isLoading ? (
      <div className="flex justify-center py-8">
       <SVGLoaderFetch text="Loading records..." asTable={false} />
      </div>
     ) : paginatedRecords.length === 0 ? (
      <NoRecordFound asTable={false} />
     ) : (
      <div className="overflow-x-auto">
       <table>
        <thead>
         <tr className="border-none bg-gray-50/50 dark:bg-gray-800/30 rounded-xl">
          <th className="rounded-l-xl">Date</th>
          <th >Clock In</th>
          <th >Clock Out</th>
          <th >Work Schedule</th>
          <th >Logged Time</th>
          <th >Paid Time</th>
          <th >Overtime</th>
          <th >Status</th>
          <th >Note</th>
          <th className="text-right rounded-r-xl">Action</th>
         </tr>
        </thead>
        <tbody>
         {paginatedRecords.map((row) => {
          const isExpanded = expandedRows.includes(row.id);
          return (
           <React.Fragment key={row.id}>
            <tr
             onClick={() => toggleRow(row.id)}
             className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-800 cursor-pointer"
            >
             <td className="py-5 px-4 text-xs font-bold text-gray-900 dark:text-white">
              <div className="flex items-center gap-2">
               {isExpanded ? (
                <HiOutlineChevronUp className="text-gray-400 text-xs shrink-0" />
               ) : (
                <HiOutlineChevronDown className="text-gray-400 text-xs shrink-0" />
               )}
               <span>{row.date}</span>
              </div>
             </td>
             <td>{row.clockIn}</td>
             <td>{row.clockOut || "-"}</td>
             <td>{row.schedule}</td>
             <td>{row.logged}</td>
             <td>{row.paid}</td>
             <td>{row.overtime}</td>
             <td className="py-5 px-4 text-xs">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.status === "PENDING" ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"}`}>
               {row.status}
              </span>
             </td>
             <td className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 max-w-[120px] truncate">{row.notes || "-"}</td>
             <td className="py-5 px-4 text-right">
              <button
               onClick={(e) => {
                e.stopPropagation();
                setEditingRecordId(row.id);
                setIsEditPaidTimeModalOpen(true);
               }}
               className="inline-flex w-8 h-8 items-center justify-center bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
               <HiOutlinePencilSquare className="text-sm" />
              </button>
             </td>
            </tr>

            {/* Expanded Details Row */}
            {isExpanded && (
             <tr className="bg-gray-50/20 dark:bg-gray-800/10 border-b border-gray-200 dark:border-gray-800">
              <td colSpan={10} className="p-6">
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
                  {row.clockOutLoc || "-"}
                 </span>
                </div>
                <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Device Info</span>
                 <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{row.device || "Web Browser"}</span>
                </div>
                <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">IP Address</span>
                 <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{row.ipAddress || "-"}</span>
                </div>
                <div className="flex flex-col gap-1 col-span-1 md:col-span-4">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Shift Notes</span>
                 <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 leading-normal">{row.notes || "-"}</span>
                </div>
               </div>
              </td>
             </tr>
            )}
           </React.Fragment>
          );
         })}
        </tbody>
       </table>
      </div>
     )}

     {/* Pagination Footer */}
     {!isLoading && totalPages > 1 && (
      <div className="mt-4 pt-6 border-t border-gray-200 dark:border-gray-800">
       <Pagination
        className="mt-0 w-full"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
       />
      </div>
     )}
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
     setEditingRecordId(null);
    }}
    onSave={handleEditPaidTimeSave}
    initialDate={editingRecord !== null ? editingRecord.date : ""}
    loggedTime={editingRecord !== null ? editingRecord.logged : ""}
    initialPaidTime={editingRecord !== null ? editingRecord.paid : ""}
    initialNotes={editingRecord !== null ? (editingRecord.notes || "") : ""}
   />
  </div >
 );
}
