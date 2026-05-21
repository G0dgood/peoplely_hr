"use client";

import * as React from "react"
import { motion } from "framer-motion"

const Tabs = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`flex border-b border-gray-300 dark:border-gray-800 ${className}`} {...props} />
  )
)
Tabs.displayName = "Tabs"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className = '', active = false, children, ...props }, ref) => (
    <button
      ref={ref}
      className={`
        relative px-6 py-3 font-bold text-body-md transition-colors border-b-2 -mb-[2px] border-transparent
        ${active 
          ? 'text-primary' 
          : 'text-gray-500 hover:text-gray-900 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:border-gray-700'
        }
        ${className}
      `}
      {...props}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeTabUnderline"
          className="absolute left-0 right-0 bottom-[-2px] h-[2px] bg-primary z-10"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  )
)
TabsTrigger.displayName = "TabsTrigger"

export { Tabs, TabsTrigger }
