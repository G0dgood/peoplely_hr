import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SVGLoader } from "@/components/ui/options";

export interface CreateOfficeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (data: { office: string; location: string; description: string; headOfOffice: string }) => void;
  initialData?: { id: string; name: string; location: string; description: string; headOfOffice: string } | null;
  isLoading?: boolean;
}

export function CreateOfficeModal({
  isOpen,
  onClose,
  onCreate,
  initialData,
  isLoading = false,
}: CreateOfficeModalProps) {
  const [office, setOffice] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [headOfOffice, setHeadOfOffice] = React.useState("Management");

  React.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setOffice(initialData.name);
        setLocation(initialData.location);
        setDescription(initialData.description || "");
        setHeadOfOffice(initialData.headOfOffice || "Management");
      } else {
        setOffice("");
        setLocation("");
        setDescription("");
        setHeadOfOffice("Management");
      }
    }
  }, [isOpen, initialData]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!office.trim() || !location.trim() || isLoading) return;

    onCreate?.({
      office: office.trim(),
      location: location.trim(),
      description: description.trim(),
      headOfOffice: headOfOffice.trim() || "Management",
    });
  };

  const handleClose = () => {
    if (isLoading) return;
    setOffice("");
    setLocation("");
    setDescription("");
    setHeadOfOffice("Management");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} position="center">
      <form onSubmit={handleCreate}>
        <ModalHeader onClose={handleClose}>
          <ModalTitle>{initialData ? "Edit Office" : "Create Office"}</ModalTitle>
        </ModalHeader>
        <ModalContent className="flex flex-col gap-5">
          <Input
            label="Office Name"
            required
            placeholder="e.g. Tokyo Office"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            disabled={isLoading}
          />

          <Input
            label="Location"
            required
            placeholder="e.g. Tokyo, Japan"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={isLoading}
          />

          <Input
            label="Head of Office"
            placeholder="e.g. Pristia Candra"
            value={headOfOffice}
            onChange={(e) => setHeadOfOffice(e.target.value)}
            disabled={isLoading}
          />

          <div className="flex flex-col gap-2">
            <label className="text-body-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
              Description
            </label>
            <textarea
              placeholder="Enter office description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              disabled={isLoading}
              className="w-full rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors p-4 resize-none leading-relaxed disabled:opacity-50"
            />
          </div>
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
            disabled={!office.trim() || !location.trim() || isLoading}
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
