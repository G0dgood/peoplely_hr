"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineEllipsisVertical,
  HiOutlineChevronDown,
  HiOutlineFaceSmile,
  HiOutlineLink,
  HiOutlineListBullet,
  HiOutlineBars3BottomLeft,
  HiOutlineCalendar,
  HiOutlineXMark,
  HiOutlineTrash,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";

type JobStatus = "ACTIVE" | "CLOSED" | "UNACTIVE";

interface Job {
  id: number;
  title: string;
  department: string;
  office: string;
  candidatesApplied: number;
  avatars: string[];
  status: JobStatus;
  createdAt: string;
}

const JOBS: Job[] = [
  {
    id: 1,
    title: "3D Designer",
    department: "Designer",
    office: "Unpixel HQ",
    candidatesApplied: 0,
    avatars: [],
    status: "ACTIVE",
    createdAt: "3m ago",
  },
  {
    id: 2,
    title: "UI UX Designer",
    department: "Designer",
    office: "Unpixel HQ",
    candidatesApplied: 10,
    avatars: [
      "https://i.pravatar.cc/150?u=a",
      "https://i.pravatar.cc/150?u=b",
      "https://i.pravatar.cc/150?u=c",
    ],
    status: "ACTIVE",
    createdAt: "3m ago",
  },
  {
    id: 3,
    title: "Senior Android Developer",
    department: "IT",
    office: "Unpixel Indonesia",
    candidatesApplied: 115,
    avatars: [
      "https://i.pravatar.cc/150?u=d",
      "https://i.pravatar.cc/150?u=e",
      "https://i.pravatar.cc/150?u=f",
    ],
    status: "CLOSED",
    createdAt: "3m ago",
  },
  {
    id: 4,
    title: "Senior Android Developer",
    department: "IT",
    office: "Unpixel Indonesia",
    candidatesApplied: 115,
    avatars: [
      "https://i.pravatar.cc/150?u=g",
      "https://i.pravatar.cc/150?u=h",
      "https://i.pravatar.cc/150?u=i",
    ],
    status: "UNACTIVE",
    createdAt: "3m ago",
  },
];

const STATUS_CONFIG: Record<
  JobStatus,
  { variant: "success" | "error" | "gray"; badgeLabel: string; dropdownLabel: string }
> = {
  ACTIVE: { variant: "success", badgeLabel: "ACTIVE", dropdownLabel: "Active" },
  CLOSED: { variant: "error", badgeLabel: "CLOSED", dropdownLabel: "Closed" },
  UNACTIVE: { variant: "gray", badgeLabel: "UNACTIVE", dropdownLabel: "Unactive" },
};

// ── Inline mini status dropdown ──────────────────────────────────────
function StatusDropdown({ status, onChange }: { status: JobStatus; onChange: (s: JobStatus) => void }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const cfg = STATUS_CONFIG[status];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        {cfg.dropdownLabel}
        <HiOutlineChevronDown className={`text-gray-400 text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-850 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-300 dark:border-gray-800">
            <p className="text-xs font-black text-gray-900 dark:text-white tracking-wide">Change Status</p>
          </div>
          {(["ACTIVE", "UNACTIVE", "CLOSED"] as JobStatus[]).map((s) => {
            const isSelected = s === status;
            return (
              <button
                key={s}
                onClick={() => { onChange(s); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold transition-colors ${isSelected
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
              >
                {STATUS_CONFIG[s].dropdownLabel}
                {isSelected && (
                  <svg
                    className="w-4 h-4 text-primary shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface CreateJobDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: {
    title: string;
    department: string;
    office: string;
    employmentType: string;
    quantity: string;
    closingDate: string;
    description: string;
    invitedMembers: Array<{ name: string; email: string; avatar: string }>;
    workflowStages: Array<{ name: string; isLocked: boolean }>;
  }) => void;
}

function CreateJobDrawer({ isOpen, onClose, onAddJob }: CreateJobDrawerProps) {
  const [step, setStep] = React.useState(1);
  const [title, setTitle] = React.useState("");
  const [employmentType, setEmploymentType] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [office, setOffice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [closingDate, setClosingDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  // Step 2 states
  const [invitedMembers, setInvitedMembers] = React.useState<Array<{ name: string; email: string; avatar: string }>>([
    { name: "Pristia Candra", email: "calzoni@gmail.com", avatar: "https://i.pravatar.cc/150?u=pristia" }
  ]);
  const [memberSearch, setMemberSearch] = React.useState("");

  const [workflowStages, setWorkflowStages] = React.useState<Array<{ name: string; isLocked: boolean }>>([
    { name: "Applied", isLocked: true },
    { name: "Screening", isLocked: false },
    { name: "1st Interview", isLocked: false },
    { name: "2nd Interview", isLocked: false },
    { name: "Offered", isLocked: true },
    { name: "Hired", isLocked: true },
    { name: "Rejected", isLocked: true }
  ]);
  const [isAddingStage, setIsAddingStage] = React.useState(false);
  const [newStageName, setNewStageName] = React.useState("");
  const [activeStageMenu, setActiveStageMenu] = React.useState<number | null>(null);

  const handleAddMember = () => {
    if (!memberSearch.trim()) return;
    const name = memberSearch.includes("@") ? memberSearch.split("@")[0] : memberSearch;
    const email = memberSearch.includes("@") ? memberSearch : `${memberSearch.toLowerCase().replace(/\s+/g, "")}@gmail.com`;
    const avatar = `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`;
    setInvitedMembers([...invitedMembers, { name, email, avatar }]);
    setMemberSearch("");
  };

  const handleRemoveMember = (email: string) => {
    setInvitedMembers(invitedMembers.filter((m) => m.email !== email));
  };

  const handleAddStage = () => {
    if (!newStageName.trim()) {
      setIsAddingStage(false);
      return;
    }
    const updated = [...workflowStages];
    const lastLockedIndex = updated.findIndex((s) => s.name === "Offered");
    if (lastLockedIndex !== -1) {
      updated.splice(lastLockedIndex, 0, { name: newStageName.trim(), isLocked: false });
    } else {
      updated.push({ name: newStageName.trim(), isLocked: false });
    }
    setWorkflowStages(updated);
    setNewStageName("");
    setIsAddingStage(false);
  };

  const handleDeleteStage = (index: number) => {
    setWorkflowStages(workflowStages.filter((_, i) => i !== index));
    setActiveStageMenu(null);
  };

  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setTitle("");
      setEmploymentType("");
      setDepartment("");
      setOffice("");
      setQuantity("");
      setClosingDate("");
      setDescription("");
      setIsDatePickerOpen(false);
      setInvitedMembers([
        { name: "Pristia Candra", email: "calzoni@gmail.com", avatar: "https://i.pravatar.cc/150?u=pristia" }
      ]);
      setMemberSearch("");
      setWorkflowStages([
        { name: "Applied", isLocked: true },
        { name: "Screening", isLocked: false },
        { name: "1st Interview", isLocked: false },
        { name: "2nd Interview", isLocked: false },
        { name: "Offered", isLocked: true },
        { name: "Hired", isLocked: true },
        { name: "Rejected", isLocked: true }
      ]);
      setIsAddingStage(false);
      setNewStageName("");
      setActiveStageMenu(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onAddJob({
        title: title || "New Job Position",
        department: department || "General",
        office: office || "Remote",
        employmentType: employmentType || "Fulltime",
        quantity: quantity || "1",
        closingDate: closingDate || "N/A",
        description: description || "",
        invitedMembers,
        workflowStages,
      });
      onClose();
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40  transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over Content Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">

        {/* Floating Close Button on Left Edge */}
        <button
          onClick={onClose}
          className="absolute top-1/2 -left-12 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all hover:scale-105 active:scale-95 z-50 focus:outline-none"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Header Title Section */}
        <div className="p-6 border-b border-gray-300 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Create New Job</h2>
          </div>
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            STEP {step} OF 2
          </span>
        </div>

        {/* Form Steps Progress Indicator */}
        <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-300 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/10">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${step === 1
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 ring-2 ring-emerald-500/20"
                : "bg-emerald-500 text-white"
              }`}>
              {step > 1 ? "✓" : "1"}
            </div>
            <span className={`text-xs font-bold ${step === 1 ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
              Job Info
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border ${step === 2
                ? "bg-emerald-50 text-emerald-600 border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400 ring-2 ring-emerald-500/20"
                : "border-gray-350 text-gray-400 dark:border-gray-700"
              }`}>
              2
            </div>
            <span className={`text-xs font-bold ${step === 2 ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
              Hiring Team & Workflow
            </span>
          </div>
        </div>

        {/* Form Content Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {step === 1 ? (
            <>
              {/* Job Title */}
              <Input
                label="Job Title"
                required
                placeholder="Enter job title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xs font-semibold"
              />

              {/* Job Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-550 dark:text-gray-400">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className={`w-full h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl px-4 text-xs focus:outline-none appearance-none cursor-pointer ${employmentType === "" ? "text-gray-400 dark:text-gray-500 font-semibold" : "text-gray-700 dark:text-gray-300 font-bold"
                        }`}
                    >
                      <option value="" disabled>Select type</option>
                      <option value="Fulltime">Fulltime</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote">Remote</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                      <HiOutlineChevronDown className="text-xs" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-550 dark:text-gray-400">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className={`w-full h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl px-4 text-xs focus:outline-none appearance-none cursor-pointer ${department === "" ? "text-gray-400 dark:text-gray-500 font-semibold" : "text-gray-700 dark:text-gray-300 font-bold"
                        }`}
                    >
                      <option value="" disabled>Select department</option>
                      <option value="Designer">Designer</option>
                      <option value="IT">IT</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Product Manager">Product Manager</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                      <HiOutlineChevronDown className="text-xs" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-550 dark:text-gray-400">
                    Office <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={office}
                      onChange={(e) => setOffice(e.target.value)}
                      className={`w-full h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl px-4 text-xs focus:outline-none appearance-none cursor-pointer ${office === "" ? "text-gray-400 dark:text-gray-500 font-semibold" : "text-gray-700 dark:text-gray-300 font-bold"
                        }`}
                    >
                      <option value="" disabled>Select office</option>
                      <option value="Unpixel Office">Unpixel Office</option>
                      <option value="Unpixel Indonesia">Unpixel Indonesia</option>
                      <option value="San Francisco HQ">San Francisco HQ</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                      <HiOutlineChevronDown className="text-xs" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity and Expected Closing Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Quantity"
                  required
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="text-xs font-semibold"
                />

                <div className="relative">
                  <div onClick={() => setIsDatePickerOpen(true)} className="cursor-pointer">
                    <Input
                      label="Expected Closing Date"
                      type="text"
                      placeholder="Select Date"
                      value={closingDate}
                      readOnly
                      rightIcon={<HiOutlineCalendar className="text-sm" />}
                      className="text-xs font-semibold cursor-pointer"
                    />
                  </div>
                  <DatePicker
                    isOpen={isDatePickerOpen}
                    onClose={() => setIsDatePickerOpen(false)}
                    onSave={(dateRange) => setClosingDate(dateRange)}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-550 dark:text-gray-400">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-4 px-4 py-2.5 border-b border-gray-200 dark:border-gray-850 bg-gray-50/30 dark:bg-gray-955/20 text-gray-400 dark:text-gray-500">
                    <button type="button" className="text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">B</button>
                    <button type="button" className="text-xs italic font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">I</button>
                    <button type="button" className="text-xs underline font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">U</button>
                    <button type="button" className="hover:text-gray-900 dark:hover:text-white"><HiOutlineFaceSmile className="text-sm" /></button>
                    <button type="button" className="hover:text-gray-900 dark:hover:text-white"><HiOutlineLink className="text-sm" /></button>
                    <button type="button" className="hover:text-gray-900 dark:hover:text-white"><HiOutlineListBullet className="text-sm" /></button>
                    <button type="button" className="hover:text-gray-900 dark:hover:text-white"><HiOutlineBars3BottomLeft className="text-sm" /></button>
                  </div>
                  <textarea
                    placeholder="Job description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-40 p-4 text-xs bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Invite Member */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Invite Member
                </h3>

                <div className="flex gap-2">
                  <Input
                    placeholder="Search name or email address"
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddMember();
                      }
                    }}
                    rightIcon={
                      <button type="button" onClick={handleAddMember} className="focus:outline-none">
                        <HiOutlineMagnifyingGlass className="text-gray-400 hover:text-gray-600" />
                      </button>
                    }
                    className="text-xs font-semibold"
                  />
                </div>

                {/* Prefilled/Invited Members List */}
                <div className="flex flex-col gap-3 mt-1">
                  {invitedMembers.map((member) => (
                    <div
                      key={member.email}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/30 dark:bg-gray-900/50"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-800"
                        />
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-bold text-gray-900 dark:text-white">
                            {member.name}
                          </span>
                          <span className="text-[11px] text-gray-400 dark:text-gray-500">
                            {member.email}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.email)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <HiOutlineTrash className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hiring Workflow */}
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Hiring Workflow
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAddingStage(true)}
                    className="w-6 h-6 flex items-center justify-center border border-gray-300 dark:border-gray-800 rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <HiOutlinePlus className="text-xs" />
                  </button>
                </div>

                {isAddingStage && (
                  <div className="flex items-center gap-2 p-2 border border-emerald-200 dark:border-emerald-800 rounded-xl bg-emerald-50/20 dark:bg-emerald-950/10">
                    <input
                      type="text"
                      placeholder="Enter stage name..."
                      value={newStageName}
                      onChange={(e) => setNewStageName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddStage();
                        } else if (e.key === "Escape") {
                          setIsAddingStage(false);
                        }
                      }}
                      className="flex-1 bg-transparent border-none text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none px-2"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleAddStage}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 px-2 py-1"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingStage(false)}
                      className="text-xs font-bold text-gray-400 hover:text-gray-650 dark:hover:text-gray-300 px-2 py-1"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Stages List Card */}
                <div className="border border-gray-300 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900 divide-y divide-gray-150 dark:divide-gray-855">
                  {workflowStages.map((stage, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 hover:bg-gray-50/30 dark:hover:bg-gray-850/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {stage.isLocked ? (
                          <HiOutlineLockClosed className="text-gray-400 dark:text-gray-500 text-xs shrink-0" />
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500 font-black cursor-grab select-none text-sm shrink-0">
                            =
                          </span>
                        )}
                        <span className="text-xs font-bold text-gray-705 dark:text-gray-300">
                          {stage.name}
                        </span>
                      </div>

                      {!stage.isLocked && (
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setActiveStageMenu(activeStageMenu === idx ? null : idx)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                          >
                            <HiOutlineEllipsisVertical className="text-sm" />
                          </button>

                          {activeStageMenu === idx && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveStageMenu(null)}
                              />
                              <div className="absolute right-0 mt-1 w-24 bg-white dark:bg-gray-950 border border-gray-155 dark:border-gray-800 rounded-lg shadow-lg z-20 py-1">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteStage(idx)}
                                  className="w-full text-left px-3 py-1.5 text-[10px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3 bg-white dark:bg-gray-900">
          <button
            onClick={handleBack}
            className="border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl py-2.5 px-8 text-xs font-bold transition-all"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-[#0b0f19] hover:bg-[#1a233a] text-white rounded-xl py-2.5 px-8 text-xs font-bold transition-all shadow-sm"
          >
            {step === 1 ? "Next" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50  transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[400px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">

        {/* Animated Check & Confetti Illustration Container */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-6">
          {/* Confetti / Sparkles */}
          {/* Top orange crescent */}
          <div className="absolute top-2 left-10 w-2.5 h-2.5 rounded-full border-2 border-orange-400 border-t-transparent border-r-transparent rotate-45 animate-bounce" />
          {/* Blue crescent */}
          <div className="absolute top-6 left-2 w-2.5 h-2.5 rounded-full border-2 border-blue-500 border-b-transparent border-l-transparent rotate-[20deg]" />
          {/* Green crescent */}
          <div className="absolute bottom-6 left-2 w-3 h-3 rounded-full border-2 border-emerald-400 border-t-transparent border-l-transparent -rotate-12" />
          {/* Blue star line */}
          <svg className="absolute top-8 right-2 w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
          </svg>
          {/* Confetti pieces */}
          <div className="absolute bottom-4 right-6 w-2 h-2 bg-blue-400 rounded-full" />
          <div className="absolute top-4 right-10 w-1.5 h-1.5 bg-orange-300 rounded-full" />

          {/* Outer circle rings */}
          <div className="absolute inset-4 rounded-full border-4 border-emerald-550/10 flex items-center justify-center">
            {/* Emerald check circle */}
            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text Details */}
        <h3 className="text-xl font-black text-gray-900 dark:text-white">
          Add Job Success!
        </h3>
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-2.5 max-w-[280px]">
          New job has been successfully created, stay tuned!
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full h-12 bg-[#0b0f19] hover:bg-[#1a233a] dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-2xl text-xs font-black tracking-wider transition-all active:scale-[0.98] mt-8 shadow-md"
        >
          Check Now
        </button>
      </div>
    </div>
  );
}

export default function RecruitmentJobsPage() {
  const [jobs, setJobs] = React.useState(JOBS);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const router = useRouter();

  const handleStatusChange = (id: number, newStatus: JobStatus) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: newStatus } : j)));
  };

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recruitment</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Here's all job list</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search what you need"
            leftIcon={<HiOutlineMagnifyingGlass />}
            className="w-64 h-11 bg-white dark:bg-gray-900"
            containerClassName="w-auto"
          />
          <Button
            variant="primary"
            onClick={() => setIsCreateDrawerOpen(true)}
            className="h-11 px-5 bg-[#11131A] dark:bg-white dark:text-gray-900 whitespace-nowrap"
            leftIcon={<HiOutlinePlus className="text-lg" />}
          >
            Add New
          </Button>
        </div>
      </div>

      {/* Job Cards */}
      <div className="flex flex-col gap-4">
        {jobs.map((job) => {
          const cfg = STATUS_CONFIG[job.status];
          return (
            <Card
              key={job.id}
              className="px-8 py-6 border border-gray-300 dark:border-gray-800"
            >
              <div className="flex items-start justify-between gap-6">
                {/* Left: job info */}
                <div className="flex flex-col gap-3 flex-1">
                  {/* Title + Status badge */}
                  <div className="flex items-center gap-3">
                    <h3
                      className="text-base font-black text-gray-900 dark:text-white cursor-pointer hover:text-primary transition-colors"
                      onClick={() => router.push(`/dashboard/recruitment/jobs/${job.id}`)}
                    >
                      {job.title}
                    </h3>
                    <Badge
                      variant={cfg.variant}
                      tinted
                      className="text-[9px] uppercase tracking-widest px-2.5 py-0.5 font-bold"
                    >
                      {cfg.badgeLabel}
                    </Badge>
                  </div>

                  {/* Department · Office */}
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                    {job.department}
                    <span className="mx-1.5">·</span>
                    {job.office}
                  </p>

                  {/* Avatars + Candidates count */}
                  <div className="flex items-center gap-3">
                    {job.avatars.length > 0 && (
                      <div className="flex -space-x-2">
                        {job.avatars.slice(0, 3).map((src, i) => (
                          <Avatar
                            key={i}
                            src={src}
                            size="sm"
                            className="ring-2 ring-white dark:ring-gray-900"
                          />
                        ))}
                      </div>
                    )}
                    <span className="text-xs font-bold text-gray-550 dark:text-gray-400">
                      {job.candidatesApplied} Candidates Applied
                    </span>
                  </div>
                </div>

                {/* Right: status dropdown + action + created */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <StatusDropdown
                      status={job.status}
                      onChange={(s) => handleStatusChange(job.id, s)}
                    />
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <HiOutlineEllipsisVertical className="text-lg" />
                    </button>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">
                    Created {job.createdAt}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Create Job Drawer */}
      <CreateJobDrawer
        isOpen={isCreateDrawerOpen}
        onClose={() => setIsCreateDrawerOpen(false)}
        onAddJob={(newJob) => {
          const nextId = jobs.length + 1;
          setJobs((prev) => [
            {
              id: nextId,
              title: newJob.title,
              department: newJob.department,
              office: newJob.office,
              candidatesApplied: 0,
              avatars: newJob.invitedMembers.map((m) => m.avatar),
              status: "ACTIVE",
              createdAt: "Just now",
            },
            ...prev,
          ]);
          setIsSuccessModalOpen(true);
        }}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}
