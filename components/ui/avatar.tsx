import * as React from "react"
import Image from "next/image"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = '', src, alt, fallback, size = 'md', ...props }, ref) => {
    
    const sizes = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base",
      xl: "w-16 h-16 text-lg",
    };

    return (
      <div
        ref={ref}
        className={`relative flex shrink-0 overflow-hidden rounded-full bg-gray-100 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 ${sizes[size]} ${className}`}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-bold text-gray-600 dark:text-gray-300">
            {fallback}
          </span>
        )}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"
