/**
 * AppNavigation コンポーネント
 * Phase 5.1: Refactor - 改善された画面遷移とエラーハンドリング
 */

import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusContext } from './context/FocusContext';
import { MainScreen } from './components/MainScreen';
import { FocusScreen } from './components/FocusScreen';
import { handleNavigationError } from './utils/errorHandler';

export const AppNavigation: React.FC = () => {
  const { state } = useFocusContext();

  // 画面遷移のエラーハンドリング
  const handleNavigationErrorCallback = useCallback((error: Error) => {
    handleNavigationError('Navigation error occurred', error, { 
      currentState: state.isActive ? 'focus' : 'main' 
    });
  }, [state.isActive]);

  // 現在の画面を決定（エラーハンドリング付き）
  const currentScreen = useMemo(() => {
    try {
      // isActiveの状態に基づいて画面を切り替え
      if (state.isActive) {
        return <FocusScreen />;
      }
      return <MainScreen />;
    } catch (error) {
      handleNavigationErrorCallback(error as Error);
      // フォールバック：常にメイン画面を表示
      return <MainScreen />;
    }
  }, [state.isActive, handleNavigationErrorCallback]);

  return (
    <View style={styles.container}>
      {currentScreen}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6', // 和紙 - 純粋と静寂
  },
});