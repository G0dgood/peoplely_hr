"use client";

import * as React from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineArrowDownTray,
  HiOutlineCalendarDays,
  HiOutlineDocumentText,
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EMPLOYEE_REQUESTS = [
  {
    name: "Pristia Candra",
    email: "lincoln@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=pristia",
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "-",
    status: "APPROVE"
  },
  {
    name: "Hanna Baptista",
    email: "hanna@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=hanna",
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "File.pdf",
    status: "APPROVE"
  },
  {
    name: "Miracle Geidt",
    email: "miracle@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=miracle",
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "File.pdf",
    status: "PENDING"
  },
  {
    name: "Rayna Torff",
    email: "rayna@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=rayna",
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "-",
    status: "APPROVE"
  },
  {
    name: "Giana Lipshutz",
    email: "giana@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=giana",
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "File.pdf",
    status: "PENDING"
  },
  {
    name: "James George",
    email: "james@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=james",
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "-",
    status: "APPROVE"
  },
  {
    name: "Jordyn George",
    email: "jordyn@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=jordyn",
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "File.pdf",
    status: "APPROVE"
  },
  {
    name: "Skylar Herwitz",
    email: "skylar@unpixel.com",
    avatar: "https://i.pravatar.cc/150?u=skylar",
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "File.pdf",
    status: "APPROVE"
  },
];

export default function EmployeeTimeOffPage() {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState("01 Jan 2023 - 10 Mar 2023");

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Time Off</h1>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search employee"
            leftIcon={<HiOutlineMagnifyingGlass />}
            className="w-64 h-11 bg-white dark:bg-gray-900"
            containerClassName="w-auto"
          />
          <Button
            variant="primary"
            className="h-11 px-6 bg-[#11131A] dark:bg-white dark:text-gray-900"
            leftIcon={<HiOutlineArrowDownTray className="text-lg" />}
          >
            Download CSV
          </Button>
        </div>
      </div>

      <Card className="p-8">
        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white min-w-[280px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span>{dateRange}</span>
              <HiOutlineCalendarDays className="text-gray-400 text-lg ml-auto" />
            </button>
            <DatePicker
              isOpen={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
              onSave={(range) => setDateRange(range)}
            />
          </div>
          <Dropdown
            label="All Type"
            options={["Annual", "Sick Leave", "Engagement"]}
            className="min-w-[200px]"
          />
          <Dropdown
            label="All Status"
            options={["Approve", "Pending", "Reject"]}
            className="min-w-[200px]"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableHead className="w-[50px] py-4 px-4">
                  <Checkbox />
                </TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Employee Name</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">From</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">To</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Type</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Attachment</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {EMPLOYEE_REQUESTS.map((req, index) => (
                <TableRow key={index} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-50 dark:border-gray-800">
                  <TableCell className="py-4 px-4">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={req.avatar} size="sm" />
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{req.name}</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">{req.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">{req.from}</TableCell>
                  <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">{req.to}</TableCell>
                  <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">{req.total}</TableCell>
                  <TableCell className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">{req.type}</TableCell>
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                      {req.attachment}
                      {req.attachment !== "-" && <HiOutlineDocumentText className="text-gray-300 text-lg" />}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4 text-center">
                    <Badge
                      variant={req.status === "APPROVE" ? "success" : "warning"}
                      tinted
                      className="text-[9px] uppercase tracking-wider px-2 py-0.5"
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-8 border-t border-gray-50 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <HiOutlineChevronLeft className="text-xs" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">3</button>
            <span className="text-gray-300 dark:text-gray-600 px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">10</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <HiOutlineChevronRight className="text-xs" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-xs font-bold text-gray-400">Showing 1 to 8 of 50 entries</p>
            <div className="flex items-center gap-3">
              <p className="text-xs font-bold text-gray-900 dark:text-white">Show 8</p>
              <button className="p-1.5 border border-gray-100 dark:border-gray-800 rounded-lg text-gray-400">
                <HiOutlineChevronDown className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
