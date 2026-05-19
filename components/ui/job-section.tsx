"use client";

import * as React from "react";
import { 
  HiOutlinePencilSquare, 
  HiOutlinePlus 
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function JobSection() {
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
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Effective Date</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Job Title</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Position Type</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Employment Type</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">Line Manager</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">20 Aug 2019</TableCell>
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">UI UX Designer</TableCell>
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-center">-</TableCell>
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-center">Fulltime</TableCell>
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-right">@skylar</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Contract Number</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Contract Name</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Contract Type</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Start Date</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">#12345</TableCell>
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">Fulltime Remote</TableCell>
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-center">Fulltime Remote</TableCell>
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-center">20 Aug 2019</TableCell>
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-right">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
