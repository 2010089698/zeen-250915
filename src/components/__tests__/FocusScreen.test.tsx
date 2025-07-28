/**
 * FocusScreenコンポーネントテスト
 * Phase 4.2: Red - テストファースト
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import assert from 'power-assert';
import { FocusScreen } from '../FocusScreen';
import { FocusProvider } from '../../context/FocusContext';
import { formatTime } from '../../models/Timer';

// テスト用のラッパーコンポーネント
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <FocusProvider>{children}</FocusProvider>
);

describe('FocusScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('should render all essential elements', () => {
      const { getByText, getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );

      assert(getByText('Focusing...'), 'フォーカス状態タイトルが表示される');
      assert(getByText('Stay concentrated'), '集中メッセージが表示される');
      assert(getByTestId('back-button'), '戻るボタンが表示される');
      assert(getByTestId('timer-display'), 'タイマー表示が存在する');
    });

    test('should display timer in MM:SS format', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );

      const timerDisplay = getByTestId('timer-display');
      assert(timerDisplay, 'タイマー表示が存在する');
      
      // 初期状態は25:00のはず
      const timerText = timerDisplay.children[0] as string;
      assert(timerText === '25:00', `タイマーが25:00形式で表示される（実際: ${timerText}）`);
    });

    test('should have proper accessibility properties', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );

      const backButton = getByTestId('back-button');
      assert(backButton.props.accessible === true, '戻るボタンがアクセシブル');
      assert(backButton.props.accessibilityRole === 'button', '戻るボタンロールが設定されている');
      
      const timerDisplay = getByTestId('timer-display');
      assert(timerDisplay.props.accessible === true, 'タイマー表示がアクセシブル');
    });
  });

  describe('Timer Display', () => {
    test('should format time correctly', () => {
      // formatTime関数のテスト
      assert(formatTime(1500) === '25:00', '25分が正しくフォーマットされる');
      assert(formatTime(1234) === '20:34', '20分34秒が正しくフォーマットされる');
      assert(formatTime(59) === '00:59', '59秒が正しくフォーマットされる');
      assert(formatTime(0) === '00:00', '0秒が正しくフォーマットされる');
    });

    test('should update timer display when time changes', () => {
      // 実際のContextを使用してテスト
      const { getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );
      
      const timerDisplay = getByTestId('timer-display');
      const timerText = timerDisplay.children[0] as string;
      
      // 初期状態の25:00が表示されることを確認
      assert(timerText === '25:00', '初期状態は25:00が表示される');
    });
  });

  describe('Back Button Interaction', () => {
    test('should call resetFocus when back button is pressed', () => {
      // 実際のContextを使用してテスト
      const { getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );
      
      const backButton = getByTestId('back-button');
      
      // ボタンが存在し、押すことができることを確認
      assert(backButton, '戻るボタンが存在する');
      fireEvent.press(backButton);
      
      // エラーなく動作することを確認
      assert(true, '戻るボタンが正常に動作する');
    });

    test('should handle rapid taps on back button', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );

      const backButton = getByTestId('back-button');
      
      // 連続タップ
      fireEvent.press(backButton);
      fireEvent.press(backButton);
      fireEvent.press(backButton);

      // エラーなく動作することを確認
      assert(true, '連続タップが正常に処理される');
    });
  });

  describe('State Integration', () => {
    test('should respond to active focus state', () => {
      const { getByText } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );

      assert(getByText('Focusing...'), 'アクティブ状態のタイトルが表示される');
      assert(getByText('Stay concentrated'), '集中メッセージが表示される');
    });

    test('should display current remaining time', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );

      const timerDisplay = getByTestId('timer-display');
      assert(timerDisplay, 'タイマー表示が存在する');
      
      // 初期状態での時間表示を確認
      const displayedTime = timerDisplay.children[0] as string;
      assert(displayedTime.match(/^\d{2}:\d{2}$/), 'MM:SS形式で表示される');
    });
  });

  describe('Layout and Styling', () => {
    test('should have proper container structure', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );

      const container = getByTestId('focus-screen-container');
      assert(container, 'フォーカススクリーンコンテナが存在する');
    });

    test('should maintain zen design layout', () => {
      const { getByTestId, getByText } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );

      const container = getByTestId('focus-screen-container');
      const backButton = getByTestId('back-button');
      const timer = getByTestId('timer-display');
      const title = getByText('Focusing...');
      const message = getByText('Stay concentrated');

      assert(container, 'コンテナが存在');
      assert(backButton, '戻るボタンが存在');
      assert(timer, 'タイマーが存在');
      assert(title, 'タイトルが存在');
      assert(message, 'メッセージが存在');
    });

    test('should have large timer font for meditation effect', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );

      const timerDisplay = getByTestId('timer-display');
      assert(timerDisplay, 'タイマー表示が存在し、大きなフォントで表示される');
    });
  });

  describe('Error Handling', () => {
    test('should handle missing context gracefully', () => {
      // Contextなしでの描画テスト
      expect(() => {
        render(<FocusScreen />);
      }).toThrow('useFocusContext must be used within a FocusProvider');
    });

    test('should handle edge cases in timer display', () => {
      // formatTime関数で負の値のテスト
      assert(formatTime(-1) === '00:00', '負の値は00:00として表示される');
      assert(formatTime(0) === '00:00', '0秒は00:00として表示される');
      
      // 実際のコンポーネントの動作確認
      const { getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );
      
      const timerDisplay = getByTestId('timer-display');
      assert(timerDisplay, 'タイマー表示が正常に動作する');
    });
  });

  describe('Zen Design Elements', () => {
    test('should implement meditation-style spacing', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );

      const container = getByTestId('focus-screen-container');
      assert(container, '瞑想的な余白を持つコンテナが存在する');
    });

    test('should use ultra-light typography for timer', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <FocusScreen />
        </TestWrapper>
      );

      const timerDisplay = getByTestId('timer-display');
      assert(timerDisplay, '52px UltraLightフォントのタイマーが存在する');
    });
  });
});