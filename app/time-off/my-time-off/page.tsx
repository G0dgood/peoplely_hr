"use client";

import * as React from "react";
import {
 HiOutlinePlus,
 HiOutlineCalendarDays,
 HiOutlineInformationCircle,
 HiOutlineChevronLeft,
 HiOutlineChevronRight,
 HiOutlineArrowPath,
 HiOutlineDocumentText,
 HiOutlineEye,
 HiOutlinePencilSquare,
 HiOutlineTrash,
 HiOutlineChevronDown
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { TableActions } from "@/components/ui/table-actions";
import { ViewToggle } from "@/components/ui/view-toggle";
import { Pagination } from "@/components/ui/pagination";
import { TimeOffDrawer, AddTimeOffDrawer } from "@/components/ui/drawer";
import { DeleteModal } from "@/components/ui/modal/delete-modal";
import { DatePicker } from "@/components/ui/date-picker";
import { useAppSelector } from "@/store/hooks";
import {
 useGetTimeOffRequestsQuery,
 useGetTimeOffBalancesQuery,
 useGetTimeOffPoliciesQuery,
 useDeleteTimeOffRequestMutation
} from "@/store/services/timeOffApi";
import { toast } from "sonner";
import { useApiError } from "@/hooks/useApiError";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";
import { RowPerPage } from "@/components/ui/row-per-page";

export default function MyTimeOffPage() {
 const user = useAppSelector((state) => state.auth.user);

 // Queries & Mutations
 const { data: requestsData, isLoading: isLoadingRequests, error: requestsError } = useGetTimeOffRequestsQuery(
  { userId: user?.id },
  { skip: !user?.id }
 );

 const { data: balancesData, isLoading: isLoadingBalances, error: balancesError } = useGetTimeOffBalancesQuery(
  { userId: user?.id || "" },
  { skip: !user?.id }
 );

 const { data: policiesData, error: policiesError } = useGetTimeOffPoliciesQuery(
  user?.companyId || "",
  { skip: !user?.companyId }
 );

 const [deleteRequest, { isLoading: isDeleting, error: deleteError }] = useDeleteTimeOffRequestMutation();

 useApiError(!!requestsError, requestsError, "Failed to load time off requests");
 useApiError(!!balancesError, balancesError, "Failed to load time off balances");
 useApiError(!!policiesError, policiesError, "Failed to load time off policies");
 useApiError(!!deleteError, deleteError, "Failed to cancel request");

 const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 const [isAddDrawerOpen, setIsAddDrawerOpen] = React.useState(false);
 const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
 const [requestToDelete, setRequestToDelete] = React.useState<string | null>(null);
 const [selectedRequest, setSelectedRequest] = React.useState<any | null>(null);

 // Filters State
 const [selectedPolicyType, setSelectedPolicyType] = React.useState("All Type");
 const [selectedStatus, setSelectedStatus] = React.useState("All Status");
 const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
 const [dateRange, setDateRange] = React.useState("All Dates");

 const [page, setPage] = React.useState(1);
 const [limit, setLimit] = React.useState(10);

 const handleViewClick = (req: any) => {
  setSelectedRequest(req);
  setIsDrawerOpen(true);
 };

 const handleDeleteClick = (id: string) => {
  setRequestToDelete(id);
  setIsDeleteModalOpen(true);
 };

 const confirmDelete = async () => {
  if (requestToDelete !== null) {
   try {
    await deleteRequest(requestToDelete).unwrap();
    toast.success("Time off request cancelled and deleted successfully");
   } catch (err) {
    toast.error("Failed to cancel request");
   }
   setIsDeleteModalOpen(false);
   setRequestToDelete(null);
  }
 };

 const handleAddNewClick = () => {
  setIsAddDrawerOpen(true);
 };

 const requests = requestsData?.timeOffRequests || [];
 const balances = balancesData?.timeOffBalances || [];

 // Filter requests
 const filteredRequests = requests.filter(req => {
  if (selectedPolicyType !== "All Type" && req.policy.name !== selectedPolicyType) {
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
   {/* Leave Summary Row */}
   <div className="relative group">
    <div className="flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar">
     {balances.map((item, index) => (
      <Card key={index} className="min-w-[240px] p-6 flex flex-col gap-4">
       <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900 dark:text-white">{item.policy.name}</span>
        <HiOutlineInformationCircle className="text-gray-400 text-lg" />
       </div>
       <span className="text-xs font-bold text-gray-450">{item.balance} Days</span>
      </Card>
     ))}
     {balances.length === 0 && !isLoadingBalances && (
      <div className="text-xs font-bold text-gray-400 p-4">No balances found.</div>
     )}
    </div>
    <button className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 shadow-sm z-10">
     <HiOutlineChevronLeft />
    </button>
    <button className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 shadow-sm z-10">
     <HiOutlineChevronRight />
    </button>
   </div>

   {/* Request Time List Section */}
   <Card className="p-4 md:p-8">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
     <h3 className="text-xl font-bold text-gray-900 dark:text-white">Request Time List</h3>
     <div className="flex items-center gap-3">
      <Button variant="outline" className="h-10 px-4 bg-white dark:bg-gray-900" leftIcon={<HiOutlineArrowPath className="text-lg" />}>
       Sync With Google
      </Button>
      <Button
       variant="primary"
       className="h-10 px-4"
       leftIcon={<HiOutlinePlus className="text-lg" />}
       onClick={handleAddNewClick}
      >
       Add New Request
      </Button>
     </div>
    </div>

    <div className="flex flex-wrap items-center gap-4 mb-6">
     <div className="relative">
      <button
       onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
       className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
       <span>{dateRange}</span>
       <HiOutlineCalendarDays className="text-gray-400 text-lg ml-auto" />
      </button>
      <DatePicker
       isOpen={isDatePickerOpen}
       onClose={() => setIsDatePickerOpen(false)}
       onSave={(range) => {
        setDateRange(range);
        setIsDatePickerOpen(false);
       }}
      />
     </div>
     <Dropdown
      label={selectedPolicyType}
      options={["All Type", ...(policiesData?.timeOffPolicies.map(p => p.name) || [])]}
      onSelect={setSelectedPolicyType}
     />
     <Dropdown
      label={selectedStatus}
      options={["All Status", "APPROVED", "PENDING", "REJECTED"]}
      onSelect={setSelectedStatus}
     />
     {(selectedPolicyType !== "All Type" || selectedStatus !== "All Status" || dateRange !== "All Dates") && (
      <button
       onClick={() => {
        setSelectedPolicyType("All Type");
        setSelectedStatus("All Status");
        setDateRange("All Dates");
       }}
       className="text-xs font-bold text-red-500 hover:underline"
      >
       Reset Filters
      </button>
     )}
    </div>

    <div className="overflow-x-auto">
     <table>
      <thead>
       <tr >
        <th>From</th>
        <th>To</th>
        <th>Total</th>
        <th>Type</th>
        <th>Attachment</th>
        <th className="text-center">Status</th>
        <th className="text-right">Action</th>
       </tr>
      </thead>
      <tbody>
       {isLoadingRequests ? (
        <SVGLoaderFetch colSpan={7} text="Loading requests..." />
       ) : filteredRequests.length === 0 ? (
        <NoRecordFound colSpan={7} text="No requests found." />
       ) : paginatedRequests.map((req) => (
        <tr key={req.id} >
         <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">
          {new Date(req.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
         </td>
         <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">
          {new Date(req.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
         </td>
         <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">{req.totalDays} Days</td>
         <td className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">{req.policy?.name || "-"}</td>
         <td className="py-4 px-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
           {req.attachment || "No file"}
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
          <TableActions
           className="justify-end"
           onView={() => handleViewClick(req)}
           onEdit={() => handleViewClick(req)}
           onDelete={req.status === "PENDING" ? () => handleDeleteClick(req.id) : undefined}
          />
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>

    <div className="mt-8 flex items-center justify-between">
     <RowPerPage itemsPerPage={limit} onItemsPerPageChange={(v) => { setLimit(v); setPage(1); }} />
     {totalPages > 1 && (
      <Pagination
       currentPage={page}
       totalPages={totalPages}
       onPageChange={setPage}
       className="mt-0"
      />
     )}
    </div>
   </Card>

   {/* Balance History Section */}
   <Card className="p-4 md:p-8">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
     <h3 className="text-xl font-bold text-gray-900 dark:text-white">Balance History</h3>
     <div className="flex items-center gap-4">
      <Dropdown label="All Type" options={["All Type", ...(policiesData?.timeOffPolicies.map(p => p.name) || [])]} />
     </div>
    </div>

    <div className="overflow-x-auto">
     <table>
      <thead>
       <tr >
        <th >Date</th>
        <th >Event</th>
        <th >Type</th>
        <th >Changed By</th>
        <th className="text-right">Change (Days)</th>
       </tr>
      </thead>
      <tbody>
       {requests.filter(r => r.status === "APPROVED").map((req) => (
        <tr key={req.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
         <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">
          {new Date(req.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
         </td>
         <td className="py-4 px-4 text-xs font-bold text-gray-550 dark:text-gray-400">Take Time Off</td>
         <td className="py-4 px-4 text-xs font-bold text-gray-550 dark:text-gray-400">{req.policy?.name || "-"}</td>
         <td className="py-4 px-4">
          <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
            {user?.name ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "U"}
           </div>
           <span className="text-xs font-bold text-gray-900 dark:text-white">{user?.name}</span>
          </div>
         </td>
         <td className="py-4 px-4 text-xs font-bold text-red-500 text-right">-{req.totalDays} Days</td>
        </tr>
       ))}
       {requests.filter(r => r.status === "APPROVED").length === 0 && (
        <tr>
         <td colSpan={5} className="text-center py-8 text-xs font-bold text-gray-400">No balance changes recorded.</td>
        </tr>
       )}
      </tbody>
     </table>
    </div>
   </Card>

   <TimeOffDrawer
    isOpen={isDrawerOpen}
    onClose={() => setIsDrawerOpen(false)}
    request={selectedRequest}
    onCancelRequest={(id) => {
     setIsDrawerOpen(false);
     handleDeleteClick(id);
    }}
    isCancelling={isDeleting}
   />

   <AddTimeOffDrawer
    isOpen={isAddDrawerOpen}
    onClose={() => setIsAddDrawerOpen(false)}
   />

   <DeleteModal
    isOpen={isDeleteModalOpen}
    onClose={() => { setIsDeleteModalOpen(false); setRequestToDelete(null); }}
    onConfirm={confirmDelete}
    itemName="Time Off Request"
   />
  </div>
 );
}
