import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator,
  TouchableOpacityProps 
} from 'react-native';
import { useTheme } from './ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'large' | 'medium' | 'small';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
  ...props
}) => {
  const theme = useTheme();
  
  // Compute container styles based on variant and size
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.lg,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xl,
      width: fullWidth ? '100%' : undefined,
      opacity: disabled ? 0.7 : 1,
    };
    
    // Set height based on size
    switch (size) {
      case 'large':
        baseStyle.height = 56;
        break;
      case 'medium':
        baseStyle.height = 48;
        break;
      case 'small':
        baseStyle.height = 40;
        baseStyle.paddingHorizontal = theme.spacing.lg;
        break;
    }
    
    // Set colors and borders based on variant
    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = theme.colors.primary.main;
        break;
      case 'secondary':
        baseStyle.backgroundColor = theme.colors.secondary.main;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 2;
        baseStyle.borderColor = theme.colors.primary.main;
        break;
      case 'text':
        baseStyle.backgroundColor = 'transparent';
        break;
    }
    
    return baseStyle;
  };
  
  // Compute text styles based on variant and size
  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: theme.typography.fontFamily.subheading,
      textAlign: 'center',
    };
    
    // Set font size based on size
    switch (size) {
      case 'large':
        baseStyle.fontSize = theme.typography.fontSize.lg;
        break;
      case 'medium':
        baseStyle.fontSize = theme.typography.fontSize.base;
        break;
      case 'small':
        baseStyle.fontSize = theme.typography.fontSize.sm;
        break;
    }
    
    // Set text color based on variant
    switch (variant) {
      case 'primary':
      case 'secondary':
        baseStyle.color = theme.colors.text.primary;
        break;
      case 'outline':
      case 'text':
        baseStyle.color = theme.colors.primary.main;
        break;
    }
    
    return baseStyle;
  };
  
  return (
    <TouchableOpacity
      style={[getContainerStyle(), style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' || variant === 'secondary' 
            ? theme.colors.text.primary 
            : theme.colors.primary.main} 
          size="small" 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button; 