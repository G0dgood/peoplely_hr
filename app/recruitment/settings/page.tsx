"use client";

import * as React from "react";
import {
 HiOutlineUsers,
 HiOutlineTag,
 HiOutlineEnvelope,
 HiOutlineLockClosed,
 HiOutlineBars3,
 HiOutlineEllipsisVertical,
 HiOutlinePlus,
 HiOutlineTrash,
 HiOutlinePencilSquare,
 HiOutlineXMark,
 HiOutlineCheck,
 HiOutlineMagnifyingGlass,
 HiOutlineChevronDown,
 HiOutlineChevronLeft,
 HiOutlineChevronRight,
 HiOutlineDocumentText,
 HiOutlineFaceSmile,
 HiOutlineLink,
 HiOutlineListBullet,
 HiOutlineBars3BottomLeft,
} from "react-icons/hi2";
import { SettingsTabs, SettingsTabItem } from "@/components/ui/settings-tabs";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "@/components/ui/modal";

import { PageHeader } from "@/components/ui/page-header";

import { TableActions } from "@/components/ui/table-actions";

interface Stage {
 id: string;
 name: string;
 isLocked: boolean;
}

interface TagItem {
 id: string;
 name: string;
 candidateCount: number;
}

interface ResourceItem {
 id: string;
 name: string;
 updatedAt: string;
}

interface EmailTemplate {
 id: string;
 name: string;
 subject: string;
 body: string;
 stage: string;
 lastModified: string;
 isLocked: boolean;
}

export default function RecruitmentSettingsPage() {
 const [activeTab, setActiveTab] = React.useState<"workflow" | "tags" | "emails">("workflow");

 const tabs: SettingsTabItem[] = [
  { id: "workflow", label: "Hiring Workflow", icon: <HiOutlineUsers /> },
  { id: "tags", label: "Tag & Resource", icon: <HiOutlineTag /> },
  { id: "emails", label: "Email Template", icon: <HiOutlineEnvelope /> },
 ];

 // 1. Workflow State
 const [stages, setStages] = React.useState<Stage[]>([
  { id: "applied", name: "Applied", isLocked: true },
  { id: "screening", name: "Screening", isLocked: false },
  { id: "1st-interview", name: "1st Interview", isLocked: false },
  { id: "2nd-interview", name: "2nd Interview", isLocked: false },
  { id: "offered", name: "Offered", isLocked: true },
  { id: "hired", name: "Hired", isLocked: true },
  { id: "rejected", name: "Rejected", isLocked: true },
 ]);

 const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
 const [isAddStageOpen, setIsAddStageOpen] = React.useState(false);
 const [newStageName, setNewStageName] = React.useState("");
 const [editingStage, setEditingStage] = React.useState<Stage | null>(null);
 const [editStageName, setEditStageName] = React.useState("");
 const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
 const dropdownRef = React.useRef<HTMLDivElement>(null);

 const [activeTagDropdown, setActiveTagDropdown] = React.useState<string | null>(null);
 const tagDropdownRef = React.useRef<HTMLDivElement>(null);

 const [activeResourceDropdown, setActiveResourceDropdown] = React.useState<string | null>(null);
 const resourceDropdownRef = React.useRef<HTMLDivElement>(null);

 // Close dropdown on click outside
 React.useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
   if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
    setActiveDropdown(null);
   }
   if (tagDropdownRef.current && !tagDropdownRef.current.contains(e.target as Node)) {
    setActiveTagDropdown(null);
   }
   if (resourceDropdownRef.current && !resourceDropdownRef.current.contains(e.target as Node)) {
    setActiveResourceDropdown(null);
   }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

 // Drag and Drop
 const handleDragStart = (index: number) => {
  if (stages[index].isLocked) return;
  setDraggedIndex(index);
 };

 const handleDragOver = (e: React.DragEvent, index: number) => {
  e.preventDefault();
 };

 const handleDrop = (index: number) => {
  if (draggedIndex === null) return;
  if (stages[index].isLocked) return; // Cannot drop on locked stages

  const updated = [...stages];
  const item = updated[draggedIndex];
  updated.splice(draggedIndex, 1);
  updated.splice(index, 0, item);
  setStages(updated);
  setDraggedIndex(null);
 };

 const handleAddStage = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newStageName.trim()) return;

  const offeredIndex = stages.findIndex((s) => s.id === "offered");
  const insertIndex = offeredIndex !== -1 ? offeredIndex : stages.length;

  const newStage: Stage = {
   id: newStageName.toLowerCase().replace(/\s+/g, "-"),
   name: newStageName.trim(),
   isLocked: false,
  };

  const updated = [...stages];
  updated.splice(insertIndex, 0, newStage);
  setStages(updated);
  setNewStageName("");
  setIsAddStageOpen(false);
 };

 const handleRenameStage = (e: React.FormEvent) => {
  e.preventDefault();
  if (!editingStage || !editStageName.trim()) return;

  setStages((prev) =>
   prev.map((s) => (s.id === editingStage.id ? { ...s, name: editStageName.trim() } : s))
  );
  setEditingStage(null);
  setEditStageName("");
 };

 const handleDeleteStage = (id: string) => {
  setStages((prev) => prev.filter((s) => s.id !== id));
  setActiveDropdown(null);
 };

 // 2. Tags & Resources State
 const [activeSubTab, setActiveSubTab] = React.useState<"tag" | "resource">("tag");
 const [tags, setTags] = React.useState<TagItem[]>([
  { id: "design", name: "Design", candidateCount: 20 },
  { id: "engineer", name: "Engineer", candidateCount: 10 },
  { id: "finance", name: "Finance", candidateCount: 5 },
  { id: "product", name: "Product", candidateCount: 0 },
 ]);
 const [newTagName, setNewTagName] = React.useState("");
 const [isAddTagOpen, setIsAddTagOpen] = React.useState(false);
 const [editingTag, setEditingTag] = React.useState<TagItem | null>(null);
 const [editTagName, setEditTagName] = React.useState("");

 const [resources, setResources] = React.useState<ResourceItem[]>([
  { id: "1", name: "Interview Evaluation Sheet", updatedAt: "Updated 3 days ago" },
  { id: "2", name: "Candidate Assessment Checklist", updatedAt: "Updated 1 week ago" },
 ]);
 const [newResourceName, setNewResourceName] = React.useState("");
 const [isAddResourceOpen, setIsAddResourceOpen] = React.useState(false);
 const [editingResource, setEditingResource] = React.useState<ResourceItem | null>(null);
 const [editResourceName, setEditResourceName] = React.useState("");

 const handleAddTag = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newTagName.trim()) return;
  const newTag: TagItem = {
   id: newTagName.toLowerCase().replace(/\s+/g, "-"),
   name: newTagName.trim(),
   candidateCount: 0,
  };
  setTags((prev) => [...prev, newTag]);
  setNewTagName("");
  setIsAddTagOpen(false);
 };

 const handleRenameTag = (e: React.FormEvent) => {
  e.preventDefault();
  if (!editingTag || !editTagName.trim()) return;
  setTags((prev) =>
   prev.map((t) => (t.id === editingTag.id ? { ...t, name: editTagName.trim() } : t))
  );
  setEditingTag(null);
  setEditTagName("");
 };

 const handleDeleteTag = (id: string) => {
  setTags((prev) => prev.filter((t) => t.id !== id));
  setActiveTagDropdown(null);
 };

 const handleAddResource = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newResourceName.trim()) return;
  const newResource: ResourceItem = {
   id: Date.now().toString(),
   name: newResourceName.trim(),
   updatedAt: "Updated just now",
  };
  setResources((prev) => [...prev, newResource]);
  setNewResourceName("");
  setIsAddResourceOpen(false);
 };

 const handleRenameResource = (e: React.FormEvent) => {
  e.preventDefault();
  if (!editingResource || !editResourceName.trim()) return;
  setResources((prev) =>
   prev.map((r) => (r.id === editingResource.id ? { ...r, name: editResourceName.trim() } : r))
  );
  setEditingResource(null);
  setEditResourceName("");
 };

 const handleDeleteResource = (id: string) => {
  setResources((prev) => prev.filter((r) => r.id !== id));
  setActiveResourceDropdown(null);
 };

 // 3. Email Templates State
 const [templates, setTemplates] = React.useState<EmailTemplate[]>([
  {
   id: "offer",
   name: "Offer",
   subject: "Offer from {{company_name}}",
   body: "Dear {{candidate_first_name}},\n\n{{company_name}} is excited to bring you on board as {{job_title}}.\n\nYou were our best candidates. We were really sold on your [details about the candidate that made them your choice].\n\n{{company_name}} is offering a [full time, part time, etc.] position for you as {{job_title}}, reporting to [immediate manager/supervisor] starting on [proposed start date] at [workplace location]\n\nBest regards,\n\n{{company_name}}",
   stage: "Offered",
   lastModified: "13 Jul 2022",
   isLocked: true,
  },
  {
   id: "auto-confirmation",
   name: "Auto Confirmation",
   subject: "Thank you for your application at {{company_name}}",
   body: "Hi {{candidate_name}},\n\nThank you for applying to the {{job_title}} position at {{company_name}}...\n\nBest regards,\nHR Team",
   stage: "Applied",
   lastModified: "1 Apr 2023",
   isLocked: true,
  },
  {
   id: "rejection",
   name: "Rejection",
   subject: "{{job_title}} position at {{company_name}}",
   body: "Hi {{candidate_name}},\n\nThank you for your interest in the {{job_title}} position at {{company_name}}...\n\nBest regards,\nHR Team",
   stage: "Rejected",
   lastModified: "10 Jan 2023",
   isLocked: true,
  },
 ]);

 const [searchQuery, setSearchQuery] = React.useState("");
 const [stageFilter, setStageFilter] = React.useState("All Stages");
 const [isStageFilterOpen, setIsStageFilterOpen] = React.useState(false);
 const stageFilterRef = React.useRef<HTMLDivElement>(null);

 const [isAddTemplateOpen, setIsAddTemplateOpen] = React.useState(false);
 const [newTemplateName, setNewTemplateName] = React.useState("");
 const [newTemplateSubject, setNewTemplateSubject] = React.useState("");
 const [newTemplateBody, setNewTemplateBody] = React.useState("");
 const [newTemplateStage, setNewTemplateStage] = React.useState("Applied");

 const [editingTemplate, setEditingTemplate] = React.useState<EmailTemplate | null>(null);
 const [editTemplateName, setEditTemplateName] = React.useState("");
 const [editTemplateSubject, setEditTemplateSubject] = React.useState("");
 const [editTemplateBody, setEditTemplateBody] = React.useState("");
 const [editTemplateStage, setEditTemplateStage] = React.useState("");

 // Close stage filter dropdown on click outside
 React.useEffect(() => {
  const handleOutsideStageFilter = (e: MouseEvent) => {
   if (stageFilterRef.current && !stageFilterRef.current.contains(e.target as Node)) {
    setIsStageFilterOpen(false);
   }
  };
  document.addEventListener("mousedown", handleOutsideStageFilter);
  return () => document.removeEventListener("mousedown", handleOutsideStageFilter);
 }, []);

 const handleAddTemplate = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newTemplateName.trim() || !newTemplateSubject.trim() || !newTemplateBody.trim()) return;
  const newTemplate: EmailTemplate = {
   id: newTemplateName.toLowerCase().replace(/\s+/g, "-"),
   name: newTemplateName.trim(),
   subject: newTemplateSubject.trim(),
   body: newTemplateBody.trim(),
   stage: newTemplateStage,
   lastModified: new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
   }),
   isLocked: false,
  };
  setTemplates((prev) => [...prev, newTemplate]);
  setNewTemplateName("");
  setNewTemplateSubject("");
  setNewTemplateBody("");
  setNewTemplateStage("Applied");
  setIsAddTemplateOpen(false);
 };

 const handleSaveTemplate = (e: React.FormEvent) => {
  e.preventDefault();
  if (!editingTemplate || !editTemplateName.trim() || !editTemplateSubject.trim() || !editTemplateBody.trim()) return;
  setTemplates((prev) =>
   prev.map((t) =>
    t.id === editingTemplate.id
     ? {
      ...t,
      name: editTemplateName.trim(),
      subject: editTemplateSubject.trim(),
      body: editTemplateBody.trim(),
      stage: editTemplateStage,
      lastModified: new Date().toLocaleDateString("en-GB", {
       day: "numeric",
       month: "short",
       year: "numeric",
      }),
     }
     : t
   )
  );
  setEditingTemplate(null);
 };

 const handleDeleteTemplate = (id: string) => {
  setTemplates((prev) => prev.filter((t) => t.id !== id));
 };

 const filteredTemplates = templates.filter((t) => {
  const matchesSearch =
   t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
   t.subject.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesStage = stageFilter === "All Stages" || t.stage === stageFilter;
  return matchesSearch && matchesStage;
 });

 return (
  <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
   <PageHeader title="Setting Recruitment" description={`${activeTab === "workflow" && "Hiring Workflow"}
   ${activeTab === "tags" && "Tag & Resource"}
   ${activeTab === "emails" && "Email Template"}`}
   />

   {/* Settings Grid Layout */}
   <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
    <SettingsTabs
     tabs={tabs}
     activeTab={activeTab}
     onChange={setActiveTab}
     variant="emerald"
    />

    {/* Right Content */}
    <Card className="p-4 md:p-8 border border-gray-300 dark:border-gray-800 md:col-span-3">
     {/* Tab 1: Hiring Workflow */}
     {activeTab === "workflow" && (
      <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hiring Workflow</h2>
        <Button
         variant="primary"
         onClick={() => setIsAddStageOpen(true)}
         className="bg-[#11131A] dark:bg-white dark:text-gray-900 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
         <HiOutlinePlus className="text-sm" /> New Stage
        </Button>
       </div>

       {/* Stage List Divider Container */}
       <div className="border border-gray-300 dark:border-gray-800 rounded-2xl overflow-hidden divide-y divide-gray-200 dark:divide-gray-800">
        {stages.map((stage, index) => {
         const isLocked = stage.isLocked;
         const isDragging = draggedIndex === index;
         return (
          <div
           key={stage.id}
           draggable={!isLocked}
           onDragStart={() => handleDragStart(index)}
           onDragOver={(e) => handleDragOver(e, index)}
           onDrop={() => handleDrop(index)}
           className={`flex items-center justify-between px-6 py-4 transition-colors select-none ${isDragging ? "opacity-30 bg-gray-50 dark:bg-gray-850" : "bg-white dark:bg-gray-950"
            } ${!isLocked ? "hover:bg-gray-50/50 dark:hover:bg-gray-900/30" : ""}`}
          >
           {/* Left: Drag Handle or Lock + Name */}
           <div className="flex items-center gap-4">
            {isLocked ? (
             <HiOutlineLockClosed className="text-gray-400 dark:text-gray-505 text-base" />
            ) : (
             <div className="cursor-grab active:cursor-grabbing text-gray-405 hover:text-gray-600 dark:hover:text-gray-200 p-1">
              <HiOutlineBars3 className="text-base" />
             </div>
            )}
            <span className="text-xs font-bold text-gray-800 dark:text-gray-250">
             {stage.name}
            </span>
           </div>

           {/* Right: Dot Options Menu */}
           {!isLocked && (
            <div className="relative">
             <button
              onClick={() => setActiveDropdown(activeDropdown === stage.id ? null : stage.id)}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-255 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
             >
              <HiOutlineEllipsisVertical className="text-base" />
             </button>

             {activeDropdown === stage.id && (
              <div
               ref={dropdownRef}
               className="absolute right-0 top-full mt-1 z-50 w-36 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg py-1.5 flex flex-col gap-0.5"
              >
               <button
                onClick={() => {
                 setEditingStage(stage);
                 setEditStageName(stage.name);
                 setActiveDropdown(null);
                }}
                className="flex items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
               >
                <HiOutlinePencilSquare className="text-sm" /> Rename
               </button>
               <button
                onClick={() => handleDeleteStage(stage.id)}
                className="flex items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-955/20"
               >
                <HiOutlineTrash className="text-sm" /> Delete
               </button>
              </div>
             )}
            </div>
           )}
          </div>
         );
        })}
       </div>
      </div>
     )}

     {/* Tab 2: Tag & Resource */}
     {activeTab === "tags" && (
      <div className="flex flex-col gap-6 animate-fadeIn">
       {/* Header with action button */}
       <div className="flex items-center justify-between pb-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tag & Resource</h2>
        {activeSubTab === "tag" ? (
         <Button
          variant="primary"
          onClick={() => {
           setNewTagName("");
           setIsAddTagOpen(true);
          }}
          className="bg-[#11131A] dark:bg-white dark:text-gray-900 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
         >
          <HiOutlinePlus className="text-sm" /> New Tag
         </Button>
        ) : (
         <Button
          variant="primary"
          onClick={() => {
           setNewResourceName("");
           setIsAddResourceOpen(true);
          }}
          className="bg-[#11131A] dark:bg-white dark:text-gray-900 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
         >
          <HiOutlinePlus className="text-sm" /> New Resource
         </Button>
        )}
       </div>

       {/* Sub-tab navigation bar */}
       <div className="flex gap-6 border-b border-gray-300 dark:border-gray-800 pb-2.5 mb-2">
        <button
         onClick={() => setActiveSubTab("tag")}
         className={`text-xs font-bold pb-2 transition-all cursor-pointer ${activeSubTab === "tag"
          ? "text-[#10B981] border-b-2 border-[#10B981] -mb-[12px]"
          : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          }`}
        >
         Tag
        </button>
        <button
         onClick={() => setActiveSubTab("resource")}
         className={`text-xs font-bold pb-2 transition-all cursor-pointer ${activeSubTab === "resource"
          ? "text-[#10B981] border-b-2 border-[#10B981] -mb-[12px]"
          : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          }`}
        >
         Resource
        </button>
       </div>

       {/* Sub-tab 1: Tag list grid */}
       {activeSubTab === "tag" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
         {tags.map((tag) => (
          <div
           key={tag.id}
           className="border border-gray-300 dark:border-gray-800 rounded-2xl p-5 flex items-center justify-between bg-white dark:bg-gray-950/40 hover:bg-gray-50/30 dark:hover:bg-gray-900/10 transition-colors"
          >
           <div className="flex flex-col gap-1">
            <h4 className="text-xs font-bold text-gray-850 dark:text-gray-200">{tag.name}</h4>
            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">
             {tag.candidateCount} {tag.candidateCount === 1 ? "Candidate" : "Candidates"}
            </span>
           </div>

           {/* Ellipsis actions menu */}
           <div className="relative">
            <button
             onClick={() => setActiveTagDropdown(activeTagDropdown === tag.id ? null : tag.id)}
             className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
             <HiOutlineEllipsisVertical className="text-base" />
            </button>

            {activeTagDropdown === tag.id && (
             <div
              ref={tagDropdownRef}
              className="absolute right-0 top-full mt-1 z-50 w-32 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg py-1 flex flex-col gap-0.5"
             >
              <button
               onClick={() => {
                setEditingTag(tag);
                setEditTagName(tag.name);
                setActiveTagDropdown(null);
               }}
               className="flex items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
               <HiOutlinePencilSquare className="text-xs" /> Rename
              </button>
              <button
               onClick={() => handleDeleteTag(tag.id)}
               className="flex items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-red-650 hover:bg-red-50 dark:hover:bg-red-955/20"
              >
               <HiOutlineTrash className="text-xs" /> Delete
              </button>
             </div>
            )}
           </div>
          </div>
         ))}
        </div>
       )}

       {/* Sub-tab 2: Resource list grid */}
       {activeSubTab === "resource" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
         {resources.map((resource) => (
          <div
           key={resource.id}
           className="border border-gray-300 dark:border-gray-800 rounded-2xl p-5 flex items-center justify-between bg-white dark:bg-gray-950/40 hover:bg-gray-50/30 dark:hover:bg-gray-900/10 transition-colors"
          >
           <div className="flex flex-col gap-1">
            <h4 className="text-xs font-bold text-gray-850 dark:text-gray-200">{resource.name}</h4>
            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">
             {resource.updatedAt}
            </span>
           </div>

           {/* Right actions: Download & Ellipsis options */}
           <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline mr-1">
             Download
            </span>
            <div className="relative">
             <button
              onClick={() => setActiveResourceDropdown(activeResourceDropdown === resource.id ? null : resource.id)}
              className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
             >
              <HiOutlineEllipsisVertical className="text-base" />
             </button>

             {activeResourceDropdown === resource.id && (
              <div
               ref={resourceDropdownRef}
               className="absolute right-0 top-full mt-1 z-50 w-32 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg py-1 flex flex-col gap-0.5"
              >
               <button
                onClick={() => {
                 setEditingResource(resource);
                 setEditResourceName(resource.name);
                 setActiveResourceDropdown(null);
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
               >
                <HiOutlinePencilSquare className="text-xs" /> Rename
               </button>
               <button
                onClick={() => handleDeleteResource(resource.id)}
                className="flex items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-red-650 hover:bg-red-50 dark:hover:bg-red-955/20"
               >
                <HiOutlineTrash className="text-xs" /> Delete
               </button>
              </div>
             )}
            </div>
           </div>
          </div>
         ))}
        </div>
       )}
      </div>
     )}

     {/* Tab 3: Email Templates */}
     {activeTab === "emails" && (
      <div className="flex flex-col gap-6 animate-fadeIn">
       {/* Header with action button */}
       <div className="flex items-center justify-between pb-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Email Template</h2>
        <Button
         variant="primary"
         onClick={() => {
          setNewTemplateName("");
          setNewTemplateSubject("");
          setNewTemplateBody("");
          setNewTemplateStage("Applied");
          setIsAddTemplateOpen(true);
         }}
         className="bg-[#11131A] dark:bg-white dark:text-gray-900 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
         <HiOutlinePlus className="text-sm" /> Add Template
        </Button>
       </div>

       {/* Filters and search bar */}
       <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mt-2 mb-2">
        {/* Custom dropdown trigger */}
        <div className="relative" ref={stageFilterRef}>
         <button
          onClick={() => setIsStageFilterOpen(!isStageFilterOpen)}
          className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-250 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer w-40"
         >
          <span>{stageFilter}</span>
          <HiOutlineChevronDown className="text-gray-400 text-sm" />
         </button>

         {isStageFilterOpen && (
          <div className="absolute left-0 top-full mt-1.5 z-50 w-44 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg py-1.5 flex flex-col gap-0.5">
           {["All Stages", "Applied", "Screening", "1st Interview", "2nd Interview", "Offered", "Hired", "Rejected"].map((stage) => (
            <button
             key={stage}
             onClick={() => {
              setStageFilter(stage);
              setIsStageFilterOpen(false);
             }}
             className={`px-4 py-2 text-left text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${stageFilter === stage
              ? "text-primary bg-primary/5 dark:bg-primary/10 font-bold"
              : "text-gray-750 dark:text-gray-300"
              }`}
            >
             {stage}
            </button>
           ))}
          </div>
         )}
        </div>

        {/* Search field */}
        <div className="relative flex-1 max-w-xs">
         <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
         <input
          type="text"
          placeholder="Search what you need"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-250 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
         />
        </div>
       </div>

       {/* Templates table */}
       <div className="border border-gray-300 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-950/40">
        <table>
         <thead className="bg-gray-50/50 dark:bg-gray-900/30">
          <tr className="border-b border-gray-300 dark:border-gray-800">
           <th className="text-[10px] font-bold uppercase tracking-wider text-gray-400 py-3.5 px-6">Name</th>
           <th className="text-[10px] font-bold uppercase tracking-wider text-gray-400 py-3.5 px-4">Subject</th>
           <th className="text-[10px] font-bold uppercase tracking-wider text-gray-400 py-3.5 px-4">Stage</th>
           <th className="text-[10px] font-bold uppercase tracking-wider text-gray-400 py-3.5 px-4">Last Modified</th>
           <th className="text-[10px] font-bold uppercase tracking-wider text-gray-400 py-3.5 px-4 text-center">Action</th>
          </tr>
         </thead>
         <tbody>
          {filteredTemplates.length === 0 ? (
           <tr>
            <td colSpan={5} className="text-center py-10 text-xs font-semibold text-gray-450 dark:text-gray-500">
             No email templates found.
            </td>
           </tr>
          ) : (
           filteredTemplates.map((t) => (
            <tr key={t.id} className="border-b border-gray-300 dark:border-gray-800 hover:bg-gray-50/20 dark:hover:bg-gray-900/10 transition-colors">
             <td className="py-4 px-6">
              <div className="flex items-center gap-2">
               <HiOutlineEnvelope className="text-gray-400 dark:text-gray-500 text-base" />
               <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{t.name}</span>
               {t.isLocked && (
                <HiOutlineLockClosed className="text-gray-400 dark:text-gray-550 text-xs" />
               )}
              </div>
             </td>
             <td className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 max-w-xs truncate">
              {t.subject}
             </td>
             <td className="py-4 px-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/30 text-[#10B981] border border-emerald-100 dark:border-emerald-900/50">
               {t.stage}
              </span>
             </td>
             <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
              {t.lastModified}
             </td>
             <td className="py-4 px-4 text-center">
              <div className="flex justify-center">
               <TableActions
                onEdit={() => {
                 setEditingTemplate(t);
                 setEditTemplateName(t.name);
                 setEditTemplateSubject(t.subject);
                 setEditTemplateBody(t.body);
                 setEditTemplateStage(t.stage);
                }}
                onDelete={!t.isLocked ? () => handleDeleteTemplate(t.id) : undefined}
               />
              </div>
             </td>
            </tr>
           ))
          )}
         </tbody>
        </table>
       </div>

       <div className="mt-2">
        <Pagination className="mt-0 w-full" />
       </div>
      </div>
     )}
    </Card>
   </div>

   {/* MODAL 1: Create New Stage */}
   <Modal isOpen={isAddStageOpen} onClose={() => setIsAddStageOpen(false)}>
    <form onSubmit={handleAddStage} className="flex flex-col bg-white dark:bg-gray-950">
     <ModalHeader onClose={() => setIsAddStageOpen(false)}>
      <ModalTitle>Add New Stage</ModalTitle>
     </ModalHeader>
     <ModalContent>
      <Input
       label="Stage Name"
       required
       placeholder="e.g. Technical Test"
       value={newStageName}
       onChange={(e) => setNewStageName(e.target.value)}
       className="text-xs font-semibold"
      />
     </ModalContent>
     <ModalFooter className="flex items-center justify-end gap-3 px-6">
      <Button
       type="button"
       variant="outline"
       onClick={() => setIsAddStageOpen(false)}
       className="px-6 h-12 rounded-xl text-xs font-bold"
      >
       Cancel
      </Button>
      <Button
       type="submit"
       variant="primary"
       className="px-6 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900 cursor-pointer"
      >
       Create
      </Button>
     </ModalFooter>
    </form>
   </Modal>

   {/* MODAL 2: Rename Stage */}
   <Modal isOpen={editingStage !== null} onClose={() => setEditingStage(null)}>
    {editingStage && (
     <form onSubmit={handleRenameStage} className="flex flex-col bg-white dark:bg-gray-950">
      <ModalHeader onClose={() => setEditingStage(null)}>
       <ModalTitle>Rename Stage</ModalTitle>
      </ModalHeader>
      <ModalContent>
       <Input
        label="Stage Name"
        required
        placeholder="e.g. Phone Screen"
        value={editStageName}
        onChange={(e) => setEditStageName(e.target.value)}
        className="text-xs font-semibold"
       />
      </ModalContent>
      <ModalFooter className="flex items-center justify-end gap-3 px-6">
       <Button
        type="button"
        variant="outline"
        onClick={() => setEditingStage(null)}
        className="px-6 h-12 rounded-xl text-xs font-bold"
       >
        Cancel
       </Button>
       <Button
        type="submit"
        variant="primary"
        className="px-6 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900 cursor-pointer"
       >
        Save
       </Button>
      </ModalFooter>
     </form>
    )}
   </Modal>

   {/* MODAL 3: Create New Tag */}
   <Modal isOpen={isAddTagOpen} onClose={() => setIsAddTagOpen(false)}>
    <form onSubmit={handleAddTag} className="flex flex-col bg-white dark:bg-gray-950">
     <ModalHeader onClose={() => setIsAddTagOpen(false)}>
      <ModalTitle>Add New Tag</ModalTitle>
     </ModalHeader>
     <ModalContent>
      <Input
       label="Tag Name"
       required
       placeholder="e.g. Design"
       value={newTagName}
       onChange={(e) => setNewTagName(e.target.value)}
       className="text-xs font-semibold"
      />
     </ModalContent>
     <ModalFooter className="flex items-center justify-end gap-3 px-6">
      <Button
       type="button"
       variant="outline"
       onClick={() => setIsAddTagOpen(false)}
       className="px-6 h-12 rounded-xl text-xs font-bold"
      >
       Cancel
      </Button>
      <Button
       type="submit"
       variant="primary"
       className="px-6 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900 cursor-pointer"
      >
       Create
      </Button>
     </ModalFooter>
    </form>
   </Modal>

   {/* MODAL 4: Rename Tag */}
   <Modal isOpen={editingTag !== null} onClose={() => setEditingTag(null)}>
    {editingTag && (
     <form onSubmit={handleRenameTag} className="flex flex-col bg-white dark:bg-gray-950">
      <ModalHeader onClose={() => setEditingTag(null)}>
       <ModalTitle>Rename Tag</ModalTitle>
      </ModalHeader>
      <ModalContent>
       <Input
        label="Tag Name"
        required
        placeholder="e.g. Engineering"
        value={editTagName}
        onChange={(e) => setEditTagName(e.target.value)}
        className="text-xs font-semibold"
       />
      </ModalContent>
      <ModalFooter className="flex items-center justify-end gap-3 px-6">
       <Button
        type="button"
        variant="outline"
        onClick={() => setEditingTag(null)}
        className="px-6 h-12 rounded-xl text-xs font-bold"
       >
        Cancel
       </Button>
       <Button
        type="submit"
        variant="primary"
        className="px-6 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900 cursor-pointer"
       >
        Save
       </Button>
      </ModalFooter>
     </form>
    )}
   </Modal>

   {/* MODAL 5: Create New Resource */}
   <Modal isOpen={isAddResourceOpen} onClose={() => setIsAddResourceOpen(false)}>
    <form onSubmit={handleAddResource} className="flex flex-col bg-white dark:bg-gray-950">
     <ModalHeader onClose={() => setIsAddResourceOpen(false)}>
      <ModalTitle>Add New Resource</ModalTitle>
     </ModalHeader>
     <ModalContent>
      <Input
       label="Resource Name"
       required
       placeholder="e.g. Interview Evaluation Sheet"
       value={newResourceName}
       onChange={(e) => setNewResourceName(e.target.value)}
       className="text-xs font-semibold"
      />
     </ModalContent>
     <ModalFooter className="flex items-center justify-end gap-3 px-6">
      <Button
       type="button"
       variant="outline"
       onClick={() => setIsAddResourceOpen(false)}
       className="px-6 h-12 rounded-xl text-xs font-bold"
      >
       Cancel
      </Button>
      <Button
       type="submit"
       variant="primary"
       className="px-6 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900 cursor-pointer"
      >
       Create
      </Button>
     </ModalFooter>
    </form>
   </Modal>

   {/* MODAL 6: Rename Resource */}
   <Modal isOpen={editingResource !== null} onClose={() => setEditingResource(null)}>
    {editingResource && (
     <form onSubmit={handleRenameResource} className="flex flex-col bg-white dark:bg-gray-950">
      <ModalHeader onClose={() => setEditingResource(null)}>
       <ModalTitle>Rename Resource</ModalTitle>
      </ModalHeader>
      <ModalContent>
       <Input
        label="Resource Name"
        required
        placeholder="e.g. Interview Evaluation Sheet"
        value={editResourceName}
        onChange={(e) => setEditResourceName(e.target.value)}
        className="text-xs font-semibold"
       />
      </ModalContent>
      <ModalFooter className="flex items-center justify-end gap-3 px-6">
       <Button
        type="button"
        variant="outline"
        onClick={() => setEditingResource(null)}
        className="px-6 h-12 rounded-xl text-xs font-bold"
       >
        Cancel
       </Button>
       <Button
        type="submit"
        variant="primary"
        className="px-6 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900 cursor-pointer"
       >
        Save
       </Button>
      </ModalFooter>
     </form>
    )}
   </Modal>

   {/* MODAL 7: Create New Email Template */}
   <Modal isOpen={isAddTemplateOpen} onClose={() => setIsAddTemplateOpen(false)} position="right" className="sm:max-w-2xl h-full rounded-none sm:rounded-l-3xl">
    <form onSubmit={handleAddTemplate} className="flex flex-col h-full bg-white dark:bg-gray-950">
     <ModalHeader className="border-b-0 pb-0" onClose={() => setIsAddTemplateOpen(false)}>
      <ModalTitle className="text-xl font-bold text-gray-900 dark:text-white">Add New Email Template</ModalTitle>
     </ModalHeader>
     <ModalContent className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
       <Input
        label="Template Name"
        required
        placeholder="e.g. Interview Invite"
        value={newTemplateName}
        onChange={(e) => setNewTemplateName(e.target.value)}
        className="text-xs font-semibold"
       />
       <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold text-gray-555 dark:text-gray-400">Trigger Stage</label>
        <div className="relative">
         <select
          value={newTemplateStage}
          onChange={(e) => setNewTemplateStage(e.target.value)}
          className="w-full h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-none appearance-none cursor-pointer pr-10 transition-colors"
         >
          {["Applied", "Screening", "1st Interview", "2nd Interview", "Offered", "Hired", "Rejected"].map((s) => (
           <option key={s} value={s}>{s}</option>
          ))}
         </select>
         <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
        </div>
       </div>
      </div>

      <Input
       label="Email Subject"
       required
       placeholder="e.g. Interview scheduled for {{job_title}}"
       value={newTemplateSubject}
       onChange={(e) => setNewTemplateSubject(e.target.value)}
       className="text-xs font-semibold"
      />

      <div className="flex flex-col gap-1.5 w-full">
       <label className="text-[11px] font-bold text-gray-555 dark:text-gray-400">Email Body</label>
       {/* Rich Editor Toolbar and Textarea wrapper */}
       <div className="flex flex-col border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        {/* Editor Toolbar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50/50 dark:bg-gray-900/60 border-b border-gray-300 dark:border-gray-700 flex-wrap">
         <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-750 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Bold"
         >
          B
         </button>
         <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-750 dark:text-gray-300 italic font-serif hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Italic"
         >
          I
         </button>
         <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-750 dark:text-gray-300 underline hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Underline"
         >
          U
         </button>
         <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
         <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Insert Emoji"
         >
          <HiOutlineFaceSmile className="text-lg" />
         </button>
         <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Insert Link"
         >
          <HiOutlineLink className="text-lg" />
         </button>
         <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Bullet List"
         >
          <HiOutlineListBullet className="text-lg" />
         </button>
         <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Align Left"
         >
          <HiOutlineBars3BottomLeft className="text-lg" />
         </button>
        </div>

        {/* Body Editor textarea */}
        <textarea
         required
         placeholder="Dear {{candidate_name}}, ..."
         value={newTemplateBody}
         onChange={(e) => setNewTemplateBody(e.target.value)}
         className="w-full min-h-[220px] bg-white dark:bg-gray-955 p-6 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none placeholder:text-gray-400 resize-none font-sans leading-relaxed"
        />
       </div>
      </div>
      <div className="text-[10px] text-gray-400 bg-gray-50 dark:bg-gray-900/60 p-2.5 rounded-lg flex flex-wrap gap-x-3 gap-y-1">
       <span className="font-bold">Supported Placeholders:</span>
       <span>{"{{candidate_name}}"}</span>
       <span>{"{{job_title}}"}</span>
       <span>{"{{company_name}}"}</span>
      </div>
     </ModalContent>
     <ModalFooter className="border-t-0 pt-0 pb-8 flex items-center justify-end gap-3 px-6">
      <Button
       type="button"
       variant="outline"
       onClick={() => setIsAddTemplateOpen(false)}
       className="px-8 h-12 rounded-xl text-xs font-bold"
      >
       Cancel
      </Button>
      <Button
       type="submit"
       variant="primary"
       className="px-8 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900 cursor-pointer"
      >
       Create
      </Button>
     </ModalFooter>
    </form>
   </Modal>

   {/* DRAWER: Detail Email Template (Edit Template Slide-Over) */}
   <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${editingTemplate ? "visible" : "invisible pointer-events-none"
    }`}>
    {/* Backdrop overlay */}
    <div
     onClick={() => setEditingTemplate(null)}
     className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${editingTemplate ? "opacity-100" : "opacity-0"
      }`}
    />

    {/* Sliding Panel */}
    <div className={`absolute top-0 right-0 h-full w-full max-w-xl md:max-w-2xl bg-white dark:bg-gray-950 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${editingTemplate ? "translate-x-0" : "translate-x-full"
     }`}>
     {/* Dismiss slide button (vertically centered on the left border of the drawer panel) */}
     <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
      <button
       type="button"
       onClick={() => setEditingTemplate(null)}
       className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-800 hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
      >
       <HiOutlineChevronRight className="text-xl" />
      </button>
     </div>

     {editingTemplate && (
      <form onSubmit={handleSaveTemplate} className="flex flex-col h-full bg-white dark:bg-gray-950">
       {/* Header */}
       <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Detail Email Template</h3>
        <button
         type="button"
         onClick={() => setEditingTemplate(null)}
         className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
        >
         <HiOutlineXMark className="text-xl" />
        </button>
       </div>

       {/* Scrollable Content Container */}
       <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5">
        {/* Two columns at the top: Stage and Email Template */}
        <div className="grid grid-cols-2 gap-4">
         <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Stage</label>
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-405 cursor-not-allowed">
           <span>{editTemplateStage}</span>
           <HiOutlineDocumentText className="text-gray-400 text-base" />
          </div>
         </div>
         <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email Template</label>
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-405 cursor-not-allowed">
           <span>{editTemplateName}</span>
           <HiOutlineDocumentText className="text-gray-400 text-base" />
          </div>
         </div>
        </div>

        {/* Subject field */}
        <div className="flex flex-col gap-1.5">
         <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          Subject <span className="text-red-500">*</span>
         </label>
         <input
          type="text"
          required
          placeholder="Offer from {{company_name}}"
          value={editTemplateSubject}
          onChange={(e) => setEditTemplateSubject(e.target.value)}
          className="h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none transition-colors"
         />
        </div>

        {/* Rich Editor Toolbar and Textarea wrapper */}
        <div className="flex flex-col border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
         {/* Editor Toolbar */}
         <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50/50 dark:bg-gray-900/60 border-b border-gray-300 dark:border-gray-700 flex-wrap">
          <button
           type="button"
           className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-750 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
           title="Bold"
          >
           B
          </button>
          <button
           type="button"
           className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-750 dark:text-gray-300 italic font-serif hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
           title="Italic"
          >
           I
          </button>
          <button
           type="button"
           className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-750 dark:text-gray-300 underline hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
           title="Underline"
          >
           U
          </button>
          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
          <button
           type="button"
           className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
           title="Insert Emoji"
          >
           <HiOutlineFaceSmile className="text-lg" />
          </button>
          <button
           type="button"
           className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
           title="Insert Link"
          >
           <HiOutlineLink className="text-lg" />
          </button>
          <button
           type="button"
           className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
           title="Bullet List"
          >
           <HiOutlineListBullet className="text-lg" />
          </button>
          <button
           type="button"
           className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
           title="Align Left"
          >
           <HiOutlineBars3BottomLeft className="text-lg" />
          </button>
         </div>

         {/* Body Editor textarea */}
         <textarea
          required
          value={editTemplateBody}
          onChange={(e) => setEditTemplateBody(e.target.value)}
          className="w-full min-h-[300px] bg-white dark:bg-gray-950 p-6 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none placeholder:text-gray-400 resize-none font-sans leading-relaxed"
         />
        </div>
       </div>

       {/* Footer */}
       <div className="px-8 py-5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-3 bg-gray-50/20 dark:bg-gray-955">
        <Button
         type="button"
         variant="outline"
         onClick={() => setEditingTemplate(null)}
         className="px-8 h-12 rounded-xl text-xs font-bold transition-all"
        >
         Cancel
        </Button>
        <Button
         type="submit"
         variant="primary"
         className="px-8 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900 cursor-pointer transition-all"
        >
         Save
        </Button>
       </div>
      </form>
     )}
    </div>
   </div>
  </div>
 );
}
