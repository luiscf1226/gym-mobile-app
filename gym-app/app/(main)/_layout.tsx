import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@/components/ui/ThemeProvider';
import { useAuth } from '@/app/contexts/AuthContext';
import { View, Text, StyleSheet } from 'react-native';

export default function MainLayout() {
  const theme = useTheme();
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const router = useRouter();

  // Check authentication status and token validity
  useEffect(() => {
    const verifyAuth = async () => {
      if (!isLoading) {
        // If not authenticated, redirect to auth screen
        if (!isAuthenticated) {
          router.replace('/(auth)');
          return;
        }
        
        // If authenticated, check if token is valid
        const isValid = await checkAuth();
        if (!isValid) {
          router.replace('/(auth)');
        }
      }
    };
    
    verifyAuth();
  }, [isLoading, isAuthenticated, checkAuth, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
        <Text style={[
          styles.loadingText,
          {
            color: theme.colors.text.primary,
            fontFamily: theme.typography.fontFamily.heading,
            fontSize: theme.typography.fontSize['2xl']
          }
        ]}>
          Loading...
        </Text>
      </View>
    );
  }

  // If not authenticated, don't render anything (will be redirected)
  if (!isAuthenticated) {
    return null;
  }

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
        name="home" 
        options={{ 
          headerShown: false,
          animation: 'none',
        }} 
      />
      {/* Add other main screens here */}
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
  },
}); 