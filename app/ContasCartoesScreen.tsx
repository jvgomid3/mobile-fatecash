import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/ui/header';

const initialAccounts = [
  { id: 1, name: 'Conta Corrente Principal', type: 'checking', balance: 5420.5, bank: 'Banco do Brasil', number: '**** 1234' },
  { id: 2, name: 'Poupança', type: 'savings', balance: 8950.25, bank: 'Caixa Econômica', number: '**** 5678' },
  { id: 3, name: 'Cartão Nubank', type: 'credit', balance: -1250.0, bank: 'Nubank', number: '**** 9012' },
];

export default function ContasCartoesScreen({ onMenu }: any) {
  // estado reservado para futura edição; por enquanto usamos dados iniciais imutáveis
  const accounts = initialAccounts;

  return (
    <View style={{ flex: 1 }}>
      <Header title="Contas & Cartões" onMenu={onMenu} />
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>

      {accounts.map((acc) => (
        <View key={acc.id} style={[styles.card, { backgroundColor: '#fff' }]}>
          <View>
            <Text style={styles.cardTitle}>{acc.name}</Text>
            <Text style={styles.cardDesc}>{acc.bank} · {acc.number}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.balance, acc.balance >= 0 ? styles.green : styles.red]}>
              {acc.balance >= 0 ? '+' : ''}R$ {Math.abs(acc.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#7c3aed' }]} onPress={() => { /* placeholder */ }}>
              <Text style={styles.buttonText}>Detalhes</Text>
            </TouchableOpacity>
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
  card: { backgroundColor: '#f6f6f6', padding: 12, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardDesc: { color: '#666', marginTop: 4 },
  balance: { fontSize: 16, fontWeight: '700' },
  green: { color: 'green' },
  red: { color: 'red' },
  button: { marginTop: 8, backgroundColor: '#007AFF', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
