"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquare, Users, Star, AlertCircle, Bot, Briefcase, UserCircle, FileText } from "lucide-react";

// tomiwa: Thread type icon component
const ThreadTypeIcon = ({ type }) => {
  const iconMap = {
    discussion: { icon: MessageSquare, color: "text-primary-500", bg: "bg-primary-50" },
    notes: { icon: FileText, color: "text-purple-500", bg: "bg-purple-50" },
    team: { icon: Users, color: "text-secondary-500", bg: "bg-secondary-50" },
    priority: { icon: Star, color: "text-yellow-500", bg: "bg-yellow-50" },
    alert: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
  };

  const { icon: Icon, color, bg } = iconMap[type] || iconMap.discussion;

  return (
    <div className={`p-2 rounded-lg ${bg}`}>
      <Icon className={`h-6 w-6 ${color}`} />
    </div>
  );
};

// tomiwa: Participant avatar group component
const ParticipantAvatars = ({ participants }) => {
  return (
    <div className="flex -space-x-2">
      {participants.slice(0, 3).map((participant, index) => (
        <div key={participant.id} className="relative">
          <Image
            src={participant.avatar}
            alt={participant.name}
            width={24}
            height={24}
            className="rounded-full border-2 border-white"
          />
          {participant.role && (
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 border-2 border-white rounded-full" />
          )}
        </div>
      ))}
      {participants.length > 3 && (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 border-2 border-white">
          <span className="text-xs text-neutral-600">+{participants.length - 3}</span>
        </div>
      )}
    </div>
  );
};

// tomiwa: AI summary component
const AISummary = ({ summary }) => {
  return (
    <div className="flex items-start space-x-2 p-2 bg-neutral-50 rounded-lg">
      <Bot className="h-4 w-4 text-primary-500 mt-0.5" />
      <p className="text-xs text-neutral-600">{summary}</p>
    </div>
  );
};

// tomiwa: TeamChat component for internal team collaboration
export default function TeamChat({ conversations, onSelectThread, selectedId }) {
  const filters = [
    { id: "all", label: "All Teams", icon: Users },
    { id: "hiring", label: "Hiring Managers", icon: Briefcase },
    { id: "recruiters", label: "Recruiters", icon: UserCircle },
    { id: "ai", label: "AI Insights", icon: Bot },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Team Filters */}
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
            <button
                key={filter.id}
                className="flex items-center px-3 py-1.5 text-sm font-medium bg-neutral-100 text-neutral-600 rounded-full whitespace-nowrap hover:bg-neutral-200"
            >
                <Icon className="h-4 w-4 mr-1.5" />
                {filter.label}
            </button>
            );
          })}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((thread) => (
          <motion.button
            key={thread.id}
            onClick={() => onSelectThread(thread)}
            className={`w-full p-4 flex items-start space-x-4 hover:bg-neutral-50 transition-colors border-b ${
              selectedId === thread.id ? "bg-neutral-100" : ""
            }`}
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            {/* Thread Icon */}
            <ThreadTypeIcon type={thread.type} />

            {/* Thread Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                <h4 className="font-medium text-neutral-900 truncate">
                  {thread.title}
                </h4>
                  {thread.unread > 0 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-primary-50 text-primary-600 font-medium">
                      {thread.unread} new
                    </span>
                  )}
                </div>
                <span className="text-sm text-neutral-500">{thread.time}</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <ParticipantAvatars participants={thread.participants} />
              <div className="flex items-center space-x-2">
                {thread.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
                </div>
              </div>

              <p className="text-sm text-neutral-600 truncate mb-3">
                {thread.lastMessage}
              </p>

              {/* Related Candidates */}
              {thread.relatedCandidates && thread.relatedCandidates.length > 0 && (
                <div className="flex items-center space-x-2 mb-3">
                  <UserCircle className="h-4 w-4 text-neutral-400" />
                  <p className="text-xs text-neutral-500">
                    Discussing: {thread.relatedCandidates.join(", ")}
                  </p>
                </div>
              )}

              {/* AI Summary */}
              {thread.aiSummary && <AISummary summary={thread.aiSummary} />}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}