import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', containerClassName = '', label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    
    return (
      <div className={`w-full flex flex-col gap-2 ${containerClassName}`}>
        {label && (
          <label htmlFor={inputId} className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
            {label}
            {props.required && <span className="text-error">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`
              w-full h-12 rounded-xl text-body-md bg-white border outline-none transition-colors
              dark:bg-gray-800 dark:text-white
              placeholder:text-gray-400
              ${leftIcon ? 'pl-11' : 'pl-4'}
              ${rightIcon ? 'pr-11' : 'pr-4'}
              ${error 
                ? 'border-error focus:border-error focus:ring-1 focus:ring-error' 
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary'
              }
              ${props.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900' : ''}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center cursor-pointer">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-body-xs text-error flex items-center gap-1 mt-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 3.5V6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 8.5H6.005" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input";
