"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock, Award } from "lucide-react";

// tomiwa: Status badge component with different colors based on status
const StatusBadge = ({ status }) => {
  const statusStyles = {
    New: "bg-blue-50 text-blue-600 border-blue-200",
    Shortlisted: "bg-green-50 text-green-600 border-green-200",
    "Interview Scheduled": "bg-purple-50 text-purple-600 border-purple-200",
    "Offer Sent": "bg-yellow-50 text-yellow-600 border-yellow-200",
    Rejected: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium border ${statusStyles[status] || "bg-neutral-50 text-neutral-600 border-neutral-200"}`}>
      {status}
    </span>
  );
};

// tomiwa: Candidate stage indicator component
const StageIndicator = ({ stage }) => {
  const stageStyles = {
    "Assessment": "text-blue-600",
    "First Interview": "text-purple-600",
    "Technical Interview": "text-indigo-600",
    "Final Interview": "text-green-600",
    "Offer Stage": "text-yellow-600",
  };

  return (
    <div className={`flex items-center text-xs font-medium ${stageStyles[stage] || "text-neutral-600"}`}>
      <Clock className="h-3 w-3 mr-1" />
      {stage}
    </div>
  );
};

// tomiwa: CandidatesList component showing conversations grouped by job
export default function CandidatesList({ conversations, onSelectCandidate, selectedId }) {
  return (
    <div className="h-full overflow-y-auto">
      {conversations.map((jobGroup) => (
        <div key={jobGroup.jobId} className="border-b">
          <div className="p-4 bg-neutral-50 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-neutral-900">{jobGroup.jobTitle}</h3>
              <span className="text-sm text-neutral-500">{jobGroup.candidates.length} candidates</span>
            </div>
          </div>
          
          {jobGroup.candidates.map((candidate) => (
            <motion.button
              key={candidate.id}
              onClick={() => onSelectCandidate(candidate)}
              className={`w-full p-4 flex items-start space-x-4 hover:bg-neutral-50 transition-colors border-b relative ${
                selectedId === candidate.id ? "bg-neutral-100" : ""
              }`}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              <div className="relative">
                <Image
                  src={candidate.avatar}
                  alt={candidate.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                {candidate.unread && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white" />
                )}
              </div>
              
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-neutral-900">{candidate.name}</h4>
                    <StatusBadge status={candidate.status} />
                  </div>
                  <span className="text-sm text-neutral-500">{candidate.lastMessageTime}</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-2">
                  <div className="flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    {candidate.experience}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {candidate.location}
                  </div>
                  <StageIndicator stage={candidate.stage} />
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  {candidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-neutral-600 truncate">
                  {candidate.lastMessage}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  );
}