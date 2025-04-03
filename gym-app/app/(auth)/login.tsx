import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/components/ui/ThemeProvider';

export default function LoginScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
      <Text style={{ 
        color: theme.colors.text.primary,
        fontFamily: theme.typography.fontFamily.heading,
        fontSize: theme.typography.fontSize['2xl']
      }}>
        Login Screen
      </Text>
      <Text style={{ 
        color: theme.colors.text.secondary,
        fontFamily: theme.typography.fontFamily.body,
        fontSize: theme.typography.fontSize.md,
        marginTop: theme.spacing.md
      }}>
        This is a placeholder for the login screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
}); 