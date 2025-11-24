'use client';

import { useState } from 'react';

// tomiwa: Modal component for adding and editing custom questions
export default function AddCustomQuestionModal({ isOpen, onClose, onSave, initialQuestion = null }) {
  // tomiwa: State for form fields
  const [question, setQuestion] = useState(initialQuestion?.question || '');
  const [category, setCategory] = useState(initialQuestion?.category || '');

  // tomiwa: Available question categories
  const questionCategories = [
    { id: 'communication', label: 'Communication' },
    { id: 'compensation', label: 'Compensation' },
    { id: 'culture_fit', label: 'Culture Fit' },
    { id: 'problem_solving', label: 'Problem Solving' },
    { id: 'work_experience', label: 'Work Experience' },
    { id: 'motivation', label: 'Motivation' },
    { id: 'teamwork', label: 'Teamwork' },
    { id: 'conflict_resolution', label: 'Conflict Resolution' },
    { id: 'goals', label: 'Career Goals' },
    { id: 'management', label: 'Management' },
  ];

  // tomiwa: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: initialQuestion?.id || Date.now(), // Use existing ID or create new one
      question,
      category
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-xl text-brand-black">
            {initialQuestion ? 'Edit Question' : 'Add Custom Question'}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-2">
              Question Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
              required
            >
              <option value="">Select a category...</option>
              {questionCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="question" className="block text-sm font-medium text-neutral-700 mb-2">
              Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-4 py-2 bg-white h-32 resize-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
              placeholder="Enter your interview question here..."
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              {initialQuestion ? 'Save Changes' : 'Add Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
