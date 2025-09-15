/**
 * ZenButton コンポーネント
 * Phase 4.3: Green - 最小限の実装（テスト通過）
 */

import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';
import { ZenSpacing } from '../../../app/styles/spacing';
import { ZenColors } from '../../../app/styles/colors';
import { PressableScale } from '../animations/PressableScale';

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
  const variantStyle = variant === 'primary' ? styles.primary : styles.secondary;
  const sizeStyle = size === 'small' ? styles.size_small : size === 'large' ? styles.size_large : styles.size_medium;
  const textVariantStyle = variant === 'primary' ? styles.text_primary : styles.text_secondary;
  const textSizeStyle = size === 'small' ? styles.textSize_small : size === 'large' ? styles.textSize_large : styles.textSize_medium;

  const buttonStyle = StyleSheet.flatten([
    styles.base,
    variantStyle,
    sizeStyle,
    disabled && styles.disabled,
    style
  ]);

  const textStyle = [
    styles.text,
    textVariantStyle,
    textSizeStyle,
    disabled && styles.textDisabled
  ];

  return (
    <PressableScale
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      scaleValue={0.95} // 禅的な控えめなスケール
      duration={120}    // やや長めのアニメーション
    >
      <Text style={textStyle}>{title}</Text>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  // 基本スタイル
  base: {
    borderRadius: 12, // 自然石をイメージした角丸
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ZenColors.text.primary,
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
    backgroundColor: ZenColors.primary.main, // 竹緑 - 静寂と成長
  },

  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: ZenColors.primary.main,
  },

  // サイズ
  size_small: {
    paddingVertical: 12,
    paddingHorizontal: ZenSpacing.Large,
    minWidth: 120,
  },

  size_medium: {
    paddingVertical: ZenSpacing.Medium,
    paddingHorizontal: 32,
    minWidth: 160,
  },

  size_large: {
    paddingVertical: 20,
    paddingHorizontal: ZenSpacing.XLarge,
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
    color: ZenColors.text.inverse, // 和紙色
  },

  text_secondary: {
    color: ZenColors.primary.main, // 竹緑
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