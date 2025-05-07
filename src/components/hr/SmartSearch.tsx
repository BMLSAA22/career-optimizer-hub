
import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

interface SmartSearchProps {
  onCandidateFound: (candidates: any[]) => void;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ onCandidateFound }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast("Please enter search criteria");
      return;
    }
    
    setIsSearching(true);
    
    // Simulate AI search with a timeout
    setTimeout(() => {
      // Mock data for demonstration
      const results = [
        { 
          id: 6, 
          name: 'Amanda Wilson', 
          position: 'Backend Developer', 
          resumeId: '6',
          resumeName: 'Backend_Developer_Resume.pdf',
          score: 88,
          status: 'New',
          skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
          matchScore: 92
        },
        { 
          id: 7, 
          name: 'David Zhang', 
          position: 'Full Stack Developer', 
          resumeId: '7',
          resumeName: 'Fullstack_Developer_Resume.pdf',
          score: 83,
          status: 'New',
          skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
          matchScore: 87
        }
      ];
      
      onCandidateFound(results);
      setIsSearching(false);
      toast.success(`Found ${results.length} potential candidates`);
    }, 1500);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Search className="mr-2 h-5 w-5 text-brand-blue" />
          Smart Candidate Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="search-query" className="text-sm font-medium mb-1 block">Job Requirements</label>
            <Input
              id="search-query"
              placeholder="e.g. 'Senior developer with 5+ years of React experience and knowledge of AWS'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              <span className="font-medium">Position:</span>
              <span className="ml-1">Developer</span>
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              <span className="font-medium">Skills:</span>
              <span className="ml-1">React, TypeScript</span>
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              <span className="font-medium">Experience:</span>
              <span className="ml-1">3+ years</span>
            </div>
          </div>
          
          <div>
            <Button type="submit" className="w-full sm:w-auto" disabled={isSearching}>
              {isSearching ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find Candidates
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SmartSearch;
