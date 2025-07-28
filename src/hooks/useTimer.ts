/**
 * useTimerフック
 * Phase 3.3: Green - 最小限の実装
 */

import { useState, useCallback, useEffect } from 'react';
import { FOCUS_DURATION_SECONDS } from '../models/Timer';

export interface UseTimerReturn {
  timeRemaining: number;
  isActive: boolean;
  start: () => void;
  complete: () => void;
  reset: () => void;
  tick: () => void;
}

export const useTimer = (initialTime: number = FOCUS_DURATION_SECONDS): UseTimerReturn => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const complete = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(initialTime);
  }, [initialTime]);

  const reset = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(initialTime);
  }, [initialTime]);

  const tick = useCallback(() => {
    setTimeRemaining(prev => {
      if (prev <= 1) {
        complete();
        return initialTime;
      }
      return prev - 1;
    });
  }, [complete, initialTime]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isActive, tick]);

  return {
    timeRemaining,
    isActive,
    start,
    complete,
    reset,
    tick
  };
};