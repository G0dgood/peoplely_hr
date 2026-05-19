import * as React from "react"

const Tabs = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`flex border-b border-gray-200 dark:border-gray-800 ${className}`} {...props} />
  )
)
Tabs.displayName = "Tabs"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className = '', active = false, ...props }, ref) => (
    <button
      ref={ref}
      className={`
        px-6 py-3 font-bold text-body-md transition-all border-b-2 -mb-[2px]
        ${active 
          ? 'border-primary text-primary' 
          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:border-gray-700'
        }
        ${className}
      `}
      {...props}
    />
  )
)
TabsTrigger.displayName = "TabsTrigger"

export { Tabs, TabsTrigger }
