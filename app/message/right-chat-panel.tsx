"use client";

import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  HiOutlineEllipsisVertical,
  HiOutlineFaceSmile,
  HiOutlinePaperAirplane,
  HiOutlinePaperClip,
  HiOutlinePhoto,
  HiOutlineDocument,
  HiOutlineChevronLeft,
} from "react-icons/hi2";
import { HiMicrophone } from "react-icons/hi";
import { Conversation, Message } from "./page";

interface RightChatPanelProps {
  active: string | null;
  activeConv: Conversation;
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  sendText: () => void;
  onBack: () => void;
  handleImageAttach: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDocAttach: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendAudio: (duration: string) => void;
  toggleReaction: (messageId: string, reaction: string) => void;
}

export function RightChatPanel({
  active,
  activeConv,
  messages,
  input,
  setInput,
  sendText,
  onBack,
  handleImageAttach,
  handleDocAttach,
  sendAudio,
  toggleReaction,
}: RightChatPanelProps) {
  const [attachMenu, setAttachMenu] = React.useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const docInputRef = React.useRef<HTMLInputElement>(null);
  const attachRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close attach menu on outside click
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (attachRef.current && !attachRef.current.contains(e.target as Node)) {
        setAttachMenu(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageAttach(e);
    setAttachMenu(false);
  };

  const onDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDocAttach(e);
    setAttachMenu(false);
  };

  if (!active) {
    return (
      <div className="hidden md:flex flex-1 flex-col items-center justify-center p-8 bg-[#FAFCFF] dark:bg-gray-950">
        <div className="w-16 h-16 rounded-full bg-[#0FAF7A]/10 flex items-center justify-center text-[#0FAF7A] mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.12 2.99 2.68 3.22 1.53.23 3.08.34 4.64.34.8 0 1.58-.07 2.35-.21L15 19.125V16.65c3.02-.3 5.43-2.61 5.62-5.71a17.26 17.26 0 00-20.73-1.5z" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">No conversation selected</h3>
        <p className="text-xs text-gray-400 dark:text-gray-550 text-center max-w-xs">
          Select a contact from the list on the left to start viewing messages and chat history.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col min-w-0 ${active ? "flex w-full" : "hidden md:flex"}`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 sm:px-7 h-[72px] border-b border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Back button on mobile */}
          <button
            onClick={onBack}
            className="md:hidden -ml-2 p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Back to conversations"
          >
            <HiOutlineChevronLeft className="text-xl" />
          </button>
          <div className="relative">
            {activeConv.avatar ? (
              <Avatar src={activeConv.avatar} size="sm" className="rounded-full" />
            ) : (
              <div className={`w-9 h-9 ${activeConv.accentBg || "bg-gray-500"} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                {activeConv.initials || "?"}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{activeConv.name}</p>
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">
              {activeConv.online ? "Online" : "Last Seen 09:40"}
            </p>
          </div>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-550 transition-colors">
          <HiOutlineEllipsisVertical className="text-lg" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-7 py-6 flex flex-col gap-5 bg-[#FAFCFF] dark:bg-gray-950">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col gap-1 max-w-[280px] sm:max-w-sm ${msg.type === "sent" ? "self-end items-end" : "self-start items-start"}`}>

            {/* Text bubble */}
            {msg.text && (
              <div
                onDoubleClick={() => toggleReaction(msg.id, "❤️")}
                className={`px-4 py-3 rounded-2xl text-xs font-semibold leading-relaxed cursor-pointer ${msg.type === "sent"
                    ? "bg-[#E8FAF4] dark:bg-[#0FAF7A]/15 text-gray-800 dark:text-gray-200 rounded-br-sm"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-xs border border-gray-50 dark:border-gray-700 rounded-bl-sm"
                  }`}>
                {msg.text}
              </div>
            )}

            {/* Audio message */}
            {msg.audio && (
              <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm shadow-xs border border-gray-50 dark:border-gray-700">
                <button className="w-7 h-7 rounded-full bg-[#0FAF7A] flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </button>
                <div className="flex items-center gap-0.5 h-6">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div key={i} className="w-0.5 bg-[#0FAF7A] rounded-full" style={{ height: `${Math.max(4, Math.sin(i * 0.7) * 14 + 14)}px`, opacity: i < 12 ? 1 : 0.3 }} />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{msg.audioDuration}</span>
              </div>
            )}

            {/* Reactions (only for non-image messages) */}
            {msg.reactions && !msg.image && (
              <div className="flex items-center gap-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full px-2 py-1 shadow-xs self-start">
                {msg.reactions.map((r, i) => <span key={i} className="text-sm">{r}</span>)}
              </div>
            )}

            {/* Image */}
            {msg.image && (
              <div className="flex flex-col gap-1.5 max-w-[240px]">
                <img src={msg.image} alt="attachment" className={`rounded-2xl object-cover w-full h-44 shadow-xs ${msg.type === "sent" ? "rounded-br-sm" : "rounded-bl-sm"}`} />
                {msg.imageCaption && (
                  <p className="text-[11px] font-semibold text-gray-550 dark:text-gray-455 leading-relaxed">{msg.imageCaption}</p>
                )}
                {msg.reactions && (
                  <div className="flex items-center gap-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full px-2 py-1 shadow-xs self-start w-fit">
                    {msg.reactions.map((r, i) => <span key={i} className="text-sm">{r}</span>)}
                  </div>
                )}
              </div>
            )}

            {/* File attachment */}
            {msg.file && (
              <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${msg.type === "sent"
                ? "bg-[#E8FAF4] dark:bg-[#0FAF7A]/15 rounded-br-sm"
                : "bg-white dark:bg-gray-800 shadow-xs border border-gray-50 dark:border-gray-700 rounded-bl-sm"
                }`}>
                <div className="w-9 h-9 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center flex-shrink-0">
                  <HiOutlineDocument className="text-lg text-gray-450 dark:text-gray-550" />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-xs font-bold text-gray-900 dark:text-white truncate">{msg.file.name}</span>
                  <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">{msg.file.size}</span>
                </div>
              </div>
            )}

            {/* Time + status */}
            <div className={`flex items-center gap-1 text-[10px] font-semibold text-gray-400 dark:text-gray-600 ${msg.type === "sent" ? "flex-row-reverse" : ""}`}>
              <span>{msg.time}</span>
              {msg.status === "read" && <span className="text-[#0FAF7A]">✓✓</span>}
              {msg.status === "sent" && <span className="text-gray-300 dark:text-gray-600">✓✓</span>}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Message Input Bar */}
      <div className="flex items-center gap-3 px-7 py-4 border-t border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">
        {/* Emoji */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 transition-colors flex-shrink-0">
          <HiOutlineFaceSmile className="text-xl" />
        </button>

        {/* Attachment */}
        <div className="relative flex-shrink-0" ref={attachRef}>
          <button
            onClick={() => setAttachMenu((p) => !p)}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors flex-shrink-0 ${attachMenu
              ? "bg-[#0FAF7A] text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500"
              }`}
          >
            <HiOutlinePaperClip className="text-xl" />
          </button>

          {/* Attach popup */}
          {attachMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg z-50 py-1.5 overflow-hidden">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-55 dark:hover:bg-gray-850 transition-colors"
              >
                <HiOutlinePhoto className="text-base text-[#0FAF7A]" />
                Photo or Video
              </button>
              <button
                onClick={() => docInputRef.current?.click()}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-55 dark:hover:bg-gray-850 transition-colors"
              >
                <HiOutlineDocument className="text-base text-blue-500" />
                Document
              </button>
            </div>
          )}

          {/* Hidden file inputs */}
          <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={onImageChange} />
          <input ref={docInputRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip" className="hidden" onChange={onDocChange} />
        </div>

        {/* Text input */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") sendText(); }}
          placeholder="Write message here..."
          className="flex-1 h-10 px-4 text-xs font-semibold text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-gray-55/20 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 rounded-xl outline-none"
        />

        {/* Send / Mic */}
        {input.trim() ? (
          <button
            onClick={sendText}
            className="w-10 h-10 rounded-full bg-[#0FAF7A] flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <HiOutlinePaperAirplane className="text-lg -rotate-45" />
          </button>
        ) : (
          <button
            onClick={() => sendAudio("00:05")}
            className="w-10 h-10 rounded-full bg-[#0FAF7A] flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <HiMicrophone className="text-lg" />
          </button>
        )}
      </div>
    </div>
  );
}
