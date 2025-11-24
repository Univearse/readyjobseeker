/**
 * File: src/components/ui/TimelineMini.jsx
 * 
 * tomiwa: Mini Timeline Component
 * Compact timeline showing application progress stages
 */

'use client';

import React from 'react';
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/solid';
import {
  CheckCircleIcon as CheckCircleOutline,
  ClockIcon as ClockOutline
} from '@heroicons/react/24/outline';

// tomiwa: Timeline stages configuration
const timelineStages = [
  { key: 'applied', label: 'Applied', order: 1 },
  { key: 'review', label: 'Review', order: 2 },
  { key: 'test', label: 'Test', order: 3 },
  { key: 'interview', label: 'Interview', order: 4 },
  { key: 'decision', label: 'Decision', order: 5 }
];

// tomiwa: Status to stage mapping
const statusToStage = {
  'Applied': 'applied',
  'Under Review': 'review',
  'Test Assigned': 'test',
  'Interview Scheduled': 'interview',
  'Offer': 'decision',
  'Rejected': 'decision',
  'Withdrawn': 'applied',
  'Closed': 'decision'
};

export default function TimelineMini({ 
  status, 
  completedStages = [],
  rejectedAt = null,
  className = ''
}) {
  // tomiwa: Get current stage from status
  const currentStage = statusToStage[status] || 'applied';
  const currentStageOrder = timelineStages.find(s => s.key === currentStage)?.order || 1;
  
  // tomiwa: Determine if application was rejected
  const isRejected = status === 'Rejected';
  const isWithdrawn = status === 'Withdrawn';
  
  // tomiwa: Get stage status (completed, current, pending, rejected)
  const getStageStatus = (stage) => {
    if (isRejected && stage.key === rejectedAt) return 'rejected';
    if (isWithdrawn && stage.order > 1) return 'cancelled';
    if (completedStages.includes(stage.key)) return 'completed';
    if (stage.order < currentStageOrder) return 'completed';
    if (stage.key === currentStage) return 'current';
    return 'pending';
  };

  // tomiwa: Get stage icon and styling
  const getStageIcon = (stage, stageStatus) => {
    const baseClasses = "w-6 h-6 flex-shrink-0";
    
    switch (stageStatus) {
      case 'completed':
        return <CheckCircleIcon className={`${baseClasses} text-emerald-500`} />;
      case 'current':
        return <ClockIcon className={`${baseClasses} text-brand-aqua animate-pulse`} />;
      case 'rejected':
        return <XCircleIcon className={`${baseClasses} text-red-500`} />;
      case 'cancelled':
        return <XCircleIcon className={`${baseClasses} text-neutral-400`} />;
      default:
        return <ClockOutline className={`${baseClasses} text-neutral-300`} />;
    }
  };

  // tomiwa: Get connector line styling
  const getConnectorClass = (index, stageStatus) => {
    if (index === timelineStages.length - 1) return 'invisible';
    
    const nextStage = timelineStages[index + 1];
    const nextStageStatus = getStageStatus(nextStage);
    
    if (stageStatus === 'completed' && (nextStageStatus === 'completed' || nextStageStatus === 'current')) {
      return 'bg-emerald-500';
    }
    if (stageStatus === 'rejected' || nextStageStatus === 'rejected' || nextStageStatus === 'cancelled') {
      return 'bg-red-300';
    }
    return 'bg-neutral-200';
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {timelineStages.map((stage, index) => {
        const stageStatus = getStageStatus(stage);
        
        return (
          <div key={stage.key} className="flex items-center flex-1">
            {/* tomiwa: Stage indicator */}
            <div className="flex flex-col items-center">
              {getStageIcon(stage, stageStatus)}
              <span className={`
                text-xs font-medium mt-1 text-center
                ${stageStatus === 'completed' ? 'text-emerald-600' : ''}
                ${stageStatus === 'current' ? 'text-brand-aqua' : ''}
                ${stageStatus === 'rejected' ? 'text-red-600' : ''}
                ${stageStatus === 'cancelled' ? 'text-neutral-400' : ''}
                ${stageStatus === 'pending' ? 'text-neutral-400' : ''}
              `}>
                {stage.label}
              </span>
            </div>
            
            {/* tomiwa: Connector line */}
            <div className={`
              flex-1 h-0.5 mx-2 transition-colors duration-300
              ${getConnectorClass(index, stageStatus)}
            `} />
          </div>
        );
      })}
    </div>
  );
}
