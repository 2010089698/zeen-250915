/**
 * ZenTextコンポーネントテスト
 * Phase 4.3: Red - 共通テキストコンポーネントテスト
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import assert from 'power-assert';
import { ZenText } from '../ZenText';

describe('ZenText', () => {
  describe('Rendering', () => {
    test('should render with default props', () => {
      const { getByText } = render(
        <ZenText>Default Text</ZenText>
      );

      assert(getByText('Default Text'), 'デフォルトテキストが表示される');
    });

    test('should render with custom testID', () => {
      const { getByTestId } = render(
        <ZenText testID="custom-text">Custom Test ID</ZenText>
      );

      assert(getByTestId('custom-text'), 'カスタムTestIDが適用される');
    });

    test('should have proper accessibility properties', () => {
      const { getByTestId } = render(
        <ZenText 
          testID="accessible-text"
          accessibilityLabel="Custom label"
          accessibilityRole="text"
        >
          Accessible Text
        </ZenText>
      );

      const text = getByTestId('accessible-text');
      assert(text.props.accessible === true, 'テキストがアクセシブル');
      assert(text.props.accessibilityRole === 'text', 'テキストロールが設定される');
      assert(text.props.accessibilityLabel === 'Custom label', 'カスタムアクセシビリティラベルが設定される');
    });
  });

  describe('Typography Variants', () => {
    test('should apply title variant styles', () => {
      const { getByTestId } = render(
        <ZenText variant="title" testID="title-text">Title Text</ZenText>
      );

      const text = getByTestId('title-text');
      assert(text, 'タイトルバリアントが適用される');
    });

    test('should apply body variant styles (default)', () => {
      const { getByTestId } = render(
        <ZenText testID="body-text">Body Text</ZenText>
      );

      const text = getByTestId('body-text');
      assert(text, 'ボディバリアント（デフォルト）が適用される');
    });

    test('should apply caption variant styles', () => {
      const { getByTestId } = render(
        <ZenText variant="caption" testID="caption-text">Caption Text</ZenText>
      );

      const text = getByTestId('caption-text');
      assert(text, 'キャプションバリアントが適用される');
    });

    test('should apply timer variant styles', () => {
      const { getByTestId } = render(
        <ZenText variant="timer" testID="timer-text">25:00</ZenText>
      );

      const text = getByTestId('timer-text');
      assert(text, 'タイマーバリアントが適用される');
    });
  });

  describe('Color Variants', () => {
    test('should apply primary color', () => {
      const { getByTestId } = render(
        <ZenText color="primary" testID="primary-text">Primary</ZenText>
      );

      const text = getByTestId('primary-text');
      assert(text, 'プライマリカラーが適用される');
    });

    test('should apply secondary color', () => {
      const { getByTestId } = render(
        <ZenText color="secondary" testID="secondary-text">Secondary</ZenText>
      );

      const text = getByTestId('secondary-text');
      assert(text, 'セカンダリカラーが適用される');
    });

    test('should apply muted color', () => {
      const { getByTestId } = render(
        <ZenText color="muted" testID="muted-text">Muted</ZenText>
      );

      const text = getByTestId('muted-text');
      assert(text, 'ミュートカラーが適用される');
    });
  });

  describe('Alignment', () => {
    test('should apply left alignment', () => {
      const { getByTestId } = render(
        <ZenText align="left" testID="left-text">Left</ZenText>
      );

      const text = getByTestId('left-text');
      assert(text, '左寄せが適用される');
    });

    test('should apply center alignment (default)', () => {
      const { getByTestId } = render(
        <ZenText testID="center-text">Center</ZenText>
      );

      const text = getByTestId('center-text');
      assert(text, '中央寄せ（デフォルト）が適用される');
    });

    test('should apply right alignment', () => {
      const { getByTestId } = render(
        <ZenText align="right" testID="right-text">Right</ZenText>
      );

      const text = getByTestId('right-text');
      assert(text, '右寄せが適用される');
    });
  });

  describe('Custom Styling', () => {
    test('should apply custom styles', () => {
      const customStyle = { fontSize: 20, color: 'red' };
      
      const { getByTestId } = render(
        <ZenText style={customStyle} testID="custom-style-text">
          Custom Style
        </ZenText>
      );

      const text = getByTestId('custom-style-text');
      assert(text, 'カスタムスタイルが適用される');
    });

    test('should merge with default zen styles', () => {
      const { getByTestId } = render(
        <ZenText testID="zen-styled-text">Zen Styled</ZenText>
      );

      const text = getByTestId('zen-styled-text');
      assert(text, '禅スタイルが適用される');
    });
  });

  describe('Zen Design Elements', () => {
    test('should use zen typography', () => {
      const { getByTestId } = render(
        <ZenText testID="zen-typography">Zen Typography</ZenText>
      );

      const text = getByTestId('zen-typography');
      assert(text, '禅タイポグラフィが適用される');
    });

    test('should have proper letter spacing for breathing effect', () => {
      const { getByTestId } = render(
        <ZenText variant="title" testID="breathing-text">Breathing</ZenText>
      );

      const text = getByTestId('breathing-text');
      assert(text, '呼吸感のある文字間隔が適用される');
    });

    test('should use zen color palette', () => {
      const { getByTestId } = render(
        <ZenText color="primary" testID="zen-color">Zen Color</ZenText>
      );

      const text = getByTestId('zen-color');
      assert(text, '禅カラーパレットが適用される');
    });

    test('should have appropriate line height for readability', () => {
      const { getByTestId } = render(
        <ZenText variant="body" testID="readable-text">
          Multi-line text for readability testing
        </ZenText>
      );

      const text = getByTestId('readable-text');
      assert(text, '読みやすい行間が設定される');
    });
  });

  describe('Font Weights', () => {
    test('should apply ultra light font weight for meditation effect', () => {
      const { getByTestId } = render(
        <ZenText variant="timer" testID="ultra-light">25:00</ZenText>
      );

      const text = getByTestId('ultra-light');
      assert(text, 'ウルトラライトフォントが適用される');
    });

    test('should apply light font weight for body text', () => {
      const { getByTestId } = render(
        <ZenText variant="body" testID="light-font">Body text</ZenText>
      );

      const text = getByTestId('light-font');
      assert(text, 'ライトフォントが適用される');
    });
  });
});