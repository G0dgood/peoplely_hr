import * as React from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Button } from "./button"

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  onSelect?: (date: Date) => void;
  selectedDate?: Date;
  onClose?: () => void;
}

export function Calendar({ className = '', onSelect, selectedDate, onClose, ...props }: CalendarProps) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Previous month days (grayed out)
  const prevMonthDays = [29, 30, 31];
  // Current month days
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  // Next month days (grayed out)
  const nextMonthDays = [1];

  return (
    <div className={`w-80 bg-white dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 shadow-xl p-4 flex flex-col gap-4 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <button className="p-2 text-gray-400 hover:text-gray-950 dark:hover:text-white"><FaChevronLeft /></button>
        <span className="font-bold text-gray-900 dark:text-white">January 2023</span>
        <button className="p-2 text-gray-400 hover:text-gray-950 dark:hover:text-white"><FaChevronRight /></button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {prevMonthDays.map((day) => (
          <div key={`prev-${day}`} className="h-9 w-9 flex items-center justify-center text-gray-300 dark:text-gray-700 cursor-not-allowed">
            {day}
          </div>
        ))}

        {currentMonthDays.map((day) => {
          const isSelected = day === 15;
          return (
            <button
              key={`curr-${day}`}
              onClick={() => onSelect && onSelect(new Date(2023, 0, day))}
              className={`h-9 w-9 flex items-center justify-center rounded-lg font-medium transition-colors ${
                isSelected 
                  ? "bg-primary text-white font-bold" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {day}
            </button>
          )
        })}

        {nextMonthDays.map((day) => (
          <div key={`next-${day}`} className="h-9 w-9 flex items-center justify-center text-gray-300 dark:text-gray-700 cursor-not-allowed">
            {day}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-gray-300 dark:border-gray-800 pt-3 mt-1">
        <Button variant="outline" size="sm" className="flex-1 justify-center py-2 h-9 text-xs" onClick={onClose}>Cancel</Button>
        <Button variant="primary" size="sm" className="flex-1 justify-center py-2 h-9 text-xs" onClick={onClose}>Save</Button>
      </div>
    </div>
  )
}
