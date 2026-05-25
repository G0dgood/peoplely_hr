import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "../button";
import { HiOutlineArrowDownTray } from "react-icons/hi2";

export interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QrCodeModal({ isOpen, onClose }: QrCodeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-sm">
      <ModalHeader onClose={onClose}>
        <ModalTitle>Generated QR Code</ModalTitle>
      </ModalHeader>
      <ModalContent className="flex flex-col items-center justify-center gap-6 py-8">
        <div className="w-48 h-48 bg-white border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-center p-2 shadow-sm">
          {/* using a placeholder image for qr code */}
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://example.com/check-in" alt="QR Code" className="w-full h-full object-contain" />
        </div>
        <p className="text-xs font-semibold text-gray-500 text-center px-4 leading-relaxed">
          Scan this QR Code using the Peoplely HR mobile application to check-in or check-out.
        </p>
      </ModalContent>
      <ModalFooter className="flex items-center justify-end gap-3 px-6 py-4">
        <Button variant="outline" onClick={onClose} className="text-xs font-bold px-6 h-10 rounded-xl">
          Close
        </Button>
        <Button variant="primary" className="text-xs font-bold px-6 h-10 rounded-xl bg-[#11131A] dark:bg-white dark:text-gray-900 flex items-center gap-2">
          <HiOutlineArrowDownTray className="text-sm" />
          Download
        </Button>
      </ModalFooter>
    </Modal>
  );
}
