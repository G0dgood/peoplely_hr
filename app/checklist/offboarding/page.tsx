"use client";

import * as React from "react";
import {
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineMagnifyingGlass,
  HiOutlineLink,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";


interface OffboardingTask {
  id: number;
  taskName: string;
  dueDate: string;
  completed: boolean;
}

interface OffboardingEmployee {
  id: number;
  name: string;
  avatar: string;
  initials?: string;
  lastWorkingDate: string;
  office: string; // e.g. "Unpixel Office", "HQ"
  tasks: OffboardingTask[];
}

const INITIAL_OFFBOARDING: OffboardingEmployee[] = [
  {
    id: 1,
    name: "Gustavo Lubin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    lastWorkingDate: "23 Feb, 2023",
    office: "Unpixel Office",
    tasks: [
      { id: 1, taskName: "Handover department files", dueDate: "20 Feb 2023", completed: true },
      { id: 2, taskName: "Revoke internal access keys", dueDate: "21 Feb 2023", completed: true },
      { id: 3, taskName: "Deactivate employee email", dueDate: "22 Feb 2023", completed: true },
      { id: 4, taskName: "Return office equipment & laptop", dueDate: "22 Feb 2023", completed: true },
      { id: 5, taskName: "Conduct exit interview", dueDate: "23 Feb 2023", completed: true },
      { id: 6, taskName: "Review non-disclosure agreement", dueDate: "23 Feb 2023", completed: false },
      { id: 7, taskName: "Clear final expense claims", dueDate: "24 Feb 2023", completed: false },
      { id: 8, taskName: "Settle final severance pay", dueDate: "25 Feb 2023", completed: false },
      { id: 9, taskName: "Update HR organizational chart", dueDate: "26 Feb 2023", completed: false },
      { id: 10, taskName: "Send farewell communication", dueDate: "28 Feb 2023", completed: false },
    ],
  },
  {
    id: 2,
    name: "Jennifer Law",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    lastWorkingDate: "23 Feb, 2023",
    office: "Unpixel Office",
    tasks: [
      { id: 1, taskName: "Handover department files", dueDate: "20 Feb 2023", completed: true },
      { id: 2, taskName: "Revoke internal access keys", dueDate: "21 Feb 2023", completed: true },
      { id: 3, taskName: "Deactivate employee email", dueDate: "22 Feb 2023", completed: true },
      { id: 4, taskName: "Return office equipment & laptop", dueDate: "22 Feb 2023", completed: true },
      { id: 5, taskName: "Conduct exit interview", dueDate: "23 Feb 2023", completed: true },
      { id: 6, taskName: "Review non-disclosure agreement", dueDate: "23 Feb 2023", completed: true },
      { id: 7, taskName: "Clear final expense claims", dueDate: "24 Feb 2023", completed: true },
      { id: 8, taskName: "Settle final severance pay", dueDate: "25 Feb 2023", completed: true },
      { id: 9, taskName: "Update HR organizational chart", dueDate: "26 Feb 2023", completed: true },
      { id: 10, taskName: "Send farewell communication", dueDate: "28 Feb 2023", completed: true },
    ],
  },
];

export default function OffboardingChecklistPage() {
  const [employees, setEmployees] = React.useState<OffboardingEmployee[]>(INITIAL_OFFBOARDING);
  const [officeFilter, setOfficeFilter] = React.useState<string>("Unpixel Office");
  const [statusFilter, setStatusFilter] = React.useState<"In Progress" | "Completed" | "All">("In Progress");
  const [searchQuery, setSearchQuery] = React.useState("");

  const [expandedIds, setExpandedIds] = React.useState<number[]>([1]); // default expand Gustavo Lubin (id 1)
  const [isOfficeDropdownOpen, setIsOfficeDropdownOpen] = React.useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = React.useState(false);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleTask = (employeeId: number, taskId: number) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id !== employeeId) return emp;
        return {
          ...emp,
          tasks: emp.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      })
    );
  };

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    // Office filter
    const matchesOffice = officeFilter === "All Offices" || emp.office === officeFilter;

    // Search query filter
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const completedTasksCount = emp.tasks.filter((t) => t.completed).length;
    const isCompleted = completedTasksCount === emp.tasks.length;
    const matchesStatus =
      statusFilter === "All"
        ? true
        : statusFilter === "Completed"
        ? isCompleted
        : !isCompleted;

    return matchesOffice && matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Checklist - Offboarding" description="These are some of the tasks that must be completed" />

        <div className="flex items-center gap-3">
          {/* Office Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOfficeDropdownOpen(!isOfficeDropdownOpen)}
              className="flex items-center justify-between gap-2.5 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span>{officeFilter}</span>
              <HiOutlineChevronDown className="text-gray-400 text-sm" />
            </button>

            {isOfficeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg z-50 overflow-hidden">
                {["All Offices", "Unpixel Office", "HQ"].map((office) => (
                  <button
                    key={office}
                    onClick={() => {
                      setOfficeFilter(office);
                      setIsOfficeDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-350 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {office}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="flex items-center justify-between gap-2.5 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span>{statusFilter}</span>
              <HiOutlineChevronDown className="text-gray-400 text-sm" />
            </button>

            {isStatusDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg z-50 overflow-hidden">
                {["All", "In Progress", "Completed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status as "In Progress" | "Completed" | "All");
                      setIsStatusDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-350 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search bar input field */}
          <div className="relative w-64">
            <Input
              placeholder="Search what you need"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl pl-4 pr-10 placeholder:text-gray-300"
            />
            <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
          </div>
        </div>
      </div>

      {/* Accordion Employee List */}
      <div className="flex flex-col gap-4">
        {filteredEmployees.map((emp) => {
          const completedCount = emp.tasks.filter((t) => t.completed).length;
          const totalCount = emp.tasks.length;
          const progressPercent = Math.round((completedCount / totalCount) * 100);
          const isExpanded = expandedIds.includes(emp.id);

          // Progress color helpers
          let progressColor = "bg-red-500";
          let progressTextColor = "text-red-500";
          let dotColor = "bg-red-500";

          if (progressPercent >= 70) {
            progressColor = "bg-emerald-500";
            progressTextColor = "text-emerald-500";
            dotColor = "bg-emerald-500";
          } else if (progressPercent >= 40) {
            progressColor = "bg-amber-500";
            progressTextColor = "text-amber-500";
            dotColor = "bg-amber-500";
          }

          return (
            <Card
              key={emp.id}
              className="border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 overflow-hidden flex flex-col transition-all duration-300 rounded-2xl"
            >
              {/* Accordion Header Row */}
              <div
                onClick={() => toggleExpand(emp.id)}
                className="flex items-center justify-between p-6 cursor-pointer select-none hover:bg-gray-50/20 dark:hover:bg-gray-800/10 transition-colors gap-6"
              >
                {/* Left side info */}
                <div className="flex items-center gap-4">
                  <div className="text-gray-400 hover:text-gray-600 transition-colors">
                    {isExpanded ? (
                      <HiOutlineChevronDown className="text-lg" />
                    ) : (
                      <HiOutlineChevronRight className="text-lg" />
                    )}
                  </div>

                  {emp.avatar ? (
                    <Avatar src={emp.avatar} size="md" className="rounded-full w-10 h-10" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#E8FAF4] dark:bg-[#0FAF7A]/10 text-[#0FAF7A] flex items-center justify-center text-xs font-bold">
                      {emp.initials}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                      {emp.name}
                    </span>
                    <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-gray-400 dark:text-gray-500">
                      <span>Last Working Date</span>
                      <span className="text-gray-350 dark:text-gray-650">:</span>
                      <span>{emp.lastWorkingDate}</span>
                    </div>
                  </div>
                </div>

                {/* Right side progress section */}
                <div className="flex items-center gap-6">
                  {/* Progress Info */}
                  <div className="flex items-center gap-4">
                    {/* Status Dot + Progress Percent */}
                    <div className="flex items-center gap-2 min-w-[60px]">
                      <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                      <span className={`text-xs font-bold ${progressTextColor}`}>
                        {progressPercent}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    {/* Completed fraction */}
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 hidden sm:inline">
                      {completedCount}/{totalCount} Completed
                    </span>
                  </div>

                  {/* Actions / Link Button */}
                  <button
                    className="w-8 h-8 rounded-lg bg-blue-500 text-white hover:opacity-90 transition-opacity flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <HiOutlineLink className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Accordion Expanded Task List */}
              {isExpanded && (
                <div className="border-t border-gray-50 dark:border-gray-800 bg-gray-50/[0.04] p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-50 dark:border-gray-800/80">
                          <th className="py-3 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider w-[60%]">
                            Task
                          </th>
                          <th className="py-3 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                            Due Date
                          </th>
                          <th className="py-3 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {emp.tasks.map((task) => (
                          <tr
                            key={task.id}
                            className="border-b border-gray-50 dark:border-gray-800/40 last:border-none hover:bg-gray-50/[0.02]"
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="relative flex items-center justify-center">
                                  <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleTask(emp.id, task.id)}
                                    className="w-4.5 h-4.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-all flex items-center justify-center"
                                  />
                                  {task.completed && (
                                    <svg
                                      className="w-2.5 h-2.5 text-white absolute pointer-events-none"
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
                                      ? "text-gray-400 line-through dark:text-gray-555"
                                      : "text-gray-900 dark:text-white"
                                  }`}
                                >
                                  {task.taskName}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-xs font-bold text-gray-400 dark:text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <HiOutlineCalendarDays className="text-sm text-gray-350" />
                                <span>{task.dueDate}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  task.completed
                                    ? "bg-emerald-500/10 text-emerald-500"
                                    : "bg-amber-500/10 text-amber-500"
                                }`}
                              >
                                {task.completed ? "Done" : "Pending"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
        {filteredEmployees.length === 0 && (
          <div className="py-16 text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500">
            No offboarding employees found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
