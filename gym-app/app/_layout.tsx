import ThemeProvider from "@/components/ui/ThemeProvider";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "@/components/ui/ThemeProvider";

export default function Layout() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

function MainContent() {
  const theme = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
      <Text style={[styles.text, { 
        color: theme.colors.text.primary,
        fontFamily: theme.typography.fontFamily.heading,
        fontSize: theme.typography.fontSize['2xl']
      }]}>
        Hello
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  }
});
