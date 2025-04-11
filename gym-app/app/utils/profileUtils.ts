import { UserProfile } from '@/app/types/profile';

/**
 * Calculates age based on a date of birth string.
 * @param dateString - Date of birth in "YYYY-MM-DD" format.
 * @returns Age in years, or null if the date is invalid.
 */
export const calculateAge = (dateString: string | undefined | null): number | null => {
  if (!dateString) return null;
  try {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return isNaN(age) ? null : age;
  } catch (error) {
    console.error('Error calculating age:', error);
    return null;
  }
};

/**
 * Calculates Body Mass Index (BMI) and determines the status.
 * @param heightStr - Height in centimeters (as a string).
 * @param weightStr - Weight in kilograms (as a string).
 * @returns An object containing BMI value and status ('Underweight', 'Healthy', 'Overweight', 'Obese'), or { bmi: null, status: 'N/A' } if inputs are invalid.
 */
export const calculateBMI = (heightStr: string | undefined | null, weightStr: string | undefined | null): { bmi: number | null; status: string } => {
  if (!heightStr || !weightStr) return { bmi: null, status: 'N/A' };

  const height = parseFloat(heightStr);
  const weight = parseFloat(weightStr);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return { bmi: null, status: 'N/A' };
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let status = 'N/A';
  if (bmi < 18.5) {
    status = 'Underweight';
  } else if (bmi < 25) {
    status = 'Healthy';
  } else if (bmi < 30) {
    status = 'Overweight';
  } else {
    status = 'Obese';
  }

  return { bmi, status };
};

/**
 * Formats the fitness level string for display.
 * @param level - Raw fitness level string (e.g., "intermediate").
 * @returns Formatted string (e.g., "Intermediate") or "N/A".
 */
export const formatLevel = (level: string | undefined | null): string => {
  if (!level) return 'N/A';
  return level.charAt(0).toUpperCase() + level.slice(1).replace(/_/g, ' ');
};

/**
 * Formats the primary goal string for display.
 * @param goal - Raw primary goal string (e.g., "muscle_gain").
 * @returns Formatted string (e.g., "Muscle Gain") or "N/A".
 */
export const formatGoal = (goal: string | undefined | null): string => {
  if (!goal) return 'N/A';
  return goal
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Formats the workout frequency number for display.
 * @param frequency - Number of workouts per week.
 * @returns Formatted string (e.g., "4 times per week") or "N/A".
 */
export const formatFrequency = (frequency: number | undefined | null): string => {
  if (frequency === null || frequency === undefined || isNaN(frequency) || frequency < 0) return 'N/A';
  if (frequency === 1) return '1 time per week';
  return `${frequency} times per week`;
}; 