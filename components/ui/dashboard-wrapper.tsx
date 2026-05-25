"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidenav } from "@/components/ui/dashboard-sidenav";
import { DashboardHeader } from "@/components/ui/dashboard-header";

export function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isAuthPage = ["/", "/login", "/register", "/forgot-password", "/onboarding", "/otp-verify", "/password-success", "/update-password", "/checkout"].includes(pathname);

  const knownMainRoutes = [
    "/dashboard", "/employees", "/report", "/documents", "/attendance",
    "/time-off", "/checklist", "/news", "/message", "/payroll",
    "/settings", "/notification", "/help-center", "/recruitment"
  ];

  const isMainRoute = knownMainRoutes.some(route => pathname.startsWith(route));

  // If it's an auth page OR an unknown page (404), hide the Sidebar/Header.
  if (isAuthPage || !isMainRoute) {
    return <main className={isDarkMode ? "dark bg-[#0a0a0a]" : "bg-white"}>{children}</main>;
  }

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
