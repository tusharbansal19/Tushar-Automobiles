'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Only access localStorage on client side
        if (typeof window !== 'undefined') {
          const savedToken = localStorage.getItem('auth_token');
          const savedUser = localStorage.getItem('auth_user');

          if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
      console.log('Email:', email);
      console.log('Password:', password);
    try {
      setIsLoading(true);
      console.log('Attempting login to:', `${API_BASE_URL}/auth/login`);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        // mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && response.ok) {
        setUser(data.data.user);
        setToken(data.data.token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', data.data.token);
          localStorage.setItem('auth_user', JSON.stringify(data.data.user));
        }
        toast.success(data.message || 'Login successful!');
        return { success: true, message: data.message };
      } else {
        const errorMessage = data.message || 'Login failed';
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'Network error. Please check your connection and try again.';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, phone?: string): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      console.log('Attempting signup to:', `${API_BASE_URL}/auth/signup`);
      
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      if (data.success && response.ok) {
        setUser(data.data.user);
        setToken(data.data.token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', data.data.token);
          localStorage.setItem('auth_user', JSON.stringify(data.data.user));
        }
        toast.success(data.message || 'Account created successfully!');
        return { success: true, message: data.message };
      } else {
        const errorMessage = data.message || 'Signup failed';
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = 'Network error. Please check your connection and try again.';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
    toast.success('Logged out successfully');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      }
    }
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}