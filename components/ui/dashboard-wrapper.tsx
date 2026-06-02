"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardSidenav } from "@/components/ui/dashboard-sidenav";
import { DashboardHeader } from "@/components/ui/dashboard-header";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCurrentUser, selectIsAuthenticated, logOut } from "@/store/features/authSlice";
import { LogoutModal } from "@/components/ui/modal";

export function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/login");
  };

  const isAuthPage = ["/", "/login", "/register", "/forgot-password", "/onboarding", "/otp-verify", "/password-success", "/update-password", "/checkout"].includes(pathname);

  const knownMainRoutes = [
    "/dashboard", "/employees", "/report", "/documents", "/attendance",
    "/time-off", "/checklist", "/news", "/message", "/payroll",
    "/settings", "/notification", "/help-center", "/recruitment"
  ];

  const isMainRoute = knownMainRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  // Auth guard: redirect unauthenticated users away from protected routes
  useEffect(() => {
    if (isMainRoute && !isAuthenticated) {
      router.replace("/login");
    }
    if (isAuthPage && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isMainRoute, isAuthPage, isAuthenticated, router]);

  // If it's an auth page OR an unknown page (404), hide the Sidebar/Header.
  if (isAuthPage || !isMainRoute) {
    return <main className={isDarkMode ? "dark bg-[#0a0a0a]" : "bg-white"}>{children}</main>;
  }

  // Show nothing while redirecting unauthenticated users
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div id="page-wrapper" className={`${isDarkMode ? "dark" : ""} ${mobileNavOpen ? "mobile-nav-open" : ""}`}>
      {/* Mobile Sidenav Backdrop */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <DashboardHeader
        onMenuClick={() => setMobileNavOpen(!mobileNavOpen)}
        userName={user?.name || undefined}
        userRole={user?.email || undefined}
        userAvatar={user?.name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=10B981&color=fff` : undefined}
        onLogout={() => setIsLogoutModalOpen(true)}
      />
      <DashboardSidenav
        isDarkMode={isDarkMode}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        onThemeChange={setIsDarkMode}
      />
      <main className={isDarkMode ? "bg-[#0a0a0a]" : "bg-[#FAFBFC]"}>
        {children}
      </main>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
