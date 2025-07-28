/**
 * ZenText コンポーネント
 * Phase 4.3: Green - 最小限の実装（テスト通過）
 */

import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface ZenTextProps {
  children: React.ReactNode;
  variant?: 'title' | 'body' | 'caption' | 'timer';
  color?: 'primary' | 'secondary' | 'muted';
  align?: 'left' | 'center' | 'right';
  testID?: string;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  style?: TextStyle;
}

export const ZenText: React.FC<ZenTextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  align = 'center',
  testID,
  accessibilityLabel,
  accessibilityRole = 'text',
  style
}) => {
  const textStyle = [
    styles.base,
    styles[variant],
    styles[`color_${color}`],
    styles[`align_${align}`],
    style
  ];

  return (
    <Text
      style={textStyle}
      testID={testID}
      accessible={true}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  // 基本スタイル
  base: {
    letterSpacing: 0.5, // 呼吸感のある文字間隔
  },

  // バリアント
  title: {
    fontSize: 28,
    fontWeight: '100', // UltraLight
    letterSpacing: 2,
    lineHeight: 36,
  },

  body: {
    fontSize: 16,
    fontWeight: '300', // Light
    lineHeight: 24,
  },

  caption: {
    fontSize: 14,
    fontWeight: '300', // Light
    lineHeight: 20,
  },

  timer: {
    fontSize: 64,
    fontWeight: '100', // UltraLight
    letterSpacing: 4, // より広い文字間隔
    lineHeight: 72,
  },

  // カラー
  color_primary: {
    color: '#2c2c2c', // 墨 - 深い思考
  },

  color_secondary: {
    color: '#65856e', // 竹緑 - 静寂と成長
  },

  color_muted: {
    color: '#8b8680', // 石色 - 落ち着き
  },

  // アライメント
  align_left: {
    textAlign: 'left',
  },

  align_center: {
    textAlign: 'center',
  },

  align_right: {
    textAlign: 'right',
  },
});