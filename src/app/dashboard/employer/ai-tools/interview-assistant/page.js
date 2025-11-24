'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import CustomQuestionTypeModal from '@/components/ui/modals/CustomQuestionTypeModal';
import AddCustomQuestionModal from '@/components/ui/modals/AddCustomQuestionModal';
import MeetingSelectionModal from '@/components/ui/modals/MeetingSelectionModal';
import FloatingAIIndicator from '@/components/ui/FloatingAIIndicator';

// tomiwa: Main AI Interview Assistant page component - redesigned for Interview Prep and External Meeting modes
export default function AIInterviewAssistant() {
  // tomiwa: Core state management for the redesigned interface
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState(['technical', 'behavioral']);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [generatedQuestions, setGeneratedQuestions] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAISummary, setShowAISummary] = useState(false);
  
  // tomiwa: Modal and UI state management
  const [isCustomTypeModalOpen, setIsCustomTypeModalOpen] = useState(false);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  
  // tomiwa: NEW - Interview modes: 'prep' for Interview Prep, 'external' for External Meeting
  const [interviewMode, setInterviewMode] = useState('prep');
  
  // tomiwa: External meeting integration states
  const [zoomIntegrationEnabled, setZoomIntegrationEnabled] = useState(false);
  const [meetIntegrationEnabled, setMeetIntegrationEnabled] = useState(false);
  const [transcriptUploaded, setTranscriptUploaded] = useState(false);
  const [meetingLinked, setMeetingLinked] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState('');
  
  // tomiwa: NEW - Meeting selection modal and AI indicator states
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [aiAssistantActive, setAiAssistantActive] = useState(false);
  
  // tomiwa: Interview summary and export states
  const [interviewSummaryGenerated, setInterviewSummaryGenerated] = useState(false);
  const [questionsExported, setQuestionsExported] = useState(false);
  
  // tomiwa: Mock data for candidates from platform database
  const mockCandidates = [
    { 
      id: 1, 
      name: 'John Smith', 
      role: 'Frontend Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js', 'Performance Optimization'],
      matchPercentage: 92,
      strengths: ['Strong technical foundation', 'Team leadership', 'Problem-solving'],
      focusAreas: ['React expertise', 'System architecture', 'Team management']
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      role: 'UX Designer',
      experience: '4 years',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      matchPercentage: 88,
      strengths: ['User-centered design', 'Research methodology', 'Cross-functional collaboration'],
      focusAreas: ['Design process', 'User research', 'Stakeholder management']
    },
    { 
      id: 3, 
      name: 'Michael Chen', 
      role: 'Product Manager',
      experience: '6 years',
      skills: ['Agile', 'Data Analysis', 'Strategy', 'Roadmap Planning'],
      matchPercentage: 95,
      strengths: ['Strategic thinking', 'Data-driven decisions', 'Cross-team coordination'],
      focusAreas: ['Product strategy', 'Stakeholder alignment', 'Metrics and KPIs']
    },
  ];

  // tomiwa: NEW - Mock data for real-time guidance and AI summaries
  const mockKeywordTriggers = {
    'react': ['Ask about specific React hooks used', 'Explore component optimization strategies', 'Inquire about state management patterns'],
    'leadership': ['Ask for specific team size managed', 'Explore conflict resolution examples', 'Inquire about mentoring approach'],
    'optimization': ['Request specific metrics achieved', 'Ask about tools used for measurement', 'Explore before/after comparisons'],
    'budget': ['Ask about budget size managed', 'Explore cost-saving initiatives', 'Inquire about ROI measurement'],
    'stakeholder': ['Ask about stakeholder types managed', 'Explore communication strategies', 'Inquire about difficult stakeholder situations']
  };

  // tomiwa: Enhanced AI Interview Summary structure for post-interview analysis
  const mockInterviewSummary = {
    candidateOverview: {
      name: 'John Smith',
      role: 'Frontend Developer',
      experience: 'Senior Frontend Developer with 5+ years of experience in React ecosystem',
      coreSkills: ['React', 'TypeScript', 'Performance Optimization', 'Team Leadership'],
      strengths: ['Strong technical foundation', 'Proven leadership experience', 'Excellent communication skills']
    },
    interviewHighlights: [
      'Demonstrated deep understanding of React performance optimization techniques',
      'Provided specific examples of leading cross-functional teams of 8+ members',
      'Showed strong problem-solving approach with real-world scenarios',
      'Excellent communication and articulation of technical concepts'
    ],
    areasToClarity: [
      'Experience with large-scale state management (Redux vs Context API)',
      'Specific metrics for performance improvements achieved',
      'Experience with backend technologies and full-stack development',
      'Approach to handling technical debt in legacy codebases'
    ],
    aiSummaryParagraph: 'John demonstrates exceptional technical competency in React development with strong leadership capabilities. His responses show depth of experience and practical application of advanced concepts. The candidate exhibits excellent communication skills and provides concrete examples. Recommended for next round with focus on system architecture and scalability discussions. Overall assessment: Strong hire with potential for senior technical leadership role.',
    overallRating: 'Strong Hire',
    recommendedNextSteps: ['Technical architecture deep-dive', 'System design interview', 'Team culture fit assessment'],
    interviewDuration: '45 minutes',
    questionsAsked: 12,
    confidenceScore: 92
  };

  // tomiwa: Question types state with count indicators
  const [questionTypes, setQuestionTypes] = useState([
    { id: 'technical', label: 'Technical', count: 5 },
    { id: 'behavioral', label: 'Behavioral', count: 4 },
    { id: 'general', label: 'General', count: 3 },
    { id: 'leadership', label: 'Leadership', count: 3 },
    { id: 'custom', label: 'Custom', count: 0 }
  ]);

  // tomiwa: Enhanced sample questions with follow-up prompts
  const sampleQuestions = {
    technical: [
      {
        id: 1,
        question: 'Tell us about a time you optimized a React component for performance',
        category: 'Technical',
        followUps: [
          'What metrics did you use to measure the improvement?',
          'What specific optimization techniques did you apply?',
          'How did you validate the optimization results?'
        ]
      },
      {
        id: 2,
        question: 'How do you implement state management in large-scale applications?',
        category: 'Technical',
        followUps: [
          'Can you provide a specific example from your experience?',
          'What challenges did you face during implementation?',
          'How did you handle data persistence?'
        ]
      }
    ],
    behavioral: [
      {
        id: 3,
        question: 'Describe a time you resolved a team conflict',
        category: 'Behavioral',
        followUps: [
          'What was your specific role in resolving the conflict?',
          'How did you ensure all parties were satisfied?',
          'What did you learn from this experience?'
        ]
      },
      {
        id: 4,
        question: 'How do you handle tight deadlines and competing priorities?',
        category: 'Behavioral',
        followUps: [
          'Can you walk me through a specific example?',
          'What tools or methods do you use for prioritization?',
          'How do you communicate timeline challenges to stakeholders?'
        ]
      }
    ],
    leadership: [
      {
        id: 5,
        question: 'Tell us about a project where you had to lead a cross-functional team',
        category: 'Leadership',
        followUps: [
          'How did you align different team priorities?',
          'What challenges did you face leading diverse perspectives?',
'How did you measure the project\'s success?'
        ]
      },
      {
        id: 6,
        question: 'How do you approach mentoring junior team members?',
        category: 'Leadership',
        followUps: [
          'Can you share a specific mentoring success story?',
          'How do you adapt your mentoring style to different individuals?',
          'How do you measure mentoring effectiveness?'
        ]
      }
    ]
  };

  // tomiwa: Handle CV file upload with AI analysis for candidate profile extraction
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      setSelectedCandidate(null); // Clear any selected candidate when uploading CV
      
      // tomiwa: Simulate AI CV analysis and profile extraction
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowAISummary(true); // Show AI insights after CV analysis
        // In a real implementation, this would trigger CV parsing and AI analysis
      }, 3000);
    }
  };

  // tomiwa: Handle external meeting transcript upload
  const handleTranscriptUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setTranscriptUploaded(true);
      setIsAnalyzing(true);
      
      // tomiwa: Simulate transcript processing and summary generation
      setTimeout(() => {
        setIsAnalyzing(false);
        setInterviewSummaryGenerated(true);
        setShowAISummary(true);
      }, 4000);
    }
  };

  // tomiwa: Handle meeting integration (Zoom/Google Meet)
  const handleMeetingIntegration = (platform) => {
    if (platform === 'zoom') {
      setZoomIntegrationEnabled(!zoomIntegrationEnabled);
      if (!zoomIntegrationEnabled) {
        setMeetingUrl('https://zoom.us/j/123456789');
        setMeetingLinked(true);
      } else {
        setMeetingUrl('');
        setMeetingLinked(false);
      }
    } else if (platform === 'meet') {
      setMeetIntegrationEnabled(!meetIntegrationEnabled);
      if (!meetIntegrationEnabled) {
        setMeetingUrl('https://meet.google.com/abc-defg-hij');
        setMeetingLinked(true);
      } else {
        setMeetingUrl('');
        setMeetingLinked(false);
      }
    }
  };

  // tomiwa: NEW - Show meeting selection modal instead of direct join
  const handleJoinMeeting = () => {
    if (zoomIntegrationEnabled || meetIntegrationEnabled) {
      setShowMeetingModal(true);
    }
  };

  // tomiwa: NEW - Handle joining specific meeting from modal
  const handleJoinSpecificMeeting = (meeting) => {
    setActiveMeeting(meeting);
    setAiAssistantActive(true);
    
    // tomiwa: Open the meeting URL in a new tab
    if (meeting.meetingUrl) {
      window.open(meeting.meetingUrl, '_blank');
    }
    
    // tomiwa: Close the modal
    setShowMeetingModal(false);
  };

  // tomiwa: NEW - Handle AI assistant controls
  const handleToggleRecording = (isRecording) => {
    // tomiwa: In real implementation, this would control actual recording
    console.log('Recording toggled:', isRecording);
  };

  // tomiwa: NEW - Handle ending AI session
  const handleEndAISession = () => {
    setAiAssistantActive(false);
    setActiveMeeting(null);
    setInterviewSummaryGenerated(true); // Show summary after session ends
    setShowAISummary(true);
  };

  // tomiwa: Export questions functionality
  const handleExportQuestions = (format) => {
    setQuestionsExported(true);
    // tomiwa: In real implementation, this would generate and download the file
    setTimeout(() => {
      alert(`Questions exported as ${format.toUpperCase()} successfully!`);
      setQuestionsExported(false);
    }, 1500);
  };

  // tomiwa: Copy questions to clipboard
  const handleCopyToClipboard = () => {
    const questionsText = Object.entries(sampleQuestions)
      .map(([category, questions]) => {
        const categoryQuestions = questions.map(q => `• ${q.question}`).join('\n');
        return `${category.toUpperCase()} QUESTIONS:\n${categoryQuestions}`;
      })
      .join('\n\n');
    
    navigator.clipboard.writeText(questionsText);
    alert('Questions copied to clipboard!');
  };

  // tomiwa: Save questions to candidate record
  const handleSaveToRecord = () => {
    alert('Questions saved to candidate record successfully!');
  };

  // tomiwa: Generate and export interview summary
  const handleExportSummary = (format) => {
    // tomiwa: In real implementation, this would generate and download the summary
    alert(`Interview summary exported as ${format.toUpperCase()} successfully!`);
  };

  // tomiwa: Regenerate AI summary
  const handleRegenerateSummary = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      alert('AI summary regenerated with updated analysis!');
    }, 2000);
  };

  // tomiwa: State for custom question types
  const [customQuestionTypes, setCustomQuestionTypes] = useState([]);

  // tomiwa: Toggle question types with count
  const toggleQuestionType = (typeId) => {
    if (typeId === 'custom') {
      setIsCustomTypeModalOpen(true);
      return;
    }
    setSelectedQuestionTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  // tomiwa: Handle custom question type selection
  const handleCustomTypeSelect = (category) => {
    // Add to question types if not already present
    setQuestionTypes(prev => {
      if (prev.find(t => t.id === category.id)) return prev;
      return [...prev, {
        id: category.id,
        label: category.label,
        count: 0
      }];
    });
    
    // Select the custom type
    setSelectedQuestionTypes(prev => 
      prev.includes(category.id)
        ? prev.filter(t => t !== category.id)
        : [...prev, category.id]
    );
  };


  // tomiwa: Handle saving custom questions - NEW function to fix the error
  const handleSaveCustomQuestion = (questionData) => {
    // tomiwa: Add the new custom question to the appropriate category
    if (questionData.id) {
      // tomiwa: Editing existing question
      setSampleQuestions(prev => {
        const updatedQuestions = { ...prev };
        Object.keys(updatedQuestions).forEach(category => {
          updatedQuestions[category] = updatedQuestions[category].map(q => 
            q.id === questionData.id ? { ...q, ...questionData } : q
          );
        });
        return updatedQuestions;
      });
    } else {
      // tomiwa: Adding new question
      const newQuestion = {
        ...questionData,
        id: Date.now(), // Simple ID generation
        followUps: questionData.followUps || []
      };
      
      setSampleQuestions(prev => ({
        ...prev,
        [questionData.category.toLowerCase()]: [
          ...(prev[questionData.category.toLowerCase()] || []),
          newQuestion
        ]
      }));
      
      // tomiwa: Update question type count
      setQuestionTypes(prev => 
        prev.map(type => 
          type.id === questionData.category.toLowerCase()
            ? { ...type, count: type.count + 1 }
            : type
        )
      );
    }
    
    // tomiwa: Close the modal
    setIsAddQuestionModalOpen(false);
    setQuestionToEdit(null);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* tomiwa: Header Section - Clean and professional */}
      <div className="flex justify-between items-start mb-8">
        <div className="max-w-4xl">
          <h1 className="font-display text-3xl text-brand-black mb-2">
            AI Interview Assistant
          </h1>
          <p className="text-neutral-600 text-lg">
            Prepare interview questions using candidate data, integrate with external meetings, 
            and generate AI-powered interview summaries — all in one streamlined workflow.
          </p>
        </div>
      </div>

      {/* tomiwa: Interview Mode Selection - Two main modes */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-display text-xl text-brand-black mb-4">Interview Mode</h2>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setInterviewMode('prep')}
            className={`px-6 py-3 rounded-xl font-medium transition-colors flex-1 ${
              interviewMode === 'prep'
                ? 'bg-brand-orange text-white'
                : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <div className="text-center">
              <div className="font-semibold">Interview Prep</div>
              <div className="text-sm opacity-75">Question Builder & Preparation</div>
            </div>
          </button>
          <button
            onClick={() => setInterviewMode('external')}
            className={`px-6 py-3 rounded-xl font-medium transition-colors flex-1 ${
              interviewMode === 'external'
                ? 'bg-brand-orange text-white'
                : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <div className="text-center">
              <div className="font-semibold">External Meeting</div>
              <div className="text-sm opacity-75">Zoom, Meet, or Transcript Upload</div>
            </div>
          </button>
        </div>
        
        {/* tomiwa: External meeting integration options */}
        {interviewMode === 'external' && (
          <div className="bg-neutral-50 rounded-xl p-4">
            <h3 className="font-semibold text-brand-black mb-3">External Meeting Options</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
              <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="zoom-integration" 
                    className="rounded text-brand-orange focus:ring-brand-orange"
                    checked={zoomIntegrationEnabled}
                    onChange={() => handleMeetingIntegration('zoom')}
                  />
                  <label htmlFor="zoom-integration" className="text-neutral-700 font-medium">Enable Zoom Integration</label>
              </div>
                {zoomIntegrationEnabled && meetingLinked && (
                  <button
                    onClick={handleJoinMeeting}
                    className="px-4 py-2 bg-brand-aqua text-white rounded-lg text-sm hover:bg-cyan-600 transition-colors"
                  >
                    Join Meeting
                  </button>
                )}
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
              <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="meet-integration" 
                    className="rounded text-brand-orange focus:ring-brand-orange"
                    checked={meetIntegrationEnabled}
                    onChange={() => handleMeetingIntegration('meet')}
                  />
                  <label htmlFor="meet-integration" className="text-neutral-700 font-medium">Enable Google Meet Integration</label>
              </div>
                {meetIntegrationEnabled && meetingLinked && (
                  <button
                    onClick={handleJoinMeeting}
                    className="px-4 py-2 bg-brand-aqua text-white rounded-lg text-sm hover:bg-cyan-600 transition-colors"
                  >
                    Join Meeting
                  </button>
                )}
              </div>
              
              <div className="border-t border-neutral-200 pt-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Or upload meeting transcript for AI analysis:
                </label>
                <input
                  type="file"
                  accept=".txt,.docx,.pdf"
                  onChange={handleTranscriptUpload}
                  className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-brand-aqua file:text-white hover:file:bg-cyan-600"
                />
                {transcriptUploaded && (
                  <p className="text-sm text-brand-aqua mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-aqua rounded-full"></span>
                    Transcript uploaded and processed successfully
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* tomiwa: Candidate Selection Section - Only show in Interview Prep mode */}
      {interviewMode === 'prep' && (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* tomiwa: Select Candidate from Platform Database */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-display text-xl text-brand-black mb-4">Select Candidate</h2>
          <select
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 bg-white mb-4 focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            value={selectedCandidate}
              onChange={(e) => {
                setSelectedCandidate(e.target.value);
                setUploadedFile(null); // Clear uploaded file when selecting candidate
                if (e.target.value) setShowAISummary(true);
              }}
            >
              <option value="">Choose a candidate from platform...</option>
            {mockCandidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} - {candidate.role} ({candidate.matchPercentage}% match)
              </option>
            ))}
          </select>
          
          {selectedCandidate && (
              <div className="bg-neutral-50 rounded-xl p-4">
                <h3 className="font-semibold text-brand-black mb-3">Candidate Profile</h3>
                <div className="space-y-3">
                {(() => {
                  const candidate = mockCandidates.find(c => c.id === Number(selectedCandidate));
                  return candidate ? (
                    <>
                        <div>
                          <p className="text-sm font-medium text-neutral-700">Experience</p>
                          <p className="text-neutral-600">{candidate.experience}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-700">Key Skills</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {candidate.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-brand-aqua bg-opacity-10 text-brand-aqua text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-700">Match Score</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 bg-neutral-200 rounded-full h-2">
                              <div 
                                className="bg-brand-orange h-2 rounded-full" 
                                style={{ width: `${candidate.matchPercentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-brand-orange">{candidate.matchPercentage}%</span>
                          </div>
                        </div>
                    </>
                  ) : null;
                })()}
              </div>
            </div>
          )}
        </div>

          {/* tomiwa: Upload CV File Alternative */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-display text-xl text-brand-black mb-4">Upload CV File</h2>
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-brand-orange transition-colors">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="cv-upload"
            />
            <label htmlFor="cv-upload" className="cursor-pointer">
                <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
                <p className="text-neutral-700 font-medium mb-2">Upload candidate CV for AI analysis</p>
                <p className="text-neutral-500 text-sm">Drag and drop or click to browse</p>
                <p className="text-neutral-400 text-xs mt-1">Supported: PDF, DOCX (Max 10MB)</p>
            </label>
      </div>

            {uploadedFile && (
              <div className="mt-4 p-3 bg-neutral-50 rounded-xl">
            <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-orange bg-opacity-10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
            </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-700">{uploadedFile.name}</p>
                    <p className="text-xs text-neutral-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
              </div>
            </div>
          )}

          {isAnalyzing && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 text-brand-orange">
                  <div className="w-4 h-4 border-2 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Analyzing CV with AI...</span>
              </div>
            </div>
          )}
        </div>
        </div>
      )}

      {/* tomiwa: Question Types Section - Only show in Interview Prep mode when candidate/CV is selected */}
      {interviewMode === 'prep' && (selectedCandidate || uploadedFile) && (
      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="font-display text-xl text-brand-black mb-4">Question Types</h2>
          <p className="text-neutral-600 mb-6">Select the types of questions you want AI to generate based on the candidate profile.</p>
          
        <div className="flex flex-wrap gap-3 mb-6">
          {questionTypes.filter(type => type.id !== 'custom').map((type) => (
            <button
              key={type.id}
              onClick={() => toggleQuestionType(type.id)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedQuestionTypes.includes(type.id)
                    ? 'bg-brand-orange text-white shadow-md'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-brand-orange'
                }`}
            >
              {type.label}
              {type.count > 0 && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedQuestionTypes.includes(type.id)
                    ? 'bg-white text-brand-orange'
                    : 'bg-neutral-100 text-neutral-600'
                  }`}>
                  {type.count}
                </span>
              )}
            </button>
          ))}
            
            {/* tomiwa: Custom Type and Question Buttons */}
          <button
            onClick={() => setIsCustomTypeModalOpen(true)}
              className="px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2
              bg-white border border-brand-orange text-brand-orange hover:bg-orange-50"
          >
            + Add Custom Type
          </button>
          
          <button
            onClick={() => setIsAddQuestionModalOpen(true)}
              className="px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2
              bg-white border border-brand-aqua text-brand-aqua hover:bg-cyan-50"
          >
            + Add Custom Question
          </button>
        </div>

          {/* tomiwa: Selected question types summary */}
          {selectedQuestionTypes.length > 0 && (
            <div className="bg-neutral-50 rounded-xl p-4">
              <h3 className="font-semibold text-brand-black mb-2">Selected Categories</h3>
              <div className="flex flex-wrap gap-2">
                {selectedQuestionTypes.map((typeId) => {
                  const type = questionTypes.find(t => t.id === typeId);
                  return type ? (
                    <span key={typeId} className="px-3 py-1 bg-brand-orange text-white text-sm rounded-full">
                      {type.label} ({type.count} questions)
                    </span>
                  ) : null;
                })}
      </div>
            </div>
          )}
        </div>
      )}

      {/* tomiwa: Main Content Area - Different layouts for different modes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* tomiwa: Left Panel - Questions or Summary based on mode */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* tomiwa: Interview Prep Mode - Show Generated Questions */}
          {interviewMode === 'prep' && (selectedCandidate || uploadedFile) && (
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-xl text-brand-black">AI-Generated Questions</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyToClipboard}
                    className="px-3 py-2 text-sm bg-white border border-brand-aqua text-brand-aqua rounded-lg hover:bg-cyan-50 transition-colors"
                  >
                    Copy to Clipboard
                  </button>
                            <button 
                    onClick={() => handleExportQuestions('pdf')}
                    className="px-3 py-2 text-sm bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
                    disabled={questionsExported}
                            >
                    {questionsExported ? 'Exporting...' : 'Export PDF'}
                            </button>
                          </div>
                        </div>
              
              {/* tomiwa: Display questions by selected categories */}
              {selectedQuestionTypes.length > 0 ? (
                <div className="space-y-6">
                  {selectedQuestionTypes.map((categoryId) => {
                    const questions = sampleQuestions[categoryId] || [];
                    const categoryName = questionTypes.find(t => t.id === categoryId)?.label || categoryId;
                    
                    return (
                      <div key={categoryId} className="border-b border-neutral-100 pb-6 last:border-b-0">
                        <h3 className="font-semibold text-brand-black mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                          {categoryName} Questions
                        </h3>
                        <div className="space-y-3">
                          {questions.map((q, index) => (
                            <div key={q.id} className="group">
                              <div className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                                <div className="flex items-start gap-3">
                                  <span className="flex-shrink-0 w-6 h-6 bg-brand-orange text-white text-xs rounded-full flex items-center justify-center font-medium">
                                    {index + 1}
                                  </span>
                                  <div className="flex-1">
                                    <p className="text-neutral-700 font-medium mb-2">{q.question}</p>
                                    {/* tomiwa: Follow-up suggestions on hover */}
                                    <div className="hidden group-hover:block">
                                      <p className="text-sm text-neutral-600 mb-2">Follow-up suggestions:</p>
                                      <ul className="text-sm text-neutral-600 space-y-1">
                                        {q.followUps?.map((followUp, idx) => (
                                          <li key={idx} className="flex items-start gap-2">
                                            <span className="text-brand-aqua">•</span>
                                            {followUp}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-neutral-600">Select question types above to generate AI-powered interview questions</p>
                </div>
              )}
            </div>
          )}

          {/* tomiwa: External Meeting Mode - Show Interview Summary */}
          {interviewMode === 'external' && interviewSummaryGenerated && (
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-xl text-brand-black">AI Interview Summary</h2>
                        <div className="flex gap-2">
                          <button 
                    onClick={handleRegenerateSummary}
                    className="px-3 py-2 text-sm bg-white border border-brand-aqua text-brand-aqua rounded-lg hover:bg-cyan-50 transition-colors"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? 'Regenerating...' : 'Regenerate'}
                  </button>
                  <button
                    onClick={() => handleExportSummary('pdf')}
                    className="px-3 py-2 text-sm bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Export Summary
                          </button>
                        </div>
                      </div>

              <div className="space-y-6">
                {/* tomiwa: Candidate Overview */}
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <h3 className="font-semibold text-brand-black mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-aqua rounded-full"></span>
                    Candidate Overview
                  </h3>
                  <div className="space-y-2">
                    <p className="text-neutral-700"><span className="font-medium">Name:</span> {mockInterviewSummary.candidateOverview.name}</p>
                    <p className="text-neutral-700"><span className="font-medium">Role:</span> {mockInterviewSummary.candidateOverview.role}</p>
                    <p className="text-neutral-700"><span className="font-medium">Experience:</span> {mockInterviewSummary.candidateOverview.experience}</p>
                    <div>
                      <p className="font-medium text-neutral-700 mb-2">Core Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {mockInterviewSummary.candidateOverview.coreSkills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-brand-aqua bg-opacity-10 text-brand-aqua text-sm rounded-full">
                            {skill}
                          </span>
                  ))}
                </div>
              </div>
                    </div>
                </div>

                {/* tomiwa: Interview Highlights */}
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <h3 className="font-semibold text-brand-black mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                    Interview Highlights
                  </h3>
                  <ul className="space-y-2">
                    {mockInterviewSummary.interviewHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-brand-orange text-white text-xs rounded-full flex items-center justify-center font-medium mt-0.5">
                          ✓
                        </span>
                        <span className="text-neutral-700">{highlight}</span>
                      </li>
                    ))}
                    </ul>
                    </div>

                {/* tomiwa: Areas to Clarify */}
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <h3 className="font-semibold text-brand-black mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-yellow rounded-full"></span>
                    Areas to Clarify
                  </h3>
                  <ul className="space-y-2">
                    {mockInterviewSummary.areasToClarity.map((area, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-brand-yellow text-brand-black text-xs rounded-full flex items-center justify-center font-medium mt-0.5">
                          ?
                        </span>
                        <span className="text-neutral-700">{area}</span>
                      </li>
                    ))}
                    </ul>
                  </div>

                {/* tomiwa: AI Summary Paragraph */}
                <div className="p-4 bg-gradient-to-r from-brand-orange to-brand-aqua bg-opacity-10 rounded-xl border border-brand-orange border-opacity-20">
                  <h3 className="font-semibold text-brand-black mb-3">Final AI Assessment</h3>
                  <p className="text-neutral-700 leading-relaxed">{mockInterviewSummary.aiSummaryParagraph}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-orange border-opacity-20">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-neutral-700">Overall Rating:</span>
                      <span className="px-3 py-1 bg-brand-orange text-white text-sm font-medium rounded-full">
                        {mockInterviewSummary.overallRating}
                      </span>
                  </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-600">Confidence:</span>
                      <span className="text-sm font-medium text-brand-orange">{mockInterviewSummary.confidenceScore}%</span>
                </div>
              </div>
          </div>
              </div>
            </div>
          )}
        </div>

        {/* tomiwa: Right Panel - AI Insight Summary and Actions */}
        <div className="space-y-6">
          
          {/* tomiwa: AI Insight Summary - Show when candidate/CV is selected */}
          {(selectedCandidate || uploadedFile) && showAISummary && (
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-display text-xl text-brand-black mb-4">AI Insight Summary</h2>
            
            <div className="space-y-4">
                {/* tomiwa: Key Focus Areas based on candidate profile */}
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <h3 className="font-semibold text-brand-black mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-aqua rounded-full"></span>
                    Key Focus Areas
                  </h3>
                <ul className="space-y-2 text-neutral-600">
                    {(() => {
                      const candidate = selectedCandidate ? mockCandidates.find(c => c.id === Number(selectedCandidate)) : null;
                      const focusAreas = candidate?.focusAreas || ['Technical expertise', 'Problem-solving approach', 'Communication skills'];
                      return focusAreas.map((area, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-aqua rounded-full"></span>
                          {area}
                        </li>
                      ));
                    })()}
                </ul>
              </div>

                {/* tomiwa: Suggested Interview Duration */}
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <h3 className="font-semibold text-brand-black mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                    Suggested Duration
                  </h3>
                  <div className="flex items-center justify-between">
                <p className="text-neutral-600">30-45 minutes</p>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-brand-orange font-medium">Optimal</span>
              </div>
            </div>
          </div>

                {/* tomiwa: Candidate Strengths */}
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <h3 className="font-semibold text-brand-black mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-yellow rounded-full"></span>
                    Candidate Strengths
                  </h3>
                  <div className="space-y-2">
                    {(() => {
                      const candidate = selectedCandidate ? mockCandidates.find(c => c.id === Number(selectedCandidate)) : null;
                      const strengths = candidate?.strengths || ['Strong technical foundation', 'Problem-solving skills', 'Team collaboration'];
                      return strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="w-4 h-4 bg-brand-yellow text-brand-black text-xs rounded-full flex items-center justify-center font-bold">
                            +
                          </span>
                          <span className="text-neutral-600 text-sm">{strength}</span>
            </div>
                      ));
                    })()}
                  </div>
                  </div>
              </div>
            </div>
          )}

          {/* tomiwa: Action Buttons Panel */}
          {(selectedCandidate || uploadedFile || interviewSummaryGenerated) && (
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-brand-black mb-4">Actions</h3>
              
              <div className="space-y-3">
                {/* tomiwa: Interview Prep Mode Actions */}
                {interviewMode === 'prep' && (selectedCandidate || uploadedFile) && (
                  <>
            <button 
                      onClick={handleSaveToRecord}
                      className="w-full px-4 py-3 bg-brand-orange text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
            >
                      Save Questions to Candidate Record
            </button>
            <button 
                      onClick={() => handleExportQuestions('doc')}
                      className="w-full px-4 py-3 bg-white border border-brand-aqua text-brand-aqua rounded-xl hover:bg-cyan-50 transition-colors font-medium"
                      disabled={questionsExported}
            >
                      {questionsExported ? 'Exporting...' : 'Export as Document'}
            </button>
            <button 
                      onClick={handleCopyToClipboard}
                      className="w-full px-4 py-3 bg-white border border-brand-yellow text-brand-yellow rounded-xl hover:bg-yellow-50 transition-colors font-medium"
                    >
                      Copy to Clipboard
            </button>
                  </>
                )}

                {/* tomiwa: External Meeting Mode Actions */}
                {interviewMode === 'external' && interviewSummaryGenerated && (
                  <>
            <button 
                      onClick={() => handleExportSummary('doc')}
                      className="w-full px-4 py-3 bg-brand-orange text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
            >
                      Export Summary as Document
            </button>
                    <button 
                      onClick={() => alert('Summary saved to candidate record!')}
                      className="w-full px-4 py-3 bg-white border border-brand-aqua text-brand-aqua rounded-xl hover:bg-cyan-50 transition-colors font-medium"
                    >
                      Save to Candidate Record
                    </button>
                    <button 
                      onClick={handleRegenerateSummary}
                      className="w-full px-4 py-3 bg-white border border-brand-yellow text-brand-yellow rounded-xl hover:bg-yellow-50 transition-colors font-medium"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? 'Regenerating...' : 'Regenerate Summary'}
                    </button>
                  </>
                )}
          </div>
            </div>
          )}

          {/* tomiwa: Getting Started Guide - Show when no candidate/CV selected */}
          {!selectedCandidate && !uploadedFile && !interviewSummaryGenerated && (
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-brand-black mb-4">Getting Started</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-brand-orange text-white text-sm rounded-full flex items-center justify-center font-medium">
                    1
                  </span>
                  <div>
                    <p className="font-medium text-neutral-700">Choose Your Mode</p>
                    <p className="text-sm text-neutral-600">Select Interview Prep to prepare questions or External Meeting to analyze transcripts</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-brand-aqua text-white text-sm rounded-full flex items-center justify-center font-medium">
                    2
                  </span>
                  <div>
                    <p className="font-medium text-neutral-700">Select Candidate or Upload CV</p>
                    <p className="text-sm text-neutral-600">Choose from platform database or upload a CV file for AI analysis</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-brand-yellow text-brand-black text-sm rounded-full flex items-center justify-center font-medium">
                    3
                  </span>
                  <div>
                    <p className="font-medium text-neutral-700">Generate & Export</p>
                    <p className="text-sm text-neutral-600">AI will generate questions or summaries that you can export and save</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* tomiwa: Floating AI Indicator - Shows when AI assistant is active */}
      <FloatingAIIndicator
        isActive={aiAssistantActive}
        meetingInfo={activeMeeting}
        onToggleRecording={handleToggleRecording}
        onEndSession={handleEndAISession}
        position="bottom-right"
      />

      {/* Modals */}
      <CustomQuestionTypeModal
        isOpen={isCustomTypeModalOpen}
        onClose={() => setIsCustomTypeModalOpen(false)}
        onSelectType={handleCustomTypeSelect}
      />

      <AddCustomQuestionModal
        isOpen={isAddQuestionModalOpen}
        onClose={() => {
          setIsAddQuestionModalOpen(false);
          setQuestionToEdit(null);
        }}
        onSave={handleSaveCustomQuestion}
        initialQuestion={questionToEdit}
      />

      {/* tomiwa: NEW - Meeting Selection Modal */}
      <MeetingSelectionModal
        isOpen={showMeetingModal}
        onClose={() => setShowMeetingModal(false)}
        onJoinMeeting={handleJoinSpecificMeeting}
      />
    </div>
  );
}