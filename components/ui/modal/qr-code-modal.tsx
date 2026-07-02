import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "../button";
import { HiOutlineArrowDownTray } from "react-icons/hi2";

export interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId?: string;
  qrAutoGenerateValue?: string;
  qrAutoGeneratePeriod?: string;
}

export function QrCodeModal({
  isOpen,
  onClose,
  companyId = "",
  qrAutoGenerateValue = "5",
  qrAutoGeneratePeriod = "Second",
}: QrCodeModalProps) {
  const [salt, setSalt] = React.useState(Date.now());
  const intervalSeconds = React.useMemo(() => {
    const val = parseInt(qrAutoGenerateValue, 10);
    const period = qrAutoGeneratePeriod;
    return period === "Minute" ? val * 60 : val;
  }, [qrAutoGenerateValue, qrAutoGeneratePeriod]);

  const [timeLeft, setTimeLeft] = React.useState(intervalSeconds);

  React.useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(intervalSeconds);
  }, [isOpen, intervalSeconds]);

  React.useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setSalt(Date.now());
          return intervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, intervalSeconds]);

  const qrData = `peoplely-hr://attendance/clock-in?companyId=${companyId}&ts=${salt}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-sm">
      <ModalHeader onClose={onClose}>
        <ModalTitle>Generated QR Code</ModalTitle>
      </ModalHeader>
      <ModalContent className="flex flex-col items-center justify-center gap-6 py-8">
        <div className="w-48 h-48 bg-white border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-center p-2 shadow-sm transition-all duration-300 transform hover:scale-[1.02]">
          <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain rounded-xl" />
        </div>
        
        {/* Countdown Progress bar */}
        <div className="flex flex-col items-center gap-2 w-full px-8">
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-1.5 transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${(timeLeft / intervalSeconds) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Refreshes in {timeLeft} {timeLeft === 1 ? 'second' : 'seconds'}
          </span>
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
