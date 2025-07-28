/**
 * PressableScale コンポーネント
 * Phase 6.2: ボタンのタップエフェクト（禅的なスケールアニメーション）
 * プラットフォーム対応版（Web/Expo Go では TouchableOpacity にフォールバック）
 */

import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { canUseReanimated } from '../../utils/platform';

// Reanimatedを条件付きでインポート
let Animated: any, useSharedValue: any, useAnimatedStyle: any, withTiming: any, Easing: any, Pressable: any, PressableStateCallbackType: any;

if (canUseReanimated) {
  try {
    const reanimated = require('react-native-reanimated');
    const reactNative = require('react-native');
    Animated = reanimated.default;
    useSharedValue = reanimated.useSharedValue;
    useAnimatedStyle = reanimated.useAnimatedStyle;
    withTiming = reanimated.withTiming;
    Easing = reanimated.Easing;
    Pressable = reactNative.Pressable;
    PressableStateCallbackType = reactNative.PressableStateCallbackType;
  } catch (error) {
    console.warn('Reanimated could not be loaded:', error);
  }
}

interface PressableScaleProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  scaleValue?: number;      // プレス時のスケール値
  duration?: number;        // アニメーション時間（ミリ秒）
  disabled?: boolean;
  testID?: string;
  accessible?: boolean;
  accessibilityRole?: 'button' | 'tab' | 'link';
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const PressableScale: React.FC<PressableScaleProps> = ({
  children,
  onPress,
  style,
  scaleValue = 0.96,        // 禅的な控えめなスケール（4%縮小）
  duration = 100,           // 瞬時の反応（100ms）
  disabled = false,
  testID,
  accessible = true,
  accessibilityRole = 'button',
  accessibilityLabel,
  accessibilityHint,
}) => {
  // Reanimatedが使用できない場合はTouchableOpacityを使用
  if (!canUseReanimated || !useSharedValue || !Animated || !Pressable) {
    return (
      <TouchableOpacity
        style={style}
        onPress={onPress}
        disabled={disabled}
        testID={testID}
        accessible={accessible}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        activeOpacity={0.85} // 禅的な透明度変化
      >
        {children}
      </TouchableOpacity>
    );
  }

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (withTiming && Easing) {
      scale.value = withTiming(scaleValue, {
        duration,
        easing: Easing.out(Easing.quad), // 自然な縮小
      });
    }
  };

  const handlePressOut = () => {
    if (withTiming && Easing) {
      scale.value = withTiming(1, {
        duration,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1), // 禅的な復帰
      });
    }
  };

  const getStyleForState = ({ pressed }: any) => {
    return [
      style,
      animatedStyle,
      {
        opacity: disabled ? 0.5 : pressed ? 0.9 : 1, // 禅的な透明度変化
      },
    ];
  };

  return (
    <AnimatedPressable
      style={getStyleForState}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      testID={testID}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      {children}
    </AnimatedPressable>
  );
};