# Zeen-250915

React Native アプリケーション（Expo Router 使用）

## セットアップ

### 依存関係のインストール

```bash
npm install
```

## 開発

### Expo Go での開発

```bash
# キャッシュをクリアして開発サーバーを起動
npx expo start -c
```

#### 起動手順

1. 上記コマンドを実行して開発サーバーを起動
2. DevToolsでConnectionを「Tunnel」に設定
3. 表示されるQRコードをExpo Goアプリ内のスキャナで読み取り
4. アプリがデバイスにインストール・起動されます

### プロジェクト診断

```bash
# プロジェクトの設定を診断
npm run doctor
```

## 利用可能なスクリプト

- `npm start` - 開発サーバーを起動
- `npm run start:clear` - キャッシュをクリアして開発サーバーを起動
- `npm run web` - Web 版を起動
- `npm test` - テストを実行
- `npm run test:watch` - テストをウォッチモードで実行
- `npm run doctor` - プロジェクトの設定を診断

## プロジェクト構造

```
src/
├── app/           # Expo Router のページ
├── config/        # 設定ファイル
├── domain/        # ドメインロジック
├── features/      # 機能別コンポーネント
├── infra/         # インフラストラクチャ
├── ports/         # ポート（インターフェース）
└── schema/        # スキーマ定義
```
