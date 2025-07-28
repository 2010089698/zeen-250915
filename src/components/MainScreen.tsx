/**
 * MainScreen コンポーネント
 * Phase 4.1: Refactor - 禅デザイン完全適用
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusContext } from '../context/FocusContext';

export const MainScreen: React.FC = () => {
  const { startFocus } = useFocusContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} testID="main-screen-container">
        {/* 上部の瞑想的余白 */}
        <View style={styles.topSpacer} />
        
        {/* アプリタイトル - 禅の精神を表現 */}
        <Text style={styles.title}>Zeen</Text>
        
        {/* 中央の深い呼吸のような余白 */}
        <View style={styles.centerSpacer} />
        
        {/* スタートボタン - 自然石をイメージした形状 */}
        <TouchableOpacity 
          style={[styles.startButton, styles.buttonShadow]} 
          onPress={startFocus}
          testID="start-focus-button"
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Start 25-minute focus session"
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Start Focus</Text>
        </TouchableOpacity>
        
        {/* 導きのメッセージとの間隔 */}
        <View style={styles.messageSpacer} />
        
        {/* 静かな導きのメッセージ */}
        <Text style={styles.description}>Ready to focus</Text>
        
        {/* 下部の余白で静寂感を演出 */}
        <View style={styles.bottomSpacer} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // セーフエリア全体の設定
  safeArea: {
    flex: 1,
    backgroundColor: '#faf9f6', // 和紙 - 純粋と静寂
  },
  
  // メインコンテナ - 禅庭園の美学
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40, // 左右の余白
  },
  
  // 瞑想的な余白配置（黄金比ベース）
  topSpacer: {
    flex: 2, // 上部の大きな余白で「間」を表現
  },
  
  centerSpacer: {
    flex: 1.618, // 黄金比による自然な間隔
  },
  
  messageSpacer: {
    height: 40, // XLarge - 深い呼吸のような間隔
  },
  
  bottomSpacer: {
    flex: 1, // 下部余白で静寂感
  },
  
  // アプリタイトル - 禅の精神を表現
  title: {
    fontSize: 28,
    fontWeight: '100', // UltraLight - より軽やかに
    color: '#2c2c2c', // 墨 - 深い思考
    letterSpacing: 2, // 文字間隔で呼吸感を演出
    textAlign: 'center',
  },
  
  // スタートボタン - 自然石をイメージ
  startButton: {
    backgroundColor: '#65856e', // 竹緑 - 静寂と成長
    borderRadius: 12, // より自然な丸み
    paddingVertical: 18,
    paddingHorizontal: 40,
    minWidth: 160, // 最小幅でバランス確保
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // 極薄のドロップシャドウ（雲の影のような軽やかさ）
  buttonShadow: {
    shadowColor: '#2c2c2c',
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
    color: '#faf9f6', // 和紙色
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  
  // 導きのメッセージ - 静かな導き
  description: {
    fontSize: 14,
    fontWeight: '300', // Light
    color: '#8b8680', // 石色 - 落ち着き
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 20,
  },
});