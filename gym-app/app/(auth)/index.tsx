import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ui/ThemeProvider';
import Button from '@/components/ui/Button';
import Logo from '@/assets/images/logo';
import { t } from '@/app/utils/localization';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
      <View style={styles.content}>
        {/* Logo and App Name */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Logo size={100} />
            </View>
            <Text style={[
              styles.appName, 
              { 
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fontFamily.heading,
                fontSize: theme.typography.fontSize['4xl']
              }
            ]}>
              {t('home.appName')}
            </Text>
            <Text style={[
              styles.tagline, 
              { 
                color: theme.colors.text.secondary,
                fontFamily: theme.typography.fontFamily.body,
                fontSize: theme.typography.fontSize.lg
              }
            ]}>
              {t('home.tagline')}
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsSection}>
          <Button 
            title={t('home.getStarted')} 
            variant="primary" 
            size="large" 
            fullWidth 
            onPress={handleGetStarted}
          />
          
          <Button 
            title={t('home.login')} 
            variant="outline" 
            size="large" 
            fullWidth 
            style={{ marginTop: theme.spacing.xl }}
            onPress={handleLogin}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 120,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  appName: {
    marginTop: 16,
    textAlign: 'center',
  },
  tagline: {
    marginTop: 8,
    textAlign: 'center',
  },
  buttonsSection: {
    width: '100%',
    marginBottom: 250,
  }
}); 