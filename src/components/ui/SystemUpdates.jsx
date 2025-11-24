"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Clock, Calendar, FileText, Bot, Bell, Filter, ChevronRight } from "lucide-react";
import ReviewResultsModal from "./modals/ReviewResultsModal";
import ScheduleInterviewModal from "./modals/ScheduleInterviewModal";
import SendReminderModal from "./modals/SendReminderModal";
import MarkInactiveModal from "./modals/MarkInactiveModal";

// tomiwa: AI recommendation component
const AIRecommendation = ({ recommendation }) => {
  return (
    <div className="mt-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
      <div className="flex items-start space-x-2">
        <Bot className="h-4 w-4 text-primary-500 mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-neutral-600">{recommendation}</p>
        </div>
      </div>
    </div>
  );
};

// tomiwa: Update type badge component
const UpdateTypeBadge = ({ type }) => {
  const typeStyles = {
    success: "bg-green-50 text-green-600 border-green-200",
    warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
    reminder: "bg-blue-50 text-blue-600 border-blue-200",
    schedule: "bg-purple-50 text-purple-600 border-purple-200",
    info: "bg-neutral-50 text-neutral-600 border-neutral-200",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium border ${typeStyles[type] || typeStyles.info}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

// tomiwa: SystemUpdates component for automated notifications and updates
export default function SystemUpdates({ updates, onSelectUpdate }) {
  const [activeFilter, setActiveFilter] = useState("All Updates");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  // tomiwa: Helper function to get icon based on update type
  const getUpdateIcon = (type) => {
    const iconMap = {
      success: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
      warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50" },
      reminder: { icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
      schedule: { icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
      info: { icon: FileText, color: "text-neutral-500", bg: "bg-neutral-50" },
    };

    const { icon: Icon, color, bg } = iconMap[type] || iconMap.info;
    return (
      <div className={`p-2 rounded-lg ${bg}`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
    );
  };

  // tomiwa: Handle action button clicks
  const handleActionClick = (action, update) => {
    setSelectedUpdate(update);
    switch (action.label) {
      case "View Results":
        setShowReviewModal(true);
        break;
      case "Schedule Interview":
        setShowScheduleModal(true);
        break;
      case "Send Reminder":
        setShowReminderModal(true);
        break;
      case "Mark as Inactive":
        setShowInactiveModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Filters */}
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-neutral-400" />
            <h2 className="text-lg font-medium text-neutral-900">System Updates</h2>
          </div>
          <button className="flex items-center px-3 py-1.5 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-full hover:bg-neutral-200">
            <Filter className="h-4 w-4 mr-1.5" />
            Filter
          </button>
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {["All Updates", "Assessments", "Interviews", "Offers", "AI Insights"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Updates List */}
      <div className="flex-1 overflow-y-auto">
        {updates.map((dateGroup) => (
          <div key={dateGroup.date} className="border-b">
            <div className="p-4 bg-neutral-50 sticky top-0 z-10">
              <h3 className="font-medium text-neutral-900">{dateGroup.date}</h3>
            </div>

            <div className="divide-y">
              {dateGroup.items.map((update) => (
                <motion.div
                  key={update.id}
                  className="p-4 hover:bg-neutral-50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.005 }}
                  onClick={() => onSelectUpdate?.(update)}
                >
                  <div className="flex items-start space-x-4">
                    {/* Update Icon */}
                    <div className="flex-shrink-0">
                      {getUpdateIcon(update.type)}
                    </div>

                    {/* Update Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-neutral-900">
                            {update.title}
                          </h4>
                          <UpdateTypeBadge type={update.type} />
                        </div>
                        <span className="text-xs text-neutral-500 whitespace-nowrap ml-4">
                          {update.time}
                        </span>
                      </div>

                      <p className="text-sm text-neutral-600 mb-3">
                        {update.description}
                      </p>

                      {/* Related Items */}
                      {update.relatedItems && (
                        <div className="flex items-center space-x-2 mb-3">
                          {update.relatedItems.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* AI Recommendation */}
                      {update.aiRecommendation && (
                        <AIRecommendation recommendation={update.aiRecommendation} />
                      )}

                      {/* Action Buttons */}
                      {update.actions && update.actions.length > 0 && (
                        <div className="mt-3 flex items-center space-x-2">
                          {update.actions.map((action) => (
                            <button
                              key={action.label}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActionClick(action, update);
                              }}
                              className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors"
                            >
                              {action.label}
                              <ChevronRight className="h-4 w-4 ml-1.5" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <ReviewResultsModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        result={selectedUpdate}
      />
      <ScheduleInterviewModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        candidate={selectedUpdate}
      />
      <SendReminderModal
        isOpen={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        candidate={selectedUpdate}
      />
      <MarkInactiveModal
        isOpen={showInactiveModal}
        onClose={() => setShowInactiveModal(false)}
        candidate={selectedUpdate}
      />
    </div>
  );
}