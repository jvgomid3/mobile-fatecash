import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

export const CardHeader = ({ children }: PropsWithChildren) => (
  <View style={styles.header}>{children}</View>
);
export const CardContent = ({ children }: PropsWithChildren) => (
  <View style={styles.content}>{children}</View>
);
export const CardTitle = ({ children }: PropsWithChildren<{ children: React.ReactNode }>) => (
  <View style={{ marginBottom: 6 }}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  header: { marginBottom: 8 },
  content: {},
});
