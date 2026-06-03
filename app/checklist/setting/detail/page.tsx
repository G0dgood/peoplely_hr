"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineMagnifyingGlass,
  HiOutlineChevronRight,
  HiOutlineLink,
  HiOutlineTrash,
  HiOutlinePlus,
} from "react-icons/hi2";
import { EditTaskDrawer, NewTemplateTaskDrawer } from "@/components/ui/drawer";
import { DeleteModal } from "@/components/ui/modal";
import { motion, AnimatePresence } from "framer-motion";
import { useGetTemplateTasksQuery,
  useGetChecklistTemplateQuery,
  useCreateTemplateTaskMutation,
  useUpdateTemplateTaskMutation,
  useDeleteTemplateTaskMutation,
  TemplateTask,
} from "@/store/services/checklistTemplatesApi";
import { SVGLoaderFetch } from "@/components/ui/options";
import { Suspense } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { useApiError } from "@/hooks/useApiError";
import { TemplateTasksSkeleton } from "@/components/ui/skeleton/template-tasks-skeleton";
import { toast } from "sonner";

function ChecklistSettingDetailContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("id") || "";
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedTaskId, setExpandedTaskId] = React.useState<string | null>(null);
  const [editingTask, setEditingTask] = React.useState<TemplateTask | null>(null);
  const [isNewTaskOpen, setIsNewTaskOpen] = React.useState(false);
  const [taskToDelete, setTaskToDelete] = React.useState<TemplateTask | null>(null);

  const { data, isLoading, error: loadError } = useGetTemplateTasksQuery(templateId, { skip: !templateId });
  const { data: templateData } = useGetChecklistTemplateQuery(templateId, { skip: !templateId });
  const [createTemplateTask, { error: createError }] = useCreateTemplateTaskMutation();
  const [updateTemplateTask, { error: updateError }] = useUpdateTemplateTaskMutation();
  const [deleteTemplateTask, { isLoading: isDeletingTask, error: deleteError }] = useDeleteTemplateTaskMutation();

  const templateMeta = templateData?.checklistTemplate;
  const templateType = templateMeta?.type ?? "";
  const templateTypeCap = templateType
    ? templateType.charAt(0).toUpperCase() + templateType.slice(1)
    : "";
  const templateLabel = templateTypeCap ? `${templateTypeCap} Template` : "Template";

  useApiError(!!loadError, loadError, "Failed to load template tasks");
  useApiError(!!createError, createError, "Failed to create task");
  useApiError(!!updateError, updateError, "Failed to update task");
  useApiError(!!deleteError, deleteError, "Failed to delete task");

  const tasks = data?.tasks || [];

  React.useEffect(() => {
    if (tasks.length > 0 && expandedTaskId === null) {
      setExpandedTaskId(tasks[0].id);
    }
  }, [tasks, expandedTaskId]);

  const toggleExpand = (id: string) => {
    setExpandedTaskId((prev) => (prev === id ? null : id));
  };



  const handleSaveTask = async (updatedData: {
    name: string;
    tag: "CHECKLIST" | "UPLOAD" | "EMPLOYEE INFORMATION";
    assignee: string;
    dueDate: string;
    description: string;
  }) => {
    if (!editingTask) return;
    try {
      await updateTemplateTask({
        id: editingTask.id,
        templateId,
        ...updatedData,
      }).unwrap();
      toast.success("Task updated successfully!");
      setEditingTask(null);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleCreateTask = async (taskData: {
    name: string;
    tag: "CHECKLIST" | "UPLOAD" | "EMPLOYEE INFORMATION";
    assignee: string;
    dueDate: string;
    description: string;
  }) => {
    try {
      await createTemplateTask({
        templateId,
        ...taskData,
      }).unwrap();
      toast.success("Task created successfully!");
    } catch (err) {
      console.error("Failed to create task:", err);
      throw err;
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header section with breadcrumbs and search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setting Checklist</h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mt-1.5">
            <Link
              href="/checklist/setting"
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {templateLabel}
            </Link>
            <HiOutlineChevronRight className="text-[10px] text-gray-300" />
            <span className="text-gray-900 dark:text-white font-bold">
              {templateMeta?.name ?? "Detail"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative w-72">
            <Input
              placeholder="Search what you need"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-xl pl-4 pr-10 placeholder:text-gray-300"
            />
            <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
          </div>

          {/* New Task Trigger Button */}
          <button
            onClick={() => setIsNewTaskOpen(true)}
            className="h-11 px-4 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HiOutlinePlus className="text-sm font-bold" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* List of Accordion Tasks */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <TemplateTasksSkeleton />
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-xs font-semibold bg-white dark:bg-gray-900 rounded-2xl border border-gray-50/50 dark:border-gray-800/40">
            No tasks found matching your search.
          </div>
        ) : (
          filteredTasks.map((task) => {
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
                      className="w-8 h-8 rounded-lg bg-blue-500 hover:opacity-90 text-white flex items-center justify-center transition-opacity cursor-pointer"
                    >
                      <HiOutlineLink className="text-sm font-bold" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTaskToDelete(task);
                      }}
                      className="w-8 h-8 rounded-lg bg-red-500 hover:opacity-90 text-white flex items-center justify-center transition-opacity cursor-pointer"
                    >
                      <HiOutlineTrash className="text-sm font-bold" />
                    </button>
                  </div>
                </div>

                {/* Accordion Expanded Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })
        )}
      </div>

      <EditTaskDrawer
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        onSave={handleSaveTask}
        companyId={companyId}
      />

      <NewTemplateTaskDrawer
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onSave={handleCreateTask}
        companyId={companyId}
      />

      <DeleteModal
        isOpen={taskToDelete !== null}
        onClose={() => setTaskToDelete(null)}
        onConfirm={async () => {
          if (taskToDelete) {
            try {
              await deleteTemplateTask({ id: taskToDelete.id, templateId }).unwrap();
              toast.success("Task deleted successfully!");
              setTaskToDelete(null);
            } catch (err) {
              console.error("Failed to delete task:", err);
            }
          }
        }}
        itemName={taskToDelete?.name}
        title="Delete Task"
        isLoading={isDeletingTask}
      />
    </div>
  );
}

export default function ChecklistSettingDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setting Checklist</h1>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-1.5" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-72 h-11 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-xl animate-pulse" />
              <div className="w-24 h-11 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            </div>
          </div>
          <TemplateTasksSkeleton />
        </div>
      }
    >
      <ChecklistSettingDetailContent />
    </Suspense>
  );
}
