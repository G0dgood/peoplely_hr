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
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlinePresentationChartLine,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineBell,
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
    if (pathname.startsWith("/checklist")) {
      setExpandedItems((prev) => prev.includes("checklist") ? prev : [...prev, "checklist"]);
    }
    if (pathname.startsWith("/employees/department") || pathname.startsWith("/employees/offices")) {
      setExpandedItems((prev) => prev.includes("employees") ? prev : [...prev, "employees"]);
    }
    if (pathname.startsWith("/performance")) {
      setExpandedItems((prev) => prev.includes("performance") ? prev : [...prev, "performance"]);
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
      className="bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
    >
      {/* ── Logo + collapse toggle ── */}
      <div
        className={`flex items-center px-4 py-5 shrink-0 ${collapsed ? "justify-center flex-col gap-3" : "justify-between"
          } dark:border-gray-800/60`}
      >
        <div className="flex items-center gap-2">
          <img
            src="/logo/peoplelyHalf.svg"
            alt="P"
            className="h-8 w-auto"
          />
          {!collapsed && (
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Peoplely HR
            </span>
          )}
        </div>

        <button
          onClick={() => onCollapse(!collapsed)}
          className="w-8 h-8 flex shrink-0 items-center justify-center rounded-lg transition-colors cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-800"
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
                active={pathname === "/employees"}
                href="/employees"
              >
                Manage Employees
              </SidebarSubItem>
              <SidebarSubItem
                active={pathname === "/employees/directory"}
                href="/employees/directory"
              >
                Directory
              </SidebarSubItem>
              <SidebarSubItem
                active={pathname.startsWith("/employees/department")}
                href="/employees/department"
              >
                Department
              </SidebarSubItem>
              <SidebarSubItem
                active={pathname.startsWith("/employees/offices")}
                href="/employees/offices"
              >
                Offices
              </SidebarSubItem>
              <SidebarSubItem
                isLast
                active={pathname === "/employees/org-chart"}
                href="/employees/org-chart"
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
                active={pathname === "/checklist/to-dos"}
                href="/checklist/to-dos"
              >
                To-Dos
              </SidebarSubItem>
              <SidebarSubItem
                active={pathname === "/checklist/onboarding"}
                href="/checklist/onboarding"
              >
                Onboarding
              </SidebarSubItem>
              <SidebarSubItem
                active={pathname === "/checklist/offboarding"}
                href="/checklist/offboarding"
              >
                Offboarding
              </SidebarSubItem>
              <SidebarSubItem
                isLast
                active={pathname === "/checklist/setting"}
                href="/checklist/setting"
              >
                Setting
              </SidebarSubItem>
            </div>
          )}
        </div>
        <SidebarItem
          icon={<HiOutlineDocumentText />}
          active={pathname === "/documents"}
          title={collapsed ? "Documents" : undefined}
          className={itemClass}
          href="/documents"
        >
          {!collapsed && "Documents"}
        </SidebarItem>
        <SidebarItem
          icon={<HiOutlineNewspaper />}
          active={pathname.startsWith("/news")}
          title={collapsed ? "News" : undefined}
          className={itemClass}
          href="/news"
        >
          {!collapsed && "News"}
        </SidebarItem>
        <SidebarItem
          icon={<HiOutlineChatBubbleLeftRight />}
          active={pathname.startsWith("/message")}
          title={collapsed ? "Message" : undefined}
          className={itemClass}
          href="/message"
        >
          {!collapsed && "Message"}
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
              active={pathname === "/time-off/my-time-off"}
              href="/time-off/my-time-off"
            >
              My Time Off
            </SidebarSubItem>
            <SidebarSubItem
              active={pathname === "/time-off/team-time-off"}
              href="/time-off/team-time-off"
            >
              Team Time Off
            </SidebarSubItem>
            <SidebarSubItem
              active={pathname === "/time-off/employee-time-off"}
              href="/time-off/employee-time-off"
            >
              Employee Time Off
            </SidebarSubItem>
            <SidebarSubItem
              isLast
              active={pathname === "/time-off/settings"}
              href="/time-off/settings"
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
              active={pathname.startsWith("/attendance/my-attendance")}
              href="/attendance/my-attendance"
            >
              My Attendance
            </SidebarSubItem>
            <SidebarSubItem
              active={pathname.startsWith("/attendance/team-attendance")}
              href="/attendance/team-attendance"
            >
              Team Attendance
            </SidebarSubItem>
            <SidebarSubItem
              active={pathname.startsWith("/attendance/employee-attendance")}
              href="/attendance/employee-attendance"
            >
              Employee Attendance
            </SidebarSubItem>
            <SidebarSubItem
              isLast
              active={pathname.startsWith("/attendance/settings")}
              href="/attendance/settings"
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
              active={pathname.startsWith("/payroll/list")}
              href="/payroll/list"
            >
              Employee Payroll
            </SidebarSubItem>
            <SidebarSubItem
              isLast
              active={pathname.startsWith("/payroll/settings")}
              href="/payroll/settings"
            >
              Settings
            </SidebarSubItem>
          </div>
        )}
        <SidebarItem
          icon={<HiOutlinePresentationChartLine />}
          hasSubmenu={!collapsed}
          expanded={expandedItems.includes("performance")}
          onClick={() => toggleExpand("performance")}
          title={collapsed ? "Performance" : undefined}
          className={itemClass}
        >
          {!collapsed && "Performance"}
        </SidebarItem>
        {!collapsed && expandedItems.includes("performance") && (
          <div className="flex flex-col">
            <SidebarSubItem
              active={pathname === "/performance/my-performance" || pathname.startsWith("/performance/my-performance/")}
              href="/performance/my-performance"
            >
              My Performance
            </SidebarSubItem>
            <SidebarSubItem
              active={pathname === "/performance/team-performance" || pathname.startsWith("/performance/team-performance/")}
              href="/performance/team-performance"
            >
              Team Performance
            </SidebarSubItem>
            <SidebarSubItem
              isLast
              active={pathname === "/performance/hr-performance" || pathname.startsWith("/performance/hr-performance/")}
              href="/performance/hr-performance"
            >
              HR Performance
            </SidebarSubItem>
          </div>
        )}
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
              active={pathname.startsWith("/recruitment/jobs")}
              href="/recruitment/jobs"
            >
              Jobs
            </SidebarSubItem>
            <SidebarSubItem
              active={pathname.startsWith("/recruitment/candidates")}
              href="/recruitment/candidates"
            >
              Candidates
            </SidebarSubItem>
            <SidebarSubItem
              isLast
              active={pathname.startsWith("/recruitment/settings")}
              href="/recruitment/settings"
            >
              Settings
            </SidebarSubItem>
          </div>
        )}
        <SidebarItem
          icon={<HiOutlineBell />}
          hasSubmenu={!collapsed}
          expanded={expandedItems.includes("notification")}
          onClick={() => toggleExpand("notification")}
          title={collapsed ? "Notification" : undefined}
          className={itemClass}
        >
          {!collapsed && "Notification"}
        </SidebarItem>
        {!collapsed && expandedItems.includes("notification") && (
          <div className="flex flex-col">
            <SidebarSubItem
              active={pathname === "/notification"}
              href="/notification"
            >
              All Notifications
            </SidebarSubItem>
            <SidebarSubItem
              isLast
              active={pathname.startsWith("/settings/notification")}
              href="/settings/notification"
            >
              Settings
            </SidebarSubItem>
          </div>
        )}
        <SidebarItem
          icon={<HiOutlineChartBar />}
          active={pathname.startsWith("/report")}
          title={collapsed ? "Report" : undefined}
          className={itemClass}
          href="/report"
        >
          {!collapsed && "Report"}
        </SidebarItem>
      </nav>

      {/* ── Footer ── */}
      <div
        className="p-3 flex flex-col gap-1 border-t border-gray-300 dark:border-gray-800/60"
      >
        <SidebarItem
          icon={<HiOutlineQuestionMarkCircle />}
          badge={8}
          title={collapsed ? "Help Center" : undefined}
          className={itemClass}
          href="/help-center"
          active={pathname === "/help-center"}
        >
          {!collapsed && "Help Center"}
        </SidebarItem>
        <SidebarItem
          icon={<HiOutlineCog6Tooth />}
          title={collapsed ? "Settings" : undefined}
          className={itemClass}
          href="/settings/company-info"
          active={pathname.startsWith("/settings")}
        >
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

