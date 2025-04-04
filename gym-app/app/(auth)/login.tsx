import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useTheme } from '@/components/ui/ThemeProvider';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ApiService } from '@/app/services/api';
import { useAuth } from '@/app/contexts/AuthContext';

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { setAuthData } = useAuth();
  const apiService = ApiService.getInstance();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  // Validation states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formValid, setFormValid] = useState(false);

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    } else if (!isValid) {
      setEmailError('Please enter a valid email address');
      return false;
    } else {
      setEmailError(null);
      return true;
    }
  };

  // Validate password
  const validatePassword = (password: string): boolean => {
    if (!password.trim()) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };

  // Check form validity when inputs change
  useEffect(() => {
    const isEmailValid = email.trim() !== '' ? validateEmail(email) : false;
    const isPasswordValid = password.trim() !== '' ? validatePassword(password) : false;
    
    setFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) validateEmail(text);
    setLoginError(null);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) validatePassword(text);
    setLoginError(null);
  };

  const handleLogin = async () => {
    // Validate inputs before submission
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    // Clear any previous login errors
    setLoginError(null);
    setIsLoading(true);
    
    try {
      // Call login API
      const response = await apiService.login({
        email: email.trim(),
        password: password,
      });
      
      // Store authentication data
      await setAuthData({
        user_id: response.user_id,
        email: response.email,
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      });
      
      // Navigate to main app after successful login
      router.replace('/(main)/home');
    } catch (error) {
      // Handle login errors
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
    >
      <ScrollView 
        contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background.main }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color={theme.colors.text.primary} />
        </TouchableOpacity>
        
        {/* Title Section */}
        <View style={styles.headerContainer}>
          <Text style={[styles.welcomeText, { 
            color: theme.colors.text.primary,
            fontFamily: theme.typography.fontFamily.heading,
          }]}>
            Welcome Back
          </Text>
          <Text style={[styles.subText, { 
            color: theme.colors.text.secondary,
            fontFamily: theme.typography.fontFamily.body,
          }]}>
            Log in to continue your journey
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Login Error Message */}
          {loginError && (
            <View style={[styles.errorContainer, { backgroundColor: theme.colors.semantic.error + '20' }]}>
              <Text style={[styles.errorMessage, { color: theme.colors.semantic.error }]}>
                {loginError}
              </Text>
            </View>
          )}
          
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.background.light,
                  color: theme.colors.text.primary,
                  borderRadius: theme.borderRadius.lg,
                  borderWidth: emailError ? 1 : 0,
                  borderColor: emailError ? theme.colors.semantic.error : 'transparent',
                }
              ]}
              placeholder="username@example.com"
              placeholderTextColor={theme.colors.text.muted}
              value={email}
              onChangeText={handleEmailChange}
              onBlur={() => validateEmail(email)}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {emailError && (
              <Text style={[styles.errorText, { color: theme.colors.semantic.error }]}>
                {emailError}
              </Text>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
              Password
            </Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  {
                    backgroundColor: theme.colors.background.light,
                    color: theme.colors.text.primary,
                    borderRadius: theme.borderRadius.lg,
                    borderWidth: passwordError ? 1 : 0,
                    borderColor: passwordError ? theme.colors.semantic.error : 'transparent',
                  }
                ]}
                placeholder="••••••••"
                placeholderTextColor={theme.colors.text.muted}
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={() => validatePassword(password)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={24} 
                  color={theme.colors.text.secondary} 
                />
              </TouchableOpacity>
            </View>
            {passwordError && (
              <Text style={[styles.errorText, { color: theme.colors.semantic.error }]}>
                {passwordError}
              </Text>
            )}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity 
            style={styles.forgotPassword}
            onPress={() => {
              // Navigate to forgot password screen
              // router.push('/(auth)/forgot-password');
            }}
          >
            <Text style={[
              styles.forgotPasswordText, 
              { 
                color: theme.colors.primary.main,
                fontFamily: theme.typography.fontFamily.body,
              }
            ]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="LOG IN"
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={!formValid}
            onPress={handleLogin}
            style={{
              backgroundColor: formValid ? theme.colors.primary.main : theme.colors.ui.inactive,
              borderRadius: 30,
            }}
            textStyle={{
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: theme.typography.fontSize.lg,
              letterSpacing: 1,
            }}
          />
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={[
            styles.signupText, 
            { 
              color: theme.colors.text.secondary,
              fontFamily: theme.typography.fontFamily.body,
            }
          ]}>
            Don't have an account?
          </Text>
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text style={[
              styles.signupLink, 
              { 
                color: theme.colors.primary.main,
                fontFamily: theme.typography.fontFamily.subheading,
                marginLeft: theme.spacing.xs
              }
            ]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  headerContainer: {
    marginTop: 80,
    marginBottom: 48,
  },
  welcomeText: {
    fontSize: 32,
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  errorContainer: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    width: '100%',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 32,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
}); 