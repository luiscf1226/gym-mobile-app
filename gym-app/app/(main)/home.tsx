import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/components/ui/ThemeProvider';
import { useAuth } from '@/app/contexts/AuthContext';

export default function HomeScreen() {
  const theme = useTheme();
  const { authData } = useAuth();

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