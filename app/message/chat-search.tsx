"use client";

import * as React from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

interface ChatSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ChatSearch({ value, onChange }: ChatSearchProps) {
  return (
    <div className="px-5 pt-6 pb-4">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search message..."
          className="w-full h-10 pl-4 pr-10 text-xs font-semibold rounded-xl border border-gray-300 dark:border-gray-800 bg-gray-55 dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <HiOutlineMagnifyingGlass className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
      </div>
    </div>
  );
}
