"use client";

import * as React from "react";
import { HiOutlinePaperClip, HiPlus } from "react-icons/hi2";
import { CreateDepartmentModal } from "@/components/ui/modal";

interface OrgNodeData {
  id: string;
  label: string;
  children?: OrgNodeData[];
}

const ORG_DATA: OrgNodeData = {
  id: "root",
  label: "Unpixel Office",
  children: [
    { id: "hr", label: "HR" },
    { id: "mgmt", label: "Management" },
    {
      id: "design",
      label: "Lead Designer",
      children: [
        {
          id: "uiux",
          label: "UI UX Design",
          children: [
            { id: "graphic", label: "Graphic Design" },
          ],
        },
      ],
    },
    { id: "mktg", label: "Marketing" },
    {
      id: "it",
      label: "Lead IT",
      children: [
        { id: "android", label: "Android Dev" },
      ],
    },
    { id: "finance", label: "Finance" },
  ],
};

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
  onAddClick?: (nodeId: string) => void;
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
        <span className="text-[11px] font-bold text-gray-900 dark:text-white">
          {node.label}
        </span>

        {/* Paperclip */}
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#11131A] dark:bg-gray-800 rounded-full flex items-center justify-center text-white text-[8px] border-2 border-white dark:border-gray-900">
          <HiOutlinePaperClip />
        </div>

        {/* Plus */}
        <div 
          onClick={() => onAddClick && onAddClick(node.id)}
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0FAF7A] rounded-full flex items-center justify-center text-white text-[10px] border-2 border-white dark:border-gray-900 cursor-pointer hover:scale-110 transition-transform z-20"
        >
          <HiPlus />
        </div>
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
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  const handleAddClick = (nodeId: string) => {
    setIsAddOpen(true);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-300 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Department
        </h2>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 flex flex-col items-center overflow-x-auto min-h-[500px]">
        <div className="min-w-max py-8">
          <OrgNode node={ORG_DATA} isRoot={true} onAddClick={handleAddClick} />
        </div>
      </div>
      {/* Create Department Modal Component */}
      <CreateDepartmentModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onCreate={(data) => console.log("Created department:", data)} />
    </div>
  );
}
