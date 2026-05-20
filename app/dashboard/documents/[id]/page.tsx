"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowUpTray,
  HiOutlineDocumentText,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineChevronUpDown,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "@/components/ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FileItem {
  id: number;
  name: string;
  size: string;
  uploadedDate: string;
}

const FOLDER_NAMES: Record<string, string> = {
  "1": "Esential Tax",
  "2": "Project Manager",
  "3": "UIUX Designer",
  "4": "IT Development",
};

const INITIAL_FILES: FileItem[] = [
  { id: 1, name: "Esential Tax 01.pdf", size: "1 mb", uploadedDate: "24 Mar 2023" },
  { id: 2, name: "Esential Tax 02.pdf", size: "1.5 mb", uploadedDate: "24 Mar 2023" },
  { id: 3, name: "Esential Tax 03.pdf", size: "2 mb", uploadedDate: "24 Mar 2023" },
  { id: 4, name: "Esential Tax 05.pdf", size: "2 mb", uploadedDate: "24 Mar 2023" },
  { id: 5, name: "Esential Tax 01.pdf", size: "2.5 mb", uploadedDate: "24 Mar 2023" },
];

export default function DocumentFolderDetailPage() {
  const params = useParams();
  const folderId = params?.id as string;
  const folderName = FOLDER_NAMES[folderId] || "Esential Tax";

  const [files, setFiles] = React.useState<FileItem[]>(INITIAL_FILES);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newFileName, setNewFileName] = React.useState("");
  const [newFileSize, setNewFileSize] = React.useState("2 mb");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const newFile: FileItem = {
      id: Date.now(),
      name: newFileName.endsWith(".pdf") || newFileName.endsWith(".docx") || newFileName.endsWith(".png")
        ? newFileName
        : `${newFileName}.pdf`,
      size: newFileSize,
      uploadedDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setFiles((prev) => [newFile, ...prev]);
    setNewFileName("");
    setIsModalOpen(false);
  };

  const handleDeleteFile = (id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header section with page meta and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{folderName}</h1>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-500">
            <Link href="/dashboard/documents" className="hover:text-primary transition-colors">
              List Document
            </Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-gray-400">{folderName}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-5 bg-white dark:bg-gray-900 border-gray-150 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold"
            leftIcon={<HiOutlineArrowUpTray className="text-lg" />}
          >
            Upload
          </Button>

          <Button
            variant="primary"
            className="h-12 px-5 bg-[#11131A] text-white dark:bg-white dark:text-gray-900 hover:opacity-90 font-bold"
            leftIcon={<HiOutlineArrowDownTray className="text-lg" />}
          >
            Download
          </Button>
        </div>
      </div>

      {/* Main card viewport */}
      <Card className="p-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 shadow-sm flex flex-col justify-start">
        {files.length === 0 ? (
          <div className="flex flex-col items-center max-w-md mx-auto text-center py-16">
            {/* Custom high-fidelity inline SVG empty state illustration */}
            <svg
              className="w-48 h-48 mb-6 text-teal-600/90 dark:text-teal-400/90"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 130H170V140H30V130Z"
                fill="#E2E8F0"
                className="fill-gray-200 dark:fill-gray-800"
              />
              <path
                d="M20 140H180V145C180 147.761 177.761 150 175 150H25C22.2386 150 20 147.761 20 145V140Z"
                fill="#CBD5E1"
                className="fill-gray-350 dark:fill-gray-700"
              />
              <rect
                x="40"
                y="50"
                width="120"
                height="80"
                rx="6"
                fill="#F8FAFC"
                stroke="#94A3B8"
                strokeWidth="4"
                className="fill-slate-50 dark:fill-slate-900 stroke-gray-400 dark:stroke-gray-600"
              />
              <rect x="50" y="60" width="45" height="45" rx="3" fill="#E2E8F0" className="fill-gray-200 dark:fill-gray-800" />
              <rect x="105" y="60" width="45" height="15" rx="3" fill="#E2E8F0" className="fill-gray-200 dark:fill-gray-800" />
              <rect x="105" y="80" width="45" height="15" rx="3" fill="#E2E8F0" className="fill-gray-200 dark:fill-gray-800" />
              <rect x="105" y="100" width="45" height="15" rx="3" fill="#E2E8F0" className="fill-gray-200 dark:fill-gray-800" />
              <rect x="50" y="112" width="100" height="8" rx="2" fill="#E2E8F0" className="fill-gray-200 dark:fill-gray-800" />

              <g className="translate-x-12 translate-y-6">
                <circle cx="110" cy="90" r="22" fill="#2DD4BF" fillOpacity="0.15" stroke="#0D9488" strokeWidth="4" />
                <path d="M125.5 105.5L145 125" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
                <line x1="102" y1="84" x2="118" y2="84" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
                <line x1="102" y1="92" x2="114" y2="92" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
                <line x1="102" y1="98" x2="110" y2="98" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
              </g>
            </svg>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              There&apos;s is no document here
            </h2>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-6 leading-relaxed">
              Please add new document by clicking &quot;Upload File&quot; below
            </p>

            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className="h-11 px-6 bg-[#11131A] text-white dark:bg-white dark:text-gray-900 hover:opacity-90 font-bold"
              leftIcon={<HiOutlineArrowUpTray className="text-lg" />}
            >
              Upload File
            </Button>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-start">
            {/* Search filter for files list */}
            <div className="flex justify-end mb-6">
              <Input
                placeholder="Search file name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-xs h-10 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-xs font-semibold rounded-lg placeholder:text-gray-400"
              />
            </div>

            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-100 dark:border-gray-800">
                    <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-1.5 cursor-pointer select-none">
                        <span>Name</span>
                        <HiOutlineChevronUpDown className="text-sm" />
                      </div>
                    </TableHead>
                    <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Size</TableHead>
                    <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.map((file) => (
                    <TableRow key={file.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/10 dark:hover:bg-gray-800/10">
                      {/* Name with File Icon */}
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <HiOutlineDocumentText className="text-lg text-gray-400 dark:text-gray-500" />
                          <span className="text-xs font-bold text-gray-900 dark:text-white">{file.name}</span>
                        </div>
                      </TableCell>

                      {/* Size */}
                      <TableCell className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {file.size}
                      </TableCell>

                      {/* Action Circles */}
                      <TableCell className="py-4 px-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-2.5">
                          {/* Green View button */}
                          <button
                            title="View"
                            className="w-7 h-7 bg-[#2E9B71] hover:bg-[#257d5b] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <HiOutlineEye className="text-xs" />
                          </button>
                          
                          {/* Blue Download button */}
                          <button
                            title="Download"
                            className="w-7 h-7 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <HiOutlineArrowDownTray className="text-xs" />
                          </button>

                          {/* Red Delete button */}
                          <button
                            title="Delete"
                            onClick={() => handleDeleteFile(file.id)}
                            className="w-7 h-7 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <HiOutlineTrash className="text-xs" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredFiles.length === 0 && (
                <div className="text-center py-12 text-xs text-gray-400 dark:text-gray-500">
                  No matching files found.
                </div>
              )}
            </div>

            {/* Pagination Controls Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <HiOutlineChevronLeft className="text-xs" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <HiOutlineChevronRight className="text-xs" />
                </button>
              </div>

              <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 dark:text-gray-500">
                <span>Showing 1 to 10 of {filteredFiles.length} entries</span>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800 cursor-pointer select-none">
                  <span>Show 10</span>
                  <HiOutlineChevronDown className="text-xs text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Upload File Dialog Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleUploadFile}>
          <ModalHeader>
            <ModalTitle>Upload File</ModalTitle>
          </ModalHeader>
          <ModalContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                File Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g. Esential Tax 04.pdf"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                required
                className="h-12 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-xs font-semibold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                File Size
              </label>
              <Input
                placeholder="e.g. 2 mb"
                value={newFileSize}
                onChange={(e) => setNewFileSize(e.target.value)}
                className="h-12 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-xs font-semibold"
              />
            </div>
          </ModalContent>
          <ModalFooter className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 font-bold h-12"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1 font-bold h-12"
            >
              Upload
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
