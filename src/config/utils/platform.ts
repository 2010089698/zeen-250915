/**
 * プラットフォーム検出ユーティリティ
 * Expo Go / Web での互換性問題を解決するため
 */

import { Platform } from 'react-native';

/**
 * 現在のプラットフォームがWebかどうか
 */
export const isWeb = Platform.OS === 'web';

/**
 * 現在のプラットフォームがExpo Goかどうか
 * expo-constants を使用して正確に判定
 */
export const isExpoGo = (() => {
  try {
    const Constants = require('expo-constants');
    // Expo Goの特徴：appOwnership が 'expo' で、executionEnvironment が存在
    return Constants.default?.appOwnership === 'expo' || 
           Constants.default?.executionEnvironment === 'storeClient';
  } catch (error) {
    // expo-constants が利用できない場合は開発環境での簡易判定
    console.warn('expo-constants not available, using fallback detection:', error);
    return __DEV__ && Platform.OS !== 'web' && typeof navigator === 'undefined';
  }
})();

/**
 * 開発環境かどうか
 */
export const isDevelopment = __DEV__;

/**
 * Reanimatedが安全に使用できるかどうか
 * Expo Goでは制限があるため、より慎重に判定
 */
export const canUseReanimated = (() => {
  if (isWeb) return false;
  if (isExpoGo) return false;
  
  try {
    // Reanimatedが実際に利用可能かテスト
    require('react-native-reanimated');
    return true;
  } catch {
    return false;
  }
})();

/**
 * プラットフォーム固有の値を選択
 */
export const platformSelect = <T>(options: {
  web?: T;
  expoGo?: T;
  native?: T;
  default: T;
}): T => {
  if (isWeb && options.web !== undefined) {
    return options.web;
  }
  if (isExpoGo && options.expoGo !== undefined) {
    return options.expoGo;
  }
  if (!isWeb && !isExpoGo && options.native !== undefined) {
    return options.native;
  }
  return options.default;
};

/**
 * プラットフォーム検出結果をデバッグ出力
 */
export const debugPlatformInfo = () => {
  console.log('🔍 Platform Detection Debug Info:');
  console.log(`  Platform.OS: ${Platform.OS}`);
  console.log(`  isWeb: ${isWeb}`);
  console.log(`  isExpoGo: ${isExpoGo}`);
  console.log(`  isDevelopment: ${isDevelopment}`);
  console.log(`  canUseReanimated: ${canUseReanimated}`);
  
  try {
    const Constants = require('expo-constants');
    console.log(`  expo-constants available: true`);
    console.log(`  appOwnership: ${Constants.default?.appOwnership}`);
    console.log(`  executionEnvironment: ${Constants.default?.executionEnvironment}`);
  } catch {
    console.log(`  expo-constants available: false`);
  }
  
  console.log(`  navigator available: ${typeof navigator !== 'undefined'}`);
  console.log('📱 Platform Detection Complete\n');
};