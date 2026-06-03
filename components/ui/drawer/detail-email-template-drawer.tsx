import * as React from "react";
import {
  HiOutlineChevronRight,
  HiOutlineXMark,
  HiOutlineDocumentText,
  HiOutlineFaceSmile,
  HiOutlineLink,
  HiOutlineListBullet,
  HiOutlineBars3BottomLeft,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  stage: string;
  lastModified: string;
  isLocked: boolean;
}

export interface DetailEmailTemplateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { id: string; name: string; subject: string; body: string; stage: string }) => void;
  template: EmailTemplate | null;
  isLoading?: boolean;
}

export function DetailEmailTemplateDrawer({
  isOpen,
  onClose,
  onSave,
  template,
  isLoading = false,
}: DetailEmailTemplateDrawerProps) {
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");

  React.useEffect(() => {
    if (isOpen && template) {
      setSubject(template.subject);
      setBody(template.body);
    }
  }, [isOpen, template]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!template || !subject.trim() || !body.trim() || isLoading) return;

    onSave({
      id: template.id,
      name: template.name,
      stage: template.stage,
      subject: subject.trim(),
      body: body.trim(),
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
        isOpen ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sliding Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-xl md:max-w-2xl bg-white dark:bg-gray-955 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Dismiss slide button (vertically centered on the left border of the drawer panel) */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-30 z-50">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-800 hover:scale-105 transition-all cursor-pointer text-gray-700 dark:text-gray-350"
            disabled={isLoading}
          >
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </div>

        {template && (
          <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white dark:bg-gray-955">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Detail Email Template</h3>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                disabled={isLoading}
              >
                <HiOutlineXMark className="text-xl" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5">
              {/* Two columns at the top: Stage and Email Template */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-405 uppercase tracking-wider">
                    Stage
                  </label>
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 cursor-not-allowed">
                    <span>{template.stage}</span>
                    <HiOutlineDocumentText className="text-gray-400 text-base" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-405 uppercase tracking-wider">
                    Email Template
                  </label>
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 cursor-not-allowed">
                    <span>{template.name}</span>
                    <HiOutlineDocumentText className="text-gray-400 text-base" />
                  </div>
                </div>
              </div>

              {/* Subject field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-405 uppercase tracking-wider">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Offer from {{company_name}}"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="h-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>

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
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full min-h-[300px] bg-white dark:bg-gray-955 p-6 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none placeholder:text-gray-400 resize-none font-sans leading-relaxed"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-3 bg-gray-50/20 dark:bg-gray-955">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-8 h-12 rounded-xl text-xs font-bold transition-all"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="px-8 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900 cursor-pointer transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
