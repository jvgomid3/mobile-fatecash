import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ onMenu, onNavigate }: any) {
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
          <View>
            <Text style={styles.greeting}>Olá, Usuário!</Text>
            <Text style={styles.subtitle}>Bem-vindo ao FateCash</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={onMenu}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Card de Saldo Principal */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Saldo Total</Text>
            <TouchableOpacity>
              <Ionicons name="eye-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>R$ 12.450,80</Text>
          <View style={styles.balanceFooter}>
            <View style={styles.balanceItem}>
              <Ionicons name="trending-up" size={16} color="#4caf50" />
              <Text style={styles.balanceChange}>+12,5%</Text>
            </View>
            <Text style={styles.balanceDate}>Última atualização: hoje</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Navigation Cards */}
      <View style={styles.navigationSection}>
        <Text style={styles.sectionTitle}>Acesso Rápido</Text>
        <View style={styles.navigationGrid}>
          <TouchableOpacity 
            style={styles.navCard}
            onPress={() => onNavigate && onNavigate('carteira')}
          >
            <View style={[styles.navIconContainer, { backgroundColor: '#e3f2fd' }]}>
              <Ionicons name="wallet" size={32} color="#1976d2" />
            </View>
            <Text style={styles.navCardTitle}>Carteira</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navCard}
            onPress={() => onNavigate && onNavigate('contas')}
          >
            <View style={[styles.navIconContainer, { backgroundColor: '#fff3e0' }]}>
              <Ionicons name="card" size={32} color="#f57c00" />
            </View>
            <Text style={styles.navCardTitle}>Contas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navCard}
            onPress={() => onNavigate && onNavigate('dividas')}
          >
            <View style={[styles.navIconContainer, { backgroundColor: '#ffebee' }]}>
              <Ionicons name="alert-circle" size={32} color="#d32f2f" />
            </View>
            <Text style={styles.navCardTitle}>Dívidas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navCard}
            onPress={() => onNavigate && onNavigate('metas')}
          >
            <View style={[styles.navIconContainer, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="trophy" size={32} color="#388e3c" />
            </View>
            <Text style={styles.navCardTitle}>Metas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navCard}
            onPress={() => onNavigate && onNavigate('orcamento')}
          >
            <View style={[styles.navIconContainer, { backgroundColor: '#f3e5f5' }]}>
              <Ionicons name="pie-chart" size={32} color="#7b1fa2" />
            </View>
            <Text style={styles.navCardTitle}>Orçamento</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navCard}
            onPress={() => onNavigate && onNavigate('planejamento')}
          >
            <View style={[styles.navIconContainer, { backgroundColor: '#e0f2f1' }]}>
              <Ionicons name="calendar" size={32} color="#00796b" />
            </View>
            <Text style={styles.navCardTitle}>Planejamento</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards de Informações */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Resumo Financeiro</Text>
        
        {/* Card Receitas vs Despesas */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <Text style={styles.infoCardTitle}>Este Mês</Text>
            <Ionicons name="calendar-outline" size={20} color="#666" />
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="arrow-down-circle" size={24} color="#4caf50" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Receitas</Text>
                <Text style={styles.infoValue}>R$ 8.500,00</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="arrow-up-circle" size={24} color="#f44336" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Despesas</Text>
                <Text style={styles.infoValue}>R$ 3.420,50</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card Metas */}
        <TouchableOpacity style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <Text style={styles.infoCardTitle}>Metas em Progresso</Text>
            <Ionicons name="flag-outline" size={20} color="#666" />
          </View>
          <View style={styles.goalProgress}>
            <View style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalName}>Viagem</Text>
                <Text style={styles.goalPercent}>65%</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '65%', backgroundColor: '#2196f3' }]} />
              </View>
            </View>
            <View style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalName}>Notebook</Text>
                <Text style={styles.goalPercent}>40%</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '40%', backgroundColor: '#ff9800' }]} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Card Investimentos */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <Text style={styles.infoCardTitle}>Investimentos</Text>
            <Ionicons name="trending-up-outline" size={20} color="#666" />
          </View>
          <View style={styles.investmentRow}>
            <View style={styles.investmentItem}>
              <View style={[styles.investmentDot, { backgroundColor: '#4caf50' }]} />
              <View>
                <Text style={styles.investmentLabel}>Renda Fixa</Text>
                <Text style={styles.investmentValue}>R$ 5.200,00</Text>
              </View>
            </View>
            <View style={styles.investmentItem}>
              <View style={[styles.investmentDot, { backgroundColor: '#2196f3' }]} />
              <View>
                <Text style={styles.investmentLabel}>Renda Variável</Text>
                <Text style={styles.investmentValue}>R$ 3.800,00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card Dicas */}
        <View style={[styles.infoCard, styles.tipCard]}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb" size={24} color="#ffa726" />
            <Text style={styles.tipTitle}>Dica Financeira</Text>
          </View>
          <Text style={styles.tipText}>
            Você está gastando 15% a menos que no mês passado. Continue assim!
          </Text>
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
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#e3f2fd',
    marginTop: 4,
  },
  notificationButton: {
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
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#e3f2fd',
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
  quickActions: {
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
  navigationSection: {
    paddingHorizontal: 20,
    marginTop: -80,
    marginBottom: 24,
  },
  navigationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  navCard: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  navIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  navCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#263238',
    textAlign: 'center',
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a237e',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#78909c',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#263238',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  goalProgress: {
    gap: 16,
  },
  goalItem: {
    gap: 8,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474f',
  },
  goalPercent: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a237e',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  investmentRow: {
    gap: 16,
  },
  investmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  investmentDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  investmentLabel: {
    fontSize: 13,
    color: '#78909c',
    marginBottom: 2,
  },
  investmentValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#263238',
  },
  tipCard: {
    backgroundColor: '#fff8e1',
    borderLeftWidth: 4,
    borderLeftColor: '#ffa726',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e65100',
  },
  tipText: {
    fontSize: 14,
    color: '#6d4c41',
    lineHeight: 20,
  },
});
