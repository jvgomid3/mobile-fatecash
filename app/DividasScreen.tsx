import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddDebtModal from '../components/modals/AddDebtModal';

const initialDebts = [
  { id: 1, name: 'Financiamento do Carro', remaining: 18500, monthly: 650, dueDate: '2026-12-31', icon: 'car-sport' as const, progress: 0.35 },
  { id: 2, name: 'Cartão Nubank', remaining: 1250, monthly: 300, dueDate: '2024-06-15', icon: 'card' as const, progress: 0.75 },
  { id: 3, name: 'Empréstimo Pessoal', remaining: 3200, monthly: 450, dueDate: '2024-12-31', icon: 'cash' as const, progress: 0.60 },
  { id: 4, name: 'Cartão Itaú', remaining: 850, monthly: 200, dueDate: '2024-05-30', icon: 'card' as const, progress: 0.85 },
];

export default function DividasScreen({ onMenu }: any) {
  const [debts, setDebts] = useState(initialDebts);
  const [modalVisible, setModalVisible] = useState(false);
  
  const totalDebt = debts.reduce((sum, debt) => sum + debt.remaining, 0);
  const totalMonthly = debts.reduce((sum, debt) => sum + debt.monthly, 0);

  const handleAddDebt = (newDebt: any) => {
    setDebts([...debts, newDebt]);
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
        <Text style={styles.headerTitle}>Dívidas</Text>
        <View style={styles.menuButton} />
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Card de Resumo Total */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={['#dc2626', '#ef4444', '#f87171']}
            style={styles.summaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Ionicons name="warning-outline" size={28} color="#fff" />
                <Text style={styles.summaryLabel}>Total em Dívidas</Text>
                <Text style={styles.summaryAmount}>
                  R$ {totalDebt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Ionicons name="calendar-outline" size={28} color="#fff" />
                <Text style={styles.summaryLabel}>Mensal Total</Text>
                <Text style={styles.summaryAmount}>
                  R$ {totalMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Seção de Dívidas Ativas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dívidas Ativas ({debts.length})</Text>
          {debts.map((debt) => (
            <View key={debt.id} style={styles.debtCard}>
              <View style={styles.debtHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#ffebee' }]}>
                  <Ionicons name={debt.icon} size={24} color="#f44336" />
                </View>
                <View style={styles.debtInfo}>
                  <Text style={styles.debtName}>{debt.name}</Text>
                  <Text style={styles.debtDueDate}>
                    Vencimento: {new Date(debt.dueDate).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              </View>

              {/* Barra de Progresso */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${debt.progress * 100}%` }]} />
                </View>
                <Text style={styles.progressText}>{Math.round(debt.progress * 100)}% pago</Text>
              </View>

              {/* Valores */}
              <View style={styles.debtValues}>
                <View style={styles.valueItem}>
                  <Text style={styles.valueLabel}>Saldo Devedor</Text>
                  <Text style={styles.debtAmount}>
                    R$ {debt.remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Text>
                </View>
                <View style={styles.valueItem}>
                  <Text style={styles.valueLabel}>Parcela Mensal</Text>
                  <Text style={styles.monthlyAmount}>
                    R$ {debt.monthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Text>
                </View>
              </View>

              {/* Botões de Ação */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.payButton}>
                  <LinearGradient
                    colors={['#dc2626', '#ef4444']}
                    style={styles.payButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="cash-outline" size={18} color="#fff" />
                    <Text style={styles.payButtonText}>Pagar Parcela</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButtonOutline}>
                  <Text style={styles.detailsButtonOutlineText}>Detalhes</Text>
                  <Ionicons name="chevron-forward" size={16} color="#dc2626" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Cards de Dicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dicas para Quitar Dívidas</Text>
          <View style={styles.tipCard}>
            <View style={[styles.tipIconContainer, { backgroundColor: '#e3f2fd' }]}>
              <Ionicons name="bulb-outline" size={24} color="#2196f3" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Priorize juros altos</Text>
              <Text style={styles.tipText}>
                Quite primeiro as dívidas com maiores taxas de juros para economizar no longo prazo.
              </Text>
            </View>
          </View>

          <View style={styles.tipCard}>
            <View style={[styles.tipIconContainer, { backgroundColor: '#f3e5f5' }]}>
              <Ionicons name="trending-down-outline" size={24} color="#9c27b0" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Negocie condições</Text>
              <Text style={styles.tipText}>
                Entre em contato com os credores para renegociar prazos e valores.
              </Text>
            </View>
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
            <Text style={styles.addButtonText}>Registrar Nova Dívida</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Adicionar Dívida */}
      <AddDebtModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddDebt}
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
  summaryCard: {
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
  summaryGradient: {
    padding: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
    marginBottom: 8,
    opacity: 0.9,
    textAlign: 'center',
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
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
  debtCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  debtHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  debtInfo: {
    flex: 1,
  },
  debtName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 4,
  },
  debtDueDate: {
    fontSize: 13,
    color: '#78909c',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eceff1',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#78909c',
    textAlign: 'right',
  },
  debtValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eceff1',
  },
  valueItem: {
    flex: 1,
  },
  valueLabel: {
    fontSize: 12,
    color: '#78909c',
    marginBottom: 4,
  },
  debtAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f44336',
  },
  monthlyAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a237e',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  payButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  payButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  payButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 8,
  },
  detailsButtonOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffebee',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  detailsButtonOutlineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
    marginRight: 4,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#78909c',
    lineHeight: 18,
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
