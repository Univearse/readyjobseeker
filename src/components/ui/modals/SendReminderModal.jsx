"use client";

import { useState } from 'react';
import { X, Mail, Clock, AlertCircle } from 'lucide-react';

export default function SendReminderModal({ isOpen, onClose, candidate }) {
  const [reminderType, setReminderType] = useState('gentle');
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('normal');

  const reminderTemplates = {
    gentle: "Hi [name], I hope you're doing well. I'm following up regarding [subject]. We'd love to hear back from you when you have a chance.",
    followUp: "Hi [name], Just checking in about [subject]. Please let us know if you need any additional information or have any questions.",
    urgent: "Hi [name], This is an urgent reminder about [subject]. Please respond at your earliest convenience as we need to move forward with the process.",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-display text-neutral-900">Send Reminder</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form className="space-y-6">
            {/* Reminder Type */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Reminder Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setReminderType('gentle');
                    setMessage(reminderTemplates.gentle);
                  }}
                  className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg border ${
                    reminderType === 'gentle'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Mail className="h-5 w-5 mb-1" />
                  <span className="text-sm">Gentle</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReminderType('followUp');
                    setMessage(reminderTemplates.followUp);
                  }}
                  className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg border ${
                    reminderType === 'followUp'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Clock className="h-5 w-5 mb-1" />
                  <span className="text-sm">Follow-up</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReminderType('urgent');
                    setMessage(reminderTemplates.urgent);
                  }}
                  className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg border ${
                    reminderType === 'urgent'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <AlertCircle className="h-5 w-5 mb-1" />
                  <span className="text-sm">Urgent</span>
                </button>
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Urgency Level
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setUrgency('normal')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${
                    urgency === 'normal'
                      ? 'bg-green-500 text-white'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('high')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${
                    urgency === 'high'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  High
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('critical')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${
                    urgency === 'critical'
                      ? 'bg-red-500 text-white'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  Critical
                </button>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your reminder message..."
              />
            </div>

            {/* Send Options */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary-500 rounded border-neutral-300 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">Send copy to team members</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary-500 rounded border-neutral-300 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">Set follow-up reminder if no response</span>
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
                className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
              >
                Send Reminder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}













