"use client";

import { useState } from "react";
import { Search, MessageSquare, Users, Bell, Send, Calendar, FileText, Share2, Download, Bot, Clock, Mail, Plus, UserPlus } from "lucide-react";
import TabsNavigation from "./TabsNavigation";
import CandidatesList from "./CandidatesList";
import TeamChat from "./TeamChat";
import SystemUpdates from "./SystemUpdates";
import ChatWindow from "./ChatWindow";
import CandidateDrawer from "./CandidateDrawer";

// tomiwa: Mock data for development
const mockData = {
  candidates: [
    {
      jobId: "1",
      jobTitle: "Senior Frontend Developer",
      candidates: [
        {
          id: "1",
          name: "John Doe",
          role: "Senior Frontend Developer",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
          lastMessage: "Thank you for considering my application. I'm very excited about the opportunity to join your team.",
          lastMessageTime: "2h ago",
          status: "Shortlisted",
          unread: true,
          experience: "8 years",
          location: "San Francisco, CA",
          skills: ["React", "TypeScript", "Node.js"],
          stage: "Technical Interview",
        },
        {
          id: "2",
          name: "Sarah Chen",
          role: "Senior Frontend Developer",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
          lastMessage: "I've completed the technical assessment and submitted it for review.",
          lastMessageTime: "1h ago",
          status: "New",
          unread: false,
          experience: "6 years",
          location: "New York, NY",
          skills: ["Vue.js", "JavaScript", "CSS"],
          stage: "Assessment",
        }
      ],
    },
    {
      jobId: "2",
      jobTitle: "Full Stack Developer",
      candidates: [
        {
          id: "3",
          name: "Michael Johnson",
          role: "Full Stack Developer",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
          lastMessage: "When would be a good time to schedule the technical interview?",
          lastMessageTime: "3h ago",
          status: "Interview Scheduled",
          unread: true,
          experience: "5 years",
          location: "Austin, TX",
          skills: ["React", "Node.js", "MongoDB"],
          stage: "First Interview",
        }
      ],
    }
  ],
  team: [
    {
      id: "1",
      type: "discussion",
      title: "Frontend Team Hiring Sync",
      participants: [
        {
          id: "1",
          name: "Sarah Miller",
          role: "Hiring Manager",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
        },
        {
          id: "2",
          name: "Mike Chen",
          role: "Tech Lead",
          avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
        }
      ],
      lastMessage: "Let's review John's technical assessment results and schedule the next round.",
      time: "1h ago",
      tags: ["Frontend", "Hiring"],
      unread: 2,
      relatedCandidates: ["John Doe"],
      aiSummary: "Action items: Schedule technical interview with John, Review Sarah's assessment results"
    },
    {
      id: "2",
      type: "notes",
      title: "Full Stack Position Discussion",
      participants: [
        {
          id: "3",
          name: "Jessica Park",
          role: "Recruiter",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
        }
      ],
      lastMessage: "Michael shows strong backend skills but needs assessment in frontend capabilities.",
      time: "2h ago",
      tags: ["Full Stack", "Hiring"],
      unread: 1,
      relatedCandidates: ["Michael Johnson"],
      aiSummary: "Focus areas: Frontend skills assessment, System design discussion"
    }
  ],
  system: [
    {
      date: "Today",
      items: [
        {
          id: "1",
          type: "success",
          title: "Assessment Completed",
          description: "Sarah Chen completed the technical assessment with a score of 92%",
          time: "30m ago",
          actions: [
            { label: "View Results", onClick: () => {} },
            { label: "Schedule Interview", onClick: () => {} }
          ],
          relatedItems: [
            "Frontend Developer Position",
            "Technical Assessment",
            "React & TypeScript",
            "System Design",
            "Algorithm Challenges"
          ],
          aiRecommendation: "Based on the assessment results, Sarah Chen demonstrates exceptional frontend development skills. Key strengths:\n\n• React/TypeScript proficiency: 95%\n• System design concepts: 90%\n• Algorithm problem-solving: 92%\n• Code quality & best practices: 94%\n\nRecommendation: Schedule technical interview within the next 48 hours to maintain candidate engagement. Focus areas for interview:\n1. Advanced React patterns\n2. State management approaches\n3. Performance optimization\n\nOverall: Strong candidate with high potential for the Frontend Developer role.",
          details: {
            assessmentBreakdown: [
              { category: "React/TypeScript", score: 95 },
              { category: "System Design", score: 90 },
              { category: "Algorithms", score: 92 },
              { category: "Code Quality", score: 94 }
            ],
            completionTime: "1h 45m",
            totalQuestions: 25,
            correctAnswers: 23
          }
        },
        {
          id: "2",
          type: "reminder",
          title: "Follow-up Required",
          description: "No response from John Doe for 48 hours regarding the technical interview invitation",
          time: "1h ago",
          actions: [
            { label: "Send Reminder", onClick: () => {} },
            { label: "Mark as Inactive", onClick: () => {} }
          ],
          relatedItems: [
            "Frontend Developer Position",
            "Interview Process",
            "Technical Round",
            "Pending Response"
          ],
          aiRecommendation: "Analysis of candidate engagement:\n\n• Last interaction: 48 hours ago\n• Previous response rate: High (avg. 4 hours)\n• Candidate status: Active in other applications\n\nRecommended action:\n1. Send a gentle follow-up reminder\n2. Include flexible scheduling options\n3. Mention continued interest in their application\n\nDraft message template attached for your review.",
          details: {
            lastContact: "2023-09-23 14:30",
            previousInteractions: 5,
            averageResponseTime: "4 hours",
            interviewType: "Technical Discussion",
            proposedTimes: [
              "2023-09-26 10:00",
              "2023-09-26 14:00",
              "2023-09-27 11:00"
            ]
          }
        },
        {
          id: "3",
          type: "info",
          title: "Profile Updated",
          description: "Michael Wilson has updated their portfolio and skills",
          time: "2h ago",
          actions: [
            { label: "View Changes", onClick: () => {} },
            { label: "Update Assessment", onClick: () => {} }
          ],
          relatedItems: [
            "Full Stack Position",
            "Portfolio Update",
            "Skills Assessment",
            "Experience Update"
          ],
          aiRecommendation: "Notable updates in Michael's profile:\n\n• Added new project: E-commerce platform (React, Node.js)\n• Updated skills: Added AWS, Docker expertise\n• New certification: AWS Solutions Architect\n\nImpact Analysis:\n- Skills better align with Full Stack requirements\n- Cloud expertise adds significant value\n- Recent project demonstrates relevant experience\n\nRecommendation: Re-evaluate candidate for senior role consideration.",
          details: {
            updatedSections: [
              "Technical Skills",
              "Work Experience",
              "Projects",
              "Certifications"
            ],
            newSkills: [
              "AWS",
              "Docker",
              "Kubernetes",
              "Microservices"
            ],
            experienceYears: 6,
            lastPositions: [
              "Senior Developer at TechCorp",
              "Full Stack Engineer at StartupX"
            ]
          }
        }
      ]
    }
  ],
  messageTemplates: [
    {
      id: "interview_invite",
      title: "Interview Invitation",
      content: "Hi [name], Thank you for your interest in the [role] position. We'd love to schedule a technical interview with you. Could you please provide your availability for next week?",
    },
    {
      id: "assessment",
      title: "Technical Assessment",
      content: "Hi [name], As the next step in our process, we'd like you to complete a technical assessment. You'll have 48 hours to complete it once started. Would you be ready to begin?",
    },
    {
      id: "offer",
      title: "Offer Letter",
      content: "Hi [name], We're excited to offer you the position of [role] at our company! I'll be sending the official offer letter shortly. Would you have time for a quick call to discuss the details?",
    }
  ]
};

// tomiwa: Main MessagingModule component
export default function MessagingModule() {
  const [activeTab, setActiveTab] = useState("candidates");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedTeamThread, setSelectedTeamThread] = useState(null);
  const [selectedSystemUpdate, setSelectedSystemUpdate] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);

  // tomiwa: Handle message sending
  const handleSendMessage = (message) => {
    if (!message.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: Date.now(),
        content: message,
        sender: "user",
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setInputMessage(""); // Clear input after sending
  };

  // tomiwa: Get system update messages
  const getSystemUpdateMessages = (update) => {
    if (!update) return [];
    
    const messages = [
      {
        id: `${update.id}-main`,
        content: update.description,
        time: update.time,
        type: update.type,
        sender: "system"
      }
    ];

    // Add related items message if present
    if (update.relatedItems?.length > 0) {
      messages.push({
        id: `${update.id}-related`,
        content: "Related Items:\n• " + update.relatedItems.join("\n• "),
        time: update.time,
        type: "info",
        sender: "system"
      });
    }

    // Add details if present
    if (update.details) {
      let detailsContent = "";

      // Assessment details
      if (update.details.assessmentBreakdown) {
        detailsContent += "Assessment Results:\n";
        update.details.assessmentBreakdown.forEach(item => {
          detailsContent += `• ${item.category}: ${item.score}%\n`;
        });
        detailsContent += `\nCompletion Time: ${update.details.completionTime}\n`;
        detailsContent += `Questions: ${update.details.correctAnswers}/${update.details.totalQuestions} correct`;
      }

      // Interview details
      if (update.details.interviewType) {
        detailsContent += "Interview Details:\n";
        detailsContent += `• Type: ${update.details.interviewType}\n`;
        detailsContent += `• Last Contact: ${update.details.lastContact}\n`;
        detailsContent += `• Previous Interactions: ${update.details.previousInteractions}\n`;
        detailsContent += `• Average Response Time: ${update.details.averageResponseTime}\n\n`;
        detailsContent += "Proposed Interview Times:\n";
        update.details.proposedTimes.forEach(time => {
          detailsContent += `• ${time}\n`;
        });
      }

      // Profile update details
      if (update.details.updatedSections) {
        detailsContent += "Profile Updates:\n";
        detailsContent += `• Updated Sections:\n  - ${update.details.updatedSections.join("\n  - ")}\n\n`;
        detailsContent += `• New Skills:\n  - ${update.details.newSkills.join("\n  - ")}\n\n`;
        detailsContent += `• Experience: ${update.details.experienceYears} years\n\n`;
        detailsContent += "Recent Positions:\n";
        update.details.lastPositions.forEach(position => {
          detailsContent += `• ${position}\n`;
        });
      }

      if (detailsContent) {
        messages.push({
          id: `${update.id}-details`,
          content: detailsContent.trim(),
          time: update.time,
          type: "details",
          sender: "system"
        });
      }
    }

    // Add AI recommendation if present
    if (update.aiRecommendation) {
      messages.push({
        id: `${update.id}-ai`,
        content: update.aiRecommendation,
        time: update.time,
        type: "ai",
        sender: "system"
      });
    }

    return messages;
  };

  // tomiwa: Handle quick actions
  const handleQuickAction = (action) => {
    switch (action) {
      case "schedule":
        // Handle schedule interview
        break;
      case "assessment":
        // Handle send assessment
        break;
      case "share":
        // Handle share job details
        break;
      case "download":
        // Handle download resume
        break;
      default:
        break;
    }
  };

  // tomiwa: Handle AI assistant actions
  const handleAiAction = (action) => {
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
      default:
        break;
    }
  };

  // tomiwa: Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "candidates":
        return (
          <CandidatesList
            conversations={mockData.candidates}
            onSelectCandidate={(candidate) => {
              setSelectedCandidate(candidate);
              setSelectedTeamThread(null);
              setSelectedSystemUpdate(null);
              setShowDrawer(true);
            }}
            selectedId={selectedCandidate?.id}
          />
        );
      case "team":
        return (
          <TeamChat
            conversations={mockData.team}
            onSelectThread={(thread) => {
              setSelectedTeamThread(thread);
              setSelectedCandidate(null);
              setSelectedSystemUpdate(null);
            }}
            selectedId={selectedTeamThread?.id}
          />
        );
      case "system":
        return (
          <SystemUpdates 
            updates={mockData.system}
            onSelectUpdate={(update) => {
              setSelectedSystemUpdate(update);
              setSelectedCandidate(null);
              setSelectedTeamThread(null);
              // Set system update messages
              setMessages(getSystemUpdateMessages(update));
            }}
          />
        );
      default:
        return null;
    }
  };

  // tomiwa: Render quick actions
  const renderQuickActions = () => (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => handleQuickAction("schedule")}
        className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Schedule Interview
      </button>
      <button
        onClick={() => handleQuickAction("assessment")}
        className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
      >
        <FileText className="h-4 w-4 mr-2" />
        Send Assessment
      </button>
      <button
        onClick={() => handleQuickAction("share")}
        className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share Job Details
      </button>
      <button
        onClick={() => handleQuickAction("download")}
        className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
      >
        <Download className="h-4 w-4 mr-2" />
        Download Resume
      </button>
    </div>
  );

  // tomiwa: Render AI assistant panel
  const renderAiAssistant = () => (
    <div className="border-t p-4 bg-neutral-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-neutral-900">AI Assistant</h3>
        <button
          onClick={() => setShowAiAssistant(false)}
          className="text-neutral-400 hover:text-neutral-500"
        >
          <span className="sr-only">Close panel</span>
          ×
        </button>
      </div>
      <div className="space-y-2">
        <button
          onClick={() => handleAiAction("summarize")}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
        >
          <Bot className="h-4 w-4 mr-2" />
          Summarize Conversation
        </button>
        <button
          onClick={() => handleAiAction("suggest")}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Suggest Reply
        </button>
        <button
          onClick={() => handleAiAction("draft")}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
        >
          <Mail className="h-4 w-4 mr-2" />
          Draft Outreach Email
        </button>
      </div>
    </div>
  );

  // tomiwa: Render message templates
  const renderMessageTemplates = () => {
    if (!selectedCandidate) return null;
    
    return (
      <div className="absolute bottom-full left-0 w-full bg-white border border-neutral-200 rounded-lg shadow-lg mb-2 p-2">
        {mockData.messageTemplates.map((template) => {
          const replacedContent = template.content
            .replace("[name]", selectedCandidate.name)
            .replace("[role]", selectedCandidate.role);
            
          return (
            <button
              key={template.id}
              onClick={() => {
                handleSendMessage(replacedContent);
                setSelectedTemplate(null);
                setInputMessage(""); // Clear input field
              }}
              className="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded"
            >
              <div className="font-medium mb-1">{template.title}</div>
              <div className="text-xs text-neutral-500 truncate">{replacedContent}</div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white rounded-lg shadow-sm">
      {/* Top Navigation */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display text-neutral-900">Messages</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowNewMessageModal(true)}
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </button>
            <button
              onClick={() => setShowAiAssistant(!showAiAssistant)}
              className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
            >
              <Bot className="h-4 w-4 mr-2" />
              AI Assistant
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search messages, candidates, or teams..."
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Tabs Navigation */}
        <TabsNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadCounts={{
            candidates: 3,
            team: 2,
            system: 1,
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Conversations List */}
        <div className="w-full lg:w-1/3 border-r">
          {renderContent()}
        </div>

        {/* Right Panel - Chat Window */}
        <div className="hidden lg:block lg:w-2/3 flex flex-col">
          {selectedCandidate || selectedTeamThread || selectedSystemUpdate ? (
            <>
              {/* Quick Actions */}
              <div className="p-4 border-b">
                {selectedCandidate && renderQuickActions()}
                {selectedTeamThread && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-neutral-900">{selectedTeamThread.title}</h3>
                      {selectedTeamThread.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Member
                      </button>
                    </div>
                  </div>
                )}
                {selectedSystemUpdate && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-neutral-900">{selectedSystemUpdate.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedSystemUpdate.type === 'success' ? 'bg-green-50 text-green-600' :
                        selectedSystemUpdate.type === 'warning' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {selectedSystemUpdate.type}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Window */}
              <div className="flex-1">
                <ChatWindow
                  candidate={selectedCandidate}
                  teamThread={selectedTeamThread}
                  systemUpdate={selectedSystemUpdate}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onScheduleInterview={() => handleQuickAction("schedule")}
                  onSendAssessment={() => handleQuickAction("assessment")}
                />
              </div>

              {/* Message Input with Templates */}
              {(selectedCandidate || selectedTeamThread) && (
                <div className="p-4 border-t">
                  <div className="relative">
                    {selectedTemplate && renderMessageTemplates()}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedTemplate(!selectedTemplate)}
                        className="flex-shrink-0 p-2 text-neutral-400 hover:text-neutral-500"
                      >
                        <Clock className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(inputMessage);
                          }
                        }}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => handleSendMessage(inputMessage)}
                        className="flex-shrink-0 p-2 text-primary-500 hover:text-primary-600"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Assistant Panel */}
              {showAiAssistant && renderAiAssistant()}
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Search className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  Select a conversation
                </h3>
                <p className="text-neutral-600">
                  Choose a candidate or team conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Profile Drawer */}
      {showDrawer && selectedCandidate && (
        <CandidateDrawer
          candidate={selectedCandidate}
          onClose={() => setShowDrawer(false)}
        />
      )}

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-neutral-900">New Message</h3>
                <button
                  onClick={() => setShowNewMessageModal(false)}
                  className="text-neutral-400 hover:text-neutral-500"
                >
                  <span className="sr-only">Close</span>
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setActiveTab("candidates");
                    setShowNewMessageModal(false);
                  }}
                  className="w-full flex items-center p-4 text-left bg-white hover:bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <UserCircle className="h-6 w-6 text-primary-500 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Message a Candidate</h4>
                    <p className="text-sm text-neutral-500">Send a message to a job applicant</p>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("team");
                    setShowNewMessageModal(false);
                  }}
                  className="w-full flex items-center p-4 text-left bg-white hover:bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <Users className="h-6 w-6 text-secondary-500 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Create Team Discussion</h4>
                    <p className="text-sm text-neutral-500">Start a new team conversation</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}