"use client";

import * as React from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect?: (option: string) => void;
  className?: string;
  icon?: React.ReactNode;
}

export function Dropdown({ label, options, onSelect, className = "", icon }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(label);
  const [opensUpward, setOpensUpward] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate flip direction when opening
  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // Estimated dropdown height: ~180px (up to ~6 items × 32px + padding)
      const estimatedHeight = Math.min(options.length * 36 + 16, 220);
      setOpensUpward(spaceBelow < estimatedHeight);
    }
    setIsOpen((prev) => !prev);
  };

  const isFullWidth = className.includes("w-full");

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`px-4 py-3 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center justify-between gap-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${className.includes("w-") || className.includes("min-w-") ? "w-full" : "min-w-[140px]"
          }`}
      >
        <div className="flex items-center gap-2">
          {selected}
        </div>
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-gray-400 dark:text-gray-500 flex items-center">
              {icon}
            </span>
          )}
          <HiOutlineChevronDown
            className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg z-50 py-2 ${isFullWidth ? "w-full" : className.includes("w-") ? "min-w-full whitespace-nowrap" : "w-48"
            } ${opensUpward
              ? "bottom-full mb-2"   // flip up
              : "top-full mt-2"      // default down
            }`}
        >
          {options.map((option) => (
            <button
              key={option}
              className="w-full text-left px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
                onSelect?.(option);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
