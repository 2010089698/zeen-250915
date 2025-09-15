/**
 * useFocusSessionフック
 * Phase 3.3: Refactor - セッション管理の改善とメモリ効率最適化
 */

import { useCallback, useState, useEffect, useMemo } from 'react';
import { useTimer } from './useTimer';
import { FocusState } from '../../ports/types';
import { FOCUS_DURATION_SECONDS } from '../../domain/models/Timer';

export interface UseFocusSessionReturn {
  state: FocusState;
  startFocus: () => void;
  completeFocus: () => void;
  resetFocus: () => void;
}

export const useFocusSession = (duration: number = FOCUS_DURATION_SECONDS): UseFocusSessionReturn => {
  const { timeRemaining, isActive, start, complete, reset } = useTimer(duration);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startFocus = useCallback(() => {
    if (!isActive) {
      const now = Date.now();
      setStartTime(now);
      start();
    }
  }, [start, isActive]);

  const completeFocus = useCallback(() => {
    setStartTime(null);
    complete();
  }, [complete]);

  const resetFocus = useCallback(() => {
    setStartTime(null);
    reset();
  }, [reset]);

  // タイマー完了時の自動クリーンアップ
  useEffect(() => {
    if (!isActive && startTime !== null) {
      // タイマーが完了した場合、startTimeをリセット
      setStartTime(null);
    }
  }, [isActive, startTime]);

  // FocusState形式に変換（useMemoで最適化）
  const state: FocusState = useMemo(() => ({
    isActive,
    timeRemaining,
    startTime
  }), [isActive, timeRemaining, startTime]);

  return {
    state,
    startFocus,
    completeFocus,
    resetFocus
  };
};