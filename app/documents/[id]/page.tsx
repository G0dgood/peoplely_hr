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
import { UploadFileModal, FileItem } from "@/components/ui/modal/upload-file-modal";
import { DeleteModal, ViewFileModal } from "@/components/ui/modal";
import { RowPerPage } from "@/components/ui/row-per-page";
import { Pagination } from "@/components/ui/pagination";
import { TableActions } from "@/components/ui/table-actions";
import { SVGLoaderFetch, NoRecordFound } from "@/components/ui/options";



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
 const isLoading = false;
 const params = useParams();
 const folderId = params?.id as string;
 const folderName = FOLDER_NAMES[folderId] || "Esential Tax";

 const [files, setFiles] = React.useState<FileItem[]>(INITIAL_FILES);
 const [isModalOpen, setIsModalOpen] = React.useState(false);
 const [searchQuery, setSearchQuery] = React.useState("");

 const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
 const [fileToDelete, setFileToDelete] = React.useState<FileItem | null>(null);

 const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
 const [fileToView, setFileToView] = React.useState<FileItem | null>(null);

 const handleDeleteFile = (id: number) => {
  setFiles((prev) => prev.filter((f) => f.id !== id));
 };

 const filteredFiles = files.filter((f) =>
  f.name.toLowerCase().includes(searchQuery.toLowerCase())
 );

 return (
  <div className="flex flex-col gap-8 p-2 md:p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
   {/* Header section with page meta and actions */}
   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
     <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{folderName}</h1>
     <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-500">
      <Link href="/documents" className="hover:text-primary transition-colors">
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
      className="h-11 px-5 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold"
      leftIcon={<HiOutlineArrowUpTray className="text-lg" />}
     >
      Upload
     </Button>

     <Button
      variant="primary"
      className="h-11 px-5 bg-[#11131A] text-white dark:bg-white dark:text-gray-900 hover:opacity-90 font-bold"
      leftIcon={<HiOutlineArrowDownTray className="text-lg" />}
     >
      Download
     </Button>
    </div>
   </div>

   {/* Main card viewport */}
   <Card className="p-4 md:p-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900 flex flex-col justify-start">
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
      <div className="flex items-center justify-end gap-4 mb-6">
       <Input
        placeholder="Search file name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-xs h-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold rounded-lg placeholder:text-gray-400"
       />
       <RowPerPage itemsPerPage={10} />
      </div>

      <div className="overflow-x-auto w-full">
       <table>
        <thead>
         <tr className="border-b border-gray-300 dark:border-gray-800">
          <th >
           <div className="flex items-center gap-1.5 cursor-pointer select-none">
            <span>Name</span>
            <HiOutlineChevronUpDown className="text-sm" />
           </div>
          </th>
          <th >Size</th>
          <th className="text-right pr-6">Action</th>
         </tr>
        </thead>
        <tbody>
         {isLoading ? (
          <SVGLoaderFetch colSpan={3} text="Loading files..." />
         ) : filteredFiles.length === 0 ? (
          <NoRecordFound colSpan={3} text="No files found." />
         ) : (
          filteredFiles.map((file) => (
           <tr key={file.id} className="hover:bg-gray-50/10 dark:hover:bg-gray-800/10">
            {/* Name with File Icon */}
            <td className="py-4 px-4">
             <div className="flex items-center gap-3">
              <HiOutlineDocumentText className="text-lg text-gray-400 dark:text-gray-500" />
              <span className="text-xs font-bold text-gray-900 dark:text-white">{file.name}</span>
             </div>
            </td>

            {/* Size */}
            <td className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
             {file.size}
            </td>

            {/* Action Circles */}
            <td className="py-4 px-4 text-right pr-6">
             <div className="flex justify-end">
              <TableActions
               onView={() => {
                setFileToView(file);
                setIsViewModalOpen(true);
               }}
               onDownload={() => {}}
               onDelete={() => {
                setFileToDelete(file);
                setIsDeleteModalOpen(true);
               }}
              />
             </div>
            </td>

           </tr>
          ))
         )}
        </tbody>
       </table>
      </div>

      {/* Pagination Controls Footer */}
      <div className="mt-4">
       <Pagination className="mt-0 w-full" />
      </div>
     </div>
    )}
   </Card>

   {/* Upload File Dialog Modal */}
   {/* Upload File Dialog Modal */}
   <UploadFileModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onUpload={(newFile) => {
     setFiles((prev) => [newFile, ...prev]);
     setIsModalOpen(false);
    }}
   />

   {/* View File Modal */}
   <ViewFileModal
    isOpen={isViewModalOpen}
    onClose={() => {
     setIsViewModalOpen(false);
     setFileToView(null);
    }}
    file={fileToView}
   />

   {/* Delete Confirmation Modal */}
   <DeleteModal
    isOpen={isDeleteModalOpen}
    onClose={() => {
     setIsDeleteModalOpen(false);
     setFileToDelete(null);
    }}
    onConfirm={() => {
     if (fileToDelete) {
      handleDeleteFile(fileToDelete.id);
     }
    }}
    itemName={fileToDelete?.name}
   />
  </div>
 );
}
