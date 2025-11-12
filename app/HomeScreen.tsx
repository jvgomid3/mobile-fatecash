import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/ui/header';

export default function HomeScreen({ onMenu }: any) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="FateCash" onMenu={onMenu} />
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
        <View style={styles.hero}>
          <Text style={styles.title}>Bem-vindo ao FateCash</Text>
          <Text style={styles.subtitle}>Controle suas finanças de forma simples e moderna.</Text>
          <View style={styles.quickRow}>
            <TouchableOpacity style={[styles.quick, { backgroundColor: '#06b6d4' }]} onPress={() => onMenu && onMenu()}>
              <Text style={styles.quickTitle}>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quick, { backgroundColor: '#7c3aed' }]} onPress={() => {}}>
              <Text style={styles.quickTitle}>Carteira</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quick, { backgroundColor: '#f97316' }]} onPress={() => {}}>
              <Text style={styles.quickTitle}>Orçamento</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={[styles.card, { backgroundColor: '#fff' }]}>
            <Text style={styles.cardTitle}>Resumo Rápido</Text>
            <Text style={styles.cardDesc}>Saldo, próximas contas e metas</Text>
          </View>
          <View style={[styles.card, { backgroundColor: '#fff' }]}>
            <Text style={styles.cardTitle}>Atalhos</Text>
            <Text style={styles.cardDesc}>Acesse as funcionalidades mais usadas</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f8fafc', flex: 1 },
  hero: { padding: 16 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: '#6b7280' },
  quickRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  quick: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  quickTitle: { color: '#fff', fontWeight: '800' },
  grid: { padding: 16 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 12, elevation: 2 },
  cardTitle: { fontWeight: '700' },
  cardDesc: { color: '#6b7280', marginTop: 6 },
});
