"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
 HiOutlineChevronLeft,
 HiOutlineChevronDown,
 HiOutlineEnvelope,
 HiOutlinePhone,
 HiOutlineGlobeAlt,
 HiOutlineChevronRight
} from "react-icons/hi2";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { JobSection } from "@/components/ui/job-section";
import { PersonalSection } from "@/components/ui/personal-section";
import { PayrollSection } from "@/components/ui/payroll-section";
import { DocumentsSection } from "@/components/ui/documents-section";
import { SettingsSection } from "@/components/ui/settings-section";
import { useGetEmployeeQuery } from "@/store/services/employeesApi";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/authSlice";
import { SVGLoaderFetch } from "@/components/ui/options";
import { useApiError } from "@/hooks/useApiError";
import { EmployeeDetailSkeleton } from "@/components/ui/skeleton/employee-detail-skeleton";

const TABS = ["General", "Job", "Payroll", "Documents", "Setting"];

export default function EmployeeDetailPage() {
 const params = useParams();
 const id = params?.id as string;
 const [activeTab, setActiveTab] = React.useState("General");

 const currentUser = useAppSelector(selectCurrentUser);
 const companyId = currentUser?.companyId ?? "";

 const { data, isLoading, error } = useGetEmployeeQuery(
  { id, companyId },
  { skip: !id }
 );

 useApiError(!!error, error, "Failed to load employee details");

 if (isLoading) {
  return <EmployeeDetailSkeleton />;
 }

 const employee = data?.employee;

 if (!employee) {
  return (
   <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
    <Link
     href="/employees"
     className="flex items-center gap-2 text-gray-900 dark:text-white font-bold hover:text-primary transition-colors"
    >
     <HiOutlineChevronLeft className="text-xl" />
     Back to Employees
    </Link>
    <Card className="p-8 text-center text-gray-500 font-semibold">
     Employee not found.
    </Card>
   </div>
  );
 }

 const statusVariant =
  employee.status === "ACTIVE"
   ? "success"
   : employee.status === "ON BOARDING"
     ? "secondary"
     : employee.status === "PROBATION"
       ? "primary"
       : "error";

 return (
  <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full">
   {/* Back Button */}
   <Link
    href="/employees"
    className="flex items-center gap-2 text-gray-900 dark:text-white font-bold hover:text-primary transition-colors"
   >
    <HiOutlineChevronLeft className="text-xl" />
    Detail Employee
   </Link>

   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    {/* Left Column - Profile Card */}
    <div className="lg:col-span-4 flex flex-col gap-6">
     <Card className="p-4 md:p-8 flex flex-col items-center text-center">
      <Avatar
       src={employee.avatar}
       fallback={employee.name.split(" ").map(n => n[0]).join("")}
       alt={employee.name}
       size="xl"
       className="mb-6"
      />
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{employee.name}</h2>
      <p className="text-sm text-gray-400 font-medium mt-1 mb-4">{employee.role}</p>

      <Badge variant={statusVariant} tinted className="px-4 py-1.5 rounded-xl text-[10px] uppercase tracking-wider mb-8">
       {employee.status}
       <HiOutlineChevronDown className="text-xs ml-1" />
      </Badge>

      <div className="w-full flex flex-col gap-4 pt-8 border-t border-gray-50 dark:border-gray-800">
       <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
        <HiOutlineEnvelope className="text-lg" />
        <span className="text-xs font-bold">{employee.email}</span>
       </div>
       <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
        <HiOutlinePhone className="text-lg" />
        <span className="text-xs font-bold">089318298493</span>
       </div>
       <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
        <HiOutlineGlobeAlt className="text-lg" />
        <span className="text-xs font-bold">GMT +07:00</span>
       </div>
      </div>

      <div className="w-full flex flex-col gap-6 mt-10 pt-8 border-t border-gray-50 dark:border-gray-800 text-left">
       <div className="flex items-center justify-between group cursor-pointer">
        <div>
         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Departement</p>
         <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">{employee.department}</p>
        </div>
        <HiOutlineChevronRight className="text-gray-300 dark:text-gray-600" />
       </div>
       <div className="flex items-center justify-between group cursor-pointer">
        <div>
         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Office</p>
         <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">{employee.office}</p>
        </div>
        <HiOutlineChevronRight className="text-gray-300 dark:text-gray-600" />
       </div>
       <div className="flex items-center justify-between group cursor-pointer">
        <div>
         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Line Manager</p>
         <div className="flex items-center gap-2 mt-1">
          <Avatar
           fallback={employee.manager ? employee.manager.replace("@", "").split(" ").map(n => n[0]).join("").toUpperCase() : "M"}
           size="sm"
          />
          <p className="text-xs font-bold text-gray-900 dark:text-white">{employee.manager}</p>
         </div>
        </div>
        <HiOutlineChevronRight className="text-gray-300 dark:text-gray-600" />
       </div>
      </div>

      <Button variant="primary" size="md" className="w-full mt-10" rightIcon={<HiOutlineChevronDown />}>
       Action
      </Button>
     </Card>
    </div>

    {/* Right Column - Tabs and Content */}
    <div className="lg:col-span-8 flex flex-col gap-6">
     <Card className="p-2 rounded-xl">
      <Tabs className="border-none">
       {TABS.map((tab) => (
        <TabsTrigger
         key={tab}
         active={activeTab === tab}
         onClick={() => setActiveTab(tab)}
        >
         {tab}
        </TabsTrigger>
       ))}
      </Tabs>
     </Card>

     <div className="flex flex-col gap-6">
      {activeTab === "General" ? (
       <PersonalSection employee={employee} />
      ) : activeTab === "Job" ? (
       <JobSection employee={employee} />
      ) : activeTab === "Payroll" ? (
       <PayrollSection />
      ) : activeTab === "Documents" ? (
       <DocumentsSection />
      ) : activeTab === "Setting" ? (
       <SettingsSection />
      ) : (
       <Card className="p-4 md:p-8 flex items-center justify-center text-gray-400">
        Content for {activeTab} tab is coming soon.
       </Card>
      )}
     </div>
    </div>
   </div>
  </div>
 );
}
