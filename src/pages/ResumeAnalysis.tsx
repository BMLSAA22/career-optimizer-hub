
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  CheckCircle,
  XCircle,
  File,
  Download,
  ArrowLeft,
  ChartBar,
  ListChecks,
  FileText,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Mock data for the resume analysis
const mockKeywordData = [
  { name: 'Python', score: 100, color: '#10B981' },
  { name: 'React', score: 100, color: '#10B981' },
  { name: 'TypeScript', score: 100, color: '#10B981' },
  { name: 'JavaScript', score: 100, color: '#10B981' },
  { name: 'Project Management', score: 80, color: '#FBBF24' },
  { name: 'Data Analysis', score: 60, color: '#FBBF24' },
  { name: 'Communication', score: 40, color: '#EF4444' },
  { name: 'Leadership', score: 20, color: '#EF4444' },
];

const mockSectionScores = [
  { name: 'Contact Info', value: 100 },
  { name: 'Summary', value: 85 },
  { name: 'Experience', value: 72 },
  { name: 'Skills', value: 90 },
  { name: 'Education', value: 95 },
];

const mockIssues = [
  { type: 'critical', message: 'Missing professional email in contact information' },
  { type: 'critical', message: 'No quantifiable achievements in work experience' },
  { type: 'warning', message: 'Summary is too generic, could be more targeted' },
  { type: 'warning', message: 'Skills section could benefit from more organization' },
  { type: 'info', message: 'Consider adding LinkedIn profile to contact info' },
  { type: 'info', message: 'Resume could be more concise (currently 2 pages)' },
];

const ResumeAnalysis: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Simulate loading and analyzing
    const timer = setTimeout(() => {
      setIsLoading(false);
      setScore(76);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-amber-50';
    return 'bg-red-50';
  };

  const getScoreBorderColor = (score: number) => {
    if (score >= 80) return 'border-green-200';
    if (score >= 60) return 'border-amber-200';
    return 'border-red-200';
  };

  const getProgressColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'warning':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'info':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case 'info':
        return <FileText className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="page-container">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" className="mr-4" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Resume Analysis</h1>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Analyzing your resume</h2>
          <p className="text-gray-500">Please wait while we analyze your resume against ATS systems...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview" className="flex items-center">
                  <ChartBar className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="issues" className="flex items-center">
                  <ListChecks className="h-4 w-4 mr-2" />
                  Issues & Improvements
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Keywords Match</CardTitle>
                      <CardDescription>
                        How well your resume matches job keywords
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                          data={mockKeywordData}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={90} />
                          <Tooltip formatter={(value) => [`${value}%`, 'Match']} />
                          <Bar dataKey="score" fill={(entry) => entry.color} radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Section Analysis</CardTitle>
                      <CardDescription>
                        Analysis by resume section
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockSectionScores.map((section, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{section.name}</span>
                            <span className="text-sm font-medium">{section.value}%</span>
                          </div>
                          <Progress value={section.value} className={`h-2 ${getProgressColor(section.value)}`} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Format Analysis</CardTitle>
                    <CardDescription>
                      Assessment of your resume's structure and format
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                          <span>Professional file format (PDF)</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Good
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                          <span>Appropriate length (2 pages)</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Good
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <XCircle className="h-5 w-5 text-amber-600 mr-3" />
                          <span>Some inconsistencies in formatting</span>
                        </div>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Needs Improvement
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <XCircle className="h-5 w-5 text-red-600 mr-3" />
                          <span>No clear section headings</span>
                        </div>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          Critical
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="issues">
                <Card>
                  <CardHeader>
                    <CardTitle>Issues & Suggested Improvements</CardTitle>
                    <CardDescription>
                      We found {mockIssues.length} issues in your resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockIssues.map((issue, index) => (
                        <div key={index} className={`flex items-start p-3 border rounded-md ${getIssueColor(issue.type)}`}>
                          <div className="mr-3 mt-0.5">{getIssueIcon(issue.type)}</div>
                          <div>
                            <p className="font-medium">{issue.message}</p>
                            {issue.type === 'critical' && (
                              <p className="text-sm mt-1">
                                This issue may significantly reduce your chances with ATS systems.
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resume Score</CardTitle>
                <CardDescription>Your resume's compatibility with ATS systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`flex flex-col items-center p-4 rounded-lg border ${getScoreBgColor(score)} ${getScoreBorderColor(score)} mb-6`}>
                  <div className="text-5xl font-bold mb-1 flex items-center gap-2">
                    <span className={getScoreColor(score)}>{score}</span>
                    <span className="text-lg font-normal text-gray-500">/100</span>
                  </div>
                  <p className={`font-medium ${getScoreColor(score)}`}>
                    {score >= 80 
                      ? 'Excellent' 
                      : score >= 60 
                      ? 'Good, but needs improvement' 
                      : 'Needs significant improvement'}
                  </p>
                </div>
                
                <h3 className="font-semibold mb-3">Quick Summary</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Your resume uses appropriate keywords</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Well-structured education section</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Work experience needs quantifiable achievements</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Contact information is incomplete</span>
                  </li>
                </ul>
                
                <div className="space-y-3">
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Analysis Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    <File className="mr-2 h-4 w-4" />
                    View Original Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;
