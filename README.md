# 認証機能付きTodoアプリケーション

Next.js、TypeScript、TailwindCSSを使用した認証機能付きのTodoアプリケーションです。

## 機能

### 認証機能
- ログイン画面
- ログアウト機能
- ユーザー認証状態の管理
- ローカルストレージでのセッション管理

### Todo機能
- タスクの追加、編集、削除
- タスクの完了状態の切り替え
- タスクのフィルタリング（すべて/未完了/完了済み）
- タスクのソート（作成日順/アルファベット順）
- タスクの統計情報表示
- ユーザー別のデータ管理

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: TailwindCSS
- **状態管理**: React Context + useState
- **データ保存**: LocalStorage

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認してください。

## 使用方法

### ログイン

デモ用のアカウント情報：
- **メールアドレス**: `test@example.com`
- **パスワード**: `password`

### Todo機能

1. **タスクの追加**: 「新しいタスクを追加」セクションでタスクを入力し、「追加」ボタンをクリック
2. **タスクの完了**: チェックボックスをクリックしてタスクを完了済みにマーク
3. **タスクの編集**: 「編集」ボタンをクリックしてタスク内容を変更
4. **タスクの削除**: 「削除」ボタンをクリックしてタスクを削除
5. **フィルタリング**: 「すべて」「未完了」「完了済み」ボタンでタスクをフィルタリング
6. **ソート**: ドロップダウンメニューでタスクの並び順を変更

## プロジェクト構造

```
├── app/
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # ルートレイアウト
│   └── page.tsx             # メインページ
├── components/
│   ├── AuthProvider.tsx     # 認証コンテキストプロバイダー
│   ├── LoginForm.tsx        # ログインフォーム
│   ├── Dashboard.tsx        # ダッシュボード（メイン画面）
│   ├── TodoList.tsx         # Todoリスト表示
│   ├── AddTodoForm.tsx      # Todo追加フォーム
│   └── LoadingSpinner.tsx   # ローディングスピナー
├── package.json
├── tailwind.config.js       # TailwindCSS設定
├── tsconfig.json           # TypeScript設定
└── next.config.js          # Next.js設定
```

## 主要コンポーネントの説明

### AuthProvider
- React Contextを使用してアプリケーション全体の認証状態を管理
- ログイン、ログアウト機能を提供
- LocalStorageを使用してセッション情報を永続化

### Dashboard
- ログイン後のメイン画面
- Todo機能の統合管理
- 統計情報の表示

### TodoList
- Todo項目の表示とフィルタリング
- インライン編集機能
- ソート機能

### AddTodoForm
- 新しいTodo項目の追加
- バリデーション機能

## カスタマイズ

### 認証システムの変更
現在はダミー認証を使用していますが、`components/AuthProvider.tsx`の`login`関数を変更することで、実際のAPI認証に対応できます。

### データ保存の変更
現在はLocalStorageを使用していますが、API連携やデータベース接続に変更することで、サーバーサイドでのデータ管理が可能です。