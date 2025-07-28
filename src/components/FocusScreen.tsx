/**
 * FocusScreen コンポーネント
 * Phase 4.2: Refactor - 瞑想的禅デザイン完全適用
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusContext } from '../context/FocusContext';
import { formatTime } from '../models/Timer';

export const FocusScreen: React.FC = () => {
  const { state, resetFocus } = useFocusContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} testID="focus-screen-container">
        {/* ヘッダー部分 - 戻るボタン（左上に控えめに配置） */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={resetFocus}
            testID="back-button"
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go back and reset timer"
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>

        {/* メインコンテンツ - 瞑想的な中央配置 */}
        <View style={styles.content}>
          {/* 上部の深い静寂を表す余白 */}
          <View style={styles.topSpacer} />
          
          {/* フォーカス状態のタイトル - 静かな宣言 */}
          <Text style={styles.title}>Focusing...</Text>
          
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
          <Text style={styles.description}>Stay concentrated</Text>
          
          {/* 下部の余白で静寂感を演出 */}
          <View style={styles.bottomSpacer} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // セーフエリア全体 - 和紙の背景
  safeArea: {
    flex: 1,
    backgroundColor: '#faf9f6', // 和紙 - 純粋と静寂
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
    paddingHorizontal: 24,
    paddingVertical: 20,
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
    color: '#2c2c2c', // 墨 - 深い思考
    fontWeight: '200', // ExtraLight
    letterSpacing: 1,
  },
  
  // メインコンテンツエリア - 瞑想的な中央配置
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  
  // 瞑想的な余白配置（最大限の静寂感）
  topSpacer: {
    flex: 2.618, // 黄金比による上部の大きな余白
  },
  
  bottomSpacer: {
    flex: 1.618, // 黄金比による下部余白
  },
  
  // フォーカス状態タイトル - 静かな宣言
  title: {
    fontSize: 18,
    fontWeight: '200', // ExtraLight
    color: '#2c2c2c', // 墨 - 深い思考
    textAlign: 'center',
    letterSpacing: 1.5,
    marginBottom: 80, // XXLarge+ の余白で瞑想的な間隔
  },
  
  // タイマーコンテナ - 瞑想の中心
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  
  // タイマー表示 - 52px UltraLight（瞑想的な大きさ）
  timer: {
    fontSize: 64, // より大きく瞑想的に
    fontWeight: '100', // UltraLight
    color: '#2c2c2c', // 墨 - 深い思考
    textAlign: 'center',
    letterSpacing: 4, // より広い文字間隔で呼吸感
    lineHeight: 72,
  },
  
  // 集中への導きメッセージ - 静かな導き
  description: {
    fontSize: 14,
    fontWeight: '300', // Light
    color: '#8b8680', // 石色 - 落ち着き
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 20,
    marginTop: 60, // 大きな余白で静寂感
  },
});