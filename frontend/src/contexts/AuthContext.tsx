'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthResponse, authApi, userApi } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { email: string; password: string; firstName: string; lastName: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Checking authentication...');
        const token = getCookie('token') as string;
        console.log('Token found:', !!token);
        
        if (token) {
          // Try to get user profile to verify token is valid
          try {
            console.log('🔍 Making API call to verify token...');
            const response = await userApi.getProfile();
            console.log('API response:', response);
            if (response.success && response.data) {
              console.log('✅ Token is valid, setting user:', response.data);
              setUser(response.data);
            } else {
              console.log('❌ Token is invalid, clearing storage');
              // Token is invalid, clear storage
              deleteCookie('token');
              deleteCookie('refreshToken');
            }
          } catch (error) {
            console.error('❌ Token validation failed:', error);
            deleteCookie('token');
            deleteCookie('refreshToken');
          }
        } else {
          console.log('❌ No token found');
        }
      } catch (error) {
        console.error('❌ Auth check failed:', error);
        deleteCookie('token');
        deleteCookie('refreshToken');
      } finally {
        console.log('✅ Auth check completed, setting loading to false');
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Starting login process...');
      setLoading(true);
      const response = await authApi.login({ email, password });
      console.log('Login response:', response);
      
      if (response.success && response.data) {
        console.log('✅ Login successful, setting user and cookies');
        setUser(response.data.user);
        setCookie('token', response.data.token, { 
          maxAge: 60 * 60 * 24 * 7, // 7 days
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
        setCookie('refreshToken', response.data.refreshToken, { 
          maxAge: 60 * 60 * 24 * 30, // 30 days
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
        console.log('✅ Cookies set successfully');
        return true;
      } else {
        console.log('❌ Login failed:', response.message);
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { email: string; password: string; firstName: string; lastName: string }): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authApi.register(userData);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setCookie('token', response.data.token, { 
          maxAge: 60 * 60 * 24 * 7, // 7 days
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
        setCookie('refreshToken', response.data.refreshToken, { 
          maxAge: 60 * 60 * 24 * 30, // 30 days
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
        return true;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      deleteCookie('token');
      deleteCookie('refreshToken');
      router.push('/');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
