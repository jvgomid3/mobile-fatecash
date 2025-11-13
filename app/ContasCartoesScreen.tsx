import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddAccountModal from '../components/modals/AddAccountModal';

const initialAccounts = [
  { id: 1, name: 'Conta Corrente Principal', type: 'checking', balance: 5420.5, bank: 'Banco do Brasil', number: '**** 1234', icon: 'wallet' as const },
  { id: 2, name: 'Poupança', type: 'savings', balance: 8950.25, bank: 'Caixa Econômica', number: '**** 5678', icon: 'trending-up' as const },
  { id: 3, name: 'Cartão Nubank', type: 'credit', balance: -1250.0, bank: 'Nubank', number: '**** 9012', icon: 'card' as const },
  { id: 4, name: 'Cartão Itaú', type: 'credit', balance: -850.75, bank: 'Itaú', number: '**** 3456', icon: 'card' as const },
];

const transactions = [
  { id: 1, description: 'Supermercado Extra', amount: -320.5, date: '2024-01-14', account: 'Cartão Nubank' },
  { id: 2, description: 'Salário', amount: 5800.0, date: '2024-01-15', account: 'Conta Corrente' },
  { id: 3, description: 'Conta de Luz', amount: -180.75, date: '2024-01-13', account: 'Conta Corrente' },
  { id: 4, description: 'Restaurante', amount: -85.3, date: '2024-01-10', account: 'Cartão Nubank' },
];

export default function ContasCartoesScreen({ onMenu }: any) {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [modalVisible, setModalVisible] = useState(false);
  
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const handleAddAccount = (newAccount: any) => {
    setAccounts([...accounts, newAccount]);
  };

  return (
    <View style={styles.container}>
      {/* Header com Gradiente */}
      <LinearGradient
        colors={['#1a237e', '#283593', '#3949ab']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity onPress={onMenu} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contas & Cartões</Text>
        <View style={styles.menuButton} />
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Card de Saldo Total */}
        <View style={styles.balanceCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.balanceGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.balanceHeader}>
              <Ionicons name="wallet-outline" size={32} color="#fff" />
              <Text style={styles.balanceLabel}>Saldo Total</Text>
            </View>
            <Text style={styles.balanceAmount}>
              R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>
            <Text style={styles.balanceSubtext}>
              {accounts.length} conta(s) ativa(s)
            </Text>
          </LinearGradient>
        </View>

        {/* Seção de Contas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minhas Contas</Text>
          {accounts.map((acc) => (
            <View key={acc.id} style={styles.accountCard}>
              <View style={styles.accountHeader}>
                <View style={[styles.iconContainer, { backgroundColor: acc.balance >= 0 ? '#e8f5e9' : '#ffebee' }]}>
                  <Ionicons 
                    name={acc.icon} 
                    size={24} 
                    color={acc.balance >= 0 ? '#4caf50' : '#f44336'} 
                  />
                </View>
                <View style={styles.accountInfo}>
                  <Text style={styles.accountName}>{acc.name}</Text>
                  <Text style={styles.accountDetails}>{acc.bank} · {acc.number}</Text>
                </View>
              </View>
              <View style={styles.accountBalanceContainer}>
                <Text style={[styles.accountBalance, acc.balance >= 0 ? styles.positiveBalance : styles.negativeBalance]}>
                  {acc.balance >= 0 ? '+' : ''}R$ {Math.abs(acc.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
                  <Ionicons name="chevron-forward" size={16} color="#667eea" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Seção de Transações Recentes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transações Recentes</Text>
          <View style={styles.transactionsCard}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionRow}>
                <View style={[styles.transactionIcon, { backgroundColor: transaction.amount >= 0 ? '#e8f5e9' : '#ffebee' }]}>
                  <Ionicons 
                    name={transaction.amount >= 0 ? 'arrow-down' : 'arrow-up'} 
                    size={20} 
                    color={transaction.amount >= 0 ? '#4caf50' : '#f44336'} 
                  />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionAccount}>{transaction.account}</Text>
                </View>
                <View style={styles.transactionAmountContainer}>
                  <Text style={[styles.transactionAmount, transaction.amount >= 0 ? styles.positiveBalance : styles.negativeBalance]}>
                    {transaction.amount >= 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Botão de Adicionar */}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.addButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Adicionar Nova Conta</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Adicionar Conta */}
      <AddAccountModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  balanceCard: {
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  balanceGradient: {
    padding: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  balanceSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a237e',
    marginBottom: 12,
  },
  accountCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 4,
  },
  accountDetails: {
    fontSize: 13,
    color: '#78909c',
  },
  accountBalanceContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eceff1',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountBalance: {
    fontSize: 20,
    fontWeight: '700',
  },
  positiveBalance: {
    color: '#4caf50',
  },
  negativeBalance: {
    color: '#f44336',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#e8eaf6',
    borderRadius: 8,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    marginRight: 4,
  },
  transactionsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
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
    borderBottomColor: '#eceff1',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 4,
  },
  transactionAccount: {
    fontSize: 12,
    color: '#78909c',
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 11,
    color: '#78909c',
  },
  addButton: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 12,
  },
});
