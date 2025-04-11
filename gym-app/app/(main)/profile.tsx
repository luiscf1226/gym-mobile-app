import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import { useTheme } from '@/components/ui/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { getProfileData } from '@/app/services/profile';
import { UserProfile } from '@/app/types/profile';
import { calculateAge, calculateBMI, formatFrequency, formatGoal, formatLevel } from '@/app/utils/profileUtils';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'expo-router';

// Define a type for the theme object for clarity
type AppTheme = ReturnType<typeof useTheme>;

// Define styles using StyleSheet.create inside a function, memoized in component
const createStyles = (theme: AppTheme) => StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  scrollViewContent: {
    paddingBottom: theme.spacing['3xl'],
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.main,
  },
  errorText: {
    color: theme.colors.semantic.error,
    marginBottom: theme.spacing.base,
    fontFamily: theme.typography.fontFamily.body,
    textAlign: 'center',
    fontSize: theme.typography.fontSize.base,
  },
  noDataText: {
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.base,
  },
  retryButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing['2xl'],
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary.main,
  },
  retryButtonText: {
    color: theme.colors.text.primary,
    fontWeight: 'bold', // Use standard literal
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.subheading,
  },
  headerGradient: {
    paddingTop: theme.spacing['5xl'],
    paddingBottom: theme.spacing['4xl'],
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  avatarText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: 'bold', // Use standard literal
    fontFamily: theme.typography.fontFamily.heading,
  },
  name: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold', // Use standard literal
    marginBottom: theme.spacing.xs,
    fontFamily: theme.typography.fontFamily.heading,
  },
  email: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.body,
  },
  content: {
    borderTopLeftRadius: theme.borderRadius['3xl'],
    borderTopRightRadius: theme.borderRadius['3xl'],
    marginTop: -theme.spacing.xl,
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.xl,
    backgroundColor: theme.colors.background.main,
  },
  section: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    ...theme.shadows.md,
    backgroundColor: theme.colors.background.card,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold', // Use standard literal
    marginBottom: theme.spacing.base,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.subheading,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.sm,
  },
  statItem: {
    width: '50%',
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.base,
  },
   statItemFull: {
    width: '100%',
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.base,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    marginBottom: theme.spacing.xs,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.body,
  },
  statValue: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600', // Use standard literal (semibold equivalent)
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.alt,
  },
  statValueGender: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600', // Use standard literal (semibold equivalent)
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.alt,
    textTransform: 'capitalize',
  },
  profileList: {
    // Container for list items
  },
  profileItemBase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.divider,
  },
  profileItemLast: {
    borderBottomWidth: 0,
  },
  profileLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.body,
  },
  profileValue: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600', // Use standard literal (semibold equivalent)
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.alt,
  },
  profileValueSubscription: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600', // Use standard literal (semibold equivalent)
    color: theme.colors.primary.main,
    fontFamily: theme.typography.fontFamily.alt,
    textTransform: 'capitalize',
  },
  editButton: {
    marginTop: theme.spacing.xl,
    paddingVertical: theme.spacing.base,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    backgroundColor: theme.colors.primary.main,
  },
  editButtonText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold', // Use standard literal
    fontFamily: theme.typography.fontFamily.subheading,
  },
});

export default function ProfileScreen() {
  const theme = useTheme();
  const { clearAuthData } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProfileData();
      setProfile(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
      console.error('Profile load error:', err);
      if (err.message.includes('Unauthorized')) {
        Alert.alert('Session Expired', 'Please log in again.', [
          { text: 'OK', onPress: async () => {
              await clearAuthData();
              router.replace('/(auth)');
            }
          }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthData, router]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Generate styles using StyleSheet.create, memoized by theme
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={loadProfile} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noDataText}>No profile data available.</Text>
      </View>
    );
  }

  const { 
    first_name, 
    last_name, 
    email, 
    height, 
    weight, 
    date_of_birth, 
    gender, 
    fitness_level, 
    primary_goal, 
    workout_frequency, 
    subscription_tier
  } = profile;

  const age = calculateAge(date_of_birth);
  const { bmi, status } = calculateBMI(height, weight);
  const initials = `${first_name?.[0] || ''}${last_name?.[0] || ''}`.toUpperCase();

  const getBmiColor = () => {
    if (bmi === null) return theme.colors.text.primary;
    switch (status) {
      case 'Healthy': return theme.colors.semantic.success;
      case 'Underweight':
      case 'Overweight': 
      case 'Obese': return theme.colors.semantic.warning;
      default: return theme.colors.text.primary;
    }
  };

  const profileItems = [
    { label: 'Experience Level', value: formatLevel(fitness_level) },
    { label: 'Primary Goal', value: formatGoal(primary_goal) },
    { label: 'Workout Frequency', value: formatFrequency(workout_frequency) },
  ];

  const subscriptionItems = [
    { label: 'Current Plan', value: subscription_tier || 'N/A' },
  ];

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <LinearGradient
        colors={theme.colors.primary.gradient as [string, string]}
        style={styles.headerGradient}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{initials || 'N/A'}</Text>
          </View>
          <Text style={styles.name}>{`${first_name || ''} ${last_name || ''}`.trim() || 'User'}</Text>
          <Text style={styles.email}>{email || 'No email provided'}</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Personal Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Height</Text>
              <Text style={styles.statValue}>{height ? `${height} cm` : 'N/A'}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Weight</Text>
              <Text style={styles.statValue}>{weight ? `${weight} kg` : 'N/A'}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Age</Text>
              <Text style={styles.statValue}>{age !== null ? `${age} years` : 'N/A'}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Gender</Text>
              <Text style={styles.statValueGender}>{gender || 'N/A'}</Text>
            </View>
            <View style={styles.statItemFull}>
              <Text style={styles.statLabel}>BMI</Text>
              <Text style={[styles.statValue, { color: getBmiColor() }]}>
                {bmi !== null ? `${bmi.toFixed(1)} (${status})` : 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Fitness Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitness Profile</Text>
          <View style={styles.profileList}>
            {profileItems.map((item, index) => (
              <View 
                key={item.label}
                style={[
                  styles.profileItemBase,
                  index === profileItems.length - 1 && styles.profileItemLast
                ]}
              >
                <Text style={styles.profileLabel}>{item.label}</Text>
                <Text style={styles.profileValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Subscription Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          <View style={styles.profileList}>
            {subscriptionItems.map((item, index) => (
              <View 
                key={item.label}
                style={[
                  styles.profileItemBase,
                  index === subscriptionItems.length - 1 && styles.profileItemLast
                ]}
              >
                <Text style={styles.profileLabel}>{item.label}</Text>
                <Text style={styles.profileValueSubscription}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => router.push('/(main)/edit-profile')} 
        >
          <Text style={styles.editButtonText}>EDIT PROFILE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
} 