import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const monthlyData = [
  { month: 'Jan', receita: 5800, gastos: 3200, economia: 2600 },
  { month: 'Fev', receita: 5800, gastos: 3400, economia: 2400 },
  { month: 'Mar', receita: 6200, gastos: 3100, economia: 3100 },
  { month: 'Abr', receita: 5800, gastos: 3500, economia: 2300 },
  { month: 'Mai', receita: 6500, gastos: 3300, economia: 3200 },
  { month: 'Jun', receita: 5800, gastos: 3600, economia: 2200 },
  { month: 'Jul', receita: 5800, gastos: 3250, economia: 2550 },
  { month: 'Ago', receita: 6000, gastos: 3400, economia: 2600 },
  { month: 'Set', receita: 5800, gastos: 3150, economia: 2650 },
  { month: 'Out', receita: 6200, gastos: 3300, economia: 2900 },
  { month: 'Nov', receita: 5800, gastos: 3500, economia: 2300 },
  { month: 'Dez', receita: 7200, gastos: 4200, economia: 3000 },
];

const yearlyProjection = [
  { year: '2023', receita: 68000, gastos: 39000, economia: 29000 },
  { year: '2024', receita: 72600, gastos: 40400, economia: 32200 },
  { year: '2025', receita: 78000, gastos: 42000, economia: 36000 },
  { year: '2026', receita: 85000, gastos: 44000, economia: 41000 },
];

export default function PlanejamentoScreen({ onMenu }: any) {
  const [selectedView, setSelectedView] = useState<'monthly' | 'yearly'>('monthly');
  
  const currentYear = monthlyData.reduce((sum, m) => sum + m.receita, 0);
  const currentYearExpenses = monthlyData.reduce((sum, m) => sum + m.gastos, 0);
  const currentYearSavings = monthlyData.reduce((sum, m) => sum + m.economia, 0);
  
  const avgMonthlyIncome = currentYear / 12;
  const avgMonthlyExpenses = currentYearExpenses / 12;
  
  const maxValue = Math.max(...monthlyData.map(m => Math.max(m.receita, m.gastos)));

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
        <Text style={styles.headerTitle}>Planejamento</Text>
        <View style={styles.menuButton} />
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Card de Resumo Anual */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.summaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.summaryHeader}>
              <Ionicons name="trending-up-outline" size={32} color="#fff" />
              <Text style={styles.summaryTitle}>Visão Anual 2024</Text>
            </View>

            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Ionicons name="arrow-down-circle-outline" size={24} color="#fff" />
                <Text style={styles.summaryLabel}>Receita Total</Text>
                <Text style={styles.summaryValue}>
                  R$ {currentYear.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={styles.summarySubtext}>
                  Média: R$ {avgMonthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                </Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryItem}>
                <Ionicons name="arrow-up-circle-outline" size={24} color="#fff" />
                <Text style={styles.summaryLabel}>Gastos Total</Text>
                <Text style={styles.summaryValue}>
                  R$ {currentYearExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={styles.summarySubtext}>
                  Média: R$ {avgMonthlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                </Text>
              </View>
            </View>

            <View style={styles.savingsCard}>
              <Text style={styles.savingsLabel}>💰 Economia Anual</Text>
              <Text style={styles.savingsValue}>
                R$ {currentYearSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Toggle de Visualização */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedView === 'monthly' && styles.toggleButtonActive]}
            onPress={() => setSelectedView('monthly')}
          >
            <Ionicons 
              name="calendar-outline" 
              size={20} 
              color={selectedView === 'monthly' ? '#fff' : '#667eea'} 
            />
            <Text style={[styles.toggleText, selectedView === 'monthly' && styles.toggleTextActive]}>
              Mensal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedView === 'yearly' && styles.toggleButtonActive]}
            onPress={() => setSelectedView('yearly')}
          >
            <Ionicons 
              name="stats-chart-outline" 
              size={20} 
              color={selectedView === 'yearly' ? '#fff' : '#667eea'} 
            />
            <Text style={[styles.toggleText, selectedView === 'yearly' && styles.toggleTextActive]}>
              Anual
            </Text>
          </TouchableOpacity>
        </View>

        {/* Visualização Mensal */}
        {selectedView === 'monthly' && (
          <>
            {/* Gráfico de Barras Mensal */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📊 Evolução Mensal 2024</Text>
              <View style={styles.chartCard}>
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#4caf50' }]} />
                    <Text style={styles.legendText}>Receita</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#f44336' }]} />
                    <Text style={styles.legendText}>Gastos</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#2196f3' }]} />
                    <Text style={styles.legendText}>Economia</Text>
                  </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.chart}>
                    {monthlyData.map((data, index) => (
                      <View key={index} style={styles.barGroup}>
                        <View style={styles.bars}>
                          <View style={styles.barContainer}>
                            <View
                              style={[
                                styles.bar,
                                { height: (data.receita / maxValue) * 120, backgroundColor: '#4caf50' }
                              ]}
                            />
                          </View>
                          <View style={styles.barContainer}>
                            <View
                              style={[
                                styles.bar,
                                { height: (data.gastos / maxValue) * 120, backgroundColor: '#f44336' }
                              ]}
                            />
                          </View>
                          <View style={styles.barContainer}>
                            <View
                              style={[
                                styles.bar,
                                { height: (data.economia / maxValue) * 120, backgroundColor: '#2196f3' }
                              ]}
                            />
                          </View>
                        </View>
                        <Text style={styles.barLabel}>{data.month}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>

            {/* Cards Mensais Detalhados */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Detalhamento Mensal</Text>
              {monthlyData.map((data, index) => {
                const savingsRate = (data.economia / data.receita) * 100;
                return (
                  <View key={index} style={styles.monthCard}>
                    <View style={styles.monthHeader}>
                      <View style={styles.monthIcon}>
                        <Ionicons name="calendar" size={24} color="#667eea" />
                      </View>
                      <View style={styles.monthInfo}>
                        <Text style={styles.monthName}>{data.month} 2024</Text>
                        <Text style={styles.monthSavings}>
                          Taxa de Economia: {savingsRate.toFixed(1)}%
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#78909c" />
                    </View>

                    <View style={styles.monthValues}>
                      <View style={styles.monthValueItem}>
                        <View style={[styles.valueIcon, { backgroundColor: '#e8f5e9' }]}>
                          <Ionicons name="arrow-down" size={16} color="#4caf50" />
                        </View>
                        <Text style={styles.valueLabel}>Receita</Text>
                        <Text style={[styles.valueAmount, { color: '#4caf50' }]}>
                          R$ {data.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Text>
                      </View>

                      <View style={styles.monthValueItem}>
                        <View style={[styles.valueIcon, { backgroundColor: '#ffebee' }]}>
                          <Ionicons name="arrow-up" size={16} color="#f44336" />
                        </View>
                        <Text style={styles.valueLabel}>Gastos</Text>
                        <Text style={[styles.valueAmount, { color: '#f44336' }]}>
                          R$ {data.gastos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Text>
                      </View>

                      <View style={styles.monthValueItem}>
                        <View style={[styles.valueIcon, { backgroundColor: '#e3f2fd' }]}>
                          <Ionicons name="wallet" size={16} color="#2196f3" />
                        </View>
                        <Text style={styles.valueLabel}>Economia</Text>
                        <Text style={[styles.valueAmount, { color: '#2196f3' }]}>
                          R$ {data.economia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}

        {/* Visualização Anual */}
        {selectedView === 'yearly' && (
          <>
            {/* Projeção Plurianual */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📈 Projeção Plurianual</Text>
              <View style={styles.chartCard}>
                <View style={styles.yearlyChart}>
                  {yearlyProjection.map((year, index) => {
                    const maxYearValue = Math.max(...yearlyProjection.map(y => y.receita));
                    const growthRate = index > 0 
                      ? ((year.receita - yearlyProjection[index - 1].receita) / yearlyProjection[index - 1].receita) * 100 
                      : 0;

                    return (
                      <View key={index} style={styles.yearCard}>
                        <View style={styles.yearHeader}>
                          <Text style={styles.yearLabel}>{year.year}</Text>
                          {growthRate > 0 && (
                            <View style={styles.growthBadge}>
                              <Ionicons name="trending-up" size={12} color="#4caf50" />
                              <Text style={styles.growthText}>+{growthRate.toFixed(1)}%</Text>
                            </View>
                          )}
                        </View>

                        {/* Barra de Progresso Visual */}
                        <View style={styles.yearBar}>
                          <View
                            style={[
                              styles.yearBarFill,
                              { width: `${(year.receita / maxYearValue) * 100}%` }
                            ]}
                          >
                            <LinearGradient
                              colors={['#667eea', '#764ba2']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.yearBarGradient}
                            />
                          </View>
                        </View>

                        <View style={styles.yearValues}>
                          <View style={styles.yearValueItem}>
                            <Text style={styles.yearValueLabel}>Receita</Text>
                            <Text style={styles.yearValueAmount}>
                              R$ {(year.receita / 1000).toFixed(0)}k
                            </Text>
                          </View>
                          <View style={styles.yearValueItem}>
                            <Text style={styles.yearValueLabel}>Gastos</Text>
                            <Text style={styles.yearValueAmount}>
                              R$ {(year.gastos / 1000).toFixed(0)}k
                            </Text>
                          </View>
                          <View style={styles.yearValueItem}>
                            <Text style={[styles.yearValueLabel, { color: '#4caf50' }]}>Economia</Text>
                            <Text style={[styles.yearValueAmount, { color: '#4caf50' }]}>
                              R$ {(year.economia / 1000).toFixed(0)}k
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* Cards de Análise Anual */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Análise de Crescimento</Text>
              
              <View style={styles.insightCard}>
                <View style={[styles.insightIcon, { backgroundColor: '#e8f5e9' }]}>
                  <Ionicons name="trending-up" size={28} color="#4caf50" />
                </View>
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>Crescimento Projetado</Text>
                  <Text style={styles.insightText}>
                    Sua receita tem crescimento projetado de 7,5% ao ano. Mantenha o foco!
                  </Text>
                </View>
              </View>

              <View style={styles.insightCard}>
                <View style={[styles.insightIcon, { backgroundColor: '#e3f2fd' }]}>
                  <Ionicons name="wallet-outline" size={28} color="#2196f3" />
                </View>
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>Meta de Economia</Text>
                  <Text style={styles.insightText}>
                    Em 2026, você pode economizar R$ 41.000,00 mantendo o padrão atual.
                  </Text>
                </View>
              </View>

              <View style={styles.insightCard}>
                <View style={[styles.insightIcon, { backgroundColor: '#fff3e0' }]}>
                  <Ionicons name="analytics-outline" size={28} color="#ff9800" />
                </View>
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>Controle de Gastos</Text>
                  <Text style={styles.insightText}>
                    Seus gastos crescem 5,1% ao ano. Considere otimizar para aumentar a economia.
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Botão de Ação */}
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.actionButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="download-outline" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Exportar Relatório</Text>
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
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 8,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  summarySubtext: {
    fontSize: 11,
    color: '#fff',
    opacity: 0.8,
  },
  savingsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  savingsLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  savingsValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#667eea',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    marginLeft: 8,
  },
  toggleTextActive: {
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
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#78909c',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 16,
    gap: 8,
  },
  barGroup: {
    alignItems: 'center',
    width: 60,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    gap: 3,
  },
  barContainer: {
    width: 16,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 16,
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 10,
    color: '#78909c',
    marginTop: 8,
    fontWeight: '600',
  },
  monthCard: {
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
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eceff1',
  },
  monthIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#e8eaf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  monthInfo: {
    flex: 1,
  },
  monthName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 4,
  },
  monthSavings: {
    fontSize: 13,
    color: '#78909c',
  },
  monthValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthValueItem: {
    flex: 1,
    alignItems: 'center',
  },
  valueIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  valueLabel: {
    fontSize: 11,
    color: '#78909c',
    marginBottom: 4,
  },
  valueAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  yearlyChart: {
    gap: 16,
  },
  yearCard: {
    padding: 16,
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
  },
  yearHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  yearLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a237e',
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  growthText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4caf50',
    marginLeft: 4,
  },
  yearBar: {
    height: 12,
    backgroundColor: '#eceff1',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  yearBarFill: {
    height: '100%',
  },
  yearBarGradient: {
    flex: 1,
  },
  yearValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yearValueItem: {
    flex: 1,
    alignItems: 'center',
  },
  yearValueLabel: {
    fontSize: 11,
    color: '#78909c',
    marginBottom: 4,
  },
  yearValueAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a237e',
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
  actionButton: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 12,
  },
});
