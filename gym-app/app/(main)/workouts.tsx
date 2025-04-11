import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/components/ui/ThemeProvider';

export default function WorkoutsScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
      <Text style={[
        styles.title,
        {
          color: theme.colors.text.primary,
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize['2xl']
        }
      ]}>
        Workouts
      </Text>
      <Text style={[
        styles.subtitle,
        {
          color: theme.colors.text.secondary,
          fontFamily: theme.typography.fontFamily.body,
          fontSize: theme.typography.fontSize.md
        }
      ]}>
        Your workout routines will appear here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
}); 