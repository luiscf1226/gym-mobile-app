import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useTheme } from '@/components/ui/ThemeProvider';

// Define the routes as strings to avoid type issues
const links: { label: string; icon: keyof typeof Ionicons.glyphMap; route: string }[] = [
  { label: 'Home', icon: 'home', route: '/(main)/home' },
  { label: 'Workouts', icon: 'barbell', route: '/(main)/workouts' },
  { label: 'Friends', icon: 'people', route: '/(main)/friends' },
  { label: 'AI Help', icon: 'help-circle', route: '/(main)/ai-help' },
  { label: 'Profile', icon: 'person', route: '/(main)/profile' },
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
      {links.map((link) => {
        const isActive = pathname === link.route;
        return (
          <TouchableOpacity
            key={link.label}
            style={styles.link}
            onPress={() => router.push(link.route as any)}
          >
            <Ionicons 
              name={link.icon} 
              size={24} 
              color={isActive ? theme.colors.primary.main : theme.colors.text.primary} 
            />
            <Text 
              style={[
                styles.label, 
                { 
                  color: isActive ? theme.colors.primary.main : theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.body
                }
              ]}
            >
              {link.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  link: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
