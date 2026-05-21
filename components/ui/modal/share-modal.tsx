import * as React from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export type ShareOption = "Everyone" | "Department" | "Offices" | "Employee Group";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (option: ShareOption, tags: string[]) => void;
  initialTags?: string[];
  initialOption?: ShareOption;
}

export function ShareModal({ isOpen, onClose, onShare, initialTags = ["Manager", "Lead", "Head"], initialOption = "Everyone" }: ShareModalProps) {
  const [selectedShareOption, setSelectedShareOption] = React.useState<ShareOption>(initialOption);
  const [tags, setTags] = React.useState<string[]>(initialTags);

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleShareNowSubmit = () => {
    onShare(selectedShareOption, tags);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl">
      <ModalHeader onClose={onClose}>
        <ModalTitle className="text-center w-full block text-lg font-bold text-gray-900 dark:text-white">
          Share With
        </ModalTitle>
      </ModalHeader>
      <ModalContent className="flex flex-col gap-6">
        {/* Share target selection options grid */}
        <div className="grid grid-cols-1 gap-3">
          {(["Everyone", "Department", "Offices", "Employee Group"] as ShareOption[]).map((option) => {
            const isSelected = selectedShareOption === option;
            return (
              <div
                key={option}
                onClick={() => setSelectedShareOption(option)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all select-none ${isSelected
                  ? "border-teal-500/80 bg-teal-500/[0.02]"
                  : "border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300"
                  }`}
              >
                <span className={`text-[11px] font-bold ${isSelected ? "text-teal-600 dark:text-teal-400" : "text-gray-700 dark:text-gray-300"}`}>
                  {option}
                </span>
                <div
                  className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all ${isSelected
                    ? "border-teal-500 bg-teal-500"
                    : "border-gray-300 dark:border-gray-700 bg-transparent"
                    }`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Conditional Groups List Area */}
        {selectedShareOption === "Employee Group" && (
          <div className="p-4 rounded-xl border border-gray-300 dark:border-gray-800 flex flex-wrap gap-2.5 min-h-[140px] align-baseline bg-gray-50/20 dark:bg-gray-900/10">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 text-[10px] font-bold text-gray-800 dark:text-gray-200 h-8"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  <HiOutlineXMark className="text-xs" />
                </button>
                <span>{tag}</span>
              </div>
            ))}
            {tags.length === 0 && (
              <span className="text-xs text-gray-400 dark:text-gray-500 m-auto">
                All employee groups removed.
              </span>
            )}
          </div>
        )}
      </ModalContent>
      <ModalFooter className="flex items-center justify-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1 font-bold h-12 border-gray-300 dark:border-gray-800"
        >
          Cancel
        </Button>
        <Button
          onClick={handleShareNowSubmit}
          className="flex-1 font-bold h-12 bg-[#11131A] dark:bg-white text-white dark:text-gray-900 hover:opacity-90"
        >
          Share Now
        </Button>
      </ModalFooter>
    </Modal>
  );
}
