"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
 HiOutlineMagnifyingGlass,
 HiOutlineChevronDown,
 HiOutlineChevronLeft,
 HiOutlineChevronRight,
 HiOutlinePencilSquare,
 HiOutlineTrash,
 HiOutlineDocumentText,
 HiOutlineChevronUpDown,
 HiOutlineLink,
 HiOutlineClock,
 HiOutlinePlus,
 HiOutlineListBullet,
 HiOutlineChatBubbleLeftRight,
 HiOutlineEllipsisHorizontal,
 HiOutlineXMark,
 HiOutlineEnvelope,
 HiOutlinePhone,
 HiOutlineMapPin,
 HiOutlineGlobeAlt,
 HiOutlineArrowDownTray,
 HiOutlineBriefcase,
 HiOutlineAcademicCap,
 HiOutlineFaceSmile,
 HiOutlineBars3BottomLeft,
 HiOutlinePencil,
} from "react-icons/hi2";
import { Avatar } from "@/components/ui/avatar";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RowPerPage } from "@/components/ui/row-per-page";

type Stage =
 | "Applied"
 | "Screening"
 | "1st Interview"
 | "2nd Interview"
 | "Hiring"
 | "Rejected";

const STAGES: Stage[] = [
 "Applied",
 "Screening",
 "1st Interview",
 "2nd Interview",
 "Hiring",
 "Rejected",
];

interface Candidate {
 id: number;
 name: string;
 email: string;
 avatar: string;
 fallback: string;
 phone: string;
 cv: string | null;
 createdDate: string;
 stage: Stage;
}

const CANDIDATES: Candidate[] = [
 { id: 1, name: "Pristia Candra", email: "lincoln@unpixel.com", avatar: "https://i.pravatar.cc/150?u=pristia", fallback: "PC", phone: "08092139441", cv: "CV.pdf", createdDate: "01 Mar 2023", stage: "Applied" },
 { id: 2, name: "Hanna Baptista", email: "hanna@unpixel.com", avatar: "https://i.pravatar.cc/150?u=hanna", fallback: "HB", phone: "08092139441", cv: null, createdDate: "01 Mar 2023", stage: "Screening" },
 { id: 3, name: "Miracle Geidt", email: "miracle@unpixel.com", avatar: "", fallback: "MG", phone: "08092139441", cv: "CV.pdf", createdDate: "01 Mar 2023", stage: "1st Interview" },
 { id: 4, name: "Rayna Torff", email: "rayna@unpixel.com", avatar: "https://i.pravatar.cc/150?u=rayna", fallback: "RT", phone: "08092139441", cv: null, createdDate: "01 Mar 2023", stage: "2nd Interview" },
 { id: 5, name: "Giana Lipshutz", email: "giana@unpixel.com", avatar: "https://i.pravatar.cc/150?u=giana", fallback: "GL", phone: "08092139441", cv: null, createdDate: "01 Mar 2023", stage: "Hiring" },
 { id: 6, name: "James George", email: "james@unpixel.com", avatar: "https://i.pravatar.cc/150?u=james", fallback: "JG", phone: "08092139441", cv: "CV.pdf", createdDate: "01 Mar 2023", stage: "Hiring" },
 { id: 7, name: "Jordyn George", email: "jordyn@unpixel.com", avatar: "https://i.pravatar.cc/150?u=jordyn", fallback: "JG", phone: "08092139441", cv: "CV.pdf", createdDate: "01 Mar 2023", stage: "Rejected" },
 { id: 8, name: "Skylar Herwitz", email: "skylar@unpixel.com", avatar: "https://i.pravatar.cc/150?u=skylar", fallback: "SH", phone: "08092139441", cv: "CV.pdf", createdDate: "01 Mar 2023", stage: "Screening" },
];

// ── Stage dropdown (per-row in Table View) ─────────────────────────────
function StageDropdown({ stage, onChange }: { stage: Stage; onChange: (s: Stage) => void }) {
 const [open, setOpen] = React.useState(false);
 const [opensUpward, setOpensUpward] = React.useState(false);
 const ref = React.useRef<HTMLDivElement>(null);
 const btnRef = React.useRef<HTMLButtonElement>(null);

 React.useEffect(() => {
  const handler = (e: MouseEvent) => {
   if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
  };
  document.addEventListener("mousedown", handler);
  return () => document.removeEventListener("mousedown", handler);
 }, []);

 const handleToggle = () => {
  if (!open && btnRef.current) {
   const rect = btnRef.current.getBoundingClientRect();
   setOpensUpward(window.innerHeight - rect.bottom < 220);
  }
  setOpen((p) => !p);
 };

 return (
  <div className="relative" ref={ref}>
   <button
    ref={btnRef}
    onClick={handleToggle}
    className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
   >
    {stage}
    <HiOutlineChevronDown className={`text-gray-400 text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
   </button>
   {open && (
    <div className={`absolute left-0 w-40 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-xl z-50 py-1 overflow-hidden ${opensUpward ? "bottom-full mb-2" : "top-full mt-2"}`}>
     {STAGES.map((s) => (
      <button
       key={s}
       onClick={() => { onChange(s); setOpen(false); }}
       className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold transition-colors ${s === stage
        ? "text-primary bg-primary/5"
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
       {s}
       {s === stage && (
        <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
       )}
      </button>
     ))}
    </div>
   )}
  </div>
 );
}

// ── Inline candidate card actions dropdown ─────────────────────────────
function CardActionsDropdown({
 onEdit,
 onDelete,
}: {
 onEdit: () => void;
 onDelete: () => void;
}) {
 const [open, setOpen] = React.useState(false);
 const ref = React.useRef<HTMLDivElement>(null);

 React.useEffect(() => {
  const handler = (e: MouseEvent) => {
   if (ref.current && !ref.current.contains(e.target as Node)) {
    setOpen(false);
   }
  };
  document.addEventListener("mousedown", handler);
  return () => document.removeEventListener("mousedown", handler);
 }, []);

 return (
  <div className="relative" ref={ref}>
   <button
    onClick={() => setOpen(!open)}
    className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
   >
    <HiOutlineEllipsisHorizontal className="text-base" />
   </button>
   {open && (
    <div className="absolute right-0 mt-1 w-28 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
     <button
      onClick={() => {
       onEdit();
       setOpen(false);
      }}
      className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
     >
      <HiOutlinePencilSquare className="text-sm" />
      Edit
     </button>
     <button
      onClick={() => {
       onDelete();
       setOpen(false);
      }}
      className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center gap-2"
     >
      <HiOutlineTrash className="text-sm" />
      Delete
     </button>
    </div>
   )}
  </div>
 );
}

// ── Candidate Cards Stack Component ──────────────────────────────────
interface CandidateCardsStackProps {
 stageCandidates: Candidate[];
 draggedCandidateId: number | null;
 handleDragStart: (e: React.DragEvent, id: number) => void;
 setSelectedCandidate: (c: Candidate) => void;
 setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

function CandidateCardsStack({
 stageCandidates,
 draggedCandidateId,
 handleDragStart,
 setSelectedCandidate,
 setCandidates,
}: CandidateCardsStackProps) {
 return (
  <div className="flex flex-col gap-3 overflow-y-auto max-h-[550px] pr-0.5">
   {stageCandidates.length > 0 ? (
    stageCandidates.map((c) => (
     <Card
      key={c.id}
      draggable
      onDragStart={(e) => handleDragStart(e, c.id)}
      className={`p-4 border border-gray-300 dark:border-gray-800 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow bg-white dark:bg-gray-900 rounded-2xl flex flex-col gap-3 ${draggedCandidateId === c.id ? "opacity-50 border-dashed" : ""
       }`}
     >
      {/* Avatar & Name */}
      <div
       onClick={() => setSelectedCandidate(c)}
       className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
      >
       <Avatar src={c.avatar} fallback={c.fallback} size="sm" />
       <div className="flex flex-col">
        <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight hover:text-primary transition-colors">
         {c.name}
        </span>
        <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 leading-none mt-0.5">
         {c.email}
        </span>
       </div>
      </div>

      {/* Phone */}
      <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
       {c.phone}
      </div>

      {/* CV & Created Date */}
      <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-300 dark:border-gray-800">
       {c.cv ? (
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 dark:text-gray-400">
         <HiOutlineDocumentText className="text-gray-400 text-sm" />
         <span>{c.cv}</span>
         <HiOutlineChatBubbleLeftRight className="text-gray-400 text-xs hover:text-primary transition-colors cursor-pointer ml-0.5" />
        </div>
       ) : (
        <span className="text-xs text-gray-300 dark:text-gray-600">-</span>
       )}
       <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">
        {c.createdDate}
       </span>
      </div>

      {/* Actions Hover Tool */}
      <div className="flex items-center justify-end mt-1">
       <CardActionsDropdown
        onEdit={() => { }}
        onDelete={() => {
         setCandidates((prev) => prev.filter((item) => item.id !== c.id));
        }}
       />
      </div>
     </Card>
    ))
   ) : (
    <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 dark:border-gray-800 rounded-2xl p-6 text-center text-gray-400 dark:text-gray-600">
     <span className="text-[10px] font-bold">Drag here</span>
    </div>
   )}
  </div>
 );
}

// ── Pipeline View Component ──────────────────────────────────────────
interface PipelineViewProps {
 candidates: Candidate[];
 draggedCandidateId: number | null;
 handleDragOver: (e: React.DragEvent) => void;
 handleDrop: (e: React.DragEvent, targetStage: Stage) => void;
 handleDragStart: (e: React.DragEvent, id: number) => void;
 setSelectedCandidate: (c: Candidate) => void;
 setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

function PipelineView({
 candidates,
 draggedCandidateId,
 handleDragOver,
 handleDrop,
 handleDragStart,
 setSelectedCandidate,
 setCandidates,
}: PipelineViewProps) {
 return (
  <div className="flex gap-4 overflow-x-auto pb-4 items-start min-h-[500px]">
   {STAGES.map((stage) => {
    const stageCandidates = candidates.filter((c) => c.stage === stage);
    return (
     <div
      key={stage}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, stage)}
      className="flex flex-col gap-4 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-300 dark:border-gray-800 rounded-3xl p-4 min-h-[450px] w-[290px] shrink-0"
     >
      {/* Stage Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-300 dark:border-gray-800">
       <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
        {stage}
       </span>
       <Badge variant="primary" tinted className="text-[10px] px-2 py-0.5 font-bold">
        {stageCandidates.length}
       </Badge>
      </div>

      <CandidateCardsStack
       stageCandidates={stageCandidates}
       draggedCandidateId={draggedCandidateId}
       handleDragStart={handleDragStart}
       setSelectedCandidate={setSelectedCandidate}
       setCandidates={setCandidates}
      />
     </div>
    );
   })}
  </div>
 );
}

// ── Candidate Profile Detail Drawer ──────────────────────────────────
interface CandidateProfileDrawerProps {
 isOpen: boolean;
 onClose: () => void;
 candidate: Candidate | null;
 jobTitle: string;
}

function CandidateProfileDrawer({ isOpen, onClose, candidate, jobTitle }: CandidateProfileDrawerProps) {
 const [activeTab, setActiveTab] = React.useState<"profile" | "email" | "evaluation" | "comments" | "activity">("evaluation");
 const [selectedRating, setSelectedRating] = React.useState<"strong_no" | "no" | "not_sure" | "yes" | "excellent">("yes");
 const [evaluationText, setEvaluationText] = React.useState("You are have talented, love your work!");
 const [comments, setComments] = React.useState<Array<{ author: string; time: string; text: string }>>([
  { author: "You", time: "Today, 11:15 AM", text: "Candidate has amazing rendering skills." },
  { author: "Hiring Manager", time: "Yesterday, 3:45 PM", text: "Impressive portfolio. Definitely schedule a technical screening call." }
 ]);
 const [newComment, setNewComment] = React.useState("");

 // Reset tab selection when candidate changes
 React.useEffect(() => {
  setActiveTab("evaluation");
 }, [candidate]);

 if (!isOpen || !candidate) return null;

 const ratings = [
  { id: "strong_no" as const, label: "Strong No", emoji: "😡" },
  { id: "no" as const, label: "No", emoji: "😟" },
  { id: "not_sure" as const, label: "Not Sure", emoji: "😐" },
  { id: "yes" as const, label: "Yes", emoji: "😊" },
  { id: "excellent" as const, label: "Excellent", emoji: "🤩" },
 ];

 return (
  <div className="fixed inset-0 z-[100] flex justify-end">
   {/* Backdrop */}
   <div
    className="absolute inset-0 bg-black/40  transition-opacity duration-300"
    onClick={onClose}
   />

   {/* Slide-over Content Container */}
   <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
    {/* Floating Close Button on Left Edge */}
    <button
     onClick={onClose}
     className="absolute top-1/2 -left-20 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all hover:scale-105 active:scale-95 z-50 focus:outline-none"
    >
     <HiOutlineChevronRight className="text-lg stroke-[2.5]" />
    </button>

    {/* Header Hero Section */}
    <div className="p-6 border-b border-gray-300 dark:border-gray-800 flex items-start justify-between bg-white dark:bg-gray-900">
     <div className="flex items-center gap-4">
      <Avatar src={candidate.avatar} fallback={candidate.fallback} size="lg" className="w-16 h-16 border-2 border-primary/20" />
      <div className="flex flex-col">
       <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
         {candidate.name}
        </h2>
        <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md uppercase tracking-wider">
         {candidate.stage}
        </span>
       </div>
       <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-1">
        {jobTitle}
       </p>

       <div className="flex flex-col gap-1.5 mt-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
         <HiOutlineEnvelope className="text-gray-400 text-sm shrink-0" />
         <span>{candidate.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
         <HiOutlinePhone className="text-gray-400 text-sm shrink-0" />
         <span>{candidate.phone}</span>
        </div>
       </div>
      </div>
     </div>

     <button className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mt-2">
      Move To
      <HiOutlineChevronDown className="text-gray-400 text-xs" />
     </button>
    </div>

    {/* Navigation Tabs */}
    <div className="flex border-b border-gray-300 dark:border-gray-800 px-6 bg-white dark:bg-gray-900">
     {(["profile", "email", "evaluation", "comments", "activity"] as const).map((tab) => {
      const isActive = activeTab === tab;
      return (
       <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`py-4 px-4 text-xs font-bold capitalize transition-all relative ${isActive
         ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
         : "text-gray-400 hover:text-gray-650 dark:hover:text-gray-350"
         }`}
       >
        {tab}
        {isActive && (
         <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded" />
        )}
       </button>
      );
     })}
    </div>

    {/* Content Area */}
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-white dark:bg-gray-900">
     {activeTab === "profile" && (
      <>
       {/* Contact Information Card */}
       <div className="flex flex-col gap-4 bg-gray-50/50 dark:bg-gray-800/30 p-5 rounded-2xl border border-gray-300 dark:border-gray-850">
        <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
         Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
         <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-gray-400">Email Address</span>
          <span className="text-xs font-bold text-gray-900 dark:text-white truncate flex items-center gap-1.5">
           <HiOutlineEnvelope className="text-gray-400 text-sm shrink-0" />
           {candidate.email}
          </span>
         </div>
         <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-gray-400">Phone Number</span>
          <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
           <HiOutlinePhone className="text-gray-400 text-sm shrink-0" />
           {candidate.phone}
          </span>
         </div>
         <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-gray-400">Location</span>
          <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
           <HiOutlineMapPin className="text-gray-400 text-sm shrink-0" />
           San Francisco, CA
          </span>
         </div>
         <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-gray-400">Portfolio Website</span>
          <span className="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline cursor-pointer">
           <HiOutlineGlobeAlt className="text-gray-400 text-sm shrink-0" />
           pristia.design
          </span>
         </div>
        </div>
       </div>

       {/* Work Experience */}
       <div className="flex flex-col gap-4">
        <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
         Work Experience
        </h3>
        <div className="relative border-l border-gray-300 dark:border-gray-800 ml-2.5 pl-5 flex flex-col gap-5">
         <div className="relative">
          <div className="absolute -left-[26px] top-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-4 ring-white dark:ring-gray-900" />
          <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
           <HiOutlineBriefcase className="text-gray-400 text-sm shrink-0" />
           Lead 3D Designer
          </h4>
          <p className="text-[10px] font-bold text-gray-500 mt-0.5">Creative Studio • 2021 - Present</p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">
           Lead a team of 3 artists to create outstanding 3D environments, assets and high-fidelity product renders.
          </p>
         </div>
         <div className="relative">
          <div className="absolute -left-[26px] top-0.5 w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded-full ring-4 ring-white dark:ring-gray-900" />
          <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
           <HiOutlineBriefcase className="text-gray-400 text-sm shrink-0" />
           Junior 3D Artist
          </h4>
          <p className="text-[10px] font-bold text-gray-500 mt-0.5">Pixel World Ltd • 2019 - 2021</p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">
           Modelled and textured real-time assets for gaming modules and interactive WebGL experiences.
          </p>
         </div>
        </div>
       </div>

       {/* Education */}
       <div className="flex flex-col gap-4">
        <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
         Education
        </h3>
        <div className="relative border-l border-gray-300 dark:border-gray-800 ml-2.5 pl-5 flex flex-col gap-5">
         <div className="relative">
          <div className="absolute -left-[26px] top-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-4 ring-white dark:ring-gray-900" />
          <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
           <HiOutlineAcademicCap className="text-gray-400 text-sm shrink-0" />
           B.Sc in Digital Media & Design
          </h4>
          <p className="text-[10px] font-bold text-gray-500 mt-0.5">University of California • 2015 - 2019</p>
         </div>
        </div>
       </div>

       {/* Skills tags */}
       <div className="flex flex-col gap-3">
        <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
         Skills & Tools
        </h3>
        <div className="flex flex-wrap gap-1.5">
         {["3D Modeling", "Blender", "ZBrush", "Substance Painter", "Texturing", "Lighting", "Rendering"].map((sk) => (
          <span
           key={sk}
           className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-[10px] font-bold"
          >
           {sk}
          </span>
         ))}
        </div>
       </div>
      </>
     )}

     {activeTab === "email" && (
      <div className="flex flex-col gap-4">
       <h3 className="text-base font-bold text-gray-900 dark:text-white">
        Send Email to Candidate
       </h3>

       {/* Template selector */}
       <div className="flex flex-col gap-1.5 mt-2">
        <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500">
         Email Template <span className="text-red-500">*</span>
        </label>
        <div className="relative">
         <select className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-none appearance-none cursor-pointer">
          <option>Auto Confirmation</option>
          <option>Interview Scheduling</option>
          <option>Offer Letter</option>
          <option>Rejection Letter</option>
         </select>
         <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
          <HiOutlineChevronDown className="text-xs" />
         </div>
        </div>
       </div>

       {/* Email compose card */}
       <div className="border border-gray-300 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 p-5 mt-2 flex flex-col shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-850 pb-3">
         <span className="text-xs font-bold text-gray-400 dark:text-gray-550 w-8">To</span>
         <div className="flex items-center gap-2">
          <Avatar src={candidate.avatar} fallback={candidate.fallback} size="sm" className="w-6 h-6 border border-gray-300 dark:border-gray-800" />
          <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{candidate.name}</span>
         </div>
        </div>
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-850 py-3">
         <span className="text-xs font-bold text-gray-400 dark:text-gray-550 w-8">Subject</span>
         <input
          type="text"
          className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-transparent w-full focus:outline-none"
          defaultValue="Thank you for your application at Pixel Office"
         />
        </div>
        <div className="flex items-center gap-4 py-2 border-b border-gray-200 dark:border-gray-850 text-gray-400 dark:text-gray-500">
         <button type="button" className="text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">B</button>
         <button type="button" className="text-xs italic font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">I</button>
         <button type="button" className="text-xs underline font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">U</button>
         <button type="button" className="hover:text-gray-900 dark:hover:text-white"><HiOutlineFaceSmile className="text-sm" /></button>
         <button type="button" className="hover:text-gray-900 dark:hover:text-white"><HiOutlineLink className="text-sm" /></button>
         <button type="button" className="hover:text-gray-900 dark:hover:text-white"><HiOutlineListBullet className="text-sm" /></button>
         <button type="button" className="hover:text-gray-900 dark:hover:text-white"><HiOutlineBars3BottomLeft className="text-sm" /></button>
        </div>
        <textarea
         className="w-full h-80 text-xs bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none resize-none leading-relaxed mt-4"
         defaultValue={`Hi ${candidate.name.split(" ")[0]},\n\nThank you very much for applying for the ${jobTitle} position at Pixel Office.\n\nPlease be informed that we have received your application. Our hiring team is currently reviewing all applications. If you are among qualified candidates, you will receive an email notifying you of the next step soon.\n\nThanks again for your interest in working at our company.\n\nBest regards,\nPixel Office`}
        />
       </div>

       {/* Action buttons */}
       <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-300 dark:border-gray-800">
        <button
         onClick={() => setActiveTab("evaluation")}
         className="border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl py-2.5 px-8 text-xs font-bold transition-all"
        >
         Back
        </button>
        <button className="bg-[#0b0f19] hover:bg-[#1a233a] text-white rounded-xl py-2.5 px-8 text-xs font-bold transition-all shadow-sm">
         Create
        </button>
       </div>
      </div>
     )}

     {activeTab === "evaluation" && (
      <div className="flex flex-col gap-4">
       <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-450 dark:text-gray-405 uppercase tracking-wider">
         Overall Rating
        </h3>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
         <HiOutlinePencil className="text-sm" />
        </button>
       </div>

       {/* Emoji ratings selection */}
       <div className="grid grid-cols-5 gap-2.5 mt-1">
        {ratings.map((r) => {
         const isSelected = selectedRating === r.id;
         return (
          <button
           key={r.id}
           onClick={() => setSelectedRating(r.id)}
           className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border bg-white dark:bg-gray-900 transition-all ${isSelected
            ? "border-emerald-500 ring-2 ring-emerald-500/10 dark:ring-emerald-500/20"
            : "border-gray-300 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
            }`}
          >
           <span className="text-2xl mb-2">{r.emoji}</span>
           <span className="text-[9px] font-bold text-gray-800 dark:text-gray-200 text-center whitespace-nowrap leading-tight">
            {r.label}
           </span>
           {isSelected && (
            <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-emerald-500 rounded-full flex items-center justify-center text-white border border-white">
             <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
             </svg>
            </div>
           )}
          </button>
         );
        })}
       </div>

       {/* Text editor area */}
       <div className="border border-gray-300 dark:border-gray-800 rounded-2xl overflow-hidden mt-4 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-4 px-4 py-2.5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-950/20">
         <button type="button" className="text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">B</button>
         <button type="button" className="text-xs italic font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">I</button>
         <button type="button" className="text-xs underline font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">U</button>
         <button type="button" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><HiOutlineFaceSmile className="text-sm" /></button>
         <button type="button" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><HiOutlineLink className="text-sm" /></button>
         <button type="button" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><HiOutlineListBullet className="text-sm" /></button>
         <button type="button" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><HiOutlineBars3BottomLeft className="text-sm" /></button>
        </div>
        <textarea
         className="w-full h-32 p-4 text-xs bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-305 placeholder-gray-400 dark:placeholder-gray-650 focus:outline-none resize-none"
         placeholder="Write evaluation feedback..."
         value={evaluationText}
         onChange={(e) => setEvaluationText(e.target.value)}
        />
       </div>
      </div>
     )}

     {activeTab === "comments" && (
      <div className="flex flex-col gap-4">
       <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
        Team Comments
       </h3>
       <div className="flex flex-col gap-3">
        {comments.map((comment, index) => (
         <div key={index} className="bg-gray-50/50 dark:bg-gray-800/30 p-3.5 rounded-xl border border-gray-300 dark:border-gray-800/50">
          <div className="flex items-center justify-between pb-1 border-b border-gray-300 dark:border-gray-800">
           <span className="text-xs font-bold text-gray-900 dark:text-white">{comment.author}</span>
           <span className="text-[10px] text-gray-400">{comment.time}</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{comment.text}</p>
         </div>
        ))}
       </div>
       <div className="flex gap-2 mt-2">
        <input
         type="text"
         placeholder="Add a comment..."
         value={newComment}
         onChange={(e) => setNewComment(e.target.value)}
         className="w-full text-xs border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2 bg-transparent focus:outline-none"
        />
        <button
         onClick={() => {
          if (newComment.trim()) {
           setComments((prev) => [
            ...prev,
            { author: "You", time: "Just now", text: newComment }
           ]);
           setNewComment("");
          }
         }}
         className="bg-primary text-white rounded-xl px-4 py-2 text-xs font-bold hover:bg-primary-dark transition-all"
        >
         Comment
        </button>
       </div>
      </div>
     )}

     {activeTab === "activity" && (
      <div className="flex flex-col gap-6">
       {/* Activity Item 1 */}
       <div className="flex items-start gap-4">
        <Avatar
         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
         fallback="PO"
         size="sm"
         className="w-10 h-10 border border-gray-300 dark:border-gray-800"
        />
        <div className="flex flex-col">
         <p className="text-xs text-gray-750 dark:text-gray-300">
          <span className="font-bold text-gray-900 dark:text-white">Pixel Office</span>{" "}
          moved candidate from stage <span className="font-bold text-gray-900 dark:text-white">Rejected</span> to{" "}
          <span className="font-bold text-gray-900 dark:text-white">Applied</span>
         </p>
         <span className="text-[10px] font-semibold text-gray-400 mt-1">1m ago</span>
        </div>
       </div>

       {/* Activity Item 2 */}
       <div className="flex items-start gap-4">
        <Avatar
         src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
         fallback="ZA"
         size="sm"
         className="w-10 h-10 border border-gray-300 dark:border-gray-800"
        />
        <div className="flex flex-col">
         <p className="text-xs text-gray-750 dark:text-gray-300">
          <span className="font-bold text-gray-900 dark:text-white">Zoe Alexander</span>{" "}
          moved candidate from stage <span className="font-bold text-gray-900 dark:text-white">Applied</span> to{" "}
          <span className="font-bold text-gray-900 dark:text-white">Rejected</span>
         </p>
         <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
          Reason <span className="font-bold text-gray-750 dark:text-gray-300">Spam</span>
         </p>
         <span className="text-[10px] font-semibold text-gray-400 mt-1">5m ago</span>
        </div>
       </div>
      </div>
     )}
    </div>

    {/* Evaluation Sticky Footer */}
    {activeTab === "evaluation" && (
     <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex justify-end bg-white dark:bg-gray-900">
      <button className="bg-[#0b0f19] hover:bg-[#1a233a] text-white rounded-xl py-3 px-8 text-xs font-bold transition-all shadow-sm">
       Submit
      </button>
     </div>
    )}
   </div>
  </div>
 );
}

export default function JobDetailPage() {
 const router = useRouter();
 const [candidates, setCandidates] = React.useState(CANDIDATES);
 const [viewMode, setViewMode] = React.useState<"pipeline" | "table">("pipeline");
 const [draggedCandidateId, setDraggedCandidateId] = React.useState<number | null>(null);
 const [selectedCandidate, setSelectedCandidate] = React.useState<Candidate | null>(null);

 const jobTitle = "3D Designer";

 const handleStageChange = (id: number, newStage: Stage) => {
  setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, stage: newStage } : c)));
 };

 // Drag and Drop handlers
 const handleDragStart = (e: React.DragEvent, id: number) => {
  setDraggedCandidateId(id);
  e.dataTransfer.setData("text/plain", id.toString());
 };

 const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
 };

 const handleDrop = (e: React.DragEvent, targetStage: Stage) => {
  e.preventDefault();
  const idStr = e.dataTransfer.getData("text/plain");
  const id = parseInt(idStr, 10);
  if (!isNaN(id)) {
   handleStageChange(id, targetStage);
  }
  setDraggedCandidateId(null);
 };

 return (
  <div className="flex flex-col gap-6 p-2 md:p-8 min-h-full">
   {/* Header */}
   <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
    <div>
     <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recruitment</h1>
     {/* Breadcrumb */}
     <div className="flex items-center gap-2 mt-1.5">
      <button
       onClick={() => router.push("/recruitment/jobs")}
       className="text-xs font-semibold text-gray-400 hover:text-primary transition-colors"
      >
       List Job
      </button>
      <HiOutlineChevronRight className="text-gray-300 text-xs" />
      <span className="text-xs font-bold text-gray-900 dark:text-white">{jobTitle}</span>
     </div>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-3">
     <Input
      placeholder="Search what you need"
      leftIcon={<HiOutlineMagnifyingGlass />}
      className="w-56 h-11 bg-white dark:bg-gray-900"
      containerClassName="w-auto"
     />

     {/* Add Candidates split button */}
     <div className="flex h-11">
      <button className="flex items-center gap-2 px-5 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-l-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors whitespace-nowrap">
       <HiOutlinePlus className="text-base" />
       Add Candidates
      </button>
      <button className="px-3 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 rounded-r-xl border-l border-gray-700 dark:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
       <HiOutlineChevronDown className="text-sm" />
      </button>
     </div>

     {/* View Toggle + Toolbar */}
     <div className="flex items-center gap-1">
      {/* Grid/Pipeline View Button */}
      <button
       onClick={() => setViewMode("pipeline")}
       className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${viewMode === "pipeline"
        ? "bg-emerald-500 text-white"
        : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
        }`}
      >
       <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
       </svg>
      </button>

      {/* List/Table View Button */}
      <button
       onClick={() => setViewMode("table")}
       className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${viewMode === "table"
        ? "bg-emerald-500 text-white"
        : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
        }`}
      >
       <HiOutlineListBullet className="text-lg" />
      </button>

      <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
       <HiOutlineLink className="text-lg" />
      </button>
      <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
       <HiOutlineClock className="text-lg" />
      </button>
     </div>
    </div>
   </div>

   {/* Main Content Area */}
   {viewMode === "pipeline" ? (
    /* ── PIPELINE VIEW ── */
    <div className="flex gap-4 overflow-x-auto pb-4 items-start min-h-[500px]">
     {STAGES.map((stage) => {
      const stageCandidates = candidates.filter((c) => c.stage === stage);
      return (
       <div
        key={stage}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, stage)}
        className="flex flex-col gap-4 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-300 dark:border-gray-800 rounded-3xl p-4 min-h-[450px] w-[290px] shrink-0"
       >
        {/* Stage Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-300 dark:border-gray-800">
         <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
          {stage}
         </span>
         <Badge variant="primary" tinted className="text-[10px] px-2 py-0.5 font-bold">
          {stageCandidates.length}
         </Badge>
        </div>

        {/* Candidate Cards Stack */}
        <CandidateCardsStack
         stageCandidates={stageCandidates}
         draggedCandidateId={draggedCandidateId}
         handleDragStart={handleDragStart}
         setSelectedCandidate={setSelectedCandidate}
         setCandidates={setCandidates}
        />
       </div>
      );
     })}
    </div>
   ) : (
    /* ── TABLE VIEW ── */
    <div className="flex flex-col gap-4">
     <div className="flex justify-end">
      <RowPerPage itemsPerPage={8} />
     </div>
     <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
       <table>
        <thead>
         <tr className="border-b border-gray-300 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <th className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
           <div className="flex items-center gap-1.5">Name <HiOutlineChevronUpDown className="text-gray-300 text-xs" /></div>
          </th>
          <th >
           <div className="flex items-center gap-1.5">Phone Number <HiOutlineChevronUpDown className="text-gray-300 text-xs" /></div>
          </th>
          <th >
           <div className="flex items-center gap-1.5">CV <HiOutlineChevronUpDown className="text-gray-300 text-xs" /></div>
          </th>
          <th >
           <div className="flex items-center gap-1.5">Created Date <HiOutlineChevronUpDown className="text-gray-300 text-xs" /></div>
          </th>
          <th >
           <div className="flex items-center gap-1.5">Stages <HiOutlineChevronUpDown className="text-gray-300 text-xs" /></div>
          </th>
          <th className="py-4 px-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">
           Action
          </th>
         </tr>
        </thead>
        <tbody>
         {candidates.map((c) => (
          <tr
           key={c.id}
           className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
          >
           {/* Name */}
           <td className="py-4 px-6">
            <div
             onClick={() => setSelectedCandidate(c)}
             className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity group/name"
            >
             <Avatar src={c.avatar} fallback={c.fallback} size="sm" />
             <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 dark:text-white group-hover/name:text-primary transition-colors">{c.name}</span>
              <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">{c.email}</span>
             </div>
            </div>
           </td>

           {/* Phone */}
           <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
            {c.phone}
           </td>

           {/* CV */}
           <td className="py-4 px-4">
            {c.cv ? (
             <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <span>{c.cv}</span>
              <HiOutlineDocumentText className="text-gray-400 text-base" />
              <HiOutlineChatBubbleLeftRight className="text-gray-400 text-sm hover:text-primary transition-colors cursor-pointer" />
             </div>
            ) : (
             <span className="text-xs text-gray-300 dark:text-gray-600">-</span>
            )}
           </td>

           {/* Created Date */}
           <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
            {c.createdDate}
           </td>

           {/* Stages */}
           <td className="py-4 px-4">
            <StageDropdown
             stage={c.stage}
             onChange={(s) => handleStageChange(c.id, s)}
            />
           </td>

           {/* Actions */}
           <td className="py-4 px-6 text-right">
            <div className="flex items-center justify-end gap-2">
             <button className="w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              <HiOutlinePencilSquare className="text-sm" />
             </button>
             <button
              onClick={() => {
               setCandidates((prev) => prev.filter((item) => item.id !== c.id));
              }}
              className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
             >
              <HiOutlineTrash className="text-sm" />
             </button>
            </div>
           </td>
          </tr>
         ))}
        </tbody>
       </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-gray-300 dark:border-gray-800">
       <Pagination className="mt-0 w-full" />
      </div>
     </div>
    </div>
   )}

   {/* Candidate Profile Slide-over Drawer */}
   <CandidateProfileDrawer
    isOpen={!!selectedCandidate}
    onClose={() => setSelectedCandidate(null)}
    candidate={selectedCandidate}
    jobTitle={jobTitle}
   />
  </div>
 );
}
