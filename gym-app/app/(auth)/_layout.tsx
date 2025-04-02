import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '@/components/ui/ThemeProvider';

export const unstable_settings = {
  initialRouteName: "index",
};

export default function AuthLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background.main,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          animation: 'none',
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{ 
          headerShown: false,
        }} 
      />
    </Stack>
  );
} 