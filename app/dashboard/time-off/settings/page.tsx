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
import { NewHolidayDrawer } from "@/components/ui/new-holiday-drawer";
import { NewTypeDrawer } from "@/components/ui/new-type-drawer";
import { NewPolicyDrawer } from "@/components/ui/new-policy-drawer";
import { TypePoliciesSection, INITIAL_POLICIES } from "@/components/ui/type-policies-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HOLIDAYS = [
  { name: "New Year's Day", date: "01 Jan 2023" },
  { name: "Lunar New Year's Day", date: "22 Jan 2023" },
  { name: "Lunar New Year Joint Holiday", date: "23 Jan 2023" },
  { name: "Ascension of the Prophet Muhammad", date: "18 Feb 2023" },
  { name: "Bali's Day of Silence and Hindu New Year (Nyepi)", date: "22 Mar 2023" },
  { name: "Joint Holiday for Bali's Day of Silence and Hindu New Year (Nyepi)", date: "23 Mar 2023" },
  { name: "Ramadan Start", date: "23 Mar 2023" },
  { name: "Good Friday", date: "07 Apr 2023" },
  { name: "Easter Sunday", date: "09 Apr 2023" },
];

export default function TimeOffSettingsPage() {
  const [activeTab, setActiveTab] = React.useState<"holiday" | "policies">("holiday");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isTypeDrawerOpen, setIsTypeDrawerOpen] = React.useState(false);
  const [isPolicyDrawerOpen, setIsPolicyDrawerOpen] = React.useState(false);
  const [policies, setPolicies] = React.useState(INITIAL_POLICIES);

  const tabs: SettingsTabItem[] = [
    { id: "holiday", label: "Holiday", icon: <HiOutlineCalendarDays className="text-lg" /> },
    { id: "policies", label: "Types & Policies", icon: <HiOutlineDocumentText className="text-lg" /> },
  ];

  const typeNames = Array.from(new Set(policies.map((p) => p.type)));

  const handleAddType = (newType: { name: string; status: "PAID" | "UNPAID"; unit: "Days" | "Hours" }) => {
    setPolicies([
      ...policies,
      {
        type: newType.name,
        status: newType.status,
        policyName: newType.name,
        description: "-",
        eligibility: `Full-time Employees only (measured in ${newType.unit})`,
        isEnabled: true
      }
    ]);
  };

  const handleAddPolicy = (newPolicy: {
    policyName: string;
    type: string;
    description: string;
    eligibility: string;
  }) => {
    const existingType = policies.find((p) => p.type === newPolicy.type);
    const status = existingType ? existingType.status : "UNPAID";

    setPolicies([
      ...policies,
      {
        type: newPolicy.type,
        status,
        policyName: newPolicy.policyName,
        description: newPolicy.description,
        eligibility: newPolicy.eligibility,
        isEnabled: true
      }
    ]);
  };

  const handleTogglePolicyEnabled = (index: number) => {
    setPolicies(policies.map((p, idx) => idx === index ? { ...p, isEnabled: !p.isEnabled } : p));
  };

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setting Time Off</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Setting your Time off here</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Tabs */}
        <SettingsTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="emerald"
          className="lg:col-span-3"
        />

        {/* Content Area */}
        <Card className="lg:col-span-9 p-8">
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
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-50 dark:border-gray-800">
                      <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Holiday Name</TableHead>
                      <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Datet</TableHead>
                      <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">From</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {HOLIDAYS.map((holiday, index) => (
                      <TableRow key={index} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-50 dark:border-gray-800">
                        <TableCell className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">{holiday.name}</TableCell>
                        <TableCell className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">{holiday.date}</TableCell>
                        <TableCell className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                              <HiOutlinePencilSquare className="text-lg" />
                            </button>
                            <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                              <HiOutlineTrash className="text-lg" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
