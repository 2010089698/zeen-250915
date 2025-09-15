import React, { useCallback, useMemo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusContext } from '../features/context/FocusContext';
import { MainScreen } from '../features/components/MainScreen';
import { FocusScreen } from '../features/components/FocusScreen';
import { handleNavigationError } from '../config/utils/errorHandler';
import { debugPlatformInfo } from '../config/utils/platform';

export default function HomeScreen() {
  const { state } = useFocusContext();

  // アプリ起動時にプラットフォーム情報をデバッグ出力
  useEffect(() => {
    if (__DEV__) {
      console.log('🚀 HomeScreen: Component mounted');
      debugPlatformInfo();
      console.log(`📱 Current screen state: ${state.isActive ? 'Focus' : 'Main'}`);
    }
  }, []);

  // 画面遷移時のログ出力
  useEffect(() => {
    if (__DEV__) {
      console.log(`🔄 Screen transition: ${state.isActive ? 'Main → Focus' : 'Focus → Main'}`);
    }
  }, [state.isActive]);

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6', // 和紙 - 純粋と静寂
  },
});