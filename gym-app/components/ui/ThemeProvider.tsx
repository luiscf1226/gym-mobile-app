// import * as AppleColors from "@bacons/apple-colors";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import React, { createContext, useContext } from "react";
import theme from "@/app/theme";

// Create a theme context
const ThemeContext = createContext(theme);

// Export a hook to use theme
export const useTheme = () => useContext(ThemeContext);

// Use exact native P3 colors and equivalents on Android/web.
// This lines up well with React Navigation.
// const BaconDefaultTheme: Theme = {
//   dark: false,
//   colors: {
//     primary: AppleColors.systemBlue,
//     notification: AppleColors.systemRed,
//     ...DefaultTheme.colors,
//     // background: AppleColors.systemGroupedBackground,
//     // card: AppleColors.secondarySystemGroupedBackground,
//     // text: AppleColors.label,
//     // border: AppleColors.separator,
//   },
//   fonts: DefaultTheme.fonts,
// };

// const BaconDarkTheme: Theme = {
//   dark: true,
//   colors: {
//     // ...BaconDefaultTheme.colors,
//     ...DarkTheme.colors,
//   },
//   fonts: DarkTheme.fonts,
// };

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const colorScheme = process.env.EXPO_OS === "web" ? "dark" : useColorScheme();
  
  // Customize navigation theme with our theme colors
  const navigationTheme = {
    ...(colorScheme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(colorScheme === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.colors.primary.main,
      background: theme.colors.background.main,
      card: theme.colors.background.card,
      text: theme.colors.text.primary,
      border: theme.colors.ui.border,
      notification: theme.colors.semantic.error,
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      <RNTheme value={navigationTheme}>{props.children}</RNTheme>
    </ThemeContext.Provider>
  );
}
