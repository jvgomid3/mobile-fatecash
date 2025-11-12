import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/ui/header';

const transactions = [
  { id: 1, description: 'Salário', amount: 5800.0, type: 'income', date: '2024-01-15', account: 'Conta Corrente BB' },
  { id: 2, description: 'Supermercado Extra', amount: -320.5, type: 'expense', date: '2024-01-14', account: 'Cartão Nubank' },
  { id: 3, description: 'Transferência Poupança', amount: -1000.0, type: 'transfer', date: '2024-01-13', account: 'Conta Corrente BB' },
  { id: 4, description: 'Conta de Luz', amount: -180.75, type: 'expense', date: '2024-01-13', account: 'Conta Corrente BB' },
  { id: 5, description: 'Freelance Design', amount: 800.0, type: 'income', date: '2024-01-12', account: 'Conta Corrente BB' },
  { id: 6, description: 'Combustível', amount: -150.0, type: 'expense', date: '2024-01-11', account: 'Cartão Itaú' },
  { id: 7, description: 'Restaurante', amount: -85.3, type: 'expense', date: '2024-01-10', account: 'Cartão Nubank' },
  { id: 8, description: 'Farmácia', amount: -45.9, type: 'expense', date: '2024-01-09', account: 'Conta Corrente BB' },
];

const accounts = [
  { name: 'Conta Corrente BB', balance: 5420.5, change: 12.5 },
  { name: 'Poupança Caixa', balance: 8950.25, change: 2.1 },
  { name: 'Cartão Nubank', balance: -1250.0, change: -8.3 },
  { name: 'Cartão Itaú', balance: -850.75, change: 15.2 },
];

export default function CarteiraScreen({ onMenu }: any) {
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Minha Carteira" onMenu={onMenu} />
      <ScrollView style={styles.container}>

      <View style={[styles.card, { backgroundColor: '#fff' }]}
      >
        <Text style={styles.cardTitle}>Patrimônio Total</Text>
        <Text style={styles.cardDesc}>Saldo consolidado de todas as suas contas</Text>
        <Text style={styles.totalBalance}>
          R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>
        <Text style={styles.percentUp}>+8.7% em relação ao mês passado</Text>
      </View>

      <View style={styles.accountsRow}>
        {accounts.map((account, index) => (
          <View key={index} style={[styles.accountCard, { backgroundColor: index % 2 ? '#fee2e2' : '#ecfeff' }]}>
            <Text style={styles.accountName}>{account.name}</Text>
            <Text style={[styles.accountBalance, account.balance >= 0 ? styles.green : styles.red]}>
              {account.balance >= 0 ? '+' : ''}R$ {Math.abs(account.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>
            <Text style={account.change >= 0 ? styles.green : styles.red}>
              {account.change >= 0 ? '+' : ''}{account.change}%
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.card, { backgroundColor: '#fff' }]}>
        <Text style={styles.cardTitle}>Movimentações Recentes</Text>
        <Text style={styles.cardDesc}>Últimas transações em todas as suas contas</Text>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionRow}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDesc}>{transaction.description}</Text>
              <Text style={styles.transactionAccount}>{transaction.account}</Text>
            </View>
            <View style={styles.transactionAmountInfo}>
              <Text style={transaction.type === 'income' ? styles.green : styles.red}>
                {transaction.type === 'income' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Text>
              <Text style={styles.transactionDate}>{new Date(transaction.date).toLocaleDateString('pt-BR')}</Text>
            </View>
          </View>
        ))}
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  totalBalance: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  percentUp: {
    fontSize: 14,
    color: 'green',
  },
  accountsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  accountCard: {
    width: '48%',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  accountName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDesc: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  transactionAccount: {
    fontSize: 13,
    color: '#888',
  },
  transactionAmountInfo: {
    alignItems: 'flex-end',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
});
