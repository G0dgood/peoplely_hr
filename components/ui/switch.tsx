import * as React from "react"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = '', icon, ...props }, ref) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" ref={ref} {...props} />
        <div className={`w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-primary ${className}`}>
          {icon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-[10px] text-gray-400 peer-checked:text-white peer-checked:left-0 peer-checked:pl-2 peer-checked:pr-0 pointer-events-none transition-all">
              {icon}
            </div>
          )}
        </div>
      </label>
    )
  }
)
Switch.displayName = "Switch"
