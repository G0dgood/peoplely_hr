"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials, selectIsAuthenticated } from "@/store/features/authSlice";
import { SVGLoader } from "@/components/ui/options";

export const AuthPersistence = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        dispatch(setCredentials({ user, accessToken: "" }));
      }
    } catch (e) {
      console.error("Failed to restore auth session:", e);
    } finally {
      setIsRestored(true);
    }
  }, [dispatch]);

  // Prevent flash of unauthenticated state during restoration
  if (!isRestored) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-950 z-[9999]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full border border-[#10B981]/20 animate-ping" />
            <div className="absolute -inset-2 rounded-full border border-[#10B981]/10 animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-white dark:bg-gray-900 border-[0.5px] border-[#10B981]/30 flex items-center justify-center overflow-hidden p-4">
              <img
                src="/logo/peoplelyHalf.svg"
                alt="Logo"
                className="w-full h-full object-contain animate-pulse"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
