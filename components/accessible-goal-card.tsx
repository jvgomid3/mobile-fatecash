import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function AccessibleGoalCard({ goal, onEdit, onDelete }: any) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{goal.title}</Text>
        <Text style={styles.sub}>Meta: R$ {goal.target.toLocaleString('pt-BR')}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => onEdit && onEdit(goal)} style={styles.button}><Text style={styles.bt}>Editar</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete && onDelete(goal.id)} style={[styles.button, { backgroundColor: '#ef4444' }]}><Text style={[styles.bt, { color: '#fff' }]}>Excluir</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }, title: { fontWeight: '700' }, sub: { color: '#666', marginTop: 4 }, button: { marginTop: 8, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, backgroundColor: '#e5e7eb' }, bt: { fontWeight: '600' } });
