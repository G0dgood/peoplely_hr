"use client";

import * as React from "react";
import {
  HiChevronLeft,
  HiChevronDown,
  HiLockClosed,
  HiOutlineLink,
  HiOutlineMagnifyingGlass,
  HiOutlineTrash,
  HiChevronRight,
  HiEllipsisHorizontal,
} from "react-icons/hi2";
import { Dropdown } from "@/components/ui/dropdown";
import { AddRoleDrawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";

const PERMISSION_SECTIONS = [
  "Profile Picture",
  "Personal Info",
  "Address",
  "Emergency Contact",
  "Offboarding Details",
  "Bank Info",
  "Job Information",
  "Work Schedule",
];

const MEMBERS = [
  { id: "1", name: "Pristia Candra", email: "lincoln@unpixel.com", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "2", name: "Hanna Baptista", email: "hanna@unpixel.com", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "3", name: "Miracle Geidt", email: "miracle@unpixel.com", initial: "MG" },
  { id: "4", name: "Rayna Torff", email: "rayna@unpixel.com", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "5", name: "Giana Lipshutz", email: "giana@unpixel.com", avatar: "https://i.pravatar.cc/150?u=5" },
];

export default function PermissionPage() {
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Permission");
  const [accessLevel, setAccessLevel] = React.useState("All employees");

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Roles Listing View */}
      {selectedRole === null ? (
        <div className="p-2 md:p-8 flex flex-col gap-8 h-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Roles</h2>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                Manage access levels and permissions for all roles in the system.
              </p>
            </div>
            <button 
              onClick={() => setIsAddOpen(true)}
              className="h-10 px-6 rounded-xl !bg-black dark:bg-white text-white dark:text-gray-900 text-xs font-bold flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              Add New Role
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Admin Card */}
            <div 
              onClick={() => setSelectedRole("Admin")}
              className="p-6 border border-gray-300 dark:border-gray-800 rounded-2xl flex flex-col gap-4 cursor-pointer hover:border-[#0FAF7A] hover:bg-emerald-50/10 transition-colors shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#0FAF7A] transition-colors">Admin</h3>
                <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  DEFAULT
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">Admin can see & manage all</p>
            </div>

            {/* Employee Card */}
            <div className="p-6 border border-gray-300 dark:border-gray-800 rounded-2xl flex flex-col gap-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Employee</h3>
                <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white"><HiEllipsisHorizontal className="text-xl" /></button>
              </div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">Self-manage their info</p>
            </div>

            {/* Human Resource Card */}
            <div className="p-6 border border-gray-300 dark:border-gray-800 rounded-2xl flex flex-col gap-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Human Resource</h3>
                <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white"><HiEllipsisHorizontal className="text-xl" /></button>
              </div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">Manage all employee</p>
            </div>

            {/* Lead Designer Card */}
            <div className="p-6 border border-gray-300 dark:border-gray-800 rounded-2xl flex flex-col gap-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Lead Designer</h3>
                <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white"><HiEllipsisHorizontal className="text-xl" /></button>
              </div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">Lead for UI/UX designer</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Top Header */}
          <div className="px-8 pt-8 pb-4 border-b border-gray-300 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <button 
                onClick={() => setSelectedRole(null)}
                className="mt-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <HiChevronLeft className="text-xl" />
              </button>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedRole}
                  </h2>
                  {selectedRole === "Admin" && (
                    <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      DEFAULT
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                  {selectedRole === "Admin" 
                    ? "Admin can see all fields, edit all fields, and do everything the system offers." 
                    : "Custom permissions for this role."}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 mt-8">
              <button
                onClick={() => setActiveTab("Permission")}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === "Permission"
                    ? "border-[#0FAF7A] text-[#0FAF7A]"
                    : "border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Permission
              </button>
              <button
                onClick={() => setActiveTab("Member")}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === "Member"
                    ? "border-[#0FAF7A] text-[#0FAF7A]"
                    : "border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Member
              </button>
            </div>
          </div>

      {/* Main Content Area */}
      <div className="p-4 md:p-8 flex-1 overflow-y-auto">
        <div className="max-w-4xl flex flex-col gap-8">
          {activeTab === "Permission" ? (
            <>
              {/* Access Info Box */}
              <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-xs bg-white dark:bg-gray-900">
                <div className="flex flex-col gap-4 w-full max-w-sm">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Users with this role can access the information of
                  </h3>
                  <Dropdown
                    label={accessLevel}
                    options={["All employees", "Direct reports", "Own data only"]}
                    onSelect={(val) => setAccessLevel(val)}
                    className="w-full"
                  />
                </div>
                <div className="w-12 h-12 rounded-full border-[3px] border-[#FFB800] flex items-center justify-center flex-shrink-0">
                  <HiLockClosed className="text-xl text-gray-900 dark:text-white" />
                </div>
              </div>

              {/* Permissions Table */}
              <div className="flex flex-col">
                {/* Table Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-2">
                  <span>Section</span>
                  <span>Permission</span>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col">
                  {PERMISSION_SECTIONS.map((section, index) => (
                    <div
                      key={section}
                      className={`flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50/30 dark:hover:bg-gray-800/20 ${
                        index !== PERMISSION_SECTIONS.length - 1
                          ? "border-b border-gray-300 dark:border-gray-800/50"
                          : ""
                      }`}
                    >
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {section}
                      </span>
                      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <HiOutlineLink className="text-gray-400 text-sm" />
                        <span className="text-xs font-bold text-gray-900 dark:text-white">
                          View & Edit
                        </span>
                        <HiChevronDown className="text-gray-400 text-sm ml-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Member Search Box */}
              <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs bg-white dark:bg-gray-900">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Add Admin Member
                </h3>
                <div className="w-full md:w-64">
                  <Input
                    placeholder="Search Member"
                    rightIcon={<HiOutlineMagnifyingGlass className="text-gray-400 text-lg" />}
                  />
                </div>
              </div>

              {/* Members Table */}
              <div className="flex flex-col">
                {/* Table Header */}
                <div className="flex items-center px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-2">
                  <div className="flex-[2]">Member</div>
                  <div className="flex-[2]">Email</div>
                  <div className="flex-1 text-right">Action</div>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col">
                  {MEMBERS.map((member, index) => (
                    <div
                      key={member.id}
                      className={`flex items-center px-6 py-4 transition-colors hover:bg-gray-50/30 dark:hover:bg-gray-800/20 ${
                        index !== MEMBERS.length - 1
                          ? "border-b border-gray-300 dark:border-gray-800/50"
                          : ""
                      }`}
                    >
                      <div className="flex-[2] flex items-center gap-3">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-800" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-[#0FAF7A] flex items-center justify-center text-[10px] font-bold border border-emerald-100 dark:border-emerald-800/50">
                            {member.initial}
                          </div>
                        )}
                        <span className="text-xs font-bold text-gray-900 dark:text-white">
                          {member.name}
                        </span>
                      </div>
                      <div className="flex-[2] text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {member.email}
                      </div>
                      <div className="flex-1 flex justify-end">
                        <button className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-sm">
                          <HiOutlineTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Pagination className="mt-0 w-full" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      </>
      )}

      {/* Add New Role Drawer */}
      <AddRoleDrawer isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
}
