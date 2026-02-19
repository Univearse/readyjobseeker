'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Select } from '@/components/ui/Select';
import { Chip } from '@/components/ui/Chip';

// tomiwa: Mock data for questions repository - replace with actual API data
const mockQuestions = [
  {
    id: 1,
    question: 'How many years of experience do you have in this field?',
    jobTitle: 'Senior Frontend Developer',
    category: 'Experience',
    type: 'General',
    usageCount: 15,
    createdAt: '2024-01-15',
    isKnockout: false,
  },
  {
    id: 2,
    question: 'Describe your experience with React and TypeScript in a production environment.',
    jobTitle: 'Frontend Developer',
    category: 'Technical',
    type: 'Technical Skills',
    usageCount: 8,
    createdAt: '2024-02-01',
    isKnockout: false,
  },
  {
    id: 3,
    question: 'Are you authorized to work in the country of job location?',
    jobTitle: 'Multiple Positions',
    category: 'Legal',
    type: 'Knockout',
    usageCount: 25,
    createdAt: '2024-01-10',
    isKnockout: true,
  },
];

const categories = ['All', 'Technical', 'Behavioral', 'Experience', 'Legal', 'General'];
const types = ['All', 'Technical Skills', 'Soft Skills', 'General', 'Knockout'];
const sortOptions = [
  { value: 'usage', label: 'Most Used' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

export default function ScreeningQuestionsRepository() {
  // tomiwa: State management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('usage');
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState(mockQuestions);

  // tomiwa: Filter questions based on selected filters and search query
  const filteredQuestions = questions.filter(q => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesType = selectedType === 'All' || q.type === selectedType;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  // tomiwa: Sort questions based on selected sort option
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'usage':
        return b.usageCount - a.usageCount;
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'alphabetical':
        return a.question.localeCompare(b.question);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* tomiwa: Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Screening Questions Repository</h1>
          <p className="text-neutral-600">
            Browse and manage all screening questions used across your job postings
          </p>
        </div>

        {/* tomiwa: Filters and search section */}
        <Card className="mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              options={categories.map(cat => ({ value: cat, label: cat }))}
              value={{ value: selectedCategory, label: selectedCategory }}
              onChange={(option) => setSelectedCategory(option.value)}
              placeholder="Filter by Category"
            />
            <Select
              options={types.map(type => ({ value: type, label: type }))}
              value={{ value: selectedType, label: selectedType }}
              onChange={(option) => setSelectedType(option.value)}
              placeholder="Filter by Type"
            />
            <Select
              options={sortOptions}
              value={sortOptions.find(opt => opt.value === sortBy)}
              onChange={(option) => setSortBy(option.value)}
              placeholder="Sort by"
            />
          </div>
        </Card>

        {/* tomiwa: Questions list */}
        <div className="space-y-4">
          {sortedQuestions.map((question) => (
            <Card key={question.id} className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">
                      {question.question}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      Used in: {question.jobTitle}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Chip
                      label={`${question.usageCount} uses`}
                      variant="outline"
                      color="neutral"
                    />
                    {question.isKnockout && (
                      <Chip
                        label="Knockout"
                        variant="solid"
                        color="red"
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Chip
                    label={question.category}
                    variant="outline"
                    color="blue"
                  />
                  <Chip
                    label={question.type}
                    variant="outline"
                    color="purple"
                  />
                  <span className="text-sm text-neutral-500">
                    Added: {new Date(question.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {/* tomiwa: Add reuse functionality */}}
                  >
                    Reuse Question
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {/* tomiwa: Add edit functionality */}}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
