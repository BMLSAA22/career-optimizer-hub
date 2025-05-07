
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { File } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  position: string;
  resumeId: string;
  resumeName: string;
  score: number;
  status: string;
}

interface CandidateTableProps {
  candidates: Candidate[];
  sortOrder: 'asc' | 'desc';
  onSort: () => void;
  onViewResume: (resumeId: string) => void;
  onScheduleMeeting: (candidate: Candidate) => void;
  getScoreColor: (score: number) => string;
  getStatusBadge: (status: string) => React.ReactNode;
}

const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  sortOrder,
  onSort,
  onViewResume,
  onScheduleMeeting,
  getScoreColor,
  getStatusBadge
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead onClick={onSort} className="cursor-pointer">
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
                    onClick={() => onViewResume(candidate.resumeId)}
                  >
                    View
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => onScheduleMeeting(candidate)}
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
  );
};

export default CandidateTable;
