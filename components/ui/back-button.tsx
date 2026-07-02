import * as React from "react";
import { useRouter } from "next/navigation";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export interface BackButtonProps {
  onClick?: () => void;
  href?: string;
  label?: string;
  className?: string;
}

export function BackButton({ onClick, href, label = "Back", className = "" }: BackButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`h-10 px-4 border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-bold text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 cursor-pointer shadow-xs ${className}`}
    >
      <HiOutlineArrowLeft />
      <span>{label}</span>
    </button>
  );
}
