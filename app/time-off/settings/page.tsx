"use client";

import * as React from "react";
import {
  HiOutlinePlus,
  HiOutlineCalendarDays,
  HiOutlineDocumentText,
  HiOutlinePencilSquare,
  HiOutlineTrash
} from "react-icons/hi2";
import { SettingsTabs, SettingsTabItem } from "@/components/ui/settings-tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewHolidayDrawer, NewTypeDrawer, NewPolicyDrawer } from "@/components/ui/drawer";
import { TypePoliciesSection, INITIAL_POLICIES } from "@/components/ui/type-policies-section";
import { PageHeader } from "@/components/ui/page-header";
import { useAppSelector } from "@/store/hooks";
import { 
  useGetHolidaysQuery, 
  useGetTimeOffPoliciesQuery,
  useCreateHolidayMutation,
  useDeleteHolidayMutation,
  useCreateTimeOffPolicyMutation,
  useDeleteTimeOffPolicyMutation
} from "@/store/services/timeOffApi";
import { toast } from "sonner";
import { useApiError } from "@/hooks/useApiError";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";

export default function TimeOffSettingsPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = React.useState<"holiday" | "policies">("holiday");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isTypeDrawerOpen, setIsTypeDrawerOpen] = React.useState(false);
  const [isPolicyDrawerOpen, setIsPolicyDrawerOpen] = React.useState(false);

  const { data: holidaysData, isLoading: isLoadingHolidays, error: holidaysError } = useGetHolidaysQuery(user?.companyId || "", {
    skip: !user?.companyId
  });
  
  const { data: policiesData, isLoading: isLoadingPolicies, error: policiesError } = useGetTimeOffPoliciesQuery(user?.companyId || "", {
    skip: !user?.companyId
  });

  const [createPolicy, { error: createPolicyError }] = useCreateTimeOffPolicyMutation();
  const [deletePolicy, { error: deletePolicyError }] = useDeleteTimeOffPolicyMutation();
  const [deleteHoliday, { error: deleteHolidayError }] = useDeleteHolidayMutation();

  useApiError(!!holidaysError, holidaysError, "Failed to load holidays");
  useApiError(!!policiesError, policiesError, "Failed to load policies");
  useApiError(!!createPolicyError, createPolicyError, "Failed to create policy");
  useApiError(!!deletePolicyError, deletePolicyError, "Failed to delete policy");
  useApiError(!!deleteHolidayError, deleteHolidayError, "Failed to delete holiday");

  const [policies, setPolicies] = React.useState(INITIAL_POLICIES);

  // Synchronize backend policies with local state
  React.useEffect(() => {
    if (policiesData?.timeOffPolicies) {
      const mapped = policiesData.timeOffPolicies.map(p => ({
        type: p.name,
        status: "PAID" as const,
        policyName: p.name,
        description: p.description || "-",
        eligibility: "Full-time Employees",
        isEnabled: true
      }));
      setPolicies(mapped);
    }
  }, [policiesData]);

  const tabs: SettingsTabItem[] = [
    { id: "holiday", label: "Holiday", icon: <HiOutlineCalendarDays className="text-lg" /> },
    { id: "policies", label: "Types & Policies", icon: <HiOutlineDocumentText className="text-lg" /> },
  ];

  const holidays = holidaysData?.holidays || [];

  const typeNames = Array.from(new Set(policies.map((p) => p.type)));

  const handleAddType = async (newType: { name: string; status: "PAID" | "UNPAID"; unit: "Days" | "Hours" }) => {
    try {
      await createPolicy({
        name: newType.name,
        color: "#3B82F6",
        companyId: user?.companyId,
      }).unwrap();
      toast.success("Leave type created successfully");
    } catch (err) {
      toast.error("Failed to create leave type");
    }
  };

  const handleAddPolicy = async (newPolicy: {
    policyName: string;
    type: string;
    description: string;
    eligibility: string;
  }) => {
    try {
      await createPolicy({
        name: newPolicy.policyName,
        description: newPolicy.description,
        color: "#8B5CF6",
        companyId: user?.companyId,
      }).unwrap();
      toast.success("Policy created successfully");
    } catch (err) {
      toast.error("Failed to create policy");
    }
  };

  const handleTogglePolicyEnabled = (index: number) => {
    setPolicies(policies.map((p, idx) => idx === index ? { ...p, isEnabled: !p.isEnabled } : p));
  };

  return (
    <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
      {/* Header Section */}
      <PageHeader title="Setting Time Off" description="Setting your Time off here" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Tabs */}
        <SettingsTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab as "holiday" | "policies")}
          variant="emerald"
          className="lg:col-span-3"
        />

        {/* Content Area */}
        <Card className="lg:col-span-9 p-4 md:p-8">
          {activeTab === "holiday" ? (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Holidays</h2>
                <Button
                  variant="primary"
                  leftIcon={<HiOutlinePlus className="text-lg" />}
                  className="h-10 px-6"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  New Holiday
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr >
                      <th >Holiday Name</th>
                      <th >Date</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingHolidays ? (
                      <SVGLoaderFetch colSpan={3} text="Loading holidays..." />
                    ) : holidays.length === 0 ? (
                      <NoRecordFound colSpan={3} text="No holidays found." />
                    ) : holidays.map((holiday, index) => (
                      <tr key={index} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors ">
                        <td className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">{holiday.name}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">
                          {new Date(holiday.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={async () => {
                                if (confirm(`Are you sure you want to delete the holiday "${holiday.name}"?`)) {
                                  try {
                                    await deleteHoliday(holiday.id).unwrap();
                                    toast.success("Holiday deleted successfully");
                                  } catch (err) {
                                    toast.error("Failed to delete holiday");
                                  }
                                }
                              }}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-650 transition-colors"
                            >
                              <HiOutlineTrash className="text-lg" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Types and Policies</h2>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    leftIcon={<HiOutlinePlus className="text-lg" />} 
                    className="h-10 px-6 bg-white dark:bg-gray-900"
                    onClick={() => setIsTypeDrawerOpen(true)}
                  >
                    New Type
                  </Button>
                  <Button 
                    variant="primary" 
                    leftIcon={<HiOutlinePlus className="text-lg" />} 
                    className="h-10 px-6 bg-[#11131A] dark:bg-white dark:text-gray-900"
                    onClick={() => setIsPolicyDrawerOpen(true)}
                  >
                    New Policy
                  </Button>
                </div>
              </div>

              <TypePoliciesSection 
                policies={policies}
                onToggleEnabled={handleTogglePolicyEnabled}
              />
            </div>
          )}
        </Card>
      </div>

      <NewHolidayDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <NewTypeDrawer
        isOpen={isTypeDrawerOpen}
        onClose={() => setIsTypeDrawerOpen(false)}
        onAdd={handleAddType}
      />

      <NewPolicyDrawer
        isOpen={isPolicyDrawerOpen}
        onClose={() => setIsPolicyDrawerOpen(false)}
        types={typeNames}
        onAdd={handleAddPolicy}
      />
    </div>
  );
}
