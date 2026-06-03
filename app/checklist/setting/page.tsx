"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  HiOutlineUserPlus,
  HiOutlineUserMinus,
  HiOutlinePlus,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { NewTemplateDrawer, LinkTaskDrawer } from "@/components/ui/drawer";
import { EmptyState } from "@/components/ui/empty-state";
import { DeleteModal } from "@/components/ui/modal";

import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import {
  useGetChecklistTemplatesQuery,
  useCreateChecklistTemplateMutation,
  useDeleteChecklistTemplateMutation,
  ChecklistTemplate,
} from "@/store/services/checklistTemplatesApi";
import { SVGLoaderFetch } from "@/components/ui/options";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "sonner";
import { TableActions } from "@/components/ui/table-actions";
import { useRouter } from "next/navigation";

export default function ChecklistSettingPage() {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const companyId = currentUser?.companyId ?? "";

  const [activeTab, setActiveTab] = React.useState<"onboarding" | "offboarding">("onboarding");
  const [isNewTemplateOpen, setIsNewTemplateOpen] = React.useState(false);
  const [templateToDelete, setTemplateToDelete] = React.useState<ChecklistTemplate | null>(null);
  const [templateToLink, setTemplateToLink] = React.useState<ChecklistTemplate | null>(null);

  const { data, isLoading, error: loadError } = useGetChecklistTemplatesQuery(
    { companyId, type: activeTab },
    { skip: !companyId }
  );

  const [createTemplate, { isLoading: isCreatingTemplate, error: createError }] = useCreateChecklistTemplateMutation();
  const [deleteTemplate, { isLoading: isDeletingTemplate, error: deleteError }] = useDeleteChecklistTemplateMutation();

  useApiError(!!loadError, loadError, "Failed to load templates");
  useApiError(!!createError, createError, "Failed to create template");
  useApiError(!!deleteError, deleteError, "Failed to delete template");

  const activeTemplates = data?.checklistTemplates || [];

  const handleCreateTemplate = async (name: string, description: string) => {
    try {
      await createTemplate({
        name,
        description,
        type: activeTab,
        companyId,
      }).unwrap();
      toast.success(`Template "${name}" created successfully!`);
    } catch (err) {
      console.error("Failed to create template:", err);
      throw err;
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      await deleteTemplate(id).unwrap();
      toast.success("Template deleted successfully!");
      setTemplateToDelete(null);
    } catch (err) {
      console.error("Failed to delete template:", err);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setting Checklist</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">
          {activeTab} Template
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Tab Panel */}
        <Card className="lg:col-span-3 p-4 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 flex flex-col gap-2 rounded-2xl">
          <button
            onClick={() => setActiveTab("onboarding")}
            className={`flex items-center gap-3.5 px-4 py-4 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === "onboarding"
                ? "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/10 dark:text-[#0FAF7A]"
                : "text-gray-550 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
          >
            <HiOutlineUserPlus className="text-lg" />
            <span>Onboarding Template</span>
          </button>

          <button
            onClick={() => setActiveTab("offboarding")}
            className={`flex items-center gap-3.5 px-4 py-4 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === "offboarding"
                ? "bg-[#E8FAF4] text-[#0FAF7A] dark:bg-[#0FAF7A]/10 dark:text-[#0FAF7A]"
                : "text-gray-550 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
          >
            <HiOutlineUserMinus className="text-lg" />
            <span>Off Boarding Template</span>
          </button>
        </Card>

        {/* Right Templates List Panel */}
        <Card className="lg:col-span-9 p-4 md:p-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 rounded-2xl flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 dark:text-white capitalize">
              {activeTab} Templates
            </h2>

            <button
              onClick={() => setIsNewTemplateOpen(true)}
              className="h-11 px-5 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
            >
              <HiOutlinePlus className="text-sm font-bold" />
              <span>New Template</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {isLoading ? (
              <SVGLoaderFetch text="Loading templates..." asTable={false} />
            ) : activeTemplates.length === 0 ? (
              <EmptyState
                icon={<HiOutlineClipboardDocumentList className="text-3xl text-gray-300" />}
                title="No templates configured"
                description="Create templates to streamline onboarding and offboarding checklist workflows for your organization."
                actionLabel="New Template"
                onAction={() => setIsNewTemplateOpen(true)}
              />
            ) : (
              activeTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-6 border border-gray-300 dark:border-gray-800/80 rounded-2xl flex items-center justify-between gap-4 bg-white dark:bg-gray-900 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                    <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mt-1">
                      {template.description}
                    </p>
                  </div>

                  <TableActions
                    onView={() => router.push(`/checklist/setting/detail?id=${template.id}`)}
                    onLink={() => setTemplateToLink(template)}
                    onDelete={() => setTemplateToDelete(template)}
                  />
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <NewTemplateDrawer
        isOpen={isNewTemplateOpen}
        onClose={() => setIsNewTemplateOpen(false)}
        onCreate={handleCreateTemplate}
      />

      <DeleteModal
        isOpen={templateToDelete !== null}
        onClose={() => setTemplateToDelete(null)}
        onConfirm={async () => {
          if (templateToDelete) {
            await handleDeleteTemplate(templateToDelete.id);
          }
        }}
        itemName={templateToDelete?.name}
        title="Delete Template"
        isLoading={isDeletingTemplate}
      />

      <LinkTaskDrawer
        isOpen={templateToLink !== null}
        onClose={() => setTemplateToLink(null)}
        templateName={templateToLink?.name}
        onSave={(selectedTaskIds) => {
          console.log(`Linked tasks ${selectedTaskIds} to template ${templateToLink?.id}`);
        }}
      />
    </div>
  );
}
