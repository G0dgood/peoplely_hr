import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "@/components/ui/button";
import { HiOutlineArrowRightOnRectangle, HiOutlineXMark } from "react-icons/hi2";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-sm">
      <ModalHeader className="border-b-0 pb-0 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10 cursor-pointer"
        >
          <HiOutlineXMark className="text-xl" />
        </button>
        <ModalTitle className="text-center w-full flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-500 mb-2">
            <HiOutlineArrowRightOnRectangle className="text-2xl rotate-180" />
          </div>
          Confirm Log Out
        </ModalTitle>
      </ModalHeader>
      
      <ModalContent className="text-center pt-2 pb-8">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          Are you sure you want to log out of your account?
        </p>
      </ModalContent>
      
      <ModalFooter className="flex gap-3 pt-6 pb-6 px-8 bg-transparent border-t-0 justify-center">
        <Button variant="outline" onClick={onClose} className="flex-1 max-w-[140px] cursor-pointer">
          Cancel
        </Button>
        <Button 
          variant="danger" 
          onClick={() => {
            onConfirm();
            onClose();
          }} 
          className="flex-1 max-w-[140px] cursor-pointer"
        >
          Yes, Log Out
        </Button>
      </ModalFooter>
    </Modal>
  );
}
