"use client";

import * as React from "react";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import {
 useGetDepartmentsQuery,
 useCreateDepartmentMutation,
 useUpdateDepartmentMutation,
 useDeleteDepartmentMutation,
 Department
} from "@/store/services/departmentApi";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { CreateDepartmentModal } from "@/components/ui/modal/create-department-modal";
import { DeleteModal } from "@/components/ui/modal/delete-modal";
import {
 HiPlus,
 HiOutlineMagnifyingGlass,
 HiOutlineTrash,
 HiOutlineUsers,
 HiOutlineGlobeAlt,
 HiOutlineBuildingOffice2,
 HiOutlinePencilSquare
} from "react-icons/hi2";
import { toast } from "sonner";
import { Pagination } from "@/components/ui/pagination";
import { RowPerPage } from "@/components/ui/row-per-page";
import { useApiError } from "@/hooks/useApiError";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";
import { TableActions } from "@/components/ui/table-actions";


interface DepartmentData {
 id: string;
 name: string;
 parentDept: string;
 description: string;
 leader: string;
}



export default function DepartmentPage() {
 const currentUser = useAppSelector(selectCurrentUser);
 const companyId = currentUser?.companyId ?? "";

 const { data: empData, isLoading: isEmployeesLoading, error: employeesError } = useGetEmployeesQuery({ companyId });
 const employees = empData?.employees || [];

 const { data: deptData, isLoading: isDepartmentsLoading, error: departmentsError } = useGetDepartmentsQuery({ companyId });
 const departments = deptData?.departments || [];

 const [createDepartment, { error: createError, isLoading: isCreating }] = useCreateDepartmentMutation();
 const [updateDepartment, { error: updateError, isLoading: isUpdating }] = useUpdateDepartmentMutation();
 const [deleteDepartment, { error: deleteError, isLoading: isDeleting }] = useDeleteDepartmentMutation();

 const [search, setSearch] = React.useState("");
 const [isCreateOpen, setIsCreateOpen] = React.useState(false);
 const [editingDept, setEditingDept] = React.useState<Department | null>(null);
 const [deleteId, setDeleteId] = React.useState<string | null>(null);
 const [page, setPage] = React.useState(1);
 const [limit, setLimit] = React.useState(10);

 const isLoading = isEmployeesLoading || isDepartmentsLoading;

 // Set up API error listeners
 useApiError(!!employeesError, employeesError, "Failed to load employees");
 useApiError(!!departmentsError, departmentsError, "Failed to load departments");
 useApiError(!!createError, createError, "Failed to create department");
 useApiError(!!updateError, updateError, "Failed to update department");
 useApiError(!!deleteError, deleteError, "Failed to delete department");

 // Reset page when search or limit changes
 React.useEffect(() => {
  setPage(1);
 }, [search, limit]);

 // Compute members in each department
 const getDeptEmployees = (deptName: string) => {
  return employees.filter(e => e.department.toLowerCase() === deptName.toLowerCase());
 };

 // Find department with most members
 const getLargestDepartment = () => {
  if (departments.length === 0) return "None";
  let maxCount = -1;
  let largestName = "None";

  departments.forEach(d => {
   const count = getDeptEmployees(d.name).length;
   if (count > maxCount) {
    maxCount = count;
    largestName = d.name;
   }
  });

  return maxCount > 0 ? `${largestName} (${maxCount})` : "None";
 };

 const handleSaveDepartment = async (formData: { department: string; parentDept: string; description: string }) => {
  try {
   if (editingDept) {
    await updateDepartment({
     id: editingDept.id,
     body: {
      name: formData.department.trim(),
      parentDept: formData.parentDept,
      description: formData.description,
      leader: formData.parentDept !== "None" ? formData.parentDept : "Management",
     }
    }).unwrap();
    toast.success(`Department "${formData.department}" updated successfully!`);
   } else {
    await createDepartment({
     name: formData.department.trim(),
     parentDept: formData.parentDept,
     description: formData.description,
     leader: formData.parentDept !== "None" ? formData.parentDept : "Management",
     companyId,
    }).unwrap();
    toast.success(`Department "${formData.department}" created successfully!`);
   }
   setIsCreateOpen(false);
  } catch (err) {
   // Handled by useApiError
  } finally {
   setEditingDept(null);
  }
 };

 const handleDeleteConfirm = async () => {
  if (deleteId) {
   try {
    await deleteDepartment(deleteId).unwrap();
    toast.success("Department deleted successfully.");
   } catch (err) {
    // Handled by useApiError
   }
   setDeleteId(null);
  }
 };


 const filteredDepts = departments.filter((d) =>
  d.name.toLowerCase().includes(search.toLowerCase()) ||
  d.parentDept.toLowerCase().includes(search.toLowerCase()) ||
  d.description.toLowerCase().includes(search.toLowerCase())
 );

 const totalPages = Math.ceil(filteredDepts.length / limit);
 const paginatedDepts = filteredDepts.slice((page - 1) * limit, page * limit);

 const selectedDeleteDept = departments.find(d => d.id === deleteId);

 return (
  <div className="flex flex-col gap-8 p-2 md:p-8 relative min-h-full bg-[#FAFCFF] dark:bg-gray-950">
   {/* Header */}
   <div className="flex items-center justify-between">
    <PageHeader
     title="Departments"
     description="Manage and organize your company departments, assign hierarchies, and view members."
    />
    <Button
     variant="primary"
     size="md"
     leftIcon={<HiPlus />}
     onClick={() => setIsCreateOpen(true)}
     className="px-6"
    >
     Add Department
    </Button>
   </div>

   {/* Summary Metrics Section */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card className="p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
     <div className="w-12 h-12 rounded-2xl bg-[#0FAF7A]/10 flex items-center justify-center text-[#0FAF7A] text-xl animate-fadeIn">
      <HiOutlineGlobeAlt />
     </div>
     <div>
      <p className="text-xs text-gray-500 font-bold dark:text-gray-400">Total Departments</p>
      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">{departments.length}</h3>
     </div>
    </Card>

    <Card className="p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
     <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl animate-fadeIn">
      <HiOutlineUsers />
     </div>
     <div>
      <p className="text-xs text-gray-500 font-bold dark:text-gray-400">Total Staff</p>
      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">
       {isLoading ? "..." : employees.length}
      </h3>
     </div>
    </Card>

    <Card className="p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
     <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 text-xl animate-fadeIn">
      <HiOutlineBuildingOffice2 />
     </div>
     <div>
      <p className="text-xs text-gray-500 font-bold dark:text-gray-400">Largest Department</p>
      <h3 className="text-sm font-extrabold text-gray-900 dark:text-white mt-1 truncate max-w-[200px]" title={getLargestDepartment()}>
       {isLoading ? "..." : getLargestDepartment()}
      </h3>
     </div>
    </Card>
   </div>

   {/* Table section */}
   <Card className="overflow-hidden border border-gray-300 dark:border-gray-800/80 rounded-2xl">
    <div className="p-6 border-b border-gray-100 dark:border-gray-800/60 flex items-center justify-between gap-4">
     <Input
      placeholder="Search departments..."
      leftIcon={<HiOutlineMagnifyingGlass />}
      className="w-80 h-10 bg-gray-50/30 dark:bg-gray-800/50 text-xs font-semibold"
      containerClassName="w-auto"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
     />
     <RowPerPage itemsPerPage={limit} onItemsPerPageChange={(v) => { setLimit(v); setPage(1); }} />
    </div>
    <div className="overflow-x-auto w-full">
     <table>
      <thead>
       <tr>
        <th>Department</th>
        <th>Parent Department</th>
        <th>Staff count</th>
        <th>Team Members</th>
        <th>Description</th>
        <th className="text-right">Actions</th>
       </tr>
      </thead>
      <tbody>
       {isLoading ? (
        <SVGLoaderFetch colSpan={6} text="Loading departments..." />
       ) : paginatedDepts.length === 0 ? (
        <NoRecordFound colSpan={6} text="No departments found." />
       ) : (
        paginatedDepts.map((dept) => {
         const deptEmps = getDeptEmployees(dept.name);
         const displayEmps = deptEmps.slice(0, 4);
         const extraCount = deptEmps.length - 4;

         return (
          <tr key={dept.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
           <td className="font-bold text-gray-950 dark:text-white py-4 px-4 text-xs">
            <div className="flex items-center gap-2">
             <span className="w-2.5 h-2.5 rounded-full bg-[#0FAF7A]" />
             {dept.name}
            </div>
           </td>
           <td>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${dept.parentDept === "None"
             ? "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
             : "bg-[#0FAF7A]/10 text-[#0FAF7A] dark:bg-[#0FAF7A]/20"
             }`}>
             {dept.parentDept}
            </span>
           </td>
           <td>
            <span className="font-extrabold text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700">
             {deptEmps.length}
            </span>
           </td>
           <td>
            <div className="flex items-center -space-x-2">
             {displayEmps.length === 0 ? (
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold">Empty</span>
             ) : (
              <>
               {displayEmps.map((emp) => (
                <Avatar
                 key={emp.id}
                 src={emp.avatar}
                 fallback={emp.name.split(" ").map(n => n[0]).join("")}
                 size="sm"
                 className="border-2 border-white dark:border-gray-900"
                 title={emp.name}
                />
               ))}
               {extraCount > 0 && (
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-extrabold text-gray-600 dark:text-gray-300">
                 +{extraCount}
                </div>
               )}
              </>
             )}
            </div>
           </td>
           <td className="max-w-xs truncate text-xs text-gray-500 dark:text-gray-400 font-medium" title={dept.description}>
            {dept.description}
           </td>
            <td className="text-right">
             <TableActions
              onEdit={() => {
               setEditingDept(dept);
               setIsCreateOpen(true);
              }}
              onDelete={() => setDeleteId(dept.id)}
              className="justify-end"
             />
            </td>
          </tr>
         );
        })
       )}
      </tbody>
     </table>
    </div>
    {totalPages > 1 && (
     <div className="p-6 border-t border-gray-100 dark:border-gray-800/60">
      <Pagination
       currentPage={page}
       totalPages={totalPages}
       onPageChange={setPage}
      />
     </div>
    )}
   </Card>

   {/* Create/Edit Department Modal */}
   <CreateDepartmentModal
    isOpen={isCreateOpen}
    onClose={() => {
     setIsCreateOpen(false);
     setEditingDept(null);
    }}
    onCreate={handleSaveDepartment}
    departments={departments.map(d => d.name)}
    initialData={editingDept}
    isLoading={isCreating || isUpdating}
   />

   {/* Delete Department Confirmation Modal */}
   <DeleteModal
    isOpen={!!deleteId}
    onClose={() => setDeleteId(null)}
    onConfirm={handleDeleteConfirm}
    itemName={selectedDeleteDept?.name}
    isLoading={isDeleting}
    description="Deleting this department will not delete its associated employees, but their department field will remain active in database records. Are you sure you want to proceed?"
   />
  </div>
 );
}
