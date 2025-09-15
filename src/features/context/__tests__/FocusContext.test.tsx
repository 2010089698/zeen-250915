/**
 * FocusContextテスト
 * Phase 3.4: Red - テストファースト
 */

import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import assert from 'power-assert';
import { FocusProvider, useFocusContext } from '../FocusContext';
import { FOCUS_DURATION_SECONDS } from '../../../domain/models/Timer';

// テスト用のラッパーコンポーネント
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FocusProvider>{children}</FocusProvider>
);

describe('FocusContext', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('FocusProvider', () => {
    test('should provide initial state', () => {
      const { result } = renderHook(() => useFocusContext(), { wrapper });
      
      assert(result.current.state.isActive === false, '初期状態は非アクティブ');
      assert(result.current.state.timeRemaining === FOCUS_DURATION_SECONDS, '初期時間は25分');
      assert(result.current.state.startTime === null, '開始時刻は未設定');
    });

    test('should provide context methods', () => {
      const { result } = renderHook(() => useFocusContext(), { wrapper });
      
      assert(typeof result.current.startFocus === 'function', 'startFocus関数が提供される');
      assert(typeof result.current.resetFocus === 'function', 'resetFocus関数が提供される');
      assert(typeof result.current.updateTimer === 'function', 'updateTimer関数が提供される');
    });
  });

  describe('startFocus', () => {
    test('should start focus session', () => {
      const { result } = renderHook(() => useFocusContext(), { wrapper });
      
      act(() => {
        result.current.startFocus();
      });
      
      assert(result.current.state.isActive === true, 'セッション開始後はアクティブ');
      assert(result.current.state.startTime !== null, '開始時刻が記録される');
    });

    test('should not start if already active', () => {
      const { result } = renderHook(() => useFocusContext(), { wrapper });
      
      // 最初の開始
      act(() => {
        result.current.startFocus();
      });
      
      const firstStartTime = result.current.state.startTime;
      
      // 既にアクティブ状態で再度開始を試行
      act(() => {
        result.current.startFocus();
      });
      
      assert(result.current.state.startTime === firstStartTime, '既にアクティブ時は開始時刻変更されない');
    });
  });

  describe('resetFocus', () => {
    test('should reset focus session to initial state', () => {
      const { result } = renderHook(() => useFocusContext(), { wrapper });
      
      // セッション開始
      act(() => {
        result.current.startFocus();
      });
      
      // リセット
      act(() => {
        result.current.resetFocus();
      });
      
      assert(result.current.state.isActive === false, 'リセット後は非アクティブ');
      assert(result.current.state.timeRemaining === FOCUS_DURATION_SECONDS, 'リセット後は初期時間');
      assert(result.current.state.startTime === null, 'リセット後は開始時刻リセット');
    });

    test('should reset from any state', () => {
      const { result } = renderHook(() => useFocusContext(), { wrapper });
      
      // セッション開始して時間進行
      act(() => {
        result.current.startFocus();
      });
      
      act(() => {
        jest.advanceTimersByTime(10000); // 10秒経過
      });
      
      // リセット
      act(() => {
        result.current.resetFocus();
      });
      
      assert(result.current.state.isActive === false, 'どの状態からでもリセット可能');
      assert(result.current.state.timeRemaining === FOCUS_DURATION_SECONDS, 'リセット後は初期時間');
    });
  });

  describe('updateTimer', () => {
    test('should update timer when active', () => {
      const { result } = renderHook(() => useFocusContext(), { wrapper });
      
      act(() => {
        result.current.startFocus();
      });
      
      const initialTime = result.current.state.timeRemaining;
      
      act(() => {
        result.current.updateTimer();
      });
      
      assert(result.current.state.timeRemaining === initialTime - 1, '1秒減る');
    });

    test('should not update timer when inactive', () => {
      const { result } = renderHook(() => useFocusContext(), { wrapper });
      
      const initialTime = result.current.state.timeRemaining;
      
      act(() => {
        result.current.updateTimer();
      });
      
      assert(result.current.state.timeRemaining === initialTime, '非アクティブ時は時間変更されない');
    });
  });

  describe('Timer Integration', () => {
    test('should auto-update timer when active', () => {
      const { result } = renderHook(() => useFocusContext(), { wrapper });
      
      act(() => {
        result.current.startFocus();
      });
      
      const initialTime = result.current.state.timeRemaining;
      
      act(() => {
        jest.advanceTimersByTime(5000); // 5秒経過
      });
      
      assert(result.current.state.timeRemaining === initialTime - 5, '5秒自動減算');
      assert(result.current.state.isActive === true, 'まだアクティブ');
    });

    test('should auto-complete when timer reaches zero', () => {
      const { result } = renderHook(() => useFocusContext(), { wrapper });
      
      act(() => {
        result.current.startFocus();
      });
      
      // 25分経過
      act(() => {
        jest.advanceTimersByTime(FOCUS_DURATION_SECONDS * 1000);
      });
      
      assert(result.current.state.isActive === false, '時間切れで自動完了');
      assert(result.current.state.timeRemaining === FOCUS_DURATION_SECONDS, '完了後は初期時間');
    });
  });

  describe('Context Hook Validation', () => {
    test('should throw error when used outside provider', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        renderHook(() => useFocusContext());
      }).toThrow('useFocusContext must be used within a FocusProvider');
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe('State Persistence', () => {
    test('should maintain state consistency across operations', () => {
      const { result } = renderHook(() => useFocusContext(), { wrapper });
      
      // 初期状態
      assert(result.current.state.isActive === false, '初期：非アクティブ');
      
      // 開始
      act(() => {
        result.current.startFocus();
      });
      assert(result.current.state.isActive === true, '開始後：アクティブ');
      
      // 時間進行
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      assert(result.current.state.timeRemaining === FOCUS_DURATION_SECONDS - 3, '3秒減少');
      
      // リセット
      act(() => {
        result.current.resetFocus();
      });
      assert(result.current.state.isActive === false, 'リセット後：非アクティブ');
      assert(result.current.state.timeRemaining === FOCUS_DURATION_SECONDS, 'リセット後：初期時間');
    });
  });
});