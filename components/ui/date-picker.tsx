"use client";

import * as React from "react";
import { 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (range: string) => void;
  anchorRef?: React.RefObject<HTMLElement>;
}

export function DatePicker({ isOpen, onClose, onSave }: DatePickerProps) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [rangeStart, setRangeStart] = React.useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentMonth(new Date());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // First day of current month
  const firstDayOfMonth = new Date(year, month, 1);
  
  // Day of the week of first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  let dayOfWeek = firstDayOfMonth.getDay();
  // Adjust to Mon=1, Tue=2, ..., Sun=7
  if (dayOfWeek === 0) dayOfWeek = 7;
  
  const prevMonthDaysCount = dayOfWeek - 1;
  const days: { date: Date; isCurrentMonth: boolean }[] = [];
  
  // Add previous month's trailing days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = prevMonthDaysCount - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false
    });
  }
  
  // Add current month's days
  const currentMonthDaysCount = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= currentMonthDaysCount; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  // Add next month's leading days to complete the 6-week grid (42 cells)
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDayClick = (date: Date) => {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(clickedDate);
      setRangeEnd(null);
    } else {
      if (clickedDate < rangeStart) {
        setRangeStart(clickedDate);
      } else {
        setRangeEnd(clickedDate);
      }
    }
  };

  const isSelected = (date: Date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (rangeStart && d.getTime() === rangeStart.getTime()) return true;
    if (rangeEnd && d.getTime() === rangeEnd.getTime()) return true;
    return false;
  };

  const isInRange = (date: Date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (!rangeStart || !rangeEnd) return false;
    return d > rangeStart && d < rangeEnd;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const headerLabel = `${monthNames[month]} ${year}`;

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const m = months[date.getMonth()];
    const y = date.getFullYear();
    return `${day} ${m} ${y}`;
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!rangeStart) return;
    
    let result = formatDate(rangeStart);
    if (rangeEnd) {
      result = `${result} - ${formatDate(rangeEnd)}`;
    }
    
    onSave?.(result);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 mt-2 z-50">
      <div 
        className="fixed inset-0 bg-transparent" 
        onClick={onClose}
      />
      <div className="relative w-[320px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden p-6">
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Set Date</h3>
          
          <div className="flex flex-col gap-4">
            {/* Month/Year Header */}
            <div className="flex items-center justify-between">
              <button 
                type="button"
                onClick={handlePrevMonth}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <HiOutlineChevronLeft className="text-lg" />
              </button>
              <span className="text-sm font-bold text-gray-900 dark:text-white text-center">{headerLabel}</span>
              <button 
                type="button"
                onClick={handleNextMonth}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <HiOutlineChevronRight className="text-lg" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div>
              <div className="grid grid-cols-7 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-[10px] font-bold text-gray-300 dark:text-gray-600 text-center py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {days.map((item, index) => {
                  const date = item.date;
                  const isSel = isSelected(date);
                  const inRange = isInRange(date);
                  
                  let cellClass = "relative h-8 flex items-center justify-center text-xs font-bold transition-all cursor-pointer ";
                  
                  if (isSel) {
                    cellClass += "bg-primary text-white rounded-lg z-10 ";
                  } else if (inRange) {
                    cellClass += "bg-primary/10 text-primary ";
                  } else if (!item.isCurrentMonth) {
                    cellClass += "text-gray-200 dark:text-gray-700 ";
                  } else {
                    cellClass += "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg ";
                  }

                  return (
                    <div 
                      key={index} 
                      className={cellClass}
                      onClick={() => handleDayClick(date)}
                    >
                      {date.getDate()}
                      {inRange && !isSel && (
                        <div className="absolute inset-0 bg-primary/10 -z-10" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-3">
            <Button 
              type="button"
              variant="outline" 
              className="flex-1 h-10 text-xs font-bold"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              variant="primary" 
              className="flex-1 h-10 text-xs font-bold"
              disabled={!rangeStart}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
