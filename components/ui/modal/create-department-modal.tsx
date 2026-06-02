import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { SVGLoader } from "@/components/ui/options";

export interface CreateDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (data: { department: string; parentDept: string; description: string }) => void;
  departments?: string[];
  initialData?: { id: string; name: string; parentDept: string; description: string } | null;
  isLoading?: boolean;
}

export function CreateDepartmentModal({
  isOpen,
  onClose,
  onCreate,
  departments,
  initialData,
  isLoading = false,
}: CreateDepartmentModalProps) {
  const [department, setDepartment] = React.useState("");

  const options = React.useMemo(() => {
    if (departments && departments.length > 0) {
      // Filter out the department itself from the parent option list if editing
      const filtered = initialData
        ? departments.filter((d) => d.toLowerCase() !== initialData.name.toLowerCase())
        : departments;
      return ["None", ...filtered];
    }
    return ["None"];
  }, [departments, initialData]);

  const [parentDept, setParentDept] = React.useState("None");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setDepartment(initialData.name);
        setParentDept(initialData.parentDept);
        setDescription(initialData.description || "");
      } else {
        setDepartment("");
        setParentDept("None");
        setDescription("");
      }
    }
  }, [isOpen, initialData]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!department.trim() || isLoading) return;

    onCreate?.({
      department,
      parentDept,
      description,
    });
  };

  const handleClose = () => {
    if (isLoading) return;
    setDepartment("");
    setParentDept("None");
    setDescription("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} position="center">
      <form onSubmit={handleCreate}>
        <ModalHeader onClose={handleClose}>
          <ModalTitle>{initialData ? "Edit Department" : "Create Department"}</ModalTitle>
        </ModalHeader>
        <ModalContent className="flex flex-col gap-5">
          <Input
            label="Department Name"
            required
            placeholder="e.g. Graphic Design"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            disabled={isLoading}
          />

          <div className="flex flex-col gap-2">
            <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
              Parent Department <span className="text-error">*</span>
            </label>
            <Dropdown
              label={parentDept}
              options={options}
              onSelect={(val) => setParentDept(val)}
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
              Description
            </label>
            <textarea
              placeholder="Enter department description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              disabled={isLoading}
              className="w-full rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors p-4 resize-none leading-relaxed disabled:opacity-50"
            />
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 justify-center"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!department.trim() || isLoading}
            className="flex-1 justify-center"
            leftIcon={isLoading ? <SVGLoader width={16} height={16} color="#ffffff" /> : undefined}
          >
            {isLoading ? (initialData ? "Saving..." : "Creating...") : (initialData ? "Save Changes" : "Create")}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
