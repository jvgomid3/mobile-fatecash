import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface AddGoalModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (goal: any) => void;
}

export default function AddGoalModal({ visible, onClose, onAdd }: AddGoalModalProps) {
  const [titulo, setTitulo] = useState('');
  const [valorObjetivo, setValorObjetivo] = useState('');
  const [dataLimite, setDataLimite] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleAdd = () => {
    if (!titulo || !valorObjetivo) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }

    const target = parseFloat(valorObjetivo.replace(',', '.')) || 0;

    const newGoal = {
      id: Date.now(),
      title: titulo,
      target: target,
      current: 0,
      deadline: dataLimite || '2025-12-31',
      icon: categoria.toLowerCase().includes('viagem') ? 'airplane' : 
            categoria.toLowerCase().includes('carro') ? 'car-sport' : 
            categoria.toLowerCase().includes('casa') ? 'home' : 'trophy',
      color: '#2196f3',
    };

    onAdd(newGoal);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitulo('');
    setValorObjetivo('');
    setDataLimite('');
    setCategoria('');
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
            <Text style={styles.modalTitle}>Criar Nova Meta</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#1a237e" />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalSubtitle}>
            Defina uma nova meta financeira para acompanhar seu progresso.
          </Text>

          <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
            {/* Título da Meta */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Título da Meta</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Viagem para o Japão"
                value={titulo}
                onChangeText={setTitulo}
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Valor Objetivo */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Valor Objetivo (R$)</Text>
              <TextInput
                style={styles.input}
                placeholder="0,00"
                value={valorObjetivo}
                onChangeText={setValorObjetivo}
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
              />
            </View>

            {/* Data Limite */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Data Limite</Text>
              <TextInput
                style={styles.input}
                placeholder="dd/mm/aaaa"
                value={dataLimite}
                onChangeText={setDataLimite}
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Categoria */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Categoria</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Viagem, Veículo, Casa"
                value={categoria}
                onChangeText={setCategoria}
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Dica */}
            <View style={styles.tipBox}>
              <Ionicons name="bulb-outline" size={20} color="#ff9800" />
              <Text style={styles.tipText}>
                Dica: Defina metas realistas e acompanhe seu progresso regularmente para se manter motivado!
              </Text>
            </View>
          </ScrollView>

          {/* Botão Criar */}
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.addButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.addButtonText}>Criar Meta</Text>
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
  inputGroup: {
    marginBottom: 20,
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
  tipBox: {
    flexDirection: 'row',
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#e65100',
    marginLeft: 10,
    lineHeight: 18,
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
