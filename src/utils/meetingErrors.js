// tomiwa: Error types for meeting operations
export const MeetingErrorTypes = {
  VALIDATION: 'VALIDATION',
  SCHEDULING_CONFLICT: 'SCHEDULING_CONFLICT',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN: 'UNKNOWN',
};

// tomiwa: Custom error class for meeting operations
export class MeetingOperationError extends Error {
  constructor(type, message, details = {}) {
    super(message);
    this.name = 'MeetingOperationError';
    this.type = type;
    this.details = details;
  }
}

// tomiwa: Validation functions
export const validateMeetingTime = (date, time) => {
  const dateTime = new Date(`${date}T${time}`);
  
  if (isNaN(dateTime.getTime())) {
    throw new MeetingOperationError(
      MeetingErrorTypes.VALIDATION,
      'Invalid date or time format'
    );
  }

  if (dateTime <= new Date()) {
    throw new MeetingOperationError(
      MeetingErrorTypes.VALIDATION,
      'Meeting time must be in the future'
    );
  }

  // tomiwa: Check if the meeting is within business hours (9 AM to 6 PM)
  const hours = dateTime.getHours();
  if (hours < 9 || hours >= 18) {
    throw new MeetingOperationError(
      MeetingErrorTypes.VALIDATION,
      'Meetings must be scheduled between 9 AM and 6 PM'
    );
  }

  return true;
};

export const validateMeetingDuration = (duration) => {
  const validDurations = [15, 30, 45, 60, 90, 120];
  if (!validDurations.includes(Number(duration))) {
    throw new MeetingOperationError(
      MeetingErrorTypes.VALIDATION,
      'Invalid meeting duration'
    );
  }
  return true;
};

export const validateParticipants = (participants) => {
  if (!participants || !Array.isArray(participants) || participants.length === 0) {
    throw new MeetingOperationError(
      MeetingErrorTypes.VALIDATION,
      'At least one participant is required'
    );
  }

  // tomiwa: Check if all participants have valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalidEmails = participants.filter(
    participant => participant.includes('@') && !emailRegex.test(participant)
  );

  if (invalidEmails.length > 0) {
    throw new MeetingOperationError(
      MeetingErrorTypes.VALIDATION,
      'Invalid email format for some participants',
      { invalidEmails }
    );
  }

  return true;
};

export const validateMeetingLink = (link) => {
  if (!link) return true; // Link is optional

  try {
    new URL(link);
    return true;
  } catch {
    throw new MeetingOperationError(
      MeetingErrorTypes.VALIDATION,
      'Invalid meeting link format'
    );
  }
};

// tomiwa: Check for scheduling conflicts
export const checkSchedulingConflicts = (newMeeting, existingMeetings) => {
  const newStart = new Date(newMeeting.date);
  const newEnd = new Date(newStart.getTime() + newMeeting.duration * 60000);

  const conflicts = existingMeetings.filter(meeting => {
    if (meeting.id === newMeeting.id) return false; // Skip the meeting being updated
    if (meeting.status === 'Canceled') return false; // Skip canceled meetings

    const existingStart = new Date(meeting.date);
    const existingEnd = new Date(existingStart.getTime() + meeting.duration * 60000);

    return (
      (newStart >= existingStart && newStart < existingEnd) ||
      (newEnd > existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd)
    );
  });

  if (conflicts.length > 0) {
    throw new MeetingOperationError(
      MeetingErrorTypes.SCHEDULING_CONFLICT,
      'This time slot conflicts with existing meetings',
      { conflicts }
    );
  }

  return true;
};

// tomiwa: Format error messages for display
export const formatErrorMessage = (error) => {
  if (error instanceof MeetingOperationError) {
    switch (error.type) {
      case MeetingErrorTypes.VALIDATION:
        return error.message;
      case MeetingErrorTypes.SCHEDULING_CONFLICT:
        return `Scheduling conflict: ${error.message}`;
      case MeetingErrorTypes.PERMISSION_DENIED:
        return 'You do not have permission to perform this action';
      case MeetingErrorTypes.NETWORK_ERROR:
        return 'Network error. Please check your connection and try again';
      default:
        return 'An unexpected error occurred';
    }
  }
  return error.message || 'An unexpected error occurred';
};
