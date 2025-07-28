/**
 * useTimerフックテスト
 * Phase 3.3: Red - テストファースト
 */

import { renderHook, act } from '@testing-library/react-native';
import assert from 'power-assert';
import { useTimer } from '../useTimer';
import { FOCUS_DURATION_SECONDS } from '../../models/Timer';

describe('useTimer Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('Initial State', () => {
    test('should start with correct initial values', () => {
      const { result } = renderHook(() => useTimer());
      
      assert(result.current.timeRemaining === FOCUS_DURATION_SECONDS, '初期時間は25分');
      assert(result.current.isActive === false, '初期状態は非アクティブ');
    });

    test('should allow custom initial time', () => {
      const customTime = 600; // 10分
      const { result } = renderHook(() => useTimer(customTime));
      
      assert(result.current.timeRemaining === customTime, 'カスタム初期時間が設定される');
    });
  });

  describe('Start Function', () => {
    test('should start timer when start is called', () => {
      const { result } = renderHook(() => useTimer());
      
      act(() => {
        result.current.start();
      });
      
      assert(result.current.isActive === true, 'start後にアクティブになる');
    });
  });

  describe('Reset Function', () => {
    test('should reset timer to initial state', () => {
      const { result } = renderHook(() => useTimer());
      
      // タイマーを開始
      act(() => {
        result.current.start();
      });
      
      // リセット
      act(() => {
        result.current.reset();
      });
      
      assert(result.current.isActive === false, 'リセット後は非アクティブ');
      assert(result.current.timeRemaining === FOCUS_DURATION_SECONDS, 'リセット後は初期時間');
    });
  });

  describe('Complete Function', () => {
    test('should complete timer and reset to initial state', () => {
      const { result } = renderHook(() => useTimer());
      
      // タイマーを開始
      act(() => {
        result.current.start();
      });
      
      // 完了
      act(() => {
        result.current.complete();
      });
      
      assert(result.current.isActive === false, '完了後は非アクティブ');
      assert(result.current.timeRemaining === FOCUS_DURATION_SECONDS, '完了後は初期時間');
    });
  });

  describe('Tick Function', () => {
    test('should decrease time by 1 second when active', () => {
      const { result } = renderHook(() => useTimer());
      
      act(() => {
        result.current.start();
      });
      
      const initialTime = result.current.timeRemaining;
      
      act(() => {
        result.current.tick();
      });
      
      assert(result.current.timeRemaining === initialTime - 1, '1秒減る');
    });

    test('should auto-complete when time reaches zero', () => {
      const { result } = renderHook(() => useTimer(1)); // 1秒でテスト
      
      act(() => {
        result.current.start();
      });
      
      act(() => {
        result.current.tick();
      });
      
      assert(result.current.isActive === false, '時間切れで自動完了');
      assert(result.current.timeRemaining === 1, '完了後は初期時間に戻る');
    });
  });

  describe('Timer Integration', () => {
    test('should run countdown when active', () => {
      const { result } = renderHook(() => useTimer(3)); // 3秒でテスト
      
      act(() => {
        result.current.start();
      });
      
      // 1秒経過
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      assert(result.current.timeRemaining === 2, '1秒後に2秒残り');
      assert(result.current.isActive === true, 'まだアクティブ');
    });
  });
});