"use client";

import * as React from "react";
import Link from "next/link";
import {
 HiOutlineChevronLeft,
 HiOutlineChevronDown,
 HiOutlineEnvelope,
 HiOutlinePhone,
 HiOutlineGlobeAlt,
 HiOutlinePencilSquare,
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

const TABS = ["General", "Job", "Payroll", "Documents", "Setting"];

export default function EmployeeDetailPage() {
 const [activeTab, setActiveTab] = React.useState("General");

 return (
  <div className="flex flex-col gap-8 p-8 min-h-full">
   {/* Back Button */}
   <Link
    href="/dashboard/employees"
    className="flex items-center gap-2 text-gray-900 dark:text-white font-bold hover:text-primary transition-colors"
   >
    <HiOutlineChevronLeft className="text-xl" />
    Detail Employee
   </Link>

   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    {/* Left Column - Profile Card */}
    <div className="lg:col-span-4 flex flex-col gap-6">
     <Card className="p-8 flex flex-col items-center text-center">
      <Avatar
       src="https://i.pravatar.cc/150?u=pristia"
       alt="Pristia Candra"
       size="xl"
       className="mb-6"
      />
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pristia Candra</h2>
      <p className="text-sm text-gray-400 font-medium mt-1 mb-4">3D Designer</p>

      <Badge variant="success" tinted className="px-4 py-1.5 rounded-xl text-[10px] uppercase tracking-wider mb-8">
       ACTIVE
       <HiOutlineChevronDown className="text-xs ml-1" />
      </Badge>

      <div className="w-full flex flex-col gap-4 pt-8 border-t border-gray-50 dark:border-gray-800">
       <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
        <HiOutlineEnvelope className="text-lg" />
        <span className="text-xs font-bold">lincoln@gmail.com</span>
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
         <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">Designer</p>
        </div>
        <HiOutlineChevronRight className="text-gray-300 dark:text-gray-600" />
       </div>
       <div className="flex items-center justify-between group cursor-pointer">
        <div>
         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Office</p>
         <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">Unpixel Studio</p>
        </div>
        <HiOutlineChevronRight className="text-gray-300 dark:text-gray-600" />
       </div>
       <div className="flex items-center justify-between group cursor-pointer">
        <div>
         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Line Manager</p>
         <div className="flex items-center gap-2 mt-1">
          <Avatar src="https://i.pravatar.cc/150?u=skylar" size="sm" />
          <p className="text-xs font-bold text-gray-900 dark:text-white">Skylar Calzoni</p>
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
     <Card className="p-2 rounded-2xl">
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
       <PersonalSection />
      ) : activeTab === "Job" ? (
       <JobSection />
      ) : activeTab === "Payroll" ? (
       <PayrollSection />
      ) : activeTab === "Documents" ? (
       <DocumentsSection />
      ) : activeTab === "Setting" ? (
       <SettingsSection />
      ) : (
       <Card className="p-8 flex items-center justify-center text-gray-400">
        Content for {activeTab} tab is coming soon.
       </Card>
      )}
     </div>
    </div>
   </div>
  </div>
 );
}
