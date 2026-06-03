"use client";

import * as React from "react";
import {
 HiOutlineMagnifyingGlass,
 HiOutlineArrowDownTray,
 HiOutlineCalendarDays,
 HiOutlineDocumentText,
 HiOutlineChevronDown,
 HiOutlineChevronLeft,
 HiOutlineChevronRight
} from "react-icons/hi2";
import { Pagination } from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { RowPerPage } from "@/components/ui/row-per-page";
import { PageHeader } from "@/components/ui/page-header";
import { useAppSelector } from "@/store/hooks";
import { useGetTimeOffRequestsQuery, useUpdateTimeOffRequestMutation, useGetTimeOffPoliciesQuery } from "@/store/services/timeOffApi";
import { toast } from "sonner";
import { useApiError } from "@/hooks/useApiError";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";

export default function EmployeeTimeOffPage() {
 const user = useAppSelector((state) => state.auth.user);
 const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
 const [dateRange, setDateRange] = React.useState("All Dates");
 const [search, setSearch] = React.useState("");
 const [selectedType, setSelectedType] = React.useState("All Type");
 const [selectedStatus, setSelectedStatus] = React.useState("All Status");

 const [page, setPage] = React.useState(1);
 const [limit, setLimit] = React.useState(10);

 const { data: requestsData, isLoading: isLoadingRequests, error: requestsError } = useGetTimeOffRequestsQuery(
  { companyId: user?.companyId },
  { skip: !user?.companyId }
 );

 const { data: policiesData, error: policiesError } = useGetTimeOffPoliciesQuery(
  user?.companyId || "",
  { skip: !user?.companyId }
 );

 const [updateRequest, { error: updateError }] = useUpdateTimeOffRequestMutation();

 useApiError(!!requestsError, requestsError, "Failed to load requests");
 useApiError(!!policiesError, policiesError, "Failed to load time off policies");
 useApiError(!!updateError, updateError, "Failed to update request status");

 const handleStatusUpdate = async (id: string, status: string) => {
  try {
   await updateRequest({ id, status }).unwrap();
   toast.success(`Request ${status.toLowerCase()} successfully`);
  } catch (err) {
   // Handled by useApiError
  }
 };

 const requests = requestsData?.timeOffRequests || [];

 const filteredRequests = requests.filter(req => {
  if (search && !req.user?.name.toLowerCase().includes(search.toLowerCase())) {
   return false;
  }
  if (selectedType !== "All Type" && req.policy.name !== selectedType) {
   return false;
  }
  if (selectedStatus !== "All Status" && req.status !== selectedStatus) {
   return false;
  }
  if (dateRange !== "All Dates" && dateRange !== "Select Date Range" && dateRange.includes(" - ")) {
   const [startStr, endStr] = dateRange.split(" - ");
   const filterStart = new Date(startStr);
   filterStart.setHours(0, 0, 0, 0);
   const filterEnd = new Date(endStr);
   filterEnd.setHours(23, 59, 59, 999);

   const reqStart = new Date(req.startDate);
   const reqEnd = new Date(req.endDate);

   return reqStart <= filterEnd && reqEnd >= filterStart;
  }
  return true;
 });

 const totalPages = Math.ceil(filteredRequests.length / limit);
 const paginatedRequests = filteredRequests.slice((page - 1) * limit, page * limit);

 return (
  <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
   {/* Header Section */}
   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <PageHeader title="Employee Time Off" />
    <div className="flex items-center gap-3">
     <Input
      placeholder="Search employee"
      leftIcon={<HiOutlineMagnifyingGlass />}
      className="w-64 h-11 bg-white dark:bg-gray-900"
      containerClassName="w-auto"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
     />
     <Button
      variant="primary"
      className="h-11 px-6 bg-[#11131A] dark:bg-white dark:text-gray-900"
      leftIcon={<HiOutlineArrowDownTray className="text-lg" />}
     >
      Download CSV
     </Button>
    </div>
   </div>

   <Card className="p-4 md:p-8">
    {/* Filters Row */}
    <div className="flex flex-wrap items-center gap-4 mb-8">
     <div className="relative">
      <button
       onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
       className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white min-w-[280px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
      label={selectedType}
      options={["All Type", ...(policiesData?.timeOffPolicies.map(p => p.name) || [])]}
      onSelect={setSelectedType}
     />
     <Dropdown
      label={selectedStatus}
      options={["All Status", "APPROVED", "PENDING", "REJECTED"]}
      onSelect={setSelectedStatus}
     />
     {(selectedType !== "All Type" || selectedStatus !== "All Status" || dateRange !== "All Dates" || search !== "") && (
      <button
       onClick={() => {
        setSelectedType("All Type");
        setSelectedStatus("All Status");
        setDateRange("All Dates");
        setSearch("");
       }}
       className="text-xs font-bold text-red-500 hover:underline"
      >
       Reset Filters
      </button>
     )}
     <div className="ml-auto">
      <RowPerPage itemsPerPage={limit} onItemsPerPageChange={(v) => { setLimit(v); setPage(1); }} />
     </div>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
     <table>
      <thead>
       <tr >
        <th className="w-[50px] py-4 px-4">
         <Checkbox />
        </th>
        <th>Employee Name</th>
        <th>From</th>
        <th>To</th>
        <th>Total</th>
        <th>Type</th>
        <th>Attachment</th>
        <th className="text-center">Status</th>
        <th className="text-right">Actions</th>
       </tr>
      </thead>
      <tbody>
       {isLoadingRequests ? (
        <SVGLoaderFetch colSpan={9} text="Loading requests..." />
       ) : filteredRequests.length === 0 ? (
        <NoRecordFound colSpan={9} text="No requests found." />
       ) : paginatedRequests.map((req, index) => (
        <tr key={index} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors ">
         <td className="py-4 px-4">
          <Checkbox />
         </td>
         <td className="py-4 px-4">
          <div className="flex items-center gap-3">
           <Avatar src={req.user?.avatar} size="sm" />
           <div>
            <p className="text-xs font-bold text-gray-900 dark:text-white">{req.user?.name || "User"}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">{req.user?.email || "-"}</p>
           </div>
          </div>
         </td>
         <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">
          {new Date(req.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
         </td>
         <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">
          {new Date(req.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
         </td>
         <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">{req.totalDays} Days</td>
         <td className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">{req.policy.name}</td>
         <td className="py-4 px-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
           {req.attachment || "-"}
           {req.attachment && <HiOutlineDocumentText className="text-gray-300 text-lg" />}
          </div>
         </td>
         <td className="py-4 px-4 text-center">
          <Badge
           variant={req.status === "APPROVED" ? "success" : req.status === "PENDING" ? "warning" : "error"}
           tinted
           className="text-[9px] uppercase tracking-wider px-2 py-0.5"
          >
           {req.status}
          </Badge>
         </td>
         <td className="py-4 px-4 text-right">
          {req.status === "PENDING" && (
           <div className="flex items-center justify-end gap-2">
            <Button
             variant="outline"
             className="h-8 px-3 text-[10px]"
             onClick={() => handleStatusUpdate(req.id, "REJECTED")}
            >
             Reject
            </Button>
            <Button
             variant="primary"
             className="h-8 px-3 text-[10px]"
             onClick={() => handleStatusUpdate(req.id, "APPROVED")}
            >
             Approve
            </Button>
           </div>
          )}
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>

    {/* Footer / Pagination */}
    {totalPages > 1 && (
     <div className="mt-8 pt-8 border-t border-gray-50 dark:border-gray-800">
      <Pagination
       currentPage={page}
       totalPages={totalPages}
       onPageChange={setPage}
       className="mt-0 w-full"
      />
     </div>
    )}
   </Card>
  </div>
 );
}
