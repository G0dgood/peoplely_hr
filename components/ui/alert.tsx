import * as React from "react"
import { FaTimes, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from "react-icons/fa"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'error' | 'success' | 'info';
  onClose?: () => void;
  dismissible?: boolean;
}

export function Alert({ className = '', variant = 'info', children, onClose, dismissible, ...props }: AlertProps) {
  const variants = {
    error: "bg-error/10 text-error",
    success: "bg-primary/10 text-primary",
    info: "bg-blue-500/10 text-blue-500",
  }

  const icons = {
    error: <FaExclamationTriangle className="text-xl shrink-0" />,
    success: <FaCheckCircle className="text-xl shrink-0" />,
    info: <FaInfoCircle className="text-xl shrink-0" />,
  }

  return (
    <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl ${variants[variant]} ${className}`} role="alert" {...props}>
      {icons[variant]}
      <div className="flex-1 text-body-md font-medium">
        {children}
      </div>
      {(onClose || dismissible) && (
        <button onClick={onClose} className="p-1 hover:opacity-70 transition-opacity shrink-0 text-gray-900 dark:text-white">
          <FaTimes />
        </button>
      )}
    </div>
  )
}
