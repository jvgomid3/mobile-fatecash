import React, { PropsWithChildren } from 'react';
import { Modal, View, StyleSheet } from 'react-native';

export default function Dialog({ visible, children }: PropsWithChildren<{ visible: boolean }>) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.container}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  container: { width: '92%', backgroundColor: '#fff', borderRadius: 8, padding: 12 },
});
