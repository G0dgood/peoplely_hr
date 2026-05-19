"use client";

import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMail, HiOutlineBell } from "react-icons/hi";

export interface DashboardHeaderProps {
  isDarkMode?: boolean;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

export function DashboardHeader({
  userName = "Pristia",
  userRole = "Administrator",
  userAvatar = "https://i.pravatar.cc/150?u=pristia",
}: DashboardHeaderProps) {
  return (
    <header id="header"
      className="flex items-center justify-between px-8 h-20 transition-colors bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
    >
      {/* Search and Nav links */}
      <div className="flex items-center gap-8">
        <div className="flex items-center w-64 sm:w-80 relative">
          <Input
            placeholder="Search anything..."
            leftIcon={<FaSearch className="text-gray-400 text-sm" />}
            rightIcon={
              <span className="text-[11px] font-semibold border px-1.5 py-0.5 rounded-md select-none text-gray-400 border-gray-200 bg-white dark:text-gray-500 dark:border-gray-800 dark:bg-gray-900">
                ⌘ F
              </span>
            }
            className="h-11 rounded-xl text-sm bg-gray-50 border-gray-100 placeholder:text-gray-400 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-600"
          />
        </div>

        <nav className="hidden xl:flex items-center gap-6">
          {["Documents", "News", "Payslip", "Report"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Right side icons and profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 relative dark:hover:bg-gray-800"
          >
            <HiOutlineMail className="text-xl text-gray-500 dark:text-gray-400" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-error border-2 border-white dark:border-gray-900" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 relative dark:hover:bg-gray-800"
          >
            <HiOutlineBell className="text-xl text-gray-500 dark:text-gray-400" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-error border-2 border-white dark:border-gray-900" />
          </Button>
        </div>

        <div className="flex items-center gap-3 ml-2">
          <Avatar src={userAvatar} size="sm" className="rounded-full border-2 border-gray-100 dark:border-gray-800" />
        </div>
      </div>
    </header>
  );
}
