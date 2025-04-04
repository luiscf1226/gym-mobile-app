declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      // Add other environment variables here
    }
  }
}

// Export empty to make it a module
export {}; 