/**
 * フォント読みやすさ検証ユーティリティ
 * Phase 6.3: フォント読みやすさ確認
 */

import { ZenTypography } from '../../app/styles/typography';
import { checkContrast } from './colorContrast';

/**
 * フォントサイズの読みやすさ評価
 */
interface FontReadabilityResult {
  size: number;
  isReadable: boolean;
  isLargeText: boolean;
  recommendations: string[];
}

/**
 * WCAGに基づくフォントサイズの評価
 * - 通常テキスト: 16px以上推奨
 * - 大きなテキスト: 18px以上 (14pt以上) または太字14px以上 (14pt太字以上)
 */
export const evaluateFontSize = (
  fontSize: number,
  fontWeight: string = '400',
  context: string = ''
): FontReadabilityResult => {
  const isBold = ['bold', '600', '700', '800', '900'].includes(fontWeight);
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);
  const isReadable = fontSize >= 12; // 最低限の読みやすさ
  
  const recommendations: string[] = [];
  
  if (fontSize < 14) {
    recommendations.push('Font size is too small. Consider increasing to at least 14px.');
  }
  
  if (fontSize < 16 && !isLargeText) {
    recommendations.push('For better readability, consider increasing to 16px or larger.');
  }
  
  if (context === 'timer' && fontSize < 24) {
    recommendations.push('Timer display should be large enough for quick reading (24px+).');
  }
  
  if (context === 'button' && fontSize < 16) {
    recommendations.push('Button text should be at least 16px for touch accessibility.');
  }
  
  return {
    size: fontSize,
    isReadable,
    isLargeText,
    recommendations,
  };
};

/**
 * 禅的タイポグラフィの読みやすさ検証
 */
export const validateZenTypography = () => {
  console.log('=== Zen Typography Readability Validation ===');
  
  const results = {
    timer: evaluateFontSize(ZenTypography.fontSize.timer.size, '100', 'timer'),
    title: evaluateFontSize(ZenTypography.fontSize.title.size, '100', 'title'),
    header: evaluateFontSize(ZenTypography.fontSize.header.size, '200', 'header'),
    button: evaluateFontSize(ZenTypography.fontSize.button.size, '300', 'button'),
    body: evaluateFontSize(ZenTypography.fontSize.body.size, '300', 'body'),
    caption: evaluateFontSize(ZenTypography.fontSize.caption.size, '300', 'caption'),
  };
  
  Object.entries(results).forEach(([variant, result]) => {
    console.log(`${variant.toUpperCase()}:`, {
      size: `${result.size}px`,
      readable: result.isReadable,
      largeText: result.isLargeText,
      recommendations: result.recommendations,
    });
  });
  
  return results;
};

/**
 * 軽量フォントウェイト使用時の注意点
 */
export const validateLightFontWeights = () => {
  console.log('=== Light Font Weight Considerations ===');
  
  const warnings: string[] = [];
  
  // UltraLight (100) の使用警告
  warnings.push('UltraLight (100) fonts can be difficult to read on some displays.');
  warnings.push('Ensure sufficient contrast ratio and larger font sizes when using light weights.');
  warnings.push('Consider ExtraLight (200) or Light (300) for better readability.');
  
  // 小さいフォントサイズでの軽量ウェイトの警告
  if (ZenTypography.fontSize.caption.size <= 14) {
    warnings.push('Caption text with light font weight may be hard to read.');
  }
  
  console.log('Warnings:', warnings);
  return warnings;
};

/**
 * アクセシビリティ総合評価
 */
export const performAccessibilityAudit = () => {
  console.log('=== Zen App Accessibility Audit ===');
  
  // タイポグラフィ検証
  const typographyResults = validateZenTypography();
  
  // 軽量フォント警告
  const fontWeightWarnings = validateLightFontWeights();
  
  // コントラスト検証（color contrast utilityから）
  const backgroundWhite = '#faf9f6';
  const textDark = '#2c2c2c';
  const textSecondary = '#8b8680';
  
  const contrastResults = {
    primaryText: checkContrast(textDark, backgroundWhite),
    secondaryText: checkContrast(textSecondary, backgroundWhite),
    timerText: checkContrast(textDark, backgroundWhite, true), // 大きなテキストとして評価
  };
  
  console.log('Contrast Results:', contrastResults);
  
  // 総合評価
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // コントラストチェック
  if (contrastResults.primaryText.level === 'Fail') {
    issues.push('Primary text contrast does not meet WCAG AA standards');
  }
  if (contrastResults.secondaryText.level === 'Fail') {
    issues.push('Secondary text contrast does not meet WCAG AA standards');
  }
  
  // フォントサイズチェック
  Object.entries(typographyResults).forEach(([variant, result]) => {
    if (!result.isReadable) {
      issues.push(`${variant} font size may be too small`);
    }
    recommendations.push(...result.recommendations);
  });
  
  recommendations.push(...fontWeightWarnings);
  
  const score = Math.max(0, 100 - (issues.length * 20) - (recommendations.length * 5));
  
  console.log('=== Audit Summary ===');
  console.log(`Accessibility Score: ${score}/100`);
  console.log('Issues:', issues);
  console.log('Recommendations:', recommendations);
  
  return {
    score,
    issues,
    recommendations,
    typography: typographyResults,
    contrast: contrastResults,
  };
};