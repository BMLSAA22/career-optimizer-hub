
import React from 'react';

// Helper function to get color based on score
export const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

// Helper function to generate status badge
export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Reviewed':
      return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Reviewed</span>;
    case 'Pending':
      return <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Pending</span>;
    case 'Shortlisted':
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Shortlisted</span>;
    case 'New':
      return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">New</span>;
    default:
      return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
  }
};
