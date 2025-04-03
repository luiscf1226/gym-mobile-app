import { z, ZodError } from 'zod';

// Validation schemas
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email format');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  );

export const confirmPasswordSchema = z
  .string()
  .min(1, 'Please confirm your password');

// Validation types
export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export type FieldErrors = {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

// Validation service class
export class ValidationService {
  private static instance: ValidationService;
  private constructor() {}

  public static getInstance(): ValidationService {
    if (!ValidationService.instance) {
      ValidationService.instance = new ValidationService();
    }
    return ValidationService.instance;
  }

  // Email validation
  public validateEmail(email: string): ValidationResult {
    try {
      emailSchema.parse(email);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof ZodError) {
        return { isValid: false, errors: error.errors.map((e: { message: string }) => e.message) };
      }
      return { isValid: false, errors: ['An unexpected error occurred'] };
    }
  }

  // Password validation
  public validatePassword(password: string): ValidationResult {
    try {
      passwordSchema.parse(password);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof ZodError) {
        return { isValid: false, errors: error.errors.map((e: { message: string }) => e.message) };
      }
      return { isValid: false, errors: ['An unexpected error occurred'] };
    }
  }

  // Confirm password validation
  public validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
    try {
      confirmPasswordSchema.parse(confirmPassword);
      if (password !== confirmPassword) {
        return { isValid: false, errors: ['Passwords do not match'] };
      }
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof ZodError) {
        return { isValid: false, errors: error.errors.map((e: { message: string }) => e.message) };
      }
      return { isValid: false, errors: ['An unexpected error occurred'] };
    }
  }

  // Form validation
  public validateSignupForm(data: {
    email: string;
    password: string;
    confirmPassword: string;
  }): { isValid: boolean; fieldErrors: FieldErrors } {
    const fieldErrors: FieldErrors = {};

    // Validate each field
    const emailResult = this.validateEmail(data.email);
    const passwordResult = this.validatePassword(data.password);
    const confirmPasswordResult = this.validateConfirmPassword(data.password, data.confirmPassword);

    // Collect field-specific errors
    if (!emailResult.isValid) fieldErrors.email = emailResult.errors;
    if (!passwordResult.isValid) fieldErrors.password = passwordResult.errors;
    if (!confirmPasswordResult.isValid) fieldErrors.confirmPassword = confirmPasswordResult.errors;

    return {
      isValid: Object.keys(fieldErrors).length === 0,
      fieldErrors,
    };
  }
} 