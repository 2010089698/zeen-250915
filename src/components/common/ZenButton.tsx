/**
 * ZenButton コンポーネント
 * Phase 4.3: Green - 最小限の実装（テスト通過）
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ZenButtonProps {
  title: string;
  onPress: () => void;
  testID?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const ZenButton: React.FC<ZenButtonProps> = ({
  title,
  onPress,
  testID = 'zen-button',
  accessibilityLabel,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  style
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    disabled && styles.disabled,
    style
  ];

  const textStyle = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
    disabled && styles.textDisabled
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      activeOpacity={0.85}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // 基本スタイル
  base: {
    borderRadius: 12, // 自然石をイメージした角丸
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2c2c2c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08, // 極薄シャドウ
    shadowRadius: 4,
    elevation: 2,
  },

  // バリアント
  primary: {
    backgroundColor: '#65856e', // 竹緑 - 静寂と成長
  },

  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#65856e',
  },

  // サイズ
  size_small: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 120,
  },

  size_medium: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 160,
  },

  size_large: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    minWidth: 200,
  },

  // 無効状態
  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },

  // テキストスタイル
  text: {
    fontWeight: '300', // Light
    letterSpacing: 0.5, // 呼吸感のある文字間隔
    textAlign: 'center',
  },

  text_primary: {
    color: '#faf9f6', // 和紙色
  },

  text_secondary: {
    color: '#65856e', // 竹緑
  },

  textSize_small: {
    fontSize: 14,
  },

  textSize_medium: {
    fontSize: 16,
  },

  textSize_large: {
    fontSize: 18,
  },

  textDisabled: {
    opacity: 0.7,
  },
});