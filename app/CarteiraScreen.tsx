import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  { name: 'Conta Corrente BB', balance: 5420.5, change: 12.5, icon: 'business' },
  { name: 'Poupança Caixa', balance: 8950.25, change: 2.1, icon: 'trending-up' },
  { name: 'Cartão Nubank', balance: -1250.0, change: -8.3, icon: 'card' },
  { name: 'Cartão Itaú', balance: -850.75, change: 15.2, icon: 'card-outline' },
];

export default function CarteiraScreen({ onMenu }: any) {
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header com Gradiente */}
      <LinearGradient
        colors={['#1a237e', '#283593', '#3949ab']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Minha Carteira</Text>
          <TouchableOpacity style={styles.menuButton} onPress={onMenu}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Card de Patrimônio Total */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Patrimônio Total</Text>
          <Text style={styles.balanceAmount}>
            R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>
          <View style={styles.balanceFooter}>
            <View style={styles.balanceItem}>
              <Ionicons name="trending-up" size={16} color="#4caf50" />
              <Text style={styles.balanceChange}>+8,7%</Text>
            </View>
            <Text style={styles.balanceDate}>em relação ao mês passado</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Contas Cards */}
      <View style={styles.accountsSection}>
        <Text style={styles.sectionTitle}>Minhas Contas</Text>
        <View style={styles.accountsGrid}>
          {accounts.map((account, index) => (
            <TouchableOpacity key={index} style={styles.accountCard}>
              <View style={[
                styles.accountIcon,
                { backgroundColor: account.balance >= 0 ? '#e8f5e9' : '#ffebee' }
              ]}>
                <Ionicons 
                  name={account.icon as any} 
                  size={24} 
                  color={account.balance >= 0 ? '#388e3c' : '#d32f2f'} 
                />
              </View>
              <Text style={styles.accountName}>{account.name}</Text>
              <Text style={[
                styles.accountBalance,
                account.balance >= 0 ? styles.positive : styles.negative
              ]}>
                R$ {Math.abs(account.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Text>
              <View style={styles.accountChange}>
                <Ionicons 
                  name={account.change >= 0 ? 'arrow-up' : 'arrow-down'} 
                  size={14} 
                  color={account.change >= 0 ? '#4caf50' : '#f44336'} 
                />
                <Text style={account.change >= 0 ? styles.positive : styles.negative}>
                  {Math.abs(account.change)}%
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Transações Recentes */}
      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Movimentações Recentes</Text>
        <View style={styles.transactionsCard}>
          {transactions.map((transaction) => (
            <TouchableOpacity key={transaction.id} style={styles.transactionRow}>
              <View style={[
                styles.transactionIcon,
                { backgroundColor: transaction.type === 'income' ? '#e8f5e9' : '#ffebee' }
              ]}>
                <Ionicons 
                  name={
                    transaction.type === 'income' ? 'arrow-down-circle' : 
                    transaction.type === 'transfer' ? 'swap-horizontal' : 
                    'arrow-up-circle'
                  } 
                  size={20} 
                  color={transaction.type === 'income' ? '#4caf50' : '#f44336'} 
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDesc}>{transaction.description}</Text>
                <Text style={styles.transactionAccount}>{transaction.account}</Text>
              </View>
              <View style={styles.transactionAmountInfo}>
                <Text style={transaction.type === 'income' ? styles.positive : styles.negative}>
                  {transaction.type === 'income' ? '+' : '-'}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.date).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 140,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#e3f2fd',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balanceChange: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '600',
  },
  balanceDate: {
    fontSize: 12,
    color: '#e3f2fd',
  },
  accountsSection: {
    paddingHorizontal: 20,
    marginTop: -80,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a237e',
  },
  accountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  accountCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  accountIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  accountName: {
    fontSize: 13,
    color: '#78909c',
    marginBottom: 8,
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  accountChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  positive: {
    color: '#4caf50',
    fontWeight: '600',
  },
  negative: {
    color: '#f44336',
    fontWeight: '600',
  },
  transactionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  transactionsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f7fa',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDesc: {
    fontSize: 15,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 4,
  },
  transactionAccount: {
    fontSize: 12,
    color: '#78909c',
  },
  transactionAmountInfo: {
    alignItems: 'flex-end',
  },
  transactionDate: {
    fontSize: 11,
    color: '#78909c',
    marginTop: 4,
  },
});
