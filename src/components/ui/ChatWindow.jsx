"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Paperclip,
  Smile,
  Calendar,
  FileText,
  Clock,
  ChevronDown,
  Sparkles,
  X,
  Bot,
  Download,
  Share2,
  MessageSquare,
  Mail,
  Star,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// tomiwa: AI suggestion component
const AISuggestion = ({ suggestion, onApply, onDismiss }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 mb-4"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-2">
        <Bot className="h-4 w-4 text-primary-500" />
        <span className="text-sm font-medium text-neutral-900">AI Assistant</span>
      </div>
      <button
        onClick={onDismiss}
        className="text-neutral-400 hover:text-neutral-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
    <p className="mt-2 text-sm text-neutral-600">{suggestion.text}</p>
    {suggestion.context && (
      <p className="mt-1 text-xs text-neutral-500">{suggestion.context}</p>
    )}
    <div className="mt-3 flex items-center space-x-2">
      <button
        onClick={onApply}
        className="px-3 py-1.5 text-sm font-medium bg-primary-500 text-white rounded-md hover:bg-primary-600"
      >
        {suggestion.action || "Apply Suggestion"}
      </button>
      {suggestion.alternativeAction && (
        <button
          onClick={suggestion.alternativeAction.onClick}
          className="px-3 py-1.5 text-sm font-medium border border-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-50"
        >
          {suggestion.alternativeAction.label}
        </button>
      )}
    </div>
  </motion.div>
);

// tomiwa: AI action panel component
const AIActionPanel = ({ onAction }) => (
  <div className="p-4 bg-neutral-50 border-t">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        <Bot className="h-5 w-5 text-primary-500" />
        <h3 className="text-sm font-medium text-neutral-900">AI Assistant</h3>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <button
        onClick={() => onAction("summarize")}
        className="flex items-center space-x-2 p-2 text-sm text-neutral-700 bg-white rounded-md border border-neutral-200 hover:bg-neutral-50"
      >
        <MessageSquare className="h-4 w-4 text-neutral-500" />
        <span>Summarize Thread</span>
      </button>
      <button
        onClick={() => onAction("suggest")}
        className="flex items-center space-x-2 p-2 text-sm text-neutral-700 bg-white rounded-md border border-neutral-200 hover:bg-neutral-50"
      >
        <Sparkles className="h-4 w-4 text-neutral-500" />
        <span>Suggest Reply</span>
      </button>
      <button
        onClick={() => onAction("draft")}
        className="flex items-center space-x-2 p-2 text-sm text-neutral-700 bg-white rounded-md border border-neutral-200 hover:bg-neutral-50"
      >
        <Mail className="h-4 w-4 text-neutral-500" />
        <span>Draft Email</span>
      </button>
      <button
        onClick={() => onAction("analyze")}
        className="flex items-center space-x-2 p-2 text-sm text-neutral-700 bg-white rounded-md border border-neutral-200 hover:bg-neutral-50"
      >
        <Star className="h-4 w-4 text-neutral-500" />
        <span>Analyze Fit</span>
      </button>
    </div>
  </div>
);

// tomiwa: ChatWindow component with AI features and quick actions
export default function ChatWindow({
  candidate,
  teamThread,
  systemUpdate,
  messages,
  onSendMessage,
  onScheduleInterview,
  onSendAssessment,
}) {
  const [messageText, setMessageText] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([
    {
      text: "The candidate has strong frontend experience but hasn't mentioned backend skills. Consider asking about their backend knowledge.",
      context: "Based on conversation analysis",
      action: "Ask About Backend",
      alternativeAction: {
        label: "Send Assessment",
        onClick: onSendAssessment,
      },
    },
    {
      text: "Candidate hasn't responded in 48 hours. Send a follow-up?",
      context: "Last message sent: 2 days ago",
      action: "Send Follow-up",
    },
  ]);

  // tomiwa: Handle message submission
  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText("");
      // Clear any active AI suggestions
      setAiSuggestions(prevSuggestions => 
        prevSuggestions.filter(s => s.type === 'system')
      );
    }
  };

  // tomiwa: Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // tomiwa: Handle AI actions
  const handleAIAction = (action) => {
    switch (action) {
      case "summarize":
        // Handle conversation summary
        break;
      case "suggest":
        // Handle reply suggestions
        break;
      case "draft":
        // Handle email draft
        break;
      case "analyze":
        // Handle candidate analysis
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          {/* Candidate Header */}
          {candidate && (
            <>
              <div className="flex items-center space-x-4">
                <Image
                  src={candidate.avatar}
                  alt={candidate.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium text-neutral-900">{candidate.name}</h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-neutral-600">{candidate.role}</p>
                    <span className="text-sm text-neutral-500">•</span>
                    <p className="text-sm text-neutral-500">{candidate.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAIPanel(!showAIPanel)}
                  className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100"
                >
                  <Bot className="h-5 w-5" />
                </button>
                <button
                  onClick={onScheduleInterview}
                  className="flex items-center px-3 py-1.5 text-sm font-medium bg-primary-500 text-white rounded-md hover:bg-primary-600"
                >
                  <Calendar className="h-4 w-4 mr-1.5" />
                  Schedule Interview
                </button>
                <button
                  onClick={onSendAssessment}
                  className="flex items-center px-3 py-1.5 text-sm font-medium border border-neutral-200 rounded-md hover:bg-neutral-50"
                >
                  <FileText className="h-4 w-4 mr-1.5" />
                  Send Assessment
                </button>
              </div>
            </>
          )}

          {/* Team Thread Header */}
          {teamThread && (
            <>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {teamThread.participants.slice(0, 3).map((participant) => (
                    <Image
                      key={participant.id}
                      src={participant.avatar}
                      alt={participant.name}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">{teamThread.title}</h3>
                  <p className="text-sm text-neutral-600">
                    {teamThread.participants.length} participants
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAIPanel(!showAIPanel)}
                  className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100"
                >
                  <Bot className="h-5 w-5" />
                </button>
              </div>
            </>
          )}

          {/* System Update Header */}
          {systemUpdate && (
            <>
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  systemUpdate.type === 'success' ? 'bg-green-50' :
                  systemUpdate.type === 'warning' ? 'bg-yellow-50' :
                  'bg-blue-50'
                }`}>
                  {systemUpdate.type === 'success' ? <CheckCircle className="h-6 w-6 text-green-500" /> :
                   systemUpdate.type === 'warning' ? <AlertTriangle className="h-6 w-6 text-yellow-500" /> :
                   <Clock className="h-6 w-6 text-blue-500" />}
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">{systemUpdate.title}</h3>
                  <p className="text-sm text-neutral-600">{systemUpdate.time}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions - Only show for candidates */}
        {candidate && (
          <div className="mt-4 flex items-center space-x-2">
            <button className="flex items-center px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-md hover:bg-neutral-200">
              <Download className="h-4 w-4 mr-1.5" />
              Resume
            </button>
            <button className="flex items-center px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-md hover:bg-neutral-200">
              <Share2 className="h-4 w-4 mr-1.5" />
              Share Profile
            </button>
            <button className="flex items-center px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-md hover:bg-neutral-200">
              <Star className="h-4 w-4 mr-1.5" />
              Add Note
            </button>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* AI Suggestions */}
        <AnimatePresence>
          {aiSuggestions.map((suggestion, index) => (
            <AISuggestion
              key={index}
              suggestion={suggestion}
              onApply={() => {
                setMessageText(suggestion.text);
                setAiSuggestions(aiSuggestions.filter((_, i) => i !== index));
              }}
              onDismiss={() =>
                setAiSuggestions(aiSuggestions.filter((_, i) => i !== index))
              }
            />
          ))}
        </AnimatePresence>

        {/* System Update Content */}
        {systemUpdate && (
          <div className="space-y-4">
            {/* Initial Update Message */}
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  systemUpdate.type === 'success' ? 'bg-green-100' :
                  systemUpdate.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {systemUpdate.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-500" /> :
                   systemUpdate.type === 'warning' ? <AlertTriangle className="h-4 w-4 text-yellow-500" /> :
                   <Clock className="h-4 w-4 text-blue-500" />}
                </div>
              </div>
              <div className="flex-1 bg-neutral-100 rounded-lg p-3">
                <p className="text-sm font-medium text-neutral-900">{systemUpdate.description}</p>
                <span className="text-xs mt-1 block text-neutral-500">{systemUpdate.time}</span>
              </div>
            </div>

            {/* Related Items */}
            {systemUpdate.relatedItems && (
              <div className="flex items-start space-x-2">
                <div className="w-8 flex-shrink-0" />
                <div className="flex-1 flex flex-wrap gap-2">
                  {systemUpdate.relatedItems.map((item, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recommendation */}
            {systemUpdate.aiRecommendation && (
              <div className="flex items-start space-x-2">
                <div className="w-8 flex-shrink-0" />
                <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="h-4 w-4 text-primary-500" />
                    <span className="text-sm font-medium text-neutral-900">AI Recommendation</span>
                  </div>
                  <p className="text-sm text-neutral-600">{systemUpdate.aiRecommendation}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {systemUpdate.actions && systemUpdate.actions.length > 0 && (
              <div className="flex items-start space-x-2">
                <div className="w-8 flex-shrink-0" />
                <div className="flex-1 flex flex-wrap gap-2">
                  {systemUpdate.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => action.onClick?.()}
                      className="flex items-center px-3 py-1.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-md hover:bg-neutral-50"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Regular Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end space-x-2 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender !== "user" && (
              <div className="flex-shrink-0">
                {candidate && (
                  <Image
                    src={candidate.avatar}
                    alt={candidate.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                {teamThread && message.sender && (
                  <Image
                    src={message.sender.avatar}
                    alt={message.sender.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-brand-aqua text-white"
                  : "bg-neutral-100 text-neutral-900"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
              <span className="text-xs mt-1 block opacity-70">
                {message.time}
              </span>
            </div>
            {message.sender === "user" && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">You</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Action Panel */}
      {showAIPanel && <AIActionPanel onAction={handleAIAction} />}

      {/* Message Composer */}
      <div className="p-4 border-t bg-white">
        {/* Composer Input */}
        <div className="flex items-end space-x-4">
          <div className="flex-1 min-h-[100px] max-h-[200px] overflow-y-auto p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full h-full min-h-[80px] bg-transparent resize-none focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100"
            >
              <ChevronDown
                className={`h-5 w-5 transform transition-transform ${
                  showTemplates ? "rotate-180" : ""
                }`}
              />
            </button>
            <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100">
              <Paperclip className="h-5 w-5" />
            </button>
            <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100">
              <Smile className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100"
            >
              <Bot className="h-5 w-5" />
            </button>
            <button
              onClick={handleSend}
              className="p-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}