
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';

// Import refactored components
import StatsCards from '@/components/hr/StatsCards';
import CandidateTable from '@/components/hr/CandidateTable';
import SmartSearch from '@/components/hr/SmartSearch';
import AdvancedScheduler from '@/components/hr/AdvancedScheduler';
import AutomatedMessaging from '@/components/hr/AutomatedMessaging';
import { getScoreColor, getStatusBadge } from '@/components/hr/HRUtils';

// Mock data for candidates and their resumes
const mockCandidates = [
  { 
    id: 1, 
    name: 'John Doe', 
    position: 'Software Engineer', 
    resumeId: '1',
    resumeName: 'Software_Engineer_Resume.pdf',
    score: 85,
    status: 'Reviewed'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    position: 'Product Manager', 
    resumeId: '2',
    resumeName: 'Product_Manager_Resume.docx',
    score: 72,
    status: 'Pending'
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    position: 'UX Designer', 
    resumeId: '3',
    resumeName: 'UX_Designer_Resume.pdf',
    score: 91,
    status: 'Shortlisted'
  },
  { 
    id: 4, 
    name: 'Lisa Brown', 
    position: 'Data Analyst', 
    resumeId: '4',
    resumeName: 'Data_Analyst_Resume.pdf',
    score: 65,
    status: 'Pending'
  },
  { 
    id: 5, 
    name: 'Michael Chen', 
    position: 'Frontend Developer', 
    resumeId: '5',
    resumeName: 'Frontend_Developer_Resume.pdf',
    score: 78,
    status: 'Reviewed'
  },
];

const HR: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(mockCandidates);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCandidate, setSelectedCandidate] = useState<typeof mockCandidates[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scheduledInterviews, setScheduledInterviews] = useState(0);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleViewResume = (resumeId: string) => {
    navigate('/analysis');
  };

  const handleScheduleMeeting = (candidate: typeof mockCandidates[0]) => {
    setSelectedCandidate(candidate);
    setDialogOpen(true);
  };

  const sortCandidates = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    
    const sortedCandidates = [...candidates].sort((a, b) => {
      return newSortOrder === 'asc' ? a.score - b.score : b.score - a.score;
    });
    
    setCandidates(sortedCandidates);
  };
  
  const handleCandidateFound = (newCandidates: any[]) => {
    setCandidates(prev => [...newCandidates, ...prev]);
  };
  
  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedCandidate(null);
    } else if (open && selectedCandidate) {
      // Increment scheduled interview count when dialog is closed with success
      setScheduledInterviews(prev => prev + 1);
    }
  };

  // Calculate average score for the stats card
  const calculateAverageScore = () => {
    return Math.round(candidates.reduce((acc, candidate) => acc + candidate.score, 0) / candidates.length);
  };

  if (!isAuthenticated) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">HR Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage candidates and their resumes</p>
      
      {/* Stats Cards */}
      <StatsCards 
        candidatesCount={candidates.length}
        averageScore={calculateAverageScore()}
        scheduledInterviews={scheduledInterviews}
      />
      
      {/* Smart Search */}
      <div className="mb-8">
        <SmartSearch onCandidateFound={handleCandidateFound} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Resumes</CardTitle>
            </CardHeader>
            <CardContent>
              <CandidateTable
                candidates={candidates}
                sortOrder={sortOrder}
                onSort={sortCandidates}
                onViewResume={handleViewResume}
                onScheduleMeeting={handleScheduleMeeting}
                getScoreColor={getScoreColor}
                getStatusBadge={getStatusBadge}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <AutomatedMessaging candidates={candidates} />
        </div>
      </div>
      
      <AdvancedScheduler 
        candidate={selectedCandidate} 
        open={dialogOpen} 
        onOpenChange={handleDialogOpenChange} 
      />
    </div>
  );
};

export default HR;
