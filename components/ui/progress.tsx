import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Progress({ value = 0 }: { value?: number }) {
  const p = Math.max(0, Math.min(100, value));
  return (
    <View style={styles.track}>
      <View style={[styles.bar, { width: `${p}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, backgroundColor: '#f3f4f6', borderRadius: 999, overflow: 'hidden' },
  bar: { height: '100%', backgroundColor: '#10b981' },
});
