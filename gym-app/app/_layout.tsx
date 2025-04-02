import ThemeProvider from "@/components/ui/ThemeProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/components/ui/ThemeProvider";
import { View, StyleSheet } from "react-native";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}

function RootLayoutContent() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background.main,
          },
        }}
      >
        <Stack.Screen 
          name="(auth)" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
