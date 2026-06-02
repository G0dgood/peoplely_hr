import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "@/components/ui/button";
import { FaCloudUploadAlt, FaFilePdf, FaFileWord, FaFileAlt, FaTrashAlt } from "react-icons/fa";

export interface UploadCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload?: (file: File) => void;
}

export function UploadCVModal({ isOpen, onClose, onUpload }: UploadCVModalProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateAndSetFile = (selectedFile: File) => {
    setError(null);
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    const extension = selectedFile.name.split(".").pop()?.toLowerCase();
    
    const isValidType = allowedTypes.includes(selectedFile.type) || 
                        extension === "pdf" || 
                        extension === "doc" || 
                        extension === "docx";
                        
    if (!isValidType) {
      setError("Invalid file format. Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering file selection dialog
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload?.(file);
      handleClose();
    }
  };

  const handleClose = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const getFileIcon = () => {
    if (!file) return null;
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension === "pdf") {
      return <FaFilePdf className="text-red-500 text-3xl" />;
    }
    if (extension === "doc" || extension === "docx") {
      return <FaFileWord className="text-blue-500 text-3xl" />;
    }
    return <FaFileAlt className="text-gray-500 text-3xl" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} position="center">
      <ModalHeader onClose={handleClose}>
        <ModalTitle>Upload CV</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className="flex flex-col gap-4">
          <p className="text-body-sm text-gray-500 mb-2">Please upload the candidate&apos;s CV here.</p>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4 transition-all duration-200 bg-gray-55/20 dark:bg-gray-900/50 ${
              file
                ? "border-emerald-500/50 dark:border-emerald-500/30 bg-emerald-50/5 dark:bg-emerald-950/10 cursor-default"
                : isDragging
                ? "border-primary bg-primary/5 cursor-pointer scale-[1.01]"
                : "border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
            }`}
          >
            {file ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
                  {getFileIcon()}
                </div>
                <div className="max-w-xs px-2">
                  <p className="font-bold text-gray-900 dark:text-white mb-1 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 font-semibold">{formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all font-bold text-xs cursor-pointer"
                >
                  <FaTrashAlt className="text-[10px]" />
                  Remove file
                </button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">
                  <FaCloudUploadAlt />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">
                    Drag & Drop here to upload
                  </p>
                  <p className="text-xs text-gray-500">
                    or click to select file from your computer
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Browse Files
                </Button>
              </>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-500 font-semibold mt-1 text-center bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/30 rounded-lg p-2">
              {error}
            </p>
          )}

          <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center font-semibold">
            Supported formats: PDF, DOC, DOCX up to 5MB
          </p>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button
          variant="outline"
          className="flex-1 justify-center"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="flex-1 justify-center"
          disabled={!file}
          onClick={handleUpload}
        >
          Upload
        </Button>
      </ModalFooter>
    </Modal>
  );
}
