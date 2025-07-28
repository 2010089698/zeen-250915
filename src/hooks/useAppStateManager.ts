/**
 * アプリ状態管理フック
 * Phase 5.2: Refactor - パフォーマンス最適化とエラーハンドリング改善
 */

import React, { useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useFocusContext } from '../context/FocusContext';
import { handleAppStateError } from '../utils/errorHandler';

/**
 * アプリ状態管理カスタムフック
 * 
 * アプリがバックグラウンドに移行した際にアクティブなフォーカスセッションを
 * 自動的にリセットする機能を提供します。
 * 
 * 機能:
 * - AppState変更の監視
 * - バックグラウンド移行時の自動セッションリセット
 * - メモリリーク防止のためのクリーンアップ
 * - エラーハンドリング
 * 
 * @returns {Object} アプリ状態管理の結果
 * @returns {AppStateStatus} currentAppState - 現在のアプリ状態
 */
export const useAppStateManager = () => {
  const { resetFocus, state } = useFocusContext();
  
  // 現在の状態をRefで管理
  const stateRef = useRef(state);
  stateRef.current = state;
  
  const resetFocusRef = useRef(resetFocus);
  resetFocusRef.current = resetFocus;

  // AppState変更時のハンドラー
  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    // バックグラウンドに移行した場合、アクティブなセッションをリセット
    if (nextAppState === 'background' && stateRef.current.isActive) {
      resetFocusRef.current();
    }
  }, []);

  useEffect(() => {
    let subscription: ReturnType<typeof AppState.addEventListener> | null = null;
    
    try {
      // AppStateのリスナーを登録
      subscription = AppState.addEventListener('change', handleAppStateChange);
    } catch (error) {
      // エラーが発生してもアプリがクラッシュしないようにする
      handleAppStateError('AppState listener setup failed', error as Error);
    }

    // クリーンアップ関数でリスナーを削除
    return () => {
      try {
        subscription?.remove();
      } catch (error) {
        // クリーンアップエラーも安全に処理
        handleAppStateError('AppState listener cleanup failed', error as Error);
      }
    };
  }, [handleAppStateChange]);

  return {
    currentAppState: AppState.currentState,
  };
};

/**
 * AppStateManagerコンポーネント
 * 
 * アプリ状態管理機能を提供するラッパーコンポーネント。
 * アプリのルートレベルで使用して、グローバルなAppState監視を有効にします。
 * 
 * 使用例:
 * ```tsx
 * <FocusProvider>
 *   <AppStateManager />
 *   <AppNavigation />
 * </FocusProvider>
 * ```
 * 
 * @component
 * @example
 * return (
 *   <AppStateManager />
 * )
 */
export const AppStateManager: React.FC = React.memo(() => {
  useAppStateManager();
  return null;
});