"use client";

import * as React from "react";
import {
 HiChevronLeft,
 HiChevronDown,
 HiLockClosed,
 HiOutlineLink,
 HiOutlineMagnifyingGlass,
 HiOutlineTrash,
 HiChevronRight,
 HiEllipsisHorizontal,
 HiOutlinePencilSquare,
} from "react-icons/hi2";
import { Dropdown } from "@/components/ui/dropdown";
import { AddRoleDrawer, EditRoleDrawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import {
 useGetRolesQuery,
 useUpdateRoleMutation,
 useDeleteRoleMutation,
 useGetRoleMembersQuery,
 useAssignRoleMemberMutation,
 useUnassignRoleMemberMutation,
} from "@/store/services/rolePermissionApi";
import { toast } from "sonner";
import { useApiError } from "@/hooks/useApiError";
import { SVGLoaderFetch } from "@/components/ui/options";
import { DeleteModal } from "@/components/ui/modal/delete-modal";


const PERMISSION_SECTIONS = [
 "Profile Picture",
 "Personal Info",
 "Address",
 "Emergency Contact",
 "Offboarding Details",
 "Bank Info",
 "Job Information",
 "Work Schedule",
];

export default function PermissionPage() {
 const currentUser = useAppSelector(selectCurrentUser);
 const companyId = currentUser?.companyId ?? "";

 // Queries & Mutations
 const { data: rolesData, isLoading: isRolesLoading, error: rolesError } = useGetRolesQuery({ companyId }, { skip: !companyId });
 const roles = rolesData?.roles || [];

 const [selectedRoleId, setSelectedRoleId] = React.useState<string | null>(null);
 const currentRole = roles.find((r) => r.id === selectedRoleId);

 const [isAddOpen, setIsAddOpen] = React.useState(false);
 const [activeTab, setActiveTab] = React.useState("Permission");

 const [deleteRoleId, setDeleteRoleId] = React.useState<string | null>(null);
 const [deleteMemberUserId, setDeleteMemberUserId] = React.useState<string | null>(null);

 const [memberSearchQuery, setMemberSearchQuery] = React.useState("");
 const [showSuggestions, setShowSuggestions] = React.useState(false);
 const [currentPage, setCurrentPage] = React.useState(1);
 const itemsPerPage = 5;
 const [isEditOpen, setIsEditOpen] = React.useState(false);
 const [editingRole, setEditingRole] = React.useState<{ id: string; name: string; description: string } | undefined>(undefined);

 const [updateRole, { error: updateError }] = useUpdateRoleMutation();
 const [deleteRole, { error: deleteError, isLoading: isDeletingRole }] = useDeleteRoleMutation();

 const { data: membersData, isLoading: isMembersLoading, error: membersError } = useGetRoleMembersQuery(selectedRoleId ?? "", { skip: !selectedRoleId });
 const [assignMember, { error: assignError }] = useAssignRoleMemberMutation();
 const [unassignMember, { error: unassignError, isLoading: isUnassigning }] = useUnassignRoleMemberMutation();

 // Setup API error handlers
 useApiError(!!rolesError, rolesError, "Failed to load roles");
 useApiError(!!updateError, updateError, "Failed to update role");
 useApiError(!!deleteError, deleteError, "Failed to delete role");
 useApiError(!!membersError, membersError, "Failed to load role members");
 useApiError(!!assignError, assignError, "Failed to assign member to role");
 useApiError(!!unassignError, unassignError, "Failed to unassign member");

 const suggestionsRef = React.useRef<HTMLDivElement>(null);

 React.useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
   if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
    setShowSuggestions(false);
   }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

 React.useEffect(() => {
  setCurrentPage(1);
  setMemberSearchQuery("");
 }, [selectedRoleId]);

 const handlePermissionChange = async (section: string, accessType: string) => {
  if (!selectedRoleId) return;
  try {
   await updateRole({
    id: selectedRoleId,
    permissions: [{ section, accessType }],
   }).unwrap();
   toast.success(`Updated "${section}" permission to "${accessType}"`);
  } catch (err) {
   // Handled by useApiError
  }
 };

 const handleAccessLevelChange = async (val: string) => {
  if (!selectedRoleId) return;
  try {
   await updateRole({
    id: selectedRoleId,
    accessLevel: val,
   }).unwrap();
   toast.success(`Updated access level to "${val}"`);
  } catch (err) {
   // Handled by useApiError
  }
 };

 const handleEditRoleSave = async (name: string, description: string) => {
  if (!editingRole?.id) return;
  try {
   await updateRole({ id: editingRole.id, name, description }).unwrap();
   toast.success("Role updated successfully!");
   setIsEditOpen(false);
   setEditingRole(undefined);
  } catch (err) {
   // Handled by useApiError
  }
 };

 const handleDeleteRoleConfirm = async () => {
  if (!deleteRoleId) return;
  try {
   await deleteRole(deleteRoleId).unwrap();
   toast.success("Role deleted successfully!");
   if (selectedRoleId === deleteRoleId) {
    setSelectedRoleId(null);
   }
   setDeleteRoleId(null);
  } catch (err) {
   // Handled by useApiError
  }
 };

 const handleUnassignMemberConfirm = async () => {
  if (!selectedRoleId || !deleteMemberUserId) return;
  try {
   await unassignMember({ roleId: selectedRoleId, userId: deleteMemberUserId }).unwrap();
   toast.success("Member removed from role successfully!");
   setDeleteMemberUserId(null);
  } catch (err) {
   // Handled by useApiError
  }
 };

 // Filter eligible users for member assignment
 const members = membersData?.members || [];
 const eligibleUsers = membersData?.eligibleUsers || [];

 const filteredEligibleUsers = React.useMemo(() => {
  if (!memberSearchQuery.trim()) return eligibleUsers;
  return eligibleUsers.filter((user) =>
   user.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
   user.email.toLowerCase().includes(memberSearchQuery.toLowerCase())
  );
 }, [eligibleUsers, memberSearchQuery]);

 // Client side pagination for members table
 const paginatedMembers = React.useMemo(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return members.slice(startIndex, startIndex + itemsPerPage);
 }, [members, currentPage]);

 const totalPages = Math.ceil(members.length / itemsPerPage) || 1;

 if (isRolesLoading) {
  return (
   <div className="flex items-center justify-center h-full min-h-[400px]">
    <SVGLoaderFetch text="Loading roles..." asTable={false} />
   </div>
  );
 }

 return (
  <div className="flex flex-col h-full bg-white dark:bg-gray-900">
   {/* Roles Listing View */}
   {selectedRoleId === null ? (
    <div className="p-2 md:p-8 flex flex-col gap-8 h-full">
     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-col gap-1.5">
       <h2 className="text-xl font-bold text-gray-900 dark:text-white">Roles</h2>
       <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
        Manage access levels and permissions for all roles in the system.
       </p>
      </div>
      <button
       onClick={() => setIsAddOpen(true)}
       className="h-10 px-6 rounded-xl !bg-black dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center justify-center hover:opacity-90 transition-opacity"
      >
       Add New Role
      </button>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {roles.map((role) => (
       <div
        key={role.id}
        onClick={() => setSelectedRoleId(role.id)}
        className="p-6 border border-gray-300 dark:border-gray-800 rounded-2xl flex flex-col gap-4 cursor-pointer hover:border-[#0FAF7A] hover:bg-emerald-50/10 transition-colors shadow-xs group"
       >
        <div className="flex items-center justify-between">
         <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#0FAF7A] transition-colors">
          {role.name}
         </h3>
         {role.isDefault ? (
          <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
           DEFAULT
          </span>
         ) : (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
           <button
            onClick={() => {
             setEditingRole(role);
             setIsEditOpen(true);
            }}
            className="text-gray-400 hover:text-[#0FAF7A] transition-colors p-1 rounded hover:bg-gray-150 dark:hover:bg-gray-800"
           >
            <HiOutlinePencilSquare className="text-lg" />
           </button>
           <button
            onClick={() => {
             setDeleteRoleId(role.id);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-gray-150 dark:hover:bg-gray-800"
           >
            <HiOutlineTrash className="text-lg" />
           </button>
          </div>
         )}
        </div>
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
         {role.description}
        </p>
       </div>
      ))}
     </div>
    </div>
   ) : (
    <>
     {/* Top Header */}
     <div className="px-8 pt-8 pb-4 border-b border-gray-300 dark:border-gray-800">
      <div className="flex items-start justify-between gap-4">
       <div className="flex items-start gap-4">
        <button
         onClick={() => setSelectedRoleId(null)}
         className="mt-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
         <HiChevronLeft className="text-xl" />
        </button>
        <div className="flex flex-col gap-1.5">
         <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
           {currentRole?.name}
          </h2>
          {currentRole?.isDefault && (
           <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            DEFAULT
           </span>
          )}
         </div>
         <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
          {currentRole?.description || "Custom permissions for this role."}
         </p>
        </div>
       </div>

       {!currentRole?.isDefault && (
        <div className="flex items-center gap-3">
         <button
          onClick={() => {
           setEditingRole(currentRole);
           setIsEditOpen(true);
          }}
          className="h-9 px-4 rounded-xl border border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-350 transition-colors cursor-pointer"
         >
          Edit Role
         </button>
         <button
          onClick={() => setDeleteRoleId(currentRole?.id || null)}
          className="h-9 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer"
         >
          Delete Role
         </button>
        </div>
       )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 mt-8">
       <button
        onClick={() => setActiveTab("Permission")}
        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "Permission"
         ? "border-[#0FAF7A] text-[#0FAF7A]"
         : "border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white"
         }`}
       >
        Permission
       </button>
       <button
        onClick={() => setActiveTab("Member")}
        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "Member"
         ? "border-[#0FAF7A] text-[#0FAF7A]"
         : "border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white"
         }`}
       >
        Member
       </button>
      </div>
     </div>

     {/* Main Content Area */}
     <div className="p-4 md:p-8 flex-1 overflow-y-auto">
      <div className="max-w-4xl flex flex-col gap-8">
       {activeTab === "Permission" ? (
        <>
         {/* Access Info Box */}
         <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-xs bg-white dark:bg-gray-900">
          <div className="flex flex-col gap-4 w-full max-w-sm">
           <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Users with this role can access the information of
           </h3>
           <Dropdown
            label={currentRole?.accessLevel || "All employees"}
            options={["All employees", "Direct reports", "Own data only"]}
            onSelect={(val) => handleAccessLevelChange(val)}
            className="w-full"
           />
          </div>
          <div className="w-12 h-12 rounded-full border-[3px] border-[#FFB800] flex items-center justify-center flex-shrink-0">
           <HiLockClosed className="text-xl text-gray-900 dark:text-white" />
          </div>
         </div>

         {/* Permissions Table */}
         <div className="flex flex-col">
          {/* Table Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-2">
           <span>Section</span>
           <span>Permission</span>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
           {PERMISSION_SECTIONS.map((section, index) => {
            const perm = currentRole?.permissions?.find(
             (p) => p.section.toLowerCase() === section.toLowerCase()
            );
            const accessType = perm ? perm.accessType : "View & Edit";

            return (
             <div
              key={section}
              className={`flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50/30 dark:hover:bg-gray-800/20 ${index !== PERMISSION_SECTIONS.length - 1
               ? "border-b border-gray-300 dark:border-gray-800/50"
               : ""
               }`}
             >
              <span className="text-xs font-bold text-gray-900 dark:text-white">
               {section}
              </span>
              <Dropdown
               label={accessType}
               options={["View & Edit", "View Only", "No Access"]}
               onSelect={(val) => handlePermissionChange(section, val)}
              />
             </div>
            );
           })}
          </div>
         </div>
        </>
       ) : (
        <>
         {/* Member Search Box */}
         <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs bg-white dark:bg-gray-900">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
           Add {currentRole?.name} Member
          </h3>
          <div className="relative w-full md:w-64" ref={suggestionsRef}>
           <Input
            placeholder="Search eligible member"
            value={memberSearchQuery}
            onChange={(e) => {
             setMemberSearchQuery(e.target.value);
             setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            rightIcon={<HiOutlineMagnifyingGlass className="text-gray-400 text-lg" />}
           />
           {showSuggestions && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto py-2">
             {filteredEligibleUsers.length > 0 ? (
              filteredEligibleUsers.map((user) => (
               <button
                type="button"
                key={user.id}
                onClick={async () => {
                 try {
                  await assignMember({
                   roleId: currentRole?.id || "",
                   userId: user.id,
                  }).unwrap();
                  toast.success(`Assigned ${user.name} to role "${currentRole?.name}"`);
                  setMemberSearchQuery("");
                  setShowSuggestions(false);
                 } catch (err) {
                  // Handled by useApiError
                 }
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0"
               >
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                 {user.name}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">
                 {user.email}
                </span>
               </button>
              ))
             ) : (
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
               No eligible members found
              </div>
             )}
            </div>
           )}
          </div>
         </div>

         {/* Members Table */}
         <div className="flex flex-col">
          {/* Table Header */}
          <div className="flex items-center px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-2">
           <div className="flex-[2]">Member</div>
           <div className="flex-[2]">Email</div>
           <div className="flex-1 text-right">Action</div>
          </div>

          {/* Table Rows */}
          {isMembersLoading ? (
           <div className="py-8 flex justify-center w-full">
            <SVGLoaderFetch text="Loading members..." asTable={false} />
           </div>
          ) : (
           <div className="flex flex-col">
            {paginatedMembers.length > 0 ? (
             paginatedMembers.map((member, index) => {
              const initial = member.name
               ? member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
               : "U";

              return (
               <div
                key={member.id}
                className={`flex items-center px-6 py-4 transition-colors hover:bg-gray-50/30 dark:hover:bg-gray-800/20 ${index !== paginatedMembers.length - 1
                 ? "border-b border-gray-300 dark:border-gray-800/50"
                 : ""
                 }`}
               >
                <div className="flex-[2] flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-[#0FAF7A] flex items-center justify-center text-[10px] font-bold border border-emerald-100 dark:border-emerald-800/50">
                  {initial}
                 </div>
                 <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {member.name}
                 </span>
                </div>
                <div className="flex-[2] text-xs font-semibold text-gray-500 dark:text-gray-400">
                 {member.email}
                </div>
                <div className="flex-1 flex justify-end">
                 <button
                  type="button"
                  onClick={() => setDeleteMemberUserId(member.id)}
                  className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-sm"
                 >
                  <HiOutlineTrash className="text-sm" />
                 </button>
                </div>
               </div>
              );
             })
            ) : (
             <div className="py-8 text-center text-xs font-semibold text-gray-400 dark:text-gray-500 border border-dashed border-gray-300 dark:border-gray-800 rounded-2xl">
              No members assigned to this role yet
             </div>
            )}
           </div>
          )}

          {totalPages > 1 && (
           <div className="mt-6">
            <Pagination
             className="mt-0 w-full"
             currentPage={currentPage}
             totalPages={totalPages}
             onPageChange={(page) => setCurrentPage(page)}
            />
           </div>
          )}
         </div>
        </>
       )}
      </div>
     </div>
    </>
   )}

   {/* Add New Role Drawer */}
   <AddRoleDrawer isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

   {/* Edit Role Details Drawer */}
   <EditRoleDrawer
    isOpen={isEditOpen}
    onClose={() => {
     setIsEditOpen(false);
     setEditingRole(undefined);
    }}
    role={editingRole}
   />

   {/* Delete Role Confirmation Modal */}
   <DeleteModal
    isOpen={deleteRoleId !== null}
    onClose={() => setDeleteRoleId(null)}
    onConfirm={handleDeleteRoleConfirm}
    title="Delete Role"
    itemName={roles.find((r) => r.id === deleteRoleId)?.name}
    isLoading={isDeletingRole}
   />

   {/* Delete Member Confirmation Modal */}
   <DeleteModal
    isOpen={deleteMemberUserId !== null}
    onClose={() => setDeleteMemberUserId(null)}
    onConfirm={handleUnassignMemberConfirm}
    title="Remove Member from Role"
    itemName={members.find((m) => m.id === deleteMemberUserId)?.name}
    isLoading={isUnassigning}
   />
  </div>
 );
}
