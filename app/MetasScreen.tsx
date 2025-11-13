import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddGoalModal from '../components/modals/AddGoalModal';

const initialGoals = [
  { id: 1, title: 'Viagem para Europa', target: 15000, current: 8500, deadline: '2024-12-31', icon: 'airplane' as const, color: '#2196f3' },
  { id: 2, title: 'Carro Novo', target: 45000, current: 12000, deadline: '2025-06-30', icon: 'car-sport' as const, color: '#f44336' },
  { id: 3, title: 'Reserva de Emergência', target: 20000, current: 8950, deadline: '2024-08-31', icon: 'shield-checkmark' as const, color: '#4caf50' },
  { id: 4, title: 'Casa Própria', target: 150000, current: 45000, deadline: '2028-12-31', icon: 'home' as const, color: '#ff9800' },
];

export default function MetasScreen({ onMenu }: any) {
  const [goals, setGoals] = useState(initialGoals);
  const [modalVisible, setModalVisible] = useState(false);
  
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);
  const overallProgress = (totalCurrent / totalTarget) * 100;

  const handleAddGoal = (newGoal: any) => {
    setGoals([...goals, newGoal]);
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
        <Text style={styles.headerTitle}>Metas</Text>
        <View style={styles.menuButton} />
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Card de Progresso Geral */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.summaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.summaryHeader}>
              <Ionicons name="trophy-outline" size={32} color="#fff" />
              <Text style={styles.summaryLabel}>Progresso Total das Metas</Text>
            </View>
            
            {/* Barra de Progresso Circular */}
            <View style={styles.progressCircleContainer}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressPercentage}>{overallProgress.toFixed(0)}%</Text>
                <Text style={styles.progressSubtext}>Concluído</Text>
              </View>
            </View>

            <View style={styles.summaryValues}>
              <View style={styles.summaryValueItem}>
                <Text style={styles.summaryValueLabel}>Economizado</Text>
                <Text style={styles.summaryValueAmount}>
                  R$ {totalCurrent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryValueItem}>
                <Text style={styles.summaryValueLabel}>Meta Total</Text>
                <Text style={styles.summaryValueAmount}>
                  R$ {totalTarget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Seção de Metas Ativas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metas Ativas ({goals.length})</Text>
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const remaining = goal.target - goal.current;
            const daysRemaining = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

            return (
              <View key={goal.id} style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: `${goal.color}15` }]}>
                    <Ionicons name={goal.icon} size={24} color={goal.color} />
                  </View>
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Text style={styles.goalDeadline}>
                      <Ionicons name="calendar-outline" size={12} color="#78909c" /> 
                      {' '}{new Date(goal.deadline).toLocaleDateString('pt-BR')} ({daysRemaining} dias)
                    </Text>
                  </View>
                </View>

                {/* Valores */}
                <View style={styles.goalValues}>
                  <View style={styles.goalValueItem}>
                    <Text style={styles.goalValueLabel}>Economizado</Text>
                    <Text style={[styles.goalValueAmount, { color: goal.color }]}>
                      R$ {goal.current.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Text>
                  </View>
                  <View style={styles.goalValueItem}>
                    <Text style={styles.goalValueLabel}>Meta</Text>
                    <Text style={styles.goalValueAmount}>
                      R$ {goal.target.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Text>
                  </View>
                  <View style={styles.goalValueItem}>
                    <Text style={styles.goalValueLabel}>Faltam</Text>
                    <Text style={styles.goalRemainingAmount}>
                      R$ {remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Text>
                  </View>
                </View>

                {/* Barra de Progresso */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <LinearGradient
                      colors={[goal.color, `${goal.color}AA`]}
                      style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    />
                  </View>
                  <Text style={styles.progressText}>{progress.toFixed(1)}% alcançado</Text>
                </View>

                {/* Botões de Ação */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.contributeButton}>
                    <LinearGradient
                      colors={[goal.color, `${goal.color}CC`]}
                      style={styles.contributeButtonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name="add-circle-outline" size={18} color="#fff" />
                      <Text style={styles.contributeButtonText}>Contribuir</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.detailsButtonOutline}>
                    <Text style={[styles.detailsButtonOutlineText, { color: goal.color }]}>Detalhes</Text>
                    <Ionicons name="chevron-forward" size={16} color={goal.color} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Cards de Dicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dicas para Alcançar Metas</Text>
          <View style={styles.tipCard}>
            <View style={[styles.tipIconContainer, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="calendar-outline" size={24} color="#4caf50" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Seja consistente</Text>
              <Text style={styles.tipText}>
                Faça aportes regulares, mesmo que pequenos. A consistência é a chave para alcançar suas metas.
              </Text>
            </View>
          </View>

          <View style={styles.tipCard}>
            <View style={[styles.tipIconContainer, { backgroundColor: '#fff3e0' }]}>
              <Ionicons name="rocket-outline" size={24} color="#ff9800" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Priorize suas metas</Text>
              <Text style={styles.tipText}>
                Foque primeiro nas metas com prazos mais curtos ou mais importantes para você.
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
            <Text style={styles.addButtonText}>Criar Nova Meta</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Adicionar Meta */}
      <AddGoalModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddGoal}
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
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
    fontWeight: '600',
  },
  progressCircleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#fff',
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  progressSubtext: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  summaryValues: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryValueItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  summaryValueLabel: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 4,
    opacity: 0.9,
  },
  summaryValueAmount: {
    fontSize: 16,
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
  goalCard: {
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
  goalHeader: {
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
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 4,
  },
  goalDeadline: {
    fontSize: 13,
    color: '#78909c',
  },
  goalValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eceff1',
  },
  goalValueItem: {
    flex: 1,
  },
  goalValueLabel: {
    fontSize: 11,
    color: '#78909c',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  goalValueAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a237e',
  },
  goalRemainingAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f44336',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#eceff1',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#78909c',
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  contributeButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contributeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  contributeButtonText: {
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
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eceff1',
  },
  detailsButtonOutlineText: {
    fontSize: 14,
    fontWeight: '600',
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
