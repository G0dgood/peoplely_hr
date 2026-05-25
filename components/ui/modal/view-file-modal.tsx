import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { FileItem } from "./upload-file-modal";

interface ViewFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: FileItem | null;
}

export function ViewFileModal({ isOpen, onClose, file }: ViewFileModalProps) {
  if (!file) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <ModalHeader onClose={onClose}>
        <ModalTitle>View File</ModalTitle>
      </ModalHeader>
      <ModalContent className="flex flex-col items-center gap-6 py-6">
        <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400">
          <HiOutlineDocumentText className="text-5xl" />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{file.name}</h3>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
            <span>Size: {file.size}</span>
            <span>•</span>
            <span>Uploaded: {file.uploadedDate}</span>
          </div>
        </div>

        <div className="w-full p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 rounded-xl mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
            Preview is not available for this file type. You can download the file to view its contents.
          </p>
        </div>
      </ModalContent>
      <ModalFooter className="flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onClose}>
          Download File
        </Button>
      </ModalFooter>
    </Modal>
  );
}
