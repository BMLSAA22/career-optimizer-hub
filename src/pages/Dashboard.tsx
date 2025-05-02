
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Upload, 
  FileText, 
  File, 
  ChartBar, 
  Clock,
  Trash2,
  CheckCircle
} from 'lucide-react';

interface Resume {
  id: string;
  name: string;
  date: Date;
  score: number;
  status: 'analyzed' | 'processing' | 'failed';
}

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Simulate initial data load
  useEffect(() => {
    // For demo purposes, we'll create some mock resumes
    const mockResumes: Resume[] = [
      {
        id: '1',
        name: 'Software_Engineer_Resume.pdf',
        date: new Date(2023, 3, 15),
        score: 85,
        status: 'analyzed'
      },
      {
        id: '2',
        name: 'Product_Manager_Resume.docx',
        date: new Date(2023, 4, 2),
        score: 72,
        status: 'analyzed'
      }
    ];
    
    setResumes(mockResumes);
  }, []);

  const handleUpload = () => {
    // In a real application, this would open a file picker
    // For now, we'll simulate the upload process
    setIsUploading(true);
    
    setTimeout(() => {
      const newResume: Resume = {
        id: `resume_${Date.now()}`,
        name: 'New_Resume.pdf',
        date: new Date(),
        score: 0,
        status: 'processing'
      };
      
      setResumes([...resumes, newResume]);
      setIsUploading(false);
      
      // Simulate processing time
      setTimeout(() => {
        setResumes(prev => 
          prev.map(resume => 
            resume.id === newResume.id 
              ? { ...resume, status: 'analyzed', score: Math.floor(Math.random() * 30) + 60 }
              : resume
          )
        );
        toast.success('Your resume has been analyzed!');
      }, 3000);
    }, 1500);
  };

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter(resume => resume.id !== id));
    toast.success('Resume deleted successfully');
  };

  const handleViewAnalysis = (id: string) => {
    navigate('/analysis');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  if (!isAuthenticated) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome back, {user?.name || 'User'}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Total Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-brand-blue mr-3" />
              <span className="text-3xl font-bold">{resumes.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ChartBar className="h-8 w-8 text-brand-blue mr-3" />
              <span className="text-3xl font-bold">
                {resumes.length 
                  ? Math.round(resumes.reduce((acc, resume) => acc + resume.score, 0) / resumes.length) 
                  : 0}%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Last Scan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-brand-blue mr-3" />
              <span className="text-lg font-medium">
                {resumes.length 
                  ? new Date(Math.max(...resumes.map(r => r.date.getTime()))).toLocaleDateString() 
                  : 'No scans yet'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white border rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h2 className="text-xl font-bold mb-4 md:mb-0">Upload New Resume</h2>
          <Button onClick={handleUpload} disabled={isUploading} className="w-full md:w-auto">
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Resume
              </>
            )}
          </Button>
        </div>
        
        <div className="bg-brand-lightGray rounded-lg p-4 text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <FileText className="h-12 w-12 text-brand-gray mx-auto mb-2" />
            <p className="text-gray-500 mb-1">
              Drag and drop your resume file here or click the upload button
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: PDF, DOCX (Max 5MB)
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-6">Your Resumes</h2>
        
        {resumes.length === 0 ? (
          <div className="text-center p-8 bg-white border rounded-lg">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-1">No resumes yet</h3>
            <p className="text-gray-500 mb-4">
              Upload a resume to get started with your optimization journey
            </p>
            <Button onClick={handleUpload} disabled={isUploading}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {resumes.map(resume => (
              <div key={resume.id} className="bg-white border rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="bg-brand-lightGray p-3 rounded-md mr-4">
                    <File className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">{resume.name}</h3>
                    <p className="text-sm text-gray-500">
                      Uploaded on {resume.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  {resume.status === 'processing' ? (
                    <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <div className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
                        <span>ATS Score:</span>
                        <span className={`font-bold ${getScoreColor(resume.score)}`}>
                          {resume.score}%
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="hidden md:flex"
                        onClick={() => handleViewAnalysis(resume.id)}
                      >
                        View Analysis
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => handleDeleteResume(resume.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
