"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Dropdown } from "@/components/ui/dropdown";
import Image from "next/image";

const INTEGRATIONS = [
  {
    id: "workable",
    name: "Workable",
    category: "ATS",
    description: "More than an applicant tracking system, Workable's talent acquisition software helps teams find candidates, evaluate applicants and make the right hire.",
    icon: "bg-[#0A7B6B]",
    iconInitial: "W",
    isActive: true,
  },
  {
    id: "lever",
    name: "Lever",
    category: "ATS",
    description: "With an applicant tracking system and robust candidate relationship management system in one platform, Lever is the ideal solution for small and medium-sized businesses, but robust enough for enterprises.",
    icon: "bg-[#11131A]",
    iconInitial: "L",
    isActive: true,
  },
];

export default function IntegrationPage() {
  const [filter, setFilter] = React.useState("Applicant Tracking System");
  const [integrations, setIntegrations] = React.useState(INTEGRATIONS);

  const handleToggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-4 md:p-8 flex-1 overflow-y-auto">
        <div className="max-w-4xl flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Integration</h2>
            <div className="w-full md:w-72">
              <Dropdown
                label={filter}
                options={["Applicant Tracking System", "Payroll", "Communication", "All Integrations"]}
                onSelect={(val) => setFilter(val)}
              />
            </div>
          </div>

          {/* Integration Cards */}
          <div className="flex flex-col gap-4">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="p-6 border border-gray-300 dark:border-gray-800 rounded-2xl flex flex-col md:flex-row md:items-start justify-between gap-6 bg-white dark:bg-gray-900 shadow-xs transition-shadow hover:shadow-sm"
              >
                <div className="flex items-start gap-5">
                  {/* Icon Placeholder */}
                  <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xl font-bold ${integration.icon}`}>
                    {integration.iconInitial}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {integration.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {integration.category}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 leading-relaxed max-w-2xl">
                      {integration.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mt-2 md:mt-0">
                  <Toggle
                    checked={integration.isActive}
                    onChange={() => handleToggle(integration.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
