import React from 'react';
import { TabNavigator } from './navigation/tab-navigation';
import { AppContext, AppProvider } from './utils/context';
export default function App() {
  return (
    <AppProvider>
      <TabNavigator />
    </AppProvider>
  );
}
