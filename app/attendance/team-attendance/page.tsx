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
import { PageHeader } from "@/components/ui/page-header";
import { RowPerPage } from "@/components/ui/row-per-page";
import { Pagination } from "@/components/ui/pagination";
import { useAppSelector } from "@/store/hooks";
import {
  useGetAttendanceRecordsQuery,
  useUpdateAttendanceRecordMutation
} from "@/store/services/attendanceApi";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "sonner";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";

export default function TeamAttendancePage() {
  const user = useAppSelector((state) => state.auth.user);

  // States
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
  
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [recordType, setRecordType] = React.useState("All Record");
  const [location, setLocation] = React.useState("All Location");
  const [status, setStatus] = React.useState("All Status");
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);
  const [editingRecordId, setEditingRecordId] = React.useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(8);

  // Queries & Mutations
  const { data: recordsData, isLoading, error } = useGetAttendanceRecordsQuery(
    {
      companyId: user?.companyId || undefined,
      dateRange,
      recordType,
      location,
      status
    },
    { skip: !user?.companyId }
  );

  const [updateRecord] = useUpdateAttendanceRecordMutation();

  useApiError(!!error, error);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleOutsideClick = () => setActiveMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const rawRecords = recordsData?.attendanceRecords || [];
  const totalRecords = rawRecords.length;

  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const paginatedRecords = rawRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedRecords.map((r) => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await updateRecord({ id, status: "APPROVED" }).unwrap();
      toast.success("Record approved successfully");
      setActiveMenuId(null);
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to approve record");
    }
  };

  const handleEditSave = async (newDate: string, newTime: string, newNotes: string) => {
    if (editingRecordId === null) return;
    try {
      await updateRecord({ id: editingRecordId, paid: newTime, notes: newNotes }).unwrap();
      toast.success("Paid time updated successfully");
      setIsEditModalOpen(false);
      setEditingRecordId(null);
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to update paid time");
    }
  };

  const editingRecord = rawRecords.find(r => r.id === editingRecordId) || null;

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Team Attendance" description="Manage your Team Attendance" />
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
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDatePickerOpen(!isDatePickerOpen);
                }}
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

          {/* Table Container */}
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
                    <th className="py-4 px-4 rounded-l-xl w-12">
                      <Checkbox
                        checked={paginatedRecords.length > 0 && selectedRows.length === paginatedRecords.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                    <th >
                      Employee Name
                    </th>
                    <th >
                      Employee Type
                    </th>
                    <th >
                      Paid Time/ Work Schedule
                    </th>
                    <th >
                      Overtime
                    </th>
                    <th >
                      Status
                    </th>
                    <th >
                      Date
                    </th>
                    <th className="text-right rounded-r-xl">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.map((row) => {
                    const isChecked = selectedRows.includes(row.id);
                    const isMenuOpen = activeMenuId === row.id;
                    const initials = row.user?.name ? row.user.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() : "EE";
                    return (
                      <tr
                        key={row.id}
                        className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-800"
                      >
                        <td className="py-5 px-4">
                          <Checkbox
                            checked={isChecked}
                            onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                          />
                        </td>
                        <td className="py-5 px-4 text-xs font-bold text-gray-900 dark:text-white">
                          <div className="flex items-center gap-3">
                            <Avatar fallback={initials} size="sm" />
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900 dark:text-white">{row.user?.name || "Employee"}</span>
                              <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">{row.user?.email || "-"}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                          Fulltime
                        </td>
                        <td className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                          {row.paid}/{row.schedule}
                        </td>
                        <td className="py-5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                          {row.overtime}
                        </td>
                        <td className="py-5 px-4 text-xs">
                          {row.status === "APPROVED" ? (
                            <Badge variant="success" tinted>
                              APPROVED
                            </Badge>
                          ) : (
                            <Badge variant="warning" tinted>
                              PENDING
                            </Badge>
                          )}
                        </td>
                        <td className="py-5 px-4 text-xs font-semibold text-gray-900 dark:text-white">
                          {row.date}
                        </td>
                        <td className="py-5 px-4 text-right relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(isMenuOpen ? null : row.id);
                            }}
                            className="inline-flex w-8 h-8 items-center justify-center bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                          >
                            <HiOutlineEllipsisVertical className="text-sm" />
                          </button>

                          {/* Action Dropdown Menu */}
                          {isMenuOpen && (
                            <div className="absolute right-4 mt-1 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden text-left">
                              {row.status === "PENDING" && (
                                <button
                                  onClick={() => handleApprove(row.id)}
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                  <HiOutlineCheck className="text-gray-400 text-sm" />
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setEditingRecordId(row.id);
                                  setIsEditModalOpen(true);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border-t border-gray-100 dark:border-gray-800/60 transition-colors"
                              >
                                <HiOutlinePencilSquare className="text-gray-400 text-sm" />
                                Edit Paid Time
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
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

      <EditPaidTimeModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRecordId(null);
        }}
        onSave={handleEditSave}
        initialDate={editingRecord !== null ? editingRecord.date : ""}
        loggedTime={editingRecord !== null ? editingRecord.logged : ""}
        initialPaidTime={editingRecord !== null ? editingRecord.paid : ""}
        initialNotes={editingRecord !== null ? (editingRecord.notes || "") : ""}
      />
    </div>
  );
}
