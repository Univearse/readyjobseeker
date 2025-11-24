/**
 * File: src/components/ui/apply-steps/StepResume.jsx
 * 
 * tomiwa: Step 2 - Resume & Documents Component
 * Upload/select resume and optional portfolio link with validation
 * 
 * Features:
 * - Resume upload with drag & drop (PDF/DOCX ≤10MB)
 * - Select from previously uploaded resumes
 * - Optional portfolio link input
 * - File validation and preview
 * - Responsive design for all screen sizes
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  DocumentTextIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  TrashIcon,
  LinkIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Mock previously uploaded resumes
const mockPreviousResumes = [
  {
    id: 1,
    name: 'John_Doe_Resume_2024.pdf',
    size: '245 KB',
    uploadDate: '2024-10-15',
    isDefault: true,
  },
  {
    id: 2,
    name: 'John_Doe_Product_Designer_Resume.pdf',
    size: '312 KB',
    uploadDate: '2024-09-28',
    isDefault: false,
  },
];

export default function StepResume({ job, formData, updateFormData, updateStepValidation, stepNumber, noValidation }) {
  const [selectedResume, setSelectedResume] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [previousResumes] = useState(mockPreviousResumes);

  // tomiwa: Initialize with default resume if available
  useEffect(() => {
    const defaultResume = previousResumes.find(resume => resume.isDefault);
    if (defaultResume && !selectedResume && !uploadedFile) {
      setSelectedResume(defaultResume);
    }
  }, [previousResumes, selectedResume, uploadedFile]);

  // tomiwa: Always allow proceeding - NO RESUME VALIDATION REQUIRED
  useEffect(() => {
    const isValid = true; // tomiwa: Always allow proceeding regardless of resume selection
    
    updateStepValidation(stepNumber, isValid);
    updateFormData('resume', {
      selectedResume,
      uploadedFile,
      portfolioUrl: portfolioUrl.trim(),
      isValid,
      noValidation: true,
    });
  }, [selectedResume, uploadedFile, portfolioUrl, stepNumber, updateStepValidation, updateFormData]);

  // tomiwa: File validation
  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a PDF or Word document (.pdf, .doc, .docx)';
    }
    
    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }
    
    return null;
  };

  // tomiwa: Handle file upload
  const handleFileUpload = async (file) => {
    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      return;
    }

    setIsUploading(true);
    setUploadError('');
    
    try {
      // johnson: ExistingCode - Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const uploadedFileData = {
        id: Date.now(),
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        uploadDate: new Date().toISOString().split('T')[0],
        file: file,
      };
      
      setUploadedFile(uploadedFileData);
      setSelectedResume(null); // tomiwa: Clear selected resume when uploading new one
    } catch (error) {
      setUploadError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // tomiwa: Handle drag and drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  // tomiwa: Handle file input change
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // tomiwa: Handle resume selection
  const handleResumeSelect = (resume) => {
    setSelectedResume(resume);
    setUploadedFile(null); // tomiwa: Clear uploaded file when selecting existing resume
    setUploadError('');
  };

  // tomiwa: Handle portfolio URL change
  const handlePortfolioUrlChange = (e) => {
    setPortfolioUrl(e.target.value);
  };

  // tomiwa: Remove uploaded file
  const handleRemoveUploadedFile = () => {
    setUploadedFile(null);
    setUploadError('');
    // tomiwa: Auto-select default resume if available
    const defaultResume = previousResumes.find(resume => resume.isDefault);
    if (defaultResume) {
      setSelectedResume(defaultResume);
    }
  };

  // tomiwa: Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* tomiwa: Step header */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Resume & Documents</h2>
        <p className="text-neutral-600">
          Upload your resume or select from previously uploaded documents. Add a portfolio link to showcase your work.
        </p>
      </div>

      {/* tomiwa: Resume selection/upload section */}
      <div className="space-y-6">
        {/* tomiwa: Previously uploaded resumes */}
        {previousResumes.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
              <FolderIcon className="w-5 h-5 mr-2" />
              Select from Previous Resumes
            </h3>
            <div className="space-y-3">
              {previousResumes.map((resume) => (
                <div
                  key={resume.id}
                  className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    selectedResume?.id === resume.id
                      ? 'border-brand-aqua bg-brand-aqua/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                  onClick={() => handleResumeSelect(resume)}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      selectedResume?.id === resume.id ? 'bg-brand-aqua text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      <DocumentTextIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900 flex items-center">
                        {resume.name}
                        {resume.isDefault && (
                          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-aqua/10 text-brand-aqua">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {resume.size} • Uploaded {new Date(resume.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                    {selectedResume?.id === resume.id && (
                      <CheckCircleIcon className="w-5 h-5 text-brand-aqua" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* tomiwa: File upload section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
            <CloudArrowUpIcon className="w-5 h-5 mr-2" />
            Upload New Resume
          </h3>

          {uploadedFile ? (
            // tomiwa: Uploaded file display
            <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-xl">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <DocumentTextIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-green-900">{uploadedFile.name}</div>
                  <div className="text-sm text-green-700">
                    {uploadedFile.size} • Uploaded just now
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <EyeIcon className="w-4 h-4" />
                </Button>
                <button
                  onClick={handleRemoveUploadedFile}
                  className="p-2 text-red-600 hover:text-red-700 transition-colors"
                  aria-label="Remove uploaded file"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>
          ) : (
            // tomiwa: File upload dropzone
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                isDragging
                  ? 'border-brand-aqua bg-brand-aqua/5'
                  : 'border-neutral-300 hover:border-neutral-400'
              } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isUploading ? (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-aqua mx-auto"></div>
                  <p className="text-neutral-600">Uploading your resume...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto">
                    <CloudArrowUpIcon className="w-8 h-8 text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-neutral-900 mb-2">
                      Drag and drop your resume here
                    </p>
                    <p className="text-neutral-600 mb-4">
                      or click to browse files
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileInputChange}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                  </div>
                  <p className="text-sm text-neutral-500">
                    Supported formats: PDF, DOC, DOCX (max 10MB)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* tomiwa: Upload error */}
          {uploadError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Upload Error</h4>
                  <p className="text-sm text-red-700 mt-1">{uploadError}</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* tomiwa: Portfolio URL section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
            <LinkIcon className="w-5 h-5 mr-2" />
            Portfolio Link <span className="text-sm font-normal text-neutral-500 ml-2">(Optional)</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="portfolio-url" className="block text-sm font-medium text-neutral-700 mb-2">
                Portfolio or Personal Website URL
              </label>
              <input
                type="url"
                id="portfolio-url"
                value={portfolioUrl}
                onChange={handlePortfolioUrlChange}
                placeholder="https://yourportfolio.com"
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
              />
            </div>
            <p className="text-sm text-neutral-600">
              Share a link to your portfolio, personal website, or any relevant work samples that showcase your skills for this {job.jobTitle} position.
            </p>
          </div>
        </Card>

        {/* tomiwa: Resume requirements for this job */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Resume Tips for {job.company}
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Highlight experience with {job.tags?.slice(0, 2).join(' and ') || 'relevant technologies'}</span>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Include specific examples of {job.jobTitle.toLowerCase()} work</span>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Quantify your achievements with metrics and results</span>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Keep it concise and relevant to the role</span>
            </div>
          </div>
        </Card>

        {/* tomiwa: Selection summary */}
        {(selectedResume || uploadedFile) && (
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-start">
              <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">Resume Ready!</h3>
                <p className="text-green-800 mb-2">
                  You've selected: <strong>{(uploadedFile || selectedResume)?.name}</strong>
                </p>
                {portfolioUrl && (
                  <p className="text-green-800">
                    Portfolio: <strong>{portfolioUrl}</strong>
                  </p>
                )}
                <p className="text-sm text-green-700 mt-2">
                  Your resume will be submitted with your application to {job.company}.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}


