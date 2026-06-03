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

import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import {
  useGetChecklistTasksQuery,
  useUpdateChecklistTaskMutation,
  ChecklistTask,
} from "@/store/services/checklistTasksApi";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "sonner";
import { SVGLoaderFetch } from "@/components/ui/options";
import { useGetOfficesQuery } from "@/store/services/officeApi";

export default function OffboardingChecklistPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const [officeFilter, setOfficeFilter] = React.useState<string>("All Offices");
  const [statusFilter, setStatusFilter] = React.useState<"In Progress" | "Completed" | "All">("In Progress");
  const [searchQuery, setSearchQuery] = React.useState("");

  const [expandedIds, setExpandedIds] = React.useState<string[]>([]);
  const [isOfficeDropdownOpen, setIsOfficeDropdownOpen] = React.useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = React.useState(false);

  const { data: empData, isLoading: isLoadingEmployees, error: empError } = useGetEmployeesQuery(
    { companyId },
    { skip: !companyId }
  );

  const { data: taskData, isLoading: isLoadingTasks, error: taskError } = useGetChecklistTasksQuery(
    { companyId },
    { skip: !companyId }
  );

  const { data: officesData, isLoading: isLoadingOffices, error: officeError } = useGetOfficesQuery(
    { companyId },
    { skip: !companyId }
  );

  const [updateChecklistTask, { error: updateError }] = useUpdateChecklistTaskMutation();

  useApiError(!!empError, empError, "Failed to load employees");
  useApiError(!!taskError, taskError, "Failed to load checklist tasks");
  useApiError(!!officeError, officeError, "Failed to load offices");
  useApiError(!!updateError, updateError, "Failed to update task status");

  const officeOptions = React.useMemo(() => {
    return ["All Offices", ...(officesData?.offices.map((o) => o.name) || [])];
  }, [officesData]);

  const employeesList = empData?.employees || [];
  const checklistTasks = taskData?.checklistTasks || [];

  // Filter tasks belonging to offboarding
  const offboardingTasks = React.useMemo(() => {
    return checklistTasks.filter((t) => t.type.toLowerCase() === "offboarding");
  }, [checklistTasks]);

  // Group offboarding tasks by employeeName
  const groupedEmployees = React.useMemo(() => {
    const map = new Map<string, ChecklistTask[]>();
    for (const t of offboardingTasks) {
      const list = map.get(t.employeeName) || [];
      list.push(t);
      map.set(t.employeeName, list);
    }

    const result = Array.from(map.entries()).map(([employeeName, tasks], index) => {
      // Find employee details if exists
      const emp = employeesList.find((e) => e.name.toLowerCase() === employeeName.toLowerCase());
      
      const initials = employeeName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const lastWorkingDate = emp
        ? new Date(emp.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "N/A";

      return {
        id: emp?.id || `temp-${index}`,
        name: employeeName,
        avatar: emp?.avatar || "",
        initials: initials || "EE",
        lastWorkingDate,
        office: emp?.office || "HQ",
        tasks,
      };
    });

    return result;
  }, [offboardingTasks, employeesList]);

  // Auto-expand the first employee on load
  React.useEffect(() => {
    if (groupedEmployees.length > 0 && expandedIds.length === 0) {
      setExpandedIds([groupedEmployees[0].id]);
    }
  }, [groupedEmployees, expandedIds]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleTask = async (employeeId: string | number, taskId: string) => {
    const taskToToggle = offboardingTasks.find((t) => t.id === taskId);
    if (!taskToToggle) return;
    try {
      const isCompleting = !taskToToggle.completed;
      await updateChecklistTask({ id: taskId, completed: isCompleting }).unwrap();
      toast.success(
        isCompleting
          ? `Task "${taskToToggle.taskName}" completed successfully!`
          : `Task "${taskToToggle.taskName}" marked as in progress.`
      );
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  // Filter employees based on UI selections
  const filteredEmployees = React.useMemo(() => {
    return groupedEmployees.filter((emp) => {
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
  }, [groupedEmployees, officeFilter, searchQuery, statusFilter]);

  if (isLoadingEmployees || isLoadingTasks || isLoadingOffices) {
    return (
      <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
        <PageHeader title="Checklist - Offboarding" description="These are some of the tasks that must be completed" />
        <div className="flex-1 flex items-center justify-center py-20 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl">
          <SVGLoaderFetch text="Loading offboarding checklists..." asTable={false} />
        </div>
      </div>
    );
  }

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
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl z-50 overflow-hidden">
                {officeOptions.map((office) => (
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
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl z-50 overflow-hidden">
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
          const progressPercent = Math.round((completedCount / totalCount) * 100) || 0;
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
                        <tr >
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
                            className="last:border-none hover:bg-gray-50/[0.02]"
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
