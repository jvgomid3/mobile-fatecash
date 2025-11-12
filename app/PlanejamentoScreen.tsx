import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/ui/header';

const monthlyData = [
  { month: 'Jan', receita: 5800, gastos: 3200 },
  { month: 'Fev', receita: 5800, gastos: 3400 },
  { month: 'Mar', receita: 6200, gastos: 3100 },
];

export default function PlanejamentoScreen({ onMenu }: any) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Planejamento" onMenu={onMenu} />
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.small}>Receita</Text>
            <Text style={styles.big}>R$ 5.800,00</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.small}>Gastos</Text>
            <Text style={[styles.big, { color: '#ef4444' }]}>R$ 3.200,00</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Distribuição Mensal</Text>
          {monthlyData.map((m) => (
            <View key={m.month} style={styles.row}>
              <Text style={styles.month}>{m.month}</Text>
              <Text style={styles.rowText}>Receita: R$ {m.receita}</Text>
              <Text style={styles.rowText}>Gastos: R$ {m.gastos}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f8fafc', flex: 1 },
  summaryRow: { flexDirection: 'row', gap: 12, padding: 4 },
  summaryCard: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 10, elevation: 2 },
  small: { color: '#6b7280' },
  big: { fontSize: 18, fontWeight: '800', marginTop: 6 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginTop: 12 },
  cardTitle: { fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  month: { fontWeight: '700' },
  rowText: { color: '#374151' },
});
