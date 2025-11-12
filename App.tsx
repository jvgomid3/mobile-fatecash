import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CarteiraScreen from './app/CarteiraScreen';
import ContasCartoesScreen from './app/ContasCartoesScreen';
import DividasScreen from './app/DividasScreen';
import MetasScreen from './app/MetasScreen';
import OrcamentoScreen from './app/OrcamentoScreen';
import PlanejamentoScreen from './app/PlanejamentoScreen';
import Drawer from './components/ui/drawer';

import HomeScreen from './app/HomeScreen';

const routes = [
  { key: 'home', label: 'Início', comp: HomeScreen },
  { key: 'carteira', label: 'Carteira', comp: CarteiraScreen },
  { key: 'contas', label: 'Contas', comp: ContasCartoesScreen },
  { key: 'dividas', label: 'Dívidas', comp: DividasScreen },
  { key: 'metas', label: 'Metas', comp: MetasScreen },
  { key: 'orcamento', label: 'Orçamento', comp: OrcamentoScreen },
  { key: 'planejamento', label: 'Planej.', comp: PlanejamentoScreen },
];

export default function App() {
  const [route, setRoute] = useState('home');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const Active = routes.find(r => r.key === route)!.comp;

  const openMenu = () => setDrawerVisible(true);
  const closeMenu = () => setDrawerVisible(false);
  const navigate = (key: string) => setRoute(key);

  return (
    <SafeAreaView style={{ flex: 1 }}>
  <Active onMenu={openMenu} />
  <Drawer visible={drawerVisible} onClose={closeMenu} onNavigate={navigate} />
      <View style={styles.tabbar}>
        {routes.map(r => (
          <TouchableOpacity key={r.key} style={styles.tab} onPress={() => setRoute(r.key)}>
            <Text style={route === r.key ? styles.tabLabelActive : styles.tabLabel}>{r.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabbar: { height: 60, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee' },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabLabel: { color: '#555' },
  tabLabelActive: { color: '#007AFF', fontWeight: '700' },
});
