import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigation from '@/components/ui/BottomNavigation';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      {/* ...existing content... */}
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
