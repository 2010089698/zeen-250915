/**
 * ZenText コンポーネント
 * Phase 4.3: Green - 最小限の実装（テスト通過）
 */

import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { ZenColors } from '../../styles/colors';
import { ZenTypography, getTypographyStyle, getFontWeight } from '../../styles/typography';

interface ZenTextProps {
  children: React.ReactNode;
  variant?: 'title' | 'body' | 'caption' | 'timer';
  color?: 'primary' | 'secondary' | 'muted';
  align?: 'left' | 'center' | 'right';
  testID?: string;
  accessibilityLabel?: string;
  accessibilityRole?: 'text' | 'header' | 'none';
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
    ...getTypographyStyle('title'),
    fontWeight: getFontWeight('ultraLight'),
  },

  body: {
    ...getTypographyStyle('body'),
    fontWeight: getFontWeight('light'),
  },

  caption: {
    ...getTypographyStyle('caption'),
    fontWeight: getFontWeight('light'),
  },

  timer: {
    ...getTypographyStyle('timer'),
    fontWeight: getFontWeight('ultraLight'),
  },

  // カラー
  color_primary: {
    color: ZenColors.text.primary, // 墨 - 深い思考
  },

  color_secondary: {
    color: ZenColors.primary.main, // 竹緑 - 静寂と成長
  },

  color_muted: {
    color: ZenColors.text.secondary, // 石色 - 落ち着き
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