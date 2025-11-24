'use client';

import { useState, useEffect } from 'react';

// tomiwa: Floating AI Indicator component that shows when AI assistant is active during meetings
// This component provides visual feedback and controls for the AI assistant during live interviews
export default function FloatingAIIndicator({ 
  isActive = false, 
  meetingInfo = null, 
  onToggleRecording = null,
  onEndSession = null,
  position = 'bottom-right' // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
}) {
  // tomiwa: State management for the floating indicator
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [aiInsights, setAiInsights] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  // tomiwa: Mock AI insights that appear during the session
  const mockInsights = [
    "Candidate mentioned React performance - consider asking about specific optimization techniques",
    "Strong technical response - follow up on scalability experience",
    "Good communication skills demonstrated - explore team leadership examples",
    "Candidate seems confident - consider more challenging technical questions"
  ];

  // tomiwa: Session timer effect
  useEffect(() => {
    let interval;
    if (isActive && isRecording) {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isRecording]);

  // tomiwa: Simulate AI insights appearing during the session
  useEffect(() => {
    if (isActive && isRecording) {
      const insightInterval = setInterval(() => {
        if (aiInsights.length < mockInsights.length) {
          setAiInsights(prev => [...prev, mockInsights[prev.length]]);
        }
      }, 15000); // New insight every 15 seconds

      return () => clearInterval(insightInterval);
    }
  }, [isActive, isRecording, aiInsights.length]);

  // tomiwa: Format session duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // tomiwa: Handle recording toggle
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (onToggleRecording) {
      onToggleRecording(!isRecording);
    }
  };

  // tomiwa: Handle ending session
  const handleEndSession = () => {
    if (onEndSession) {
      onEndSession();
    }
  };

  // tomiwa: Get position classes based on position prop
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      case 'bottom-right':
      default:
        return 'bottom-6 right-6';
    }
  };

  // tomiwa: Handle drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragPosition.x;
      const newY = e.clientY - dragPosition.y;
      
      // tomiwa: Keep within viewport bounds
      const maxX = window.innerWidth - 300;
      const maxY = window.innerHeight - 100;
      
      e.currentTarget.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
      e.currentTarget.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
      e.currentTarget.style.bottom = 'auto';
      e.currentTarget.style.right = 'auto';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // tomiwa: Don't render if not active
  if (!isActive) return null;

  return (
    <div
      className={`fixed z-50 ${!isDragging ? getPositionClasses() : ''} transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-80' : 'w-16'
      }`}
      style={isDragging ? { position: 'fixed' } : {}}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* tomiwa: Collapsed State - Floating Button */}
      {!isExpanded && (
        <div
          onClick={() => setIsExpanded(true)}
          className="w-16 h-16 bg-brand-orange rounded-full shadow-lg cursor-pointer hover:bg-orange-600 transition-colors flex items-center justify-center group"
        >
          <div className="relative">
            {/* tomiwa: AI Icon */}
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            
            {/* tomiwa: Recording Pulse Animation */}
            {isRecording && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
            )}
          </div>
          
          {/* tomiwa: Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-brand-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            AI Assistant Active
          </div>
        </div>
      )}

      {/* tomiwa: Expanded State - Full Panel */}
      {isExpanded && (
        <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
          {/* tomiwa: Header */}
          <div className="bg-brand-orange text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  {isRecording && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs opacity-90">
                    {isRecording ? 'Recording & Analyzing' : 'Paused'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* tomiwa: Meeting Info */}
          {meetingInfo && (
            <div className="p-4 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <img
                  src={meetingInfo.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                  alt={meetingInfo.candidateName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brand-black text-sm truncate">
                    {meetingInfo.candidateName}
                  </p>
                  <p className="text-xs text-neutral-600">{meetingInfo.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-brand-orange">
                    {formatDuration(sessionDuration)}
                  </p>
                  <p className="text-xs text-neutral-500">Duration</p>
                </div>
              </div>
            </div>
          )}

          {/* tomiwa: AI Insights */}
          <div className="p-4 max-h-48 overflow-y-auto">
            <h4 className="font-medium text-brand-black text-sm mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-aqua rounded-full"></span>
              Real-time Insights
            </h4>
            
            {aiInsights.length > 0 ? (
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-3 bg-neutral-50 rounded-lg border-l-2 border-brand-aqua animate-fade-in"
                  >
                    <p className="text-sm text-neutral-700">{insight}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {Math.floor((index + 1) * 15 / 60)}:{((index + 1) * 15 % 60).toString().padStart(2, '0')} ago
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-neutral-600">AI insights will appear here</p>
              </div>
            )}
          </div>

          {/* tomiwa: Controls */}
          <div className="p-4 border-t border-neutral-200 bg-neutral-50">
            <div className="flex gap-2">
              <button
                onClick={handleToggleRecording}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isRecording
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-brand-aqua text-white hover:bg-cyan-600'
                }`}
              >
                {isRecording ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                    Pause
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent"></div>
                    Resume
                  </div>
                )}
              </button>
              
              <button
                onClick={handleEndSession}
                className="px-3 py-2 bg-neutral-200 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-300 transition-colors"
              >
                End
              </button>
            </div>
            
            <div className="flex items-center justify-center mt-3 text-xs text-neutral-500">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4" />
              </svg>
              Auto-saving notes & insights
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
