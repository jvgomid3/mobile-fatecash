import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = [
  { id: 1, name: 'Alimentação', budgeted: 800, spent: 650, color: '#ef4444', icon: 'restaurant' as const },
  { id: 2, name: 'Transporte', budgeted: 400, spent: 380, color: '#f97316', icon: 'car' as const },
  { id: 3, name: 'Moradia', budgeted: 1200, spent: 1200, color: '#eab308', icon: 'home' as const },
  { id: 4, name: 'Saúde', budgeted: 300, spent: 150, color: '#22c55e', icon: 'fitness' as const },
  { id: 5, name: 'Lazer', budgeted: 500, spent: 420, color: '#8b5cf6', icon: 'game-controller' as const },
  { id: 6, name: 'Educação', budgeted: 600, spent: 600, color: '#3b82f6', icon: 'school' as const },
  { id: 7, name: 'Vestuário', budgeted: 300, spent: 180, color: '#ec4899', icon: 'shirt' as const },
  { id: 8, name: 'Outros', budgeted: 200, spent: 95, color: '#6b7280', icon: 'ellipsis-horizontal' as const },
];

export default function OrcamentoScreen({ onMenu }: any) {
  const totalBudgeted = categories.reduce((s, c) => s + c.budgeted, 0);
  const totalSpent = categories.reduce((s, c) => s + c.spent, 0);
  const totalAvailable = totalBudgeted - totalSpent;
  const overallProgress = (totalSpent / totalBudgeted) * 100;

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
        <Text style={styles.headerTitle}>Orçamento</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="calendar-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Card de Resumo com Gráfico Circular */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.summaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.summaryTitle}>Resumo do Mês</Text>
            <Text style={styles.summaryMonth}>Janeiro 2024</Text>

            {/* Gráfico de Pizza Simplificado */}
            <View style={styles.chartContainer}>
              <View style={styles.pieChart}>
                <View style={styles.pieChartInner}>
                  <Text style={styles.pieChartPercentage}>{overallProgress.toFixed(0)}%</Text>
                  <Text style={styles.pieChartLabel}>Utilizado</Text>
                </View>
              </View>
              
              {/* Legenda do Gráfico */}
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#4caf50' }]} />
                  <View>
                    <Text style={styles.legendLabel}>Disponível</Text>
                    <Text style={styles.legendValue}>R$ {totalAvailable.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
                  </View>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#f44336' }]} />
                  <View>
                    <Text style={styles.legendLabel}>Gasto</Text>
                    <Text style={styles.legendValue}>R$ {totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Cards de Valores */}
            <View style={styles.summaryValues}>
              <View style={styles.summaryValueCard}>
                <Ionicons name="wallet-outline" size={20} color="#fff" />
                <Text style={styles.summaryValueLabel}>Orçamento Total</Text>
                <Text style={styles.summaryValueAmount}>
                  R$ {totalBudgeted.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
              </View>
              <View style={styles.summaryValueCard}>
                <Ionicons name="trending-down-outline" size={20} color="#fff" />
                <Text style={styles.summaryValueLabel}>Total Gasto</Text>
                <Text style={styles.summaryValueAmount}>
                  R$ {totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Seção de Categorias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias de Gastos</Text>
          {categories.map((category) => {
            const progress = (category.spent / category.budgeted) * 100;
            const available = category.budgeted - category.spent;
            const isOverBudget = category.spent > category.budgeted;

            return (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={[styles.categoryIconContainer, { backgroundColor: `${category.color}15` }]}>
                    <Ionicons name={category.icon} size={24} color={category.color} />
                  </View>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <View style={styles.categoryStats}>
                      <Text style={styles.categorySpent}>
                        R$ {category.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </Text>
                      <Text style={styles.categorySeparator}>/</Text>
                      <Text style={styles.categoryBudget}>
                        R$ {category.budgeted.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.categoryRight}>
                    {isOverBudget ? (
                      <View style={styles.warningBadge}>
                        <Ionicons name="warning" size={16} color="#f44336" />
                        <Text style={styles.warningText}>Excedido</Text>
                      </View>
                    ) : (
                      <Text style={[styles.categoryAvailable, { color: category.color }]}>
                        R$ {available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Barra de Progresso Horizontal */}
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { 
                          width: `${Math.min(progress, 100)}%`,
                          backgroundColor: isOverBudget ? '#f44336' : category.color
                        }
                      ]}
                    />
                  </View>
                  <Text style={[styles.progressText, isOverBudget && styles.overBudgetText]}>
                    {progress.toFixed(0)}%
                  </Text>
                </View>

                {/* Gráfico de Barras Visual */}
                <View style={styles.miniBarChart}>
                  <View style={styles.miniBar}>
                    <View style={[styles.miniBarFill, { width: `${(category.spent / totalBudgeted) * 100}%`, backgroundColor: category.color }]} />
                  </View>
                  <Text style={styles.miniBarLabel}>
                    {((category.spent / totalSpent) * 100).toFixed(1)}% do total
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Card de Análise */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Análise e Insights</Text>
          
          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="checkmark-circle" size={28} color="#4caf50" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Bom controle!</Text>
              <Text style={styles.insightText}>
                Você está dentro do orçamento em 6 de 8 categorias. Continue assim!
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: '#fff3e0' }]}>
              <Ionicons name="alert-circle" size={28} color="#ff9800" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Atenção: Moradia</Text>
              <Text style={styles.insightText}>
                Você atingiu 100% do orçamento de Moradia. Considere revisar seus gastos.
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: '#e3f2fd' }]}>
              <Ionicons name="bulb" size={28} color="#2196f3" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Economia em Saúde</Text>
              <Text style={styles.insightText}>
                Você economizou R$ 150,00 em Saúde este mês. Que tal transferir para suas metas?
              </Text>
            </View>
          </View>
        </View>

        {/* Botão de Ajustar Orçamento */}
        <TouchableOpacity style={styles.adjustButton}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.adjustButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="settings-outline" size={24} color="#fff" />
            <Text style={styles.adjustButtonText}>Ajustar Orçamento</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  summaryMonth: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pieChart: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(244, 67, 54, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 12,
    borderColor: 'rgba(76, 175, 80, 0.5)',
  },
  pieChartInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieChartPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  pieChartLabel: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.9,
  },
  chartLegend: {
    flex: 1,
    marginLeft: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 2,
  },
  legendValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  summaryValues: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryValueCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
  },
  summaryValueLabel: {
    fontSize: 11,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
    marginBottom: 4,
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
  categoryCard: {
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
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 4,
  },
  categoryStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categorySpent: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a237e',
  },
  categorySeparator: {
    fontSize: 14,
    color: '#78909c',
    marginHorizontal: 4,
  },
  categoryBudget: {
    fontSize: 14,
    color: '#78909c',
  },
  categoryRight: {
    alignItems: 'flex-end',
  },
  categoryAvailable: {
    fontSize: 14,
    fontWeight: '700',
  },
  warningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  warningText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#f44336',
    marginLeft: 4,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#eceff1',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#78909c',
    width: 40,
    textAlign: 'right',
  },
  overBudgetText: {
    color: '#f44336',
  },
  miniBarChart: {
    marginTop: 8,
  },
  miniBar: {
    height: 4,
    backgroundColor: '#eceff1',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  miniBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  miniBarLabel: {
    fontSize: 11,
    color: '#78909c',
  },
  insightCard: {
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
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 13,
    color: '#78909c',
    lineHeight: 18,
  },
  adjustButton: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  adjustButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  adjustButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 12,
  },
});
