import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface FileItem {
  id: number;
  name: string;
  size: string;
  uploadedDate: string;
}

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (newFile: FileItem) => void;
}

export function UploadFileModal({ isOpen, onClose, onUpload }: UploadFileModalProps) {
  const [newFileName, setNewFileName] = React.useState("");
  const [newFileSize, setNewFileSize] = React.useState("2 mb");

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

    onUpload(newFile);
    setNewFileName("");
    setNewFileSize("2 mb");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleUploadFile}>
        <ModalHeader onClose={onClose}>
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
              className="h-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold"
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
              className="h-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-xs font-semibold"
            />
          </div>
        </ModalContent>
        <ModalFooter className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 font-bold h-10"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1 font-bold h-10"
          >
            Upload
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
