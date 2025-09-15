/**
 * MainScreen コンポーネント
 * Phase 4.1: Refactor - 禅デザイン完全適用
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusContext } from '../context/FocusContext';
import { ZenSpacing } from '../../app/styles/spacing';
import { ZenColors } from '../../app/styles/colors';
import { BreathingView } from './animations/BreathingView';
import { FadeTransition } from './animations/FadeTransition';
import { PressableScale } from './animations/PressableScale';
import { announceFocusStart } from '../../config/utils/accessibility';
import { platformSelect } from '../../config/utils/platform';

export const MainScreen: React.FC = () => {
  const { state, startFocus } = useFocusContext();

  // アクセシビリティ：フォーカス開始時のアナウンス
  const handleStartFocus = () => {
    announceFocusStart();
    startFocus();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FadeTransition visible={!state.isActive} duration={600}>
        <View style={styles.container} testID="main-screen-container">
          {/* 上部の瞑想的余白 - プラットフォーム別制御 */}
          <View style={styles.topSpacer} />
          
          {/* メインコンテンツエリア */}
          <View style={styles.contentArea}>
            {/* アプリタイトル - 禅の精神を表現 */}
            <BreathingView duration={10000} minOpacity={0.9}>
              <Text style={styles.title}>Zeen</Text>
            </BreathingView>
            
            {/* 中央の深い呼吸のような余白 */}
            <View style={styles.centerSpacer} />
            
            {/* スタートボタン - 自然石をイメージした形状 */}
            <PressableScale 
              style={StyleSheet.flatten([styles.startButton, styles.buttonShadow])} 
              onPress={handleStartFocus}
              testID="start-focus-button"
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Start 25-minute focus session"
              accessibilityHint="Double tap to begin a 25-minute focused work session"
              scaleValue={0.94} // メインボタンはより目立つエフェクト
              duration={150}    // やや長めのアニメーション
            >
              <Text style={styles.buttonText}>Start Focus</Text>
            </PressableScale>
            
            {/* 導きのメッセージとの間隔 */}
            <View style={styles.messageSpacer} />
            
            {/* 静かな導きのメッセージ */}
            <BreathingView duration={12000} minOpacity={0.85}>
              <Text style={styles.description}>Ready to focus</Text>
            </BreathingView>
          </View>
          
          {/* 下部の余白で静寂感を演出 */}
          <View style={styles.bottomSpacer} />
        </View>
      </FadeTransition>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // セーフエリア全体の設定
  safeArea: {
    flex: 1,
    backgroundColor: ZenColors.background.primary, // 和紙 - 純粋と静寂
  },
  
  // メインコンテナ - プラットフォーム別レイアウト
  container: platformSelect({
    web: {
      // Web: padding/margin ベースのレイアウト
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
  
  centerSpacer: platformSelect({
    web: {
      height: ZenSpacing.CenterBreath, // Web では固定高さ
    },
    expoGo: {
      height: ZenSpacing.Large, // Expo Go では固定高さに変更
    },
    native: {
      flex: ZenSpacing.CenterBreath,
    },
    default: {
      height: ZenSpacing.Large,
    },
  }),
  
  // メインコンテンツエリア - 表示確保
  contentArea: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300, // コンテンツの最小表示領域を確保
  },

  messageSpacer: {
    height: ZenSpacing.XLarge, // 全プラットフォーム共通
  },
  
  bottomSpacer: platformSelect({
    web: {
      height: 0, // Web では padding で制御
    },
    expoGo: {
      flex: ZenSpacing.BottomSerenity, // 調整済み比率
    },
    native: {
      flex: ZenSpacing.BottomSerenity,
    },
    default: {
      flex: ZenSpacing.BottomSerenity,
    },
  }),
  
  // アプリタイトル - 禅の精神を表現
  title: {
    fontSize: 28,
    fontWeight: '100', // UltraLight - より軽やかに
    color: ZenColors.text.primary, // 墨 - 深い思考
    letterSpacing: 2, // 文字間隔で呼吸感を演出
    textAlign: 'center',
  },
  
  // スタートボタン - 自然石をイメージ
  startButton: {
    backgroundColor: ZenColors.primary.main, // 竹緑 - 静寂と成長
    borderRadius: 12, // より自然な丸み
    paddingVertical: 18,
    paddingHorizontal: ZenSpacing.XLarge,
    minWidth: 160, // 最小幅でバランス確保
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // 極薄のドロップシャドウ（雲の影のような軽やかさ）
  buttonShadow: {
    shadowColor: ZenColors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08, // より薄く
    shadowRadius: 4,
    elevation: 2,
  },
  
  // ボタンテキスト - 控えめな主張
  buttonText: {
    fontSize: 16,
    fontWeight: '300', // Light
    color: ZenColors.text.inverse, // 和紙色
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  
  // 導きのメッセージ - 静かな導き
  description: {
    fontSize: 14,
    fontWeight: '300', // Light
    color: ZenColors.text.secondary, // 石色 - 落ち着き
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 20,
  },
});