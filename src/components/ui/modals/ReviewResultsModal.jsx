"use client";

import { useState } from 'react';
import { X, CheckCircle, AlertTriangle, FileText, Download } from 'lucide-react';

export default function ReviewResultsModal({ isOpen, onClose, result }) {
  const [feedback, setFeedback] = useState('');
  const [decision, setDecision] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-display text-neutral-900">Assessment Results</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Score Overview */}
          <div className="bg-neutral-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-neutral-900">Technical Assessment</h3>
                <p className="text-sm text-neutral-600">Completed on {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">92%</div>
                <p className="text-sm text-neutral-600">Overall Score</p>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">Problem Solving</span>
                <span className="text-sm font-medium text-neutral-900">95%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">Code Quality</span>
                <span className="text-sm font-medium text-neutral-900">90%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">Technical Knowledge</span>
                <span className="text-sm font-medium text-neutral-900">88%</span>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-neutral-900 mb-2">Key Strengths</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-600">Strong understanding of algorithms and data structures</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-600">Excellent code organization and readability</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-600">Efficient problem-solving approach</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-neutral-900 mb-2">Areas for Improvement</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-600">Edge case handling could be more comprehensive</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-600">Test coverage could be improved</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-neutral-700 mb-1">
                Feedback Notes
              </label>
              <textarea
                id="feedback"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Add your feedback notes here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Decision
              </label>
              <div className="space-x-2">
                <button
                  onClick={() => setDecision('proceed')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    decision === 'proceed'
                      ? 'bg-green-500 text-white'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  Proceed to Interview
                </button>
                <button
                  onClick={() => setDecision('reject')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    decision === 'reject'
                      ? 'bg-red-500 text-white'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              className="flex items-center px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </button>
            <div className="space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
              >
                Submit Decision
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

