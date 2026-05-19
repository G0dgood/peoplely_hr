import * as React from "react"
import { FaEllipsisH } from "react-icons/fa"
import { Button } from "./button"

export interface NotificationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}

export function NotificationItem({ 
  className = '', 
  icon, 
  iconBg = "bg-gray-100 dark:bg-gray-800 text-gray-500", 
  title, 
  description, 
  time, 
  unread = false, 
  ...props 
}: NotificationItemProps) {
  return (
    <div className={`flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors ${className}`} {...props}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline gap-2 mb-1">
          <span className="font-bold text-body-md text-gray-900 dark:text-white truncate">{title}</span>
          <span className="text-body-xs text-gray-400 dark:text-gray-500 shrink-0">{time}</span>
        </div>
        <p className="text-body-sm text-gray-500 dark:text-gray-400 line-clamp-1">{description}</p>
      </div>
      {unread && (
        <span className="w-2.5 h-2.5 bg-error rounded-full shrink-0 mt-2"></span>
      )}
    </div>
  )
}

export interface NotificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  onShowAll?: () => void;
  showAllText?: string;
}

export function NotificationCard({ 
  className = '', 
  title = "Notification", 
  children, 
  onShowAll, 
  showAllText = "Show All Notification", 
  ...props 
}: NotificationCardProps) {
  return (
    <div className={`w-full max-w-md bg-white dark:bg-[#11131A] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden p-6 flex flex-col gap-6 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
        {children}
      </div>

      <Button 
        onClick={onShowAll} 
        variant="primary" 
        className="w-full justify-center py-3 bg-[#11131A] hover:bg-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
      >
        {showAllText}
      </Button>
    </div>
  )
}
