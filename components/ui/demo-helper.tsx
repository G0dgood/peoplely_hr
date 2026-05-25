import * as React from "react";

interface DemoHelperProps {
  className?: string;
}

export function DemoHelper({ className = "" }: DemoHelperProps) {
  return (
    <div className={`bg-gray-50 border border-gray-300 rounded-xl p-3 flex flex-col gap-1 text-[11px] text-gray-550 ${className}`}>
      <span className="font-bold text-gray-700">Quick Test Inputs:</span>
      <span>
        Type <strong className="text-primary select-all">pristia@gmail.com</strong> for a valid state mockup.
      </span>
      <span>
        Type <strong className="text-error select-all">duarte@gmail.com</strong> for an error state mockup.
      </span>
    </div>
  );
}
