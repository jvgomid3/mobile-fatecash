import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function AccessibleDebtCard({ debt, onEdit, onDelete }: any) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{debt.name}</Text>
        <Text style={styles.sub}>Restante: R$ {debt.remaining.toLocaleString('pt-BR')}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => onEdit && onEdit(debt)} style={styles.button}><Text style={styles.bt}>Editar</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete && onDelete(debt.id)} style={[styles.button, { backgroundColor: '#ef4444' }]}><Text style={[styles.bt, { color: '#fff' }]}>Excluir</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }, title: { fontWeight: '700' }, sub: { color: '#666', marginTop: 4 }, button: { marginTop: 8, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, backgroundColor: '#e5e7eb' }, bt: { fontWeight: '600' } });
