"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HiOutlineDocumentArrowUp, HiOutlineChevronRight } from "react-icons/hi2";
import { TimeOffRequest } from "@/store/services/timeOffApi";

interface TimeOffDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  request: TimeOffRequest | null;
  onCancelRequest?: (id: string) => void;
  isCancelling?: boolean;
}

export function TimeOffDrawer({ isOpen, onClose, request, onCancelRequest, isCancelling }: TimeOffDrawerProps) {
  if (!isOpen) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/20 "
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col">
        {/* Dismiss slide button (vertically centered on the left border of the drawer panel) */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
          >
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </div>
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Detail Time Off
            </h2>
            <Badge 
              variant={request?.status === "APPROVED" ? "success" : request?.status === "PENDING" ? "warning" : "error"} 
              tinted 
              className="text-[10px] uppercase tracking-wider px-2 py-0.5"
            >
              {request?.status || "PENDING"}
            </Badge>
          </div>

          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">From</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{formatDate(request?.startDate)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">To</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{formatDate(request?.endDate)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total</span>
              <span className="text-xs font-bold text-gray-900 dark:text-white">{request?.totalDays ? `${request.totalDays} Days` : "-"}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Type</span>
              <span className="text-xs font-bold text-gray-900 dark:text-white">{request?.policy?.name || "-"}</span>
            </div>

            {request?.reason && (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reason / Notes</span>
                <span className="text-xs font-medium text-gray-750 dark:text-gray-300">{request.reason}</span>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Attachment</span>
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-gray-900 dark:text-white">{request?.attachment || "No attachment"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-gray-300 dark:border-gray-800 flex items-center gap-4">
          {request?.status === "PENDING" && onCancelRequest && (
            <Button
              variant="outline"
              className="flex-1 font-bold h-12 text-red-500 hover:text-red-650 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={() => onCancelRequest(request.id)}
              disabled={isCancelling}
            >
              Cancel Request
            </Button>
          )}
          <Button 
            variant="primary" 
            className="flex-1 font-bold h-12"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
