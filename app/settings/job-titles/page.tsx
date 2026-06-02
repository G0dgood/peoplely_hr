"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { CreateJobTitleModal } from "@/components/ui/modal/create-job-title-modal";
import { DeleteModal } from "@/components/ui/modal/delete-modal";
import { TableActions } from "@/components/ui/table-actions";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";
import { toast } from "sonner";
import { useApiError } from "@/hooks/useApiError";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";
import {
  useGetJobTitlesQuery,
  useCreateJobTitleMutation,
  useUpdateJobTitleMutation,
  useDeleteJobTitleMutation,
  JobTitle
} from "@/store/services/jobTitleApi";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import {
  HiOutlineMagnifyingGlass,
  HiPlus,
  HiChevronUpDown,
} from "react-icons/hi2";

export default function JobTitlesPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const { data: empData, isLoading: isEmployeesLoading, error: employeesError } = useGetEmployeesQuery({ companyId });
  const employees = empData?.employees || [];

  const { data: jobsData, isLoading: isJobsLoading, error: jobsError } = useGetJobTitlesQuery({ companyId });
  const jobs = jobsData?.jobTitles || [];

  const [createJobTitle, { error: createError, isLoading: isCreating }] = useCreateJobTitleMutation();
  const [updateJobTitle, { error: updateError, isLoading: isUpdating }] = useUpdateJobTitleMutation();
  const [deleteJobTitle, { error: deleteError, isLoading: isDeleting }] = useDeleteJobTitleMutation();

  const [search, setSearch] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingJob, setEditingJob] = React.useState<JobTitle | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc" | null>(null);

  const isLoading = isEmployeesLoading || isJobsLoading;

  // Set up API error listeners
  useApiError(!!employeesError, employeesError, "Failed to load employees");
  useApiError(!!jobsError, jobsError, "Failed to load job titles");
  useApiError(!!createError, createError, "Failed to create job title");
  useApiError(!!updateError, updateError, "Failed to update job title");
  useApiError(!!deleteError, deleteError, "Failed to delete job title");

  const getJobEmployeesCount = (jobTitleName: string) => {
    return employees.filter(e => e.role.toLowerCase() === jobTitleName.toLowerCase()).length;
  };

  const handleSaveJobTitle = async (formData: { title: string }) => {
    try {
      if (editingJob) {
        await updateJobTitle({
          id: editingJob.id,
          body: {
            title: formData.title,
          }
        }).unwrap();
        toast.success(`Job title "${formData.title}" updated successfully!`);
      } else {
        await createJobTitle({
          title: formData.title,
          companyId,
        }).unwrap();
        toast.success(`Job title "${formData.title}" created successfully!`);
      }
      setIsModalOpen(false);
    } catch (err) {
      // Handled by useApiError
    } finally {
      setEditingJob(null);
    }
  };

  const handleToggleActive = async (job: JobTitle) => {
    try {
      await updateJobTitle({
        id: job.id,
        body: {
          active: !job.active
        }
      }).unwrap();
      toast.success(`Job title "${job.title}" is now ${!job.active ? "active" : "inactive"}.`);
    } catch (err) {
      // Handled by useApiError
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await deleteJobTitle(deleteId).unwrap();
        toast.success("Job title deleted successfully.");
      } catch (err) {
        // Handled by useApiError
      }
      setDeleteId(null);
    }
  };

  const handleSort = () => {
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredJobs = React.useMemo(() => {
    let result = jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder) {
      result = [...result].sort((a, b) => {
        const countA = getJobEmployeesCount(a.title);
        const countB = getJobEmployeesCount(b.title);
        return sortOrder === "asc" ? countA - countB : countB - countA;
      });
    }

    return result;
  }, [jobs, search, sortOrder, employees]);

  const selectedDeleteJob = jobs.find(j => j.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-300 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Job Titles
        </h2>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-64">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job title"
              className="w-full h-10 pl-4 pr-10 text-xs font-semibold rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <HiOutlineMagnifyingGlass className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>
          {/* Add New Button */}
          <button
            onClick={() => {
              setEditingJob(null);
              setIsModalOpen(true);
            }}
            className="h-10 px-4 rounded-xl bg-[#11131A] dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <HiPlus className="text-base" />
            Add New
          </button>
        </div>
      </div>

      {/* Content Area / Table */}
      <div className="p-4 md:p-8 flex-1 overflow-x-auto">
        <div className="min-w-[700px] flex flex-col">
          {/* Table Header */}
          <div className="flex items-center pb-4 border-b border-gray-300 dark:border-gray-800 text-xs font-bold text-gray-400 dark:text-gray-500">
            <div className="flex-[2]">Job Title</div>
            <div className="flex-[2] flex items-center gap-1">
              Number of Employees
              <HiChevronUpDown className="text-sm cursor-pointer hover:text-gray-700" onClick={handleSort} />
            </div>
            <div className="flex-1 text-center">Active</div>
            <div className="flex-1 text-right">Action</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
            {isLoading ? (
              <div className="py-12 flex justify-center">
                <SVGLoaderFetch colSpan={1} text="Loading job titles..." asTable={false} />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="py-12 flex justify-center">
                <NoRecordFound colSpan={1} text="No job titles found." asTable={false} />
              </div>
            ) : (
              filteredJobs.map((job, index) => {
                const count = getJobEmployeesCount(job.title);
                return (
                  <div
                    key={job.id}
                    className={`flex items-center py-4 ${
                      index !== filteredJobs.length - 1
                        ? "border-b border-gray-50 dark:border-gray-800/50"
                        : ""
                    }`}
                  >
                    {/* Job Title */}
                    <div className="flex-[2] text-xs font-bold text-gray-900 dark:text-white">
                      {job.title}
                    </div>

                    {/* Number of Employees */}
                    <div className="flex-[2] text-xs font-bold text-gray-900 dark:text-white">
                      {count}
                    </div>

                    {/* Active Toggle */}
                    <div className="flex-1 flex justify-center">
                      <Toggle checked={job.active} onChange={() => handleToggleActive(job)} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex-1 flex items-center justify-end gap-2">
                      <TableActions
                        onEdit={() => {
                          setEditingJob(job);
                          setIsModalOpen(true);
                        }}
                        onDelete={() => setDeleteId(job.id)}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <CreateJobTitleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
        onCreate={handleSaveJobTitle}
        initialData={editingJob}
        isLoading={isCreating || isUpdating}
      />

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedDeleteJob?.title}
        isLoading={isDeleting}
        description="Deleting this job title will not delete its associated employees, but their job title details will remain active in database records. Are you sure you want to proceed?"
      />
    </div>
  );
}
