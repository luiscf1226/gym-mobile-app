import { Stack } from 'expo-router';
import ThemeProvider from '@/components/ui/ThemeProvider';
import { AuthProvider } from '@/app/contexts/AuthContext';
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <View style={styles.container}>
          <StatusBar style="light" />
          <Stack>
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(main)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </View>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
