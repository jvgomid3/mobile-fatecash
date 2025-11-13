import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Drawer({ visible, onClose, onNavigate }: { visible: boolean; onClose: () => void; onNavigate: (route: string) => void }) {
  const translateX = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(translateX, { toValue: visible ? 0 : -300, duration: 250, useNativeDriver: true }).start();
  }, [visible, translateX]);

  const navigate = (route: string) => {
    onNavigate(route);
    onClose();
  };

  const menuItems = [
    { key: 'home', label: 'Início', icon: 'home' },
    { key: 'carteira', label: 'Carteira', icon: 'wallet' },
    { key: 'contas', label: 'Contas & Cartões', icon: 'card' },
    { key: 'dividas', label: 'Dívidas', icon: 'alert-circle' },
    { key: 'metas', label: 'Metas', icon: 'trophy' },
    { key: 'orcamento', label: 'Orçamento', icon: 'pie-chart' },
    { key: 'planejamento', label: 'Planejamento', icon: 'calendar' },
  ];

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
        <SafeAreaView style={{ flex: 1 }}>
          <LinearGradient
            colors={['#1a237e', '#283593']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <Text style={styles.title}>FateCash</Text>
              <TouchableOpacity onPress={onClose} style={styles.close}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.profile}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={28} color="#1976d2" />
              </View>
              <View>
                <Text style={styles.name}>Usuário</Text>
                <Text style={styles.email}>usuario@email.com</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.items}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.item}
                onPress={() => navigate(item.key)}
                activeOpacity={0.7}
              >
                <Ionicons name={item.icon as any} size={22} color="#1a237e" />
                <Text style={styles.itemLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButton}>
              <Ionicons name="settings-outline" size={20} color="#78909c" />
              <Text style={styles.footerText}>Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
              <Ionicons name="log-out-outline" size={20} color="#78909c" />
              <Text style={styles.footerText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  container: { 
    position: 'absolute', 
    left: 0, 
    top: 0, 
    bottom: 0, 
    width: 300, 
    backgroundColor: '#fff', 
    elevation: 16, 
    shadowColor: '#000', 
    shadowOpacity: 0.3, 
    shadowRadius: 16,
    shadowOffset: { width: 2, height: 0 }
  },
  header: { 
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 20,
    paddingTop: 16,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  close: { 
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    gap: 12 
  },
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#e3f2fd', 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  name: { 
    fontWeight: 'bold', 
    fontSize: 16,
    color: '#fff' 
  },
  email: { 
    color: '#e3f2fd', 
    fontSize: 13,
    marginTop: 2
  },
  items: { 
    padding: 12,
    marginTop: 8,
    flex: 1
  },
  item: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14, 
    paddingHorizontal: 16, 
    borderRadius: 12,
    marginBottom: 4,
    gap: 16,
  },
  itemLabel: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#263238' 
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 12,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  footerText: {
    fontSize: 14,
    color: '#78909c',
    fontWeight: '600',
  },
});
