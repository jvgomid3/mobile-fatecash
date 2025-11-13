import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface AddAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (account: any) => void;
}

export default function AddAccountModal({ visible, onClose, onAdd }: AddAccountModalProps) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [banco, setBanco] = useState('');
  const [numero, setNumero] = useState('');
  const [saldoInicial, setSaldoInicial] = useState('');
  const [showTipoDropdown, setShowTipoDropdown] = useState(false);

  const tipos = ['Conta Corrente', 'Poupança', 'Cartão de Crédito', 'Investimento'];

  const handleAdd = () => {
    if (!nome || !tipo || !banco) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const newAccount = {
      id: Date.now(),
      name: nome,
      type: tipo.toLowerCase().replace(/\s/g, '-'),
      balance: parseFloat(saldoInicial.replace(',', '.')) || 0,
      bank: banco,
      number: numero || '**** ****',
      icon: tipo.includes('Cartão') ? 'card' : tipo.includes('Poupança') ? 'trending-up' : 'wallet',
    };

    onAdd(newAccount);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNome('');
    setTipo('');
    setBanco('');
    setNumero('');
    setSaldoInicial('');
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
            <Text style={styles.modalTitle}>Adicionar Nova Conta</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#1a237e" />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalSubtitle}>
            Cadastre uma nova conta bancária ou cartão de crédito.
          </Text>

          <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
            {/* Nome da Conta */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome da Conta</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Conta Corrente Santander"
                value={nome}
                onChangeText={setNome}
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Tipo */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tipo</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowTipoDropdown(!showTipoDropdown)}
              >
                <Text style={[styles.dropdownText, !tipo && styles.placeholder]}>
                  {tipo || 'Selecione o tipo'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#78909c" />
              </TouchableOpacity>
              {showTipoDropdown && (
                <View style={styles.dropdownMenu}>
                  {tipos.map((tipoOption) => (
                    <TouchableOpacity
                      key={tipoOption}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setTipo(tipoOption);
                        setShowTipoDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{tipoOption}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Banco */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Banco</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Banco do Brasil"
                value={banco}
                onChangeText={setBanco}
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Número da Conta/Cartão */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Número da Conta/Cartão</Text>
              <TextInput
                style={styles.input}
                placeholder="**** 1234"
                value={numero}
                onChangeText={setNumero}
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>

            {/* Saldo Inicial */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Saldo Inicial (R$)</Text>
              <TextInput
                style={styles.input}
                placeholder="0,00"
                value={saldoInicial}
                onChangeText={setSaldoInicial}
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
              />
            </View>
          </ScrollView>

          {/* Botão Adicionar */}
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.addButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.addButtonText}>Adicionar Conta</Text>
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
  dropdown: {
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eceff1',
  },
  dropdownText: {
    fontSize: 15,
    color: '#1a237e',
  },
  placeholder: {
    color: '#9ca3af',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#eceff1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eceff1',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#1a237e',
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
