import { UserProfile } from '@/app/types/profile';
import { AuthService } from './auth';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getProfileData = async (): Promise<UserProfile> => {
  const authService = AuthService.getInstance();
  const authData = await authService.getAuthData();

  if (!authData?.access_token) {
    throw new Error('Authentication token not found');
  }

  const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${authData.access_token}`,
    },
  });

  if (!response.ok) {
    // Handle different HTTP error statuses if needed
    if (response.status === 401) {
      // Potentially trigger token refresh or logout
      await authService.clearAuthData(); // Example: clear data on unauthorized
      throw new Error('Unauthorized: Invalid or expired token');
    }
    throw new Error(`Failed to fetch profile data: ${response.statusText} (Status: ${response.status})`);
  }

  const data: UserProfile = await response.json();
  // Add email from authData if not present in profile endpoint response
  return { ...data, email: authData.email }; 
}; 