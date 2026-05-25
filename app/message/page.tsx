"use client";

import * as React from "react";
import { RightChatPanel } from "./right-chat-panel";
import { ConversationList } from "./conversation-list";
import { ChatTabs } from "./chat-tabs";
import { ChatSearch } from "./chat-search";

/* ─── Types ─── */
export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  initials?: string;
  accentBg?: string;
  preview: string;
  time: string;
  unread: number;
  online: boolean;
  isYou?: boolean;
}

export type MessageType = "sent" | "received";
export interface Message {
  id: string;
  type: MessageType;
  text?: string;
  time: string;
  audio?: boolean;
  audioDuration?: string;
  image?: string;
  imageCaption?: string;
  reactions?: string[];
  status?: "sent" | "read";
  file?: { name: string; size: string };
}

/* ─── Data ─── */
const CONVERSATIONS: Conversation[] = [
  { id: "1", name: "Davis Rosser", avatar: "https://i.pravatar.cc/150?u=davis", preview: "Sure! let me tell you about what w...", time: "2m Ago", unread: 2, online: true },
  { id: "2", name: "Emerson Levin", avatar: "https://i.pravatar.cc/150?u=emerson", preview: "You: Find out who is in charge of thi...", time: "2m Ago", unread: 0, online: false, isYou: true },
  { id: "3", name: "Lydia Franci", avatar: "https://i.pravatar.cc/150?u=lydia", preview: "You: Sure! let me tell you about w...", time: "2m Ago", unread: 0, online: false, isYou: true },
  { id: "4", name: "Miracle Botosh", avatar: "", initials: "MB", accentBg: "bg-teal-500", preview: "You: Sure! let me tell you about w...", time: "2m Ago", unread: 0, online: true, isYou: true },
  { id: "5", name: "Zaire Mango", avatar: "https://i.pravatar.cc/150?u=zaire", preview: "Sure! let me tell you about what we can...", time: "2m Ago", unread: 0, online: true },
  { id: "6", name: "Ashlynn Bergson", avatar: "https://i.pravatar.cc/150?u=ashlynn", preview: "You: Sure! let me tell you about w...", time: "2m Ago", unread: 0, online: false, isYou: true },
  { id: "7", name: "Kierra Calzoni", avatar: "", initials: "KC", accentBg: "bg-indigo-500", preview: "Sure! let me tell you about what w...", time: "2m Ago", unread: 0, online: true },
];

const MARILYN: Conversation = {
  id: "m", name: "Marilyn George", avatar: "https://i.pravatar.cc/150?u=marilyn",
  preview: "", time: "", unread: 0, online: false,
};

const INITIAL_MESSAGES: Message[] = [
  { id: "1", type: "sent", text: "Hello Marilyn! consectetur adipiscing elit ames.", time: "09:10", status: "read" },
  { id: "2", type: "received", text: "Fames eros urna, felis morbi a est est.", time: "09:40", reactions: ["😍", "😍", "❤️", "👍", "🍊"] },
  { id: "3", type: "received", audio: true, audioDuration: "00:24", time: "09:40" },
  { id: "4", type: "sent", text: "How confident are we on presenting this?", time: "09:50", status: "read" },
  { id: "5", type: "received", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80", imageCaption: "Find out who is in charge of this portion of the process.", time: "10:00", reactions: ["😍"] },
];

/* ─── Helpers ─── */

function getNow() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/* ─── Main Component ─── */
export default function MessagePage() {
  const [tab, setTab] = React.useState<"all" | "unread">("all");
  const [search, setSearch] = React.useState("");
  const [active, setActive] = React.useState<string | null>("1");
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES);

  const activeConv = CONVERSATIONS.find((c) => c.id === active) || MARILYN;

  const conversations = CONVERSATIONS.filter((c) => {
    if (tab === "unread" && c.unread === 0) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sendText = () => {
    if (!input.trim()) return;
    const msg: Message = {
      id: `sent-${Date.now()}`,
      type: "sent",
      text: input.trim(),
      time: getNow(),
      status: "sent",
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const msg: Message = {
      id: `img-${Date.now()}`,
      type: "sent",
      image: url,
      imageCaption: file.name,
      time: getNow(),
      status: "sent",
    };
    setMessages((prev) => [...prev, msg]);
    e.target.value = "";
  };

  const handleDocAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeStr = file.size < 1024 ? `${file.size} B` : file.size < 1048576 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / 1048576).toFixed(1)} MB`;
    const msg: Message = {
      id: `doc-${Date.now()}`,
      type: "sent",
      file: { name: file.name, size: sizeStr },
      time: getNow(),
      status: "sent",
    };
    setMessages((prev) => [...prev, msg]);
    e.target.value = "";
  };

  return (
    <div className="flex h-[calc(100vh-70px)] md:h-[calc(100vh-80px)] bg-[#FAFCFF] dark:bg-gray-950 overflow-hidden">

      {/* ── Left Panel ── */}
      <div className={`flex-shrink-0 flex flex-col border-r border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 ${active ? "hidden md:flex w-[340px]" : "w-full md:w-[340px] md:flex"}`}>
        {/* Search */}
        <ChatSearch
          value={search}
          onChange={setSearch}
        />

        {/* Tabs */}
        <ChatTabs
          activeTab={tab}
          setActiveTab={setTab}
        />

        {/* Conversation List */}
        <ConversationList
          conversations={conversations}
          active={active}
          setActive={setActive}
        />
      </div>

      {/* ── Right Chat Panel ── */}
      <RightChatPanel
        active={active}
        activeConv={activeConv}
        messages={messages}
        input={input}
        setInput={setInput}
        sendText={sendText}
        onBack={() => setActive(null)}
        handleImageAttach={handleImageAttach}
        handleDocAttach={handleDocAttach}
      />
    </div>
  );
}
