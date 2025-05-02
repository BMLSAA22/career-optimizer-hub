
import React from 'react';
import { CheckCircle, XCircle, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface ComparisonFeature {
  name: string;
  resumeOptimizer: boolean | string;
  jobscan: boolean | string;
  resumeWorded: boolean | string;
}

const features: ComparisonFeature[] = [
  {
    name: 'Real-time resume scanning',
    resumeOptimizer: true,
    jobscan: false,
    resumeWorded: false
  },
  {
    name: 'ATS score analysis',
    resumeOptimizer: true,
    jobscan: true,
    resumeWorded: true
  },
  {
    name: 'Keywords optimization',
    resumeOptimizer: true,
    jobscan: true,
    resumeWorded: true
  },
  {
    name: 'Free resume templates',
    resumeOptimizer: true,
    jobscan: false,
    resumeWorded: 'Limited'
  },
  {
    name: 'Cover letter templates',
    resumeOptimizer: true,
    jobscan: false,
    resumeWorded: 'Paid only'
  },
  {
    name: 'AI chatbot assistance',
    resumeOptimizer: true,
    jobscan: false,
    resumeWorded: false
  },
  {
    name: 'Detailed feedback',
    resumeOptimizer: true,
    jobscan: 'Basic',
    resumeWorded: 'Basic'
  },
  {
    name: 'Free plan available',
    resumeOptimizer: true,
    jobscan: 'Limited',
    resumeWorded: 'Limited'
  },
  {
    name: 'Mobile friendly',
    resumeOptimizer: true,
    jobscan: 'Partial',
    resumeWorded: true
  }
];

const pricing = [
  {
    service: 'ResumeOptimizer',
    price: 'Free & Premium ($9.99/mo)',
    highlight: true
  },
  {
    service: 'Jobscan',
    price: '$49.95/mo',
    highlight: false
  },
  {
    service: 'ResumeWorded',
    price: '$59.99/mo',
    highlight: false
  }
];

const Comparison: React.FC = () => {
  const navigate = useNavigate();
  
  const renderStatus = (status: boolean | string) => {
    if (typeof status === 'boolean') {
      return status ? (
        <CheckCircle className="h-5 w-5 text-green-600" />
      ) : (
        <XCircle className="h-5 w-5 text-red-600" />
      );
    }
    
    return (
      <div className="flex items-center">
        <Minus className="h-5 w-5 text-amber-500 mr-2" />
        <span className="text-sm">{status}</span>
      </div>
    );
  };

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">How We Compare</h1>
      <p className="text-gray-600 mb-8">See how ResumeOptimizer stacks up against other resume tools in the market</p>
      
      <div className="overflow-x-auto mb-8">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left font-medium text-gray-600 border">Features</th>
              <th className="p-4 text-center font-medium text-brand-blue border w-1/4">
                ResumeOptimizer
              </th>
              <th className="p-4 text-center font-medium text-gray-600 border w-1/4">
                Jobscan
              </th>
              <th className="p-4 text-center font-medium text-gray-600 border w-1/4">
                ResumeWorded
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-4 border">{feature.name}</td>
                <td className="p-4 border text-center">
                  {renderStatus(feature.resumeOptimizer)}
                </td>
                <td className="p-4 border text-center">
                  {renderStatus(feature.jobscan)}
                </td>
                <td className="p-4 border text-center">
                  {renderStatus(feature.resumeWorded)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {pricing.map((item, index) => (
          <Card key={index} className={item.highlight ? 'border-brand-blue shadow-lg' : ''}>
            <CardHeader>
              <CardTitle className={item.highlight ? 'text-brand-blue' : ''}>
                {item.service}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">{item.price}</p>
              {item.highlight && (
                <Button onClick={() => navigate('/register')} className="w-full">
                  Get Started
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-brand-lightGray rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Why Choose ResumeOptimizer?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Real-Time Analysis</h3>
              <p className="text-gray-600">Get instant feedback as you make changes to your resume.</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">AI-Powered Assistance</h3>
              <p className="text-gray-600">Our chatbot helps you navigate the platform and understand your results.</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Free Templates</h3>
              <p className="text-gray-600">Access to professional resume and cover letter templates.</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Affordable Pricing</h3>
              <p className="text-gray-600">Get more features at a lower price point than competitors.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="italic mb-3">
              "ResumeOptimizer helped me understand why I wasn't getting interviews. After implementing their suggestions, I received calls from 3 companies in one week!"
            </p>
            <p className="font-semibold">- Sarah T., Marketing Manager</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="italic mb-3">
              "The real-time feedback is a game-changer. I can see exactly how my changes affect my ATS score immediately."
            </p>
            <p className="font-semibold">- Michael R., Software Engineer</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center bg-brand-blue text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to optimize your resume?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Join thousands of job seekers who have improved their chances of landing interviews with ResumeOptimizer
        </p>
        <Button 
          onClick={() => navigate('/register')} 
          size="lg"
          className="bg-white text-brand-blue hover:bg-white/90"
        >
          Get Started for Free
        </Button>
      </div>
    </div>
  );
};

export default Comparison;
