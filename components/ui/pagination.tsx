import * as React from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className = '', ...props }, ref) => (
    <ul
      ref={ref}
      className={`flex flex-row items-center gap-1.5 ${className}`}
      {...props}
    />
  )
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className = '', ...props }, ref) => (
    <li ref={ref} className={className} {...props} />
  )
)
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<"button">

const PaginationLink = ({
  className = '',
  isActive,
  ...props
}: PaginationLinkProps) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={`
      flex h-10 w-10 items-center justify-center rounded-xl text-body-md font-semibold transition-colors
      ${isActive 
        ? "bg-primary text-white" 
        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      }
      ${className}
    `}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className = '',
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={`border border-gray-300 dark:border-gray-800 ${className}`}
    {...props}
  >
    <FaChevronLeft className="h-3 w-3 text-gray-500 dark:text-gray-400" />
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className = '',
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={`border border-gray-300 dark:border-gray-800 ${className}`}
    {...props}
  >
    <FaChevronRight className="h-3 w-3 text-gray-500 dark:text-gray-400" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className = '',
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={`flex h-10 w-10 items-center justify-center text-gray-400 ${className}`}
    {...props}
  >
    ...
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

const Pagination = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={`flex w-full items-center justify-center mt-6 ${className}`}
    {...props}
  >
    {children || (
      <PaginationContent className="w-full">
        <PaginationItem className="mr-auto">
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>10</PaginationLink>
        </PaginationItem>
        <PaginationItem className="ml-auto">
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    )}
  </nav>
)
Pagination.displayName = "Pagination"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
