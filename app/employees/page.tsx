"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
 HiOutlineMagnifyingGlass,
 HiOutlineAdjustmentsHorizontal,
 HiOutlineArrowDownTray,
 HiOutlinePlus,
 HiOutlineEye,
 HiOutlinePencilSquare,
 HiOutlineChevronDown,
 HiOutlineXMark,
 HiOutlineCalendarDays,
 HiOutlineEllipsisVertical,
 HiOutlineTrash
} from "react-icons/hi2";
import { Dropdown } from "@/components/ui/dropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";


import { Pagination } from "@/components/ui/pagination";
import { TableActions } from "@/components/ui/table-actions";
import { ProfileDrawer } from "@/components/ui/drawer";
import { DeleteModal } from "@/components/ui/modal/delete-modal";
import { PageHeader } from "@/components/ui/page-header";
import { Employee, useGetEmployeesQuery, useDeleteEmployeeMutation } from "@/store/services/employeesApi";
import { useGetOfficesQuery } from "@/store/services/officeApi";
import { useGetJobTitlesQuery } from "@/store/services/jobTitleApi";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";
import { useApiError } from "@/hooks/useApiError";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { toast } from "sonner";
import { RowPerPage } from "@/components/ui/row-per-page";

export default function EmployeesPage() {
 const router = useRouter();
 const currentUser = useAppSelector(selectCurrentUser);
 const companyId = currentUser?.companyId ?? "";
 const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
 const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
 const [deleteId, setDeleteId] = useState<string | null>(null);

 // Filter, Search, and Pagination States
 const [search, setSearch] = useState("");
 const [office, setOffice] = useState("All Offices");
 const [role, setRole] = useState("All Job Titles");
 const [status, setStatus] = useState("All Status");
 const [page, setPage] = useState(1);
 const [limit, setLimit] = useState(10);

 // Reset page to 1 when filters change
 React.useEffect(() => {
  setPage(1);
 }, [search, office, role, status, limit]);

 // Fetch employees from PostgreSQL backend using RTK Query hook
 const { data, isLoading, error } = useGetEmployeesQuery({
  search,
  office,
  role,
  status,
  page,
  limit,
  companyId,
 });

 const { data: officeData } = useGetOfficesQuery({ companyId });
 const officeOptions = React.useMemo(() => {
  const names = (officeData?.offices || []).map(o => o.name);
  return ["All Offices", ...names];
 }, [officeData]);

 const { data: jobTitleData } = useGetJobTitlesQuery({ companyId });
 const jobTitleOptions = React.useMemo(() => {
  const titles = (jobTitleData?.jobTitles || []).map(j => j.title);
  return ["All Job Titles", ...titles];
 }, [jobTitleData]);

 const [deleteEmployee, { error: deleteError, isLoading: isDeleting }] = useDeleteEmployeeMutation();

 useApiError(!!error, error, "Failed to load employees");
 useApiError(!!deleteError, deleteError, "Failed to delete employee");

 const employees = data?.employees || [];
 const pagination = data?.pagination;

 // Close menus when clicking outside
 React.useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
   if (!(event.target as Element).closest('.action-menu-container')) {
    setActiveMenuIndex(null);
   }
  }
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const handleAddClick = () => {
  setEditingEmployee(null);
  setIsDrawerOpen(true);
 };

 const handleEditClick = (employee: Employee) => {
  setEditingEmployee(employee);
  setIsDrawerOpen(true);
 };

 return (
  <div className="flex flex-col gap-8 p-2 md:p-2 md:p-8 relative min-h-full">
   {/* Header Section */}
   <div className="flex items-center justify-between">
    <PageHeader title="Employees" description="Manage your Employee" />
    <div className="flex items-center gap-3">
     <Button
      variant="outline"
      size="md"
      leftIcon={<HiOutlineArrowDownTray />}
      className="px-6"
     >
      Download
     </Button>
     <Button
      variant="primary"
      size="md"
      leftIcon={<HiOutlinePlus />}
      onClick={handleAddClick}
      className="px-6"
     >
      Add New
     </Button>
    </div>
   </div>

   {/* Filters Section */}
   <Card className="p-6">
    <div className="flex flex-col gap-6">
     <div className="flex flex-wrap items-center gap-4">
      <Input
       placeholder="Search employee"
       leftIcon={<HiOutlineMagnifyingGlass />}
       className="w-full h-12 bg-gray-50/30 dark:bg-gray-800/50"
       containerClassName="flex-1 min-w-[200px]"
       value={search}
       onChange={(e) => setSearch(e.target.value)}
      />
      <Dropdown
       label={office}
       options={officeOptions}
       onSelect={(opt) => setOffice(opt)}
      />
      <Dropdown
       label={role}
       options={jobTitleOptions}
       onSelect={(opt) => setRole(opt)}
      />
      <Dropdown
       label={status}
       options={["All Status", "Active", "Onboarding", "Probation", "On Leave"]}
       onSelect={(opt) => setStatus(opt)}
      />
      <div className="ml-auto flex items-center">
       <RowPerPage itemsPerPage={limit} onItemsPerPageChange={(v) => { setLimit(v); setPage(1); }} />
      </div>
     </div>

     {/* Table */}
     <div className="admin-table-container">
      <table>
       <thead>
        <tr>
         <th>
          <Checkbox />
         </th>
         <th>Employee Name</th>
         <th>Job Title</th>
         <th>Line Manager</th>
         <th>Department</th>
         <th>Office</th>
         <th>Employee Status</th>
         <th>Account</th>
         <th className="text-right">
          Actions
         </th>
        </tr>
       </thead>
       <tbody>
        {isLoading ? (
         <SVGLoaderFetch colSpan={9} text="Loading employees..." />
        ) : employees.length === 0 ? (
         <NoRecordFound colSpan={9} text="No employees found." />
        ) : (
         employees.map((emp, index) => {
          const isMenuOpen = activeMenuIndex === index;
          return (
           <tr key={emp.email} className="group">
            <td>
             <Checkbox />
            </td>
            <td>
             <div className="flex items-center gap-3">
              <Avatar src={emp.avatar} fallback={emp.name.split(" ").map(n => n[0]).join("")} size="sm" />
              <div>
               <p className="text-xs font-bold text-gray-900 dark:text-white">{emp.name}</p>
               <p className="text-[10px] text-gray-400 dark:text-gray-500">{emp.email}</p>
              </div>
             </div>
            </td>
            <td>{emp.role}</td>
            <td>{emp.manager}</td>
            <td>{emp.department}</td>
            <td>{emp.office}</td>
            <td>
             <div className="flex items-center gap-1">
              <Badge
               variant={emp.status === "ACTIVE" ? "success" : emp.status === "ON BOARDING" ? "secondary" : emp.status === "PROBATION" ? "primary" : "error"}
               tinted
               className="text-[9px] uppercase tracking-wider"
              >
               {emp.status}
              </Badge>
              <HiOutlineChevronDown className="text-gray-300 dark:text-gray-600 text-xs" />
             </div>
            </td>
            <td>{emp.account}</td>
            <td className="text-right">
             <div className="relative inline-block text-left action-menu-container">
              <button
               ref={(el) => {
                if (el && isMenuOpen) {
                 const rect = el.getBoundingClientRect();
                 const menuEl = el.parentElement?.querySelector('[data-action-menu]') as HTMLElement;
                 if (menuEl) {
                  menuEl.style.position = 'fixed';
                  menuEl.style.left = `${rect.right - menuEl.offsetWidth}px`;
                  if (index < 5) {
                   // First 5 rows: open downward
                   menuEl.style.top = `${rect.bottom + 4}px`;
                  } else {
                   // Remaining rows: open upward
                   menuEl.style.top = `${rect.top - menuEl.offsetHeight - 4}px`;
                  }
                 }
                }
               }}
               onClick={(e) => {
                e.stopPropagation();
                setActiveMenuIndex(isMenuOpen ? null : index);
               }}
               className="inline-flex w-8 h-8 items-center justify-center bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
               <HiOutlineEllipsisVertical className="text-sm" />
              </button>

              {isMenuOpen && (
               <div data-action-menu className="fixed w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-[9999] overflow-hidden text-left">
                <button
                 onClick={() => {
                  router.push(`/employees/${emp.id}`);
                  setActiveMenuIndex(null);
                 }}
                 className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                 <HiOutlineEye className="text-gray-400 text-sm" />
                 View
                </button>
                <button
                 onClick={() => {
                  handleEditClick(emp);
                  setActiveMenuIndex(null);
                 }}
                 className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-350 hover:bg-gray-50 dark:hover:bg-gray-800 border-t border-gray-100 dark:border-gray-800/60 transition-colors"
                >
                 <HiOutlinePencilSquare className="text-gray-400 text-sm" />
                 Edit
                </button>
                <button
                 onClick={() => {
                  setDeleteId(emp.id);
                  setActiveMenuIndex(null);
                 }}
                 className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-t border-gray-100 dark:border-gray-800/60 transition-colors"
                >
                 <HiOutlineTrash className="text-red-500 text-sm" />
                 Delete
                </button>
               </div>
              )}
             </div>
            </td>
           </tr>
          );
         })
        )}
       </tbody>
      </table>
     </div>

     {/* Pagination */}
     {pagination && pagination.pages > 1 && (
      <Pagination
       currentPage={page}
       totalPages={pagination.pages}
       onPageChange={setPage}
      />
     )}
    </div>
   </Card>

   <ProfileDrawer
    isOpen={isDrawerOpen}
    onClose={() => setIsDrawerOpen(false)}
    employee={editingEmployee}
   />

   <DeleteModal
    isOpen={!!deleteId}
    onClose={() => setDeleteId(null)}
    onConfirm={async () => {
     if (deleteId) {
      try {
       await deleteEmployee(deleteId).unwrap();
       toast.success("Employee deleted successfully!");
      } catch (err) {
       // Handled by useApiError
      }
      setDeleteId(null);
     }
    }}
    itemName={employees.find(e => e.id === deleteId)?.name}
    isLoading={isDeleting}
    description="Deleting this employee will permanently remove their profile and all associated records. This action cannot be undone."
   />
  </div>
 );
}
