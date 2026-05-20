"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import {
 HiOutlineMagnifyingGlass,
 HiOutlineAdjustmentsHorizontal,
 HiOutlineArrowDownTray,
 HiOutlinePlus,
 HiOutlineEye,
 HiOutlinePencilSquare,
 HiOutlineChevronDown,
 HiOutlineXMark,
 HiOutlineCalendarDays
} from "react-icons/hi2";
import { Dropdown } from "@/components/ui/dropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";

const STATUS_CONFIG = {
 ACTIVE: { bg: "bg-green-50", text: "text-green-600" },
 "ON BOARDING": { bg: "bg-amber-50", text: "text-amber-500" },
 PROBATION: { bg: "bg-purple-50", text: "text-purple-500" },
 "ON LEAVE": { bg: "bg-red-50", text: "text-red-500" },
};

const EMPLOYEES = [
 {
  name: "Pristia Candra",
  email: "pristia@unpixel.com",
  avatar: "https://i.pravatar.cc/150?u=pristia",
  role: "UI UX Designer",
  manager: "@Pristiacandra",
  department: "Team Product",
  office: "Unpixel Office",
  status: "ACTIVE",
  account: "Activated",
 },
 {
  name: "Hanna Baptista",
  email: "hanna@unpixel.com",
  avatar: "https://i.pravatar.cc/150?u=hanna",
  role: "Graphic Designer",
  manager: "@Pristiacandra",
  department: "Team Product",
  office: "Unpixel Office",
  status: "ON BOARDING",
  account: "Activated",
 },
 {
  name: "Miracle Geidt",
  email: "miracle@unpixel.com",
  avatar: "https://i.pravatar.cc/150?u=miracle",
  role: "Finance",
  manager: "@Pristiacandra",
  department: "Team Product",
  office: "Unpixel Office",
  status: "PROBATION",
  account: "Need Invitation",
 },
 {
  name: "Rayna Torff",
  email: "rayna@unpixel.com",
  avatar: "https://i.pravatar.cc/150?u=rayna",
  role: "Project Manager",
  manager: "@Pristiacandra",
  department: "Team Product",
  office: "Unpixel Office",
  status: "ACTIVE",
  account: "Activated",
 },
 {
  name: "Giana Lipshutz",
  email: "giana@unpixel.com",
  avatar: "https://i.pravatar.cc/150?u=giana",
  role: "Creative Director",
  manager: "@Pristiacandra",
  department: "Team Product",
  office: "Unpixel Office",
  status: "ON LEAVE",
  account: "Need Invitation",
 },
 {
  name: "James George",
  email: "james@unpixel.com",
  avatar: "https://i.pravatar.cc/150?u=james",
  role: "Lead Designer",
  manager: "@Pristiacandra",
  department: "Team Product",
  office: "Unpixel Office",
  status: "ACTIVE",
  account: "Activated",
 },
 {
  name: "Jordyn George",
  email: "jordyn@unpixel.com",
  avatar: "https://i.pravatar.cc/150?u=jordyn",
  role: "IT Support",
  manager: "@Pristiacandra",
  department: "Team Product",
  office: "Unpixel Office",
  status: "ON BOARDING",
  account: "Activated",
 },
 {
  name: "Skylar Herwitz",
  email: "skylar@unpixel.com",
  avatar: "https://i.pravatar.cc/150?u=skylar",
  role: "3D Designer",
  manager: "@Pristiacandra",
  department: "Team Product",
  office: "Unpixel Office",
  status: "ACTIVE",
  account: "Activated",
 },
];

import {
 Pagination,
} from "@/components/ui/pagination";
import { ProfileDrawer } from "@/components/ui/drawer";

interface Employee {
 name: string;
 email: string;
 avatar: string;
 role: string;
 manager: string;
 department: string;
 office: string;
 status: string;
 account: string;
}

export default function EmployeesPage() {
 const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

 const handleAddClick = () => {
  setEditingEmployee(null);
  setIsDrawerOpen(true);
 };

 const handleEditClick = (employee: Employee) => {
  setEditingEmployee(employee);
  setIsDrawerOpen(true);
 };

 return (
  <div className="flex flex-col gap-8 p-8 relative min-h-full">
   {/* Header Section */}
   <div className="flex items-center justify-between">
    <div>
     <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employees</h1>
     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your Employee</p>
    </div>
    <div className="flex items-center gap-3">
     <Button
      variant="outline"
      size="md"
      leftIcon={<HiOutlineArrowDownTray />}
      className="px-6"
     >
      Download
     </Button>
     <Button
      variant="primary"
      size="md"
      leftIcon={<HiOutlinePlus />}
      onClick={handleAddClick}
      className="px-6"
     >
      Add New
     </Button>
    </div>
   </div>

   {/* Filters Section */}
   <Card className="p-6">
    <div className="flex flex-col gap-6">
     <div className="flex items-center gap-4">
      <Input
       placeholder="Search employee"
       leftIcon={<HiOutlineMagnifyingGlass />}
       className="w-full h-12 bg-gray-50/30 dark:bg-gray-800/50"
       containerClassName="flex-1"
      />
      <Dropdown
       label="All Offices"
       options={["London Office", "New York Office", "Unpixel Office"]}
       icon={<HiOutlineAdjustmentsHorizontal />}
       className="w-48"
      />
      <Dropdown
       label="All Job Titles"
       options={["UI UX Designer", "Graphic Designer", "Product Manager"]}
       icon={<HiOutlineAdjustmentsHorizontal />}
       className="w-48"
      />
      <Dropdown
       label="All Status"
       options={["Active", "Onboarding", "Probation", "On Leave"]}
       className="w-48"
      />
     </div>

     {/* Table */}
     <div className="overflow-x-auto">
      <Table>
       <TableHeader>
        <TableRow className="border-b border-gray-50 dark:border-gray-800">
         <TableHead className="w-[50px] py-4 px-2">
          <Checkbox />
         </TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Employee Name</TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Job Title</TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Line Manager</TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Department</TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Office</TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Employee Status</TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Account</TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right"></TableHead>
        </TableRow>
       </TableHeader>
       <TableBody>
        {EMPLOYEES.map((emp) => (
         <TableRow key={emp.email} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-50 dark:border-gray-800">
          <TableCell className="py-4 px-2">
           <Checkbox />
          </TableCell>
          <TableCell className="py-4 px-4">
           <div className="flex items-center gap-3">
            <Avatar src={emp.avatar} size="sm" />
            <div>
             <p className="text-xs font-bold text-gray-900 dark:text-white">{emp.name}</p>
             <p className="text-[10px] text-gray-400 dark:text-gray-500">{emp.email}</p>
            </div>
           </div>
          </TableCell>
          <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400 text-center">{emp.role}</TableCell>
          <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400 text-center">{emp.manager}</TableCell>
          <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400 text-center">{emp.department}</TableCell>
          <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400 text-center">{emp.office}</TableCell>
          <TableCell className="py-4 px-4 text-center">
           <div className="flex items-center justify-center gap-1">
            <Badge
             variant={emp.status === "ACTIVE" ? "success" : emp.status === "ON BOARDING" ? "secondary" : emp.status === "PROBATION" ? "primary" : "error"}
             tinted
             className="text-[9px] uppercase tracking-wider"
            >
             {emp.status}
            </Badge>
            <HiOutlineChevronDown className="text-gray-300 dark:text-gray-600 text-xs" />
           </div>
          </TableCell>
          <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400 text-center">{emp.account}</TableCell>
          <TableCell className="py-4 px-4 text-right">
           <div className="flex items-center justify-end gap-2">
            <Link
             href="/dashboard/employees/1"
             className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-block"
            >
             <HiOutlineEye className="text-lg" />
            </Link>
            <button
             onClick={() => handleEditClick(emp)}
             className="p-2 border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
             <HiOutlinePencilSquare className="text-lg" />
            </button>
           </div>
          </TableCell>
         </TableRow>
        ))}
       </TableBody>
      </Table>
     </div>

     {/* Pagination */}
     <Pagination />
    </div>
   </Card>

   <ProfileDrawer
    isOpen={isDrawerOpen}
    onClose={() => setIsDrawerOpen(false)}
    employee={editingEmployee}
   />
  </div>
 );
}
