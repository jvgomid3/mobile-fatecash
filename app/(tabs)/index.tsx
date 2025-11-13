import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
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
            <ThemedText style={styles.greeting}>Olá, Usuário!</ThemedText>
            <ThemedText style={styles.subtitle}>Bem-vindo ao FateCash</ThemedText>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Card de Saldo Principal */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <ThemedText style={styles.balanceLabel}>Saldo Total</ThemedText>
            <TouchableOpacity>
              <Ionicons name="eye-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <ThemedText style={styles.balanceAmount}>R$ 12.450,80</ThemedText>
          <View style={styles.balanceFooter}>
            <View style={styles.balanceItem}>
              <Ionicons name="trending-up" size={16} color="#4caf50" />
              <ThemedText style={styles.balanceChange}>+12,5%</ThemedText>
            </View>
            <ThemedText style={styles.balanceDate}>Última atualização: hoje</ThemedText>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <ThemedText style={styles.sectionTitle}>Ações Rápidas</ThemedText>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#e3f2fd' }]}>
              <Ionicons name="add-circle" size={28} color="#1976d2" />
            </View>
            <ThemedText style={styles.actionText}>Adicionar</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#f3e5f5' }]}>
              <Ionicons name="swap-horizontal" size={28} color="#7b1fa2" />
            </View>
            <ThemedText style={styles.actionText}>Transferir</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#fff3e0' }]}>
              <Ionicons name="card" size={28} color="#f57c00" />
            </View>
            <ThemedText style={styles.actionText}>Cartões</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="stats-chart" size={28} color="#388e3c" />
            </View>
            <ThemedText style={styles.actionText}>Relatórios</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards de Informações */}
      <View style={styles.infoSection}>
        <ThemedText style={styles.sectionTitle}>Resumo Financeiro</ThemedText>
        
        {/* Card Receitas vs Despesas */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <ThemedText style={styles.infoCardTitle}>Este Mês</ThemedText>
            <Ionicons name="calendar-outline" size={20} color="#666" />
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="arrow-down-circle" size={24} color="#4caf50" />
              </View>
              <View>
                <ThemedText style={styles.infoLabel}>Receitas</ThemedText>
                <ThemedText style={styles.infoValue}>R$ 8.500,00</ThemedText>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="arrow-up-circle" size={24} color="#f44336" />
              </View>
              <View>
                <ThemedText style={styles.infoLabel}>Despesas</ThemedText>
                <ThemedText style={styles.infoValue}>R$ 3.420,50</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Card Metas */}
        <TouchableOpacity style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <ThemedText style={styles.infoCardTitle}>Metas em Progresso</ThemedText>
            <Ionicons name="flag-outline" size={20} color="#666" />
          </View>
          <View style={styles.goalProgress}>
            <View style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <ThemedText style={styles.goalName}>Viagem</ThemedText>
                <ThemedText style={styles.goalPercent}>65%</ThemedText>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '65%', backgroundColor: '#2196f3' }]} />
              </View>
            </View>
            <View style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <ThemedText style={styles.goalName}>Notebook</ThemedText>
                <ThemedText style={styles.goalPercent}>40%</ThemedText>
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
            <ThemedText style={styles.infoCardTitle}>Investimentos</ThemedText>
            <Ionicons name="trending-up-outline" size={20} color="#666" />
          </View>
          <View style={styles.investmentRow}>
            <View style={styles.investmentItem}>
              <View style={[styles.investmentDot, { backgroundColor: '#4caf50' }]} />
              <View>
                <ThemedText style={styles.investmentLabel}>Renda Fixa</ThemedText>
                <ThemedText style={styles.investmentValue}>R$ 5.200,00</ThemedText>
              </View>
            </View>
            <View style={styles.investmentItem}>
              <View style={[styles.investmentDot, { backgroundColor: '#2196f3' }]} />
              <View>
                <ThemedText style={styles.investmentLabel}>Renda Variável</ThemedText>
                <ThemedText style={styles.investmentValue}>R$ 3.800,00</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Card Dicas */}
        <View style={[styles.infoCard, styles.tipCard]}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb" size={24} color="#ffa726" />
            <ThemedText style={styles.tipTitle}>Dica Financeira</ThemedText>
          </View>
          <ThemedText style={styles.tipText}>
            Você está gastando 15% a menos que no mês passado. Continue assim!
          </ThemedText>
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
    backdropFilter: 'blur(10px)',
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
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  actionCard: {
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#37474f',
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
