"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlineXMark, HiOutlineCalendarDays } from "react-icons/hi2";

interface Employee {
  name: string;
  email: string;
  avatar: string;
  role: string;
  manager: string;
  department: string;
  office: string;
  status: string;
  account: string;
}

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export function ProfileDrawer({ isOpen, onClose, employee }: ProfileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col">
        <div className="p-8 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
            {employee ? "Edit Profile" : "Add New Profile"}
          </h2>

          <div className="flex flex-col gap-6">
            <Input
              label="First Name"
              required
              placeholder="e.g. Pristia"
              defaultValue={employee ? employee.name.split(" ")[0] : ""}
              error={!employee ? "This field is required." : undefined}
              className={!employee ? "border-red-200 dark:border-red-900" : ""}
            />

            <Input
              label="Last Name"
              required
              defaultValue={employee ? employee.name.split(" ")[1] : "Candra"}
            />

            <Input
              label="Email Address"
              required
              type="email"
              defaultValue={employee ? employee.email : "pristia@gmail.com"}
            />

            <Input
              label="Join Date"
              required
              defaultValue={employee ? "23 Mar 2023" : "23 Mar 2023"}
              rightIcon={<HiOutlineCalendarDays className="text-gray-400 dark:text-gray-500 text-lg" />}
            />
          </div>
        </div>

        <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="primary" className="flex-1">
            {employee ? "Save Changes" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
