"use client";

import * as React from "react";
import { 
  HiOutlinePencilSquare, 
  HiOutlinePlus 
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Employee } from "@/store/services/employeesApi";

interface JobSectionProps {
  employee?: Employee | null;
}

export function JobSection({ employee }: JobSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Employment Information Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Employment Information</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <HiOutlinePencilSquare className="text-xl" />
          </button>
        </div>
        <div className="flex flex-col gap-6 max-w-md">
          {[
            { label: "Employee ID", value: "UN1203" },
            { label: "Service Year", value: "3 Years 7 Months" },
            { label: "Join Date", value: "20 Aug 2019" },
          ].map((item) => (
            <div key={item.label} className="flex items-center">
              <span className="w-40 text-xs font-bold text-gray-400 tracking-wider shrink-0">{item.label}</span>
              <span className="text-xs font-bold text-gray-900 dark:text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Job Timeline Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Job Timeline</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <HiOutlinePlus className="text-xl" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr >
                <th >Effective Date</th>
                <th >Job Title</th>
                <th className="text-center">Position Type</th>
                <th className="text-center">Employment Type</th>
                <th className="text-right">Line Manager</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">20 Aug 2019</td>
                <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">{employee?.role || "UI UX Designer"}</td>
                <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-center">-</td>
                <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-center">Fulltime</td>
                <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-right">{employee?.manager || "@skylar"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Contract Timeline Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Contract Timeline</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <HiOutlinePlus className="text-xl" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr >
                <th >Contract Number</th>
                <th >Contract Name</th>
                <th className="text-center">Contract Type</th>
                <th className="text-center">Start Date</th>
                <th className="text-right">End Date</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">#12345</td>
                <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">Fulltime Remote</td>
                <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-center">Fulltime Remote</td>
                <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-center">20 Aug 2019</td>
                <td className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-right">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Work Schedule Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Work Schedule</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <HiOutlinePencilSquare className="text-xl" />
          </button>
        </div>
      </Card>
    </div>
  );
}
