/**
 * タイマーロジック
 * Phase 3.2: Refactor - 改善されたビジネスロジック
 */

import { FocusState } from '../../ports/types';

// 25分固定タイマー（秒単位）
export const FOCUS_DURATION_SECONDS = 1500;

/**
 * 秒数をMM:SS形式の文字列に変換
 * @param seconds - 変換する秒数（0以上の整数）
 * @returns MM:SS形式の文字列
 */
export function formatTime(seconds: number): string {
  // 負の値を0にクランプ
  const clampedSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(clampedSeconds / 60);
  const secs = clampedSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 初期状態を作成
 * @param duration - カスタム時間（デフォルト：25分）
 * @returns 初期化されたFocusState
 */
export function createInitialState(duration: number = FOCUS_DURATION_SECONDS): FocusState {
  return {
    isActive: false,
    timeRemaining: Math.max(0, Math.floor(duration)),
    startTime: null
  };
}

/**
 * タイマーが完了したかチェック
 * @param timeRemaining - 残り時間（秒）
 * @returns 完了していればtrue
 */
export function isTimerComplete(timeRemaining: number): boolean {
  return timeRemaining <= 0;
}

/**
 * 次の秒数を計算（1秒減算）
 * @param currentTime - 現在の残り時間
 * @returns 次の残り時間（0未満にはならない）
 */
export function calculateNextTime(currentTime: number): number {
  return Math.max(0, currentTime - 1);
}

/**
 * 経過時間を計算
 * @param startTime - 開始時刻（ミリ秒）
 * @param currentTime - 現在時刻（ミリ秒、デフォルト：Date.now()）
 * @returns 経過秒数
 */
export function calculateElapsedSeconds(startTime: number, currentTime: number = Date.now()): number {
  return Math.floor((currentTime - startTime) / 1000);
}