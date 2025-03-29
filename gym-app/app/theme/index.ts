import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color Palette
const colors = {
  // Primary Brand Colors
  primary: {
    main: '#4361EE',
    light: '#4895EF',
    dark: '#3F37C9',
    gradient: ['#4361EE', '#7209B7'], // Gradient from left to right
  },
  
  // Secondary Brand Colors
  secondary: {
    main: '#7209B7',
    light: '#9D4EDD',
    dark: '#560BAD',
  },
  
  // Background Colors (Dark Theme)
  background: {
    main: '#16213E',
    light: '#1F2937',
    dark: '#0F172A',
    gradient: ['#1A1A2E', '#16213E'], // Gradient from top to bottom
    card: '#1F2937',
    modal: '#1A1A2E',
  },
  
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#8D99AE',
    muted: '#64748B',
    placeholder: '#64748B',
    link: '#4361EE',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
  
  // UI Element Colors
  ui: {
    border: '#2D3748',
    divider: '#2D3748',
    icon: '#8D99AE',
    highlight: '#4361EE20', // Semi-transparent primary color
    shadow: '#000000',
    inactive: '#475569',
  },
  
  // Specialized Colors
  specialized: {
    xp: '#10B981', // XP/Level color
    streak: '#F59E0B', // Streak color
    achievement: '#F472B6', // Achievement color
    record: '#60A5FA', // Personal record color
  },
  
  // Semantic Colors
  semantic: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#60A5FA',
  },
};

// Typography
const typography = {
  // Font Families
  fontFamily: {
    heading: 'Poppins-Bold', // You'll need to install and link these fonts
    subheading: 'Poppins-SemiBold',
    body: 'Poppins-Regular',
    alt: 'Poppins-Medium',
    mono: 'SpaceMono-Regular', // For code or numbers that need monospace
  },
  
  // Font Sizes
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  
  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  
  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// Spacing (consistent spacing scale)
const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
  '6xl': 80,
};

// Border Radiuses
const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
  pill: 100, // For pill-shaped buttons
};

// Shadows
const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.ui.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  xl: {
    shadowColor: colors.ui.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

// Screen Dimensions & Breakpoints
const layout = {
  width,
  height,
  isSmallDevice: width < 375,
  breakpoints: {
    sm: 360,
    md: 375,
    lg: 390,
    xl: 428,
  },
};

// Animation Timing & Durations
const animation = {
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: [0.25, 0.1, 0.25, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
  },
};

// Common Component Styles
const componentStyles = {
  // Button Styles
  button: {
    primary: {
      container: {
        backgroundColor: colors.primary.main,
        borderRadius: borderRadius.pill,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        ...shadows.md,
      },
      text: {
        color: colors.text.primary,
        fontFamily: typography.fontFamily.subheading,
        fontSize: typography.fontSize.base,
        textAlign: 'center',
      },
      gradient: {
        colors: colors.primary.gradient,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      },
    },
    secondary: {
      container: {
        borderColor: colors.text.primary,
        borderWidth: 2,
        borderRadius: borderRadius.pill,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        backgroundColor: 'transparent',
      },
      text: {
        color: colors.text.primary,
        fontFamily: typography.fontFamily.subheading,
        fontSize: typography.fontSize.base,
        textAlign: 'center',
      },
    },
    social: {
      container: {
        backgroundColor: colors.background.light,
        borderRadius: borderRadius.full,
        padding: spacing.md,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.sm,
      },
    },
  },
  
  // Input Field Styles
  input: {
    container: {
      backgroundColor: colors.background.light,
      borderRadius: borderRadius.lg,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      ...shadows.sm,
    },
    label: {
      color: colors.text.secondary,
      fontFamily: typography.fontFamily.body,
      fontSize: typography.fontSize.sm,
      marginBottom: spacing.xs,
    },
    text: {
      color: colors.text.primary,
      fontFamily: typography.fontFamily.body,
      fontSize: typography.fontSize.base,
    },
    error: {
      color: colors.semantic.error,
      fontFamily: typography.fontFamily.body,
      fontSize: typography.fontSize.sm,
      marginTop: spacing.xs,
    },
  },
  
  // Card Styles
  card: {
    container: {
      backgroundColor: colors.background.card,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      ...shadows.md,
    },
    header: {
      fontFamily: typography.fontFamily.subheading,
      fontSize: typography.fontSize.lg,
      color: colors.text.primary,
      marginBottom: spacing.sm,
    },
    body: {
      fontFamily: typography.fontFamily.body,
      fontSize: typography.fontSize.md,
      color: colors.text.secondary,
    },
  },
  
  // Tab Styles
  tab: {
    active: {
      backgroundColor: colors.primary.main,
      borderRadius: borderRadius.pill,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
    },
    inactive: {
      backgroundColor: 'transparent',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
    },
    activeText: {
      color: colors.text.primary,
      fontFamily: typography.fontFamily.subheading,
      fontSize: typography.fontSize.sm,
    },
    inactiveText: {
      color: colors.text.secondary,
      fontFamily: typography.fontFamily.body,
      fontSize: typography.fontSize.sm,
    },
  },
};

// Export the theme object
const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
  animation,
  componentStyles,
};

export default theme; 