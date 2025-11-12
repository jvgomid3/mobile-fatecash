import React, { useEffect, useRef } from 'react';
import { Animated, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Drawer({ visible, onClose, onNavigate }: { visible: boolean; onClose: () => void; onNavigate: (route: string) => void }) {
  const translateX = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(translateX, { toValue: visible ? 0 : -300, duration: 220, useNativeDriver: true }).start();
  }, [visible, translateX]);

  const navigate = (route: string) => {
    onNavigate(route);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.title}>FateCash</Text>
            <TouchableOpacity onPress={onClose} style={styles.close}><Text style={styles.closeText}>✕</Text></TouchableOpacity>
          </View>

          <View style={styles.profile}>
            <View style={styles.avatar}><Text style={styles.avatarText}>FC</Text></View>
            <View>
              <Text style={styles.name}>Usuário</Text>
              <Text style={styles.email}>usuario@email.com</Text>
            </View>
          </View>

          <View style={styles.items}>
            <TouchableOpacity style={styles.item} onPress={() => navigate('home')}>
              <Text style={styles.itemLabel}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigate('carteira')}>
              <Text style={styles.itemLabel}>Carteira</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigate('contas')}>
              <Text style={styles.itemLabel}>Contas & Cartões</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigate('dividas')}>
              <Text style={styles.itemLabel}>Dívidas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigate('metas')}>
              <Text style={styles.itemLabel}>Metas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigate('orcamento')}>
              <Text style={styles.itemLabel}>Orçamento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigate('planejamento')}>
              <Text style={styles.itemLabel}>Planejamento</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  container: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 320, backgroundColor: '#fff', elevation: 12, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 10 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, backgroundColor: '#7c3aed' },
  title: { fontSize: 20, fontWeight: '800', color: '#fff' },
  close: { padding: 6 },
  closeText: { fontSize: 18, color: '#fff' },
  profile: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  avatar: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#e9d5ff', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '800', color: '#6b21a8' },
  name: { fontWeight: '800' },
  email: { color: '#6b7280', fontSize: 12 },
  items: { padding: 8, marginTop: 6 },
  item: { paddingVertical: 12, paddingHorizontal: 10, borderRadius: 8 },
  itemLabel: { fontSize: 16, fontWeight: '700', color: '#111827' },
});
