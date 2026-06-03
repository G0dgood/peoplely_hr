"use client";

import * as React from "react";
import { RightChatPanel } from "./right-chat-panel";
import { ConversationList } from "./conversation-list";
import { ChatTabs } from "./chat-tabs";
import { ChatSearch } from "./chat-search";
import { useSocket } from "@/store/socket-context";
import { useAppSelector } from "@/store/hooks";
import { useGetConversationsQuery, useGetMessagesQuery } from "@/store/services/messageApi";
import { useGetEmployeesQuery } from "@/store/services/employeesApi";

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
  senderId?: string;
}

/* ─── Helpers ─── */

function getNow() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/* ─── Main Component ─── */
export default function MessagePage() {
  const [tab, setTab] = React.useState<"all" | "unread">("all");
  const [search, setSearch] = React.useState("");
  const [active, setActive] = React.useState<string | null>(null);
  const [input, setInput] = React.useState("");

  const { socket } = useSocket();
  const user = useAppSelector((state) => state.auth.user);

  const { data: convData, isLoading: isLoadingConvs } = useGetConversationsQuery(user?.id || "", {
    skip: !user?.id,
  });

  const { data: empData } = useGetEmployeesQuery({ companyId: user?.companyId }, {
    skip: !user?.companyId,
  });

  const { data: msgData, isLoading: isLoadingMsgs } = useGetMessagesQuery(active || "", {
    skip: !active,
  });

  const [socketMessages, setSocketMessages] = React.useState<Message[]>([]);

  // Combine fetched messages with socket messages
  const messages = React.useMemo(() => {
    const fetched = msgData?.messages || [];
    // Only include socket messages that aren't already in fetched messages
    const filteredSocket = socketMessages.filter(
      (sm) => !fetched.some((fm) => fm.id === sm.id)
    );
    return [...fetched, ...filteredSocket];
  }, [msgData?.messages, socketMessages]);

  React.useEffect(() => {
    if (!socket || !active) return;

    // Join the conversation room
    socket.emit("join_conversation", active);

    // Listen for incoming messages
    const handleReceiveMessage = (msg: Message & { conversationId: string }) => {
      if (msg.conversationId === active) {
        setSocketMessages((prev) => {
          // Check if message already exists to avoid duplicates
          if (prev.find((m) => m.id === msg.id)) return prev;

          // Determine if message was sent by current user or received
          const type: MessageType = msg.senderId === user?.id ? "sent" : "received";
          return [...prev, { ...msg, type }];
        });
      }
    };

    const handleReceiveReaction = (data: { messageId: string, reaction: string, conversationId: string }) => {
      if (data.conversationId === active) {
        setSocketMessages((prev) => prev.map((m) => {
          if (m.id === data.messageId) {
            const reactions = m.reactions || [];
            if (reactions.includes(data.reaction)) {
              return { ...m, reactions: reactions.filter((r) => r !== data.reaction) };
            } else {
              return { ...m, reactions: [...reactions, data.reaction] };
            }
          }
          return m;
        }));
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("receive_reaction", handleReceiveReaction);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("receive_reaction", handleReceiveReaction);
    };
  }, [socket, active, user?.id]);

  const conversations = React.useMemo(() => {
    const apiConvs = convData?.conversations || [];
    const employees = empData?.employees || [];

    // Map employees to Conversation objects if they aren't already in apiConvs
    const employeeConvs: Conversation[] = employees
      .filter((emp) => emp.id !== user?.id && !apiConvs.some((c) => c.id === emp.id))
      .map((emp) => ({
        id: emp.id,
        name: emp.name,
        avatar: emp.avatar || "",
        preview: "Start a new conversation",
        time: "",
        unread: 0,
        online: false, // You could link this to real socket status later
        initials: emp.name.split(" ").map((n) => n[0]).join("").toUpperCase(),
        accentBg: "bg-emerald-500",
      }));

    return [...apiConvs, ...employeeConvs].filter((c) => {
      if (tab === "unread" && c.unread === 0) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [convData?.conversations, empData?.employees, tab, search, user?.id]);

  const activeConv = conversations.find((c) => c.id === active) || null;

  const sendText = () => {
    if (!input.trim() || !active) return;

    const msg: Message & { conversationId: string } = {
      id: `sent-${Date.now()}`,
      type: "sent",
      text: input.trim(),
      time: getNow(),
      status: "sent",
      conversationId: active,
      senderId: user?.id,
    };

    // Optimistically add to local state
    setSocketMessages((prev) => [...prev, msg]);

    // Emit to socket
    if (socket) {
      socket.emit("send_message", msg);
    }

    setInput("");
  };

  const toggleReaction = (messageId: string, reaction: string) => {
    if (!active) return;

    const data = { messageId, reaction, conversationId: active, userId: user?.id };

    // Optimistically update local state
    setSocketMessages((prev) => prev.map((m) => {
      if (m.id === messageId) {
        const reactions = m.reactions || [];
        if (reactions.includes(reaction)) {
          return { ...m, reactions: reactions.filter((r) => r !== reaction) };
        } else {
          return { ...m, reactions: [...reactions, reaction] };
        }
      }
      return m;
    }));

    if (socket) {
      socket.emit("toggle_reaction", data);
    }
  };

  const sendAudio = (duration: string) => {
    if (!active) return;

    const msg: Message & { conversationId: string } = {
      id: `audio-${Date.now()}`,
      type: "sent",
      audio: true,
      audioDuration: duration,
      time: getNow(),
      status: "sent",
      conversationId: active,
      senderId: user?.id,
    };

    setSocketMessages((prev) => [...prev, msg]);
    if (socket) {
      socket.emit("send_message", msg);
    }
  };

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !active) return;

    const caption = prompt("Enter a caption for the image (optional):") || "";

    const url = URL.createObjectURL(file);
    const msg: Message & { conversationId: string } = {
      id: `img-${Date.now()}`,
      type: "sent",
      image: url,
      imageCaption: caption,
      time: getNow(),
      status: "sent",
      conversationId: active,
      senderId: user?.id,
    };
    setSocketMessages((prev) => [...prev, msg]);

    if (socket) {
      socket.emit("send_message", msg);
    }

    e.target.value = "";
  };

  const handleDocAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !active) return;
    const sizeStr = file.size < 1024 ? `${file.size} B` : file.size < 1048576 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / 1048576).toFixed(1)} MB`;
    const msg: Message & { conversationId: string } = {
      id: `doc-${Date.now()}`,
      type: "sent",
      file: { name: file.name, size: sizeStr },
      time: getNow(),
      status: "sent",
      conversationId: active,
      senderId: user?.id,
    };
    setSocketMessages((prev) => [...prev, msg]);

    if (socket) {
      socket.emit("send_message", msg);
    }

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
      {activeConv ? (
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
          sendAudio={sendAudio}
          toggleReaction={toggleReaction}
        />
      ) : (
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
      )}
    </div>
  );
}
