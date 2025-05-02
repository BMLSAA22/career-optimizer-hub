
import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, User, LogOut } from 'lucide-react';
import Footer from './Footer';
import ChatBot from './ChatBot';

const Layout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-7 w-7 text-brand-blue" />
            <span className="text-xl font-bold text-brand-blue">ResumeOptimizer</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium ${isActive('/') 
                ? 'text-brand-blue font-semibold' 
                : 'text-gray-600 hover:text-brand-blue'}`}
            >
              Home
            </Link>
            <Link 
              to="/templates" 
              className={`text-sm font-medium ${isActive('/templates') 
                ? 'text-brand-blue font-semibold' 
                : 'text-gray-600 hover:text-brand-blue'}`}
            >
              Templates
            </Link>
            <Link 
              to="/comparison" 
              className={`text-sm font-medium ${isActive('/comparison') 
                ? 'text-brand-blue font-semibold' 
                : 'text-gray-600 hover:text-brand-blue'}`}
            >
              Comparison
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium text-sm">
                    {user?.name || user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
      
      <ChatBot />
      <Footer />
    </div>
  );
};

export default Layout;
