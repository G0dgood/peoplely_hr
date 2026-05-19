import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray' | 'outline';
  tinted?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'primary', tinted = false, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-colors focus:outline-none";
    
    let variantStyles = "";
    
    if (tinted) {
      const tintedVariants = {
        primary: "bg-primary/10 text-primary dark:bg-primary/20",
        secondary: "bg-secondary/10 text-yellow-700 dark:text-secondary dark:bg-secondary/20",
        success: "bg-success/10 text-success dark:bg-success/20",
        warning: "bg-warning/10 text-yellow-700 dark:text-warning dark:bg-warning/20",
        error: "bg-error/10 text-error dark:bg-error/20",
        gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
        outline: "text-foreground", 
      };
      variantStyles = tintedVariants[variant] || tintedVariants.primary;
    } else {
      const solidVariants = {
        primary: "border-transparent bg-primary text-white",
        secondary: "border-transparent bg-secondary text-black", 
        success: "border-transparent bg-success text-white",
        warning: "border-transparent bg-warning text-black",
        error: "border-transparent bg-error text-white",
        gray: "border-transparent bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white",
        outline: "text-gray-900 border border-gray-200 dark:border-gray-700 dark:text-white",
      };
      variantStyles = solidVariants[variant] || solidVariants.primary;
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = "Badge"
