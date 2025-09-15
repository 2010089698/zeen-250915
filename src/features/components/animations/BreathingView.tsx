/**
 * BreathingView コンポーネント
 * Phase 6.2: 呼吸のリズムのような緩やかなフェードアニメーション
 * プラットフォーム対応版（Web/Expo Go では標準Viewにフォールバック）
 */

import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import { canUseReanimated } from '../../../config/utils/platform';

// Reanimatedを条件付きでインポート
let Animated: any, useSharedValue: any, useAnimatedStyle: any, withRepeat: any, withTiming: any, Easing: any;

if (canUseReanimated) {
  try {
    const reanimated = require('react-native-reanimated');
    Animated = reanimated.default;
    useSharedValue = reanimated.useSharedValue;
    useAnimatedStyle = reanimated.useAnimatedStyle;
    withRepeat = reanimated.withRepeat;
    withTiming = reanimated.withTiming;
    Easing = reanimated.Easing;
  } catch (error) {
    console.warn('Reanimated could not be loaded:', error);
  }
}

interface BreathingViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  duration?: number;        // アニメーション周期（ミリ秒）
  minOpacity?: number;      // 最小透明度
  maxOpacity?: number;      // 最大透明度
  enabled?: boolean;        // アニメーション有効/無効
  testID?: string;
}

export const BreathingView: React.FC<BreathingViewProps> = ({
  children,
  style,
  duration = 4000,          // 4秒周期（呼吸のような自然なリズム）
  minOpacity = 0.7,         // 70% - 完全に消えない禅的な表現
  maxOpacity = 1.0,         // 100% - 完全な存在感
  enabled = true,
  testID = 'breathing-view',
}) => {
  // Reanimatedが使用できない場合は標準のViewを使用（プラットフォーム別対応）
  if (!canUseReanimated || !useSharedValue || !Animated) {
    // デバッグログ追加
    if (__DEV__) {
      console.log('BreathingView: Using fallback View (Reanimated not available)');
    }
    
    return (
      <View 
        style={[
          style,
          // Web/Expo Go では固定の透明度を適用
          { opacity: enabled ? maxOpacity : 0.9 }
        ]} 
        testID={testID}
      >
        {children}
      </View>
    );
  }

  const opacity = useSharedValue(maxOpacity);

  useEffect(() => {
    if (enabled && withRepeat && withTiming && Easing) {
      // 呼吸のような緩やかなイージング
      opacity.value = withRepeat(
        withTiming(minOpacity, {
          duration: duration / 2,
          easing: Easing.bezier(0.4, 0.0, 0.6, 1.0), // 呼吸の吸う動作
        }),
        -1, // 無限リピート
        true // リバース（吐く動作）
      );
    } else if (enabled === false && withTiming && Easing) {
      // アニメーション停止時は最大透明度に戻す
      opacity.value = withTiming(maxOpacity, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
    }
  }, [enabled, duration, minOpacity, maxOpacity, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[style, animatedStyle]}
      testID={testID}
    >
      {children}
    </Animated.View>
  );
};