import * as React from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";

export interface RowPerPageProps {
  itemsPerPage: number;
  onItemsPerPageChange?: (value: number) => void;
}

export function RowPerPage({
  itemsPerPage,
  onItemsPerPageChange,
}: RowPerPageProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [5, 10, 20, 50];

  return (
    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 dark:text-gray-500">
      <span className="whitespace-nowrap">Rows per page:</span>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <span>{itemsPerPage}</span>
          <HiOutlineChevronDown className={`text-xs text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full mt-1 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg shadow-lg z-50 py-1 overflow-hidden">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onItemsPerPageChange?.(option);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-[11px] font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
