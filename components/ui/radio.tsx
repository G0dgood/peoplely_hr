import * as React from "react"

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div className={`relative flex items-center justify-center w-5 h-5 ${className}`}>
        <input 
          type="radio" 
          className="peer appearance-none w-5 h-5 border-2 border-gray-300 bg-white rounded-full checked:border-primary transition-colors cursor-pointer dark:bg-gray-900 dark:border-gray-700 dark:checked:border-primary"
          ref={ref} 
          {...props} 
        />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-primary pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
    )
  }
)
Radio.displayName = "Radio"
