"use client";

import * as React from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalFooter,
} from "@/components/ui/modal";

interface Candidate {
  id: number;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  job: string;
  cv: string;
  createdDate: string;
  stage: "Applied" | "Screening" | "1st Interview" | "2nd Interview" | "Hiring" | "Rejected";
}

export interface EditCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (c: Omit<Candidate, "id" | "avatar" | "createdDate">) => void;
  candidate: Candidate | null;
}

const DocumentUploadIcon = () => (
  <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const PhotoUploadIcon = () => (
  <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 3.75 0 11-.75 0 .375 3.75 0 01.75 0z" />
  </svg>
);

const AttachmentUploadIcon = () => (
  <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32a1.5 1.5 0 11-2.122-2.122L14.75 7.87" />
  </svg>
);

export function EditCandidateModal({ isOpen, onClose, onSave, candidate }: EditCandidateModalProps) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [job, setJob] = React.useState("");
  const [source, setSource] = React.useState("");
  const [coverLetter, setCoverLetter] = React.useState("");
  const [cvName, setCvName] = React.useState("");
  const [photoName, setPhotoName] = React.useState("");
  const [attachmentName, setAttachmentName] = React.useState("");
  const [stage, setStage] = React.useState<Candidate["stage"]>("Applied");

  const cvInputRef = React.useRef<HTMLInputElement>(null);
  const photoInputRef = React.useRef<HTMLInputElement>(null);
  const attachmentInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (candidate) {
      const parts = candidate.name.split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      setEmail(candidate.email);
      setPhone(candidate.phone);
      setJob(candidate.job);
      setCvName(candidate.cv !== "-" ? candidate.cv : "");
      setStage(candidate.stage);
      setSource("");
      setCoverLetter("");
      setPhotoName("");
      setAttachmentName("");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setJob("");
      setSource("");
      setCoverLetter("");
      setCvName("");
      setPhotoName("");
      setAttachmentName("");
      setStage("Applied");
    }
  }, [candidate, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName} ${lastName}`.trim();
    onSave({
      name: fullName,
      email,
      phone,
      job: job || "Designer",
      cv: cvName || "-",
      stage,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} position="right" className="sm:max-w-2xl h-full rounded-none sm:rounded-l-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white dark:bg-gray-950">
        <ModalHeader className="border-b-0 pb-0">
          <ModalTitle className="text-xl font-bold text-gray-900 dark:text-white">
            {candidate ? "Edit Candidate" : "New Candidate"}
          </ModalTitle>
        </ModalHeader>
        <ModalContent className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
          {/* File Upload Fields Grid */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Upload CV */}
            <div className="flex flex-col gap-1.5 flex-1">
              <span className="text-[11px] font-bold text-gray-550 dark:text-gray-400">Upload CV</span>
              <div
                onClick={() => cvInputRef.current?.click()}
                className="border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between bg-gray-55/20 dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer h-[52px]"
              >
                <span className="text-xs font-semibold text-gray-550 dark:text-gray-400 truncate mr-2">
                  {cvName || "Upload File"}
                </span>
                <DocumentUploadIcon />
                <input
                  ref={cvInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setCvName(e.target.files[0].name);
                  }}
                />
              </div>
              <span className="text-[9px] text-gray-405 dark:text-gray-500">
                Max file size: 5MB. File format: pdf, docx, png, and jpeg
              </span>
            </div>

            {/* Photo */}
            <div className="flex flex-col gap-1.5 flex-1">
              <span className="text-[11px] font-bold text-gray-555 dark:text-gray-400">Photo</span>
              <div
                onClick={() => photoInputRef.current?.click()}
                className="border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between bg-gray-55/20 dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer h-[52px]"
              >
                <span className="text-xs font-semibold text-gray-555 dark:text-gray-400 truncate mr-2">
                  {photoName || "Upload Photo"}
                </span>
                <PhotoUploadIcon />
                <input
                  ref={photoInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setPhotoName(e.target.files[0].name);
                  }}
                />
              </div>
              <span className="text-[9px] text-gray-405 dark:text-gray-500">
                Max file size: 5MB. File format: pdf, docx, png, and jpeg
              </span>
            </div>
          </div>

          {/* Attachment (Full Width) */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[11px] font-bold text-gray-555 dark:text-gray-400">Attachment</span>
            <div
              onClick={() => attachmentInputRef.current?.click()}
              className="border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between bg-gray-55/20 dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer h-[52px]"
            >
              <span className="text-xs font-semibold text-gray-555 dark:text-gray-400 truncate mr-2">
                {attachmentName || "Upload attachment"}
              </span>
              <AttachmentUploadIcon />
              <input
                ref={attachmentInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) setAttachmentName(e.target.files[0].name);
                }}
              />
            </div>
            <span className="text-[9px] text-gray-405 dark:text-gray-500">
              Max file size: 5MB. File format: pdf, docx, png, and jpeg
            </span>
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              required
              placeholder="Pristia"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="text-xs font-semibold"
            />
            <Input
              label="Last Name"
              required
              placeholder="Candra"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="text-xs font-semibold"
            />
          </div>

          {/* Email Address & Phone Number */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Email Address"
              required
              type="email"
              placeholder="Pristia"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-xs font-semibold"
            />
            <Input
              label="Phone Number"
              required
              placeholder="+62"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-xs font-semibold"
            />
          </div>

          {/* Job & Source */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-555 dark:text-gray-400">Job</label>
              <div className="relative">
                <select
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="w-full h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-none appearance-none cursor-pointer pr-10 transition-colors"
                >
                  <option value="">Select job</option>
                  <option value="Designer">Designer</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                </select>
                <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
              </div>
            </div>

            <div className="relative flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-555 dark:text-gray-400">Source</label>
              <div className="relative">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-none appearance-none cursor-pointer pr-10 transition-colors"
                >
                  <option value="">Add source</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Indeed">Indeed</option>
                  <option value="Referral">Referral</option>
                </select>
                <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[11px] font-bold text-gray-555 dark:text-gray-400">Cover Letter</label>
            <textarea
              placeholder="Input cover letter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full min-h-[96px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl p-4 text-xs font-bold text-gray-700 dark:text-gray-350 focus:outline-none placeholder:text-gray-400 resize-y transition-colors"
            />
          </div>
        </ModalContent>
        <ModalFooter className="border-t-0 pt-0 pb-8 flex items-center justify-end gap-3 px-6">
          <Button type="button" variant="outline" onClick={onClose} className="px-8 h-12 rounded-xl text-xs font-bold">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="px-8 h-12 rounded-xl text-xs font-bold bg-[#11131A] dark:bg-white dark:text-gray-900">
            {candidate ? "Save Changes" : "Create"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
