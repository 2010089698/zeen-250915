/**
 * useTimerフック
 * Phase 3.3: Refactor - パフォーマンス最適化とメモリ効率改善
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { FOCUS_DURATION_SECONDS, calculateNextTime, isTimerComplete } from '../../domain/models/Timer';
import { handleTimerError } from '../../config/utils/errorHandler';

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
      try {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } catch (error) {
        // クリーンアップエラーを安全に処理
        handleTimerError('Timer cleanup failed', error as Error, { isActive: false });
      }
      return;
    }

    // アクティブ時はインターバル開始
    try {
      intervalRef.current = setInterval(tick, 1000);
    } catch (error) {
      // setIntervalエラーを処理
      handleTimerError('Timer setInterval failed', error as Error, { isActive: true });
      // エラー時は手動でタイマーを非アクティブに
      setIsActive(false);
    }
    
    return () => {
      try {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } catch (error) {
        // クリーンアップエラーを安全に処理
        handleTimerError('Timer effect cleanup failed', error as Error, { isActive });
      }
    };
  }, [isActive, tick]);

  // コンポーネントアンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      try {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } catch (error) {
        // アンマウント時のクリーンアップエラーを安全に処理
        handleTimerError('Timer unmount cleanup failed', error as Error, { unmounting: true });
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