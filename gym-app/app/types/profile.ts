export interface UserProfile {
  subscription_tier: string;
  ai_features_included: boolean;
  max_workouts_per_month: number | null;
  first_name: string;
  last_name: string;
  date_of_birth: string; // ISO date string, e.g., "1989-12-31"
  gender: string;
  height: string; // Assuming height is returned as string, e.g., "180.00"
  weight: string; // Assuming weight is returned as string, e.g., "75.00"
  fitness_level: string;
  primary_goal: string;
  preferences: any; // Define more specifically if needed
  setup_completed: boolean;
  preferred_workout_duration: number;
  workout_frequency: number;
  profile_created_at: string; // ISO date string
  profile_updated_at: string; // ISO date string
  email?: string; // Add email if it's part of the user data or context
} 