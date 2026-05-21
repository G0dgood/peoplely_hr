import * as React from "react";
import { HiOutlineEye, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

export interface TableActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function TableActions({ onView, onEdit, onDelete, className = "" }: TableActionsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {onView && (
        <button 
          onClick={onView}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <HiOutlineEye className="text-lg" />
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <HiOutlinePencilSquare className="text-lg" />
        </button>
      )}
      {onDelete && (
        <button 
          onClick={onDelete}
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <HiOutlineTrash className="text-lg" />
        </button>
      )}
    </div>
  );
}
