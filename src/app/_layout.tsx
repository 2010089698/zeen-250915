import 'react-native-reanimated';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { FocusProvider } from '../features/context/FocusContext';
import { AppStateManager } from '../features/hooks/useAppStateManager';
import { ErrorBoundary } from './ErrorBoundary';
import { DepsProvider } from './providers/DepsProvider';

export default function RootLayout() {
  return (
    <DepsProvider>
      <ErrorBoundary>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" backgroundColor="#faf9f6" />
          <FocusProvider>
            <AppStateManager />
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
          </FocusProvider>
        </SafeAreaView>
      </ErrorBoundary>
    </DepsProvider>
  );
}