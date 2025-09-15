/**
 * useFocusSessionフックテスト
 * Phase 3.3: Red - テストファースト
 */

import { renderHook, act } from '@testing-library/react-native';
import assert from 'power-assert';
import { useFocusSession } from '../useFocusSession';
import { FOCUS_DURATION_SECONDS } from '../../../domain/models/Timer';

describe('useFocusSession Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('Initial State', () => {
    test('should start with correct initial state', () => {
      const { result } = renderHook(() => useFocusSession());
      
      assert(result.current.state.isActive === false, '初期状態は非アクティブ');
      assert(result.current.state.timeRemaining === FOCUS_DURATION_SECONDS, '初期時間は25分');
      assert(result.current.state.startTime === null, '開始時刻は未設定');
    });
  });

  describe('startFocus Function', () => {
    test('should start focus session', () => {
      const { result } = renderHook(() => useFocusSession());
      
      act(() => {
        result.current.startFocus();
      });
      
      assert(result.current.state.isActive === true, 'セッション開始後はアクティブ');
      assert(result.current.state.startTime !== null, '開始時刻が記録される');
    });

    test('should record start time when focus begins', () => {
      const { result } = renderHook(() => useFocusSession());
      const beforeStart = Date.now();
      
      act(() => {
        result.current.startFocus();
      });
      
      const afterStart = Date.now();
      const startTime = result.current.state.startTime;
      
      assert(startTime !== null, '開始時刻が記録される');
      assert(startTime >= beforeStart && startTime <= afterStart, '開始時刻が正確');
    });
  });

  describe('completeFocus Function', () => {
    test('should complete focus session and reset to initial state', () => {
      const { result } = renderHook(() => useFocusSession());
      
      // セッション開始
      act(() => {
        result.current.startFocus();
      });
      
      // セッション完了
      act(() => {
        result.current.completeFocus();
      });
      
      assert(result.current.state.isActive === false, '完了後は非アクティブ');
      assert(result.current.state.timeRemaining === FOCUS_DURATION_SECONDS, '完了後は初期時間');
      assert(result.current.state.startTime === null, '完了後は開始時刻リセット');
    });
  });

  describe('resetFocus Function', () => {
    test('should reset focus session to initial state', () => {
      const { result } = renderHook(() => useFocusSession());
      
      // セッション開始
      act(() => {
        result.current.startFocus();
      });
      
      // セッションリセット
      act(() => {
        result.current.resetFocus();
      });
      
      assert(result.current.state.isActive === false, 'リセット後は非アクティブ');
      assert(result.current.state.timeRemaining === FOCUS_DURATION_SECONDS, 'リセット後は初期時間');
      assert(result.current.state.startTime === null, 'リセット後は開始時刻リセット');
    });

    test('should reset from any state', () => {
      const { result } = renderHook(() => useFocusSession());
      
      // セッション開始して時間を進める
      act(() => {
        result.current.startFocus();
      });
      
      act(() => {
        jest.advanceTimersByTime(5000); // 5秒経過
      });
      
      // リセット
      act(() => {
        result.current.resetFocus();
      });
      
      assert(result.current.state.isActive === false, 'どの状態からでもリセット可能');
      assert(result.current.state.timeRemaining === FOCUS_DURATION_SECONDS, 'リセット後は初期時間');
    });
  });

  describe('Timer Integration', () => {
    test('should countdown when session is active', () => {
      const { result } = renderHook(() => useFocusSession());
      
      act(() => {
        result.current.startFocus();
      });
      
      const initialTime = result.current.state.timeRemaining;
      
      act(() => {
        jest.advanceTimersByTime(3000); // 3秒経過
      });
      
      assert(result.current.state.timeRemaining === initialTime - 3, '3秒減っている');
      assert(result.current.state.isActive === true, 'まだアクティブ');
    });

    test('should auto-complete when timer reaches zero', () => {
      const { result } = renderHook(() => useFocusSession());
      
      act(() => {
        result.current.startFocus();
      });
      
      // 25分経過（完了まで）
      act(() => {
        jest.advanceTimersByTime(FOCUS_DURATION_SECONDS * 1000);
      });
      
      assert(result.current.state.isActive === false, '時間切れで自動完了');
      assert(result.current.state.timeRemaining === FOCUS_DURATION_SECONDS, '完了後は初期時間');
    });
  });

  describe('State Consistency', () => {
    test('should maintain state consistency during operations', () => {
      const { result } = renderHook(() => useFocusSession());
      
      // 初期状態確認
      assert(result.current.state.isActive === false, '初期：非アクティブ');
      
      // 開始
      act(() => {
        result.current.startFocus();
      });
      assert(result.current.state.isActive === true, '開始：アクティブ');
      
      // リセット
      act(() => {
        result.current.resetFocus();
      });
      assert(result.current.state.isActive === false, 'リセット：非アクティブ');
      
      // 再開始
      act(() => {
        result.current.startFocus();
      });
      assert(result.current.state.isActive === true, '再開始：アクティブ');
      
      // 完了
      act(() => {
        result.current.completeFocus();
      });
      assert(result.current.state.isActive === false, '完了：非アクティブ');
    });
  });
});