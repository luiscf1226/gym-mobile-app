import { Platform } from 'react-native';
import { API_URL } from '@env';

// Validate required environment variables
if (!API_URL) {
  throw new Error('API_URL is required in environment variables');
}

export const ENV = {
  API_URL,
  IS_DEVELOPMENT: __DEV__,
  PLATFORM: Platform.OS,
  // Add other environment variables here
}; 