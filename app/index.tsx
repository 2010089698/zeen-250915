import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { AppNavigation } from '../src/AppNavigation';
import { FocusProvider } from '../src/context/FocusContext';
import { AppStateManager } from '../src/hooks/useAppStateManager';
import { ErrorBoundary } from '../src/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#faf9f6" />
        <FocusProvider>
          <AppStateManager />
          <AppNavigation />
        </FocusProvider>
      </SafeAreaView>
    </ErrorBoundary>
  );
}