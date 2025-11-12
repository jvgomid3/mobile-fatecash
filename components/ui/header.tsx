import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header({ title, onMenu }: { title: string; onMenu?: () => void }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenu} style={styles.menu}>
    <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, backgroundColor: '#7c3aed', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, elevation: 6 },
  menu: { width: 44, alignItems: 'center', justifyContent: 'center' },
  menuText: { fontSize: 22, color: '#fff' },
  title: { fontSize: 18, fontWeight: '800', color: '#fff' },
});
