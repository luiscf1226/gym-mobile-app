import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useTheme } from '@/components/ui/ThemeProvider';
import { t } from '@/app/utils/localization';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { ValidationService, FieldErrors } from '@/app/services/validation';
import { ApiService } from '@/app/services/api';
import { useAuth } from '@/app/contexts/AuthContext';

export default function SignupScreen() {
  const theme = useTheme();
  const router = useRouter();
  const validationService = ValidationService.getInstance();
  const apiService = ApiService.getInstance();
  const { setAuthData } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // Error state
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    // Clear API error when user starts typing
    setApiError(null);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setApiError(null);

      // Validate form
      const validationResult = validationService.validateSignupForm(formData);
      if (!validationResult.isValid) {
        setFieldErrors(validationResult.fieldErrors);
        return;
      }

      // Call API
      const response = await apiService.signup({
        email: formData.email,
        password: formData.password,
      });

      // Store auth data
      await setAuthData(response);

      // Navigate to home screen
      router.replace('/(main)/home');
      
    } catch (error) {
      if (error instanceof Error) {
        // Handle specific error messages
        const errorMessage = error.message;
        if (errorMessage.includes('email already exists')) {
          setFieldErrors(prev => ({ ...prev, email: ['This email is already registered'] }));
        } else if (errorMessage.includes('network error')) {
          setApiError('Please check your internet connection and try again');
        } else if (errorMessage.includes('server error')) {
          setApiError('Our servers are having issues. Please try again later');
        } else {
          setApiError(errorMessage);
        }
      } else {
        setApiError('An unexpected error occurred. Please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <Text style={[styles.backText, { color: theme.colors.text.secondary }]}>←</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[
          styles.title,
          {
            color: theme.colors.text.primary,
            fontFamily: theme.typography.fontFamily.heading,
            fontSize: theme.typography.fontSize['3xl']
          }
        ]}>
          {t('signup.title')}
        </Text>
        <Text style={[
          styles.subtitle,
          {
            color: theme.colors.text.secondary,
            fontFamily: theme.typography.fontFamily.body,
            fontSize: theme.typography.fontSize.lg
          }
        ]}>
          {t('signup.subtitle')}
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
            {t('signup.email')}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.background.dark,
                color: theme.colors.text.primary,
                borderRadius: theme.borderRadius.lg,
                borderWidth: fieldErrors.email ? 1 : 0,
                borderColor: fieldErrors.email ? theme.colors.text.error : 'transparent',
              }
            ]}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholderTextColor={theme.colors.text.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
          {fieldErrors.email && (
            <Text style={[styles.fieldError, { color: theme.colors.text.error }]}>
              {fieldErrors.email[0]}
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
            {t('signup.password')}
          </Text>
          <View style={[
            styles.passwordContainer,
            {
              borderWidth: fieldErrors.password ? 1 : 0,
              borderColor: fieldErrors.password ? theme.colors.text.error : 'transparent',
              borderRadius: theme.borderRadius.lg,
            }
          ]}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.background.dark,
                  color: theme.colors.text.primary,
                  borderRadius: theme.borderRadius.lg,
                }
              ]}
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry={!showPassword}
              placeholderTextColor={theme.colors.text.muted}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={{ color: theme.colors.text.secondary }}>
                {showPassword ? '👁' : '👁‍🗨'}
              </Text>
            </TouchableOpacity>
          </View>
          {fieldErrors.password && (
            <Text style={[styles.fieldError, { color: theme.colors.text.error }]}>
              {fieldErrors.password[0]}
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
            {t('signup.confirmPassword')}
          </Text>
          <View style={[
            styles.passwordContainer,
            {
              borderWidth: fieldErrors.confirmPassword ? 1 : 0,
              borderColor: fieldErrors.confirmPassword ? theme.colors.text.error : 'transparent',
              borderRadius: theme.borderRadius.lg,
            }
          ]}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.background.dark,
                  color: theme.colors.text.primary,
                  borderRadius: theme.borderRadius.lg,
                }
              ]}
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor={theme.colors.text.muted}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Text style={{ color: theme.colors.text.secondary }}>
                {showConfirmPassword ? '👁' : '👁‍🗨'}
              </Text>
            </TouchableOpacity>
          </View>
          {fieldErrors.confirmPassword && (
            <Text style={[styles.fieldError, { color: theme.colors.text.error }]}>
              {fieldErrors.confirmPassword[0]}
            </Text>
          )}
        </View>

        {/* API Error Message */}
        {apiError && (
          <Text style={[styles.apiError, { color: theme.colors.text.error }]}>
            {apiError}
          </Text>
        )}

        <Button
          title={isLoading ? 'Creating Account...' : t('signup.createAccount')}
          variant="primary"
          size="large"
          fullWidth
          style={styles.createButton}
          onPress={handleSubmit}
          disabled={isLoading}
          loading={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 1,
  },
  backText: {
    fontSize: 24,
  },
  header: {
    marginTop: 100,
    marginBottom: 40,
  },
  title: {
    textAlign: 'left',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'left',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    width: '100%',
  },
  passwordContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  createButton: {
    marginTop: 20,
  },
  fieldError: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  apiError: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  }
}); 