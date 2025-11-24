"use client";

import { MessageSquare, Users, Bell } from "lucide-react";

// tomiwa: TabsNavigation component for switching between different message views
export default function TabsNavigation({ activeTab, setActiveTab, unreadCounts }) {
  const tabs = [
    {
      id: "candidates",
      label: "Candidates",
      icon: MessageSquare,
      unread: unreadCounts.candidates,
    },
    {
      id: "team",
      label: "Team",
      icon: Users,
      unread: unreadCounts.team,
    },
    {
      id: "system",
      label: "System",
      icon: Bell,
      unread: unreadCounts.system,
    },
  ];

  return (
    <div className="flex space-x-1 border-b border-neutral-200">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
              ${
                isActive
                  ? "text-primary-500 bg-white border-b-2 border-primary-500"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              }
            `}
          >
            <Icon className="h-4 w-4 mr-2" />
            {tab.label}
            {tab.unread > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-primary-50 text-primary-600 rounded-full">
                {tab.unread}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}