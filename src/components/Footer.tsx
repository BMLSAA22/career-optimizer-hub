
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">ResumeOptimizer</h3>
            <p className="text-sm text-gray-600 mb-4">
              Optimize your resume for Applicant Tracking Systems and land more interviews.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-brand-blue">Home</Link></li>
              <li><Link to="/templates" className="text-sm text-gray-600 hover:text-brand-blue">Templates</Link></li>
              <li><Link to="/comparison" className="text-sm text-gray-600 hover:text-brand-blue">Comparison</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-sm text-gray-600 mb-2">support@resumeoptimizer.com</p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} ResumeOptimizer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
