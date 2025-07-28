import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { MainScreen } from '../src/components/MainScreen';
import { FocusProvider } from '../src/context/FocusContext';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#faf9f6" />
      <FocusProvider>
        <MainScreen />
      </FocusProvider>
    </SafeAreaView>
  );
}