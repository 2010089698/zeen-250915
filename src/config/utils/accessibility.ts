/**
 * アクセシビリティユーティリティ
 * Phase 6.3: 基本的なアクセシビリティ対応
 */

import { AccessibilityInfo } from 'react-native';

/**
 * スクリーンリーダーが有効かどうかを確認
 */
export const isScreenReaderEnabled = async (): Promise<boolean> => {
  try {
    return await AccessibilityInfo.isScreenReaderEnabled();
  } catch (error) {
    console.warn('Failed to check screen reader status:', error);
    return false;
  }
};

/**
 * アクセシビリティのアナウンスを実行
 */
export const announceForAccessibility = (message: string): void => {
  AccessibilityInfo.announceForAccessibility(message);
};

/**
 * フォーカス状態の時間を読み上げ用に変換
 */
export const formatTimeForAccessibility = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds} seconds remaining`;
  } else if (remainingSeconds === 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} remaining`;
  } else {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} and ${remainingSeconds} ${remainingSeconds === 1 ? 'second' : 'seconds'} remaining`;
  }
};

/**
 * タイマー完了のアナウンス
 */
export const announceTimerComplete = (): void => {
  announceForAccessibility('Focus session complete. Well done!');
};

/**
 * フォーカス開始のアナウンス
 */
export const announceFocusStart = (): void => {
  announceForAccessibility('Focus session started. Stay concentrated for 25 minutes.');
};

/**
 * フォーカスリセットのアナウンス
 */
export const announceFocusReset = (): void => {
  announceForAccessibility('Focus session reset. You can start a new session anytime.');
};