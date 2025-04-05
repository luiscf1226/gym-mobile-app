import axios from 'axios';
import { ENV } from '@/app/config/env';

// API response types
export interface SignupResponse {
  user_id: string;
  email: string;
  access_token: string;
  refresh_token: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

// Login types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user_id: string;
  email: string;
  subscription_tier: string;
  ai_features_included: boolean;
  max_workouts_per_month: number | null;
  access_token: string;
  refresh_token: string;
}

// Refresh token types
export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        data: error.config?.data,
      },
    });
    return Promise.reject(error);
  }
);

// API service class
export class ApiService {
  private static instance: ApiService;
  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Signup method
  public async signup(data: SignupRequest): Promise<SignupResponse> {
    try {
      console.log('Attempting signup with:', { 
        email: data.email,
        baseURL: ENV.API_URL 
      });

      const response = await api.post<SignupResponse>('/api/auth/signup', data);
      
      console.log('Signup successful:', { 
        userId: response.data.user_id,
        email: response.data.email 
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || 'Failed to sign up',
          status: error.response?.status,
          data: error.response?.data,
        };
        
        console.error('Signup failed:', {
          status: apiError.status,
          message: apiError.message,
          data: apiError.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            baseURL: error.config?.baseURL,
            data: error.config?.data,
            headers: error.config?.headers,
          }
        });

        // Handle specific error cases
        if (!error.response) {
          throw new Error('Network error. Please check your connection and API URL');
        } else if (error.response.status === 400) {
          throw new Error('Invalid email or password format');
        } else if (error.response.status === 409) {
          throw new Error('Email already exists');
        } else if (error.response.status === 500) {
          throw new Error('Server error. Please try again later');
        } else {
          throw new Error(apiError.message || 'Failed to sign up');
        }
      }
      console.error('Unexpected error during signup:', error);
      throw new Error('An unexpected error occurred during signup');
    }
  }

  // Login method
  public async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('Attempting login with:', { 
        email: data.email,
        baseURL: ENV.API_URL 
      });

      const response = await api.post<LoginResponse>('/api/auth/login', data);
      
      console.log('Login successful:', { 
        userId: response.data.user_id,
        email: response.data.email,
        subscription: response.data.subscription_tier
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || 'Failed to log in',
          status: error.response?.status,
          data: error.response?.data,
        };
        
        console.error('Login failed:', {
          status: apiError.status,
          message: apiError.message,
          data: apiError.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            baseURL: error.config?.baseURL,
            data: error.config?.data,
            headers: error.config?.headers,
          }
        });

        // Handle specific error cases
        if (!error.response) {
          throw new Error('Network error. Please check your connection and try again');
        } else if (error.response.status === 400) {
          throw new Error('Invalid email or password format');
        } else if (error.response.status === 401) {
          throw new Error('Invalid email or password');
        } else if (error.response.status === 404) {
          throw new Error('Account not found');
        } else if (error.response.status === 500) {
          throw new Error('Server error. Please try again later');
        } else {
          throw new Error(apiError.message || 'Failed to log in');
        }
      }
      console.error('Unexpected error during login:', error);
      throw new Error('An unexpected error occurred during login');
    }
  }

  // Refresh token method
  public async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      console.log('Attempting to refresh token');
      
      const response = await api.post<RefreshTokenResponse>('/api/auth/refresh', {
        refresh_token: refreshToken
      });
      
      console.log('Token refresh successful');
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || 'Failed to refresh token',
          status: error.response?.status,
          data: error.response?.data,
        };
        
        console.error('Token refresh failed:', {
          status: apiError.status,
          message: apiError.message,
          data: apiError.data,
        });

        // Handle specific error cases
        if (!error.response) {
          throw new Error('Network error. Please check your connection and try again');
        } else if (error.response.status === 400) {
          throw new Error('Invalid refresh token format');
        } else if (error.response.status === 401) {
          throw new Error('Refresh token expired or invalid');
        } else if (error.response.status === 403) {
          throw new Error('Access denied. Please log in again');
        } else if (error.response.status === 404) {
          throw new Error('Refresh token not found');
        } else if (error.response.status === 500) {
          throw new Error('Server error. Please try again later');
        } else {
          throw new Error(apiError.message || 'Failed to refresh token');
        }
      }
      console.error('Unexpected error during token refresh:', error);
      throw new Error('An unexpected error occurred during token refresh');
    }
  }
} 