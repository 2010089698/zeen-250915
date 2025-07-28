/**
 * タイマーロジックテスト
 * Phase 3.2: Red - テストファースト
 */

import assert from 'power-assert';
import { 
  FOCUS_DURATION_SECONDS,
  formatTime,
  createInitialState,
  isTimerComplete 
} from '../Timer';

describe('Timer Logic', () => {
  describe('Constants', () => {
    test('FOCUS_DURATION_SECONDS should be 25 minutes (1500 seconds)', () => {
      assert(FOCUS_DURATION_SECONDS === 1500, '25分は1500秒である');
    });
  });

  describe('formatTime function', () => {
    test('should format seconds to MM:SS format', () => {
      assert(formatTime(1500) === '25:00', '1500秒は25:00と表示される');
      assert(formatTime(900) === '15:00', '900秒は15:00と表示される');
      assert(formatTime(90) === '01:30', '90秒は01:30と表示される');
      assert(formatTime(5) === '00:05', '5秒は00:05と表示される');
      assert(formatTime(0) === '00:00', '0秒は00:00と表示される');
    });

    test('should handle edge cases', () => {
      assert(formatTime(3661) === '61:01', '3661秒は61:01と表示される');
      assert(formatTime(59) === '00:59', '59秒は00:59と表示される');
    });
  });

  describe('createInitialState function', () => {
    test('should create initial focus state', () => {
      const initialState = createInitialState();
      
      assert(initialState.isActive === false, '初期状態は非アクティブ');
      assert(initialState.timeRemaining === FOCUS_DURATION_SECONDS, '初期時間は25分');
      assert(initialState.startTime === null, '開始時刻は未設定');
    });
  });

  describe('isTimerComplete function', () => {
    test('should return true when timer reaches zero', () => {
      assert(isTimerComplete(0) === true, '0秒でタイマー完了');
    });

    test('should return false when timer has time remaining', () => {
      assert(isTimerComplete(1) === false, '1秒残りでタイマー未完了');
      assert(isTimerComplete(1500) === false, '1500秒残りでタイマー未完了');
    });

    test('should handle negative values', () => {
      assert(isTimerComplete(-1) === true, '負の値でもタイマー完了とする');
    });
  });
});