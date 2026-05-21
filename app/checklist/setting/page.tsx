"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  HiOutlineUserPlus,
  HiOutlineUserMinus,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlineLink,
  HiOutlineTrash,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { NewTemplateDrawer, LinkTaskDrawer } from "@/components/ui/drawer";
import { EmptyState } from "@/components/ui/empty-state";
import { DeleteModal } from "@/components/ui/modal";

interface TemplateItem {
  id: string;
  name: string;
  description: string;
}

export default function ChecklistSettingPage() {
  const [activeTab, setActiveTab] = React.useState<"onboarding" | "offboarding">("onboarding");
  const [isNewTemplateOpen, setIsNewTemplateOpen] = React.useState(false);
  const [templateToDelete, setTemplateToDelete] = React.useState<TemplateItem | null>(null);
  const [templateToLink, setTemplateToLink] = React.useState<TemplateItem | null>(null);

  // Mock template states
  const [onboardingTemplates, setOnboardingTemplates] = React.useState<TemplateItem[]>([
    {
      id: "onboarding-1",
      name: "Onboarding v.1",
      description: "Files about the importance of essential tasks",
    },
    {
      id: "onboarding-2",
      name: "Probation",
      description: "Files about the importance of essential tasks",
    },
  ]);

  const [offboardingTemplates, setOffboardingTemplates] = React.useState<TemplateItem[]>([
    {
      id: "offboarding-1",
      name: "Standard Offboarding",
      description: "Tasks for employee departure and offboarding processes",
    },
    {
      id: "offboarding-2",
      name: "Contract Expiration",
      description: "Standard checklist for contract non-renewals",
    },
  ]);

  const activeTemplates = activeTab === "onboarding" ? onboardingTemplates : offboardingTemplates;

  const handleCreateTemplate = (name: string, description: string) => {
    const newTemplate: TemplateItem = {
      id: `${activeTab}-${Date.now()}`,
      name,
      description: description || "Files about the importance of essential tasks",
    };
    if (activeTab === "onboarding") {
      setOnboardingTemplates((prev) => [...prev, newTemplate]);
    } else {
      setOffboardingTemplates((prev) => [...prev, newTemplate]);
    }
  };

  const handleDeleteTemplate = (id: string) => {
    if (activeTab === "onboarding") {
      setOnboardingTemplates((prev) => prev.filter((t) => t.id !== id));
    } else {
      setOffboardingTemplates((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
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
        <Card className="lg:col-span-9 p-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 rounded-2xl flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 dark:text-white capitalize">
              {activeTab} Templates
            </h2>

            <button
              onClick={() => setIsNewTemplateOpen(true)}
              className="h-11 px-5 text-xs font-bold text-white bg-[#11131A] dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-all flex items-center gap-2"
            >
              <HiOutlinePlus className="text-sm font-bold" />
              <span>New Template</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {activeTemplates.map((template) => (
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

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/checklist/setting/detail"
                    title="View details"
                    className="w-8 h-8 rounded-full bg-[#EAFBEF] text-[#10B981] dark:bg-[#10B981]/10 dark:text-[#10B981] flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <HiOutlineEye className="text-sm" />
                  </Link>

                  <button
                    title="Link tasks"
                    onClick={() => setTemplateToLink(template)}
                    className="w-8 h-8 rounded-full bg-[#EBF5FF] text-[#3B82F6] dark:bg-[#3B82F6]/10 dark:text-[#3B82F6] flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <HiOutlineLink className="text-sm" />
                  </button>

                  <button
                    title="Delete template"
                    onClick={() => setTemplateToDelete(template)}
                    className="w-8 h-8 rounded-full bg-[#FEE2E2] text-[#EF4444] dark:bg-[#EF4444]/10 dark:text-[#EF4444] flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <HiOutlineTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}

            {activeTemplates.length === 0 && (
              <EmptyState
                icon={<HiOutlineClipboardDocumentList className="text-3xl text-gray-300" />}
                title="No templates configured"
                description="Create templates to streamline onboarding and offboarding checklist workflows for your organization."
                actionLabel="New Template"
                onAction={() => setIsNewTemplateOpen(true)}
              />
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
        onConfirm={() => {
          if (templateToDelete) {
            handleDeleteTemplate(templateToDelete.id);
          }
        }}
        itemName={templateToDelete?.name}
        title="Delete Template"
      />

      <LinkTaskDrawer
        isOpen={templateToLink !== null}
        onClose={() => setTemplateToLink(null)}
        templateName={templateToLink?.name}
        onSave={(selectedTaskIds) => {
          // Placeholder for saving logic
          console.log(`Linked tasks ${selectedTaskIds} to template ${templateToLink?.id}`);
        }}
      />
    </div>
  );
}
