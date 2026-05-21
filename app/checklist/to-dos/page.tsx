"use client";

import * as React from "react";
import {
  HiOutlineCalendarDays,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineChevronUpDown,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChecklistDetailDrawer, NewTaskDrawer } from "@/components/ui/drawer";
import { HiPlus } from "react-icons/hi2";
import { PageHeader } from "@/components/ui/page-header";


interface ChecklistTask {
  id: number;
  taskName: string;
  dueDate: string;
  employeeName: string;
  employeeAvatar: string;
  employeeInitials?: string;
  type: string; // e.g. "Onboarding" or "Offboarding"
  completed: boolean;
  description?: string;
}

const INITIAL_TASKS: ChecklistTask[] = [
  {
    id: 1,
    taskName: "Collect Documents - Hard Copies",
    dueDate: "24 Mar 2023",
    employeeName: "Jennifer Law",
    employeeAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    type: "Onboarding",
    completed: false,
    description: "Collect all necessary hard-copy documents from the new hire:\n1. ID card photocopies.\n2. Health check record."
  },
  {
    id: 2,
    taskName: "Upload signed work contract",
    dueDate: "21 Jan 2023",
    employeeName: "Dulce Philips",
    employeeAvatar: "",
    employeeInitials: "DP",
    type: "Onboarding",
    completed: false,
    description: "Please upload the scanned copy of the fully signed employment contract for verification."
  },
  {
    id: 3,
    taskName: "Upload signed work contract",
    dueDate: "10 Jan 2023",
    employeeName: "Miracle Francis",
    employeeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    type: "Onboarding",
    completed: false,
    description: "Please upload the scanned copy of the fully signed employment contract for verification."
  },
  {
    id: 4,
    taskName: "Collect Documents - Hard Copies",
    dueDate: "01 Jan 2022",
    employeeName: "Davis Curtis",
    employeeAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    type: "Onboarding",
    completed: false,
    description: "Collect all necessary hard-copy documents from the new hire:\n1. ID card photocopies.\n2. Health check record."
  },
];

type SortOrder = "asc" | "desc";

export default function ChecklistToDosPage() {
  const [tasks, setTasks] = React.useState<ChecklistTask[]>(INITIAL_TASKS);
  const [statusFilter, setStatusFilter] = React.useState<"In Progress" | "Completed">("In Progress");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("asc");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<ChecklistTask | null>(null);
  const [isNewTaskOpen, setIsNewTaskOpen] = React.useState(false);

  const handleToggleTask = (id: number) => {
    // Toggle completion status with a slight delay for positive UI transition feel
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    }, 250);
  };

  const handleCreateTask = (taskData: {
    taskName: string;
    dueDate: string;
    employeeName: string;
    description: string;
  }) => {
    const initials = taskData.employeeName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    const newTask: ChecklistTask = {
      id: tasks.length + 1,
      taskName: taskData.taskName,
      dueDate: taskData.dueDate,
      employeeName: taskData.employeeName,
      employeeAvatar: "",
      employeeInitials: initials || "EE",
      type: "Onboarding",
      completed: false,
      description: taskData.description,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleSortDueDate = () => {
    const isAsc = sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");

    setTasks((prev) => {
      return [...prev].sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return isAsc ? dateA - dateB : dateB - dateA;
      });
    });
  };

  // Filter tasks based on search bar and dropdown status filter
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "Completed" ? task.completed : !task.completed;
    const matchesSearch =
      task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header section with title and search filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Checklist - To Dos" description="These are some of the tasks that must be completed" />

        <div className="flex items-center gap-3">
          {/* Custom interactive status select dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2.5 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span>{statusFilter}</span>
              <HiOutlineChevronDown className="text-gray-400 text-sm" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl z-50 overflow-hidden">
                <button
                  onClick={() => {
                    setStatusFilter("In Progress");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  In Progress
                </button>
                <button
                  onClick={() => {
                    setStatusFilter("Completed");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Completed
                </button>
              </div>
            )}
          </div>

          {/* Search bar input field */}
          <div className="relative w-64">
            <Input
              placeholder="Search what you need."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl pl-4 pr-10 placeholder:text-gray-300"
            />
            <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
          </div>

          {/* Add Task Trigger Button */}
          <button
            onClick={() => setIsNewTaskOpen(true)}
            className="h-11 px-4 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
          >
            <HiPlus className="text-sm" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Main Checklist Card wrapper */}
      <Card className="p-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider w-[50%]">
                  Task
                </TableHead>

                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <div
                    onClick={handleSortDueDate}
                    className="flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <span>Due Date</span>
                    <HiOutlineChevronUpDown className="text-sm" />
                  </div>
                </TableHead>

                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Checklist
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="border-b border-gray-50 dark:border-gray-800/80 hover:bg-gray-50/20 dark:hover:bg-gray-800/10 cursor-pointer"
                >
                  {/* Task name with circular checkbox */}
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="relative flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTask(task.id)}
                          className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-all flex items-center justify-center"
                        />
                        {task.completed && (
                          <svg
                            className="w-3 h-3 text-white absolute pointer-events-none"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-xs font-bold transition-all ${
                          task.completed
                            ? "text-gray-400 line-through dark:text-gray-550"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {task.taskName}
                      </span>
                    </div>
                  </TableCell>

                  {/* Due Date */}
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500">
                      <HiOutlineCalendarDays className="text-base text-gray-350 dark:text-gray-500" />
                      <span>{task.dueDate}</span>
                    </div>
                  </TableCell>

                  {/* Checklist User Info */}
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      {task.employeeAvatar ? (
                        <Avatar
                          src={task.employeeAvatar}
                          size="sm"
                          className="rounded-full w-7 h-7"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                          {task.employeeInitials}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                          {task.employeeName}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 leading-none mt-0.5">
                          {task.type}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="py-12 text-center text-xs text-gray-400 dark:text-gray-500">
                    No checklists found for this status.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer with Pagination and selector controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              <HiOutlineChevronLeft className="text-xs" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              <HiOutlineChevronRight className="text-xs" />
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 dark:text-gray-500">
            <span>Showing 1 to 10 of {filteredTasks.length} entries</span>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-800 cursor-pointer select-none">
              <span>Show 10</span>
              <HiOutlineChevronDown className="text-xs text-gray-500" />
            </div>
          </div>
        </div>
      </Card>

      {/* Checklist Detail Drawer */}
      <ChecklistDetailDrawer
        isOpen={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onMarkAsComplete={handleToggleTask}
      />

      {/* New Task Creator Drawer */}
      <NewTaskDrawer
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
}
