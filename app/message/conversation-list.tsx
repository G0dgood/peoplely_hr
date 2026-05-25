"use client";

import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Conversation } from "./page";

interface ConversationListProps {
  conversations: Conversation[];
  active: string | null;
  setActive: (id: string) => void;
}

function OnlineDot({ online }: { online: boolean }) {
  return online ? (
    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#0FAF7A] border-2 border-white dark:border-gray-900" />
  ) : null;
}

function AvatarOrInitials({ conv }: { conv: Conversation }) {
  if (conv.initials) {
    return (
      <div className={`w-11 h-11 ${conv.accentBg} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
        {conv.initials}
      </div>
    );
  }
  return <Avatar src={conv.avatar} size="sm" className="rounded-full flex-shrink-0" />;
}

export function ConversationList({
  conversations,
  active,
  setActive,
}: ConversationListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => setActive(conv.id)}
          className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-55 dark:hover:bg-gray-800/50 transition-colors text-left ${
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
              <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-550 flex-shrink-0">{conv.time}</span>
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
  );
}
