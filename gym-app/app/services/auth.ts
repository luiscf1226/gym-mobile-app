import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiService } from './api';

export interface AuthData {
  access_token: string;
  refresh_token: string;
  email: string;
  user_id: string;
  token_expiry?: number; // Unix timestamp in milliseconds
}

export class AuthService {
  private static instance: AuthService;
  private static readonly AUTH_KEY = '@auth_data';
  private static readonly TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes in milliseconds

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async setAuthData(data: AuthData): Promise<void> {
    try {
      // Add token expiry if not provided (default to 1 hour from now)
      const authDataWithExpiry = {
        ...data,
        token_expiry: data.token_expiry || Date.now() + 60 * 60 * 1000,
      };
      
      await AsyncStorage.setItem(AuthService.AUTH_KEY, JSON.stringify(authDataWithExpiry));
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw new Error('Failed to store authentication data');
    }
  }

  public async getAuthData(): Promise<AuthData | null> {
    try {
      const data = await AsyncStorage.getItem(AuthService.AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving auth data:', error);
      return null;
    }
  }

  public async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AuthService.AUTH_KEY);
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw new Error('Failed to clear authentication data');
    }
  }

  public async isAuthenticated(): Promise<boolean> {
    const data = await this.getAuthData();
    return !!data?.access_token;
  }

  public async checkAndRefreshToken(): Promise<boolean> {
    try {
      const authData = await this.getAuthData();
      
      if (!authData) {
        console.log('No auth data found, user is not authenticated');
        return false;
      }
      
      // Check if token is expired or about to expire
      const isExpired = !authData.token_expiry || 
                        authData.token_expiry <= Date.now() + AuthService.TOKEN_EXPIRY_BUFFER;
      
      if (!isExpired) {
        console.log('Token is still valid, no refresh needed');
        return true; // Token is still valid
      }
      
      console.log('Token is expired or about to expire, attempting to refresh');
      
      // Token is expired or about to expire, try to refresh it
      const apiService = ApiService.getInstance();
      
      try {
        // Call refresh token API
        const response = await apiService.refreshToken(authData.refresh_token);
        
        console.log('Token refresh successful, updating auth data');
        
        // Update auth data with new tokens
        await this.setAuthData({
          ...authData,
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          token_expiry: Date.now() + 60 * 60 * 1000, // Set new expiry (1 hour from now)
        });
        
        return true;
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        
        // If refresh fails, clear auth data
        await this.clearAuthData();
        return false;
      }
    } catch (error) {
      console.error('Error checking token:', error);
      return false;
    }
  }
} 