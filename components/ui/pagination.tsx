import * as React from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  className = "",
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  ...props
}) => {
  // If totalPages is 1 and no change handler is provided, we render 3 pages
  // as a visual mockup/placeholder for static pages.
  const isStatic = totalPages === 1 && onPageChange.toString().includes("() => {}");
  const actualTotalPages = isStatic ? 3 : totalPages;
  const actualCurrentPage = isStatic ? 1 : currentPage;

  if (actualTotalPages <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={`flex w-full items-center justify-center mt-6 ${className}`}
      {...props}
    >
      <ul className="flex flex-row items-center gap-1.5 w-full">
        <li className="mr-auto">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, actualCurrentPage - 1))}
            disabled={actualCurrentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <FaChevronLeft className="h-3 w-3" />
          </button>
        </li>
        {Array.from({ length: actualTotalPages }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            <button
              type="button"
              onClick={() => onPageChange(p)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-body-md font-semibold transition-colors cursor-pointer ${
                p === actualCurrentPage
                  ? "bg-primary text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {p}
            </button>
          </li>
        ))}
        <li className="ml-auto">
          <button
            type="button"
            onClick={() => onPageChange(Math.min(actualTotalPages, actualCurrentPage + 1))}
            disabled={actualCurrentPage === actualTotalPages}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <FaChevronRight className="h-3 w-3" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.displayName = "Pagination";
