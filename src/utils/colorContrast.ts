/**
 * カラーコントラスト検証ユーティリティ
 * Phase 6.3: コントラスト確認
 */

/**
 * RGB値をHex文字列から抽出
 */
const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

/**
 * RGB値を相対輝度に変換
 * WCAG 2.1の計算式に基づく
 */
const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * 2つの色のコントラスト比を計算
 * WCAG 2.1ガイドラインに基づく
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format. Use hex format (e.g., #ffffff)');
  }
  
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * WCAGコンプライアンスレベルを判定
 */
export interface ContrastResult {
  ratio: number;
  AA_Normal: boolean;      // WCAG AA 通常テキスト (4.5:1)
  AA_Large: boolean;       // WCAG AA 大きなテキスト (3:1)
  AAA_Normal: boolean;     // WCAG AAA 通常テキスト (7:1)
  AAA_Large: boolean;      // WCAG AAA 大きなテキスト (4.5:1)
  level: 'AAA' | 'AA' | 'Fail';
}

export const checkContrast = (foreground: string, background: string, isLargeText = false): ContrastResult => {
  const ratio = getContrastRatio(foreground, background);
  
  const AA_Normal = ratio >= 4.5;
  const AA_Large = ratio >= 3.0;
  const AAA_Normal = ratio >= 7.0;
  const AAA_Large = ratio >= 4.5;
  
  let level: 'AAA' | 'AA' | 'Fail';
  if (isLargeText) {
    if (AAA_Large) level = 'AAA';
    else if (AA_Large) level = 'AA';
    else level = 'Fail';
  } else {
    if (AAA_Normal) level = 'AAA';
    else if (AA_Normal) level = 'AA';
    else level = 'Fail';
  }
  
  return {
    ratio,
    AA_Normal,
    AA_Large,
    AAA_Normal,
    AAA_Large,
    level,
  };
};

/**
 * 禅的カラーパレットのコントラスト検証
 */
export const validateZenColors = () => {
  const background = '#faf9f6'; // 和紙
  const primaryText = '#2c2c2c'; // 墨
  const secondaryText = '#8b8680'; // 石色
  const primaryButton = '#65856e'; // 竹緑
  const buttonText = '#faf9f6'; // 和紙（ボタン内）
  
  console.log('=== Zen Color Contrast Validation ===');
  
  // メインテキスト（タイトル、ボタンテキストなど）
  const mainTextResult = checkContrast(primaryText, background);
  console.log(`Main Text (${primaryText} on ${background}):`, mainTextResult);
  
  // セカンダリテキスト（説明文など）
  const secondaryTextResult = checkContrast(secondaryText, background);
  console.log(`Secondary Text (${secondaryText} on ${background}):`, secondaryTextResult);
  
  // ボタンテキスト
  const buttonTextResult = checkContrast(buttonText, primaryButton);
  console.log(`Button Text (${buttonText} on ${primaryButton}):`, buttonTextResult);
  
  // タイマー表示（大きなテキスト）
  const timerTextResult = checkContrast(primaryText, background, true);
  console.log(`Timer Text - Large (${primaryText} on ${background}):`, timerTextResult);
  
  return {
    mainText: mainTextResult,
    secondaryText: secondaryTextResult,
    buttonText: buttonTextResult,
    timerText: timerTextResult,
  };
};