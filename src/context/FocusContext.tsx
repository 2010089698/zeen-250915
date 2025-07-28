/**
 * FocusContext
 * Phase 3.4: Refactor - 改善された状態管理とパフォーマンス最適化
 */

import React, { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { FocusContextType } from '../types';
import { useTimer } from '../hooks/useTimer';
import { FOCUS_DURATION_SECONDS } from '../models/Timer';

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
    if (!isActive) {
      start();
    }
  }, [start, isActive]);

  const resetFocus = useCallback(() => {
    reset();
  }, [reset]);

  const updateTimer = useCallback(() => {
    if (isActive) {
      tick();
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