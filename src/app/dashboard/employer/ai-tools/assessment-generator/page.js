'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// tomiwa: AI Assessment Generator page for creating and auto-grading role-specific assessments
export default function AIAssessmentGenerator() {
  // tomiwa: Core state management for assessment creation and management
  const [activeTab, setActiveTab] = useState('create');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('scenario-simulation');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [assessmentDescription, setAssessmentDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(60);
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // tomiwa: Search and filter states for managing assessments
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  
  // tomiwa: Modal states for various interactions
  const [showPreview, setShowPreview] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedTypeInfo, setSelectedTypeInfo] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [deploymentSettings, setDeploymentSettings] = useState({
    sendImmediately: true,
    deadline: '',
    emailTemplate: 'default',
    allowRetakes: false,
    showResults: true
  });

  // tomiwa: Universal assessment types with detailed descriptions and examples
  const assessmentTypes = [
    { 
      id: 'scenario-simulation', 
      label: 'Scenario Simulation', 
      icon: '🎯',
      description: 'Real-world business challenges tailored to the role',
      detailedDescription: 'Replicates real-world business challenges tailored to the role (leadership, problem-solving, decision-making).',
      example: 'How would you handle a 20% budget cut while maintaining growth targets?',
      skills: ['Leadership', 'Problem-solving', 'Decision-making', 'Strategic thinking']
    },
    { 
      id: 'knowledge-evaluation', 
      label: 'Knowledge Evaluation', 
      icon: '📚',
      description: 'Tests domain knowledge and professional understanding',
      detailedDescription: 'Tests domain knowledge or professional understanding across industries (marketing, finance, HR, operations, tech).',
      example: 'Multiple-choice or short-answer questions relevant to the job.',
      skills: ['Domain expertise', 'Technical knowledge', 'Industry understanding', 'Professional competency']
    },
    { 
      id: 'strategy-analysis', 
      label: 'Strategy & Analysis Task', 
      icon: '📊',
      description: 'Role-based assessments for planning and reasoning',
      detailedDescription: 'Role-based assessments that test planning, reasoning, and data interpretation.',
      example: 'Analyze this quarterly report and propose three insights.',
      skills: ['Strategic planning', 'Data analysis', 'Critical thinking', 'Business reasoning']
    },
    { 
      id: 'creative-communication', 
      label: 'Creative/Communication Challenge', 
      icon: '🎨',
      description: 'Evaluates presentation and storytelling skills',
      detailedDescription: 'Evaluates presentation, content, design, or storytelling skills depending on the role.',
      example: 'Draft a short email campaign for a product launch.',
      skills: ['Communication', 'Creativity', 'Presentation', 'Content creation']
    }
  ];

  // tomiwa: Role categories for targeted assessments
  const roleCategories = [
    { id: 'frontend-developer', label: 'Frontend Developer' },
    { id: 'backend-developer', label: 'Backend Developer' },
    { id: 'fullstack-developer', label: 'Full Stack Developer' },
    { id: 'data-scientist', label: 'Data Scientist' },
    { id: 'product-manager', label: 'Product Manager' },
    { id: 'ux-designer', label: 'UX Designer' },
    { id: 'ui-designer', label: 'UI Designer' },
    { id: 'devops-engineer', label: 'DevOps Engineer' },
    { id: 'marketing-manager', label: 'Marketing Manager' },
    { id: 'sales-representative', label: 'Sales Representative' }
  ];

  // tomiwa: Difficulty levels with time estimates
  const difficultyLevels = [
    { id: 'beginner', label: 'Beginner', time: '30-45 min', color: 'bg-green-100 text-green-800' },
    { id: 'intermediate', label: 'Intermediate', time: '45-75 min', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'advanced', label: 'Advanced', time: '60-120 min', color: 'bg-red-100 text-red-800' }
  ];

  // tomiwa: Mock assessments data for demonstration
  const mockAssessments = [
    {
      id: 1,
      title: 'React Frontend Challenge',
      type: 'Coding Challenge',
      role: 'Frontend Developer',
      difficulty: 'Intermediate',
      timeLimit: 90,
      questions: 5,
      completions: 23,
      avgScore: 78,
      status: 'Active',
      created: '2024-10-01',
      lastUsed: '2024-10-12'
    },
    {
      id: 2,
      title: 'Product Strategy Case Study',
      type: 'Case Study',
      role: 'Product Manager',
      difficulty: 'Advanced',
      timeLimit: 120,
      questions: 3,
      completions: 15,
      avgScore: 82,
      status: 'Active',
      created: '2024-09-28',
      lastUsed: '2024-10-10'
    },
    {
      id: 3,
      title: 'JavaScript Fundamentals Quiz',
      type: 'Knowledge Quiz',
      role: 'Frontend Developer',
      difficulty: 'Beginner',
      timeLimit: 45,
      questions: 20,
      completions: 45,
      avgScore: 71,
      status: 'Draft',
      created: '2024-10-05',
      lastUsed: 'Never'
    },
    {
      id: 4,
      title: 'UX Research & Design Challenge',
      type: 'Design Challenge',
      role: 'UX Designer',
      difficulty: 'Intermediate',
      timeLimit: 75,
      questions: 4,
      completions: 12,
      avgScore: 85,
      status: 'Active',
      created: '2024-09-25',
      lastUsed: '2024-10-11'
    }
  ];

  // tomiwa: Mock candidates data for deployment
  const mockCandidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      role: 'Frontend Developer',
      experience: '3 years',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      role: 'Full Stack Developer',
      experience: '5 years',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      location: 'New York, NY'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      role: 'Backend Developer',
      experience: '4 years',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      location: 'Austin, TX'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@email.com',
      role: 'Frontend Developer',
      experience: '2 years',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      skills: ['Vue.js', 'JavaScript', 'Sass', 'Figma'],
      location: 'Seattle, WA'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      role: 'UX Designer',
      experience: '6 years',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
      location: 'Los Angeles, CA'
    },
    {
      id: 6,
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      role: 'DevOps Engineer',
      experience: '7 years',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
      location: 'Denver, CO'
    }
  ];

  // tomiwa: Handle showing assessment type info modal
  const handleShowTypeInfo = (type) => {
    setSelectedTypeInfo(type);
    setShowInfoModal(true);
  };

  // tomiwa: Generate AI assessment function
  const handleGenerateAssessment = async () => {
    if (!selectedRole || !assessmentTitle) {
      alert('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    
    // tomiwa: Simulate AI generation process
    setTimeout(() => {
      const generatedQuestions = generateQuestionsForType(selectedAssessmentType, selectedRole, selectedDifficulty);
      setQuestions(generatedQuestions);
      setIsGenerating(false);
    }, 3000);
  };

  // tomiwa: Generate comprehensive 60-question assessment based on type and role
  const generateQuestionsForType = (type, role, difficulty) => {
    // tomiwa: Create a comprehensive 60-question test with multiple categories
    const generateComprehensiveQuestions = () => {
      const questions = [];
      let questionId = 1;

      // tomiwa: Technical Knowledge Questions (20 questions)
      const technicalQuestions = [
        'What is the difference between let, const, and var in JavaScript?',
        'Explain the concept of closures in JavaScript with an example.',
        'What is the Virtual DOM and how does it improve performance?',
        'Describe the difference between synchronous and asynchronous programming.',
        'What are React Hooks and why were they introduced?',
        'Explain the concept of state management in React applications.',
        'What is the difference between SQL and NoSQL databases?',
        'Describe the MVC (Model-View-Controller) architecture pattern.',
        'What is RESTful API design and what are its principles?',
        'Explain the concept of responsive web design.',
        'What is the difference between authentication and authorization?',
        'Describe the concept of version control and Git workflow.',
        'What are the principles of Object-Oriented Programming?',
        'Explain the difference between frontend and backend development.',
        'What is the purpose of CSS preprocessors like Sass or Less?',
        'Describe the concept of microservices architecture.',
        'What is the difference between HTTP and HTTPS?',
        'Explain the concept of database normalization.',
        'What are design patterns and why are they important?',
        'Describe the concept of API rate limiting and why it\'s necessary.'
      ];

      technicalQuestions.forEach((question, index) => {
        questions.push({
          id: questionId++,
          category: 'Technical Knowledge',
          type: 'multiple-choice',
          question: question,
          options: [
            'Option A - Basic understanding',
            'Option B - Intermediate knowledge', 
            'Option C - Advanced comprehension',
            'Option D - Expert level insight'
          ],
          correct: Math.floor(Math.random() * 4),
          points: 2,
          timeLimit: 2,
          difficulty: difficulty
        });
      });

      // tomiwa: Problem Solving Questions (15 questions)
      const problemSolvingQuestions = [
        'You have an array of integers. Write an algorithm to find the two numbers that add up to a specific target.',
        'Design a system to handle 1 million concurrent users for a web application.',
        'How would you optimize a slow-loading webpage?',
        'Debug this code snippet and explain what\'s wrong with it.',
        'Design a database schema for an e-commerce platform.',
        'How would you implement a search functionality for a large dataset?',
        'Explain how you would handle error handling in a production application.',
        'Design a caching strategy for a high-traffic website.',
        'How would you implement user authentication and session management?',
        'Describe your approach to testing a complex web application.',
        'How would you optimize database queries for better performance?',
        'Design a system for real-time notifications.',
        'How would you implement data validation on both frontend and backend?',
        'Describe your approach to handling file uploads and storage.',
        'How would you implement a recommendation system for users?'
      ];

      problemSolvingQuestions.forEach((question, index) => {
        questions.push({
          id: questionId++,
          category: 'Problem Solving',
          type: 'coding',
          question: question,
          points: 4,
          timeLimit: 8,
          testCases: Math.floor(Math.random() * 5) + 3,
          difficulty: difficulty
        });
      });

      // tomiwa: Scenario-Based Questions (15 questions)
      const scenarioQuestions = [
        'A client reports that their website is loading slowly. Walk through your debugging process.',
        'You need to integrate a third-party payment system. What are your considerations?',
        'A security vulnerability is discovered in your application. How do you respond?',
        'You\'re tasked with migrating a legacy system to modern technology. Describe your approach.',
        'A team member disagrees with your technical decision. How do you handle this?',
        'You discover a critical bug in production. What are your immediate steps?',
        'A client wants to add a new feature that conflicts with existing architecture. How do you proceed?',
        'You need to improve the accessibility of a web application. What steps do you take?',
        'A database is running out of storage space. How do you address this issue?',
        'You\'re asked to estimate the timeline for a complex project. What\'s your process?',
        'A user reports data inconsistency in the application. How do you investigate?',
        'You need to implement internationalization for a global application. What\'s your approach?',
        'The application needs to handle a sudden spike in traffic. How do you prepare?',
        'A client wants to integrate AI/ML capabilities. How do you evaluate and implement this?',
        'You discover that the current system architecture won\'t scale. What do you recommend?'
      ];

      scenarioQuestions.forEach((question, index) => {
        questions.push({
          id: questionId++,
          category: 'Scenario Analysis',
          type: 'essay',
          question: question,
          points: 3,
          timeLimit: 5,
          criteria: ['Problem Analysis', 'Solution Design', 'Implementation Strategy'],
          difficulty: difficulty
        });
      });

      // tomiwa: Best Practices Questions (10 questions)
      const bestPracticesQuestions = [
        'What are the key principles of clean code?',
        'Describe your approach to code documentation.',
        'How do you ensure code quality in a team environment?',
        'What are the best practices for API design?',
        'Describe your approach to database design and optimization.',
        'What are the security best practices for web applications?',
        'How do you handle code reviews effectively?',
        'What are the principles of good user interface design?',
        'Describe best practices for mobile-responsive design.',
        'What are the key considerations for performance optimization?'
      ];

      bestPracticesQuestions.forEach((question, index) => {
        questions.push({
          id: questionId++,
          category: 'Best Practices',
          type: 'multiple-choice',
          question: question,
          options: [
            'Approach A - Standard practice',
            'Approach B - Industry standard',
            'Approach C - Advanced methodology',
            'Approach D - Expert-level strategy'
          ],
          correct: Math.floor(Math.random() * 4),
          points: 2,
          timeLimit: 3,
          difficulty: difficulty
        });
      });

      return questions;
    };

    // tomiwa: Role-specific question generation
    if (type === 'quiz') {
      return generateComprehensiveQuestions();
    }

    // tomiwa: Existing logic for other assessment types with expanded questions
    const baseQuestions = {
      'coding-challenge': generateComprehensiveQuestions().filter(q => q.type === 'coding'),
      'case-study': generateComprehensiveQuestions().filter(q => q.type === 'essay'),
      'design-challenge': [
        {
          id: 1,
          category: 'UI/UX Design',
          type: 'design',
          question: 'Design a mobile-first responsive dashboard for a project management tool',
          points: 25,
          timeLimit: 45,
          criteria: ['User Experience', 'Visual Design', 'Responsiveness', 'Accessibility']
        },
        {
          id: 2,
          category: 'Design Systems',
          type: 'design',
          question: 'Create a component library for a fintech application',
          points: 30,
          timeLimit: 60,
          criteria: ['Consistency', 'Scalability', 'Documentation', 'Usability']
        }
      ]
    };

    return baseQuestions[type] || generateComprehensiveQuestions();
  };

  // tomiwa: Filter assessments based on search and filters
  const filteredAssessments = mockAssessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assessment.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || assessment.status.toLowerCase() === filterStatus;
    const matchesRole = filterRole === 'all' || assessment.role.toLowerCase().includes(filterRole.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* tomiwa: Page header with navigation */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-[#021126] mb-2">
              AI Assessment Generator
            </h1>
            <p className="text-neutral-600 text-lg">
              Create and auto-grade role-specific case studies and quizzes
            </p>
          </div>
          <Link 
            href="/dashboard/employer/ai-tools/assessment-generator/learn"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-[#36D0D8]/10 text-[#36D0D8] rounded-xl hover:bg-[#36D0D8]/20 transition-colors"
          >
            <span className="mr-2">📚</span>
            Learn Best Practices
          </Link>
        </div>

        {/* tomiwa: Tab navigation - responsive design */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-200">
          {[
            { id: 'create', label: 'Create Assessment', icon: '✨' },
            { id: 'manage', label: 'Manage Assessments', icon: '📋' },
            { id: 'analytics', label: 'Analytics', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#36D0D8] text-white'
                  : 'text-neutral-600 hover:text-[#021126] hover:bg-neutral-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* tomiwa: Create Assessment Tab */}
      {activeTab === 'create' && (
        <div className="space-y-8">
          {/* tomiwa: Assessment type selection with info icons */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h2 className="font-display text-xl text-[#021126] mb-4">
              Choose Assessment Type
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {assessmentTypes.map((type) => (
                <div key={type.id} className="relative">
                <button
                  onClick={() => setSelectedAssessmentType(type.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedAssessmentType === type.id
                        ? 'border-[#36D0D8] bg-[#36D0D8]/5'
                        : 'border-neutral-200 hover:border-[#36D0D8]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-2xl">{type.icon}</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowTypeInfo(type);
                        }}
                        className="p-1 text-neutral-400 hover:text-[#36D0D8] transition-colors"
                        title="Learn more about this assessment type"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <h3 className="font-medium text-[#021126] mb-1">{type.label}</h3>
                    <p className="text-sm text-neutral-600">{type.description}</p>
                </button>
                </div>
              ))}
            </div>
          </div>

          {/* tomiwa: Assessment configuration form */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h2 className="font-display text-xl text-[#021126] mb-6">
              Assessment Configuration
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* tomiwa: Left column - Basic info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#021126] mb-2">
                    Assessment Title *
                  </label>
                  <input
                    type="text"
                    value={assessmentTitle}
                    onChange={(e) => setAssessmentTitle(e.target.value)}
                    placeholder="e.g., Senior React Developer Challenge"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#021126] mb-2">
                    Target Role *
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                  >
                    <option value="">Select a role</option>
                    {roleCategories.map((role) => (
                      <option key={role.id} value={role.id}>{role.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#021126] mb-2">
                    Difficulty Level
                  </label>
                  <div className="space-y-2">
                    {difficultyLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setSelectedDifficulty(level.id)}
                        className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                          selectedDifficulty === level.id
                            ? 'border-[#36D0D8] bg-[#36D0D8]/5'
                            : 'border-neutral-200 hover:border-[#36D0D8]/50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-[#021126]">{level.label}</span>
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${level.color}`}>
                            {level.time}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* tomiwa: Right column - Advanced settings */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#021126] mb-2">
                    Description
                  </label>
                  <textarea
                    value={assessmentDescription}
                    onChange={(e) => setAssessmentDescription(e.target.value)}
                    placeholder="Describe what this assessment evaluates..."
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#021126] mb-2">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                    min="15"
                    max="240"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                  />
                </div>

                <div className="bg-[#FDD140]/10 rounded-xl p-4">
                  <h3 className="font-medium text-[#021126] mb-2 flex items-center">
                    <span className="mr-2">💡</span>
                    AI Recommendations
                  </h3>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• Include 3-5 questions for optimal assessment</li>
                    <li>• Mix question types for comprehensive evaluation</li>
                    <li>• Consider role-specific skills and requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* tomiwa: Generate button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleGenerateAssessment}
                disabled={isGenerating || !selectedRole || !assessmentTitle}
                className="px-8 py-3 bg-[#EF522E] text-white rounded-xl font-medium hover:bg-[#EF522E]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating Assessment...
                  </>
                ) : (
                  <>
                    <span className="mr-2">✨</span>
                    Generate AI Assessment
                  </>
                )}
              </button>
            </div>
          </div>

          {/* tomiwa: Generated questions preview with enhanced organization */}
          {questions.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl text-[#021126] mb-2">
                    Generated Assessment - {questions.length} Questions
                </h2>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {/* tomiwa: Display question categories summary */}
                    {Object.entries(
                      questions.reduce((acc, q) => {
                        acc[q.category] = (acc[q.category] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([category, count]) => (
                      <span key={category} className="px-3 py-1 bg-[#36D0D8]/10 text-[#36D0D8] rounded-lg font-medium">
                        {category}: {count}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0">
                  <button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors">
                    Edit Questions
                  </button>
                  <button className="px-4 py-2 bg-[#36D0D8] text-white rounded-xl hover:bg-[#36D0D8]/90 transition-colors">
                    Save Assessment
                  </button>
                </div>
              </div>

              {/* tomiwa: Assessment overview stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-neutral-50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#EF522E]">{questions.length}</div>
                  <div className="text-sm text-neutral-600">Total Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#36D0D8]">
                    {questions.reduce((sum, q) => sum + q.points, 0)}
                  </div>
                  <div className="text-sm text-neutral-600">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FDD140] text-[#021126]">
                    {Math.round(questions.reduce((sum, q) => sum + q.timeLimit, 0))}
                  </div>
                  <div className="text-sm text-neutral-600">Total Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {new Set(questions.map(q => q.type)).size}
                  </div>
                  <div className="text-sm text-neutral-600">Question Types</div>
                </div>
              </div>

              {/* tomiwa: Questions organized by category */}
              <div className="space-y-6">
                {Object.entries(
                  questions.reduce((acc, question) => {
                    if (!acc[question.category]) {
                      acc[question.category] = [];
                    }
                    acc[question.category].push(question);
                    return acc;
                  }, {})
                ).map(([category, categoryQuestions]) => (
                  <div key={category} className="border border-neutral-200 rounded-xl overflow-hidden">
                    {/* tomiwa: Category header */}
                    <div className="bg-gradient-to-r from-[#36D0D8]/10 to-[#EF522E]/10 px-6 py-4 border-b border-neutral-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg text-[#021126] flex items-center">
                          <span className="mr-3">
                            {category === 'Technical Knowledge' ? '💻' : 
                             category === 'Problem Solving' ? '🧩' : 
                             category === 'Scenario Analysis' ? '📋' : 
                             category === 'Best Practices' ? '⭐' : '📝'}
                          </span>
                          {category}
                      </h3>
                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                          <span>{categoryQuestions.length} questions</span>
                          <span>•</span>
                          <span>{categoryQuestions.reduce((sum, q) => sum + q.points, 0)} points</span>
                          <span>•</span>
                          <span>{categoryQuestions.reduce((sum, q) => sum + q.timeLimit, 0)} min</span>
                      </div>
                    </div>
                    </div>

                    {/* tomiwa: Category questions */}
                    <div className="p-6">
                      <div className="grid gap-4">
                        {categoryQuestions.map((question, index) => (
                          <div key={question.id} className="border border-neutral-100 rounded-xl p-4 hover:bg-neutral-50 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <span className="flex-shrink-0 w-8 h-8 bg-[#36D0D8] text-white rounded-full flex items-center justify-center text-sm font-medium">
                                  {question.id}
                                </span>
                                <div>
                                  <h4 className="font-medium text-[#021126] mb-1">
                                    Question {question.id}
                                  </h4>
                                  <div className="flex items-center gap-2 text-xs">
                                    <span className={`px-2 py-1 rounded-lg font-medium ${
                                      question.type === 'multiple-choice' ? 'bg-blue-100 text-blue-800' :
                                      question.type === 'coding' ? 'bg-green-100 text-green-800' :
                                      question.type === 'essay' ? 'bg-purple-100 text-purple-800' :
                                      'bg-gray-100 text-gray-800'
                                    }`}>
                                      {question.type.replace('-', ' ')}
                                    </span>
                                    <span className="text-neutral-500">•</span>
                                    <span className="text-neutral-600">{question.difficulty}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-neutral-600">
                                <span className="font-medium text-[#EF522E]">{question.points} pts</span>
                                <span>•</span>
                                <span>{question.timeLimit} min</span>
                              </div>
                            </div>
                            
                            <p className="text-neutral-700 mb-3 leading-relaxed">{question.question}</p>
                            
                            {/* tomiwa: Question-specific details */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                              {question.type === 'multiple-choice' && question.options && (
                                <span>4 options</span>
                              )}
                              {question.testCases && (
                                <span>{question.testCases} test cases</span>
                              )}
                              {question.criteria && (
                                <span>{question.criteria.length} evaluation criteria</span>
                              )}
                              {question.options && (
                                <span>Auto-graded</span>
                              )}
                            </div>

                            {/* tomiwa: Show options for multiple choice questions */}
                            {question.type === 'multiple-choice' && question.options && (
                              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className="text-sm p-2 bg-neutral-50 rounded-lg border">
                                    <span className="font-medium text-neutral-700">
                                      {String.fromCharCode(65 + optIndex)}. 
                                    </span>
                                    <span className="ml-2 text-neutral-600">{option}</span>
                  </div>
                                ))}
                              </div>
                            )}

                            {/* tomiwa: Show criteria for essay questions */}
                            {question.criteria && (
                              <div className="mt-3">
                                <div className="text-sm font-medium text-neutral-700 mb-2">Evaluation Criteria:</div>
                                <div className="flex flex-wrap gap-2">
                                  {question.criteria.map((criterion, critIndex) => (
                                    <span key={critIndex} className="px-2 py-1 bg-[#FDD140]/20 text-[#021126] rounded-lg text-xs font-medium">
                                      {criterion}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* tomiwa: Assessment actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 p-4 bg-gradient-to-r from-[#36D0D8]/5 to-[#EF522E]/5 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-medium text-[#021126] mb-2">Ready to Deploy?</h3>
                  <p className="text-sm text-neutral-600">
                    Your comprehensive {questions.length}-question assessment is ready. 
                    You can save it as a template, deploy it immediately, or make further customizations.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 border border-[#36D0D8] text-[#36D0D8] rounded-xl hover:bg-[#36D0D8]/10 transition-colors font-medium">
                    Save as Template
                  </button>
                  <button 
                    onClick={() => setShowDeployModal(true)}
                    className="px-6 py-3 bg-[#EF522E] text-white rounded-xl hover:bg-[#EF522E]/90 transition-colors font-medium"
                  >
                    Deploy Assessment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* tomiwa: Manage Assessments Tab */}
      {activeTab === 'manage' && (
        <div className="space-y-6">
          {/* tomiwa: Search and filters */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search assessments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          {/* tomiwa: Assessments list */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left px-6 py-4 font-medium text-[#021126]">Assessment</th>
                    <th className="text-left px-6 py-4 font-medium text-[#021126]">Type</th>
                    <th className="text-left px-6 py-4 font-medium text-[#021126]">Role</th>
                    <th className="text-left px-6 py-4 font-medium text-[#021126]">Completions</th>
                    <th className="text-left px-6 py-4 font-medium text-[#021126]">Avg Score</th>
                    <th className="text-left px-6 py-4 font-medium text-[#021126]">Status</th>
                    <th className="text-left px-6 py-4 font-medium text-[#021126]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssessments.map((assessment) => (
                    <tr key={assessment.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="px-6 py-4">
                        <div>
                          <h3 className="font-medium text-[#021126]">{assessment.title}</h3>
                          <p className="text-sm text-neutral-600">
                            {assessment.questions} questions • {assessment.timeLimit} min
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-700">{assessment.type}</td>
                      <td className="px-6 py-4 text-neutral-700">{assessment.role}</td>
                      <td className="px-6 py-4 text-neutral-700">{assessment.completions}</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#021126]">{assessment.avgScore}%</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          assessment.status === 'Active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assessment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setSelectedAssessment(assessment);
                              setShowViewModal(true);
                            }}
                            className="p-2 text-neutral-600 hover:text-[#36D0D8] transition-colors"
                            title="View Assessment"
                          >
                            <span>👁️</span>
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedAssessment(assessment);
                              setShowEditModal(true);
                            }}
                            className="p-2 text-neutral-600 hover:text-[#EF522E] transition-colors"
                            title="Edit Assessment"
                          >
                            <span>✏️</span>
                          </button>
                          <button 
                            className="p-2 text-neutral-600 hover:text-red-600 transition-colors"
                            title="Delete Assessment"
                          >
                            <span>🗑️</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* tomiwa: Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* tomiwa: Overview stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Assessments', value: '12', change: '+3 this month', color: 'text-[#36D0D8]' },
              { label: 'Total Completions', value: '95', change: '+23 this week', color: 'text-[#EF522E]' },
              { label: 'Average Score', value: '79%', change: '+5% improvement', color: 'text-green-600' },
              { label: 'Pass Rate', value: '68%', change: 'Stable', color: 'text-[#FDD140]' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl border border-neutral-200 p-6">
                <h3 className="text-sm font-medium text-neutral-600 mb-2">{stat.label}</h3>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <p className="text-xs text-neutral-500">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* tomiwa: Performance charts placeholder */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h2 className="font-display text-xl text-[#021126] mb-6">
              Assessment Performance Trends
            </h2>
            <div className="h-64 bg-neutral-50 rounded-xl flex items-center justify-center">
              <div className="text-center text-neutral-500">
                <div className="text-4xl mb-2">📊</div>
                <p>Performance charts will be displayed here</p>
                <p className="text-sm">Integration with analytics service required</p>
              </div>
            </div>
          </div>

          {/* tomiwa: Top performing assessments */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h2 className="font-display text-xl text-[#021126] mb-6">
              Top Performing Assessments
            </h2>
            <div className="space-y-4">
              {mockAssessments.slice(0, 3).map((assessment, index) => (
                <div key={assessment.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-[#EF522E]' : index === 1 ? 'bg-[#36D0D8]' : 'bg-[#FDD140] text-[#021126]'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#021126]">{assessment.title}</h3>
                      <p className="text-sm text-neutral-600">{assessment.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#021126]">{assessment.avgScore}%</div>
                    <div className="text-sm text-neutral-600">{assessment.completions} completions</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* tomiwa: Deploy Assessment Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-[#021126]">Deploy Assessment</h2>
                <button 
                  onClick={() => setShowDeployModal(false)}
                  className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* tomiwa: Assessment Overview */}
              <div className="bg-gradient-to-r from-[#36D0D8]/10 to-[#EF522E]/10 rounded-xl p-6">
                <h3 className="font-display text-lg text-[#021126] mb-4">Assessment Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-[#021126] mb-2">Assessment Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Title:</span>
                        <span className="font-medium">{assessmentTitle || 'Untitled Assessment'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Type:</span>
                        <span className="font-medium capitalize">{selectedAssessmentType.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Target Role:</span>
                        <span className="font-medium">{roleCategories.find(r => r.id === selectedRole)?.label || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Difficulty:</span>
                        <span className="font-medium capitalize">{selectedDifficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#021126] mb-2">Assessment Stats</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-[#EF522E]">{questions.length}</div>
                        <div className="text-xs text-neutral-600">Questions</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-[#36D0D8]">{questions.reduce((sum, q) => sum + q.points, 0)}</div>
                        <div className="text-xs text-neutral-600">Points</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-[#FDD140] text-[#021126]">{Math.round(questions.reduce((sum, q) => sum + q.timeLimit, 0))}</div>
                        <div className="text-xs text-neutral-600">Minutes</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-green-600">{new Set(questions.map(q => q.type)).size}</div>
                        <div className="text-xs text-neutral-600">Types</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* tomiwa: Candidate Selection */}
              <div>
                <h3 className="font-display text-lg text-[#021126] mb-4">Select Candidates</h3>
                <div className="border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="p-4 bg-neutral-50 border-b border-neutral-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-700">
                        {selectedCandidates.length} of {mockCandidates.length} candidates selected
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedCandidates(mockCandidates.map(c => c.id))}
                          className="text-sm px-3 py-1 text-[#36D0D8] hover:bg-[#36D0D8]/10 rounded-lg transition-colors"
                        >
                          Select All
                        </button>
                        <button 
                          onClick={() => setSelectedCandidates([])}
                          className="text-sm px-3 py-1 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {mockCandidates.map((candidate) => (
                      <div key={candidate.id} className="p-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedCandidates.includes(candidate.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCandidates([...selectedCandidates, candidate.id]);
                              } else {
                                setSelectedCandidates(selectedCandidates.filter(id => id !== candidate.id));
                              }
                            }}
                            className="w-4 h-4 text-[#36D0D8] border-neutral-300 rounded focus:ring-[#36D0D8]"
                          />
                          <img 
                            src={candidate.avatar} 
                            alt={candidate.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-[#021126]">{candidate.name}</h4>
                              <span className="text-sm text-neutral-600">{candidate.experience}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-neutral-600">
                              <span>{candidate.role}</span>
                              <span>•</span>
                              <span>{candidate.location}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {candidate.skills.slice(0, 3).map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-[#36D0D8]/10 text-[#36D0D8] rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                              {candidate.skills.length > 3 && (
                                <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs">
                                  +{candidate.skills.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* tomiwa: Deployment Settings */}
              <div>
                <h3 className="font-display text-lg text-[#021126] mb-4">Deployment Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#021126] mb-2">
                        Assessment Deadline
                      </label>
                      <input
                        type="datetime-local"
                        value={deploymentSettings.deadline}
                        onChange={(e) => setDeploymentSettings({...deploymentSettings, deadline: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#021126] mb-2">
                        Email Template
                      </label>
                      <select
                        value={deploymentSettings.emailTemplate}
                        onChange={(e) => setDeploymentSettings({...deploymentSettings, emailTemplate: e.target.value})}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                      >
                        <option value="default">Default Template</option>
                        <option value="formal">Formal Template</option>
                        <option value="friendly">Friendly Template</option>
                        <option value="urgent">Urgent Template</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="sendImmediately"
                        checked={deploymentSettings.sendImmediately}
                        onChange={(e) => setDeploymentSettings({...deploymentSettings, sendImmediately: e.target.checked})}
                        className="w-4 h-4 text-[#36D0D8] border-neutral-300 rounded focus:ring-[#36D0D8]"
                      />
                      <label htmlFor="sendImmediately" className="text-sm font-medium text-[#021126]">
                        Send immediately
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="allowRetakes"
                        checked={deploymentSettings.allowRetakes}
                        onChange={(e) => setDeploymentSettings({...deploymentSettings, allowRetakes: e.target.checked})}
                        className="w-4 h-4 text-[#36D0D8] border-neutral-300 rounded focus:ring-[#36D0D8]"
                      />
                      <label htmlFor="allowRetakes" className="text-sm font-medium text-[#021126]">
                        Allow retakes
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="showResults"
                        checked={deploymentSettings.showResults}
                        onChange={(e) => setDeploymentSettings({...deploymentSettings, showResults: e.target.checked})}
                        className="w-4 h-4 text-[#36D0D8] border-neutral-300 rounded focus:ring-[#36D0D8]"
                      />
                      <label htmlFor="showResults" className="text-sm font-medium text-[#021126]">
                        Show results to candidates
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 bg-neutral-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-600">
                  Ready to send to {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowDeployModal(false)}
                    className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={selectedCandidates.length === 0}
                    className="px-6 py-3 bg-[#EF522E] text-white rounded-xl hover:bg-[#EF522E]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Deploy Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* tomiwa: View Assessment Modal */}
      {showViewModal && selectedAssessment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-[#021126]">View Assessment</h2>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* tomiwa: Assessment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display text-lg text-[#021126] mb-3">Assessment Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600">Title:</span>
                        <span className="font-medium text-[#021126]">{selectedAssessment.title}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600">Type:</span>
                        <span className="font-medium text-[#021126]">{selectedAssessment.type}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600">Role:</span>
                        <span className="font-medium text-[#021126]">{selectedAssessment.role}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600">Difficulty:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedAssessment.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          selectedAssessment.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedAssessment.difficulty}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedAssessment.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedAssessment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-lg text-[#021126] mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-[#36D0D8]/10 rounded-xl">
                      <div className="text-2xl font-bold text-[#36D0D8]">{selectedAssessment.questions}</div>
                      <div className="text-sm text-neutral-600">Questions</div>
                    </div>
                    <div className="text-center p-4 bg-[#EF522E]/10 rounded-xl">
                      <div className="text-2xl font-bold text-[#EF522E]">{selectedAssessment.timeLimit}</div>
                      <div className="text-sm text-neutral-600">Minutes</div>
                    </div>
                    <div className="text-center p-4 bg-green-100 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{selectedAssessment.completions}</div>
                      <div className="text-sm text-neutral-600">Completions</div>
                    </div>
                    <div className="text-center p-4 bg-[#FDD140]/20 rounded-xl">
                      <div className="text-2xl font-bold text-[#021126]">{selectedAssessment.avgScore}%</div>
                      <div className="text-sm text-neutral-600">Avg Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* tomiwa: Assessment Timeline */}
              <div>
                <h3 className="font-display text-lg text-[#021126] mb-3">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-xl">
                    <div className="w-3 h-3 bg-[#36D0D8] rounded-full"></div>
                    <div>
                      <div className="font-medium text-[#021126]">Created</div>
                      <div className="text-sm text-neutral-600">{selectedAssessment.created}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-xl">
                    <div className="w-3 h-3 bg-[#EF522E] rounded-full"></div>
                    <div>
                      <div className="font-medium text-[#021126]">Last Used</div>
                      <div className="text-sm text-neutral-600">{selectedAssessment.lastUsed}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* tomiwa: Recent Activity */}
              <div>
                <h3 className="font-display text-lg text-[#021126] mb-3">Recent Activity</h3>
                <div className="border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="divide-y divide-neutral-100">
                    {[
                      { action: 'Assessment completed', candidate: 'Sarah Johnson', score: '85%', time: '2 hours ago' },
                      { action: 'Assessment started', candidate: 'Michael Chen', score: 'In progress', time: '4 hours ago' },
                      { action: 'Assessment completed', candidate: 'Emily Rodriguez', score: '92%', time: '1 day ago' }
                    ].map((activity, index) => (
                      <div key={index} className="p-4 hover:bg-neutral-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-[#021126]">{activity.action}</div>
                            <div className="text-sm text-neutral-600">{activity.candidate}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-[#021126]">{activity.score}</div>
                            <div className="text-sm text-neutral-600">{activity.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 bg-neutral-50">
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowViewModal(false);
                    setShowEditModal(true);
                  }}
                  className="px-6 py-3 bg-[#36D0D8] text-white rounded-xl hover:bg-[#36D0D8]/90 transition-colors"
                >
                  Edit Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* tomiwa: Edit Assessment Modal */}
      {showEditModal && selectedAssessment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-[#021126]">Edit Assessment</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* tomiwa: Basic Information */}
              <div>
                <h3 className="font-display text-lg text-[#021126] mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#021126] mb-2">
                      Assessment Title
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedAssessment.title}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#021126] mb-2">
                      Target Role
                    </label>
                    <select
                      defaultValue={selectedAssessment.role}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                    >
                      {roleCategories.map((role) => (
                        <option key={role.id} value={role.label}>{role.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#021126] mb-2">
                      Time Limit (minutes)
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedAssessment.timeLimit}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#021126] mb-2">
                      Status
                    </label>
                    <select
                      defaultValue={selectedAssessment.status}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* tomiwa: Assessment Settings */}
              <div>
                <h3 className="font-display text-lg text-[#021126] mb-4">Assessment Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="randomizeQuestions"
                        defaultChecked={true}
                        className="w-4 h-4 text-[#36D0D8] border-neutral-300 rounded focus:ring-[#36D0D8]"
                      />
                      <label htmlFor="randomizeQuestions" className="text-sm font-medium text-[#021126]">
                        Randomize question order
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="showProgress"
                        defaultChecked={true}
                        className="w-4 h-4 text-[#36D0D8] border-neutral-300 rounded focus:ring-[#36D0D8]"
                      />
                      <label htmlFor="showProgress" className="text-sm font-medium text-[#021126]">
                        Show progress to candidates
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="preventBacktrack"
                        defaultChecked={false}
                        className="w-4 h-4 text-[#36D0D8] border-neutral-300 rounded focus:ring-[#36D0D8]"
                      />
                      <label htmlFor="preventBacktrack" className="text-sm font-medium text-[#021126]">
                        Prevent going back to previous questions
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="autoSubmit"
                        defaultChecked={true}
                        className="w-4 h-4 text-[#36D0D8] border-neutral-300 rounded focus:ring-[#36D0D8]"
                      />
                      <label htmlFor="autoSubmit" className="text-sm font-medium text-[#021126]">
                        Auto-submit when time expires
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="showCorrectAnswers"
                        defaultChecked={false}
                        className="w-4 h-4 text-[#36D0D8] border-neutral-300 rounded focus:ring-[#36D0D8]"
                      />
                      <label htmlFor="showCorrectAnswers" className="text-sm font-medium text-[#021126]">
                        Show correct answers after completion
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="requireCamera"
                        defaultChecked={false}
                        className="w-4 h-4 text-[#36D0D8] border-neutral-300 rounded focus:ring-[#36D0D8]"
                      />
                      <label htmlFor="requireCamera" className="text-sm font-medium text-[#021126]">
                        Require camera monitoring
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* tomiwa: Scoring Configuration */}
              <div>
                <h3 className="font-display text-lg text-[#021126] mb-4">Scoring Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#021126] mb-2">
                      Passing Score (%)
                    </label>
                    <input
                      type="number"
                      defaultValue="70"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#021126] mb-2">
                      Negative Marking
                    </label>
                    <select className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent">
                      <option value="none">No negative marking</option>
                      <option value="quarter">-0.25 for wrong answers</option>
                      <option value="half">-0.5 for wrong answers</option>
                      <option value="full">-1 for wrong answers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#021126] mb-2">
                      Grading Method
                    </label>
                    <select className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent">
                      <option value="automatic">Automatic grading</option>
                      <option value="manual">Manual review required</option>
                      <option value="hybrid">Hybrid (auto + manual)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 bg-neutral-50">
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-[#36D0D8] text-white rounded-xl hover:bg-[#36D0D8]/90 transition-colors">
                  Save Changes
                </button>
                <button className="px-6 py-3 bg-[#EF522E] text-white rounded-xl hover:bg-[#EF522E]/90 transition-colors">
                  Save & Deploy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* tomiwa: Assessment Type Info Modal */}
      {showInfoModal && selectedTypeInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedTypeInfo.icon}</span>
                  <h2 className="font-display text-2xl text-[#021126]">{selectedTypeInfo.label}</h2>
                </div>
                <button 
                  onClick={() => setShowInfoModal(false)}
                  className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* tomiwa: Assessment type description */}
              <div>
                <h3 className="font-display text-lg text-[#021126] mb-3">What is this assessment type?</h3>
                <p className="text-neutral-700 leading-relaxed">
                  {selectedTypeInfo.detailedDescription}
                </p>
              </div>

              {/* tomiwa: Example section */}
              <div className="bg-[#36D0D8]/5 rounded-xl p-4">
                <h3 className="font-medium text-[#021126] mb-2 flex items-center">
                  <span className="mr-2">💡</span>
                  Example Question
                </h3>
                <p className="text-neutral-700 italic">
                  "{selectedTypeInfo.example}"
                </p>
              </div>

              {/* tomiwa: Skills evaluated */}
              <div>
                <h3 className="font-display text-lg text-[#021126] mb-3">Skills Evaluated</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTypeInfo.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-[#EF522E]/10 text-[#EF522E] rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* tomiwa: Best practices */}
              <div className="bg-[#FDD140]/10 rounded-xl p-4">
                <h3 className="font-medium text-[#021126] mb-2 flex items-center">
                  <span className="mr-2">⭐</span>
                  Best Practices
                </h3>
                <ul className="text-sm text-neutral-700 space-y-1">
                  {selectedTypeInfo.id === 'scenario-simulation' && (
                    <>
                      <li>• Create realistic scenarios relevant to the specific role</li>
                      <li>• Include multiple decision points to test judgment</li>
                      <li>• Focus on leadership and problem-solving skills</li>
                      <li>• Allow for creative and strategic thinking</li>
                    </>
                  )}
                  {selectedTypeInfo.id === 'knowledge-evaluation' && (
                    <>
                      <li>• Cover both fundamental and advanced concepts</li>
                      <li>• Include industry-specific terminology and practices</li>
                      <li>• Test practical application of knowledge</li>
                      <li>• Balance theoretical and hands-on understanding</li>
                    </>
                  )}
                  {selectedTypeInfo.id === 'strategy-analysis' && (
                    <>
                      <li>• Provide real data sets for analysis</li>
                      <li>• Test both analytical and strategic thinking</li>
                      <li>• Include questions about implementation planning</li>
                      <li>• Evaluate reasoning behind recommendations</li>
                    </>
                  )}
                  {selectedTypeInfo.id === 'creative-communication' && (
                    <>
                      <li>• Focus on clarity and persuasiveness</li>
                      <li>• Test adaptation to different audiences</li>
                      <li>• Evaluate creativity within professional constraints</li>
                      <li>• Include both written and presentation formats</li>
                    </>
                  )}
                </ul>
              </div>

              {/* tomiwa: Ideal for roles */}
              <div>
                <h3 className="font-display text-lg text-[#021126] mb-3">Ideal for These Roles</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedTypeInfo.id === 'scenario-simulation' && (
                    <>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Management</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Leadership</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Consulting</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Product Manager</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Business Analyst</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Executive</span>
                    </>
                  )}
                  {selectedTypeInfo.id === 'knowledge-evaluation' && (
                    <>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Developer</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Specialist</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Analyst</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Engineer</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Technician</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Expert</span>
                    </>
                  )}
                  {selectedTypeInfo.id === 'strategy-analysis' && (
                    <>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Strategist</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Data Analyst</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Consultant</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Finance</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Operations</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Research</span>
                    </>
                  )}
                  {selectedTypeInfo.id === 'creative-communication' && (
                    <>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Marketing</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Sales</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Design</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Content</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">Communications</span>
                      <span className="px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm text-center">PR</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 bg-neutral-50">
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowInfoModal(false)}
                  className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setSelectedAssessmentType(selectedTypeInfo.id);
                    setShowInfoModal(false);
                  }}
                  className="px-6 py-3 bg-[#36D0D8] text-white rounded-xl hover:bg-[#36D0D8]/90 transition-colors"
                >
                  Select This Type
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
