/**
 * MeditationAura コンポーネント
 * Phase 6.4: 集中画面用の瞑想オーラアニメーション
 * 内なる集中エネルギーを表現する円形要素が緩やかに漂う
 * React Native標準Animated APIを使用（全プラットフォーム対応）
 */

import React, { useEffect, useRef, memo } from 'react';
import { View, ViewStyle, Animated, Easing } from 'react-native';
import { ZenColors } from '../../../app/styles/colors';

interface MeditationAuraProps {
  style?: ViewStyle;
  enabled?: boolean;      // アニメーション有効/無効
  testID?: string;
}

interface AuraCircle {
  id: number;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;       // アニメーション周期
  delay: number;          // 開始遅延
  opacity: number;        // 透明度
}

// AnimatedCircle を外部コンポーネントとして定義（再レンダリング時の再作成を防ぐ）
const AnimatedCircle: React.FC<{ circle: AuraCircle; enabled: boolean }> = memo(({ circle, enabled }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(circle.opacity)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (enabled) {
      // 滑らかなループアニメーションを作成
      const createSmoothLoop = (animatedValue: Animated.Value, 
                                fromValue: number, 
                                toValue: number, 
                                duration: number,
                                delay: number = 0) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animatedValue, {
              toValue,
              duration: duration / 2,
              easing: Easing.inOut(Easing.sin), // より滑らかなイージング
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: fromValue,
              duration: duration / 2,
              easing: Easing.inOut(Easing.sin), // より滑らかなイージング
              useNativeDriver: true,
            }),
          ])
        );
      };

      // 各アニメーションを個別に開始（より確実な遅延制御）
      const animations: Animated.CompositeAnimation[] = [];

      // X方向の漂い（左右に25px程度、滑らかに）
      animations.push(
        createSmoothLoop(translateX, -25, 25, circle.duration, circle.delay)
      );

      // Y方向の漂い（上下に15px程度、X方向とは異なるリズム）
      animations.push(
        createSmoothLoop(translateY, -15, 15, circle.duration * 1.3, circle.delay + 200)
      );

      // 蛍の光のような点滅（ぼやーっとした透明度変化）
      const createFireflyFlicker = (animatedValue: Animated.Value, baseOpacity: number, delay: number = 0) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            // ゆっくりと明るくなる
            Animated.timing(animatedValue, {
              toValue: baseOpacity,
              duration: 1200 + Math.random() * 600, // ランダムな持続時間で自然さを演出
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            // 少し明るい状態を維持
            Animated.delay(300 + Math.random() * 200),
            // ゆっくりと暗くなる
            Animated.timing(animatedValue, {
              toValue: baseOpacity * 0.3,
              duration: 1000 + Math.random() * 500,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            // 暗い状態を少し維持（蛍が消えている時間）
            Animated.delay(400 + Math.random() * 600),
          ])
        );
      };

      // 蛍のような点滅効果を適用
      animations.push(
        createFireflyFlicker(opacity, circle.opacity, circle.delay + 400)
      );

      // スケールの変化（微細な拡大縮小、最も緩やか）
      animations.push(
        createSmoothLoop(scale, 0.95, 1.05, circle.duration * 2.5, circle.delay + 600)
      );

      // すべてのアニメーションを同時開始
      animations.forEach(animation => animation.start());

      // クリーンアップ関数
      return () => {
        animations.forEach(animation => animation.stop());
        translateX.stopAnimation();
        translateY.stopAnimation();
        opacity.stopAnimation();
        scale.stopAnimation();
      };
    } else {
      // アニメーション停止時はデフォルト値に戻す
      const resetAnimations = [
        Animated.timing(translateX, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ];

      Animated.parallel(resetAnimations).start();

      // クリーンアップ
      return () => {
        resetAnimations.forEach(anim => anim.stop());
      };
    }
  }, [enabled, circle.delay, circle.duration, circle.opacity, translateX, translateY, opacity, scale]);

  return (
    <Animated.View
      style={[
        styles.animatedCircle,
        {
          width: circle.size,
          height: circle.size,
          borderRadius: circle.size / 2,
          backgroundColor: ZenColors.aura.primary,
          position: 'absolute',
          left: `${circle.initialX * 100}%`,
          top: `${circle.initialY * 100}%`,
          marginLeft: -circle.size / 2,
          marginTop: -circle.size / 2,
          transform: [
            { translateX },
            { translateY },
            { scale },
          ],
          opacity,
        },
      ]}
    />
  );
});

AnimatedCircle.displayName = 'AnimatedCircle';

// オーラ円の設定（5つの円で瞑想的なエネルギーを表現）
const auraCircles: AuraCircle[] = [
  { id: 1, size: 80, initialX: 0.3, initialY: 0.2, duration: 6000, delay: 0, opacity: 0.3 },
  { id: 2, size: 60, initialX: 0.7, initialY: 0.4, duration: 7000, delay: 800, opacity: 0.25 },
  { id: 3, size: 40, initialX: 0.5, initialY: 0.6, duration: 8000, delay: 1600, opacity: 0.2 },
  { id: 4, size: 50, initialX: 0.2, initialY: 0.7, duration: 6500, delay: 2400, opacity: 0.18 },
  { id: 5, size: 35, initialX: 0.8, initialY: 0.3, duration: 7500, delay: 3200, opacity: 0.22 },
];

export const MeditationAura: React.FC<MeditationAuraProps> = memo(({
  style,
  enabled = true,
  testID = 'meditation-aura',
}) => {
  if (__DEV__) {
    console.log('MeditationAura: Using React Native standard Animated API');
  }

  return (
    <View style={[styles.container, style]} testID={testID}>
      {enabled && auraCircles.map((circle) => (
        <AnimatedCircle key={circle.id} circle={circle} enabled={enabled} />
      ))}
    </View>
  );
});

MeditationAura.displayName = 'MeditationAura';

const styles = {
  container: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none' as const, // タッチイベントを無効化
  },
  animatedCircle: {
    // アニメーション円のベーススタイル
  },
};