"use client";

import * as React from "react";
import { 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight,
  HiOutlineCalendarDays
} from "react-icons/hi2";
import { TimeOffRequest } from "@/store/services/timeOffApi";

export function TeamTimeOffCalendar({ requests = [] }: { requests?: TimeOffRequest[] }) {
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
    const prevMonthDate = new Date(year, month - 1, 1);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const d = lastDayOfPrevMonth - i;
      calendarDays.push({ 
        day: d, 
        isCurrentMonth: false, 
        isToday: false,
        date: new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), d)
      });
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = year === today.getFullYear() && month === today.getMonth() && i === today.getDate();
      calendarDays.push({ 
        day: i, 
        isCurrentMonth: true, 
        isToday,
        date: new Date(year, month, i)
      });
    }
    
    // Next month padding
    const nextMonthDate = new Date(year, month + 1, 1);
    const totalCells = calendarDays.length <= 35 ? 35 : 42;
    const remainingCells = totalCells - calendarDays.length; 
    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push({ 
        day: i, 
        isCurrentMonth: false, 
        isToday: false,
        date: new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), i)
      });
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
          {calendarDays.map((date, index) => {
            const dayRequests = requests.filter(req => {
              const start = new Date(req.startDate);
              start.setHours(0,0,0,0);
              const end = new Date(req.endDate);
              end.setHours(23,59,59,999);
              
              const cellStart = new Date(date.date);
              cellStart.setHours(0,0,0,0);
              
              return cellStart >= start && cellStart <= end;
            });

            return (
              <div 
                key={index} 
                className={`min-h-[120px] p-2 border-r border-b border-gray-300 dark:border-gray-700 last:border-r-0 flex flex-col items-end transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/30 ${
                  !date.isCurrentMonth ? "bg-gray-50/20 dark:bg-gray-800/10" : date.isToday ? "bg-[#E8FAF4] dark:bg-[#0FAF7A]/10" : ""
                }`}
              >
                <span className={`text-xs font-bold mb-1 ${
                  date.isCurrentMonth 
                    ? "text-gray-900 dark:text-white" 
                    : "text-gray-300 dark:text-gray-600"
                }`}>
                  {date.day}
                </span>
                
                <div className="w-full flex flex-col gap-1 overflow-y-auto max-h-[80px] no-scrollbar">
                  {dayRequests.map((req) => (
                    <div 
                      key={req.id} 
                      style={{ 
                        backgroundColor: (req.policy?.color || "#0FAF7A") + "15", 
                        borderLeft: `3px solid ${req.policy?.color || "#0FAF7A"}` 
                      }}
                      className="px-1.5 py-0.5 rounded text-[9px] font-bold text-gray-750 dark:text-gray-300 truncate w-full text-left"
                      title={`${(req as any).user?.name} - ${req.policy?.name}`}
                    >
                      {(req as any).user?.name || "User"}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
