import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import MainScreen from '../src/components/MainScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#faf9f6" />
      <MainScreen />
    </SafeAreaView>
  );
}