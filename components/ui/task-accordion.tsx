"use client"

import * as React from "react"
import { useState } from "react"
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from "react-icons/fa"

export interface TaskDetailProps {
  title: string;
  status: 'draft' | 'ongoing' | 'completed';
  assigneeRole: string;
  dueDateOffset: string;
  description: string;
  className?: string;
}

export function TaskAccordionItem({
  title,
  status,
  assigneeRole,
  dueDateOffset,
  description,
  className = ''
}: TaskDetailProps) {
  const [isOpen, setIsOpen] = useState(false)

  const statusStyles = {
    draft: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
    ongoing: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
    completed: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
  }

  const statusLabels = {
    draft: "DRAFT",
    ongoing: "ONGOING",
    completed: "COMPLETED"
  }

  return (
    <div className={`w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl shadow-sm transition-all duration-200 overflow-hidden ${className}`}>
      
      {/* Header Row */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors select-none"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white shrink-0">
            {isOpen ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
          </span>
          <span className="font-semibold text-body-sm sm:text-body-md text-gray-900 dark:text-white truncate">
            {title}
          </span>
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${statusStyles[status]}`}>
            {statusLabels[status]}
          </span>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <FaEdit className="text-xs" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors">
            <FaTrash className="text-xs" />
          </button>
        </div>
      </div>

      {/* Expanded Content Grid */}
      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-gray-50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-gray-900 flex flex-col gap-4 text-body-sm text-gray-600 dark:text-gray-400">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            
            <div className="flex flex-col gap-1">
              <span className="text-body-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Task Name</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{title}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-body-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Assignee</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{assigneeRole}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-body-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Due Date</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{dueDateOffset}</span>
            </div>

          </div>

          <div className="flex flex-col gap-1 pt-1">
            <span className="text-body-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Description</span>
            <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              {description}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
