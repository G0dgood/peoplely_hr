"use client";

import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineEllipsisVertical,
  HiOutlineFaceSmile,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { HiMicrophone } from "react-icons/hi";

/* ─── Types ─── */
interface Conversation {
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

type MessageType = "sent" | "received";
interface Message {
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
}

/* ─── Data ─── */
const CONVERSATIONS: Conversation[] = [
  { id: "1", name: "Davis Rosser",    avatar: "https://i.pravatar.cc/150?u=davis",    preview: "Sure! let me tell you about what w...", time: "2m Ago", unread: 2, online: true  },
  { id: "2", name: "Emerson Levin",   avatar: "https://i.pravatar.cc/150?u=emerson",  preview: "You: Find out who is in charge of thi...", time: "2m Ago", unread: 0, online: false, isYou: true },
  { id: "3", name: "Lydia Franci",    avatar: "https://i.pravatar.cc/150?u=lydia",    preview: "You: Sure! let me tell you about w...", time: "2m Ago", unread: 0, online: false, isYou: true },
  { id: "4", name: "Miracle Botosh",  avatar: "", initials: "MB", accentBg: "bg-teal-500", preview: "You: Sure! let me tell you about w...", time: "2m Ago", unread: 0, online: true,  isYou: true },
  { id: "5", name: "Zaire Mango",     avatar: "https://i.pravatar.cc/150?u=zaire",    preview: "Sure! let me tell you about what we can...", time: "2m Ago", unread: 0, online: true  },
  { id: "6", name: "Ashlynn Bergson", avatar: "https://i.pravatar.cc/150?u=ashlynn",  preview: "You: Sure! let me tell you about w...", time: "2m Ago", unread: 0, online: false, isYou: true },
  { id: "7", name: "Kierra Calzoni",  avatar: "", initials: "KC", accentBg: "bg-indigo-500", preview: "Sure! let me tell you about what w...", time: "2m Ago", unread: 0, online: true  },
];

const MARILYN: Conversation = {
  id: "m", name: "Marilyn George", avatar: "https://i.pravatar.cc/150?u=marilyn",
  preview: "", time: "", unread: 0, online: false,
};

const MESSAGES: Message[] = [
  { id: "1", type: "sent",     text: "Hello Marilyn! consectetur adipiscing elit ames.", time: "09:10", status: "read" },
  { id: "2", type: "received", text: "Fames eros urna, felis morbi a est est.",           time: "09:40", reactions: ["😍","😍","❤️","👍","🍊"] },
  { id: "3", type: "received", audio: true, audioDuration: "00:24",                        time: "09:40" },
  { id: "4", type: "sent",     text: "How confident are we on presenting this?",           time: "09:50", status: "read" },
  { id: "5", type: "received", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80", imageCaption: "Find out who is in charge of this portion of the process.", time: "10:00", reactions: ["😍"] },
];

/* ─── Helpers ─── */
function OnlineDot({ online }: { online: boolean }) {
  return online ? (
    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#0FAF7A] border-2 border-white dark:border-gray-900" />
  ) : null;
}

function AvatarOrInitials({ conv, size = "md" }: { conv: Conversation; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-9 h-9 text-xs" : "w-11 h-11 text-sm";
  if (conv.initials) {
    return (
      <div className={`${dim} ${conv.accentBg} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
        {conv.initials}
      </div>
    );
  }
  return <Avatar src={conv.avatar} size={size === "sm" ? "sm" : "sm"} className="rounded-full flex-shrink-0" />;
}

/* ─── Main Component ─── */
export default function MessagePage() {
  const [tab, setTab]           = React.useState<"all" | "unread">("all");
  const [search, setSearch]     = React.useState("");
  const [active, setActive]     = React.useState("1");
  const [input, setInput]       = React.useState("");
  const bottomRef               = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const conversations = CONVERSATIONS.filter((c) => {
    if (tab === "unread" && c.unread === 0) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeConv = active === "m" ? MARILYN : (CONVERSATIONS.find((c) => c.id === active) ?? MARILYN);

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#FAFCFF] dark:bg-gray-950 overflow-hidden">

      {/* ── Left Panel ── */}
      <div className="w-[340px] flex-shrink-0 flex flex-col border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        {/* Search */}
        <div className="px-5 pt-6 pb-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search message..."
            leftIcon={<HiOutlineMagnifyingGlass className="text-sm" />}
            className="h-10 rounded-xl text-xs font-semibold bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-800 placeholder:text-gray-400"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-5 px-5 pb-3 border-b border-gray-50 dark:border-gray-800">
          {(["all", "unread"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-xs font-bold pb-2 border-b-2 transition-colors capitalize ${
                tab === t
                  ? "text-primary border-primary"
                  : "text-gray-400 dark:text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {t === "all" ? "All" : "Unread"}
            </button>
          ))}
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActive(conv.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left ${
                active === conv.id ? "bg-gray-50 dark:bg-gray-800/50" : ""
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <AvatarOrInitials conv={conv} />
                <OnlineDot online={conv.online} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-xs font-bold text-gray-900 dark:text-white truncate">{conv.name}</span>
                  <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 flex-shrink-0">{conv.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 truncate">{conv.preview}</span>
                  {conv.unread > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                  {conv.unread === 0 && conv.isYou && (
                    <span className="text-gray-300 dark:text-gray-600 text-xs flex-shrink-0">✓✓</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Right Chat Panel ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-7 h-[72px] border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar src={MARILYN.avatar} size="sm" className="rounded-full" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{MARILYN.name}</p>
              <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">Last Seen 09:40</p>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 transition-colors">
            <HiOutlineEllipsisVertical className="text-lg" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-5 bg-[#FAFCFF] dark:bg-gray-950">
          {MESSAGES.map((msg) => (
            <div key={msg.id} className={`flex flex-col gap-1 max-w-sm ${msg.type === "sent" ? "self-end items-end" : "self-start items-start"}`}>

              {/* Text bubble */}
              {msg.text && (
                <div className={`px-4 py-3 rounded-2xl text-xs font-semibold leading-relaxed ${
                  msg.type === "sent"
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
                    <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </button>
                  <div className="flex items-center gap-0.5 h-6">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div key={i} className="w-0.5 bg-[#0FAF7A] rounded-full" style={{ height: `${Math.max(4, Math.sin(i * 0.7) * 14 + 14)}px`, opacity: i < 12 ? 1 : 0.3 }} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{msg.audioDuration}</span>
                </div>
              )}

              {/* Reactions */}
              {msg.reactions && (
                <div className="flex items-center gap-0.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full px-2 py-1 shadow-xs self-start">
                  {msg.reactions.map((r, i) => <span key={i} className="text-sm">{r}</span>)}
                </div>
              )}

              {/* Image */}
              {msg.image && (
                <div className="flex flex-col gap-1.5 max-w-[240px]">
                  <img src={msg.image} alt="attachment" className="rounded-2xl rounded-bl-sm object-cover w-full h-44 shadow-xs" />
                  {msg.imageCaption && (
                    <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">{msg.imageCaption}</p>
                  )}
                  {msg.reactions && (
                    <div className="flex items-center gap-0.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full px-2 py-1 shadow-xs self-start w-fit">
                      {msg.reactions.map((r, i) => <span key={i} className="text-sm">{r}</span>)}
                    </div>
                  )}
                </div>
              )}

              {/* Time + status */}
              <div className={`flex items-center gap-1 text-[10px] font-semibold text-gray-400 dark:text-gray-600 ${msg.type === "sent" ? "flex-row-reverse" : ""}`}>
                <span>{msg.time}</span>
                {msg.status === "read" && <span className="text-[#0FAF7A]">✓✓</span>}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Message Input */}
        <div className="flex items-center gap-4 px-7 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 transition-colors flex-shrink-0">
            <HiOutlineFaceSmile className="text-xl" />
          </button>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) setInput(""); }}
            placeholder="Write message here..."
            className="h-10 border-none bg-transparent shadow-none text-xs font-semibold text-gray-700 dark:text-gray-300 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:ring-0"
          />

          {input.trim() ? (
            <button
              onClick={() => setInput("")}
              className="w-10 h-10 rounded-full bg-[#0FAF7A] flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 transition-opacity"
            >
              <HiOutlinePaperAirplane className="text-lg rotate-45" />
            </button>
          ) : (
            <button className="w-10 h-10 rounded-full bg-[#0FAF7A] flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 transition-opacity">
              <HiMicrophone className="text-lg" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
