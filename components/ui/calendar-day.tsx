import * as React from "react";

export interface CalendarDayProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "hasDot" | "selected" | "disabled" | "secondary" | "rangeStart" | "rangeEnd";
  day: number | string;
}

export function CalendarDay({
  variant = "default",
  day,
  className = "",
  disabled,
  ...props
}: CalendarDayProps) {
  const baseStyles = "w-10 h-10 flex items-center justify-center rounded-lg text-body-md font-medium transition-colors focus:outline-none";

  const variants = {
    default: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
    hasDot: "text-gray-900 dark:text-white relative hover:bg-gray-100 dark:hover:bg-gray-800",
    selected: "font-semibold bg-primary text-white",
    disabled: "text-gray-300 dark:text-gray-600 cursor-not-allowed",
    secondary: "bg-primary/10 text-primary hover:bg-primary/20",
    rangeStart: "text-primary hover:bg-primary/5 rounded-r-none",
    rangeEnd: "text-primary border-l border-primary/20 hover:bg-primary/5 rounded-l-none",
  };

  const isSelectedOrDisabled = variant === "selected" || variant === "disabled";

  return (
    <button
      disabled={variant === "disabled" || disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      <span>{day}</span>
      {variant === "hasDot" && (
        <span className="absolute bottom-1 w-1.5 h-1.5 bg-primary rounded-full"></span>
      )}
    </button>
  );
}

interface CalendarDayRangeProps {
  startDay: number | string;
  endDay: number | string;
  onClickStart?: () => void;
  onClickEnd?: () => void;
  className?: string;
}

export function CalendarDayRange({
  startDay,
  endDay,
  onClickStart,
  onClickEnd,
  className = "",
}: CalendarDayRangeProps) {
  return (
    <div className={`flex bg-primary/10 rounded-lg overflow-hidden ${className}`}>
      <CalendarDay variant="rangeStart" day={startDay} onClick={onClickStart} />
      <CalendarDay variant="rangeEnd" day={endDay} onClick={onClickEnd} />
    </div>
  );
}
