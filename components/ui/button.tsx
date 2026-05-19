import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', leftIcon, rightIcon, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus:ring-gray-900 dark:focus:ring-white dark:focus:ring-offset-gray-900",
      outline: "border border-gray-200 bg-transparent text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 focus:ring-gray-200 dark:focus:ring-offset-gray-900",
      ghost: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 focus:ring-gray-100 dark:focus:ring-offset-gray-900",
      danger: "bg-error text-white hover:bg-red-600 focus:ring-error dark:focus:ring-offset-gray-900",
    };

    const sizes = {
      sm: "h-10 px-4 text-body-sm",
      md: "h-12 px-6 text-body-md",
      lg: "h-14 px-8 text-body-lg",
    };

    const variantStyles = variants[variant];
    const sizeStyles = sizes[size];

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = "Button";
