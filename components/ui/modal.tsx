import * as React from "react"
import { FaTimes } from "react-icons/fa"

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void;
  position?: 'center' | 'right';
  showBackdrop?: boolean;
}

export function Modal({ className = '', children, isOpen = false, onClose, position = 'center', showBackdrop = true, ...props }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex ${showBackdrop ? 'bg-gray-900/40 backdrop-blur-sm' : 'pointer-events-none'}`}>
      <div 
        className={`bg-white dark:bg-[#11131A] shadow-2xl flex flex-col pointer-events-auto ${
          position === 'right' 
            ? 'ml-auto h-full w-full max-w-md sm:rounded-l-3xl' 
            : 'm-auto w-full max-w-lg rounded-3xl max-h-[90vh]'
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

export function ModalHeader({ className = '', children, onClose, ...props }: React.HTMLAttributes<HTMLDivElement> & { onClose?: () => void }) {
  return (
    <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 ${className}`} {...props}>
      <div className="flex-1">{children}</div>
      {onClose && (
        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <FaTimes />
        </button>
      )}
    </div>
  )
}

export function ModalTitle({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={`text-lg font-bold text-gray-900 dark:text-white ${className}`} {...props} />
}

export function ModalContent({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex-1 overflow-y-auto p-6 ${className}`} {...props} />
}

export function ModalFooter({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 mt-auto ${className}`} {...props} />
  )
}
