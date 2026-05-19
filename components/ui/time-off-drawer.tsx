"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";

interface TimeOffRequest {
  from: string;
  to: string;
  total: string;
  type: string;
  attachment: string;
  status: string;
}

interface TimeOffDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  request: TimeOffRequest | null;
}

export function TimeOffDrawer({ isOpen, onClose, request }: TimeOffDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col">
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Detail Time Off
            </h2>
            <Badge variant="warning" tinted className="text-[10px] uppercase tracking-wider px-2 py-0.5">
              PENDING
            </Badge>
          </div>

          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">From</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{request?.from || "01 Mar 2023"}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">To</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{request?.to || "01 Jan 2023"}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total</span>
              <span className="text-xs font-bold text-gray-900 dark:text-white">{request?.total || "3 Days"}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Type</span>
              <span className="text-xs font-bold text-gray-900 dark:text-white">{request?.type || "Engagement"}</span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Attachment</span>
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-gray-900 dark:text-white">-</span>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">Upload attachment</span>
                  <HiOutlineDocumentArrowUp className="text-gray-400 dark:text-gray-500 text-xl" />
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">
                  Max file size : 5MB. File format : pdf, docx, png, and jpeg
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <Button
            variant="outline"
            className="flex-1 font-bold h-12"
            onClick={onClose}
          >
            Cancel Request
          </Button>
          <Button variant="primary" className="flex-1 font-bold h-12">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
