import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
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
  const navigate = (key: string) => {
    setRoute(key);
    closeMenu();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fa' }}>
      <Active onMenu={openMenu} onNavigate={navigate} />
      <Drawer visible={drawerVisible} onClose={closeMenu} onNavigate={navigate} />
    </SafeAreaView>
  );
}
