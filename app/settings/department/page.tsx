"use client";

import * as React from "react";
import { HiOutlinePaperClip, HiPlus } from "react-icons/hi2";
import { CreateDepartmentModal } from "@/components/ui/modal/create-department-modal";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useGetDepartmentsQuery, useCreateDepartmentMutation } from "@/store/services/departmentApi";
import { useGetCompanyQuery } from "@/store/services/companyApi";
import { SVGLoaderFetch } from "@/components/ui/options";
import { toast } from "sonner";

interface OrgNodeData {
  id: string;
  label: string;
  children?: OrgNodeData[];
}

function OrgNode({
  node,
  isRoot = false,
  isFirst = false,
  isLast = false,
  isOnly = false,
  onAddClick,
}: {
  node: OrgNodeData;
  isRoot?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isOnly?: boolean;
  onAddClick?: (nodeId: string, nodeLabel: string) => void;
}) {
  return (
    <div className="flex flex-col items-center relative px-2">
      {/* Upper Horizontal Line (Rendered on the Child container) */}
      {!isRoot && (
        <div className="absolute top-0 w-full h-6 flex">
          <div
            className={`w-1/2 h-full ${
              !isFirst && !isOnly ? "border-t border-gray-300 dark:border-gray-700" : ""
            }`}
          />
          <div
            className={`w-1/2 h-full ${
              !isLast && !isOnly ? "border-t border-gray-300 dark:border-gray-700" : ""
            }`}
          />
        </div>
      )}

      {/* Vertical line connecting to parent */}
      {!isRoot && <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 relative" />}

      {/* Node Box */}
      <div className="relative border border-gray-300 dark:border-gray-700 rounded-full px-5 py-3 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center min-w-[110px] z-10">
        <span className="text-[11px] font-bold text-gray-900 dark:text-white select-none">
          {node.label}
        </span>

        {/* Paperclip design element */}
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#11131A] dark:bg-gray-800 rounded-full flex items-center justify-center text-white text-[8px] border-2 border-white dark:border-gray-900">
          <HiOutlinePaperClip />
        </div>

        {/* Plus to add sub-department */}
        <button
          type="button"
          onClick={() => onAddClick && onAddClick(node.id, node.label)}
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0FAF7A] rounded-full flex items-center justify-center text-white text-[10px] border-2 border-white dark:border-gray-900 cursor-pointer hover:scale-110 transition-transform z-20 outline-none"
        >
          <HiPlus />
        </button>
      </div>

      {/* Vertical line going down from parent */}
      {node.children && node.children.length > 0 && (
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 relative" />
      )}

      {/* Children container */}
      {node.children && node.children.length > 0 && (
        <div className="flex justify-center">
          {node.children.map((child, i, arr) => (
            <OrgNode
              key={child.id}
              node={child}
              isFirst={i === 0}
              isLast={i === arr.length - 1}
              isOnly={arr.length === 1}
              onAddClick={onAddClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DepartmentPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const { data: companyData } = useGetCompanyQuery(companyId, { skip: !companyId });
  const { data: deptData, isLoading: isDeptsLoading } = useGetDepartmentsQuery({ companyId }, { skip: !companyId });
  const [createDept, { isLoading: isCreating }] = useCreateDepartmentMutation();

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [defaultParent, setDefaultParent] = React.useState<string>("None");

  const companyName = companyData?.company?.name || "Company";
  const departments = deptData?.departments || [];

  const handleAddClick = (nodeId: string, nodeLabel: string) => {
    if (nodeId === "root") {
      setDefaultParent("None");
    } else {
      setDefaultParent(nodeLabel);
    }
    setIsAddOpen(true);
  };

  const handleCreate = async (formData: { department: string; parentDept: string; description: string }) => {
    try {
      await createDept({
        name: formData.department,
        parentDept: formData.parentDept,
        description: formData.description,
        leader: "None",
        companyId,
      }).unwrap();
      toast.success(`Department "${formData.department}" created successfully!`);
      setIsAddOpen(false);
    } catch (err) {
      const error = err as { data?: { error?: string } };
      const errMsg = error?.data?.error || "Failed to create department";
      toast.error(errMsg);
    }
  };

  // Build tree hierarchy dynamically
  const orgTree = React.useMemo(() => {
    const root: OrgNodeData = {
      id: "root",
      label: companyName,
      children: [],
    };

    const deptNames = new Set(departments.map(d => d.name.toLowerCase()));
    const nodeMap = new Map<string, OrgNodeData>();

    departments.forEach(d => {
      nodeMap.set(d.name.toLowerCase(), {
        id: d.id,
        label: d.name,
        children: [],
      });
    });

    departments.forEach(d => {
      const node = nodeMap.get(d.name.toLowerCase())!;
      const parentName = d.parentDept ? d.parentDept.trim().toLowerCase() : "";

      if (!parentName || parentName === "none" || !deptNames.has(parentName)) {
        root.children!.push(node);
      } else {
        const parentNode = nodeMap.get(parentName);
        if (parentNode) {
          parentNode.children!.push(node);
        } else {
          root.children!.push(node);
        }
      }
    });

    return root;
  }, [departments, companyName]);

  if (!companyId) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-gray-500">Please log in to manage your departments.</p>
      </div>
    );
  }

  if (isDeptsLoading) {
    return (
      <div className="flex items-center justify-center h-full p-8 min-h-[500px]">
        <SVGLoaderFetch text="Loading department tree..." asTable={false} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-300 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Department
        </h2>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 flex flex-col items-center overflow-x-auto min-h-[500px] bg-white dark:bg-gray-900">
        <div className="min-w-max py-8">
          <OrgNode node={orgTree} isRoot={true} onAddClick={handleAddClick} />
        </div>
      </div>

      {/* Create Department Modal Component */}
      <CreateDepartmentModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onCreate={handleCreate}
        departments={departments.map(d => d.name)}
        initialData={defaultParent !== "None" ? { id: "", name: "", parentDept: defaultParent, description: "" } : null}
        isLoading={isCreating}
      />
    </div>
  );
}
