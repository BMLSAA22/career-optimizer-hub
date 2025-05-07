
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Alert,
  AlertTitle,
  AlertDescription
} from '@/components/ui/alert';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { 
  Check, 
  X, 
  AlertTriangle, 
  FileText, 
  FileCheck, 
  Download, 
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for the analysis
const mockAnalysis = {
  score: 73,
  jobTitle: "Frontend Developer",
  company: "TechCorp Inc.",
  uploadDate: "2023-10-15",
  strengths: [
    { id: 1, text: "Strong technical skills in React and JavaScript" },
    { id: 2, text: "Clear demonstration of project experience" },
    { id: 3, text: "Good formatting and structure" },
  ],
  weaknesses: [
    { id: 1, text: "Missing quantifiable achievements" },
    { id: 2, text: "Resume exceeds one page" },
    { id: 3, text: "Generic objective statement" },
  ],
  keywordMatches: [
    { keyword: "React", count: 4, isImportant: true },
    { keyword: "JavaScript", count: 6, isImportant: true },
    { keyword: "CSS", count: 3, isImportant: true },
    { keyword: "HTML", count: 2, isImportant: true },
    { keyword: "TypeScript", count: 1, isImportant: true },
    { keyword: "Node.js", count: 0, isImportant: true },
    { keyword: "Redux", count: 2, isImportant: false },
    { keyword: "API", count: 3, isImportant: false },
  ],
  sectionScores: [
    { name: "Contact Info", score: 90 },
    { name: "Summary", score: 65 },
    { name: "Work Experience", score: 80 },
    { name: "Education", score: 85 },
    { name: "Skills", score: 70 },
    { name: "Projects", score: 75 },
  ],
  improvementSuggestions: [
    { id: 1, text: "Add quantifiable achievements to demonstrate impact", section: "Work Experience" },
    { id: 2, text: "Condense resume to a single page by removing less relevant details", section: "Overall" },
    { id: 3, text: "Replace generic objective with a targeted professional summary", section: "Summary" },
    { id: 4, text: "Add more keywords related to Node.js", section: "Skills" },
  ],
};

const ResumeAnalysis = () => {
  const [analysis] = useState(mockAnalysis);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const navigate = useNavigate();
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getScoreBackgroundColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-amber-100';
    return 'bg-red-100';
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-start mb-6 flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Resume Analysis</h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Matched against: <span className="font-medium">{analysis.jobTitle}</span> at <span className="font-medium">{analysis.company}</span>
            </p>
            <span className="text-gray-400">|</span>
            <p className="text-gray-600">Uploaded on {analysis.uploadDate}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <FileText className="mr-2 h-4 w-4" /> 
            My Resumes
          </Button>
          <Button>
            <FileCheck className="mr-2 h-4 w-4" /> 
            Optimize Resume
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className={`col-span-1 border-t-4 ${getScoreBackgroundColor(analysis.score)} border-t-brand-blue`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">ATS Compatibility Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className={`text-5xl font-bold ${getScoreColor(analysis.score)}`}>
                {analysis.score}%
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">
                  {analysis.score >= 80 ? 'Excellent' : analysis.score >= 60 ? 'Good' : 'Needs Improvement'}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${analysis.score >= 80 ? 'bg-green-500' : analysis.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${analysis.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Keyword Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-3">
              {analysis.keywordMatches.filter(k => k.count > 0).length} of {analysis.keywordMatches.length} important keywords found
            </p>
            <div className="space-y-2">
              {analysis.keywordMatches
                .filter(keyword => keyword.isImportant)
                .slice(0, 4)
                .map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{keyword.keyword}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${keyword.count > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {keyword.count > 0 ? `Found ${keyword.count}×` : 'Missing'}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" /> 
              Download Analysis Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Share2 className="mr-2 h-4 w-4" /> 
              Share This Analysis
            </Button>
            <Button className="w-full justify-start">
              <FileCheck className="mr-2 h-4 w-4" /> 
              Generate Improved Version
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Section Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analysis.sectionScores}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="score" 
                      name="Score" 
                      fill="#4F46E5"
                      // This is the fix for the error - providing a string value for the nameKey
                      nameKey="name"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              Your resume may be filtered out by Applicant Tracking Systems due to missing keywords.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Takeaways</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Strengths
                </h3>
                <ul className="space-y-1 text-sm">
                  {analysis.strengths.map(strength => (
                    <li key={strength.id} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {strength.text}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <X className="h-4 w-4 text-red-500 mr-2" />
                  Weaknesses
                </h3>
                <ul className="space-y-1 text-sm">
                  {analysis.weaknesses.map(weakness => (
                    <li key={weakness.id} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {weakness.text}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Improvement Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.improvementSuggestions.map(suggestion => (
              <div key={suggestion.id} className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="bg-amber-100 p-1 rounded-md mr-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{suggestion.text}</h4>
                    <p className="text-sm text-gray-500">Section: {suggestion.section}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeAnalysis;
