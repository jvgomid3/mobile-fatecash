import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: '#eef2ff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  text: { color: '#3730a3', fontWeight: '600', fontSize: 12 },
});
