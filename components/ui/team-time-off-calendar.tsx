"use client";

import * as React from "react";
import { 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight,
  HiOutlineCalendarDays
} from "react-icons/hi2";

export function TeamTimeOffCalendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Generate Calendar Days logic
  const getCalendarDays = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday
    
    const calendarDays = [];
    
    // Previous month padding
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      calendarDays.push({ day: lastDayOfPrevMonth - i, isCurrentMonth: false, isToday: false });
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = year === today.getFullYear() && month === today.getMonth() && i === today.getDate();
      calendarDays.push({ day: i, isCurrentMonth: true, isToday });
    }
    
    // Next month padding
    // ensure we fill either 5 or 6 rows (35 or 42 cells)
    const totalCells = calendarDays.length <= 35 ? 35 : 42;
    const remainingCells = totalCells - calendarDays.length; 
    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push({ day: i, isCurrentMonth: false, isToday: false });
    }
    
    return calendarDays;
  };

  const calendarDays = React.useMemo(() => {
    return getCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  return (
    <div className="flex flex-col gap-6">
      {/* Month Selector */}
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={prevMonth} 
            className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500 transition-colors"
          >
            <HiOutlineChevronLeft className="text-lg" />
          </button>
          <span className="text-sm font-bold text-gray-900 dark:text-white w-32 text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button 
            onClick={nextMonth} 
            className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500 transition-colors"
          >
            <HiOutlineChevronRight className="text-lg" />
          </button>
        </div>
        <HiOutlineCalendarDays className="text-gray-400 text-lg" />
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-gray-300 dark:border-gray-700">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-4 text-center text-xs font-bold text-gray-400 dark:text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Cells */}
        <div className="grid grid-cols-7">
          {calendarDays.map((date, index) => (
            <div 
              key={index} 
              className={`min-h-[120px] p-4 border-r border-b border-gray-300 dark:border-gray-700 last:border-r-0 flex flex-col items-end transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/30 ${
                !date.isCurrentMonth ? "bg-gray-50/20 dark:bg-gray-800/10" : date.isToday ? "bg-[#E8FAF4] dark:bg-[#0FAF7A]/10" : ""
              }`}
            >
              <span className={`text-xs font-bold ${
                date.isCurrentMonth 
                  ? "text-gray-900 dark:text-white" 
                  : "text-gray-300 dark:text-gray-600"
              }`}>
                {date.day}
              </span>
              
              {/* Event placeholders could go here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
