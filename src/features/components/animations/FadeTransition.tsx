/**
 * FadeTransition コンポーネント
 * Phase 6.2: 画面遷移のための緩やかなフェードアニメーション
 * プラットフォーム対応版（Web/Expo Go では条件付き表示にフォールバック）
 */

import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import { canUseReanimated } from '../../../config/utils/platform';

// Reanimatedを条件付きでインポート
let Animated: any, useSharedValue: any, useAnimatedStyle: any, withTiming: any, Easing: any, runOnJS: any;

if (canUseReanimated) {
  try {
    const reanimated = require('react-native-reanimated');
    Animated = reanimated.default;
    useSharedValue = reanimated.useSharedValue;
    useAnimatedStyle = reanimated.useAnimatedStyle;
    withTiming = reanimated.withTiming;
    Easing = reanimated.Easing;
    runOnJS = reanimated.runOnJS;
  } catch (error) {
    console.warn('Reanimated could not be loaded:', error);
  }
}

interface FadeTransitionProps {
  children: React.ReactNode;
  style?: ViewStyle;
  visible: boolean;         // 表示/非表示状態
  duration?: number;        // フェード時間（ミリ秒）
  onAnimationComplete?: () => void; // アニメーション完了コールバック
  testID?: string;
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  style,
  visible,
  duration = 600,           // 600ms - 禅的な緩やかさ
  onAnimationComplete,
  testID = 'fade-transition',
}) => {
  // Reanimatedが使用できない場合は条件付き表示（プラットフォーム別対応）
  if (!canUseReanimated || !useSharedValue || !Animated) {
    // デバッグログ追加
    if (__DEV__) {
      console.log(`FadeTransition: Using fallback View (visible: ${visible})`);
    }
    
    useEffect(() => {
      // アニメーション完了コールバックを即座に実行
      if (onAnimationComplete) {
        const timer = setTimeout(onAnimationComplete, 100);
        return () => clearTimeout(timer);
      }
    }, [visible, onAnimationComplete]);

    // Web/Expo Go では常に表示し、opacity で制御
    return (
      <View 
        style={[
          { flex: 1 }, // Expo Go で親コンテナが画面全体を占めるように修正
          style,
          { 
            opacity: visible ? 1 : 0,
            display: visible ? 'flex' : 'none', // Web での完全非表示
          }
        ]} 
        testID={testID}
      >
        {children}
      </View>
    );
  }

  const opacity = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    const targetOpacity = visible ? 1 : 0;
    
    if (withTiming && Easing && runOnJS) {
      opacity.value = withTiming(
        targetOpacity,
        {
          duration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1.0), // 禅的な緩やかなイージング
        },
        (finished: boolean) => {
          // アニメーション完了時のコールバック
          if (finished && onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        }
      );
    }
  }, [visible, duration, opacity, onAnimationComplete]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[style, animatedStyle]}
      testID={testID}
      pointerEvents={visible ? 'auto' : 'none'} // 非表示時はタッチイベントを無効化
    >
      {children}
    </Animated.View>
  );
};