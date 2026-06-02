"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { AddWorkScheduleDrawer } from "@/components/ui/drawer";
import { DeleteModal } from "@/components/ui/modal/delete-modal";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";
import { TableActions } from "@/components/ui/table-actions";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import {
  useGetWorkSchedulesQuery,
  useCreateWorkScheduleMutation,
  useUpdateWorkScheduleMutation,
  useDeleteWorkScheduleMutation,
  WorkSchedule,
} from "@/store/services/workScheduleApi";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "sonner";
import {
  HiOutlineMagnifyingGlass,
  HiPlus,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";

export default function WorkSchedulePage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const { data, isLoading, error } = useGetWorkSchedulesQuery({ companyId }, { skip: !companyId });
  const [createSchedule, { isLoading: isCreating, error: createError }] = useCreateWorkScheduleMutation();
  const [updateSchedule, { isLoading: isUpdating, error: updateError }] = useUpdateWorkScheduleMutation();
  const [deleteSchedule, { isLoading: isDeleting, error: deleteError }] = useDeleteWorkScheduleMutation();

  const schedules = data?.workSchedules || [];

  const [search, setSearch] = React.useState("");
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  useApiError(!!error, error, "Failed to load work schedules");
  useApiError(!!createError, createError, "Failed to create work schedule");
  useApiError(!!updateError, updateError, "Failed to update work schedule");
  useApiError(!!deleteError, deleteError, "Failed to delete work schedule");

  // Auto-expand first schedule on load
  React.useEffect(() => {
    if (schedules.length > 0 && expanded.length === 0) {
      setExpanded([schedules[0].id]);
    }
  }, [schedules.length]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleToggleActive = async (schedule: WorkSchedule) => {
    try {
      await updateSchedule({
        id: schedule.id,
        body: { active: !schedule.active },
      }).unwrap();
      toast.success(
        `"${schedule.title}" is now ${!schedule.active ? "active" : "inactive"}.`
      );
    } catch {
      // handled by useApiError
    }
  };

  const handleCreate = async (formData: {
    title: string;
    scheduleType: string;
    standardHours: string;
    effectiveFrom: string;
    totalHours: string;
    dailyHours: { day: string; hours: string; active: boolean }[];
  }) => {
    try {
      await createSchedule({
        title: formData.title,
        standardHours: formData.standardHours,
        effectiveFrom: formData.effectiveFrom,
        type: formData.scheduleType === "clock" ? "Clock-based" : "Duration-based",
        totalHours: formData.totalHours,
        dailyHours: formData.dailyHours,
        companyId,
      }).unwrap();
      toast.success(`Work schedule "${formData.title}" created successfully!`);
      setIsAddOpen(false);
    } catch {
      // handled by useApiError
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      const schedule = schedules.find((s) => s.id === deleteId);
      await deleteSchedule(deleteId).unwrap();
      toast.success(`Work schedule deleted successfully.`);
      if (schedule) {
        setExpanded((prev) => prev.filter((id) => id !== deleteId));
      }
    } catch {
      // handled by useApiError
    } finally {
      setDeleteId(null);
    }
  };

  const filteredSchedules = React.useMemo(() => {
    if (!search.trim()) return schedules;
    return schedules.filter((s) =>
      s.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [schedules, search]);

  const selectedDelete = schedules.find((s) => s.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-300 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Work Schedule
        </h2>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-64">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search schedule"
              className="w-full h-10 pl-4 pr-10 text-xs font-semibold rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <HiOutlineMagnifyingGlass className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>
          {/* Add New Button */}
          <button
            onClick={() => setIsAddOpen(true)}
            className="h-10 px-4 rounded-xl bg-[#11131A] dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <HiPlus className="text-base" />
            Add New
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 md:p-8 flex-1 overflow-y-auto flex flex-col gap-6">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <SVGLoaderFetch text="Loading work schedules..." asTable={false} />
          </div>
        ) : filteredSchedules.length === 0 ? (
          <div className="flex justify-center py-16">
            <NoRecordFound text="No work schedules found." asTable={false} />
          </div>
        ) : (
          filteredSchedules.map((schedule) => {
            const isExpanded = expanded.includes(schedule.id);

            return (
              <div
                key={schedule.id}
                className="border border-gray-300 dark:border-gray-800/80 rounded-2xl bg-white dark:bg-gray-900 shadow-xs overflow-hidden transition-all"
              >
                {/* Card Header */}
                <div
                  onClick={() => toggleExpand(schedule.id)}
                  className="flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {schedule.title}
                    </span>
                    {schedule.isDefault && (
                      <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleActive(schedule);
                      }}
                    >
                      <Toggle
                        checked={schedule.active}
                        onChange={() => {}}
                      />
                    </div>

                    <div onClick={(e) => e.stopPropagation()}>
                      <TableActions
                        onDelete={() => setDeleteId(schedule.id)}
                      />
                    </div>

                    <div className="text-gray-400 dark:text-gray-500">
                      {isExpanded ? (
                        <HiChevronDown className="text-lg" />
                      ) : (
                        <HiChevronUp className="text-lg" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body (Expanded) */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 dark:border-gray-800/50">
                    <div className="flex flex-col md:flex-row gap-8 max-w-4xl">
                      {/* Left Column */}
                      <div className="flex-1 flex flex-col gap-5">
                        <div className="flex items-start">
                          <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                            Standard working hours/day
                          </span>
                          <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                            {schedule.standardHours}
                          </span>
                        </div>

                        <div className="flex items-start">
                          <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                            Effective from
                          </span>
                          <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                            {schedule.effectiveFrom}
                          </span>
                        </div>

                        <div className="flex items-start">
                          <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                            Schedule type
                          </span>
                          <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                            {schedule.type}
                          </span>
                        </div>

                        <div className="flex items-start">
                          <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                            Total working hours/week
                          </span>
                          <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                            {schedule.totalHours}
                          </span>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="flex-1 flex items-start">
                        <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                          Daily working hours
                        </span>
                        <div className="w-1/2 flex flex-col gap-3">
                          {schedule.dailyHours.map((dh, idx) => (
                            <div key={idx} className="flex justify-between items-center max-w-[140px]">
                              <span className="text-xs font-bold text-gray-900 dark:text-white">
                                {dh.day}
                              </span>
                              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                                {dh.hours}
                              </span>
                            </div>
                          ))}
                          {schedule.dailyHours.length === 0 && (
                            <span className="text-xs text-gray-400 dark:text-gray-500">No days configured</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Work Schedule Drawer */}
      <AddWorkScheduleDrawer
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onCreate={handleCreate}
        isLoading={isCreating}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedDelete?.title}
        isLoading={isDeleting}
        description="Deleting this work schedule will remove it permanently. Employees assigned to it will not be affected. Are you sure you want to proceed?"
      />
    </div>
  );
}
