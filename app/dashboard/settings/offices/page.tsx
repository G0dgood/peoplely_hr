"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";

interface Office {
  id: string;
  name: string;
  isHQ: boolean;
  country: string;
  active: boolean;
  employees: number;
  timezone: string;
  phone: string;
  email: string;
}

const INITIAL_OFFICES: Office[] = [
  {
    id: "1",
    name: "Unpixel Studio Jakarta",
    isHQ: true,
    country: "Indonesia",
    active: true,
    employees: 50,
    timezone: "GMT +07:00 Bangkok, Ha Noi, Jakarta",
    phone: "+6283838587171",
    email: "hello@unpixel.com",
  },
  {
    id: "2",
    name: "Unpixel Studio Semarang",
    isHQ: false,
    country: "Indonesia",
    active: false,
    employees: 10,
    timezone: "GMT +07:00 Bangkok, Ha Noi, Jakarta",
    phone: "+6283843578300",
    email: "hello@unpixel.com",
  },
];

export default function OfficesPage() {
  const [offices, setOffices] = React.useState<Office[]>(INITIAL_OFFICES);

  const toggleOffice = (id: string) => {
    setOffices((prev) =>
      prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o))
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Offices
        </h2>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col gap-6">
        {offices.map((office) => (
          <div
            key={office.id}
            className="border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 shadow-xs flex flex-col gap-6 bg-white dark:bg-gray-900"
          >
            {/* Top Section */}
            <div className="flex flex-col gap-2 border-b border-gray-50 dark:border-gray-800 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {office.name}
                  </h3>
                  {office.isHQ && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0FAF7A] text-white">
                      HQ
                    </span>
                  )}
                </div>
                <button className="text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-1 transition-colors">
                  <HiOutlineEllipsisVertical className="text-xl" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {office.country}
                </span>
                <Toggle
                  checked={office.active}
                  onChange={() => toggleOffice(office.id)}
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex items-center">
                <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                  Number Of Employee
                </span>
                <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                  {office.employees}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                  Timezone
                </span>
                <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                  {office.timezone}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                  Contact Number
                </span>
                <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                  {office.phone}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                  Contact Email
                </span>
                <span className="w-1/2 text-xs font-bold text-gray-900 dark:text-white">
                  {office.email}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
