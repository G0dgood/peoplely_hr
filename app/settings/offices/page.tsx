"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { CreateOfficeModal } from "@/components/ui/modal/create-office-modal";
import { DeleteModal } from "@/components/ui/modal/delete-modal";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";
import { toast } from "sonner";
import { useApiError } from "@/hooks/useApiError";
import { TableActions } from "@/components/ui/table-actions";
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
import {
  HiPlus,
  HiOutlineTrash,
  HiOutlinePencilSquare
} from "react-icons/hi2";

export default function OfficesPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const { data: empData, isLoading: isEmployeesLoading, error: employeesError } = useGetEmployeesQuery({ companyId });
  const employees = empData?.employees || [];

  const { data: officeData, isLoading: isOfficesLoading, error: officesError } = useGetOfficesQuery({ companyId });
  const offices = officeData?.offices || [];

  const [createOffice, { error: createError, isLoading: isCreating }] = useCreateOfficeMutation();
  const [updateOffice, { error: updateError, isLoading: isUpdating }] = useUpdateOfficeMutation();
  const [deleteOffice, { error: deleteError, isLoading: isDeleting }] = useDeleteOfficeMutation();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingOffice, setEditingOffice] = React.useState<Office | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const isLoading = isEmployeesLoading || isOfficesLoading;

  // Set up API error listeners
  useApiError(!!employeesError, employeesError, "Failed to load employees");
  useApiError(!!officesError, officesError, "Failed to load offices");
  useApiError(!!createError, createError, "Failed to create office");
  useApiError(!!updateError, updateError, "Failed to update office");
  useApiError(!!deleteError, deleteError, "Failed to delete office");

  const getOfficeEmployeesCount = (officeName: string) => {
    return employees.filter(e => e.office.toLowerCase() === officeName.toLowerCase()).length;
  };

  const handleSaveOffice = async (formData: { office: string; location: string; description: string; headOfOffice: string }) => {
    try {
      const officePayload = {
        name: formData.office,
        location: formData.location,
        description: formData.description,
        headOfOffice: formData.headOfOffice,
        // Match Headquarters flag if it starts with Unpixel or is explicitly set by user (we can toggle it or default to false)
        isHQ: formData.office.toLowerCase().includes("jakarta") || formData.office.toLowerCase().includes("hq"),
        companyId,
      };

      if (editingOffice) {
        await updateOffice({
          id: editingOffice.id,
          body: {
            ...officePayload,
            isHQ: editingOffice.isHQ, // preserve HQ status on edit unless explicitly changed
          }
        }).unwrap();
        toast.success(`Office "${formData.office}" updated successfully!`);
      } else {
        await createOffice(officePayload).unwrap();
        toast.success(`Office "${formData.office}" created successfully!`);
      }
      setIsModalOpen(false);
    } catch (err) {
      // Handled by useApiError
    } finally {
      setEditingOffice(null);
    }
  };

  const handleToggleActive = async (office: Office) => {
    try {
      await updateOffice({
        id: office.id,
        body: {
          active: !office.active
        }
      }).unwrap();
      toast.success(`Office "${office.name}" is now ${!office.active ? "active" : "inactive"}.`);
    } catch (err) {
      // Handled by useApiError
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

  const selectedDeleteOffice = offices.find(o => o.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-300 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Offices
        </h2>
        <Button
          variant="primary"
          size="md"
          leftIcon={<HiPlus />}
          onClick={() => {
            setEditingOffice(null);
            setIsModalOpen(true);
          }}
          className="px-6"
        >
          Add Office
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <SVGLoaderFetch colSpan={1} text="Loading offices..." />
          </div>
        ) : offices.length === 0 ? (
          <div className="flex justify-center py-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800/80 rounded-2xl">
            <NoRecordFound colSpan={1} text="No offices found." />
          </div>
        ) : (
          offices.map((office) => {
            const count = getOfficeEmployeesCount(office.name);
            return (
              <div
                key={office.id}
                className="border border-gray-300 dark:border-gray-800/80 rounded-2xl p-6 shadow-xs flex flex-col gap-6 bg-white dark:bg-gray-900"
              >
                {/* Top Section */}
                <div className="flex flex-col gap-2 border-b border-gray-50 dark:border-gray-800 pb-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {office.name}
                      </h3>
                      {office.isHQ && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0FAF7A] text-white">
                          HQ
                        </span>
                      )}
                    </div>
                    <TableActions
                      onEdit={() => {
                        setEditingOffice(office);
                        setIsModalOpen(true);
                      }}
                      onDelete={() => setDeleteId(office.id)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      {office.location}
                    </span>
                    <Toggle
                      checked={office.active}
                      onChange={() => handleToggleActive(office)}
                    />
                  </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex items-center">
                    <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                      Number of Employees
                    </span>
                    <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                      {count}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                      Timezone
                    </span>
                    <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                      {office.timezone}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                      Contact Number
                    </span>
                    <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                      {office.phone || "-"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                      Contact Email
                    </span>
                    <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white truncate" title={office.email}>
                      {office.email || "-"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                      Head of Office
                    </span>
                    <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                      {office.headOfOffice || "Management"}
                    </span>
                  </div>
                  {office.description && (
                    <div className="flex items-start md:col-span-2">
                      <span className="w-1/4 text-xs font-semibold text-gray-400 dark:text-gray-500">
                        Description
                      </span>
                      <span className="w-3/4 text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        {office.description}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <CreateOfficeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOffice(null);
        }}
        onCreate={handleSaveOffice}
        initialData={editingOffice}
        isLoading={isCreating || isUpdating}
      />

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
