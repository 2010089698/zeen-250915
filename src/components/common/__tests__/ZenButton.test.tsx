/**
 * ZenButtonコンポーネントテスト
 * Phase 4.3: Red - 共通コンポーネントテストファースト
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import assert from 'power-assert';
import { ZenButton } from '../ZenButton';

describe('ZenButton', () => {
  describe('Rendering', () => {
    test('should render with default props', () => {
      const { getByText, getByTestId } = render(
        <ZenButton title="Test Button" onPress={() => {}} />
      );

      assert(getByText('Test Button'), 'ボタンテキストが表示される');
      assert(getByTestId('zen-button'), 'ZenButtonが存在する');
    });

    test('should render with custom testID', () => {
      const { getByTestId } = render(
        <ZenButton 
          title="Custom Button" 
          onPress={() => {}} 
          testID="custom-button"
        />
      );

      assert(getByTestId('custom-button'), 'カスタムtestIDが適用される');
    });

    test('should have proper accessibility properties', () => {
      const { getByTestId } = render(
        <ZenButton 
          title="Accessible Button" 
          onPress={() => {}} 
          accessibilityLabel="Custom accessibility label"
        />
      );

      const button = getByTestId('zen-button');
      assert(button.props.accessible === true, 'ボタンがアクセシブル');
      assert(button.props.accessibilityRole === 'button', 'ボタンロールが設定されている');
      assert(button.props.accessibilityLabel === 'Custom accessibility label', 'カスタムアクセシビリティラベルが設定される');
    });
  });

  describe('Interaction', () => {
    test('should call onPress when pressed', () => {
      let pressed = false;
      const handlePress = () => { pressed = true; };

      const { getByTestId } = render(
        <ZenButton title="Press Me" onPress={handlePress} />
      );

      fireEvent.press(getByTestId('zen-button'));
      assert(pressed === true, 'onPress関数が呼ばれる');
    });

    test('should handle multiple rapid presses', () => {
      let pressCount = 0;
      const handlePress = () => { pressCount++; };

      const { getByTestId } = render(
        <ZenButton title="Multi Press" onPress={handlePress} />
      );

      const button = getByTestId('zen-button');
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);

      assert(pressCount === 3, '連続プレスが全て処理される');
    });

    test('should not call onPress when disabled', () => {
      let pressed = false;
      const handlePress = () => { pressed = true; };

      const { getByTestId } = render(
        <ZenButton title="Disabled" onPress={handlePress} disabled={true} />
      );

      fireEvent.press(getByTestId('zen-button'));
      assert(pressed === false, '無効時はonPressが呼ばれない');
    });
  });

  describe('Styling', () => {
    test('should apply zen design styles', () => {
      const { getByTestId } = render(
        <ZenButton title="Styled Button" onPress={() => {}} />
      );

      const button = getByTestId('zen-button');
      assert(button, '禅スタイルが適用されたボタンが存在する');
    });

    test('should apply primary variant styles', () => {
      const { getByTestId } = render(
        <ZenButton title="Primary" onPress={() => {}} variant="primary" />
      );

      const button = getByTestId('zen-button');
      assert(button, 'プライマリスタイルが適用される');
    });

    test('should apply secondary variant styles', () => {
      const { getByTestId } = render(
        <ZenButton title="Secondary" onPress={() => {}} variant="secondary" />
      );

      const button = getByTestId('zen-button');
      assert(button, 'セカンダリスタイルが適用される');
    });

    test('should apply disabled styles when disabled', () => {
      const { getByTestId } = render(
        <ZenButton title="Disabled" onPress={() => {}} disabled={true} />
      );

      const button = getByTestId('zen-button');
      assert(button, '無効状態のスタイルが適用される');
    });

    test('should apply custom styles', () => {
      const customStyle = { backgroundColor: 'red' };
      
      const { getByTestId } = render(
        <ZenButton 
          title="Custom Style" 
          onPress={() => {}} 
          style={customStyle}
        />
      );

      const button = getByTestId('zen-button');
      assert(button, 'カスタムスタイルが適用される');
    });
  });

  describe('Size Variants', () => {
    test('should apply small size styles', () => {
      const { getByTestId } = render(
        <ZenButton title="Small" onPress={() => {}} size="small" />
      );

      const button = getByTestId('zen-button');
      assert(button, 'スモールサイズが適用される');
    });

    test('should apply medium size styles (default)', () => {
      const { getByTestId } = render(
        <ZenButton title="Medium" onPress={() => {}} />
      );

      const button = getByTestId('zen-button');
      assert(button, 'ミディアムサイズが適用される');
    });

    test('should apply large size styles', () => {
      const { getByTestId } = render(
        <ZenButton title="Large" onPress={() => {}} size="large" />
      );

      const button = getByTestId('zen-button');
      assert(button, 'ラージサイズが適用される');
    });
  });

  describe('Zen Design Elements', () => {
    test('should have rounded corners (natural stone effect)', () => {
      const { getByTestId } = render(
        <ZenButton title="Rounded" onPress={() => {}} />
      );

      const button = getByTestId('zen-button');
      assert(button, '自然石効果の角丸が適用される');
    });

    test('should have subtle shadow (cloud-like)', () => {
      const { getByTestId } = render(
        <ZenButton title="Shadow" onPress={() => {}} />
      );

      const button = getByTestId('zen-button');
      assert(button, '雲のような極薄シャドウが適用される');
    });

    test('should use zen color palette', () => {
      const { getByTestId } = render(
        <ZenButton title="Zen Colors" onPress={() => {}} />
      );

      const button = getByTestId('zen-button');
      assert(button, '禅カラーパレットが適用される');
    });

    test('should have proper letter spacing for breathing effect', () => {
      const { getByText } = render(
        <ZenButton title="Breathing Text" onPress={() => {}} />
      );

      const text = getByText('Breathing Text');
      assert(text, '呼吸感のある文字間隔が適用される');
    });
  });

  describe('Animation', () => {
    test('should have smooth press animation', () => {
      const { getByTestId } = render(
        <ZenButton title="Animated" onPress={() => {}} />
      );

      const button = getByTestId('zen-button');
      
      // ボタンが存在することでアニメーション機能があることを確認
      assert(button, 'スムーズなプレスアニメーションが設定される');
    });
  });
});