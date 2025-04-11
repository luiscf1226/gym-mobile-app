import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/components/ui/ThemeProvider';
import { Stack } from 'expo-router';

export default function EditProfileScreen() {
  const theme = useTheme();
  // Define styles directly inside for simplicity here
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.base,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background.main,
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontFamily: theme.typography.fontFamily.heading,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      fontFamily: theme.typography.fontFamily.body,
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Edit Profile', headerBackTitle: 'Back' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        <Text style={styles.subtitle}>Feature coming soon!</Text>
      </View>
    </>
  );
} 