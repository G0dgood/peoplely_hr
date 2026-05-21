"use client";

import * as React from "react";
import Link from "next/link";
import {
  HiOutlineFolder,
  HiOutlineCalendarDays,
  HiOutlinePlus,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronUpDown,
  HiOutlineChevronDown,
  HiOutlineXMark,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AddFolderDrawer } from "@/components/ui/drawer";
import { ShareModal, ShareOption } from "@/components/ui/modal/share-modal";
import { PageHeader } from "@/components/ui/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DocumentFolder {
  id: number;
  name: string;
  creatorName: string;
  creatorAvatar: string;
  creatorInitials?: string;
  createdDate: string;
  description: string;
  filesCount: number;
  size: string;
  shareWith: string;
}

const INITIAL_FOLDERS: DocumentFolder[] = [
  {
    id: 1,
    name: "Esential Tax",
    creatorName: "Jennifer Law",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    createdDate: "24 Mar 2023",
    description: "Files about the importance of essential tasks",
    filesCount: 5,
    size: "22 mb",
    shareWith: "Everyone",
  },
  {
    id: 2,
    name: "Project Manager",
    creatorName: "Dulce Philips",
    creatorAvatar: "",
    creatorInitials: "DP",
    createdDate: "21 Jan 2023",
    description: "-",
    filesCount: 3,
    size: "15 mb",
    shareWith: "Everyone",
  },
  {
    id: 3,
    name: "UIUX Designer",
    creatorName: "Miracle Francis",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    createdDate: "10 Jan 2023",
    description: "Standard of procedure about UI UX Design Team",
    filesCount: 2,
    size: "11 mb",
    shareWith: "Everyone",
  },
  {
    id: 4,
    name: "IT Development",
    creatorName: "Davis Curtis",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    createdDate: "01 Jan 2022",
    description: "Standard of procedure about IT Dev Team",
    filesCount: 4,
    size: "20 mb",
    shareWith: "Everyone",
  },
];

type SortKey = "name" | "creatorName" | "description" | "filesCount" | "size";
type SortOrder = "asc" | "desc";


const DEFAULT_TAGS = [
  "Onboarding Group",
  "Offboarding Group",
  "Probationary Group",
  "All Employee",
  "Fulltime Employee (Non- resigned employee)",
];

export default function DocumentsPage() {
  const [folders, setFolders] = React.useState<DocumentFolder[]>(INITIAL_FOLDERS);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [sortKey, setSortKey] = React.useState<SortKey>("name");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("asc");

  // Share With modal states
  const [activeShareFolderId, setActiveShareFolderId] = React.useState<number | null>(null);
  const [selectedShareOption, setSelectedShareOption] = React.useState<ShareOption>("Everyone");
  const [tags, setTags] = React.useState<string[]>(DEFAULT_TAGS);

  const activeShareFolder = folders.find((f) => f.id === activeShareFolderId);

  React.useEffect(() => {
    if (activeShareFolder) {
      const shareVal = activeShareFolder.shareWith;
      if (
        shareVal === "Everyone" ||
        shareVal === "Department" ||
        shareVal === "Offices" ||
        shareVal === "Employee Group"
      ) {
        setSelectedShareOption(shareVal as ShareOption);
      } else {
        setSelectedShareOption("Employee Group"); // fallback
      }
    }
  }, [activeShareFolderId, folders]);

  const handleSort = (key: SortKey) => {
    const isAsc = sortKey === key && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortKey(key);

    setFolders((prev) => {
      return [...prev].sort((a, b) => {
        let valA = a[key];
        let valB = b[key];

        if (typeof valA === "string" && typeof valB === "string") {
          return isAsc
            ? valB.localeCompare(valA)
            : valA.localeCompare(valB);
        } else {
          return isAsc
            ? (valB as number) - (valA as number)
            : (valA as number) - (valB as number);
        }
      });
    });
  };

  const handleCreateFolder = (name: string, description: string) => {
    const newFolder: DocumentFolder = {
      id: Date.now(),
      name,
      creatorName: "Pristia Candra",
      creatorAvatar: "https://i.pravatar.cc/150?u=pristia",
      createdDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      description: description.trim() || "-",
      filesCount: 0,
      size: "0 mb",
      shareWith: "Everyone",
    };

    setFolders((prev) => [newFolder, ...prev]);
  };

  const handleShareNowSubmit = () => {
    if (activeShareFolderId === null) return;

    setFolders((prev) =>
      prev.map((f) =>
        f.id === activeShareFolderId
          ? { ...f, shareWith: selectedShareOption }
          : f
      )
    );
    setActiveShareFolderId(null);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-[#FAFCFF] dark:bg-gray-950">
      {/* Header section with page meta and filter actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Documents" description="These are the uploaded documents" />

        <div className="flex items-center gap-3">
          {/* Date Range Selection Indicator */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-900 dark:text-white select-none">
            <span>01 Jan 2023 - 10 Mar 2023</span>
            <HiOutlineCalendarDays className="text-gray-400 text-lg" />
          </div>

          <Button
            variant="primary"
            onClick={() => setIsDrawerOpen(true)}
            className="h-11 px-5 bg-[#11131A] text-white dark:bg-white dark:text-gray-900 hover:opacity-90 font-bold"
            leftIcon={<HiOutlinePlus className="text-lg" />}
          >
            New Folder
          </Button>
        </div>
      </div>

      {/* Main Documents Table Card */}
      <Card className="p-8 border border-gray-50/50 dark:border-gray-800/40 bg-white dark:bg-gray-900">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-50 dark:border-gray-800">
                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <div
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <span>Name</span>
                    <HiOutlineChevronUpDown className="text-sm" />
                  </div>
                </TableHead>

                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <div
                    onClick={() => handleSort("creatorName")}
                    className="flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <span>Created By</span>
                    <HiOutlineChevronUpDown className="text-sm" />
                  </div>
                </TableHead>

                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <span>Created Date</span>
                </TableHead>

                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <div
                    onClick={() => handleSort("description")}
                    className="flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <span>Description</span>
                    <HiOutlineChevronUpDown className="text-sm" />
                  </div>
                </TableHead>

                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <div
                    onClick={() => handleSort("filesCount")}
                    className="flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <span>Number Of Files</span>
                    <HiOutlineChevronUpDown className="text-sm" />
                  </div>
                </TableHead>

                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <span>Size</span>
                </TableHead>

                <TableHead className="py-4 px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <span>Share With</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {folders.map((folder) => (
                <TableRow
                  key={folder.id}
                  className="border-b border-gray-50 dark:border-gray-800/80 hover:bg-gray-50/20 dark:hover:bg-gray-800/10"
                >
                  {/* Folder Name */}
                  <TableCell className="py-4 px-4">
                    <Link
                      href={`/dashboard/documents/${folder.id}`}
                      className="flex items-center gap-3 group hover:opacity-80"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 text-lg group-hover:text-primary transition-colors">
                        <HiOutlineFolder />
                      </div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {folder.name}
                      </span>
                    </Link>
                  </TableCell>

                  {/* Creator */}
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {folder.creatorAvatar ? (
                        <Avatar
                          src={folder.creatorAvatar}
                          size="sm"
                          className="rounded-full w-6 h-6"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                          {folder.creatorInitials}
                        </div>
                      )}
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {folder.creatorName}
                      </span>
                    </div>
                  </TableCell>

                  {/* Created Date */}
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500">
                      <HiOutlineCalendarDays className="text-base text-gray-350 dark:text-gray-500" />
                      <span>{folder.createdDate}</span>
                    </div>
                  </TableCell>

                  {/* Description */}
                  <TableCell className="py-4 px-4 text-xs font-semibold text-gray-550 dark:text-gray-400">
                    {folder.description}
                  </TableCell>

                  {/* Number of Files */}
                  <TableCell className="py-4 px-4 text-xs font-bold text-gray-900 dark:text-white">
                    {folder.filesCount}
                  </TableCell>

                  {/* Size */}
                  <TableCell className="py-4 px-4 text-xs font-semibold text-gray-550 dark:text-gray-400">
                    {folder.size}
                  </TableCell>

                  {/* Share With (Interactive Modal Trigger) */}
                  <TableCell className="py-4 px-4">
                    <button
                      onClick={() => setActiveShareFolderId(folder.id)}
                      className="text-xs font-bold text-gray-900 dark:text-white hover:text-primary hover:underline transition-colors text-left"
                    >
                      {folder.shareWith}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer with Pagination and selector controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              <HiOutlineChevronLeft className="text-xs" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              <HiOutlineChevronRight className="text-xs" />
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 dark:text-gray-500">
            <span>Showing 1 to 10 of {folders.length} entries</span>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-800 cursor-pointer select-none">
              <span>Show 10</span>
              <HiOutlineChevronDown className="text-xs text-gray-500" />
            </div>
          </div>
        </div>
      </Card>

      {/* Add Folder Drawer Side Panel */}
      <AddFolderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onCreate={handleCreateFolder}
      />

      {/* Share With Modal Dialog */}
      <ShareModal
        isOpen={activeShareFolderId !== null}
        onClose={() => setActiveShareFolderId(null)}
        onShare={(option, tags) => {
          console.log("Shared with", option, tags);
          setActiveShareFolderId(null);
        }}
        initialOption={selectedShareOption}
        initialTags={tags}
      />
    </div>
  );
}
