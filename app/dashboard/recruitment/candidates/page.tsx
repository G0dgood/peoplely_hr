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
import { EditCandidateModal } from "@/components/ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Candidate {
  id: number;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  job: string;
  cv: string; // "CV.pdf" or "-"
  createdDate: string;
  stage: "Applied" | "Screening" | "1st Interview" | "2nd Interview" | "Hiring" | "Rejected";
}

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 1,
    name: "Pristia Candra",
    email: "lincoln@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=pristia",
    phone: "08092139441",
    job: "Designer",
    cv: "CV.pdf",
    createdDate: "01 Mar 2023",
    stage: "Applied",
  },
  {
    id: 2,
    name: "Hanna Baptista",
    email: "hanna@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=hanna",
    phone: "08092139441",
    job: "Designer",
    cv: "-",
    createdDate: "01 Mar 2023",
    stage: "Screening",
  },
  {
    id: 3,
    name: "Miracle Geidt",
    email: "miracle@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=miracle",
    phone: "08092139441",
    job: "Designer",
    cv: "CV.pdf",
    createdDate: "01 Mar 2023",
    stage: "1st Interview",
  },
  {
    id: 4,
    name: "Rayna Torff",
    email: "rayna@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=rayna",
    phone: "08092139441",
    job: "Designer",
    cv: "-",
    createdDate: "01 Mar 2023",
    stage: "2nd Interview",
  },
  {
    id: 5,
    name: "Giana Lipshutz",
    email: "giana@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=giana",
    phone: "08092139441",
    job: "Designer",
    cv: "-",
    createdDate: "01 Mar 2023",
    stage: "Hiring",
  },
  {
    id: 6,
    name: "James George",
    email: "james@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=james",
    phone: "08092139441",
    job: "Designer",
    cv: "CV.pdf",
    createdDate: "01 Mar 2023",
    stage: "Hiring",
  },
  {
    id: 7,
    name: "Jordyn George",
    email: "jordyn@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=jordyn",
    phone: "08092139441",
    job: "Designer",
    cv: "CV.pdf",
    createdDate: "01 Mar 2023",
    stage: "Rejected",
  },
  {
    id: 8,
    name: "Skylar Herwitz",
    email: "skylar@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=skylar",
    phone: "08092139441",
    job: "Designer",
    cv: "CV.pdf",
    createdDate: "01 Mar 2023",
    stage: "Screening",
  },
];

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
        className="flex items-center justify-between min-w-[120px] px-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <span>{stage}</span>
        <HiOutlineChevronDown className="text-gray-400 text-xs shrink-0 ml-2" />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-800 rounded-xl shadow-xl z-[60] py-1 overflow-hidden">
          {stages.map((s) => (
            <button
              key={s}
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${
                s === stage
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
  const [candidates, setCandidates] = React.useState<Candidate[]>(INITIAL_CANDIDATES);
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

  // Filter logic
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.job.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === "All Status" ||
      (selectedStatusFilter === "Hiring" && c.stage === "Hiring") ||
      (selectedStatusFilter === "Rejected" && c.stage === "Rejected") ||
      (selectedStatusFilter === "Applied" && c.stage === "Applied") ||
      (selectedStatusFilter === "Screening" && c.stage === "Screening");

    return matchesSearch && matchesStatus;
  });

  const totalEntries = filteredCandidates.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleStageChange = (id: number, newStage: Candidate["stage"]) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage: newStage } : c))
    );
  };

  const handleAddOrEditCandidate = (data: Omit<Candidate, "id" | "avatar" | "createdDate">) => {
    if (editingCandidate) {
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === editingCandidate.id
            ? { ...c, ...data }
            : c
        )
      );
    } else {
      const newId = candidates.length > 0 ? Math.max(...candidates.map((c) => c.id)) + 1 : 1;
      setCandidates((prev) => [
        {
          id: newId,
          name: data.name,
          email: data.email,
          avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(data.name)}`,
          phone: data.phone,
          job: data.job,
          cv: data.cv,
          createdDate: "01 Mar 2023",
          stage: data.stage,
        },
        ...prev,
      ]);
    }
    setEditingCandidate(null);
  };

  const handleDeleteCandidate = (id: number) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Candidates</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This is the data of all candidates who applied</p>
        </div>
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
                className="h-12 px-4 border border-gray-250 dark:border-gray-800 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
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
              className="w-40"
            />
            <Dropdown
              label={selectedLocationFilter}
              options={["All Location", "Remote", "London", "San Francisco"]}
              onSelect={(opt) => setSelectedLocationFilter(opt)}
              className="w-40"
            />
            <Dropdown
              label={selectedStatusFilter}
              options={["All Status", "Applied", "Screening", "Hiring", "Rejected"]}
              onSelect={(opt) => setSelectedStatusFilter(opt)}
              className="w-40"
            />
          </div>

          {/* Candidates Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100 dark:border-gray-800">
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Name
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Job
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    CV
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Created Date
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Stages
                  </TableHead>
                  <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCandidates.map((cand) => (
                  <TableRow
                    key={cand.id}
                    className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800"
                  >
                    <TableCell className="py-4 px-4">
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
                    </TableCell>
                    <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">
                      {cand.phone}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">
                      {cand.job}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">
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
                    </TableCell>
                    <TableCell className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                      {cand.createdDate}
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <TableStageDropdown
                        stage={cand.stage}
                        onChange={(s) => handleStageChange(cand.id, s)}
                      />
                    </TableCell>
                    <TableCell className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingCandidate(cand);
                            setIsModalOpen(true);
                          }}
                          className="p-2 border border-gray-250 dark:border-gray-800 text-gray-450 dark:text-gray-550 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <HiOutlinePencilSquare className="text-base text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDeleteCandidate(cand.id)}
                          className="p-2 border border-gray-250 dark:border-gray-800 text-gray-455 dark:text-gray-550 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <HiOutlineTrash className="text-base text-red-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer controls: pagination + entries count */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-800 pt-4 mt-2">
            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500">
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalEntries)} to{" "}
              {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries} entries
            </span>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <Pagination className="mt-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className="h-9 w-9 rounded-xl disabled:opacity-40 disabled:pointer-events-none"
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className="h-9 w-9 rounded-xl text-xs font-bold"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      className="h-9 w-9 rounded-xl disabled:opacity-40 disabled:pointer-events-none"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            {/* Page Size Selection */}
            <div className="flex items-center gap-2">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-9 bg-white dark:bg-gray-900 border border-gray-250 dark:border-gray-800 rounded-xl px-3 text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
              >
                <option value={4}>Show 4</option>
                <option value={8}>Show 8</option>
                <option value={12}>Show 12</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Add / Edit Modal */}
      <EditCandidateModal
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
