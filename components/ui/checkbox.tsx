import * as React from "react"
import { FaCheck } from "react-icons/fa"

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div className={`relative flex items-center justify-center w-5 h-5 ${className}`}>
        <input
          type="checkbox"
          className="peer appearance-none w-5 h-5 border-2 border-gray-300 bg-white rounded-md checked:bg-primary checked:border-primary transition-colors cursor-pointer dark:bg-gray-900 dark:border-gray-700 dark:checked:bg-primary dark:checked:border-primary"
          ref={ref}
          {...props}
        />
        <FaCheck className="absolute text-white text-[10px] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"
