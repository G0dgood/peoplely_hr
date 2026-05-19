import * as React from "react"

export interface TreeConnectorProps extends React.SVGProps<SVGSVGElement> {
  type: "L" | "T" | "I" | "dash" | "corner-top";
  className?: string;
}

export function TreeConnector({
  type,
  className = "",
  ...props
}: TreeConnectorProps) {
  // Common style: stroke-2, rounded joints, matching the light/dark gray borders of the system.
  const strokeColor = "stroke-gray-200 dark:stroke-gray-800"

  switch (type) {
    case "L":
      // Vertical line from top to center, then horizontal line to right.
      return (
        <svg
          className={`w-6 h-10 shrink-0 ${strokeColor} ${className}`}
          viewBox="0 0 24 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M12 0V20C12 22 14 24 16 24H24"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )

    case "T":
      // Vertical line all the way top-to-bottom, horizontal line from center to right.
      return (
        <svg
          className={`w-6 h-10 shrink-0 ${strokeColor} ${className}`}
          viewBox="0 0 24 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M12 0V40M12 20C12 22 14 24 16 24H24"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )

    case "I":
      // Straight vertical line top-to-bottom.
      return (
        <svg
          className={`w-6 h-10 shrink-0 ${strokeColor} ${className}`}
          viewBox="0 0 24 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path d="M12 0V40" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case "dash":
      // Horizontal dashed line from center to right.
      return (
        <svg
          className={`w-6 h-10 shrink-0 ${strokeColor} ${className}`}
          viewBox="0 0 24 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path d="M12 20H24" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
        </svg>
      )

    case "corner-top":
      // Vertical line from bottom to center, then horizontal line to right.
      return (
        <svg
          className={`w-6 h-10 shrink-0 ${strokeColor} ${className}`}
          viewBox="0 0 24 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M12 40V20C12 18 14 16 16 16H24"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )

    default:
      return null
  }
}
