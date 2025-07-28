/**
 * 禅的タイポグラフィシステム - 最終調整版
 * Phase 6.1: タイポグラフィの統一化
 */

export const ZenTypography = {
  // フォントファミリー（禅的軽やかさ）
  fontFamily: {
    ios: 'HelveticaNeue',
    android: 'Roboto',
    default: 'system', // システムフォント
  },
  
  // フォントウェイト（軽やかな表現）
  fontWeight: {
    ultraLight: '100' as const,   // 最も軽やか - タイマー・タイトル
    extraLight: '200' as const,   // 軽やか - アイコン・サブテキスト
    light: '300' as const,        // 標準的な軽さ - ボタン・説明文
    normal: '400' as const,       // 通常 - 基本テキスト（使用頻度低）
  },
  
  // フォントサイズ（瞑想的階層）
  fontSize: {
    // タイマー表示（瞑想の中心）
    timer: {
      size: 64,
      lineHeight: 72,
      letterSpacing: 4,
    },
    
    // アプリタイトル（禅の精神）
    title: {
      size: 28,
      lineHeight: 36,
      letterSpacing: 2,
    },
    
    // セクションヘッダー（静かな宣言）
    header: {
      size: 18,
      lineHeight: 24,
      letterSpacing: 1.5,
    },
    
    // ボタンテキスト（控えめな主張）
    button: {
      size: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    
    // 本文テキスト（自然な流れ）
    body: {
      size: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    
    // 説明テキスト（静かな導き）
    caption: {
      size: 14,
      lineHeight: 20,
      letterSpacing: 0.3,
    },
    
    // アイコンサイズ（バランスの取れた存在感）
    icon: {
      small: 20,
      medium: 24,
      large: 28,
      xlarge: 32,
    },
  },
  
  // 文字間隔の調整（呼吸感の演出）
  letterSpacing: {
    tight: -0.5,      // 密接 - 使用頻度低
    normal: 0,        // 標準 - 使用頻度低
    relaxed: 0.3,     // リラックス - 説明文
    comfortable: 0.5, // 快適 - ボタン・本文
    spacious: 1,      // ゆったり - アイコン
    meditative: 1.5,  // 瞑想的 - ヘッダー
    transcendent: 2,  // 超越的 - タイトル
    zen: 4,           // 禅的 - タイマー
  },
  
  // 行間の調整（縦の呼吸感）
  lineHeight: {
    tight: 1.2,       // 密接
    normal: 1.4,      // 標準
    comfortable: 1.5, // 快適 - 本文・ボタン
    relaxed: 1.6,     // リラックス
    spacious: 1.8,    // ゆったり
  },
} as const;

export type TypographyVariant = 'timer' | 'title' | 'header' | 'button' | 'body' | 'caption';
export type FontWeight = keyof typeof ZenTypography.fontWeight;
export type LetterSpacing = keyof typeof ZenTypography.letterSpacing;

/**
 * タイポグラフィスタイルを取得するヘルパー関数
 */
export const getTypographyStyle = (variant: TypographyVariant) => {
  const variantStyle = ZenTypography.fontSize[variant];
  
  return {
    fontSize: variantStyle.size,
    lineHeight: variantStyle.lineHeight,
    letterSpacing: variantStyle.letterSpacing,
  };
};

/**
 * フォントウェイトを取得するヘルパー関数
 */
export const getFontWeight = (weight: FontWeight) => {
  return ZenTypography.fontWeight[weight];
};

/**
 * 文字間隔を取得するヘルパー関数
 */
export const getLetterSpacing = (spacing: LetterSpacing): number => {
  return ZenTypography.letterSpacing[spacing];
};