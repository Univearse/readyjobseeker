'use client';

import { useState } from 'react';

// tomiwa: Modal component for selecting custom question types/categories
export default function CustomQuestionTypeModal({ isOpen, onClose, onSelectType }) {
  // tomiwa: State for new category input
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [customCategories, setCustomCategories] = useState([]);

  // tomiwa: Available question types/categories
  const defaultCategories = [
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

  // tomiwa: Combine default and custom categories
  const allCategories = [...defaultCategories, ...customCategories];

  // tomiwa: Handle adding new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      const newCategoryObj = {
        id: newCategory.toLowerCase().replace(/\s+/g, '_'),
        label: newCategory.trim()
      };
      setCustomCategories(prev => [...prev, newCategoryObj]);
      setNewCategory('');
      setShowNewCategoryInput(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-xl text-brand-black">Select Question Type</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onSelectType(category);
                onClose();
              }}
              className="p-3 text-left rounded-lg hover:bg-neutral-50 transition-colors border border-neutral-200 hover:border-brand-orange group"
            >
              <span className="block text-brand-black font-medium group-hover:text-brand-orange">
                {category.label}
              </span>
            </button>
          ))}
          
          {/* Add New Category Button */}
          <button
            onClick={() => setShowNewCategoryInput(true)}
            className="p-3 text-left rounded-lg border border-dashed border-brand-orange text-brand-orange hover:bg-orange-50 transition-colors col-span-2"
          >
            <span className="block font-medium">
              + Add New Category
            </span>
          </button>
        </div>

        {/* New Category Input Form */}
        {showNewCategoryInput && (
          <form onSubmit={handleAddCategory} className="mt-4 border-t border-neutral-200 pt-4">
            <div className="mb-4">
              <label htmlFor="newCategory" className="block text-sm font-medium text-neutral-700 mb-2">
                New Category Name
              </label>
              <input
                type="text"
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                placeholder="Enter category name..."
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowNewCategoryInput(false);
                  setNewCategory('');
                }}
                className="px-4 py-2 text-neutral-600 hover:text-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Add Category
              </button>
            </div>
          </form>
        )}

        {!showNewCategoryInput && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-800"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
