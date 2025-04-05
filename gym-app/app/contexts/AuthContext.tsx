import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService, AuthData } from '@/app/services/auth';

interface AuthContextType {
  authData: AuthData | null;
  isLoading: boolean;
  setAuthData: (data: AuthData) => Promise<void>;
  clearAuthData: () => Promise<void>;
  isAuthenticated: boolean;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authData, setAuthDataState] = useState<AuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authService = AuthService.getInstance();

  useEffect(() => {
    loadAuthData();
  }, []);

  const loadAuthData = async () => {
    try {
      console.log('Loading authentication data');
      const data = await authService.getAuthData();
      
      if (data) {
        console.log('Auth data found, setting state');
        setAuthDataState(data);
        
        // If we have auth data, check if the token needs to be refreshed
        console.log('Checking if token needs to be refreshed');
        await checkAuth();
      } else {
        console.log('No auth data found');
        setAuthDataState(null);
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
      setAuthDataState(null);
    } finally {
      setIsLoading(false);
    }
  };

  const setAuthData = async (data: AuthData) => {
    try {
      await authService.setAuthData(data);
      setAuthDataState(data);
    } catch (error) {
      console.error('Error setting auth data:', error);
      throw error;
    }
  };

  const clearAuthData = async () => {
    try {
      await authService.clearAuthData();
      setAuthDataState(null);
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw error;
    }
  };

  const checkAuth = async (): Promise<boolean> => {
    try {
      console.log('Checking authentication status');
      
      const isValid = await authService.checkAndRefreshToken();
      
      // If token is invalid, clear auth data
      if (!isValid && authData) {
        console.log('Token is invalid, clearing auth data');
        await clearAuthData();
      } else if (isValid) {
        console.log('Token is valid, authentication successful');
      }
      
      return isValid;
    } catch (error) {
      console.error('Error checking auth:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        isLoading,
        setAuthData,
        clearAuthData,
        isAuthenticated: !!authData,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 