
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  ArrowRight, 
  BarChart,
  Bot,
  FileSearch,
  CheckSquare,
  ChartBar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-lightBlue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Land More Interviews with ATS-Optimized Resumes
              </h1>
              <p className="text-lg mb-8 text-blue-100">
                Our AI-powered resume scanner analyzes your resume instantly and provides actionable feedback to help you get past Applicant Tracking Systems.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  className="bg-white text-brand-blue hover:bg-blue-50" 
                  onClick={handleGetStarted}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/templates')}
                >
                  View Templates
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  <div className="h-8 bg-brand-blue rounded-md w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-4/5 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
                </div>
                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-md">
                  <div>
                    <div className="text-brand-blue font-bold">ATS Score</div>
                    <div className="text-3xl font-bold text-brand-blue">78<span className="text-lg">/100</span></div>
                  </div>
                  <ChartBar className="h-12 w-12 text-brand-blue" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileSearch className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Resume Scanning</h3>
              <p className="text-gray-600">
                Upload your resume and get instant analysis with detailed feedback on how to improve your chances.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Visualization</h3>
              <p className="text-gray-600">
                See visual representations of your ATS score, keyword matches, and areas where your resume can improve.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
              <p className="text-gray-600">
                Get help navigating the platform and understanding your results with our friendly AI chatbot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
              <p className="text-gray-600">
                Upload your resume in PDF or DOCX format through our secure platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Analysis</h3>
              <p className="text-gray-600">
                Our AI scans your resume against ATS systems and industry standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Improvements</h3>
              <p className="text-gray-600">
                Follow our actionable suggestions to improve your resume and apply with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-lightBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Resume?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their chances of landing interviews with our resume optimization tool.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-brand-blue hover:bg-blue-50"
            onClick={handleGetStarted}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
