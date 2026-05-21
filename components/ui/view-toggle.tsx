"use client";

import * as React from "react";
import { HiOutlineBars3, HiOutlineSquares2X2 } from "react-icons/hi2";
import { motion } from "framer-motion";

export interface ViewToggleProps {
  view: "list" | "calendar" | "grid";
  onChange: (view: any) => void;
  className?: string;
}

export function ViewToggle({ view, onChange, className = "", alternateView = "calendar" }: ViewToggleProps & { alternateView?: "calendar" | "grid" }) {
  return (
    <div className={`relative flex items-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl p-1 ${className}`}>
      <button
        onClick={() => onChange("list")}
        className={`relative z-10 p-2 rounded-lg transition-colors ${
          view === "list" 
            ? "text-primary" 
            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        }`}
      >
        <HiOutlineBars3 className="text-xl" />
        {view === "list" && (
          <motion.div
            layoutId="view-toggle-bg"
            className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
      <button
        onClick={() => onChange(alternateView)}
        className={`relative z-10 p-2 rounded-lg transition-colors ${
          view === alternateView
            ? "text-primary" 
            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        }`}
      >
        <HiOutlineSquares2X2 className="text-xl" />
        {view === alternateView && (
          <motion.div
            layoutId="view-toggle-bg"
            className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
    </div>
  );
}
