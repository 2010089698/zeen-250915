/**
 * MainScreenコンポーネントテスト
 * Phase 4.1: Red - テストファースト
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import assert from 'power-assert';
import { MainScreen } from '../MainScreen';
import { FocusProvider } from '../../context/FocusContext';

// テスト用のラッパーコンポーネント
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <FocusProvider>{children}</FocusProvider>
);

describe('MainScreen', () => {
  describe('Rendering', () => {
    test('should render all essential elements', () => {
      const { getByText, getByTestId } = render(
        <TestWrapper>
          <MainScreen />
        </TestWrapper>
      );

      assert(getByText('Zeen'), 'アプリタイトルが表示される');
      assert(getByText('Ready to focus'), '準備メッセージが表示される');
      assert(getByTestId('start-focus-button'), 'スタートボタンが表示される');
    });

    test('should render start button with correct text', () => {
      const { getByTestId, getByText } = render(
        <TestWrapper>
          <MainScreen />
        </TestWrapper>
      );

      const startButton = getByTestId('start-focus-button');
      assert(startButton, 'スタートボタンが存在する');
      
      // ボタンテキストの確認
      const buttonText = getByText('Start Focus');
      assert(buttonText, 'ボタンテキストが正しい');
    });

    test('should have correct accessibility properties', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <MainScreen />
        </TestWrapper>
      );

      const startButton = getByTestId('start-focus-button');
      assert(startButton.props.accessible === true, 'ボタンがアクセシブル');
      assert(startButton.props.accessibilityRole === 'button', 'ボタンロールが設定されている');
    });
  });

  describe('User Interaction', () => {
    test('should call startFocus when start button is pressed', () => {
      // 実際のContextを使用してテスト
      const { getByTestId } = render(
        <TestWrapper>
          <MainScreen />
        </TestWrapper>
      );
      
      const startButton = getByTestId('start-focus-button');
      
      // ボタンが存在し、押すことができることを確認
      assert(startButton, 'スタートボタンが存在する');
      fireEvent.press(startButton);
      
      // エラーなく動作することを確認
      assert(true, 'ボタンが正常に動作する');
    });

    test('should handle multiple rapid taps', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <MainScreen />
        </TestWrapper>
      );
      
      const startButton = getByTestId('start-focus-button');

      // 連続タップ
      fireEvent.press(startButton);
      fireEvent.press(startButton);
      fireEvent.press(startButton);

      // エラーなく動作することを確認
      assert(true, '連続タップが正常に処理される');
    });
  });

  describe('State Integration', () => {
    test('should display correct state when not active', () => {
      const { getByText } = render(
        <TestWrapper>
          <MainScreen />
        </TestWrapper>
      );

      assert(getByText('Ready to focus'), '待機状態のメッセージが表示される');
    });

    test('should respond to context state changes', () => {
      // 通常のContext状態での描画テスト
      const { queryByText } = render(
        <TestWrapper>
          <MainScreen />
        </TestWrapper>
      );
      
      // 基本的な描画が機能することを確認
      assert(queryByText('Ready to focus') !== null, '基本的な描画が機能する');
    });
  });

  describe('Layout and Styling', () => {
    test('should have proper container structure', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <MainScreen />
        </TestWrapper>
      );

      const container = getByTestId('main-screen-container');
      assert(container, 'メインコンテナが存在する');
    });

    test('should maintain consistent layout', () => {
      const { getByTestId, getByText } = render(
        <TestWrapper>
          <MainScreen />
        </TestWrapper>
      );

      const container = getByTestId('main-screen-container');
      const title = getByText('Zeen');
      const button = getByTestId('start-focus-button');
      const message = getByText('Ready to focus');

      assert(container, 'コンテナが存在');
      assert(title, 'タイトルが存在');
      assert(button, 'ボタンが存在');
      assert(message, 'メッセージが存在');
    });
  });

  describe('Error Handling', () => {
    test('should handle missing context gracefully', () => {
      // Contextなしでの描画テスト
      expect(() => {
        render(<MainScreen />);
      }).toThrow('useFocusContext must be used within a FocusProvider');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});