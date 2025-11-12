import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function SidebarTrigger() {
  return (
    <View style={styles.trigger}>
      <Text style={styles.text}>☰</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 },
});
