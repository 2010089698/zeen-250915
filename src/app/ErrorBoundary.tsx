/**
 * エラーバウンダリコンポーネント
 * Phase 5.3: Green - React Component エラーハンドリング
 */

import React, { ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // エラーが発生した場合にstateを更新
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // エラーログを開発環境でのみ出力
    if (__DEV__) {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error info:', errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // カスタムフォールバックUIがある場合は使用
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // デフォルトのエラーUI
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Zeen</Text>
            <Text style={styles.message}>Something went wrong</Text>
            <Text style={styles.subtitle}>Please restart the app</Text>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6', // 和紙 - 純粋と静寂
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: '100', // UltraLight
    color: '#2c3e50', // 墨 - 深い集中
    marginBottom: 24,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: '300', // Light
    color: '#34495e', // 石 - 安定と静寂
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '300', // Light
    color: '#7f8c8d', // 霧 - 柔らかな境界
    textAlign: 'center',
  },
});

// デフォルトエクスポートを追加
export default ErrorBoundary;