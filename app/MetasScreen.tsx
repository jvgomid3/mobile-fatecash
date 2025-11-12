import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/ui/header';

const initialGoals = [
  { id: 1, title: 'Viagem para Europa', target: 15000, current: 8500, deadline: '2024-12-31' },
  { id: 2, title: 'Carro Novo', target: 45000, current: 12000, deadline: '2025-06-30' },
  { id: 3, title: 'Reserva de Emergência', target: 20000, current: 8950, deadline: '2024-08-31' },
];

export default function MetasScreen({ onMenu }: any) {
  const [goals] = useState(initialGoals);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Metas" onMenu={onMenu} />
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Metas</Text>

        {goals.map((g) => (
          <View key={g.id} style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>{g.title}</Text>
              <Text style={styles.cardDesc}>Meta: R$ {g.target.toLocaleString('pt-BR')}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.progress}>{((g.current / g.target) * 100).toFixed(0)}%</Text>
              <Text style={styles.small}>Prazo: {new Date(g.deadline).toLocaleDateString('pt-BR')}</Text>
              <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Contribuir</Text></TouchableOpacity>
            </View>
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: '#f1f7ff', padding: 12, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardDesc: { color: '#666', marginTop: 4 },
  progress: { fontSize: 16, fontWeight: '700', color: '#0ea5e9' },
  small: { color: '#666', marginTop: 4 },
  button: { marginTop: 8, backgroundColor: '#0ea5e9', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
