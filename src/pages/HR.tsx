
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  File, 
  ChartBar, 
  CheckCircle,
  User
} from 'lucide-react';

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

interface ScheduleMeetingDialogProps {
  candidate: typeof mockCandidates[0] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ScheduleMeetingDialog: React.FC<ScheduleMeetingDialogProps> = ({ 
  candidate, 
  open, 
  onOpenChange 
}) => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [meetingType, setMeetingType] = useState<string>('video');

  if (!candidate) return null;

  const handleScheduleMeeting = () => {
    // In a real application, this would create a meeting in a calendar system
    toast.success(`Meeting scheduled with ${candidate.name} on ${date} at ${time}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogDescription>
            Set up an interview with {candidate.name} for {candidate.position} position.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              className="col-span-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input
              id="time"
              type="time"
              className="col-span-3"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="meeting-type" className="text-right">
              Type
            </Label>
            <Select value={meetingType} onValueChange={setMeetingType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select meeting type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="in-person">In-person</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleScheduleMeeting}>Schedule Meeting</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const HR: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(mockCandidates);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCandidate, setSelectedCandidate] = useState<typeof mockCandidates[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Reviewed':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Reviewed</span>;
      case 'Pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Pending</span>;
      case 'Shortlisted':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Shortlisted</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">HR Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage candidates and their resumes</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Total Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <User className="h-8 w-8 text-brand-blue mr-3" />
              <span className="text-3xl font-bold">{candidates.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Average ATS Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ChartBar className="h-8 w-8 text-brand-blue mr-3" />
              <span className="text-3xl font-bold">
                {Math.round(candidates.reduce((acc, candidate) => acc + candidate.score, 0) / candidates.length)}%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Scheduled Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-brand-blue mr-3" />
              <span className="text-3xl font-bold">0</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Candidate Resumes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead onClick={sortCandidates} className="cursor-pointer">
                    ATS Score {sortOrder === 'asc' ? '↑' : '↓'}
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">{candidate.name}</TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <File className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{candidate.resumeName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-bold ${getScoreColor(candidate.score)}`}>
                        {candidate.score}%
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewResume(candidate.resumeId)}
                        >
                          View
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleScheduleMeeting(candidate)}
                        >
                          Schedule
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <ScheduleMeetingDialog 
        candidate={selectedCandidate} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </div>
  );
};

export default HR;
