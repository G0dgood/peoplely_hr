import * as React from "react"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import Link from "next/link"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

export function Sidebar({ id, className = '', collapsed = false, children, ...props }: SidebarProps) {
  return (
    <aside
      id={id}
      className={`flex flex-col overflow-hidden transition-all duration-300 ${collapsed ? 'w-[80px]' : 'w-[280px]'} ${className}`}
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
  iconPosition?: 'left' | 'right';
  href?: string;
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className = '', icon, active, badge, hasSubmenu, expanded, iconPosition = 'left', href, children, ...props }, ref) => {
    const content = (
      <>
        <div className={`flex items-center gap-3 ${iconPosition === 'right' ? 'flex-row-reverse justify-between w-full' : ''}`}>
          {icon && <span className={`text-xl ${active ? 'text-white' : 'text-gray-500 dark:text-gray-300'}`}>{icon}</span>}
          <span className={active ? 'text-white' : 'dark:text-gray-300'}>{children}</span>
        </div>
        {(badge !== undefined || hasSubmenu) && iconPosition === 'left' && (
          <div className="flex items-center gap-2">
            {badge !== undefined && badge > 0 && (
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${active ? 'bg-white text-primary' : 'bg-[#E53E3E] text-white'}`}>
                {badge}
              </span>
            )}
            {hasSubmenu && (
              <span className={`text-xs transition-transform ${expanded ? 'rotate-180' : ''} ${active ? 'text-white' : 'text-gray-500 dark:text-gray-300'}`}>
                <BsChevronDown />
              </span>
            )}
          </div>
        )}
      </>
    );

    const classes = `w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all ${active
      ? 'bg-primary text-white shadow-lg shadow-primary/20'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
      } ${className}`;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {content}
      </button>
    )
  }
)
SidebarItem.displayName = "SidebarItem"

interface SidebarSubItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  isLast?: boolean;
  href?: string;
}

export const SidebarSubItem = React.forwardRef<HTMLButtonElement, SidebarSubItemProps>(
  ({ className = '', active, isLast, href, children, ...props }, ref) => {
    const classes = `ml-10 w-full flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all ${active
      ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
      } ${className}`;

    return (
      <div className="relative flex items-center group h-11">
        {/* Vertical line connector */}
        <div className={`absolute left-[26px] top-0 w-[1px] bg-gray-200 dark:bg-gray-800 ${isLast ? 'h-[22px]' : 'h-full'}`} />

        {/* Horizontal elbow connector */}
        <div className="absolute left-[26px] top-[22px] w-[14px] h-[1px] bg-gray-200 dark:bg-gray-800" />

        {href ? (
          <Link href={href} className={classes}>
            {children}
          </Link>
        ) : (
          <button
            ref={ref}
            className={classes}
            {...props}
          >
            {children}
          </button>
        )}
      </div>
    )
  }
)
SidebarSubItem.displayName = "SidebarSubItem"

export function SidebarGroup({ title, children }: { title?: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 px-4 mb-6">
      {title && <h4 className="px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</h4>}
      {children}
    </div>
  )
}
