"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { HiOutlineCalendarDays, HiOutlineChevronRight } from "react-icons/hi2";
import { useCreateEmployeeMutation, useUpdateEmployeeMutation, Employee } from "@/store/services/employeesApi";
import { useGetOfficesQuery } from "@/store/services/officeApi";
import { useGetDepartmentsQuery } from "@/store/services/departmentApi";
import { useGetJobTitlesQuery } from "@/store/services/jobTitleApi";
import { useApiError } from "@/hooks/useApiError";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { toast } from "sonner";
import { SVGLoader } from "@/components/ui/options";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export function ProfileDrawer({ isOpen, onClose, employee }: ProfileDrawerProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [office, setOffice] = useState("");

  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const [createEmployee, { isLoading: isCreating, error: createError }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating, error: updateError }] = useUpdateEmployeeMutation();
  
  const { data: deptData } = useGetDepartmentsQuery({ companyId });
  const departmentOptions = React.useMemo(() => {
    const names = (deptData?.departments || []).map(d => d.name);
    return names.length > 0 ? names : ["None"];
  }, [deptData]);

  const { data: officeData } = useGetOfficesQuery({ companyId });
  const officeOptions = React.useMemo(() => {
    const names = (officeData?.offices || []).map(o => o.name);
    return names.length > 0 ? names : ["None"];
  }, [officeData]);

  const { data: jobTitleData } = useGetJobTitlesQuery({ companyId });
  const jobTitleOptions = React.useMemo(() => {
    const titles = (jobTitleData?.jobTitles || []).map(j => j.title);
    return titles.length > 0 ? titles : ["None"];
  }, [jobTitleData]);

  useApiError(!!createError, createError, "Failed to create employee");
  useApiError(!!updateError, updateError, "Failed to update employee");

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (isOpen) {
      if (employee) {
        const parts = employee.name.split(" ");
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
        setEmail(employee.email);
        setRole(employee.role);
        setDepartment(employee.department);
        setOffice(employee.office);
      } else {
        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("");
        setDepartment("");
        setOffice("");
      }
    }
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    const name = `${firstName} ${lastName}`.trim();
    if (!name || !email || !role || !department || !office) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      if (employee) {
        await updateEmployee({
          id: employee.id,
          body: { name, email, role, department, office },
        }).unwrap();
        toast.success("Employee updated successfully!");
      } else {
        await createEmployee({
          name,
          email,
          role,
          department,
          office,
          companyId,
          manager: "",
          status: "ACTIVE",
          account: "Activated",
        }).unwrap();
        toast.success("Employee created successfully!");
      }
      onClose();
    } catch (err) {
      // Error handled by useApiError hook
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col">
        {/* Dismiss slide button (vertically centered on the left border of the drawer panel) */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
          >
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </div>
        <div className="p-8 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
            {employee ? "Edit User" : "Add New User"}
          </h2>

          <div className="flex flex-col gap-6">
            <Input
              label="First Name"
              required
              placeholder="e.g. Pristia"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <Input
              label="Last Name"
              required
              placeholder="e.g. Candra"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <Input
              label="Email Address"
              required
              type="email"
              placeholder="example@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex flex-col gap-2">
              <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                Job Title <span className="text-error">*</span>
              </label>
              <Dropdown
                label={role || "Select Job Title"}
                options={jobTitleOptions}
                onSelect={(val) => setRole(val)}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                Department <span className="text-error">*</span>
              </label>
              <Dropdown
                label={department || "Select Department"}
                options={departmentOptions}
                onSelect={(val) => setDepartment(val)}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                Office <span className="text-error">*</span>
              </label>
              <Dropdown
                label={office || "Select Office"}
                options={officeOptions}
                onSelect={(val) => setOffice(val)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-gray-300 dark:border-gray-800 flex items-center gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleSave}
            disabled={isLoading}
            leftIcon={isLoading ? <SVGLoader width={16} height={16} color="#9CA3AF" /> : undefined}
          >
            {isLoading ? "Saving..." : employee ? "Save Changes" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
