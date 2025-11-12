import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/ui/header';

const initialDebts = [
  { id: 1, name: 'Financiamento do Carro', remaining: 18500, monthly: 650, dueDate: '2026-12-31' },
  { id: 2, name: 'Cartão Nubank', remaining: 1250, monthly: 300, dueDate: '2024-06-15' },
  { id: 3, name: 'Empréstimo Pessoal', remaining: 3200, monthly: 450, dueDate: '2024-12-31' },
];

export default function DividasScreen({ onMenu }: any) {
  const [debts] = useState(initialDebts);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Dívidas" onMenu={onMenu} />
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>

      <Text style={styles.title}>Dívidas</Text>

      {debts.map((d) => (
        <View key={d.id} style={[styles.card, { backgroundColor: '#fff' }]}>
          <View>
            <Text style={styles.cardTitle}>{d.name}</Text>
            <Text style={styles.cardDesc}>Vencimento: {new Date(d.dueDate).toLocaleDateString('pt-BR')}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.amount, styles.red]}>R$ {d.remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
            <Text style={styles.small}>Parcela: R$ {d.monthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#ef4444' }]}><Text style={styles.buttonText}>Pagar</Text></TouchableOpacity>
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
  card: { backgroundColor: '#fff6f6', padding: 12, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#fdecea' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardDesc: { color: '#666', marginTop: 4 },
  amount: { fontSize: 16, fontWeight: '700' },
  small: { color: '#666', marginTop: 4 },
  red: { color: 'red' },
  button: { marginTop: 8, backgroundColor: '#FF3B30', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
