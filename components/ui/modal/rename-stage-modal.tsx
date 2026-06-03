import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface RenameStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: (name: string) => void;
  initialName: string;
  isLoading?: boolean;
}

export function RenameStageModal({
  isOpen,
  onClose,
  onRename,
  initialName,
  isLoading = false,
}: RenameStageModalProps) {
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setName(initialName);
    }
  }, [isOpen, initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isLoading) return;
    onRename(name.trim());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col bg-white dark:bg-gray-955">
        <ModalHeader onClose={onClose}>
          <ModalTitle>Rename Stage</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <Input
            label="Stage Name"
            required
            placeholder="e.g. Phone Screen"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xs font-semibold"
            disabled={isLoading}
          />
        </ModalContent>
        <ModalFooter className="flex items-center justify-end gap-3 px-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-6 h-12 rounded-xl text-xs font-bold"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="px-6 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
