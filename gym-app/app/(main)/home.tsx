import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/components/ui/ThemeProvider';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const theme = useTheme();
  const { authData, isAuthenticated, isLoading, checkAuth } = useAuth();
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
          styles.title,
          {
            color: theme.colors.text.primary,
            fontFamily: theme.typography.fontFamily.heading,
            fontSize: theme.typography.fontSize['3xl']
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
    <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
      <Text style={[
        styles.title,
        {
          color: theme.colors.text.primary,
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize['3xl']
        }
      ]}>
        Welcome, {authData?.email}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
}); 