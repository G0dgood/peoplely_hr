"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineMagnifyingGlass,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineLink,
  HiOutlineTrash,
} from "react-icons/hi2";
import { EditTaskDrawer } from "@/components/ui/drawer";

interface TemplateTask {
  id: string;
  name: string;
  tag: "CHECKLIST" | "UPLOAD" | "EMPLOYEE INFORMATION";
  assignee: string;
  dueDate: string;
  description: string;
}

export default function ChecklistSettingDetailPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedTaskId, setExpandedTaskId] = React.useState<string | null>("task-1");
  const [editingTask, setEditingTask] = React.useState<TemplateTask | null>(null);

  const [tasks, setTasks] = React.useState<TemplateTask[]>([
    {
      id: "task-1",
      name: "Prepare company welcome kit",
      tag: "CHECKLIST",
      assignee: "Line Manager",
      dueDate: "1 day before join date",
      description: "Please ensure that your new team member have a prepared workstation with:\n1. Laptop\n2. Work email\n3. Internet/Team sites access",
    },
    {
      id: "task-2",
      name: "Prepare Workstation",
      tag: "CHECKLIST",
      assignee: "IT Support",
      dueDate: "3 days before join date",
      description: "Setup physical desk space, monitor, keyboard, mouse, and ensure cabling is completed.",
    },
    {
      id: "task-3",
      name: "Submit Document - Soft copy of ID card",
      tag: "UPLOAD",
      assignee: "Employee",
      dueDate: "On join date",
      description: "Employee must upload a clear scanned copy of their national ID card or passport.",
    },
    {
      id: "task-4",
      name: "Learn team members faces before joining",
      tag: "UPLOAD",
      assignee: "Employee",
      dueDate: "7 days before join date",
      description: "Check the employee directory and familiarize yourself with the immediate project team members.",
    },
    {
      id: "task-5",
      name: "Provide your Home Address",
      tag: "EMPLOYEE INFORMATION",
      assignee: "Employee",
      dueDate: "On join date",
      description: "Enter full residential address details for tax reporting and employee records.",
    },
    {
      id: "task-6",
      name: "Collect Documents - Hard Copies",
      tag: "UPLOAD",
      assignee: "HR Administrator",
      dueDate: "3 days after join date",
      description: "Verify physical original documents against uploaded scanned items and file them in the folder.",
    },
  ]);

  const toggleExpand = (id: string) => {
    setExpandedTaskId((prev) => (prev === id ? null : id));
  };

  const handleDeleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSaveTask = (updatedData: {
    name: string;
    tag: "CHECKLIST" | "UPLOAD" | "EMPLOYEE INFORMATION";
    assignee: string;
    dueDate: string;
    description: string;
  }) => {
    if (!editingTask) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTask.id ? { ...t, ...updatedData } : t
      )
    );
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header section with breadcrumbs and search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setting Checklist</h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mt-1.5">
            <Link
              href="/dashboard/checklist/setting"
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Onboarding Template
            </Link>
            <HiOutlineChevronRight className="text-[10px] text-gray-300" />
            <span className="text-gray-900 dark:text-white font-bold">Detail</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-72">
          <Input
            placeholder="Search what you need"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-xs font-semibold rounded-xl pl-4 pr-10 placeholder:text-gray-300"
          />
          <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
        </div>
      </div>

      {/* List of Accordion Tasks */}
      <div className="flex flex-col gap-4">
        {filteredTasks.map((task) => {
          const isExpanded = expandedTaskId === task.id;
          
          // Render Tag style
          let tagClass = "";
          if (task.tag === "CHECKLIST") {
            tagClass = "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/15 dark:text-[#0FAF7A]";
          } else if (task.tag === "UPLOAD") {
            tagClass = "bg-[#FFF2E8] text-[#FA541C] dark:bg-[#FA541C]/15 dark:text-[#FA541C]";
          } else {
            tagClass = "bg-[#E6F7FF] text-[#1890FF] dark:bg-[#1890FF]/15 dark:text-[#1890FF]";
          }

          return (
            <Card
              key={task.id}
              className="border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition-all"
            >
              {/* Accordion Header */}
              <div
                onClick={() => toggleExpand(task.id)}
                className="p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4">
                  {/* Chevron Expand Indicator */}
                  <span className="text-gray-400 dark:text-gray-500 text-sm">
                    {isExpanded ? (
                      <HiOutlineChevronUp className="text-base" />
                    ) : (
                      <HiOutlineChevronDown className="text-base" />
                    )}
                  </span>

                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {task.name}
                  </span>

                  <span className={`px-2.5 py-0.5 rounded text-[8px] font-bold tracking-wider ${tagClass}`}>
                    {task.tag}
                  </span>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingTask(task);
                    }}
                    title="Edit task"
                    className="w-8 h-8 rounded-lg bg-blue-500 hover:opacity-90 text-white flex items-center justify-center transition-opacity"
                  >
                    <HiOutlineLink className="text-sm font-bold" />
                  </button>

                  <button
                    onClick={(e) => handleDeleteTask(task.id, e)}
                    className="w-8 h-8 rounded-lg bg-red-500 hover:opacity-90 text-white flex items-center justify-center transition-opacity"
                  >
                    <HiOutlineTrash className="text-sm font-bold" />
                  </button>
                </div>
              </div>

              {/* Accordion Expanded Details */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-50 dark:border-gray-850/40 flex flex-col gap-4 text-xs font-semibold text-gray-700 dark:text-gray-350">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2 border-b border-gray-50 dark:border-gray-850/20">
                    <div className="text-gray-400 dark:text-gray-500">Task Name</div>
                    <div className="md:col-span-3 text-gray-800 dark:text-gray-100 font-bold">{task.name}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2 border-b border-gray-50 dark:border-gray-850/20">
                    <div className="text-gray-400 dark:text-gray-500">Assign</div>
                    <div className="md:col-span-3 text-gray-800 dark:text-gray-100 font-bold">{task.assignee}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2 border-b border-gray-50 dark:border-gray-850/20">
                    <div className="text-gray-400 dark:text-gray-500">Due Date</div>
                    <div className="md:col-span-3 text-gray-800 dark:text-gray-100 font-bold">{task.dueDate}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
                    <div className="text-gray-400 dark:text-gray-500">Description</div>
                    <div className="md:col-span-3 text-gray-600 dark:text-gray-350 leading-relaxed font-semibold whitespace-pre-line">
                      {task.description}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-xs font-semibold">
            No tasks found matching your search.
          </div>
        )}
      </div>

      <EditTaskDrawer
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
}
