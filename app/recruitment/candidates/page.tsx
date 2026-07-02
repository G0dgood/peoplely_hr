"use client";

import * as React from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineChevronDown,
  HiOutlineTrash,
  HiOutlinePencilSquare,
  HiOutlineCalendar,
  HiOutlineEllipsisVertical,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { DatePicker } from "@/components/ui/date-picker";
import { EditCandidateDrawer } from "@/components/ui/drawer";
import { PageHeader } from "@/components/ui/page-header";
import { RowPerPage } from "@/components/ui/row-per-page";
import { TableActions } from "@/components/ui/table-actions";
import { Pagination } from "@/components/ui/pagination";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";
import { RecruitmentCandidatesSkeleton } from "@/components/ui/skeleton/recruitment-skeletons";
import { useApiError } from "@/hooks/useApiError";
import { useGetCandidatesQuery, useCreateCandidateMutation, useUpdateCandidateMutation, useDeleteCandidateMutation, Candidate } from "@/store/services/recruitmentApi";




function TableStageDropdown({
  stage,
  onChange,
}: {
  stage: string;
  onChange: (s: Candidate["stage"]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const stages: Candidate["stage"][] = [
    "Applied",
    "Screening",
    "1st Interview",
    "2nd Interview",
    "Hiring",
    "Rejected",
  ];

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between min-w-[120px] px-3 py-1.5 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <span>{stage}</span>
        <HiOutlineChevronDown className="text-gray-400 text-xs shrink-0 ml-2" />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-[60] py-1 overflow-hidden">
          {stages.map((s) => (
            <button
              key={s}
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${s === stage
                ? "text-primary bg-primary/5 dark:bg-primary/10"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CandidatesPage() {
  const [search, setSearch] = React.useState("");
  const [selectedRecordFilter, setSelectedRecordFilter] = React.useState("All Record");
  const [selectedLocationFilter, setSelectedLocationFilter] = React.useState("All Location");
  const [selectedStatusFilter, setSelectedStatusFilter] = React.useState("All Status");
  const [dateRange, setDateRange] = React.useState("01 Jan 2023 - 10 Mar 2023");
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCandidate, setEditingCandidate] = React.useState<Candidate | null>(null);

  // Pagination states
  const [pageSize, setPageSize] = React.useState(8);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, isLoading, error } = useGetCandidatesQuery({
    search,
    status: selectedStatusFilter
  });
  const [createCandidate, { error: createError }] = useCreateCandidateMutation();
  const [updateCandidate, { error: updateError }] = useUpdateCandidateMutation();
  const [deleteCandidate, { error: deleteError }] = useDeleteCandidateMutation();

  useApiError(!!error, error, "Failed to load candidates");
  useApiError(!!createError, createError, "Failed to create candidate");
  useApiError(!!updateError, updateError, "Failed to update candidate");
  useApiError(!!deleteError, deleteError, "Failed to delete candidate");

  const candidates = data?.candidates || [];

  // Filter logic
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.job.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === "All Status" ||
      c.stage === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalEntries = filteredCandidates.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleStageChange = async (id: string, newStage: string) => {
    try {
      await updateCandidate({ id, stage: newStage }).unwrap();
    } catch (err) {
      // handled by useApiError
    }
  };

  const handleAddOrEditCandidate = async (data: Partial<Candidate>) => {
    try {
      if (editingCandidate) {
        await updateCandidate({ id: editingCandidate.id, ...data }).unwrap();
      } else {
        await createCandidate(data).unwrap();
      }
    } catch (err) {
      // handled by useApiError
    }
    setEditingCandidate(null);
  };

  const handleDeleteCandidate = async (id: string) => {
    if (confirm("Are you sure you want to delete this candidate?")) {
      try {
        await deleteCandidate(id).unwrap();
      } catch (err) {
        // handled by useApiError
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <PageHeader title="Candidates" description="This is the data of all candidates who applied" />
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={() => {
              setEditingCandidate(null);
              setIsModalOpen(true);
            }}
            className="h-11 px-5 bg-[#11131A] dark:bg-white dark:text-gray-900 whitespace-nowrap"
            leftIcon={<HiOutlinePlus className="text-lg" />}
          >
            Add Candidates
          </Button>
        </div>
      </div>

      {/* Filters Card */}
      <Card className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <Input
              placeholder="Search what you need"
              leftIcon={<HiOutlineMagnifyingGlass />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 bg-gray-50/30 dark:bg-gray-800/50"
              containerClassName="flex-1 min-w-[200px]"
            />

            {/* Date Range Selection */}
            <div className="relative">
              <button
                onClick={() => setIsDatePickerOpen(true)}
                className="h-12 px-4 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <span>{dateRange}</span>
                <HiOutlineCalendar className="text-gray-400 text-sm" />
              </button>
              <DatePicker
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSave={(range) => setDateRange(range)}
              />
            </div>

            <Dropdown
              label={selectedRecordFilter}
              options={["All Record", "This Week", "This Month"]}
              onSelect={(opt) => setSelectedRecordFilter(opt)}
            />
            <Dropdown
              label={selectedLocationFilter}
              options={["All Location", "Remote", "London", "San Francisco"]}
              onSelect={(opt) => setSelectedLocationFilter(opt)}
            />
            <Dropdown
              label={selectedStatusFilter}
              options={["All Status", "Applied", "Screening", "Hiring", "Rejected"]}
              onSelect={(opt) => setSelectedStatusFilter(opt)}
            />
            <div className="ml-auto flex items-center">
              <RowPerPage itemsPerPage={pageSize} onItemsPerPageChange={(v) => { setPageSize(v); setCurrentPage(1); }} />
            </div>
          </div>

          {/* Candidates Table */}
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-800">
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Job</th>
                  <th>CV</th>
                  <th>Created Date</th>
                  <th>Stages</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <RecruitmentCandidatesSkeleton />
                ) : paginatedCandidates.length === 0 ? (
                  <NoRecordFound colSpan={7} text="No candidates found." />
                ) : (
                  paginatedCandidates.map((cand) => (
                    <tr
                      key={cand.id}
                      className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-300 dark:border-gray-800"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={cand.avatar} size="sm" />
                          <div>
                            <p className="text-xs font-bold text-gray-900 dark:text-white">
                              {cand.name}
                            </p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500">
                              {cand.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        {cand.phone}
                      </td>
                      <td>
                        {cand.job}
                      </td>
                      <td>
                        {cand.cv !== "-" ? (
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="flex items-center gap-1.5 text-gray-900 dark:text-white font-bold hover:underline"
                          >
                            <svg className="w-3.5 h-3.5 text-gray-450" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            {cand.cv}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                        {cand.createdDate}
                      </td>
                      <td className="py-4 px-4">
                        <TableStageDropdown
                          stage={cand.stage}
                          onChange={(s) => handleStageChange(cand.id, s)}
                        />
                      </td>
                      <td className="py-4 px-4 text-right">
                        <TableActions
                          onEdit={() => {
                            setEditingCandidate(cand);
                            setIsModalOpen(true);
                          }}
                          onDelete={() => handleDeleteCandidate(cand.id)}
                          className="justify-end"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer controls: pagination + entries count */}
          <div className="flex justify-end border-t border-gray-300 dark:border-gray-800 pt-4 mt-2">
            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-0 w-auto"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Add / Edit Drawer */}
      <EditCandidateDrawer
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCandidate(null);
        }}
        onSave={handleAddOrEditCandidate}
        candidate={editingCandidate}
      />
    </div>
  );
}
