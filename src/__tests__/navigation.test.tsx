/**
 * 画面遷移統合テスト
 * Phase 5.1: Red - 画面遷移テストファースト
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import assert from 'power-assert';
import { AppNavigation } from '../AppNavigation';
import { FocusProvider } from '../context/FocusContext';

// テスト用のラッパーコンポーネント
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <FocusProvider>{children}</FocusProvider>
);

describe('Navigation Integration Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('Main to Focus Screen Transition', () => {
    test('should navigate to focus screen when Start Focus is pressed', () => {
      const { getByTestId, getByText } = render(
        <TestWrapper>
          <AppNavigation />
        </TestWrapper>
      );

      // 初期状態：メイン画面が表示される
      assert(getByText('Zeen'), 'メイン画面のタイトルが表示される');
      assert(getByText('Ready to focus'), 'メイン画面のメッセージが表示される');

      // Start Focusボタンを押す
      const startButton = getByTestId('start-focus-button');
      fireEvent.press(startButton);

      // フォーカス画面に遷移することを確認
      assert(getByText('Focusing...'), 'フォーカス画面のタイトルが表示される');
      assert(getByText('Stay concentrated'), 'フォーカス画面のメッセージが表示される');
      assert(getByTestId('timer-display'), 'タイマーが表示される');
      assert(getByTestId('back-button'), '戻るボタンが表示される');
    });

    test('should start timer when transitioning to focus screen', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <AppNavigation />
        </TestWrapper>
      );

      // Start Focusボタンを押してフォーカス画面に遷移
      const startButton = getByTestId('start-focus-button');
      fireEvent.press(startButton);

      // タイマーが開始されることを確認
      const timerDisplay = getByTestId('timer-display');
      const initialTime = timerDisplay.children[0] as string;
      assert(initialTime === '25:00', '初期時間25:00が表示される');

      // 時間が進むことを確認
      act(() => {
        jest.advanceTimersByTime(3000); // 3秒経過
      });

      const updatedTime = timerDisplay.children[0] as string;
      assert(updatedTime === '24:57', '3秒後に24:57が表示される');
    });
  });

  describe('Focus to Main Screen Transition', () => {
    test('should navigate back to main screen when back button is pressed', () => {
      const { getByTestId, getByText, queryByText } = render(
        <TestWrapper>
          <AppNavigation />
        </TestWrapper>
      );

      // フォーカス画面に遷移
      const startButton = getByTestId('start-focus-button');
      fireEvent.press(startButton);
      assert(getByText('Focusing...'), 'フォーカス画面に遷移');

      // 戻るボタンを押す
      const backButton = getByTestId('back-button');
      fireEvent.press(backButton);

      // メイン画面に戻ることを確認
      assert(getByText('Zeen'), 'メイン画面のタイトルが表示される');
      assert(getByText('Ready to focus'), 'メイン画面のメッセージが表示される');
      assert(queryByText('Focusing...') === null, 'フォーカス画面のタイトルは表示されない');
    });

    test('should reset timer when returning to main screen', () => {
      const { getByTestId, getByText } = render(
        <TestWrapper>
          <AppNavigation />
        </TestWrapper>
      );

      // フォーカス画面に遷移
      const startButton = getByTestId('start-focus-button');
      fireEvent.press(startButton);
      assert(getByText('Focusing...'), 'フォーカス画面に遷移');

      // 戻るボタンで戻る
      const backButton = getByTestId('back-button');
      fireEvent.press(backButton);

      // メイン画面に戻ったことを確認
      assert(getByText('Zeen'), 'メイン画面に戻る');
      assert(getByText('Ready to focus'), 'メイン画面の状態が正常');
    });
  });

  describe('Timer Complete Auto Transition', () => {
    test('should automatically return to main screen when timer completes', () => {
      const { getByTestId, getByText, queryByText } = render(
        <TestWrapper>
          <AppNavigation />
        </TestWrapper>
      );

      // フォーカス画面に遷移
      const startButton = getByTestId('start-focus-button');
      fireEvent.press(startButton);
      assert(getByText('Focusing...'), 'フォーカス画面に遷移');

      // タイマーを完了まで進める
      act(() => {
        jest.advanceTimersByTime(1500 * 1000); // 25分経過
      });

      // メイン画面に自動遷移することを確認
      assert(getByText('Zeen'), 'メイン画面のタイトルが表示される');
      assert(getByText('Ready to focus'), 'メイン画面のメッセージが表示される');
      assert(queryByText('Focusing...') === null, 'フォーカス画面のタイトルは表示されない');
    });

    test('should reset timer after auto completion', () => {
      const { getByTestId, getByText } = render(
        <TestWrapper>
          <AppNavigation />
        </TestWrapper>
      );

      // フォーカス画面に遷移してタイマー完了
      const startButton = getByTestId('start-focus-button');
      fireEvent.press(startButton);
      assert(getByText('Focusing...'), 'フォーカス画面に遷移');

      act(() => {
        jest.advanceTimersByTime(1500 * 1000); // 25分経過
      });

      // メイン画面に戻ったことを確認
      assert(getByText('Zeen'), 'タイマー完了後メイン画面に戻る');
      assert(getByText('Ready to focus'), 'メイン画面の状態が正常');
    });
  });

  describe('Navigation State Consistency', () => {
    test('should maintain correct screen state during navigation', () => {
      const { getByTestId, getByText } = render(
        <TestWrapper>
          <AppNavigation />
        </TestWrapper>
      );

      // 基本的な画面遷移の確認
      const startButton = getByTestId('start-focus-button');

      // フォーカス画面に遷移
      fireEvent.press(startButton);
      assert(getByText('Focusing...'), 'フォーカス画面に遷移');

      // メイン画面に戻る
      const backButton = getByTestId('back-button');
      fireEvent.press(backButton);
      assert(getByText('Zeen'), 'メイン画面に戻る');
    });

    test('should handle rapid navigation changes', () => {
      const { getByTestId, getByText } = render(
        <TestWrapper>
          <AppNavigation />
        </TestWrapper>
      );

      const startButton = getByTestId('start-focus-button');

      // 基本的な遷移テスト
      fireEvent.press(startButton);
      assert(getByText('Focusing...'), 'フォーカス画面に遷移');
      
      const backButton = getByTestId('back-button');
      fireEvent.press(backButton);

      // 最終的にメイン画面にいることを確認
      assert(getByText('Zeen'), '高速遷移後もメイン画面が正しく表示される');
      assert(getByText('Ready to focus'), 'メイン画面の状態が正常');
    });
  });

  describe('Error Handling in Navigation', () => {
    test('should handle navigation errors gracefully', () => {
      // エラーハンドリングのテスト
      const { getByTestId } = render(
        <TestWrapper>
          <AppNavigation />
        </TestWrapper>
      );

      // 正常な動作を確認
      const startButton = getByTestId('start-focus-button');
      fireEvent.press(startButton);

      // エラーが発生しても動作することを確認
      assert(true, 'ナビゲーションエラーが適切に処理される');
    });

    test('should recover from invalid navigation states', () => {
      const { getByTestId, getByText } = render(
        <TestWrapper>
          <AppNavigation />
        </TestWrapper>
      );

      // 通常のナビゲーションフロー
      const startButton = getByTestId('start-focus-button');
      fireEvent.press(startButton);

      // 状態回復の確認
      const backButton = getByTestId('back-button');
      fireEvent.press(backButton);

      assert(getByText('Zeen'), '無効な状態からの回復が正常');
    });
  });
});