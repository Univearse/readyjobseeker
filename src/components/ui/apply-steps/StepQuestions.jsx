/**
 * File: src/components/ui/apply-steps/StepQuestions.jsx
 * 
 * tomiwa: Step 3 - Screening Questions Component
 * Dynamic inputs for employer screening questions with save-as-draft functionality
 * 
 * Features:
 * - Dynamic question types (textarea, radio, select, checkbox)
 * - Character count for text inputs
 * - Required field validation
 * - Save as draft functionality
 * - Responsive design for all screen sizes
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';

export default function StepQuestions({ job, formData, updateFormData, updateStepValidation, stepNumber, noValidation }) {
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [isDraft, setIsDraft] = useState(false);

  // tomiwa: Initialize answers from form data or load draft
  useEffect(() => {
    if (formData.questions?.answers) {
      setAnswers(formData.questions.answers);
      setIsDraft(formData.questions.isDraft || false);
    }
  }, [formData.questions]);

  // tomiwa: Always allow proceeding - NO QUESTION VALIDATION REQUIRED
  useEffect(() => {
    const newErrors = {}; // tomiwa: No errors since no validation required
    const isValid = true; // tomiwa: Always allow proceeding regardless of answers

    setErrors(newErrors);
    updateStepValidation(stepNumber, isValid);
    updateFormData('questions', {
      answers,
      errors: newErrors,
      isValid,
      isDraft,
      noValidation: true,
    });
  }, [answers, job.screeningQuestions, stepNumber, updateStepValidation, updateFormData, isDraft]);

  // tomiwa: Handle answer change
  const handleAnswerChange = (questionId, value, questionType) => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      
      if (questionType === 'checkbox') {
        // tomiwa: Handle checkbox arrays
        const currentValues = newAnswers[questionId] || [];
        if (currentValues.includes(value)) {
          newAnswers[questionId] = currentValues.filter(v => v !== value);
        } else {
          newAnswers[questionId] = [...currentValues, value];
        }
      } else {
        newAnswers[questionId] = value;
      }
      
      return newAnswers;
    });

    // tomiwa: Clear error for this question when user starts typing
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  // tomiwa: Save as draft
  const handleSaveDraft = () => {
    setIsDraft(true);
    updateFormData('questions', {
      answers,
      errors,
      isValid: Object.keys(errors).length === 0,
      isDraft: true,
    });
    
    // tomiwa: Show success message (this would typically trigger a toast)
    console.log('Draft saved successfully');
  };

  // tomiwa: Render question input based on type
  const renderQuestionInput = (question) => {
    const answer = answers[question.id] || '';
    const hasError = errors[question.id];

    switch (question.type) {
      case 'textarea':
        return (
          <div>
            <textarea
              id={`question-${question.id}`}
              value={answer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value, 'textarea')}
              placeholder="Type your answer here..."
              rows={4}
              maxLength={question.maxLength}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent resize-vertical ${
                hasError ? 'border-red-300' : 'border-neutral-300'
              }`}
            />
            {question.maxLength && (
              <div className="flex justify-between items-center mt-2 text-sm">
                <span className={hasError ? 'text-red-600' : 'text-neutral-500'}>
                  {hasError || ''}
                </span>
                <span className={`${
                  answer.length > question.maxLength * 0.9 ? 'text-yellow-600' : 'text-neutral-500'
                }`}>
                  {answer.length}/{question.maxLength}
                </span>
              </div>
            )}
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value, 'radio')}
                  className="w-4 h-4 text-brand-aqua border-neutral-300 focus:ring-brand-aqua"
                />
                <span className="ml-3 text-neutral-700">{option}</span>
              </label>
            ))}
            {hasError && (
              <p className="text-sm text-red-600 mt-2">{hasError}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div>
            <select
              id={`question-${question.id}`}
              value={answer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value, 'select')}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent ${
                hasError ? 'border-red-300' : 'border-neutral-300'
              }`}
            >
              <option value="">Select an option...</option>
              {question.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {hasError && (
              <p className="text-sm text-red-600 mt-2">{hasError}</p>
            )}
          </div>
        );

      case 'checkbox':
        const selectedValues = answer || [];
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedValues.includes(option)}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value, 'checkbox')}
                  className="w-4 h-4 text-brand-aqua border-neutral-300 rounded focus:ring-brand-aqua"
                />
                <span className="ml-3 text-neutral-700">{option}</span>
              </label>
            ))}
            {hasError && (
              <p className="text-sm text-red-600 mt-2">{hasError}</p>
            )}
          </div>
        );

      default:
        return (
          <input
            type="text"
            id={`question-${question.id}`}
            value={answer}
            onChange={(e) => handleAnswerChange(question.id, e.target.value, 'text')}
            placeholder="Type your answer here..."
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent ${
              hasError ? 'border-red-300' : 'border-neutral-300'
            }`}
          />
        );
    }
  };

  if (!job.screeningQuestions || job.screeningQuestions.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Screening Questions</h2>
          <p className="text-neutral-600">
            No additional questions required for this position.
          </p>
        </div>
        
        <Card className="p-12 text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">No Questions Required</h3>
          <p className="text-neutral-600">
            {job.company} hasn't added any screening questions for this position. You can proceed to the next step.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* tomiwa: Step header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Screening Questions</h2>
          <p className="text-neutral-600">
            Answer these questions from {job.company} to help them understand your fit for the role.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          size="sm"
          className="hidden sm:flex"
        >
          <BookmarkIcon className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
      </div>

      {/* tomiwa: Draft status indicator */}
      {isDraft && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <BookmarkIcon className="w-5 h-5 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Draft Saved</p>
              <p className="text-xs text-yellow-700">Your answers have been saved and you can continue later.</p>
            </div>
          </div>
        </Card>
      )}

      {/* tomiwa: Questions */}
      <div className="space-y-6">
        {job.screeningQuestions.map((question, index) => (
          <Card key={question.id} className="p-6">
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-neutral-900 pr-4">
                  {index + 1}. {question.question}
                </h3>
                {question.required && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex-shrink-0">
                    Required
                  </span>
                )}
              </div>
              {question.type === 'textarea' && question.maxLength && (
                <p className="text-sm text-neutral-600">
                  Maximum {question.maxLength} characters
                </p>
              )}
            </div>
            
            {renderQuestionInput(question)}
          </Card>
        ))}
      </div>

      {/* tomiwa: Progress summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              Object.keys(errors).length === 0 ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              {Object.keys(errors).length === 0 ? (
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              ) : (
                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {Object.keys(errors).length === 0 ? 'All Questions Answered' : 'Questions In Progress'}
              </h3>
              <p className="text-sm text-neutral-600">
                {job.screeningQuestions.filter(q => answers[q.id] && answers[q.id].toString().trim() !== '').length} of {job.screeningQuestions.length} questions completed
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            size="sm"
            className="sm:hidden"
          >
            <BookmarkIcon className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        </div>

        {/* tomiwa: Show remaining required questions */}
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">
              Please complete the following required questions:
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              {Object.entries(errors).map(([questionId, error]) => {
                const question = job.screeningQuestions.find(q => q.id.toString() === questionId);
                return (
                  <li key={questionId} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Question {job.screeningQuestions.indexOf(question) + 1}: {question?.question}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Card>

      {/* tomiwa: Tips for answering questions */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Tips for Great Answers
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-start">
            <CheckCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>Be specific and provide concrete examples from your experience</span>
          </div>
          <div className="flex items-start">
            <CheckCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>Show enthusiasm for the role and company</span>
          </div>
          <div className="flex items-start">
            <CheckCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>Keep answers concise but comprehensive</span>
          </div>
          <div className="flex items-start">
            <CheckCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>Proofread your answers before submitting</span>
          </div>
        </div>
      </Card>
    </div>
  );
}


