import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "@/components/ui/button";
import { HiOutlineExclamationTriangle, HiOutlineXMark } from "react-icons/hi2";
import { SVGLoader } from "@/components/ui/options";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  isLoading?: boolean;
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  description,
  itemName,
  isLoading = false,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-sm">
      <ModalHeader className="border-b-0 pb-0 relative">
        <button 
          onClick={onClose} 
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10 disabled:opacity-50 disabled:pointer-events-none"
        >
          <HiOutlineXMark className="text-xl" />
        </button>
        <ModalTitle className="text-center w-full flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-500 mb-2">
            <HiOutlineExclamationTriangle className="text-2xl" />
          </div>
          {title}
        </ModalTitle>
      </ModalHeader>
      
      <ModalContent className="text-center pt-2 pb-8">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          {description || (
            <>
              Are you sure you want to delete {itemName ? <span className="text-gray-900 dark:text-white font-bold">"{itemName}"</span> : "this item"}?
              This action cannot be undone.
            </>
          )}
        </p>
      </ModalContent>
      
      <ModalFooter className="flex gap-3 pt-6 pb-6 px-8 bg-transparent border-t-0 justify-center">
        <Button variant="outline" onClick={onClose} disabled={isLoading} className="flex-1 max-w-[140px]">
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            onConfirm();
            if (!isLoading) onClose();
          }} 
          disabled={isLoading}
          className="flex-1 max-w-[140px] bg-red-500 hover:bg-red-600 border-red-500 text-white"
          leftIcon={isLoading ? <SVGLoader width={16} height={16} color="#ffffff" /> : undefined}
        >
          {isLoading ? "Deleting..." : "Yes, Delete"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

