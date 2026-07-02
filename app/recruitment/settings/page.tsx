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
import { DetailEmailTemplateDrawer } from "@/components/ui/drawer";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter, CreateEmailTemplateModal, CreateStageModal, RenameResourceModal, CreateTagModal, RenameTagModal, RenameStageModal, CreateResourceModal } from "@/components/ui/modal";

import { PageHeader } from "@/components/ui/page-header";

import { TableActions } from "@/components/ui/table-actions";
import { useApiError } from "@/hooks/useApiError";
import { RecruitmentSettingsSkeleton } from "@/components/ui/skeleton/recruitment-skeletons";
import {
 useGetStagesQuery,
 useCreateStageMutation,
 useReorderStagesMutation,
 useUpdateStageMutation,
 useDeleteStageMutation,
 useGetTagsQuery,
 useCreateTagMutation,
 useUpdateTagMutation,
 useDeleteTagMutation,
 useGetResourcesQuery,
 useCreateResourceMutation,
 useUpdateResourceMutation,
 useDeleteResourceMutation,
 useGetEmailTemplatesQuery,
 useCreateEmailTemplateMutation,
 useUpdateEmailTemplateMutation,
 useDeleteEmailTemplateMutation,
 Stage,
 TagItem,
 ResourceItem,
 EmailTemplate,
} from "@/store/services/recruitmentApi";

export default function RecruitmentSettingsPage() {
 const [activeTab, setActiveTab] = React.useState<"workflow" | "tags" | "emails">("workflow");

 const tabs: SettingsTabItem[] = [
  { id: "workflow", label: "Hiring Workflow", icon: <HiOutlineUsers /> },
  { id: "tags", label: "Tag & Resource", icon: <HiOutlineTag /> },
  { id: "emails", label: "Email Template", icon: <HiOutlineEnvelope /> },
 ];

 // Query hooks
 const { data: stagesData, isLoading: isStagesLoading, error: stagesError } = useGetStagesQuery();
 const { data: tagsData, isLoading: isTagsLoading, error: tagsError } = useGetTagsQuery();
 const { data: resourcesData, isLoading: isResourcesLoading, error: resourcesError } = useGetResourcesQuery();
 const { data: templatesData, isLoading: isTemplatesLoading, error: templatesError } = useGetEmailTemplatesQuery();

 // Mutation hooks
 const [createStage, { error: createStageError }] = useCreateStageMutation();
 const [updateStage, { error: updateStageError }] = useUpdateStageMutation();
 const [deleteStage, { error: deleteStageError }] = useDeleteStageMutation();
 const [reorderStages, { error: reorderStageError }] = useReorderStagesMutation();

 const [createTag, { error: createTagError }] = useCreateTagMutation();
 const [updateTag, { error: updateTagError }] = useUpdateTagMutation();
 const [deleteTag, { error: deleteTagError }] = useDeleteTagMutation();

 const [createResource, { error: createResourceError }] = useCreateResourceMutation();
 const [updateResource, { error: updateResourceError }] = useUpdateResourceMutation();
 const [deleteResource, { error: deleteResourceError }] = useDeleteResourceMutation();

 const [createTemplate, { error: createTemplateError }] = useCreateEmailTemplateMutation();
 const [updateTemplate, { error: updateTemplateError }] = useUpdateEmailTemplateMutation();
 const [deleteTemplate, { error: deleteTemplateError }] = useDeleteEmailTemplateMutation();

 // Handle errors using toast notifications
 useApiError(!!stagesError, stagesError, "Failed to load stages");
 useApiError(!!tagsError, tagsError, "Failed to load tags");
 useApiError(!!resourcesError, resourcesError, "Failed to load resources");
 useApiError(!!templatesError, templatesError, "Failed to load email templates");

 useApiError(!!createStageError, createStageError, "Failed to create stage");
 useApiError(!!updateStageError, updateStageError, "Failed to update stage");
 useApiError(!!deleteStageError, deleteStageError, "Failed to delete stage");
 useApiError(!!reorderStageError, reorderStageError, "Failed to reorder stages");

 useApiError(!!createTagError, createTagError, "Failed to create tag");
 useApiError(!!updateTagError, updateTagError, "Failed to update tag");
 useApiError(!!deleteTagError, deleteTagError, "Failed to delete tag");

 useApiError(!!createResourceError, createResourceError, "Failed to create resource");
 useApiError(!!updateResourceError, updateResourceError, "Failed to update resource");
 useApiError(!!deleteResourceError, deleteResourceError, "Failed to delete resource");

 useApiError(!!createTemplateError, createTemplateError, "Failed to create template");
 useApiError(!!updateTemplateError, updateTemplateError, "Failed to update template");
 useApiError(!!deleteTemplateError, deleteTemplateError, "Failed to delete template");

 // Resolve values from query response
 const stages = stagesData?.stages || [];
 const tags = tagsData?.tags || [];
 const resources = resourcesData?.resources || [];
 const templates = templatesData?.templates || [];

 const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
 const [isAddStageOpen, setIsAddStageOpen] = React.useState(false);
 const [editingStage, setEditingStage] = React.useState<Stage | null>(null);
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
  if (stages[index]?.isLocked) return;
  setDraggedIndex(index);
 };

 const handleDragOver = (e: React.DragEvent, index: number) => {
  e.preventDefault();
 };

 const handleDrop = async (index: number) => {
  if (draggedIndex === null) return;
  if (stages[index]?.isLocked) return; // Cannot drop on locked stages

  const updated = [...stages];
  const item = updated[draggedIndex];
  updated.splice(draggedIndex, 1);
  updated.splice(index, 0, item);
  
  setDraggedIndex(null);
  try {
   await reorderStages({ stageIds: updated.map((s) => s.id) }).unwrap();
  } catch (err) {
   // handled by useApiError
  }
 };

 const handleCreateStage = async (name: string) => {
  try {
   await createStage({ name }).unwrap();
   setIsAddStageOpen(false);
  } catch (err) {
   // handled by useApiError
  }
 };

 const handleRenameStage = async (name: string) => {
  if (!editingStage) return;
  try {
   await updateStage({ id: editingStage.id, name }).unwrap();
   setEditingStage(null);
  } catch (err) {
   // handled by useApiError
  }
 };

 const handleDeleteStage = async (id: string) => {
  if (confirm("Are you sure you want to delete this stage?")) {
   try {
    await deleteStage(id).unwrap();
    setActiveDropdown(null);
   } catch (err) {
    // handled by useApiError
   }
  }
 };

 // 2. Tags & Resources State
 const [activeSubTab, setActiveSubTab] = React.useState<"tag" | "resource">("tag");
 const [isAddTagOpen, setIsAddTagOpen] = React.useState(false);
 const [editingTag, setEditingTag] = React.useState<TagItem | null>(null);

 const [isAddResourceOpen, setIsAddResourceOpen] = React.useState(false);
 const [editingResource, setEditingResource] = React.useState<ResourceItem | null>(null);

 const handleCreateTag = async (name: string) => {
  try {
   await createTag({ name }).unwrap();
   setIsAddTagOpen(false);
  } catch (err) {
   // handled by useApiError
  }
 };

 const handleRenameTag = async (name: string) => {
  if (!editingTag) return;
  try {
   await updateTag({ id: editingTag.id, name }).unwrap();
   setEditingTag(null);
  } catch (err) {
   // handled by useApiError
  }
 };

 const handleDeleteTag = async (id: string) => {
  if (confirm("Are you sure you want to delete this tag?")) {
   try {
    await deleteTag(id).unwrap();
    setActiveTagDropdown(null);
   } catch (err) {
    // handled by useApiError
   }
  }
 };

 const handleCreateResource = async (name: string) => {
  try {
   await createResource({ name }).unwrap();
   setIsAddResourceOpen(false);
  } catch (err) {
   // handled by useApiError
  }
 };

 const handleRenameResource = async (name: string) => {
  if (!editingResource) return;
  try {
   await updateResource({ id: editingResource.id, name }).unwrap();
   setEditingResource(null);
  } catch (err) {
   // handled by useApiError
  }
 };

 const handleDeleteResource = async (id: string) => {
  if (confirm("Are you sure you want to delete this resource?")) {
   try {
    await deleteResource(id).unwrap();
    setActiveResourceDropdown(null);
   } catch (err) {
    // handled by useApiError
   }
  }
 };

 // 3. Email Templates State
 const [searchQuery, setSearchQuery] = React.useState("");
 const [stageFilter, setStageFilter] = React.useState("All Stages");
 const [isStageFilterOpen, setIsStageFilterOpen] = React.useState(false);
 const stageFilterRef = React.useRef<HTMLDivElement>(null);

 const [isAddTemplateOpen, setIsAddTemplateOpen] = React.useState(false);
 const [editingTemplate, setEditingTemplate] = React.useState<EmailTemplate | null>(null);

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

 const handleCreateTemplate = async (data: { name: string; stage: string; subject: string; body: string }) => {
  try {
   await createTemplate(data).unwrap();
   setIsAddTemplateOpen(false);
  } catch (err) {
   // handled by useApiError
  }
 };

 const handleUpdateTemplate = async (data: { id: string; name: string; subject: string; body: string; stage: string }) => {
  try {
   await updateTemplate(data).unwrap();
   setEditingTemplate(null);
  } catch (err) {
   // handled by useApiError
  }
 };

 const handleDeleteTemplate = async (id: string) => {
  if (confirm("Are you sure you want to delete this template?")) {
   try {
    await deleteTemplate(id).unwrap();
   } catch (err) {
    // handled by useApiError
   }
  }
 };

 const filteredTemplates = templates.filter((t) => {
  const matchesSearch =
   t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
   t.subject.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesStage = stageFilter === "All Stages" || t.stage === stageFilter;
  return matchesSearch && matchesStage;
 });

 if (isStagesLoading || isTagsLoading || isResourcesLoading || isTemplatesLoading) {
  return <RecruitmentSettingsSkeleton />;
 }

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
     onChange={(id) => setActiveTab(id as "workflow" | "tags" | "emails")}
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
           setIsAddTagOpen(true);
          }}
          className="bg-[#11131A] dark:bg-white dark:text-gray-900 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
         >
          <HiOutlinePlus className="text-sm" /> New Tag
         </Button>
        ) : (
         <Button
          variant="primary"
          onClick={() => setIsAddResourceOpen(true)}
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
                setActiveTagDropdown(null);
               }}
               className="flex items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-gray-770 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
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
                 setActiveResourceDropdown(null);
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-gray-770 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
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
         onClick={() => setIsAddTemplateOpen(true)}
         className="bg-[#11131A] dark:bg-white dark:text-gray-900 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
         <HiOutlinePlus className="text-sm" /> New Template
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
   <CreateStageModal
    isOpen={isAddStageOpen}
    onClose={() => setIsAddStageOpen(false)}
    onCreate={handleCreateStage}
   />

   {/* MODAL 2: Rename Stage */}
   <RenameStageModal
    isOpen={editingStage !== null}
    onClose={() => setEditingStage(null)}
    onRename={handleRenameStage}
    initialName={editingStage?.name || ""}
   />

   {/* MODAL 3: Create New Tag */}
   <CreateTagModal
    isOpen={isAddTagOpen}
    onClose={() => setIsAddTagOpen(false)}
    onCreate={handleCreateTag}
   />

   {/* MODAL 4: Rename Tag */}
   <RenameTagModal
    isOpen={editingTag !== null}
    onClose={() => setEditingTag(null)}
    onRename={handleRenameTag}
    initialName={editingTag?.name || ""}
   />

   {/* MODAL 5: Create New Resource */}
   <CreateResourceModal
    isOpen={isAddResourceOpen}
    onClose={() => setIsAddResourceOpen(false)}
    onCreate={handleCreateResource}
   />

   {/* MODAL 6: Rename Resource */}
   <RenameResourceModal
    isOpen={editingResource !== null}
    onClose={() => setEditingResource(null)}
    onRename={handleRenameResource}
    initialName={editingResource?.name || ""}
   />

   {/* MODAL 7: Create New Email Template */}
   <CreateEmailTemplateModal
    isOpen={isAddTemplateOpen}
    onClose={() => setIsAddTemplateOpen(false)}
    onCreate={handleCreateTemplate}
   />

   {/* DRAWER: Detail Email Template (Edit Template Slide-Over) */}
   <DetailEmailTemplateDrawer
    isOpen={editingTemplate !== null}
    onClose={() => setEditingTemplate(null)}
    onSave={handleUpdateTemplate}
    template={editingTemplate}
   />
  </div>
 );
}
