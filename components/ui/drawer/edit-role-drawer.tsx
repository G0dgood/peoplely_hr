"use client";

import * as React from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateRoleMutation } from "@/store/services/rolePermissionApi";
import { toast } from "sonner";
import { useApiError } from "@/hooks/useApiError";

interface EditRoleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  role: { id: string; name: string; description: string } | undefined;
}

export function EditRoleDrawer({ isOpen, onClose, role }: EditRoleDrawerProps) {
  const [updateRole, { error: updateError, isLoading: isUpdating }] = useUpdateRoleMutation();
  useApiError(!!updateError, updateError, "Failed to update role");

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (role && isOpen) {
      setName(role.name);
      setDescription(role.description);
    }
  }, [role, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role?.id) return;
    try {
      await updateRole({
        id: role.id,
        name: name.trim(),
        description: description.trim(),
      }).unwrap();
      toast.success(`Role "${name}" updated successfully!`);
      onClose();
    } catch (err) {
      // Handled by useApiError
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 !bg-black/20  transition-opacity"
        onClick={onClose}
      />
      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full flex flex-col shadow-2xl transition-transform duration-300 ease-in-out transform translate-x-0">
        {/* Dismiss slide button on left edge */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
          >
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col h-full bg-white dark:bg-gray-950">
          <div className="p-8 flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
              Edit Role Details
            </h2>

            <div className="flex flex-col gap-6">
              {/* Role Name */}
              <div className="flex flex-col gap-2">
                <Input
                  label="Role Name"
                  placeholder="e.g. QA Engineer"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <Input
                  label="Description"
                  placeholder="Input description role"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="p-8 border-t border-gray-300 dark:border-gray-800 flex items-center gap-4 bg-white dark:bg-gray-950">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 font-bold h-12 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 font-bold h-12 !bg-black dark:bg-white text-white dark:text-gray-900 hover:opacity-90 animate-pulse-once"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
