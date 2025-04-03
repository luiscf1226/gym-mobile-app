import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService, AuthData } from '@/app/services/auth';

interface AuthContextType {
  authData: AuthData | null;
  isLoading: boolean;
  setAuthData: (data: AuthData) => Promise<void>;
  clearAuthData: () => Promise<void>;
  isAuthenticated: boolean;
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
      const data = await authService.getAuthData();
      setAuthDataState(data);
    } catch (error) {
      console.error('Error loading auth data:', error);
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

  return (
    <AuthContext.Provider
      value={{
        authData,
        isLoading,
        setAuthData,
        clearAuthData,
        isAuthenticated: !!authData,
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