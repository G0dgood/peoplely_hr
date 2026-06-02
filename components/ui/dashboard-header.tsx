"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { NotificationPopup } from "@/components/ui/notification-popup";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineBars3, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface DashboardHeaderProps {
  isDarkMode?: boolean;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onMenuClick?: () => void;
  onLogout?: () => void;
}

export function DashboardHeader({
  userName = "Pristia",
  userRole = "Administrator",
  userAvatar = "https://i.pravatar.cc/150?u=pristia",
  onMenuClick,
  onLogout,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header id="header"
      className="flex items-center justify-between px-8 h-20 transition-colors bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-800"
    >
      {/* Search and Nav links */}
      <div className="flex items-center gap-4 md:gap-8">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <HiOutlineBars3 className="text-xl" />
          </button>
        )}
        <div className="flex items-center w-64 sm:w-80 relative">
          <Input
            placeholder="Search anything..."
            leftIcon={<FaSearch className="text-gray-400 text-sm" />}
            rightIcon={
              <span className="text-[11px] font-semibold border px-1.5 py-0.5 rounded-md select-none text-gray-400 border-gray-300 bg-white dark:text-gray-500 dark:border-gray-800 dark:bg-gray-900">
                ⌘ F
              </span>
            }
            className="h-11 rounded-xl text-sm bg-gray-50 border-gray-300 placeholder:text-gray-400 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-600"
          />
        </div>

        <nav className="hidden xl:flex items-center gap-6">
          {[
            { name: "Documents", href: "/documents" },
            { name: "News", href: "/news" },
            { name: "Payslip", href: "#" },
            { name: "Report", href: "/report" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "text-primary font-bold"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right side icons and profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <Link
            href="/message"
            className="w-10 h-10 flex items-center justify-center rounded-xl relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <HiOutlineMail className="text-xl text-gray-500 dark:text-gray-400" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-gray-900" />
          </Link>
          <NotificationPopup />
        </div>

        <div className="relative flex items-center gap-3 ml-2" ref={profileDropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center justify-center rounded-full hover:ring-2 hover:ring-[#10B981]/30 transition-all focus:outline-none cursor-pointer"
          >
            <Avatar src={userAvatar} size="sm" className="rounded-full border-2 border-gray-300 dark:border-gray-800" />
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg py-2.5 z-50">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800/60 mb-1">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{userName}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{userRole}</p>
              </div>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  onLogout?.();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-650 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 transition-colors text-left cursor-pointer"
              >
                <HiOutlineArrowRightOnRectangle className="text-sm" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
