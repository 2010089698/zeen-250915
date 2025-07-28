# Zeen アプリ開発変更履歴

## 技術的意思決定とアップグレード履歴

---

## v0.2.0 - 2025年7月28日: Expo SDK 53 + Expo Router導入

### 🚀 メジャーアップグレード

#### Expo SDK 52 → 53 移行
- **Expo SDK**: `~52.0.0` → `~53.0.0`
- **React**: `18.3.1` → `19.0.0`
- **React Native**: `0.76.9` → `0.79.5`
- **React DOM**: `18.3.1` → `19.0.0`

#### 新アーキテクチャ採用
- **New Architecture**: Expo SDK 53でデフォルト有効
- **パフォーマンス向上**: Turbo ModulesとFabric Rendererの活用
- **Web対応準備**: 同一コードベースでのWeb展開可能性

### 🛤️ Expo Router導入

#### ナビゲーション方式変更
- **Before**: 従来の画面遷移方式
- **After**: Expo Router v5.1.4によるファイルベースルーティング

#### パッケージ更新
- **expo-router**: `~4.0.0` → `~5.1.4`
- **@expo/metro-runtime**: `~4.0.0` → `~5.0.4`

#### ファイル構造変更
```
# Before
src/App.tsx (エントリーポイント)

# After  
app/_layout.tsx (ルートレイアウト)
app/index.tsx (メイン画面ルート)
```

#### package.json エントリーポイント変更
```json
// Before
"main": "node_modules/expo/AppEntry.js"

// After
"main": "expo-router/entry"
```

### 📦 依存関係更新

#### 主要パッケージ
- **expo-constants**: `~17.0.0` → `~17.1.7`
- **expo-font**: `~13.0.0` → `~13.3.2`
- **expo-linking**: `~7.0.0` → `~7.1.7`
- **expo-splash-screen**: `~0.29.0` → `~0.30.10`
- **expo-status-bar**: `~2.0.0` → `~2.2.3`
- **expo-system-ui**: `~4.0.0` → `~5.0.10`
- **expo-web-browser**: `~14.0.0` → `~14.2.0`

#### React Native関連
- **react-native-gesture-handler**: `~2.20.2` → `~2.24.0`
- **react-native-reanimated**: `~3.16.1` → `~3.17.4`
- **react-native-safe-area-context**: `4.12.0` → `5.4.0`
- **react-native-screens**: `~4.4.0` → `~4.11.1`
- **react-native-web**: `~0.19.13` → `^0.20.0`

#### 開発環境
- **eslint-config-expo**: `~8.0.1` → `~9.2.0`
- **typescript**: `~5.3.3` → `~5.8.3`
- **jest-expo**: `~52.0.0` → `~53.0.0`
- **@types/react**: `~18.3.12` → `~19.0.0`
- **react-test-renderer**: `18.3.1` → `19.0.0`

### 🔧 設定変更

#### Babel設定修正
```javascript
// Before (非推奨警告が発生)
plugins: [
  require.resolve('expo-router/babel'),
  'react-native-reanimated/plugin',
]

// After (SDK 53対応)
plugins: [
  'react-native-reanimated/plugin',
]
```

#### アセットファイル追加
- `assets/favicon.png`: Web対応用ファビコン
- `assets/icon.png`: アプリアイコン
- `assets/splash.png`: スプラッシュ画面
- `assets/adaptive-icon.png`: Android適応アイコン

### 🐛 解決した課題

#### 初期問題
1. **App.jsファイルが見つからない**: `Unable to resolve "../../App"`
   - **原因**: Expoが従来のApp.jsを期待、実際は`src/App.tsx`に配置
   - **解決**: Expo Router導入によりファイルベースルーティングに統一

2. **faviconファイル不足**: `ENOENT: no such file or directory, open './assets/favicon.png'`
   - **原因**: app.jsonで指定されたアセットファイルが存在しない
   - **解決**: 必要なアセットファイルを作成・配置

#### SDK 53移行時の課題
3. **getDevServer is not a function**: TypeError in metro-runtime
   - **原因**: `@expo/metro-runtime` v4とSDK 53の非互換性
   - **解決**: metro-runtime v5.0.4への更新

4. **peer dependency conflicts**: React 19とパッケージの非互換性
   - **原因**: 多数のパッケージがReact 19に未対応
   - **解決**: `--legacy-peer-deps`フラグ使用での段階的更新

5. **ngrokトンネル接続タイムアウト**: `ngrok tunnel took too long to connect`
   - **原因**: ネットワーク環境またはngrokサービスの問題
   - **解決**: ローカルネットワーク接続（--lan）への切り替え

### 🎯 技術的メリット

#### パフォーマンス向上
- New Architectureによる描画性能改善
- React 19の並行機能活用
- メモリ効率の最適化

#### 開発効率向上
- ファイルベースルーティングによる直感的なナビゲーション
- TypeScript統合の向上
- デバッグツールの改善

#### 将来性確保
- Expo SDK最新版による長期サポート
- Web対応の技術基盤構築
- 最新React生態系との整合性

### 📋 移行手順（記録）

1. **Expo SDK 53更新**
   ```bash
   npm install expo@~53.0.0
   ```

2. **React/React Native更新**
   ```bash
   npm install react@19.0.0 react-dom@19.0.0 react-native@0.79.5 --legacy-peer-deps
   ```

3. **Expo Router導入**
   ```bash
   npm install expo-router@~5.1.4 @expo/metro-runtime@~5.0.4 --legacy-peer-deps
   ```

4. **package.json修正**
   ```json
   "main": "expo-router/entry"
   ```

5. **ファイル構造調整**
   - `App.tsx`削除
   - `app/_layout.tsx`、`app/index.tsx`作成

6. **依存関係一括更新**
   ```bash
   npm install [各種パッケージ] --legacy-peer-deps
   ```

---

## v0.1.0 - 2025年7月28日: 初期プロジェクト作成

### 🎬 プロジェクト開始

#### 技術スタック選定
- **フレームワーク**: React Native with Expo SDK 52
- **言語**: TypeScript
- **状態管理**: React Context API + useReducer
- **テスト**: Jest + @testing-library/react-native + power-assert
- **UI**: React Native標準コンポーネント
- **デザイン**: 禅の精神をモチーフにしたミニマルデザイン

#### 初期実装
- プロジェクト構造作成
- 基本UIコンポーネント（MainScreen）実装
- 禅デザインシステム適用
- TypeScript設定完了

---

**変更履歴バージョン**: 1.0  
**作成日**: 2025年7月28日  
**最終更新**: 2025年7月28日