'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Simplified AI Outreach & Follow-up Emails page
export default function AIOutreachEmails() {
  // Core state management - simplified
  const [activeTab, setActiveTab] = useState('compose');
  const [selectedEmailType, setSelectedEmailType] = useState('interview-invite');
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  
  // History states - simplified
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states - reduced
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState({ subject: '', body: '' });

  // Simplified email types
  const emailTypes = [
    { id: 'interview-invite', label: 'Interview Invite' },
    { id: 'follow-up', label: 'Follow-up' },
    { id: 'rejection', label: 'Rejection' }
  ];

  // Mock candidates data - simplified
  const mockCandidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Frontend Developer',
      status: 'Interview Scheduled'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager',
      status: 'Pending Response'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      status: 'Follow-up Needed'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Backend Engineer',
      status: 'Interview Scheduled'
    }
  ];

  // Outreach history data - simplified
  const outreachHistory = [
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      emailType: 'Interview Invite',
      sentDate: '2024-10-05',
      status: 'Replied',
      subject: 'Interview Invitation - Senior Frontend Developer Position'
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      candidateEmail: 'michael.chen@email.com',
      emailType: 'Follow-up',
      sentDate: '2024-10-03',
      status: 'Sent',
      subject: 'Following up on your Product Manager application'
    },
    {
      id: 3,
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.rodriguez@email.com',
      emailType: 'Interview Invite',
      sentDate: '2024-10-02',
      status: 'Delivered',
      subject: 'Interview Opportunity - UX Designer Role'
    },
    {
      id: 4,
      candidateName: 'David Kim',
      candidateEmail: 'david.kim@email.com',
      emailType: 'Interview Invite',
      sentDate: '2024-10-06',
      status: 'Scheduled',
      subject: 'Interview Scheduled - Backend Engineer Position'
    }
  ];

  // Tone options - simplified
  const toneOptions = [
    { id: 'professional', label: 'Professional' },
    { id: 'friendly', label: 'Friendly' }
  ];

  // Simplified email template generation
  const generateEmailDraft = () => {
    setIsGeneratingDraft(true);
    
    setTimeout(() => {
      const templates = {
        'interview-invite': {
          subject: selectedTone === 'friendly' 
            ? 'Interview Opportunity - {JobTitle} at {CompanyName}!'
            : 'Interview Invitation - {JobTitle} Position',
          body: selectedTone === 'friendly' 
            ? `Hi {CandidateName}!

We'd love to schedule an interview for the {JobTitle} position at {CompanyName}.

Interview Details:
• Date: Tuesday, October 15th, 2024
• Time: 2:00 PM - 3:00 PM EST
• Format: Video call via Google Meet

Looking forward to speaking with you!

Best regards,
Sarah Chen`
            : `Dear {CandidateName},

Thank you for your application. We would like to invite you for an interview for the {JobTitle} position.

Interview Details:
Date: Tuesday, October 15th, 2024
Time: 2:00 PM - 3:00 PM EST
Format: Virtual interview via Google Meet

Please confirm your attendance by replying to this email.

Best regards,
Sarah Chen`
        },
        'follow-up': {
          subject: 'Following up on {JobTitle} opportunity',
          body: `Hi {CandidateName},

I wanted to follow up on the {JobTitle} position we discussed.

We're still very interested in your candidacy and would love to hear from you.

Please let me know if you have any questions.

Best regards,
Sarah Chen`
        },
        'rejection': {
          subject: 'Update on your {JobTitle} application',
          body: `Dear {CandidateName},

Thank you for your interest in the {JobTitle} position at {CompanyName}.

After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current requirements.

We appreciate your time and wish you success in your job search.

Best regards,
Sarah Chen`
        }
      };

      const template = templates[selectedEmailType];
      setEmailSubject(template.subject);
      setEmailBody(template.body);
      setIsGeneratingDraft(false);
    }, 1500);
  };

  // Handle candidate selection
  const toggleCandidateSelection = (candidateId) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  // Filter messages for search
  const getFilteredMessages = () => {
    if (!searchQuery) return outreachHistory;
    
    return outreachHistory.filter(message => 
        message.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  // Handle preview
  const handlePreview = () => {
    if (!emailSubject || !emailBody) {
      alert('Please generate an email draft first!');
      return;
    }

    if (selectedCandidates.length === 0) {
      alert('Please select at least one candidate to preview the email!');
      return;
    }

    const candidate = mockCandidates.find(c => selectedCandidates.includes(c.id)) || mockCandidates[0];
    
    // Simple personalization
    const personalizedSubject = emailSubject
      .replace(/{CandidateName}/g, candidate.name)
      .replace(/{JobTitle}/g, 'Senior Frontend Developer')
      .replace(/{CompanyName}/g, 'TechFlow Solutions');
      
    const personalizedBody = emailBody
      .replace(/{CandidateName}/g, candidate.name)
      .replace(/{JobTitle}/g, 'Senior Frontend Developer')
      .replace(/{CompanyName}/g, 'TechFlow Solutions');

    setPreviewContent({
      subject: personalizedSubject,
      body: personalizedBody,
      candidateName: candidate.name,
      candidateRole: candidate.role
    });
    setShowPreview(true);
  };


  // Generate AI draft on component mount and when type changes
  useEffect(() => {
    generateEmailDraft();
  }, [selectedEmailType, selectedTone]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-3xl text-[#021126]">
            AI Outreach Emails
          </h1>
          <Link
            href="/dashboard/employer/ai-tools/outreach-emails/learn"
            className="inline-flex items-center px-4 py-2 text-[#36D0D8] hover:text-[#EF522E] font-medium transition-colors"
          >
            Learn More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <p className="text-neutral-600 max-w-3xl">
          Create personalized outreach emails for candidates using AI.
        </p>
      </div>

      {/* Simplified tabs */}
      <div className="mb-8">
        <div className="border-b border-neutral-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('compose')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'compose'
                  ? 'border-[#EF522E] text-[#EF522E]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Compose Email
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'history'
                  ? 'border-[#EF522E] text-[#EF522E]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Email History
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="space-y-6">
          {activeTab === 'compose' && (
            <div className="space-y-6">
            {/* Email Type Selection */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="font-display text-lg text-[#021126] mb-4">Email Type</h3>
              <div className="grid grid-cols-3 gap-3">
                  {emailTypes.map((type) => (
                  <button
                      key={type.id}
                      onClick={() => setSelectedEmailType(type.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                        selectedEmailType === type.id
                          ? 'border-[#EF522E] bg-[#EF522E]/5'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                    <div className="font-medium text-[#021126]">{type.label}</div>
                  </button>
                  ))}
                </div>
              </div>

            {/* Recipients */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="font-display text-lg text-[#021126] mb-4">Select Recipients</h3>
              <div className="space-y-3">
                      {mockCandidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          onClick={() => toggleCandidateSelection(candidate.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedCandidates.includes(candidate.id)
                              ? 'border-[#36D0D8] bg-[#36D0D8]/5'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-[#021126]">{candidate.name}</div>
                        <div className="text-sm text-neutral-600">{candidate.role}</div>
                                </div>
                      <div className={`px-3 py-1 text-xs font-medium rounded-full ${
                              candidate.status === 'Interview Scheduled' 
                                ? 'bg-green-100 text-green-800'
                                : candidate.status === 'Pending Response'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {candidate.status}
                      </div>
                          </div>
                        </div>
                      ))}
                    </div>
              </div>

            {/* Email Content */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="font-display text-lg text-[#021126] mb-6">Email Content</h3>

              {/* Tone Selection */}
                <div className="mb-6">
                <label className="block text-sm font-medium text-[#021126] mb-3">Tone</label>
                <div className="grid grid-cols-2 gap-3">
                    {toneOptions.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => setSelectedTone(tone.id)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          selectedTone === tone.id
                            ? 'border-[#FDD140] bg-[#FDD140]/10'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                      <div className="font-medium text-sm text-[#021126]">{tone.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

              {/* Subject Line */}
                <div className="mb-6">
                <label className="block text-sm font-medium text-[#021126] mb-2">Subject Line</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                    placeholder="Enter email subject..."
                  />
                </div>

              {/* Email Body */}
                <div className="mb-6">
                <label className="block text-sm font-medium text-[#021126] mb-2">Email Body</label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                  rows={8}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                    placeholder="Email content will be generated here..."
                  />
                </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-600">
                      {selectedCandidates.length} recipient{selectedCandidates.length !== 1 ? 's' : ''} selected
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={generateEmailDraft}
                      disabled={isGeneratingDraft}
                    className="px-6 py-3 bg-[#36D0D8] text-white rounded-xl hover:bg-[#36D0D8]/90 transition-colors disabled:opacity-50"
                    >
                    {isGeneratingDraft ? 'Generating...' : 'Generate Email'}
                    </button>
                    <button 
                      onClick={handlePreview}
                      className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors"
                    >
                    Preview
                    </button>
                    <button className="px-6 py-3 bg-[#EF522E] text-white rounded-xl hover:bg-[#EF522E]/90 transition-colors">
                    Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
            {/* Search */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search candidates or subjects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent w-full"
                      />
                </div>
              </div>

            {/* History Table */}
              <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                      <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Candidate
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Email Type
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Date Sent
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {getFilteredMessages().map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#36D0D8] rounded-full flex items-center justify-center text-white text-sm font-medium">
                                  {item.candidateName.charAt(0)}
                                </div>
                            <div>
                              <div className="font-medium text-[#021126]">{item.candidateName}</div>
                              <div className="text-sm text-neutral-600 truncate max-w-xs">
                                    {item.subject}
                                </div>
                              </div>
                            </div>
                          </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-800">
                                {item.emailType}
                              </span>
                          </td>
                        <td className="px-6 py-4">
                              <div className="text-sm text-neutral-900">
                                {new Date(item.sentDate).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                            </div>
                          </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                item.status === 'Replied' 
                                  ? 'bg-green-100 text-green-800'
                                  : item.status === 'Scheduled'
                                  ? 'bg-blue-100 text-blue-800'
                                  : item.status === 'Sent'
                                  ? 'bg-[#36D0D8]/10 text-[#36D0D8]'
                                  : item.status === 'Delivered'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {item.status}
                              </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                {/* Empty state */}
                  {getFilteredMessages().length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4-4-4m0 0L9 7v4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">No messages found</h3>
                      <p className="text-neutral-600">
                      {searchQuery ? 'Try adjusting your search terms' : 'No email history available'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

      {/* Email Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div>
                <h3 className="font-display text-xl text-[#021126]">Email Preview</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Preview for: <span className="font-medium">{previewContent.candidateName}</span>
                </p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Email Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Email Header */}
              <div className="bg-neutral-50 rounded-lg p-4 mb-6 border border-neutral-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#EF522E] rounded-full flex items-center justify-center text-white font-medium">
                      SC
                    </div>
                    <div>
                      <div className="font-medium text-[#021126]">Sarah Chen</div>
                      <div className="text-sm text-neutral-600">sarah.chen@techflowsolutions.com</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-2">
                  <span>To:</span>
                  <span className="font-medium">{previewContent.candidateName}</span>
                </div>
                
                <div className="font-medium text-[#021126] text-lg">
                  {previewContent.subject}
                </div>
              </div>

              {/* Email Body */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                  <div className="whitespace-pre-wrap text-neutral-700 leading-relaxed">
                    {previewContent.body}
                  </div>
                </div>
              </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-neutral-200 bg-neutral-50">
              <div className="text-sm text-neutral-600">
                Ready to send to {selectedCandidates.length} recipient{selectedCandidates.length !== 1 ? 's' : ''}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-100 transition-colors"
                >
                  Close
                </button>
                  <button
                    onClick={() => {
                    setShowPreview(false);
                    alert('Email sent successfully!');
                    }}
                    className="px-6 py-2 bg-[#EF522E] text-white rounded-xl hover:bg-[#EF522E]/90 transition-colors"
                  >
                  Send Email
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
