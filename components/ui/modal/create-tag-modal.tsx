import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface CreateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
  isLoading?: boolean;
}

export function CreateTagModal({
  isOpen,
  onClose,
  onCreate,
  isLoading = false,
}: CreateTagModalProps) {
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setName("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isLoading) return;
    onCreate(name.trim());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col bg-white dark:bg-gray-950">
        <ModalHeader onClose={onClose}>
          <ModalTitle>Add New Tag</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <Input
            label="Tag Name"
            required
            placeholder="e.g. Design"
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
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
