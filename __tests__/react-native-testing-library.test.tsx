/**
 * React Native Testing Library 動作確認
 * Phase 2: TDD準備
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import assert from 'power-assert';

// テスト用のシンプルなコンポーネント
const TestComponent = () => (
  <View testID="test-view">
    <Text testID="test-text">Hello, Testing!</Text>
  </View>
);

describe('React Native Testing Library Setup', () => {
  test('can render React Native components', () => {
    render(<TestComponent />);
    
    const textElement = screen.getByTestId('test-text');
    expect(textElement).toBeTruthy();
  });

  test('can find text content', () => {
    render(<TestComponent />);
    
    const textElement = screen.getByText('Hello, Testing!');
    expect(textElement).toBeTruthy();
  });

  test('power-assert works with React Native Testing Library', () => {
    render(<TestComponent />);
    
    const viewElement = screen.getByTestId('test-view');
    assert(viewElement !== null, 'View element should exist');
  });
});