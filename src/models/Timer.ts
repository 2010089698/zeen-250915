/**
 * タイマーロジック
 * Phase 3.2: Green - 最小限の実装
 */

import { FocusState } from '../types';

// 25分固定タイマー（秒単位）
export const FOCUS_DURATION_SECONDS = 1500;

/**
 * 秒数をMM:SS形式の文字列に変換
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 初期状態を作成
 */
export function createInitialState(): FocusState {
  return {
    isActive: false,
    timeRemaining: FOCUS_DURATION_SECONDS,
    startTime: null
  };
}

/**
 * タイマーが完了したかチェック
 */
export function isTimerComplete(timeRemaining: number): boolean {
  return timeRemaining <= 0;
}