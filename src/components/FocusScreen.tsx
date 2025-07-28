/**
 * FocusScreen コンポーネント
 * Phase 4.2: Refactor - 瞑想的禅デザイン完全適用
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusContext } from '../context/FocusContext';
import { formatTime } from '../models/Timer';
import { ZenSpacing } from '../styles/spacing';
import { ZenColors } from '../styles/colors';
import { BreathingView } from './animations/BreathingView';
import { FadeTransition } from './animations/FadeTransition';
import { PressableScale } from './animations/PressableScale';
import { formatTimeForAccessibility, announceFocusReset } from '../utils/accessibility';
import { platformSelect } from '../utils/platform';

export const FocusScreen: React.FC = () => {
  const { state, resetFocus } = useFocusContext();

  // アクセシビリティ：フォーカス画面表示時のアナウンス
  useEffect(() => {
    if (state.isActive) {
      // 画面表示から少し遅れてアナウンス
      const timer = setTimeout(() => {
        // スクリーンリーダー用のアナウンスは自動で行われるため、ここでは特別な処理は不要
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [state.isActive]);

  // リセット時のアクセシビリティアナウンス
  const handleReset = () => {
    announceFocusReset();
    resetFocus();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} testID="focus-screen-container">
        {/* ヘッダー部分 - 戻るボタン（左上に控えめに配置） */}
        <View style={styles.header}>
          <PressableScale 
            style={styles.backButton} 
            onPress={handleReset}
            testID="back-button"
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go back and reset timer"
            accessibilityHint="Double tap to stop the current focus session and return to the main screen"
            scaleValue={0.92} // 戻るボタンはより目立つエフェクト
            duration={100}    // 短いアニメーション
          >
            <Text style={styles.backIcon}>←</Text>
          </PressableScale>
        </View>

        {/* メインコンテンツ - 瞑想的な中央配置 */}
        <FadeTransition visible={true} duration={800}>
          <View style={styles.content}>
            {/* 上部の深い静寂を表す余白 */}
            <View style={styles.topSpacer} />
            
            {/* メインコンテンツエリア */}
            <View style={styles.contentArea}>
              {/* フォーカス状態のタイトル - 静かな宣言 */}
              <BreathingView duration={6000} minOpacity={0.6}>
                <Text 
                  style={styles.title}
                  accessibilityRole="header"
                  accessibilityLabel="Focus session in progress"
                >
                  Focusing...
                </Text>
              </BreathingView>
              
              {/* タイマー表示 - 瞑想の中心 */}
              <View style={styles.timerContainer}>
                <Text 
                  style={styles.timer}
                  testID="timer-display"
                  accessible={true}
                  accessibilityRole="text"
                  accessibilityLabel={`Time remaining: ${formatTime(state.timeRemaining)}`}
                >
                  {formatTime(state.timeRemaining)}
                </Text>
              </View>
              
              {/* 集中への導きのメッセージ */}
              <BreathingView duration={8000} minOpacity={0.8}>
                <Text style={styles.description}>Stay concentrated</Text>
              </BreathingView>
            </View>
            
            {/* 下部の余白で静寂感を演出 */}
            <View style={styles.bottomSpacer} />
          </View>
        </FadeTransition>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // セーフエリア全体 - 和紙の背景
  safeArea: {
    flex: 1,
    backgroundColor: ZenColors.background.primary, // 和紙 - 純粋と静寂
  },
  
  // メインコンテナ
  container: {
    flex: 1,
  },
  
  // ヘッダー部分 - 戻るボタンエリア
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    paddingHorizontal: ZenSpacing.Large,
    paddingVertical: ZenSpacing.Medium,
  },
  
  // 戻るボタン - 控えめで自然な配置
  backButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  
  // 戻るアイコン - 墨色で軽やか
  backIcon: {
    fontSize: 28,
    color: ZenColors.text.primary, // 墨 - 深い思考
    fontWeight: '200', // ExtraLight
    letterSpacing: 1,
  },
  
  // メインコンテンツエリア - プラットフォーム別レイアウト
  content: platformSelect({
    web: {
      // Web: padding ベースのレイアウト
      minHeight: '100vh',
      alignItems: 'center',
      paddingHorizontal: ZenSpacing.XLarge,
      paddingTop: ZenSpacing.MeditativeTop,
      paddingBottom: ZenSpacing.BottomSerenity,
      justifyContent: 'center',
    },
    expoGo: {
      // Expo Go: 調整済みフレックスレイアウト
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: ZenSpacing.XLarge,
      justifyContent: 'center',
    },
    native: {
      // Native: 標準フレックスレイアウト  
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: ZenSpacing.XLarge,
    },
    default: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: ZenSpacing.XLarge,
      justifyContent: 'center',
    },
  }),
  
  // 瞑想的な余白配置（プラットフォーム別対応）
  topSpacer: platformSelect({
    web: {
      height: 0, // Web では padding で制御
    },
    expoGo: {
      flex: ZenSpacing.MeditativeTop, // 調整済み比率
    },
    native: {
      flex: ZenSpacing.MeditativeTop,
    },
    default: {
      flex: ZenSpacing.MeditativeTop,
    },
  }),
  
  bottomSpacer: platformSelect({
    web: {
      height: 0, // Web では padding で制御
    },
    expoGo: {
      flex: ZenSpacing.BottomSerenity, // 調整済み比率に変更
    },
    native: {
      flex: ZenSpacing.GoldenRatio,
    },
    default: {
      flex: ZenSpacing.BottomSerenity,
    },
  }),
  
  // メインコンテンツエリア - 表示確保
  contentArea: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400, // フォーカス画面用の最小表示領域
  },
  
  // フォーカス状態タイトル - 静かな宣言
  title: {
    fontSize: 18,
    fontWeight: '200', // ExtraLight
    color: ZenColors.text.primary, // 墨 - 深い思考
    textAlign: 'center',
    letterSpacing: 1.5,
    marginBottom: ZenSpacing.XXLarge + ZenSpacing.Medium, // XXLarge+ の余白で瞑想的な間隔
  },
  
  // タイマーコンテナ - 瞑想の中心
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ZenSpacing.XLarge,
  },
  
  // タイマー表示 - 64px UltraLight（瞑想的な大きさ）
  timer: {
    fontSize: 64, // より大きく瞑想的に
    fontWeight: '100', // UltraLight
    color: ZenColors.text.primary, // 墨 - 深い思考
    textAlign: 'center',
    letterSpacing: 4, // より広い文字間隔で呼吸感
    lineHeight: 72,
  },
  
  // 集中への導きメッセージ - 静かな導き
  description: {
    fontSize: 14,
    fontWeight: '300', // Light
    color: ZenColors.text.secondary, // 石色 - 落ち着き
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 20,
    marginTop: ZenSpacing.XXLarge - ZenSpacing.Small, // 大きな余白で静寂感
  },
});