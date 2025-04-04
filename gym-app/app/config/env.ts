import { Platform } from 'react-native';

// Get API_URL from Expo's built-in environment variables
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Validate required environment variables
if (!API_URL) {
  throw new Error('EXPO_PUBLIC_API_URL is required in environment variables');
}

export const ENV = {
  API_URL,
  IS_DEVELOPMENT: __DEV__,
  PLATFORM: Platform.OS,
  // Add other environment variables here
}; 