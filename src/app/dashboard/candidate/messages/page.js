/**
 * File: src/app/dashboard/candidate/messages/page.js
 * 
 * tomiwa: UPDATED - Complete Messages Page
 * Full messaging interface for communication with employers and recruiters
 * 
 * Features:
 * - Conversation list with search and filtering
 * - Real-time message interface
 * - File attachments and media support
 * - Message status indicators (read/unread)
 * - Compose new messages
 * - Responsive design matching dashboard theme
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import {
  // tomiwa: Icon imports for messages page
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  EllipsisVerticalIcon,
  CheckIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
  CalendarIcon,
  DocumentTextIcon,
  PhoneIcon,
  VideoCameraIcon,
  // tomiwa: NEW - AI Assistant icons
  SparklesIcon,
  LightBulbIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  // tomiwa: NEW - Action menu icons
  TrashIcon,
  ArchiveBoxIcon,
  EyeSlashIcon,
  NoSymbolIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Extended mock messages data
const conversations = [
  {
    id: 1,
    participant: {
      name: 'Sarah Johnson',
      title: 'Senior Recruiter, Figma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      company: 'Figma',
      companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop',
    },
    lastMessage: {
      text: 'Congratulations! You\'ve been shortlisted for the next round. We would like to schedule a technical interview.',
      time: '2 hours ago',
      sender: 'them',
    },
    unreadCount: 2,
    jobTitle: 'Product Designer',
    messages: [
      {
        id: 1,
        text: 'Thank you for your application to the Product Designer position at Figma. We have received your application and will review it shortly.',
        time: '2024-10-25 3:45 PM',
        sender: 'them',
        status: 'read',
      },
      {
        id: 2,
        text: 'Thank you! I\'m very excited about this opportunity and look forward to hearing from you.',
        time: '2024-10-25 4:15 PM',
        sender: 'me',
        status: 'read',
      },
      {
        id: 3,
        text: 'Congratulations! You\'ve been shortlisted for the next round. We would like to schedule a technical interview.',
        time: '2024-10-26 10:30 AM',
        sender: 'them',
        status: 'unread',
      },
      {
        id: 4,
        text: 'Could you please let us know your availability for next week?',
        time: '2024-10-26 10:32 AM',
        sender: 'them',
        status: 'unread',
      },
    ],
  },
  {
    id: 2,
    participant: {
      name: 'Michael Adebayo',
      title: 'Design Lead, Paystack',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      company: 'Paystack',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    },
    lastMessage: {
      text: 'We appreciate your interest in joining our team. Your interview is scheduled for Oct 30 at 2:00 PM.',
      time: '5 hours ago',
      sender: 'them',
    },
    unreadCount: 0,
    jobTitle: 'Product Designer',
    messages: [
      {
        id: 1,
        text: 'Hello John, we were impressed with your application and would like to invite you for a phone screening.',
        time: '2024-10-24 4:30 PM',
        sender: 'them',
        status: 'read',
      },
      {
        id: 2,
        text: 'That sounds great! I\'m available for a phone screening. When would be convenient?',
        time: '2024-10-24 5:00 PM',
        sender: 'me',
        status: 'read',
      },
      {
        id: 3,
        text: 'We appreciate your interest in joining our team. Your interview is scheduled for Oct 30 at 2:00 PM.',
        time: '2024-10-25 9:15 AM',
        sender: 'them',
        status: 'read',
      },
    ],
  },
  {
    id: 3,
    participant: {
      name: 'Amara Okafor',
      title: 'Talent Lead, Flutterwave',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      company: 'Flutterwave',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
    },
    lastMessage: {
      text: 'Your portfolio is impressive! Let\'s discuss the opportunity further.',
      time: '1 day ago',
      sender: 'them',
    },
    unreadCount: 0,
    jobTitle: 'Senior UX Designer',
    messages: [
      {
        id: 1,
        text: 'Your portfolio is impressive! Let\'s discuss the opportunity further.',
        time: '2024-10-24 2:20 PM',
        sender: 'them',
        status: 'read',
      },
      {
        id: 2,
        text: 'Thank you! I\'d love to learn more about the role and how I can contribute to Flutterwave.',
        time: '2024-10-24 3:45 PM',
        sender: 'me',
        status: 'read',
      },
    ],
  },
];

export default function Messages() {
  // tomiwa: State management
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  // tomiwa: NEW - AI Assistant state
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  // tomiwa: NEW - Modal states for AI features
  const [showInterviewPrep, setShowInterviewPrep] = useState(false);
  const [showMessageAssistance, setShowMessageAssistance] = useState(false);
  const [showApplicationTips, setShowApplicationTips] = useState(false);
  // tomiwa: NEW - Compose message state
  const [composeRecipient, setComposeRecipient] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeMessage, setComposeMessage] = useState('');
  // tomiwa: NEW - Chat action states
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  // tomiwa: NEW - Enhanced action modal states
  const [showBlockUserModal, setShowBlockUserModal] = useState(false);
  const [showClearChatModal, setShowClearChatModal] = useState(false);
  // tomiwa: NEW - Ref for dropdown click outside detection
  const dropdownRef = useRef(null);

  // tomiwa: NEW - Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActionDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [aiSuggestions, setAiSuggestions] = useState([
    {
      id: 1,
      type: 'interview_prep',
      title: 'Interview Preparation',
      description: 'Get tips for your upcoming Figma interview',
      action: 'Get Interview Tips',
      icon: AcademicCapIcon,
    },
    {
      id: 2,
      type: 'message_draft',
      title: 'Message Assistance',
      description: 'Draft a professional follow-up message',
      action: 'Draft Message',
      icon: PaperAirplaneIcon,
    },
    {
      id: 3,
      type: 'application_tips',
      title: 'Application Enhancement',
      description: 'Improve your application responses',
      action: 'Get Tips',
      icon: LightBulbIcon,
    },
  ]);

  // tomiwa: Filter conversations based on search
  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.participant.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // tomiwa: Handle send message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  // tomiwa: Handle key press in message input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // tomiwa: NEW - Handle AI assistant actions
  const handleAiAction = (actionType) => {
    switch (actionType) {
      case 'interview_prep':
        setShowInterviewPrep(true);
        setShowAiAssistant(false);
        break;
      case 'message_draft':
        setShowMessageAssistance(true);
        setShowAiAssistant(false);
        break;
      case 'application_tips':
        setShowApplicationTips(true);
        setShowAiAssistant(false);
        break;
      case 'summarize':
        // Summarize conversation
        console.log('Summarizing conversation...');
        break;
      default:
        break;
    }
  };

  // tomiwa: NEW - Handle compose message
  const handleComposeMessage = () => {
    if (composeMessage.trim() && composeRecipient.trim()) {
      // In a real app, this would send the message to the server
      console.log('Sending new message to:', composeRecipient);
      console.log('Subject:', composeSubject);
      console.log('Message:', composeMessage);
      
      // Reset form
      setComposeRecipient('');
      setComposeSubject('');
      setComposeMessage('');
      setShowCompose(false);
      
      // Show success message (in real app)
      alert('Message sent successfully!');
    }
  };

  // tomiwa: NEW - Handle AI message generation
  const generateAiMessage = (messageType) => {
    const templates = {
      followUp: `Dear ${selectedConversation?.participant.name || '[Recipient Name]'},

I hope this message finds you well. I wanted to follow up on our previous conversation regarding the ${selectedConversation?.jobTitle || '[Position]'} role at ${selectedConversation?.participant.company || '[Company]'}.

I remain very interested in this opportunity and would appreciate any updates you can share about the next steps in the process. I'm excited about the possibility of contributing to your team and would be happy to provide any additional information you might need.

Thank you for your time and consideration.

Best regards,
[Your Name]`,
      
      thankYou: `Dear ${selectedConversation?.participant.name || '[Recipient Name]'},

Thank you so much for taking the time to speak with me about the ${selectedConversation?.jobTitle || '[Position]'} role. I really enjoyed our conversation and learning more about the exciting work being done at ${selectedConversation?.participant.company || '[Company]'}.

Our discussion reinforced my enthusiasm for this opportunity, and I'm confident that my skills and experience would be a great fit for your team.

Please let me know if you need any additional information from me. I look forward to hearing about the next steps.

Best regards,
[Your Name]`,
      
      inquiry: `Dear ${selectedConversation?.participant.name || '[Recipient Name]'},

I hope you're doing well. I wanted to reach out regarding the ${selectedConversation?.jobTitle || '[Position]'} opportunity at ${selectedConversation?.participant.company || '[Company]'}.

I'm very interested in learning more about this role and how my background in [Your Field/Skills] could contribute to your team's success. Would you be available for a brief conversation to discuss this opportunity further?

I'd be happy to work around your schedule. Thank you for your time and consideration.

Best regards,
[Your Name]`
    };
    
    return templates[messageType] || templates.followUp;
  };

  // tomiwa: NEW - Handle phone call action
  const handlePhoneCall = () => {
    if (selectedConversation) {
      // In a real app, this would initiate a phone call
      alert(`Initiating phone call with ${selectedConversation.participant.name}...`);
      console.log('Phone call initiated:', selectedConversation.participant);
    }
  };

  // tomiwa: NEW - Handle video call action
  const handleVideoCall = () => {
    if (selectedConversation) {
      // In a real app, this would start a video call
      alert(`Starting video call with ${selectedConversation.participant.name}...`);
      console.log('Video call started:', selectedConversation.participant);
    }
  };

  // tomiwa: NEW - Handle delete conversation
  const handleDeleteConversation = () => {
    if (selectedConversation) {
      // In a real app, this would delete from server
      console.log('Deleting conversation:', selectedConversation.id);
      alert(`Conversation with ${selectedConversation.participant.name} has been deleted.`);
      
      // Reset to first available conversation or null
      const remainingConversations = conversations.filter(conv => conv.id !== selectedConversation.id);
      setSelectedConversation(remainingConversations.length > 0 ? remainingConversations[0] : null);
      setShowDeleteConfirm(false);
      setShowActionDropdown(false);
    }
  };

  // tomiwa: NEW - Handle archive conversation
  const handleArchiveConversation = () => {
    if (selectedConversation) {
      // In a real app, this would archive on server
      console.log('Archiving conversation:', selectedConversation.id);
      alert(`Conversation with ${selectedConversation.participant.name} has been archived.`);
      
      setShowArchiveConfirm(false);
      setShowActionDropdown(false);
    }
  };

  // tomiwa: UPDATED - Handle clear chat history (now opens modal)
  const handleClearChatClick = () => {
    setShowClearChatModal(true);
    setShowActionDropdown(false);
  };

  // tomiwa: NEW - Handle actual clear chat action
  const handleClearChatConfirm = (clearType) => {
    if (selectedConversation) {
      // In a real app, this would clear messages on server
      console.log('Clearing chat history:', selectedConversation.id, 'Type:', clearType);
      
      let message = '';
      switch (clearType) {
        case 'all':
          message = `All chat history with ${selectedConversation.participant.name} has been cleared.`;
          break;
        case 'recent':
          message = `Recent messages (last 30 days) with ${selectedConversation.participant.name} have been cleared.`;
          break;
        case 'media':
          message = `Media files in conversation with ${selectedConversation.participant.name} have been cleared.`;
          break;
        default:
          message = `Chat history cleared.`;
      }
      
      alert(message);
      setShowClearChatModal(false);
    }
  };

  // tomiwa: NEW - Handle mark as unread
  const handleMarkAsUnread = () => {
    if (selectedConversation) {
      // In a real app, this would update read status on server
      console.log('Marking as unread:', selectedConversation.id);
      alert(`Conversation marked as unread.`);
      
      setShowActionDropdown(false);
    }
  };

  // tomiwa: UPDATED - Handle block user (now opens modal)
  const handleBlockUserClick = () => {
    setShowBlockUserModal(true);
    setShowActionDropdown(false);
  };

  // tomiwa: NEW - Handle actual block user action
  const handleBlockUserConfirm = (blockOptions) => {
    if (selectedConversation) {
      // In a real app, this would block user on server
      console.log('Blocking user:', selectedConversation.participant, 'Options:', blockOptions);
      
      let message = `${selectedConversation.participant.name} has been blocked.`;
      if (blockOptions.reportSpam) {
        message += ' Reported as spam.';
      }
      if (blockOptions.deleteMessages) {
        message += ' All messages deleted.';
      }
      
      alert(message);
      setShowBlockUserModal(false);
    }
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Hero Banner */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] -mt-8 -mx-6 mb-8">
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
            Messages
          </h1>
          <p className="text-white/90 text-lg">
                Communicate with employers and recruiters ({conversations.length} conversations)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAiAssistant(!showAiAssistant)}
                className={`inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors ${
                  showAiAssistant 
                    ? 'bg-brand-yellow text-brand-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <SparklesIcon className="w-5 h-5" />
                AI Assistant
              </button>
              <button
                onClick={() => setShowCompose(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-aqua font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                New Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          
          {/* tomiwa: Left Sidebar - Conversations List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
            {/* tomiwa: Search bar */}
            <div className="p-4 border-b border-neutral-200">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors"
                />
              </div>
            </div>

            {/* tomiwa: Conversations list */}
            <div className="overflow-y-auto h-full">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 text-left border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                    selectedConversation.id === conversation.id ? 'bg-brand-aqua/10 border-brand-aqua' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={conversation.participant.avatar}
                        alt={conversation.participant.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <img
                        src={conversation.participant.companyLogo}
                        alt={conversation.participant.company}
                        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full object-cover border-2 border-white"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-neutral-900 truncate">
                          {conversation.participant.name}
                        </h3>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mb-1">{conversation.participant.title}</p>
                      <p className="text-xs font-medium text-brand-aqua mb-2">{conversation.jobTitle}</p>
                      <p className="text-sm text-neutral-600 truncate">{conversation.lastMessage.text}</p>
                      <p className="text-xs text-neutral-400 mt-1">{conversation.lastMessage.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* tomiwa: Right Side - Chat Interface */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm flex flex-col overflow-hidden">
            {selectedConversation ? (
              <>
                {/* tomiwa: Chat header */}
                <div className="p-4 border-b border-neutral-200 bg-neutral-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={selectedConversation.participant.avatar}
                          alt={selectedConversation.participant.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <img
                          src={selectedConversation.participant.companyLogo}
                          alt={selectedConversation.participant.company}
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full object-cover border-2 border-white"
                        />
                      </div>
                      <div>
                        <h2 className="font-bold text-neutral-900">{selectedConversation.participant.name}</h2>
                        <p className="text-sm text-neutral-600">{selectedConversation.participant.title}</p>
                        <p className="text-xs font-medium text-brand-aqua">{selectedConversation.jobTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* tomiwa: UPDATED - Phone call button */}
                      <button 
                        onClick={handlePhoneCall}
                        className="p-2 text-neutral-500 hover:text-brand-aqua hover:bg-brand-aqua/10 rounded-lg transition-colors"
                        title="Start phone call"
                      >
                        <PhoneIcon className="w-5 h-5" />
                      </button>
                      
                      {/* tomiwa: UPDATED - Video call button */}
                      <button 
                        onClick={handleVideoCall}
                        className="p-2 text-neutral-500 hover:text-brand-aqua hover:bg-brand-aqua/10 rounded-lg transition-colors"
                        title="Start video call"
                      >
                        <VideoCameraIcon className="w-5 h-5" />
                      </button>
                      
                      {/* tomiwa: UPDATED - Action dropdown button */}
                      <div className="relative" ref={dropdownRef}>
                        <button 
                          onClick={() => setShowActionDropdown(!showActionDropdown)}
                          className="p-2 text-neutral-500 hover:text-brand-aqua hover:bg-brand-aqua/10 rounded-lg transition-colors"
                          title="More actions"
                        >
                        <EllipsisVerticalIcon className="w-5 h-5" />
                        </button>
                        
                        {/* tomiwa: NEW - Action dropdown menu */}
                        {showActionDropdown && (
                          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
                            <button
                              onClick={handleMarkAsUnread}
                              className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3"
                            >
                              <EyeSlashIcon className="w-4 h-4" />
                              Mark as Unread
                            </button>
                            
                            <button
                              onClick={handleClearChatClick}
                              className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3"
                            >
                              <ClipboardDocumentListIcon className="w-4 h-4" />
                              Clear Chat History
                            </button>
                            
                            <button
                              onClick={() => {
                                setShowArchiveConfirm(true);
                                setShowActionDropdown(false);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3"
                            >
                              <ArchiveBoxIcon className="w-4 h-4" />
                              Archive Conversation
                            </button>
                            
                            <div className="border-t border-neutral-200 my-2"></div>
                            
                            <button
                              onClick={handleBlockUserClick}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                            >
                              <NoSymbolIcon className="w-4 h-4" />
                              Block User
                            </button>
                            
                            <button
                              onClick={() => {
                                setShowDeleteConfirm(true);
                                setShowActionDropdown(false);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                            >
                              <TrashIcon className="w-4 h-4" />
                              Delete Conversation
                      </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* tomiwa: Messages area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'me'
                          ? 'bg-brand-aqua text-white'
                          : 'bg-neutral-100 text-neutral-900'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <div className={`flex items-center justify-between mt-1 ${
                          message.sender === 'me' ? 'text-white/70' : 'text-neutral-500'
                        }`}>
                          <span className="text-xs">{message.time}</span>
                          {message.sender === 'me' && (
                            <div className="ml-2">
                              {message.status === 'read' ? (
                                <CheckCircleIcon className="w-3 h-3" />
                              ) : (
                                <CheckIcon className="w-3 h-3" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* tomiwa: Message input */}
                <div className="p-4 border-t border-neutral-200">
                  <div className="flex items-end gap-3">
                    <button className="p-2 text-neutral-500 hover:text-brand-aqua hover:bg-brand-aqua/10 rounded-lg transition-colors">
                      <PaperClipIcon className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        rows={2}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-2 bg-brand-aqua text-white rounded-lg hover:bg-[#0C5B65] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // tomiwa: Empty state
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ChatBubbleLeftRightIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Select a conversation</h3>
                  <p className="text-neutral-600">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* tomiwa: NEW - AI Assistant Panel */}
        {showAiAssistant && (
          <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-brand-yellow to-brand-orange p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-brand-black" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-brand-black">AI Career Assistant</h2>
                    <p className="text-brand-black/80">Get personalized help with your job search</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAiAssistant(false)}
                  className="p-2 text-brand-black/60 hover:text-brand-black hover:bg-white/20 rounded-lg transition-colors"
                >
                  <EllipsisVerticalIcon className="w-5 h-5 rotate-90" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {aiSuggestions.map((suggestion) => {
                  const IconComponent = suggestion.icon;
                  return (
                    <button
                      key={suggestion.id}
                      onClick={() => handleAiAction(suggestion.type)}
                      className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-brand-aqua/10 rounded-lg flex items-center justify-center group-hover:bg-brand-aqua/20 transition-colors">
                          <IconComponent className="w-5 h-5 text-brand-aqua" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 mb-1">{suggestion.title}</h3>
                          <p className="text-sm text-neutral-600 mb-2">{suggestion.description}</p>
                          <span className="text-xs font-medium text-brand-aqua">{suggestion.action}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* tomiwa: Quick AI Actions */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-sm font-semibold text-neutral-900 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAiAction('summarize')}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <ClipboardDocumentListIcon className="w-4 h-4" />
                    Summarize Conversation
                  </button>
                  <button
                    onClick={() => handleAiAction('message_draft')}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <PaperAirplaneIcon className="w-4 h-4" />
                    Draft Follow-up
                  </button>
                  <button
                    onClick={() => handleAiAction('interview_prep')}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <AcademicCapIcon className="w-4 h-4" />
                    Interview Prep
                  </button>
                </div>
              </div>

              {/* tomiwa: AI Tips based on current conversation */}
              {selectedConversation && (
                <div className="mt-6 p-4 bg-brand-aqua/5 rounded-lg border border-brand-aqua/20">
                  <div className="flex items-start gap-3">
                    <LightBulbIcon className="w-5 h-5 text-brand-aqua mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">Smart Suggestion</h4>
                      <p className="text-sm text-neutral-700 mb-3">
                        Based on your conversation with {selectedConversation.participant.name}, consider asking about:
                      </p>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• Company culture and team dynamics</li>
                        <li>• Growth opportunities in the role</li>
                        <li>• Next steps in the interview process</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* tomiwa: NEW - Interview Preparation Modal */}
        {showInterviewPrep && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-brand-orange to-brand-yellow p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-brand-black" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-brand-black">Interview Preparation</h2>
                      <p className="text-brand-black/80">Get ready for your upcoming interviews</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowInterviewPrep(false)}
                    className="p-2 text-brand-black/60 hover:text-brand-black hover:bg-white/20 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* tomiwa: Interview Tips Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-brand-aqua/5 rounded-lg p-6 border border-brand-aqua/20">
                    <h3 className="text-lg font-semibold text-brand-black mb-4 flex items-center gap-2">
                      <LightBulbIcon className="w-5 h-5 text-brand-aqua" />
                      General Interview Tips
                    </h3>
                    <ul className="space-y-3 text-sm text-neutral-700">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-aqua">•</span>
                        Research the company thoroughly - their mission, values, recent news
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-aqua">•</span>
                        Prepare specific examples using the STAR method (Situation, Task, Action, Result)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-aqua">•</span>
                        Practice your elevator pitch and be ready to explain career transitions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-aqua">•</span>
                        Prepare thoughtful questions about the role and company culture
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-aqua">•</span>
                        Dress appropriately and arrive 10-15 minutes early
                      </li>
                    </ul>
                  </div>

                  <div className="bg-brand-yellow/10 rounded-lg p-6 border border-brand-yellow/30">
                    <h3 className="text-lg font-semibold text-brand-black mb-4 flex items-center gap-2">
                      <DocumentTextIcon className="w-5 h-5 text-brand-orange" />
                      Technical Interview Prep
                    </h3>
                    <ul className="space-y-3 text-sm text-neutral-700">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange">•</span>
                        Review your portfolio and be ready to walk through projects
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange">•</span>
                        Practice coding problems or design challenges relevant to the role
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange">•</span>
                        Understand the technical stack and tools used by the company
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange">•</span>
                        Prepare to discuss your problem-solving approach
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange">•</span>
                        Have examples ready of how you've handled technical challenges
                      </li>
                    </ul>
                  </div>
                </div>

                {/* tomiwa: Common Interview Questions */}
                <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-brand-black mb-4">Common Interview Questions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-2">Behavioral Questions:</h4>
                      <ul className="text-sm text-neutral-700 space-y-1">
                        <li>• Tell me about yourself</li>
                        <li>• Why do you want to work here?</li>
                        <li>• Describe a challenging project</li>
                        <li>• How do you handle conflict?</li>
                        <li>• Where do you see yourself in 5 years?</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-2">Role-Specific Questions:</h4>
                      <ul className="text-sm text-neutral-700 space-y-1">
                        <li>• Walk me through your design process</li>
                        <li>• How do you stay updated with trends?</li>
                        <li>• Describe your collaboration style</li>
                        <li>• How do you handle feedback?</li>
                        <li>• What's your biggest weakness?</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* tomiwa: Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() => setShowInterviewPrep(false)}
                    className="px-6 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowInterviewPrep(false);
                      setShowMessageAssistance(true);
                    }}
                    className="px-6 py-2 bg-brand-aqua text-white rounded-lg hover:bg-[#0C5B65] transition-colors"
                  >
                    Draft Follow-up Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: NEW - Message Assistance Modal */}
        {showMessageAssistance && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <PaperAirplaneIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-white">Message Assistance</h2>
                      <p className="text-white/90">AI-powered professional message drafting</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMessageAssistance(false)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* tomiwa: Message Templates */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-brand-black mb-4">Choose a Message Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setNewMessage(generateAiMessage('followUp'))}
                      className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all"
                    >
                      <h4 className="font-semibold text-neutral-900 mb-2">Follow-up Message</h4>
                      <p className="text-sm text-neutral-600">Check on application status</p>
                    </button>
                    <button
                      onClick={() => setNewMessage(generateAiMessage('thankYou'))}
                      className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all"
                    >
                      <h4 className="font-semibold text-neutral-900 mb-2">Thank You Note</h4>
                      <p className="text-sm text-neutral-600">After interview or meeting</p>
                    </button>
                    <button
                      onClick={() => setNewMessage(generateAiMessage('inquiry'))}
                      className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all"
                    >
                      <h4 className="font-semibold text-neutral-900 mb-2">Initial Inquiry</h4>
                      <p className="text-sm text-neutral-600">Express interest in role</p>
                    </button>
                  </div>
                </div>

                {/* tomiwa: Message Preview/Editor */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-brand-black mb-4">Message Preview</h3>
                  <div className="border border-neutral-300 rounded-lg p-4 bg-neutral-50">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Your AI-generated message will appear here. You can edit it as needed."
                      rows={12}
                      className="w-full p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* tomiwa: Message Tips */}
                <div className="bg-brand-yellow/10 rounded-lg p-4 mb-6 border border-brand-yellow/30">
                  <h4 className="font-semibold text-brand-black mb-2 flex items-center gap-2">
                    <LightBulbIcon className="w-4 h-4 text-brand-orange" />
                    Professional Message Tips
                  </h4>
                  <ul className="text-sm text-neutral-700 space-y-1">
                    <li>• Keep it concise and professional</li>
                    <li>• Personalize with specific details about the role/company</li>
                    <li>• Include a clear call-to-action</li>
                    <li>• Proofread before sending</li>
                  </ul>
                </div>

                {/* tomiwa: Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() => setShowMessageAssistance(false)}
                    className="px-6 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowMessageAssistance(false);
                      // In a real app, this would copy to the message input
                      console.log('Message ready to send:', newMessage);
                    }}
                    className="px-6 py-2 bg-brand-aqua text-white rounded-lg hover:bg-[#0C5B65] transition-colors"
                  >
                    Use This Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: NEW - Application Enhancement Modal */}
        {showApplicationTips && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-brand-yellow to-brand-orange p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <LightBulbIcon className="w-6 h-6 text-brand-black" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-brand-black">Application Enhancement</h2>
                      <p className="text-brand-black/80">Tips to improve your job applications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowApplicationTips(false)}
                    className="p-2 text-brand-black/60 hover:text-brand-black hover:bg-white/20 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* tomiwa: Application Tips Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-brand-aqua/5 rounded-lg p-6 border border-brand-aqua/20">
                    <h3 className="text-lg font-semibold text-brand-black mb-4 flex items-center gap-2">
                      <DocumentTextIcon className="w-5 h-5 text-brand-aqua" />
                      Resume & Portfolio
                    </h3>
                    <ul className="space-y-3 text-sm text-neutral-700">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-aqua">•</span>
                        Tailor your resume to match job requirements and keywords
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-aqua">•</span>
                        Quantify achievements with specific numbers and results
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-aqua">•</span>
                        Keep your portfolio updated with recent, relevant work
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-aqua">•</span>
                        Use action verbs and focus on impact, not just responsibilities
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-aqua">•</span>
                        Ensure consistent formatting and error-free content
                      </li>
                    </ul>
                  </div>

                  <div className="bg-brand-orange/10 rounded-lg p-6 border border-brand-orange/30">
                    <h3 className="text-lg font-semibold text-brand-black mb-4 flex items-center gap-2">
                      <ChatBubbleLeftRightIcon className="w-5 h-5 text-brand-orange" />
                      Cover Letter & Applications
                    </h3>
                    <ul className="space-y-3 text-sm text-neutral-700">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange">•</span>
                        Research the company and mention specific details
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange">•</span>
                        Address the hiring manager by name when possible
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange">•</span>
                        Connect your experience directly to the job requirements
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange">•</span>
                        Show enthusiasm and cultural fit for the organization
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange">•</span>
                        End with a strong call-to-action and next steps
                      </li>
                    </ul>
                  </div>
                </div>

                {/* tomiwa: UPDATED - Application Checklist with better styling */}
                <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-brand-black mb-4 flex items-center gap-2">
                    <ClipboardDocumentListIcon className="w-5 h-5 text-brand-aqua" />
                    Application Checklist
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-3 flex items-center gap-2">
                        <DocumentTextIcon className="w-4 h-4 text-brand-orange" />
                        Before Submitting:
                      </h4>
                      <div className="space-y-3">
                        <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200 hover:border-brand-aqua/50 hover:bg-brand-aqua/5 cursor-pointer transition-all">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-4 h-4 text-brand-aqua bg-white border-2 border-neutral-300 rounded focus:ring-brand-aqua focus:ring-2 focus:ring-offset-0" 
                          />
                          <div className="text-sm">
                            <div className="font-medium text-neutral-900">Resume tailored to job description</div>
                            <div className="text-neutral-600 text-xs mt-1">Match keywords and requirements from the job posting</div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200 hover:border-brand-aqua/50 hover:bg-brand-aqua/5 cursor-pointer transition-all">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-4 h-4 text-brand-aqua bg-white border-2 border-neutral-300 rounded focus:ring-brand-aqua focus:ring-2 focus:ring-offset-0" 
                          />
                          <div className="text-sm">
                            <div className="font-medium text-neutral-900">Cover letter personalized</div>
                            <div className="text-neutral-600 text-xs mt-1">Address specific company and role details</div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200 hover:border-brand-aqua/50 hover:bg-brand-aqua/5 cursor-pointer transition-all">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-4 h-4 text-brand-aqua bg-white border-2 border-neutral-300 rounded focus:ring-brand-aqua focus:ring-2 focus:ring-offset-0" 
                          />
                          <div className="text-sm">
                            <div className="font-medium text-neutral-900">Portfolio/work samples included</div>
                            <div className="text-neutral-600 text-xs mt-1">Relevant projects that showcase your skills</div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200 hover:border-brand-aqua/50 hover:bg-brand-aqua/5 cursor-pointer transition-all">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-4 h-4 text-brand-aqua bg-white border-2 border-neutral-300 rounded focus:ring-brand-aqua focus:ring-2 focus:ring-offset-0" 
                          />
                          <div className="text-sm">
                            <div className="font-medium text-neutral-900">All documents proofread</div>
                            <div className="text-neutral-600 text-xs mt-1">Check for typos, grammar, and formatting</div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-3 flex items-center gap-2">
                        <PaperAirplaneIcon className="w-4 h-4 text-brand-yellow" />
                        Follow-up Strategy:
                      </h4>
                      <div className="space-y-3">
                        <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200 hover:border-brand-aqua/50 hover:bg-brand-aqua/5 cursor-pointer transition-all">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-4 h-4 text-brand-aqua bg-white border-2 border-neutral-300 rounded focus:ring-brand-aqua focus:ring-2 focus:ring-offset-0" 
                          />
                          <div className="text-sm">
                            <div className="font-medium text-neutral-900">Send thank you note after applying</div>
                            <div className="text-neutral-600 text-xs mt-1">Express gratitude and reiterate interest</div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200 hover:border-brand-aqua/50 hover:bg-brand-aqua/5 cursor-pointer transition-all">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-4 h-4 text-brand-aqua bg-white border-2 border-neutral-300 rounded focus:ring-brand-aqua focus:ring-2 focus:ring-offset-0" 
                          />
                          <div className="text-sm">
                            <div className="font-medium text-neutral-900">Follow up after 1-2 weeks</div>
                            <div className="text-neutral-600 text-xs mt-1">Polite inquiry about application status</div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200 hover:border-brand-aqua/50 hover:bg-brand-aqua/5 cursor-pointer transition-all">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-4 h-4 text-brand-aqua bg-white border-2 border-neutral-300 rounded focus:ring-brand-aqua focus:ring-2 focus:ring-offset-0" 
                          />
                          <div className="text-sm">
                            <div className="font-medium text-neutral-900">Connect on LinkedIn</div>
                            <div className="text-neutral-600 text-xs mt-1">Build professional network connections</div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200 hover:border-brand-aqua/50 hover:bg-brand-aqua/5 cursor-pointer transition-all">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-4 h-4 text-brand-aqua bg-white border-2 border-neutral-300 rounded focus:ring-brand-aqua focus:ring-2 focus:ring-offset-0" 
                          />
                          <div className="text-sm">
                            <div className="font-medium text-neutral-900">Track application status</div>
                            <div className="text-neutral-600 text-xs mt-1">Monitor progress and set reminders</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* tomiwa: Common Mistakes to Avoid */}
                <div className="bg-red-50 rounded-lg p-4 mb-6 border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <ExclamationCircleIcon className="w-4 h-4" />
                    Common Mistakes to Avoid
                  </h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Generic, one-size-fits-all applications</li>
                    <li>• Typos and grammatical errors</li>
                    <li>• Focusing on what you want instead of what you offer</li>
                    <li>• Submitting outdated or irrelevant work samples</li>
                    <li>• Not following application instructions</li>
                  </ul>
                </div>

                {/* tomiwa: Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() => setShowApplicationTips(false)}
                    className="px-6 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowApplicationTips(false);
                      setShowMessageAssistance(true);
                    }}
                    className="px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-brand-orange/90 transition-colors"
                  >
                    Draft Application Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: NEW - Compose New Message Modal */}
        {showCompose && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <PaperAirplaneIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-white">New Message</h2>
                      <p className="text-white/90">Start a new conversation</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCompose(false)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={(e) => { e.preventDefault(); handleComposeMessage(); }} className="space-y-6">
                  {/* tomiwa: Recipient Field */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      To: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={composeRecipient}
                      onChange={(e) => setComposeRecipient(e.target.value)}
                      placeholder="Enter recipient name or email"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors"
                      required
                    />
                  </div>

                  {/* tomiwa: Subject Field */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Subject:
                    </label>
                    <input
                      type="text"
                      value={composeSubject}
                      onChange={(e) => setComposeSubject(e.target.value)}
                      placeholder="Message subject (optional)"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors"
                    />
                  </div>

                  {/* tomiwa: Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Message: <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={composeMessage}
                      onChange={(e) => setComposeMessage(e.target.value)}
                      placeholder="Type your message here..."
                      rows={8}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors resize-none"
                      required
                    />
                  </div>

                  {/* tomiwa: Quick Actions */}
                  <div className="border-t border-neutral-200 pt-4">
                    <p className="text-sm font-medium text-neutral-700 mb-3">Quick Actions:</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setShowMessageAssistance(true)}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-aqua bg-brand-aqua/10 rounded-lg hover:bg-brand-aqua/20 transition-colors"
                      >
                        <SparklesIcon className="w-4 h-4" />
                        AI Assist
                      </button>
                      <button
                        type="button"
                        onClick={() => setComposeMessage(generateAiMessage('inquiry'))}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                      >
                        Template: Inquiry
                      </button>
                      <button
                        type="button"
                        onClick={() => setComposeMessage(generateAiMessage('followUp'))}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                      >
                        Template: Follow-up
                      </button>
                    </div>
                  </div>

                  {/* tomiwa: Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-neutral-200">
                    <button
                      type="button"
                      onClick={() => setShowCompose(false)}
                      className="px-6 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!composeMessage.trim() || !composeRecipient.trim()}
                      className="px-6 py-2 bg-brand-aqua text-white rounded-lg hover:bg-[#0C5B65] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: NEW - Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <TrashIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Delete Conversation</h3>
                    <p className="text-sm text-neutral-600">This action cannot be undone</p>
                  </div>
                </div>
                
                <p className="text-neutral-700 mb-6">
                  Are you sure you want to delete your conversation with{' '}
                  <span className="font-semibold">{selectedConversation?.participant.name}</span>?
                  All messages will be permanently removed.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConversation}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Conversation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: NEW - Archive Confirmation Modal */}
        {showArchiveConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-brand-aqua/10 rounded-lg flex items-center justify-center">
                    <ArchiveBoxIcon className="w-6 h-6 text-brand-aqua" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Archive Conversation</h3>
                    <p className="text-sm text-neutral-600">Move to archived conversations</p>
                  </div>
                </div>
                
                <p className="text-neutral-700 mb-6">
                  Archive your conversation with{' '}
                  <span className="font-semibold">{selectedConversation?.participant.name}</span>?
                  You can find it in your archived conversations later.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() => setShowArchiveConfirm(false)}
                    className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleArchiveConversation}
                    className="px-4 py-2 bg-brand-aqua text-white rounded-lg hover:bg-[#0C5B65] transition-colors"
                  >
                    Archive Conversation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: NEW - Block User Modal */}
        {showBlockUserModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <NoSymbolIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">Block User</h3>
                    <p className="text-white/90">Prevent future communication</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <p className="text-neutral-700 mb-4">
                    You're about to block{' '}
                    <span className="font-semibold">{selectedConversation?.participant.name}</span>.
                    They won't be able to send you messages or see your profile.
                  </p>
                  
                  {/* tomiwa: Block options */}
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="reportSpam"
                        className="mt-1 rounded border-neutral-300 text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <div className="font-medium text-neutral-900">Report as Spam</div>
                        <div className="text-sm text-neutral-600">Help us improve by reporting unwanted messages</div>
                      </div>
                    </label>
                    
                    <label className="flex items-start gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="deleteMessages"
                        className="mt-1 rounded border-neutral-300 text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <div className="font-medium text-neutral-900">Delete All Messages</div>
                        <div className="text-sm text-neutral-600">Remove entire conversation history</div>
                      </div>
                    </label>
                    
                    <label className="flex items-start gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="blockCompany"
                        className="mt-1 rounded border-neutral-300 text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <div className="font-medium text-neutral-900">Block Entire Company</div>
                        <div className="text-sm text-neutral-600">Block all users from {selectedConversation?.participant.company}</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* tomiwa: Warning message */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <ExclamationCircleIcon className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800 mb-1">Important</h4>
                      <p className="text-sm text-red-700">
                        Blocked users can't contact you, but you can unblock them anytime in your settings.
                      </p>
                    </div>
                  </div>
                </div>

                {/* tomiwa: Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() => setShowBlockUserModal(false)}
                    className="px-6 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const reportSpam = document.getElementById('reportSpam')?.checked || false;
                      const deleteMessages = document.getElementById('deleteMessages')?.checked || false;
                      const blockCompany = document.getElementById('blockCompany')?.checked || false;
                      
                      handleBlockUserConfirm({
                        reportSpam,
                        deleteMessages,
                        blockCompany
                      });
                    }}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Block User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: NEW - Clear Chat History Modal */}
        {showClearChatModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="bg-gradient-to-r from-brand-orange to-brand-yellow p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <ClipboardDocumentListIcon className="w-6 h-6 text-brand-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-brand-black">Clear Chat History</h3>
                    <p className="text-brand-black/80">Choose what to clear</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <p className="text-neutral-700 mb-4">
                    Select what you'd like to clear from your conversation with{' '}
                    <span className="font-semibold">{selectedConversation?.participant.name}</span>:
                  </p>
                  
                  {/* tomiwa: Clear options */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleClearChatConfirm('recent')}
                      className="w-full text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-aqua/10 rounded-lg flex items-center justify-center">
                          <CalendarIcon className="w-5 h-5 text-brand-aqua" />
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900">Clear Recent Messages</div>
                          <div className="text-sm text-neutral-600">Remove messages from the last 30 days</div>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleClearChatConfirm('media')}
                      className="w-full text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-yellow/20 rounded-lg flex items-center justify-center">
                          <PaperClipIcon className="w-5 h-5 text-brand-orange" />
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900">Clear Media Files</div>
                          <div className="text-sm text-neutral-600">Remove photos, documents, and attachments</div>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleClearChatConfirm('all')}
                      className="w-full text-left p-4 border border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <TrashIcon className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium text-red-900">Clear All Messages</div>
                          <div className="text-sm text-red-600">Remove entire conversation history (cannot be undone)</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* tomiwa: Info message */}
                <div className="bg-brand-aqua/5 border border-brand-aqua/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <LightBulbIcon className="w-5 h-5 text-brand-aqua mt-0.5" />
                    <div>
                      <h4 className="font-medium text-brand-black mb-1">Note</h4>
                      <p className="text-sm text-neutral-700">
                        Clearing messages only affects your view. The other person will still see their copy.
                      </p>
                    </div>
                  </div>
                </div>

                {/* tomiwa: Action buttons */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowClearChatModal(false)}
                    className="px-6 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </CandidateDashboardLayout>
  );
}


