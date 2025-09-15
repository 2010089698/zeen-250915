/**
 * 禅的スペーシングシステム - プラットフォーム別対応
 * Phase 6.1: 最終調整（Web/Mobile別スペーシング対応）
 */

import { platformSelect } from '../../config/utils/platform';

export const ZenSpacing = {
  // 基本単位（瞑想的な間）- プラットフォーム別
  XXLarge: platformSelect({
    web: 64,
    expoGo: 48,
    native: 64,
    default: 64,
  }),
  XLarge: platformSelect({
    web: 40,
    expoGo: 32,
    native: 40,
    default: 40,
  }),
  Large: platformSelect({
    web: 24,
    expoGo: 20,
    native: 24,
    default: 24,
  }),
  Medium: platformSelect({
    web: 16,
    expoGo: 14,
    native: 16,
    default: 16,
  }),
  Small: platformSelect({
    web: 8,
    expoGo: 6,
    native: 8,
    default: 8,
  }),
  
  // フレックス配置用 - Web は固定値、Mobile は flex 値
  GoldenRatio: platformSelect({
    web: 64,        // Web用固定ピクセル値
    expoGo: 1.618,  // Expo Go用フレックス値
    native: 1.618,  // Native用フレックス値
    default: 1.618,
  }),
  InverseGolden: platformSelect({
    web: 24,        // Web用固定ピクセル値
    expoGo: 0.618,  // Expo Go用フレックス値
    native: 0.618,  // Native用フレックス値
    default: 0.618,
  }),
  
  // 特別な比率（禅的配置）- 現実的な値に修正
  MeditativeTop: platformSelect({
    web: 80,        // Web用大きな上部余白
    expoGo: 0.8,    // Expo Go用バランス調整済みフレックス値
    native: 2.618,  // Native用フレックス値
    default: 0.8,
  }),
  CenterBreath: platformSelect({
    web: 32,        // Web用中央余白
    expoGo: 0.4,    // Expo Go用バランス調整済みフレックス値
    native: 1.618,  // Native用フレックス値
    default: 0.4,
  }),
  BottomSerenity: platformSelect({
    web: 24,        // Web用下部余白
    expoGo: 0.6,    // Expo Go用バランス調整済みフレックス値
    native: 1,      // Native用フレックス値
    default: 0.6,
  }),
} as const;

export type SpacingKey = keyof typeof ZenSpacing;

/**
 * スペーシング値を取得するヘルパー関数
 */
export const getSpacing = (key: SpacingKey): number => {
  return ZenSpacing[key];
};

// デフォルトエクスポートを追加
export default ZenSpacing;