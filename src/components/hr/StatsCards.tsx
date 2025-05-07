
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChartBar, User } from 'lucide-react';

interface StatsCardsProps {
  candidatesCount: number;
  averageScore: number;
  scheduledInterviews: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  candidatesCount,
  averageScore,
  scheduledInterviews
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-600">Total Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <User className="h-8 w-8 text-brand-blue mr-3" />
            <span className="text-3xl font-bold">{candidatesCount}</span>
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
            <span className="text-3xl font-bold">{averageScore}%</span>
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
            <span className="text-3xl font-bold">{scheduledInterviews}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
