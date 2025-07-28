/**
 * useTimerフック
 * Phase 3.3: Refactor - パフォーマンス最適化とメモリ効率改善
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { FOCUS_DURATION_SECONDS, calculateNextTime, isTimerComplete } from '../models/Timer';

export interface UseTimerReturn {
  timeRemaining: number;
  isActive: boolean;
  start: () => void;
  complete: () => void;
  reset: () => void;
  tick: () => void;
}

export const useTimer = (initialTime: number = FOCUS_DURATION_SECONDS): UseTimerReturn => {
  // 初期時間を正の整数に正規化
  const normalizedInitialTime = Math.max(0, Math.floor(initialTime));
  
  const [timeRemaining, setTimeRemaining] = useState(normalizedInitialTime);
  const [isActive, setIsActive] = useState(false);
  
  // インターバルIDの参照を保持してクリーンアップを確実に
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
    }
  }, [isActive]);

  const complete = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(normalizedInitialTime);
    
    // インターバルクリーンアップ
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [normalizedInitialTime]);

  const reset = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(normalizedInitialTime);
    
    // インターバルクリーンアップ
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [normalizedInitialTime]);

  const tick = useCallback(() => {
    setTimeRemaining(prev => {
      const nextTime = calculateNextTime(prev);
      
      if (isTimerComplete(nextTime)) {
        // 完了処理を同期的に実行
        setIsActive(false);
        
        // インターバルクリーンアップ
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        
        return normalizedInitialTime;
      }
      
      return nextTime;
    });
  }, [normalizedInitialTime]);

  // タイマー効果の管理
  useEffect(() => {
    if (!isActive) {
      // 非アクティブ時はインターバルクリーンアップ
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // アクティブ時はインターバル開始
    intervalRef.current = setInterval(tick, 1000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, tick]);

  // コンポーネントアンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return {
    timeRemaining,
    isActive,
    start,
    complete,
    reset,
    tick
  };
};