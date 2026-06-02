"use client";

import * as React from "react";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import {
  useGetOfficesQuery,
  useCreateOfficeMutation,
  useUpdateOfficeMutation,
  useDeleteOfficeMutation,
  Office
} from "@/store/services/officeApi";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { CreateOfficeModal } from "@/components/ui/modal/create-office-modal";
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

export default function EmployeesOfficesPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const { data: empData, isLoading: isEmployeesLoading, error: employeesError } = useGetEmployeesQuery({ companyId });
  const employees = empData?.employees || [];

  const { data: officeData, isLoading: isOfficesLoading, error: officesError } = useGetOfficesQuery({ companyId });
  const offices = officeData?.offices || [];

  const [createOffice, { error: createError, isLoading: isCreating }] = useCreateOfficeMutation();
  const [updateOffice, { error: updateError, isLoading: isUpdating }] = useUpdateOfficeMutation();
  const [deleteOffice, { error: deleteError, isLoading: isDeleting }] = useDeleteOfficeMutation();

  const [search, setSearch] = React.useState("");
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [editingOffice, setEditingOffice] = React.useState<Office | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  const isLoading = isEmployeesLoading || isOfficesLoading;

  // Set up API error listeners
  useApiError(!!employeesError, employeesError, "Failed to load employees");
  useApiError(!!officesError, officesError, "Failed to load offices");
  useApiError(!!createError, createError, "Failed to create office");
  useApiError(!!updateError, updateError, "Failed to update office");
  useApiError(!!deleteError, deleteError, "Failed to delete office");

  // Reset page when search or limit changes
  React.useEffect(() => {
    setPage(1);
  }, [search, limit]);

  // Compute members in each office
  const getOfficeEmployees = (officeName: string) => {
    return employees.filter(e => e.office.toLowerCase() === officeName.toLowerCase());
  };

  // Find office with most members
  const getLargestOffice = () => {
    if (offices.length === 0) return "None";
    let maxCount = -1;
    let largestName = "None";

    offices.forEach(o => {
      const count = getOfficeEmployees(o.name).length;
      if (count > maxCount) {
        maxCount = count;
        largestName = o.name;
      }
    });

    return maxCount > 0 ? `${largestName} (${maxCount})` : "None";
  };

  const handleSaveOffice = async (formData: { office: string; location: string; description: string; headOfOffice: string }) => {
    try {
      const officePayload = {
        name: formData.office,
        location: formData.location,
        description: formData.description,
        headOfOffice: formData.headOfOffice,
        isHQ: formData.office.toLowerCase().includes("jakarta") || formData.office.toLowerCase().includes("hq"),
        companyId,
      };

      if (editingOffice) {
        await updateOffice({
          id: editingOffice.id,
          body: {
            ...officePayload,
            isHQ: editingOffice.isHQ, // preserve HQ status
          }
        }).unwrap();
        toast.success(`Office "${formData.office}" updated successfully!`);
      } else {
        await createOffice(officePayload).unwrap();
        toast.success(`Office "${formData.office}" created successfully!`);
      }
      setIsCreateOpen(false);
    } catch (err) {
      // Handled by useApiError
    } finally {
      setEditingOffice(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await deleteOffice(deleteId).unwrap();
        toast.success("Office deleted successfully.");
      } catch (err) {
        // Handled by useApiError
      }
      setDeleteId(null);
    }
  };

  const filteredOffices = offices.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.location.toLowerCase().includes(search.toLowerCase()) ||
    o.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOffices.length / limit);
  const paginatedOffices = filteredOffices.slice((page - 1) * limit, page * limit);

  const selectedDeleteOffice = offices.find(o => o.id === deleteId);

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 relative min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between">
        <PageHeader
          title="Offices"
          description="Manage and organize your company offices, locations, and view onsite staff."
        />
        <Button
          variant="primary"
          size="md"
          leftIcon={<HiPlus />}
          onClick={() => {
            setEditingOffice(null);
            setIsCreateOpen(true);
          }}
          className="px-6"
        >
          Add Office
        </Button>
      </div>

      {/* Summary Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-[#0FAF7A]/10 flex items-center justify-center text-[#0FAF7A] text-xl animate-fadeIn">
            <HiOutlineBuildingOffice2 />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold dark:text-gray-400">Total Offices</p>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">{offices.length}</h3>
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
            <HiOutlineGlobeAlt />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold dark:text-gray-400">Largest Office</p>
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white mt-1 truncate max-w-[200px]" title={getLargestOffice()}>
              {isLoading ? "..." : getLargestOffice()}
            </h3>
          </div>
        </Card>
      </div>

      {/* Table section */}
      <Card className="overflow-hidden border border-gray-300 dark:border-gray-800/80 rounded-2xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800/60 flex items-center justify-between gap-4">
          <Input
            placeholder="Search offices..."
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
                <th>Office</th>
                <th>Location</th>
                <th>Staff count</th>
                <th>Team Members</th>
                <th>Description</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <SVGLoaderFetch colSpan={6} text="Loading offices..." />
              ) : paginatedOffices.length === 0 ? (
                <NoRecordFound colSpan={6} text="No offices found." />
              ) : (
                paginatedOffices.map((office) => {
                  const officeEmps = getOfficeEmployees(office.name);
                  const displayEmps = officeEmps.slice(0, 4);
                  const extraCount = officeEmps.length - 4;

                  return (
                    <tr key={office.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="font-bold text-gray-950 dark:text-white py-4 px-4 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0FAF7A]" />
                          {office.name}
                          {office.isHQ && (
                            <span className="ml-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#0FAF7A]/10 text-[#0FAF7A] border border-[#0FAF7A]/20">
                              HQ
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          {office.location}
                        </span>
                      </td>
                      <td>
                        <span className="font-extrabold text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700">
                          {officeEmps.length}
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
                      <td className="max-w-xs truncate text-xs text-gray-500 dark:text-gray-400 font-medium" title={office.description}>
                        {office.description}
                      </td>
                      <td className="text-right">
                        <TableActions
                          onEdit={() => {
                            setEditingOffice(office);
                            setIsCreateOpen(true);
                          }}
                          onDelete={() => setDeleteId(office.id)}
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

      {/* Create/Edit Office Modal */}
      <CreateOfficeModal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingOffice(null);
        }}
        onCreate={handleSaveOffice}
        initialData={editingOffice}
        isLoading={isCreating || isUpdating}
      />

      {/* Delete Office Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedDeleteOffice?.name}
        isLoading={isDeleting}
        description="Deleting this office will not delete its associated employees, but their office field will remain active in database records. Are you sure you want to proceed?"
      />
    </div>
  );
}
