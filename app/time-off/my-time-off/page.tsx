"use client";

import * as React from "react";
import {
  HiOutlinePlus,
  HiOutlineCalendarDays,
  HiOutlineInformationCircle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineArrowPath,
  HiOutlineDocumentText,
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineChevronDown
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { TableActions } from "@/components/ui/table-actions";
import { ViewToggle } from "@/components/ui/view-toggle";
import { Pagination } from "@/components/ui/pagination";
import { TimeOffDrawer, AddTimeOffDrawer } from "@/components/ui/drawer";
import { DeleteModal } from "@/components/ui/modal/delete-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LEAVE_SUMMARY = [
  { label: "Annual", days: "3 Days" },
  { label: "Engagement", days: "3 Days" },
  { label: "Sick Leave", days: "1 Days" },
  { label: "Wedding", days: "3 Days" },
];

interface TimeOffRequest {
  id: number;
  from: string;
  to: string;
  total: string;
  type: string;
  attachment: string;
  status: string;
}

const INITIAL_REQUEST_LIST: TimeOffRequest[] = [
  { id: 1, from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "File.pdf", status: "APPROVE" },
  { id: 2, from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "File.pdf", status: "APPROVE" },
  { id: 3, from: "01 Mar 2023", to: "03 Mar 2023", total: "3 Days", type: "Engagement", attachment: "File.pdf", status: "APPROVE" },
];

export default function MyTimeOffPage() {
  const [requests, setRequests] = React.useState<TimeOffRequest[]>(INITIAL_REQUEST_LIST);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [requestToDelete, setRequestToDelete] = React.useState<number | null>(null);
  const [selectedRequest, setSelectedRequest] = React.useState<TimeOffRequest | null>(null);

  const handleViewClick = (req: TimeOffRequest) => {
    setSelectedRequest(req);
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setRequestToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (requestToDelete !== null) {
      setRequests(prev => prev.filter(req => req.id !== requestToDelete));
      setIsDeleteModalOpen(false);
      setRequestToDelete(null);
    }
  };

  const handleAddNewClick = () => {
    setIsAddDrawerOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full">
      {/* Leave Summary Row */}
      <div className="relative group">
        <div className="flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar">
          {LEAVE_SUMMARY.map((item, index) => (
            <Card key={index} className="min-w-[240px] p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{item.label}</span>
                <HiOutlineInformationCircle className="text-gray-400 text-lg" />
              </div>
              <span className="text-xs font-bold text-gray-400">{item.days}</span>
            </Card>
          ))}
        </div>
        <button className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 shadow-sm z-10">
          <HiOutlineChevronLeft />
        </button>
        <button className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 shadow-sm z-10">
          <HiOutlineChevronRight />
        </button>
      </div>

      {/* Request Time List Section */}
      <Card className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Request Time List</h3>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 px-4 bg-white dark:bg-gray-900" leftIcon={<HiOutlineArrowPath className="text-lg" />}>
              Sycn With Google
            </Button>
            <Button
              variant="primary"
              className="h-10 px-4"
              leftIcon={<HiOutlinePlus className="text-lg" />}
              onClick={handleAddNewClick}
            >
              Add New Request
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white">
            <span>01 Jan 2023 - 10 Mar 2023</span>
            <HiOutlineCalendarDays className="text-gray-400 text-lg" />
          </div>
          <Dropdown label="All Type" options={["Annual", "Sick Leave", "Engagement"]} />
          <Dropdown label="All Status" options={["Approve", "Pending", "Reject"]} />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">From</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">To</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Type</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Attachment</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Status</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id} className="border-b border-gray-50 dark:border-gray-800">
                  <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">{req.from}</TableCell>
                  <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">{req.to}</TableCell>
                  <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">{req.total}</TableCell>
                  <TableCell className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">{req.type}</TableCell>
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                      {req.attachment}
                      <HiOutlineDocumentText className="text-gray-300 text-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4 text-center">
                    <Badge variant="success" tinted className="text-[9px] uppercase tracking-wider px-2 py-0.5">
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    <TableActions
                      className="justify-end"
                      onView={() => handleViewClick(req)}
                      onEdit={() => handleViewClick(req)}
                      onDelete={() => handleDeleteClick(req.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8">
          <Pagination className="mt-0 w-full" />
        </div>
      </Card>

      {/* Balance History Section */}
      <Card className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Balance History</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white min-w-[240px]">
              <span>01 Jan 2023 - 10 Mar 2023</span>
              <HiOutlineCalendarDays className="text-gray-400 text-lg ml-auto" />
            </div>
            <Dropdown label="All Type" options={["Annual", "Sick Leave"]} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Date</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Event</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Type</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Changed By</TableHead>
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">Change (Days)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">01 Mar 2023</TableCell>
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">Take Time Off</TableCell>
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400">Engagement</TableCell>
                <TableCell className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center text-[10px] font-bold">PO</div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Pixel Office</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white text-right">-10 Days</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      <TimeOffDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        request={selectedRequest}
      />

      <AddTimeOffDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setRequestToDelete(null); }}
        onConfirm={confirmDelete}
        itemName="Time Off Request"
      />
    </div>
  );
}
