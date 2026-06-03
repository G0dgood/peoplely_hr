import * as React from "react";
import {
  HiOutlineChevronDown,
  HiOutlineFaceSmile,
  HiOutlineLink,
  HiOutlineListBullet,
  HiOutlineBars3BottomLeft,
} from "react-icons/hi2";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface CreateEmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; stage: string; subject: string; body: string }) => void;
  isLoading?: boolean;
}

export function CreateEmailTemplateModal({
  isOpen,
  onClose,
  onCreate,
  isLoading = false,
}: CreateEmailTemplateModalProps) {
  const [name, setName] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [stage, setStage] = React.useState("Applied");

  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setSubject("");
      setBody("");
      setStage("Applied");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !subject.trim() || !body.trim() || isLoading) return;

    onCreate({
      name: name.trim(),
      stage,
      subject: subject.trim(),
      body: body.trim(),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      className="sm:max-w-2xl h-full !rounded-none"
    >
      <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white dark:bg-gray-955">
        <ModalHeader className="border-b-0 pb-0" onClose={onClose}>
          <ModalTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Add New Email Template
          </ModalTitle>
        </ModalHeader>
        <ModalContent className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Template Name"
              required
              placeholder="e.g. Interview Invite"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xs font-semibold"
              disabled={isLoading}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-555 dark:text-gray-400">
                Trigger Stage
              </label>
              <div className="relative">
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-none appearance-none cursor-pointer pr-10 transition-colors"
                  disabled={isLoading}
                >
                  {["Applied", "Screening", "1st Interview", "2nd Interview", "Offered", "Hired", "Rejected"].map(
                    (s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    )
                  )}
                </select>
                <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
              </div>
            </div>
          </div>

          <Input
            label="Email Subject"
            required
            placeholder="e.g. Interview scheduled for {{job_title}}"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="text-xs font-semibold"
            disabled={isLoading}
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[11px] font-bold text-gray-555 dark:text-gray-400">Email Body</label>
            {/* Rich Editor Toolbar and Textarea wrapper */}
            <div className="flex flex-col border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              {/* Editor Toolbar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50/50 dark:bg-gray-900/60 border-b border-gray-300 dark:border-gray-700 flex-wrap">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-750 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Bold"
                  disabled={isLoading}
                >
                  B
                </button>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-750 dark:text-gray-300 italic font-serif hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Italic"
                  disabled={isLoading}
                >
                  I
                </button>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-750 dark:text-gray-300 underline hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Underline"
                  disabled={isLoading}
                >
                  U
                </button>
                <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Insert Emoji"
                  disabled={isLoading}
                >
                  <HiOutlineFaceSmile className="text-lg" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Insert Link"
                  disabled={isLoading}
                >
                  <HiOutlineLink className="text-lg" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Bullet List"
                  disabled={isLoading}
                >
                  <HiOutlineListBullet className="text-lg" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Align Left"
                  disabled={isLoading}
                >
                  <HiOutlineBars3BottomLeft className="text-lg" />
                </button>
              </div>

              {/* Body Editor textarea */}
              <textarea
                required
                placeholder="Dear {{candidate_name}}, ..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full min-h-[220px] bg-white dark:bg-gray-955 p-6 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none placeholder:text-gray-400 resize-none font-sans leading-relaxed"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="text-[10px] text-gray-400 bg-gray-50 dark:bg-gray-900/60 p-2.5 rounded-lg flex flex-wrap gap-x-3 gap-y-1">
            <span className="font-bold">Supported Placeholders:</span>
            <span>{"{{candidate_name}}"}</span>
            <span>{"{{job_title}}"}</span>
            <span>{"{{company_name}}"}</span>
          </div>
        </ModalContent>
        <ModalFooter className="border-t-0 pt-0 pb-8 flex items-center justify-end gap-3 px-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-8 h-12 rounded-xl text-xs font-bold"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="px-8 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
