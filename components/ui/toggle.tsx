"use client";

import * as React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? "bg-[#0FAF7A]" : "bg-gray-200 dark:bg-gray-700"
        }`}
    >
      <span
        className={`pointer-events-none flex h-5 w-5 items-center justify-center transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${checked ? "translate-x-5" : "translate-x-0"
          }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-[#0FAF7A]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
    </button>
  );
}
