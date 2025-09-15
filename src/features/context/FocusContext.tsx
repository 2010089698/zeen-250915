/**
 * FocusContext
 * Phase 3.4: Refactor - 改善された状態管理とパフォーマンス最適化
 */

import React, { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { FocusContextType } from '../../ports/types';
import { useTimer } from '../hooks/useTimer';
import { FOCUS_DURATION_SECONDS } from '../../domain/models/Timer';
import { handleContextError } from '../../config/utils/errorHandler';

// Context作成
const FocusContext = createContext<FocusContextType | undefined>(undefined);

// Provider Props
interface FocusProviderProps {
  children: ReactNode;
  duration?: number; // カスタム時間設定を可能に
}

// FocusProvider コンポーネント
export const FocusProvider: React.FC<FocusProviderProps> = ({ 
  children, 
  duration = FOCUS_DURATION_SECONDS 
}) => {
  const { timeRemaining, isActive, start, reset, tick } = useTimer(duration);

  const startFocus = useCallback(() => {
    try {
      if (!isActive) {
        start();
      }
    } catch (error) {
      // フォーカス開始エラーを処理
      handleContextError('Focus start failed', error as Error, { isActive });
    }
  }, [start, isActive]);

  const resetFocus = useCallback(() => {
    try {
      reset();
    } catch (error) {
      // フォーカスリセットエラーを処理
      handleContextError('Focus reset failed', error as Error, { timeRemaining });
    }
  }, [reset]);

  const updateTimer = useCallback(() => {
    try {
      if (isActive) {
        tick();
      }
    } catch (error) {
      // タイマー更新エラーを処理
      handleContextError('Timer update failed', error as Error, { isActive, timeRemaining });
    }
  }, [tick, isActive]);

  // State構築（useMemoで最適化）
  const state = useMemo(() => ({
    isActive,
    timeRemaining,
    startTime: isActive ? Date.now() : null
  }), [isActive, timeRemaining]);

  // Context値をmemoで最適化
  const contextValue: FocusContextType = useMemo(() => ({
    state,
    startFocus,
    resetFocus,
    updateTimer
  }), [state, startFocus, resetFocus, updateTimer]);

  return (
    <FocusContext.Provider value={contextValue}>
      {children}
    </FocusContext.Provider>
  );
};

// useFocusContext カスタムフック
export const useFocusContext = (): FocusContextType => {
  const context = useContext(FocusContext);
  
  if (context === undefined) {
    throw new Error('useFocusContext must be used within a FocusProvider');
  }
  
  return context;
};