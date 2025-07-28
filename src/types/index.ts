/**
 * 型定義
 * Phase 3.1: Green - 最小限の実装
 */

// 集中セッションの状態
export interface FocusState {
  isActive: boolean;
  timeRemaining: number;
  startTime: number | null;
}

// 集中セッションのアクション
export type FocusAction = 
  | { type: 'START_FOCUS' }
  | { type: 'TICK' }
  | { type: 'COMPLETE_FOCUS' }
  | { type: 'RESET' };

// 集中セッションのコンテキスト
export interface FocusContextType {
  state: FocusState;
  startFocus: () => void;
  resetFocus: () => void;
  updateTimer: () => void;
}