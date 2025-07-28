/**
 * 型定義
 * Phase 3.1: Refactor - 改善された型定義と拡張性
 */

/**
 * 集中セッションの状態
 * @interface FocusState
 */
export interface FocusState {
  /** セッションがアクティブかどうか */
  readonly isActive: boolean;
  /** 残り時間（秒） */
  readonly timeRemaining: number;
  /** セッション開始時刻（ミリ秒、未開始時はnull） */
  readonly startTime: number | null;
}

/**
 * 集中セッションのアクション（状態変更）
 * @type FocusAction
 */
export type FocusAction = 
  | { type: 'START_FOCUS'; payload?: { startTime: number } }
  | { type: 'TICK'; payload?: { currentTime: number } }
  | { type: 'COMPLETE_FOCUS' }
  | { type: 'RESET' };

/**
 * 集中セッションのコンテキスト型
 * @interface FocusContextType
 */
export interface FocusContextType {
  /** 現在の集中セッション状態 */
  readonly state: FocusState;
  /** 集中セッションを開始する関数 */
  readonly startFocus: () => void;
  /** 集中セッションをリセットする関数 */
  readonly resetFocus: () => void;
  /** タイマーを手動更新する関数（レガシー対応） */
  readonly updateTimer: () => void;
}

/**
 * タイマー設定
 * @interface TimerConfig
 */
export interface TimerConfig {
  /** タイマー時間（秒）デフォルト：1500秒（25分） */
  readonly duration: number;
  /** 更新間隔（ミリ秒）デフォルト：1000ms */
  readonly interval: number;
}

/**
 * セッション統計情報（将来の拡張用）
 * @interface SessionStats
 */
export interface SessionStats {
  /** 完了したセッション数 */
  readonly completedSessions: number;
  /** 総集中時間（秒） */
  readonly totalFocusTime: number;
  /** 最後のセッション完了時刻 */
  readonly lastSessionTime: number | null;
}