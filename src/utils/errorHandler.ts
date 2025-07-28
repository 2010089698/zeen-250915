/**
 * 統一エラーハンドリングユーティリティ
 * Phase 5.3: Refactor - エラーハンドリング改善
 */

export enum ErrorType {
  TIMER = 'TIMER',
  APP_STATE = 'APP_STATE',
  CONTEXT = 'CONTEXT',
  NAVIGATION = 'NAVIGATION',
  LIFECYCLE = 'LIFECYCLE',
  UNKNOWN = 'UNKNOWN'
}

export interface ErrorReport {
  type: ErrorType;
  message: string;
  error?: Error;
  timestamp: number;
  context?: any;
}

class ErrorHandler {
  private static instance: ErrorHandler;
  private errorReports: ErrorReport[] = [];
  private maxReports = 50; // メモリ使用量を制限

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * エラーを処理し、必要に応じてログ出力
   */
  handleError(
    type: ErrorType,
    message: string,
    error?: Error,
    context?: any
  ): void {
    const errorReport: ErrorReport = {
      type,
      message,
      error,
      timestamp: Date.now(),
      context
    };

    // エラーレポートを記録
    this.addErrorReport(errorReport);

    // 開発環境でのみログ出力
    if (__DEV__) {
      this.logError(errorReport);
    }

    // 重要なエラーの場合は追加処理
    if (this.isCriticalError(type)) {
      this.handleCriticalError(errorReport);
    }
  }

  /**
   * タイマー関連エラーのヘルパー
   */
  handleTimerError(message: string, error?: Error, context?: any): void {
    this.handleError(ErrorType.TIMER, message, error, context);
  }

  /**
   * AppState関連エラーのヘルパー
   */
  handleAppStateError(message: string, error?: Error, context?: any): void {
    this.handleError(ErrorType.APP_STATE, message, error, context);
  }

  /**
   * Context関連エラーのヘルパー
   */
  handleContextError(message: string, error?: Error, context?: any): void {
    this.handleError(ErrorType.CONTEXT, message, error, context);
  }

  /**
   * ナビゲーション関連エラーのヘルパー
   */
  handleNavigationError(message: string, error?: Error, context?: any): void {
    this.handleError(ErrorType.NAVIGATION, message, error, context);
  }

  /**
   * ライフサイクル関連エラーのヘルパー
   */
  handleLifecycleError(message: string, error?: Error, context?: any): void {
    this.handleError(ErrorType.LIFECYCLE, message, error, context);
  }

  /**
   * エラーレポートを取得（デバッグ用）
   */
  getErrorReports(): ErrorReport[] {
    return [...this.errorReports];
  }

  /**
   * エラーレポートをクリア
   */
  clearErrorReports(): void {
    this.errorReports = [];
  }

  private addErrorReport(report: ErrorReport): void {
    this.errorReports.unshift(report);
    
    // 最大件数を超えた場合は古いものを削除
    if (this.errorReports.length > this.maxReports) {
      this.errorReports = this.errorReports.slice(0, this.maxReports);
    }
  }

  private logError(report: ErrorReport): void {
    const prefix = `[Zeen Error - ${report.type}]`;
    
    console.warn(`${prefix} ${report.message}`);
    
    if (report.error) {
      console.warn(`${prefix} Details:`, report.error);
    }
    
    if (report.context) {
      console.warn(`${prefix} Context:`, report.context);
    }
  }

  private isCriticalError(type: ErrorType): boolean {
    // 重要なエラータイプを定義
    return [
      ErrorType.LIFECYCLE,
      ErrorType.CONTEXT
    ].includes(type);
  }

  private handleCriticalError(report: ErrorReport): void {
    // 重要なエラーに対する追加処理
    if (__DEV__) {
      console.error('[CRITICAL ERROR]', report);
    }
    
    // 将来的にはクラッシュレポーティングやユーザー通知なども可能
  }
}

// シングルトンインスタンスをエクスポート
export const errorHandler = ErrorHandler.getInstance();

// 便利な関数エクスポート
export const handleTimerError = (message: string, error?: Error, context?: any) =>
  errorHandler.handleTimerError(message, error, context);

export const handleAppStateError = (message: string, error?: Error, context?: any) =>
  errorHandler.handleAppStateError(message, error, context);

export const handleContextError = (message: string, error?: Error, context?: any) =>
  errorHandler.handleContextError(message, error, context);

export const handleNavigationError = (message: string, error?: Error, context?: any) =>
  errorHandler.handleNavigationError(message, error, context);

export const handleLifecycleError = (message: string, error?: Error, context?: any) =>
  errorHandler.handleLifecycleError(message, error, context);