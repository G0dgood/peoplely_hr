"use client";

import { Sidebar, SidebarItem, SidebarSubItem } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentText,
  HiOutlineNewspaper,
  HiOutlineClock,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlinePresentationChartLine,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog6Tooth,
  HiMiniChevronDoubleLeft,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi2";

export interface DashboardSidenavProps {
  isDarkMode: boolean;
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
  onThemeChange: (dark: boolean) => void;
}

export function DashboardSidenav({
  isDarkMode,
  collapsed,
  onCollapse,
  onThemeChange,
}: DashboardSidenavProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["employees"]);
  const itemClass = collapsed ? "justify-center px-0" : "";

  useEffect(() => {
    if (pathname.startsWith("/dashboard/checklist")) {
      setExpandedItems((prev) => prev.includes("checklist") ? prev : [...prev, "checklist"]);
    }
  }, [pathname]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Sidebar
      id="sidenav"
      collapsed={collapsed}
      className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
    >
      {/* ── Logo + collapse toggle ── */}
      <div
        className={`flex items-center px-4 py-5 shrink-0 ${collapsed ? "justify-center" : "justify-between"
          } border-gray-100 dark:border-gray-800/60`}
      >
        <div className="flex items-center gap-2">
          <img
            src="/logo/peoplelyHalf.svg"
            alt="P"
            className="h-8 w-auto"
          />
          {!collapsed && (
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              HRDashboard
            </span>
          )}
        </div>

        <button
          onClick={() => onCollapse(!collapsed)}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${collapsed ? "hidden" : ""
            } text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-800`}
        >
          <HiMiniChevronDoubleLeft
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* ── Main nav ── */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-1">
        <SidebarItem
          icon={<HiOutlineSquares2X2 />}
          active={pathname === "/dashboard"}
          iconPosition="right"
          title={collapsed ? "Dashboard" : undefined}
          className={itemClass}
          href="/dashboard"
        >
          {!collapsed && "Dashboard"}
        </SidebarItem>

        <div>
          <SidebarItem
            icon={<HiOutlineUsers />}
            hasSubmenu={!collapsed}
            expanded={expandedItems.includes("employees")}
            onClick={() => toggleExpand("employees")}
            title={collapsed ? "Employees" : undefined}
            className={itemClass}
          >
            {!collapsed && "Employees"}
          </SidebarItem>
          {!collapsed && expandedItems.includes("employees") && (
            <div className="flex flex-col">
              <SidebarSubItem
                active={pathname === "/dashboard/employees"}
                href="/dashboard/employees"
              >
                Manage Employees
              </SidebarSubItem>
              <SidebarSubItem
                active={pathname === "/dashboard/employees/directory"}
                href="/dashboard/employees/directory"
              >
                Directory
              </SidebarSubItem>
              <SidebarSubItem
                isLast
                active={pathname === "/dashboard/employees/org-chart"}
                href="/dashboard/employees/org-chart"
              >
                ORG Chart
              </SidebarSubItem>
            </div>
          )}
        </div>

        <div>
          <SidebarItem
            icon={<HiOutlineClipboardDocumentList />}
            hasSubmenu={!collapsed}
            expanded={expandedItems.includes("checklist")}
            onClick={() => toggleExpand("checklist")}
            title={collapsed ? "Checklist" : undefined}
            className={itemClass}
          >
            {!collapsed && "Checklist"}
          </SidebarItem>
          {!collapsed && expandedItems.includes("checklist") && (
            <div className="flex flex-col">
              <SidebarSubItem
                active={pathname === "/dashboard/checklist/to-dos"}
                href="/dashboard/checklist/to-dos"
              >
                To-Dos
              </SidebarSubItem>
              <SidebarSubItem
                active={pathname === "/dashboard/checklist/onboarding"}
                href="/dashboard/checklist/onboarding"
              >
                Onboarding
              </SidebarSubItem>
              <SidebarSubItem
                active={pathname === "/dashboard/checklist/offboarding"}
                href="/dashboard/checklist/offboarding"
              >
                Offboarding
              </SidebarSubItem>
              <SidebarSubItem
                isLast
                active={pathname === "/dashboard/checklist/setting"}
                href="/dashboard/checklist/setting"
              >
                Setting
              </SidebarSubItem>
            </div>
          )}
        </div>
        <SidebarItem
          icon={<HiOutlineDocumentText />}
          active={pathname === "/dashboard/documents"}
          title={collapsed ? "Documents" : undefined}
          className={itemClass}
          href="/dashboard/documents"
        >
          {!collapsed && "Documents"}
        </SidebarItem>
        <SidebarItem
          icon={<HiOutlineNewspaper />}
          active={pathname.startsWith("/dashboard/news")}
          title={collapsed ? "News" : undefined}
          className={itemClass}
          href="/dashboard/news"
        >
          {!collapsed && "News"}
        </SidebarItem>
        <SidebarItem
          icon={<HiOutlineClock />}
          hasSubmenu={!collapsed}
          expanded={expandedItems.includes("time-off")}
          onClick={() => toggleExpand("time-off")}
          title={collapsed ? "Time Off" : undefined}
          className={itemClass}
        >
          {!collapsed && "Time Off"}
        </SidebarItem>
        {!collapsed && expandedItems.includes("time-off") && (
          <div className="flex flex-col">
            <SidebarSubItem
              active={pathname === "/dashboard/time-off/my-time-off"}
              href="/dashboard/time-off/my-time-off"
            >
              My Time Off
            </SidebarSubItem>
            <SidebarSubItem
              active={pathname === "/dashboard/time-off/team-time-off"}
              href="/dashboard/time-off/team-time-off"
            >
              Team Time Off
            </SidebarSubItem>
            <SidebarSubItem
              active={pathname === "/dashboard/time-off/employee-time-off"}
              href="/dashboard/time-off/employee-time-off"
            >
              Employee Time Off
            </SidebarSubItem>
            <SidebarSubItem
              isLast
              active={pathname === "/dashboard/time-off/settings"}
              href="/dashboard/time-off/settings"
            >
              Settings
            </SidebarSubItem>
          </div>
        )}
        <SidebarItem
          icon={<HiOutlineCalendarDays />}
          hasSubmenu={!collapsed}
          expanded={expandedItems.includes("attendance")}
          onClick={() => toggleExpand("attendance")}
          title={collapsed ? "Attendance" : undefined}
          className={itemClass}
        >
          {!collapsed && "Attendance"}
        </SidebarItem>
        {!collapsed && expandedItems.includes("attendance") && (
          <div className="flex flex-col">
            <SidebarSubItem
              active={pathname.startsWith("/dashboard/attendance/my-attendance")}
              href="/dashboard/attendance/my-attendance"
            >
              My Attendance
            </SidebarSubItem>
            <SidebarSubItem
              active={pathname.startsWith("/dashboard/attendance/team-attendance")}
              href="/dashboard/attendance/team-attendance"
            >
              Team Attendance
            </SidebarSubItem>
            <SidebarSubItem
              active={pathname.startsWith("/dashboard/attendance/employee-attendance")}
              href="/dashboard/attendance/employee-attendance"
            >
              Employee Attendance
            </SidebarSubItem>
            <SidebarSubItem
              isLast
              active={pathname.startsWith("/dashboard/attendance/settings")}
              href="/dashboard/attendance/settings"
            >
              Settings
            </SidebarSubItem>
          </div>
        )}
        <SidebarItem
          icon={<HiOutlineBanknotes />}
          hasSubmenu={!collapsed}
          expanded={expandedItems.includes("payroll")}
          onClick={() => toggleExpand("payroll")}
          title={collapsed ? "Payroll" : undefined}
          className={itemClass}
        >
          {!collapsed && "Payroll"}
        </SidebarItem>
        {!collapsed && expandedItems.includes("payroll") && (
          <div className="flex flex-col">
            <SidebarSubItem
              active={pathname.startsWith("/dashboard/payroll/list")}
              href="/dashboard/payroll/list"
            >
              Employee Payroll
            </SidebarSubItem>
            <SidebarSubItem
              isLast
              active={pathname.startsWith("/dashboard/payroll/settings")}
              href="/dashboard/payroll/settings"
            >
              Settings
            </SidebarSubItem>
          </div>
        )}
        <SidebarItem icon={<HiOutlinePresentationChartLine />} hasSubmenu={!collapsed} title={collapsed ? "Performance" : undefined} className={itemClass}>
          {!collapsed && "Performance"}
        </SidebarItem>
        <SidebarItem
          icon={<HiOutlineBriefcase />}
          hasSubmenu={!collapsed}
          expanded={expandedItems.includes("recruitment")}
          onClick={() => toggleExpand("recruitment")}
          title={collapsed ? "Recruitment" : undefined}
          className={itemClass}
        >
          {!collapsed && "Recruitment"}
        </SidebarItem>
        {!collapsed && expandedItems.includes("recruitment") && (
          <div className="flex flex-col">
            <SidebarSubItem
              active={pathname.startsWith("/dashboard/recruitment/jobs")}
              href="/dashboard/recruitment/jobs"
            >
              Jobs
            </SidebarSubItem>
            <SidebarSubItem
              active={pathname.startsWith("/dashboard/recruitment/candidates")}
              href="/dashboard/recruitment/candidates"
            >
              Candidates
            </SidebarSubItem>
            <SidebarSubItem
              isLast
              active={pathname.startsWith("/dashboard/recruitment/settings")}
              href="/dashboard/recruitment/settings"
            >
              Settings
            </SidebarSubItem>
          </div>
        )}
        <SidebarItem
          icon={<HiOutlineChartBar />}
          active={pathname.startsWith("/dashboard/report")}
          title={collapsed ? "Report" : undefined}
          className={itemClass}
          href="/dashboard/report"
        >
          {!collapsed && "Report"}
        </SidebarItem>
      </nav>

      {/* ── Footer ── */}
      <div
        className="p-3 flex flex-col gap-1 border-gray-100 dark:border-gray-800/60"
      >
        <SidebarItem 
          icon={<HiOutlineQuestionMarkCircle />} 
          badge={8} 
          title={collapsed ? "Help Center" : undefined} 
          className={itemClass}
          href="/dashboard/help-center"
          active={pathname === "/dashboard/help-center"}
        >
          {!collapsed && "Help Center"}
        </SidebarItem>
        <SidebarItem icon={<HiOutlineCog6Tooth />} title={collapsed ? "Settings" : undefined} className={itemClass}>
          {!collapsed && "Setting"}
        </SidebarItem>

        {/* Theme toggle */}
        {!collapsed ? (
          <div
            className="flex items-center rounded-full p-1 mt-4 bg-gray-100 dark:bg-gray-800"
          >
            <button
              onClick={() => onThemeChange(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${!isDarkMode ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-300"
                }`}
            >
              <HiOutlineSun className={!isDarkMode ? "text-gray-900" : ""} /> Light
            </button>
            <button
              onClick={() => onThemeChange(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${isDarkMode ? "bg-gray-700 text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}
            >
              <HiOutlineMoon className={isDarkMode ? "text-white" : ""} /> Dark
            </button>
          </div>
        ) : (
          <button
            onClick={() => onThemeChange(!isDarkMode)}
            className="w-full flex justify-center py-2 rounded-xl text-lg cursor-pointer transition-colors text-gray-500 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
          >
            {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
          </button>
        )}
      </div>
    </Sidebar>
  );
}

