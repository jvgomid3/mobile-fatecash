import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface AddDebtModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (debt: any) => void;
}

export default function AddDebtModal({ visible, onClose, onAdd }: AddDebtModalProps) {
  const [nome, setNome] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [valorRestante, setValorRestante] = useState('');
  const [parcelaMensal, setParcelaMensal] = useState('');
  const [taxaJuros, setTaxaJuros] = useState('');
  const [dataQuitacao, setDataQuitacao] = useState('');
  const [tipo, setTipo] = useState('');

  const handleAdd = () => {
    if (!nome || !valorRestante || !parcelaMensal) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }

    const remaining = parseFloat(valorRestante.replace(',', '.')) || 0;
    const monthly = parseFloat(parcelaMensal.replace(',', '.')) || 0;
    const total = parseFloat(valorTotal.replace(',', '.')) || remaining;

    const newDebt = {
      id: Date.now(),
      name: nome,
      remaining: remaining,
      monthly: monthly,
      dueDate: dataQuitacao || '2025-12-31',
      icon: tipo.toLowerCase().includes('cartão') ? 'card' : tipo.toLowerCase().includes('carro') ? 'car-sport' : 'cash',
      progress: total > 0 ? ((total - remaining) / total) : 0,
    };

    onAdd(newDebt);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNome('');
    setValorTotal('');
    setValorRestante('');
    setParcelaMensal('');
    setTaxaJuros('');
    setDataQuitacao('');
    setTipo('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Adicionar Nova Dívida</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#1a237e" />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalSubtitle}>
            Cadastre uma nova dívida para acompanhar o progresso de quitação.
          </Text>

          <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
            {/* Nome da Dívida */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome da Dívida</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Financiamento da Casa"
                value={nome}
                onChangeText={setNome}
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Valor Total e Valor Restante */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Valor Total (R$)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0,00"
                  value={valorTotal}
                  onChangeText={setValorTotal}
                  placeholderTextColor="#9ca3af"
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Valor Restante (R$)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0,00"
                  value={valorRestante}
                  onChangeText={setValorRestante}
                  placeholderTextColor="#9ca3af"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* Parcela Mensal e Taxa de Juros */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Parcela Mensal (R$)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0,00"
                  value={parcelaMensal}
                  onChangeText={setParcelaMensal}
                  placeholderTextColor="#9ca3af"
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Taxa de Juros (%)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0,0"
                  value={taxaJuros}
                  onChangeText={setTaxaJuros}
                  placeholderTextColor="#9ca3af"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* Data de Quitação */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Data de Quitação</Text>
                <TextInput
                  style={styles.input}
                  placeholder="dd/mm/aaaa"
                  value={dataQuitacao}
                  onChangeText={setDataQuitacao}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Tipo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Financiamento, Cartão"
                  value={tipo}
                  onChangeText={setTipo}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>
          </ScrollView>

          {/* Botão Adicionar */}
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <LinearGradient
              colors={['#dc2626', '#ef4444']}
              style={styles.addButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.addButtonText}>Adicionar Dívida</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a237e',
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#78909c',
    marginBottom: 24,
  },
  formContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1a237e',
    borderWidth: 1,
    borderColor: '#eceff1',
  },
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
