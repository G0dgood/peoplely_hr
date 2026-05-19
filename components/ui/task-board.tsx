"use client"

import * as React from "react"
import { useState } from "react"
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash, FaCalendarAlt, FaPlus, FaCheck } from "react-icons/fa"
import { Avatar } from "./avatar"

export interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  assignee: { name: string; avatar: string };
  completed: boolean;
}

export interface TaskBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  employeeName: string;
  role: string;
  joinDate: string;
  avatar: string;
  progressPercent: number;
  tasks: TaskItem[];
  defaultExpanded?: boolean;
}

export function TaskBoard({
  className = '',
  employeeName,
  role,
  joinDate,
  avatar,
  progressPercent,
  tasks,
  defaultExpanded = false,
  ...props
}: TaskBoardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length

  return (
    <div className={`w-full bg-white dark:bg-[#11131A] border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden transition-all duration-300 ${className}`} {...props}>
      {/* Header bar */}
      <div className="flex items-center justify-between p-6 flex-wrap gap-4 border-b border-gray-50 dark:border-gray-800/50">
        <div className="flex items-center gap-4">
          <Avatar src={avatar} size="md" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 dark:text-white text-body-lg">{employeeName}</span>
            <span className="text-body-sm text-gray-400 dark:text-gray-500 font-medium">{role} • {joinDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-wrap sm:flex-nowrap">
          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div className="w-28 bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-error h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-body-xs font-bold text-gray-500 dark:text-gray-400">
              {progressPercent}% <span className="font-medium text-gray-400">({completedCount}/{totalCount} done)</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary/95 transition-colors">
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Task list */}
      {isExpanded && (
        <div className="p-6 bg-white dark:bg-[#11131A] transition-all duration-300">
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 text-body-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <th className="pb-4 pt-2 font-semibold">Task</th>
                  <th className="pb-4 pt-2 font-semibold">Due Date</th>
                  <th className="pb-4 pt-2 font-semibold">Assignee</th>
                  <th className="pb-4 pt-2 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 border ${
                          task.completed 
                            ? "bg-primary/10 border-primary/20 text-primary" 
                            : "border-gray-200 dark:border-gray-700 text-transparent"
                        }`}>
                          <FaCheck className="text-[10px]" />
                        </span>
                        <span className={`text-body-sm font-medium ${task.completed ? "text-gray-400 line-through dark:text-gray-500" : "text-gray-900 dark:text-white"}`}>
                          {task.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2 text-body-sm text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="text-gray-400 shrink-0" />
                        <span>{task.dueDate}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Avatar src={task.assignee.avatar} size="sm" />
                        <span className="text-body-sm font-medium text-gray-700 dark:text-gray-300">{task.assignee.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                          <FaEdit />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Card list View */}
          <div className="flex flex-col gap-4 md:hidden">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800/80 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 border ${
                      task.completed 
                        ? "bg-primary/10 border-primary/20 text-primary" 
                        : "border-gray-200 dark:border-gray-700 text-transparent"
                    }`}>
                      <FaCheck className="text-[10px]" />
                    </span>
                    <span className={`text-body-sm font-bold ${task.completed ? "text-gray-400 line-through dark:text-gray-500" : "text-gray-900 dark:text-white"}`}>
                      {task.title}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Avatar src={task.assignee.avatar} size="sm" />
                    <span className="text-body-xs font-semibold text-gray-500 dark:text-gray-400">{task.assignee.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-xs text-gray-400 dark:text-gray-500">
                    <FaCalendarAlt />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  )
}
