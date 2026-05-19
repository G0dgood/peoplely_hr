import * as React from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className = '', children, ...props }: SidebarProps) {
  return (
    <aside
      className={`flex flex-col w-64 h-full border-r border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 ${className}`}
      {...props}
    >
      {children}
    </aside>
  )
}

interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
  badge?: number;
  hasSubmenu?: boolean;
  expanded?: boolean;
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className = '', icon, active, badge, hasSubmenu, expanded, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-2xl transition-colors ${
          active
            ? 'bg-primary text-white dark:bg-primary'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
        } ${className}`}
        {...props}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-lg">{icon}</span>}
          <span>{children}</span>
        </div>
        <div className="flex items-center gap-2">
          {badge !== undefined && badge > 0 && (
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${active ? 'bg-white text-primary' : 'bg-error text-white'}`}>
              {badge}
            </span>
          )}
          {hasSubmenu && (
            <span className={`text-xs transition-transform ${expanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          )}
        </div>
      </button>
    )
  }
)
SidebarItem.displayName = "SidebarItem"

export function SidebarGroup({ title, children }: { title?: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 px-4 mb-6">
      {title && <h4 className="px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</h4>}
      {children}
    </div>
  )
}
