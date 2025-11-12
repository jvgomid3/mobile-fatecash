import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/ui/header';
import Progress from '../components/ui/progress';

const categories = [
  { id: 1, name: 'Alimentação', budgeted: 800, spent: 650, color: '#ef4444' },
  { id: 2, name: 'Transporte', budgeted: 400, spent: 380, color: '#f97316' },
  { id: 3, name: 'Moradia', budgeted: 1200, spent: 1200, color: '#eab308' },
  { id: 4, name: 'Saúde', budgeted: 300, spent: 150, color: '#22c55e' },
];

export default function OrcamentoScreen({ onMenu }: any) {
  const [cats] = useState(categories);
  const totalBudgeted = cats.reduce((s, c) => s + c.budgeted, 0);
  const totalSpent = cats.reduce((s, c) => s + c.spent, 0);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Orçamento" onMenu={onMenu} />
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Visão Geral</Text>
          <Text style={styles.heroValue}>R$ {totalSpent.toLocaleString('pt-BR')} / R$ {totalBudgeted.toLocaleString('pt-BR')}</Text>
          <View style={{ marginTop: 8 }}>
            <Progress value={(totalSpent / totalBudgeted) * 100} />
          </View>
        </View>

        <View style={styles.grid}>
          {cats.map((c) => {
            const progress = (c.spent / c.budgeted) * 100;
            return (
              <View key={c.id} style={styles.catCard}>
                <Text style={styles.catName}>{c.name}</Text>
                <Text style={styles.catAmount}>R$ {c.spent.toLocaleString('pt-BR')}</Text>
                <Progress value={Math.min(progress, 100)} />
                <Text style={styles.catSub}>{progress.toFixed(0)}% usado</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f8fafc', flex: 1 },
  hero: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  heroTitle: { color: '#6b7280', fontWeight: '600' },
  heroValue: { fontSize: 20, fontWeight: '800', marginTop: 6 },
  grid: { marginTop: 8 },
  catCard: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, elevation: 1 },
  catName: { fontWeight: '700' },
  catAmount: { fontSize: 16, fontWeight: '700', marginTop: 6 },
  catSub: { color: '#6b7280', marginTop: 6, fontSize: 12 },
});
