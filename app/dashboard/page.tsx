"use client";

import { HiOutlineUsers, HiOutlineBriefcase, HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineAdjustmentsHorizontal, HiOutlineMagnifyingGlass, HiOutlineUserMinus } from "react-icons/hi2";
import { Dropdown } from "@/components/ui/dropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";

const STATS = [
 {
  label: "Total Employees",
  value: "3,540",
  change: "+25.5%",
  trend: "up" as const,
  icon: <HiOutlineUsers />,
  color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
 },
 {
  label: "Job Applicants",
  value: "1,150",
  change: "+4.10%",
  trend: "up" as const,
  icon: <HiOutlineBriefcase />,
  color: "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
 },
 {
  label: "New Employees",
  value: "500",
  change: "+5.1%",
  trend: "up" as const,
  icon: <HiOutlineUserAdd />,
  color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
 },
 {
  label: "Resigned Employees",
  value: "93",
  change: "+25.5%",
  trend: "down" as const,
  icon: <HiOutlineUserMinus />,
  color: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
 },
];

const EMPLOYEES = [
 {
  name: "Pristia Candra",
  email: "pristia@unpixel.com",
  avatar: "https://i.pravatar.cc/150?u=pristia",
  role: "UI UX Designer",
  manager: "@Pristiacandra",
  department: "Team Product",
  office: "Unpixel Office",
 },
 {
  name: "Hanna Baptista",
  email: "hanna@unpixel.com",
  avatar: "https://i.pravatar.cc/150?u=hanna",
  role: "Graphic Designer",
  manager: "@Pristiacandra",
  department: "Team Product",
  office: "Unpixel Office",
 },
];

export default function DashboardPage() {
 return (
  <div className="flex flex-col gap-8 p-8">
   {/* Welcome Section */}
   <div>
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hi, Pristia</h1>
    <p className="text-gray-500 dark:text-gray-400 mt-1">This is your HR report so far</p>
   </div>

   {/* Stats and Performance Chart Row */}
   <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    {/* Left Stats Cards */}
    <div className="grid grid-cols-2 gap-4 xl:col-span-1">
     {STATS.map((stat) => (
      <Card key={stat.label} className="p-6 flex flex-col gap-4">
       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${stat.color}`}>
        {stat.icon}
       </div>
       <div>
        <div className="flex items-center gap-2">
         <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
         <Badge
          variant={stat.trend === "up" ? "success" : "error"}
          tinted
          className="text-[10px] px-1.5 py-0.5 rounded-lg"
         >
          {stat.change}
         </Badge>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">{stat.label}</p>
       </div>
      </Card>
     ))}
    </div>

    {/* Performance Chart Card */}
    <Card className="p-8 xl:col-span-2">
     <div className="flex items-center justify-between mb-8">
      <h3 className="font-bold text-gray-900 dark:text-white">Team Performance</h3>
      <div className="flex items-center gap-6">
       <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project Team</span>
       </div>
       <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product Team</span>
       </div>
       <Dropdown
        label="Last 7 month"
        options={["Last 3 month", "Last 6 month", "Last 12 month"]}
        icon={<HiOutlineAdjustmentsHorizontal className="text-gray-400 dark:text-gray-500" />}
        className="min-w-[160px]"
       />
      </div>
     </div>

     {/* Simulated Chart */}
     <div className="h-48 relative mt-4">
      <div className="absolute inset-0 flex items-end justify-between px-2">
       {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month) => (
        <span key={month} className="text-[10px] font-bold text-gray-400 dark:text-gray-500">{month}</span>
       ))}
      </div>
      {/* Simple SVG paths to simulate line chart */}
      <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
       <path d="M0,100 Q100,80 200,120 T400,100 T600,80 T700,90" fill="none" stroke="#27A376" strokeWidth="3" />
       <path d="M0,120 Q100,140 200,110 T400,130 T600,110 T700,120" fill="none" stroke="#FACC15" strokeWidth="3" />
       <circle cx="450" cy="90" r="4" fill="currentColor" className="text-gray-900 dark:text-white" stroke="white" strokeWidth="2" />
      </svg>
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] font-bold text-gray-400 dark:text-gray-500">
       <span>60k</span>
       <span>50k</span>
       <span>40k</span>
       <span>30k</span>
      </div>
     </div>
    </Card>
   </div>

   {/* Employees Table and Total Employee Chart Row */}
   <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
    {/* Employees Table */}
    <Card className="p-8 xl:col-span-3">
     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <h3 className="font-bold text-gray-900 dark:text-white">Employees</h3>
      <div className="flex items-center gap-3">
       <Input
        placeholder="Search employee"
        leftIcon={<HiOutlineMagnifyingGlass />}
        className="w-64 h-10 bg-gray-50/50 dark:bg-gray-800/50"
        containerClassName="w-auto"
       />
      </div>
     </div>

     <div className="flex items-center gap-4 mb-6">
      <Dropdown
       label="All Offices"
       options={["London Office", "New York Office", "Unpixel Office"]}
       icon={<HiOutlineAdjustmentsHorizontal />}
      />
      <Dropdown
       label="All Job Titles"
       options={["UI UX Designer", "Graphic Designer", "Product Manager"]}
       icon={<HiOutlineAdjustmentsHorizontal />}
      />
      <Dropdown
       label="All Status"
       options={["Active", "Onboarding", "Resigned"]}
       icon={<HiOutlineAdjustmentsHorizontal />}
      />
     </div>

     <div className="overflow-x-auto">
      <Table>
       <TableHeader>
        <TableRow className="border-b border-gray-50 dark:border-gray-800">
         <TableHead className="w-[50px] py-4 px-2">
          <Checkbox />
         </TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Employee Name</TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Job Title</TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Line Manager</TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Department</TableHead>
         <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Office</TableHead>
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
          <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">{emp.role}</TableCell>
          <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">{emp.manager}</TableCell>
          <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">{emp.department}</TableCell>
          <TableCell className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">{emp.office}</TableCell>
         </TableRow>
        ))}
       </TableBody>
      </Table>
     </div>
    </Card>

    {/* Total Employee Chart */}
    <Card className="p-8 xl:col-span-1">
     <div className="flex items-center justify-between mb-8">
      <h3 className="font-bold text-gray-900 dark:text-white">Total Employee</h3>
      <Dropdown
       label="All Time"
       options={["Today", "This Week", "This Month", "This Year"]}
       icon={<HiOutlineAdjustmentsHorizontal />}
       className="min-w-[120px]"
      />
     </div>

     <div className="relative w-48 h-48 mx-auto mb-8">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
       <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth="12" />
       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#27A376" strokeWidth="12" strokeDasharray="180 251" />
       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FACC15" strokeWidth="12" strokeDasharray="60 251" strokeDashoffset="-180" />
       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0062FF" strokeWidth="12" strokeDasharray="11 251" strokeDashoffset="-240" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
       <span className="text-2xl font-bold text-gray-900 dark:text-white">121</span>
       <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">Total Emp.</span>
      </div>
     </div>

     <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
       <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Others</span>
       </div>
       <span className="text-xs font-bold text-gray-900 dark:text-white">71</span>
      </div>
      <div className="flex items-center justify-between">
       <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Onboarding</span>
       </div>
       <span className="text-xs font-bold text-gray-900 dark:text-white">27</span>
      </div>
      <div className="flex items-center justify-between">
       <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Offboarding</span>
       </div>
       <span className="text-xs font-bold text-gray-900 dark:text-white">23</span>
      </div>
     </div>
    </Card>
   </div>
  </div>
 );
}
