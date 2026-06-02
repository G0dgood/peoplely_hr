import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SVGLoader } from "@/components/ui/options";

export interface CreateJobTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (data: { title: string }) => void;
  initialData?: { id: string; title: string; active: boolean } | null;
  isLoading?: boolean;
}

export function CreateJobTitleModal({
  isOpen,
  onClose,
  onCreate,
  initialData,
  isLoading = false,
}: CreateJobTitleModalProps) {
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
      } else {
        setTitle("");
      }
    }
  }, [isOpen, initialData]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isLoading) return;

    onCreate?.({
      title: title.trim(),
    });
  };

  const handleClose = () => {
    if (isLoading) return;
    setTitle("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} position="center">
      <form onSubmit={handleCreate}>
        <ModalHeader onClose={handleClose}>
          <ModalTitle>{initialData ? "Edit Job Title" : "Create Job Title"}</ModalTitle>
        </ModalHeader>
        <ModalContent className="flex flex-col gap-5">
          <Input
            label="Job Title Name"
            required
            placeholder="e.g. Lead Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
        </ModalContent>
        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 justify-center"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!title.trim() || isLoading}
            className="flex-1 justify-center"
            leftIcon={isLoading ? <SVGLoader width={16} height={16} color="#ffffff" /> : undefined}
          >
            {isLoading ? (initialData ? "Saving..." : "Creating...") : (initialData ? "Save Changes" : "Create")}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
