'use client';

import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import DeleteConfirmationModal from '../ui/modals/DeleteConfirmationModal';

/**
 * tomiwa: Example component showing how to use the DeleteConfirmationModal
 * This demonstrates different use cases and configurations
 */
export default function DeleteModalExample() {
  // tomiwa: State management for different modal scenarios
  const [showJobModal, setShowJobModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // tomiwa: Example data for demonstration
  const exampleJob = {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Corp"
  };

  const exampleCandidate = {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com"
  };

  // tomiwa: Simulate API call for deletion
  const simulateDelete = async (type, item) => {
    setIsDeleting(true);
    
    // johnson: Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(`Deleted ${type}:`, item);
    setIsDeleting(false);
    
    // tomiwa: Close the modal after successful deletion
    setShowJobModal(false);
    setShowCandidateModal(false);
    setShowCompanyModal(false);
    
    // tomiwa: You would typically show a success toast here
    alert(`${type} deleted successfully!`);
  };

  return (
    <div className="p-6 // Default (mobile) - 24px padding
                   sm:p-8 // Small screens (640px+) - 32px padding
                   md:p-12 // Medium screens (768px+) - 48px padding
                   max-w-4xl mx-auto">
      
      {/* tomiwa: Page header */}
      <div className="mb-8">
        <h1 className="text-2xl 
                      sm:text-3xl // Small screens (640px+) - larger text
                      md:text-4xl // Medium screens (768px+) - even larger text
                      font-display text-brand-black mb-4">
          Delete Modal Examples
        </h1>
        <p className="text-neutral-600 text-base 
                     sm:text-lg // Small screens (640px+) - larger text
                     leading-relaxed">
          Click the buttons below to see different configurations of the delete confirmation modal.
        </p>
      </div>

      {/* tomiwa: Example scenarios grid */}
      <div className="grid gap-6 
                     grid-cols-1 // Default (mobile) - single column
                     md:grid-cols-2 // Medium screens (768px+) - two columns
                     lg:grid-cols-3 // Large screens (1024px+) - three columns
                     ">
        
        {/* tomiwa: Job deletion example */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center">
              <TrashIcon className="h-5 w-5 text-secondary-600" />
            </div>
            <h3 className="font-display text-lg text-brand-black">Delete Job Posting</h3>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="bg-neutral-50 rounded-lg p-3">
              <p className="font-medium text-sm text-brand-black">{exampleJob.title}</p>
              <p className="text-xs text-neutral-600">{exampleJob.company}</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowJobModal(true)}
            className="w-full px-4 py-2.5 bg-red-500 text-white rounded-xl 
                     hover:bg-red-600 transition-colors font-medium
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete Job
          </button>
        </div>

        {/* tomiwa: Candidate deletion example */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <TrashIcon className="h-5 w-5 text-primary-600" />
            </div>
            <h3 className="font-display text-lg text-brand-black">Remove Candidate</h3>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="bg-neutral-50 rounded-lg p-3">
              <p className="font-medium text-sm text-brand-black">{exampleCandidate.name}</p>
              <p className="text-xs text-neutral-600">{exampleCandidate.email}</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowCandidateModal(true)}
            className="w-full px-4 py-2.5 bg-secondary-500 text-white rounded-xl 
                     hover:bg-secondary-600 transition-colors font-medium
                     focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
          >
            Remove Candidate
          </button>
        </div>

        {/* tomiwa: Company profile deletion example */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
              <TrashIcon className="h-5 w-5 text-accent-600" />
            </div>
            <h3 className="font-display text-lg text-brand-black">Delete Company</h3>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="font-medium text-sm text-red-800">⚠️ Dangerous Action</p>
              <p className="text-xs text-red-600">This will delete all company data</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowCompanyModal(true)}
            className="w-full px-4 py-2.5 bg-red-600 text-white rounded-xl 
                     hover:bg-red-700 transition-colors font-medium
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete Company
          </button>
        </div>
      </div>

      {/* tomiwa: Code example section */}
      <div className="mt-12 bg-neutral-900 rounded-xl p-6 overflow-x-auto">
        <h3 className="font-display text-lg text-white mb-4">Usage Example</h3>
        <pre className="text-sm text-neutral-300 leading-relaxed">
{`// johnson: Import the modal component
import DeleteConfirmationModal from '../ui/modals/DeleteConfirmationModal';

// johnson: Add state for modal visibility and loading
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);

// johnson: Handle delete confirmation
const handleDelete = async () => {
  setIsDeleting(true);
  try {
    await deleteItem(itemId); // Your API call
    setShowDeleteModal(false);
    // Show success message
  } catch (error) {
    // Handle error
  } finally {
    setIsDeleting(false);
  }
};

// johnson: Render the modal
<DeleteConfirmationModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
  title="Delete Job Posting"
  itemName="Senior Frontend Developer"
  itemType="job posting"
  description="This will permanently remove the job posting and all applications."
  isDangerous={true}
  isLoading={isDeleting}
/>`}
        </pre>
      </div>

      {/* tomiwa: Modal instances for each example */}
      
      {/* Job deletion modal */}
      <DeleteConfirmationModal
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        onConfirm={() => simulateDelete('Job', exampleJob)}
        title="Delete Job Posting"
        itemName={exampleJob.title}
        itemType="job posting"
        description="This will permanently remove the job posting and notify all applicants. All application data will be preserved but the job will no longer be active."
        isDangerous={true}
        isLoading={isDeleting}
      />

      {/* Candidate removal modal */}
      <DeleteConfirmationModal
        isOpen={showCandidateModal}
        onClose={() => setShowCandidateModal(false)}
        onConfirm={() => simulateDelete('Candidate', exampleCandidate)}
        title="Remove Candidate"
        itemName={exampleCandidate.name}
        itemType="candidate"
        description="This will remove the candidate from this job application. Their profile and data will remain in the system for other positions."
        isDangerous={false}
        isLoading={isDeleting}
      />

      {/* Company deletion modal */}
      <DeleteConfirmationModal
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        onConfirm={() => simulateDelete('Company', { name: 'Tech Corp' })}
        title="Delete Company Profile"
        itemName="Tech Corp"
        itemType="company profile"
        description="This will permanently delete the entire company profile, all job postings, candidate applications, and associated data. This action affects all team members and cannot be reversed."
        isDangerous={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
