import * as React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = "/",
  className = "",
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-body-xs font-bold text-gray-400 ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {isLast || !item.href ? (
              <span
                className={
                  isLast
                    ? "text-gray-700 dark:text-white"
                    : "hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                }
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {item.label}
              </a>
            )}
            {!isLast && (
              <span className="select-none text-gray-300 dark:text-gray-600">
                {separator}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
