"use client";

import { useState } from "react";
import { DashboardSidenav } from "@/components/ui/dashboard-sidenav";
import { DashboardHeader } from "@/components/ui/dashboard-header";

export function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div id="page-wrapper" className={isDarkMode ? "dark" : ""}>
      <DashboardHeader />
      <DashboardSidenav
        isDarkMode={isDarkMode}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        onThemeChange={setIsDarkMode}
      />
      <main className={isDarkMode ? "bg-[#0a0a0a]" : "bg-[#FAFBFC]"}>
        {children}
      </main>
    </div>
  );
}
