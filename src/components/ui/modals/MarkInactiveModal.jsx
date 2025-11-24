"use client";

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function MarkInactiveModal({ isOpen, onClose, candidate }) {
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [notifyCandidate, setNotifyCandidate] = useState(true);

  const reasons = [
    { id: 'noResponse', label: 'No Response', description: 'Candidate has not responded to multiple attempts of contact' },
    { id: 'withdrew', label: 'Candidate Withdrew', description: 'Candidate has withdrawn from the process' },
    { id: 'hired', label: 'Position Filled', description: 'Position has been filled by another candidate' },
    { id: 'notQualified', label: 'Not Qualified', description: 'Candidate does not meet the required qualifications' },
    { id: 'other', label: 'Other', description: 'Other reason not listed above' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl font-display text-neutral-900">Mark as Inactive</h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Warning Message */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700">
              This action will mark the candidate as inactive and remove them from active consideration.
              This action cannot be undone automatically.
            </p>
          </div>

          <form className="space-y-6">
            {/* Reason Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Reason for Inactivation
              </label>
              <div className="space-y-2">
                {reasons.map((reasonOption) => (
                  <label
                    key={reasonOption.id}
                    className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
                      reason === reasonOption.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={reasonOption.id}
                      checked={reason === reasonOption.id}
                      onChange={(e) => setReason(e.target.value)}
                      className="form-radio h-4 w-4 text-primary-500 border-neutral-300 focus:ring-primary-500 mt-1"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-neutral-900">{reasonOption.label}</p>
                      <p className="text-sm text-neutral-600">{reasonOption.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1">
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Add any additional context or notes..."
              />
            </div>

            {/* Notification Option */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifyCandidate}
                  onChange={(e) => setNotifyCandidate(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-primary-500 rounded border-neutral-300 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">Notify candidate via email</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Confirm & Mark Inactive
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}






