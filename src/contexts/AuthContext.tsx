
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, you would validate credentials with a backend API
      // For now, we'll simulate a successful login
      if (email && password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: `user_${Math.random().toString(36).substr(2, 9)}`,
          email,
          name: email.split('@')[0]
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        toast.success('Login successful!');
        return true;
      }
      toast.error('Invalid credentials');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // In a real app, you would register with a backend API
      // For now, we'll simulate a successful registration
      if (email && password && name) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: `user_${Math.random().toString(36).substr(2, 9)}`,
          email,
          name
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        toast.success('Registration successful!');
        return true;
      }
      toast.error('Please fill all required fields');
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
