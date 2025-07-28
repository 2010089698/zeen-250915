# Zeen アプリケーション設計書（MVP版）

## 1. システムアーキテクチャ

### 1.1 技術スタック選定

#### 1.1.1 フレームワーク
**React Native with Expo**を採用
- **選定理由**:
  - iOS/Android両対応でコード共有率が高い
  - 豊富なライブラリエコシステム
  - タイマー機能に必要なバックグラウンド処理サポート
  - 開発・デバッグツールが充実
  - Expoによる開発効率化とクロスプラットフォーム対応

#### 1.1.2 主要ライブラリ
- **状態管理**: React Context API + useReducer
- **UI**: React Native標準コンポーネント
- **アニメーション**: React Native Reanimated（必要最小限）

### 1.2 アーキテクチャパターン

**MVVM（Model-View-ViewModel）パターン**
```
View (Components)
    ↕
ViewModel (Hooks + Context)
    ↕
Model (Timer Logic + State)
```

### 1.3 アプリケーション構成

```
src/
├── components/         # UI コンポーネント
│   ├── MainScreen.tsx
│   ├── FocusScreen.tsx
│   └── common/
├── hooks/              # カスタムフック
│   ├── useTimer.ts
│   └── useFocusSession.ts
├── context/            # 状態管理
│   └── FocusContext.tsx
├── models/             # ビジネスロジック
│   └── Timer.ts
├── types/              # 型定義
│   └── index.ts
└── App.tsx
```

## 2. UI/UX設計

### 2.1 画面構成

#### 2.1.1 メイン画面（待機状態）- 禅的デザイン
```
┌─────────────────────────┐
│                         │
│                         │
│                         │
│         Zeen            │
│                         │
│                         │
│     ┌─────────────┐     │
│     │             │     │
│     │ Start Focus │     │
│     │             │     │
│     └─────────────┘     │
│                         │
│                         │
│    Ready to focus       │
│                         │
│                         │
└─────────────────────────┘
```

#### 2.1.2 集中画面（アクティブ状態）- 瞑想的デザイン
```
┌─────────────────────────┐
│  ←                      │
│                         │
│                         │
│                         │
│                         │
│        23:45            │
│                         │
│                         │
│                         │
│                         │
│   Stay concentrated     │
│                         │
│                         │
└─────────────────────────┘
```

### 2.2 デザインシステム（禅モチーフ）

#### 2.2.1 デザインコンセプト
**「静寂の中の集中」** - 禅の精神を現代のミニマルデザインで表現
- 余白を生かした構成
- 自然素材を思わせる色合い
- 直線的でシンプルな形状
- 石庭の枯山水をイメージした配置

#### 2.2.2 カラーパレット（禅の色彩）
- **Primary**: #65856e (竹緑 - 静寂と成長)
- **Secondary**: #d4a574 (茶褐 - 大地と安定)
- **Background**: #faf9f6 (和紙 - 純粋と静寂)
- **Text Primary**: #2c2c2c (墨 - 深い思考)
- **Text Secondary**: #8b8680 (石色 - 落ち着き)
- **Accent**: #e8dcc0 (砂色 - 枯山水の砂紋)

#### 2.2.3 タイポグラフィ（禅の美学）
- **App Title**: 28px, ExtraLight (軽やかさ)
- **Timer Display**: 52px, UltraLight (瞑想的な大きさ)
- **Button Text**: 16px, Light (控えめな主張)
- **Description**: 14px, Light (静かな導き)
- **フォント**: システムフォント（Helvetica Neue / Roboto）の軽量ウェイト

#### 2.2.4 レイアウト原則（禅庭園の美学）
- **間（Ma）**: 十分な余白で心の静寂を表現
- **簡素（Kanso）**: 不要な装飾を排除
- **自然（Shizen）**: 有機的な配置とリズム
- **静寂（Seijaku）**: 動きを最小限に抑えた落ち着いた表現

#### 2.2.5 スペーシング（黄金比ベース）
- **XXLarge**: 64px (瞑想的な間)
- **XLarge**: 40px (深い呼吸)
- **Large**: 24px (自然な間隔)
- **Medium**: 16px (基本単位)
- **Small**: 8px (微細な調整)

#### 2.2.6 UI要素の禅的アプローチ
- **ボタン**: 角を微妙に丸めた矩形（自然石のイメージ）
- **境界線**: 極細または無し（雲のような境界）
- **影**: 極薄のドロップシャドウ（雲の影のような軽やかさ）
- **アニメーション**: 緩やかなフェード（呼吸のリズム）

## 3. 機能設計

### 3.1 タイマー機能

#### 3.1.1 仕様
- **固定時間**: 25分（1500秒）
- **精度**: 1秒単位
- **表示形式**: MM:SS
- **自動終了**: タイマー完了時にメイン画面に戻る

#### 3.1.2 状態管理
```typescript
interface FocusState {
  isActive: boolean;
  timeRemaining: number;
  startTime: number | null;
}

type FocusAction = 
  | { type: 'START_FOCUS' }
  | { type: 'TICK' }
  | { type: 'COMPLETE_FOCUS' }
  | { type: 'RESET' };
```

### 3.2 画面遷移

```
[メイン画面] ──→ Start Focus ──→ [集中画面]
     ↑                              │
     ├──── Timer Complete ←─────────┘
     └──── Back Button ←────────────┘
```

### 3.3 アプリ状態管理

#### 3.3.1 バックグラウンド時の動作
- アプリがバックグラウンドに移行した場合、セッションを完全にリセット
- フォアグラウンド復帰時はメイン画面に戻る
- 残り時間の保持は行わない（ストレージ不要）

## 4. データ設計

### 4.1 状態管理

#### 4.1.1 Context State
```typescript
interface FocusContextType {
  state: FocusState;
  startFocus: () => void;
  resetFocus: () => void;
  updateTimer: () => void;
}
```

#### 4.1.2 ローカルストレージ
ローカルストレージは使用しない：
- バックグラウンド移行時に完全リセットするため保存不要
- アプリ状態はメモリ上でのみ管理

### 4.2 データフロー

```
User Action → Component → Hook → Context → State Update → Re-render
```

## 5. コンポーネント設計

### 5.1 MainScreen Component

```typescript
interface MainScreenProps {}

const MainScreen: React.FC<MainScreenProps> = () => {
  const { startFocus } = useFocusContext();
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Zeen</Text>
      <TouchableOpacity 
        style={styles.startButton} 
        onPress={startFocus}
      >
        <Text style={styles.buttonText}>
          Start Focus (25 min)
        </Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        Ready to focus
      </Text>
    </SafeAreaView>
  );
};
```

### 5.2 FocusScreen Component

```typescript
interface FocusScreenProps {}

const FocusScreen: React.FC<FocusScreenProps> = () => {
  const { state, resetFocus } = useFocusContext();
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={resetFocus}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Focusing...</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>
          {formatTime(state.timeRemaining)}
        </Text>
      </View>
      <Text style={styles.description}>
        Stay concentrated
      </Text>
    </SafeAreaView>
  );
};
```

## 6. カスタムフック設計

### 6.1 useTimer Hook

```typescript
interface UseTimerReturn {
  timeRemaining: number;
  isActive: boolean;
  start: () => void;
  complete: () => void;
  reset: () => void;
  tick: () => void;
}

const useTimer = (initialTime: number = 1500): UseTimerReturn => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  
  const start = useCallback(() => {
    setIsActive(true);
  }, []);
  
  const complete = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(initialTime);
  }, [initialTime]);
  
  const reset = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(initialTime);
  }, [initialTime]);
  
  const tick = useCallback(() => {
    setTimeRemaining(prev => {
      if (prev <= 1) {
        complete();
        return initialTime;
      }
      return prev - 1;
    });
  }, [complete, initialTime]);
  
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isActive, tick]);
  
  return { timeRemaining, isActive, start, complete, reset, tick };
};
```

### 6.2 useFocusSession Hook

```typescript
const useFocusSession = () => {
  const { timeRemaining, isActive, start, complete, reset } = useTimer(1500);
  
  const startFocus = useCallback(() => {
    start();
  }, [start]);
  
  const completeFocus = useCallback(() => {
    complete();
  }, [complete]);
  
  const resetFocus = useCallback(() => {
    reset();
  }, [reset]);
  
  return {
    state: { isActive, timeRemaining },
    startFocus,
    completeFocus,
    resetFocus
  };
};
```

## 7. アプリ状態管理設計

### 7.1 AppState Management

```typescript
const useAppStateHandler = () => {
  const { state, resetFocus } = useFocusContext();
  
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background' && state.isActive) {
        // バックグラウンド移行時は完全リセットしてメイン画面に戻る
        resetFocus();
      }
    };
    
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [state.isActive, resetFocus]);
};
```

## 8. テスト戦略（t_wadaメソッド採用）

### 8.1 TDD実践による開発手法
**和田卓人氏のテスト駆動開発手法**を採用し、テストファーストの開発を実践
- **Red-Green-Refactor**サイクルの徹底
- 自動テスト文化の構築
- テストによる設計の改善

### 8.2 単体テスト

#### 8.2.1 対象
- `useTimer` フック
- `useFocusSession` フック
- タイマーロジック関数
- 時間フォーマット関数

#### 8.2.2 テストケース例（TDD アプローチ）
```typescript
describe('useTimer', () => {
  test('should start timer with correct initial time', () => {
    const { result } = renderHook(() => useTimer(1500));
    expect(result.current.timeRemaining).toBe(1500);
    expect(result.current.isActive).toBe(false);
  });
  
  test('should countdown when active', () => {
    // タイマー動作テスト
  });
});
```

### 8.3 統合テスト

#### 8.3.1 対象
- 画面遷移フロー
- 戻るボタンの動作
- 状態管理の整合性

### 8.4 テストツールスタック

#### 8.4.1 主要テストフレームワーク
- **Jest** - React Native標準のテストランナー
- **@testing-library/react-native** - React Nativeコンポーネントテスト
- **power-assert** - t_wada氏開発のアサーションライブラリ

#### 8.4.2 TDD実践ツール（t_wadaメソッド）
- **power-assert** - 詳細なアサーション情報提供によるテスト品質向上
- **Jest Watch Mode** - Red-Green-Refactorサイクル高速実行環境

#### 8.4.3 各種テスト対応ツール
- **Jest Snapshot** - UIスナップショットテスト
- **@testing-library/react-native** - インタラクションテスト
- **Jest Coverage** - テストカバレッジ計測・可視化

#### 8.4.4 開発効率化ツール
- **Jest Watch Mode** - ファイル変更時の自動テスト実行
- **Expo Testing** - Expo環境でのテスト実行サポート

#### 8.4.5 CI/CD統合
- **Jest CLI** - 継続的インテグレーションでの自動テスト実行
- **カバレッジレポート** - GitHub Actions等との連携
- **自動品質ゲート** - テスト失敗時のデプロイ防止

## 9. パフォーマンス最適化

### 9.1 メモリ効率化
- `useMemo`、`useCallback`の適切な使用
- 不要な再レンダリングの防止
- インターバルの適切なクリーンアップ

### 9.2 バッテリー最適化
- フォアグラウンドでのみタイマー動作
- タイマー更新頻度の最適化

## 10. 国際化対応

### 10.1 文言管理

```typescript
const en = {
  appTitle: 'Zeen',
  startFocus: 'Start Focus',
  focusing: 'Focusing...',
  readyToFocus: 'Ready to focus',
  stayConcentrated: 'Stay concentrated',
  duration: '25 min'
};

export default { en };
```

## 11. 技術的制約・考慮事項

### 11.1 プラットフォーム制約
- フォアグラウンドでのみ動作する設計
- 各プラットフォームのUI ガイドライン準拠

### 11.2 ユーザビリティ考慮事項
- ダークモード対応準備
- 大画面デバイス対応

---

**設計書バージョン**: 1.3 (禅デザイン版)  
**作成日**: 2025年7月28日  
**最終更新**: 2025年7月28日  
**対応要件書**: requirements.md v2.2  
**開発タスクリスト**: tasks.md