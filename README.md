# AI メンターアプリ 技術スタック検証プロジェクト

[React Native 公式](https://reactnative.dev/) ｜ [Expo 公式](https://docs.expo.dev/) ｜ [Firebase 公式](https://firebase.google.com/docs) ｜ [React Navigation](https://reactnavigation.org/)

---

## 概要

本プロジェクトでは、主に本 README に記載されている本番 PJ のフロントエンド部分の技術検証作業を行い、**React Native + Expo + TypeScript + Firebase** を用いたモバイルアプリ開発の技術検証・プロトタイピングを目的としている。
実運用や本番リリースを前提とせず、**選定技術スタックでの開発体験・動作確認・基本機能の実装可否**を中心に検証を行う。

-   **主な技術スタック**
    -   フロントエンド: [React Native](https://reactnative.dev/) + [Expo](https://docs.expo.dev/) + TypeScript
    -   バックエンド: Go または TypeScript（API サーバ検証時に利用）
    -   データベース: [Firebase Firestore](https://firebase.google.com/docs/firestore)
    -   ホスティング: フロントエンド: [Firebase Hosting](https://firebase.google.com/docs/hosting), バックエンド: [Cloud Run](https://cloud.google.com/run)
    -   開発環境: [VSCode](https://code.visualstudio.com/)（Win/Mac 両対応）

---

## ページ構成・ディレクトリ設計（例）

```

/my-app
/src
/screens # 各画面（ページ）コンポーネント
HomeScreen.tsx
ChatScreen.tsx
ProfileScreen.tsx
...
/components # 汎用 UI コンポーネント
ChatBubble.tsx
Header.tsx
...
/hooks # カスタムフック
/utils # ユーティリティ関数
/firebase.ts # Firebase 初期化
/navigation # 画面遷移設定
AppNavigator.tsx
App.tsx # エントリーポイント
...

```

-   **画面例**
    -   HomeScreen: トップ・メニュー
    -   ChatScreen: AI メンターとのチャット画面
    -   ProfileScreen: ユーザー設定・プロフィール
    -   （必要に応じて追加）

---

## 開発の進め方（推奨フロー）

1. **要件・検証内容の明確化**
    - 例: チャット画面で Firebase と連携できるか、Expo で Push 通知が使えるか等
2. **画面構成・ルーティング設計**
    - `/src/screens`配下に画面コンポーネントを作成
    - `/src/navigation`で[React Navigation](https://reactnavigation.org/)等を使い画面遷移を管理
3. **UI コンポーネントの分離**
    - `/src/components`に汎用パーツを分けて再利用性を高める
4. **Firebase 連携の実装**
    - `/src/firebase.ts`で初期化し、必要な画面から呼び出す
5. **機能ごとに検証・実装**
    - 例: チャット送信、履歴取得、ユーザー認証、Push 通知など
6. **テスト・Lint・型チェック**
    - `npx tsc --noEmit`や`npx eslint .`で品質担保
7. **README/ドキュメントの随時更新**
    - 実装・検証した内容や注意点を追記

---

## 注意事項

-   本リポジトリは**技術検証・学習用途**です。セキュリティや運用面の本番要件は考慮していません。
-   コードやディレクトリ構成は、今後の検証内容に応じて柔軟に変更してください。

---

> まずは `/src/screens` に主要な画面を作成し、画面遷移・Firebase 連携・UI 検証など「やりたいこと」から順に小さく実装・検証していくのがスムーズらしいです。

---

# Set up

1. **前提**: [git](https://git-scm.com/), [node](https://nodejs.org/), npm, [VSCode](https://code.visualstudio.com/)がインストール済みで、TypeScript 開発環境が構築されていること。
2. **watchman**（推奨）:

```

brew install watchman

```

3. **新規プロジェクト作成**:

```

npx create-expo-app name_of_your_app --template tabs

```

4. **VSCode でプロジェクトを開く**:

```

cd name_of_your_app
code .

```

**注意**
expo-cli のグローバルインストールは非推奨です。内部でメモリリークが発生する可能性があり、また、依存ライブラリがサポートが終了しています。`npx`経由で最新の Expo ツールを利用してください。

---

# Expo + React Native 開発ユーティリティコマンド集

## Server Execution

### 1. 全てのプラットフォーム（iOS/Android/WEB）で開発サーバーを起動

```

npx expo start

```

-   **用途**: 開発中のアプリを iOS/Android 実機やエミュレータ、Web ブラウザで確認
-   **効果**: Metro Bundler が起動し、QR コードを Expo Go アプリで読み込むことで実機プレビューが可能

---

### 2. Web サーバーのみで起動

```

npx expo start --web

```

-   **用途**: Web ブラウザのみでアプリを動作確認
-   **効果**: ブラウザで React Native アプリを即時プレビューできる

---

## ビルド・リリース関連

### 3. Expo アカウントへのログイン

```

npx expo login

```

-   **用途**: Expo のビルド/OTA アップデート/EAS サービス利用時に必要
-   **効果**: Expo 公式サービスと連携できる

---

### 4. EAS CLI のインストール（初回のみ）

```

npx expo install eas-cli

```

-   **用途**: Expo Application Services(EAS)のビルドや OTA アップデートを利用
-   **効果**: 高度なビルド・デプロイ機能が使える

---

### 5. iOS/Android アプリのビルド

```

npx eas build --platform ios
npx eas build --platform android

```

-   **用途**: ストア提出用や実機配布用の本番ビルド作成
-   **効果**: Expo サーバー上でビルドされ、ダウンロードやストア申請に使えるファイルが生成される

---

### 6. OTA（Over-The-Air）アップデート

```

npx eas update --branch main

```

-   **用途**: アプリのコード変更をストア申請なしで即座にユーザーに反映
-   **効果**: アプリ利用者に即時アップデートを配信

---

## キャッシュ・診断・クリーンアップ

### 7. キャッシュクリアして起動

```

npx expo start -c

```

-   **用途**: キャッシュによる不具合や古いコードが残っている場合のリセット
-   **効果**: キャッシュを全てクリアし、クリーンな状態で開発サーバーを起動

---

### 8. 環境診断情報の取得

```

npx expo diagnostics

```

-   **用途**: 環境トラブル時の情報取得やサポート問い合わせ時
-   **効果**: OS/Node/Expo 等のバージョンや設定を一覧表示

---

### 9. プロジェクトの診断レポート

```

npx expo doctor

```

-   **用途**: プロジェクトの依存関係や設定の整合性チェック
-   **効果**: 問題点や警告を検出し、修正ポイントを提示

---

### 10. プロジェクトのクリーンアップ

```

npx expo prebuild --clean

```

-   **用途**: ネイティブコード生成や不要ファイルの一掃
-   **効果**: プロジェクトを初期化し、ビルド関連の不具合を解消

---

## パッケージ管理・アップデート

### 11. Expo SDK のバージョンアップ

```

npx expo upgrade

```

-   **用途**: Expo/React Native の新バージョンにアップグレード
-   **効果**: 依存パッケージや設定ファイルが最新化される

---

### 12. Expo 公式パッケージのインストール

```

npx expo install パッケージ名

```

-   **用途**: カメラやセンサーなど Expo 公式パッケージを追加
-   **効果**: 互換性のあるバージョンでパッケージがインストールされる

---

## テスト・Lint・型チェック

### 13. TypeScript 型チェック

```

npx tsc --noEmit

```

-   **用途**: コードの型エラーを検出
-   **効果**: TypeScript の型チェックのみ実行（ファイル出力なし）

---

### 14. ESLint 実行

```

npx eslint .

```

-   **用途**: コードの静的解析・スタイルチェック
-   **効果**: コーディング規約違反やバグの元を検出

---

### 15. Jest（テストフレームワーク）実行

```

npx jest

```

-   **用途**: 単体テスト・自動テストの実行
-   **効果**: テスト結果を表示し、品質を担保

---

## Firebase CLI（必要に応じて）

### 16. Firebase CLI インストール

```

npm install -g firebase-tools

```

-   **用途**: Firebase Hosting や Functions の運用
-   **効果**: firebase コマンドが利用可能になる

---

### 17. Firebase ログイン

```

firebase login

```

-   **用途**: Firebase CLI からプロジェクト操作を行う前
-   **効果**: Google アカウントで認証される

---

### 18. Firebase Hosting デプロイ

```

firebase deploy --only hosting

```

-   **用途**: Web アプリや静的ファイルを Firebase Hosting に公開
-   **効果**: 指定したファイルが即座に公開される

**NOTE: この README の構成・内容は、[React Native + Firebase チャットアプリ開発事例](https://qiita.com/shintaroa/items/ccd0ebe0b41fdce34565)[2][1][5][6]などの実践知見などを参考にしています。**

Citations:
[1] https://sendbird.com/ja/developer/tutorials/react-native-chat-tutorial
[2] https://qiita.com/shintaroa/items/ccd0ebe0b41fdce34565
[3] https://cpoint-lab.co.jp/article/202011/17844/
[4] https://qiita.com/shinnoki/items/599d1aec23f12f00317b
[5] https://github.com/Naturalclar/expo-firebase-chat
[6] https://tech.fusic.co.jp/posts/expo-firebase-extensions-gemini-api-ai-chatbot-app/
[7] https://fintan-contents.github.io/mobile-app-crib-notes/reference/notification/client
[8] https://texmeijin.github.io/react-native-firebase-chat-slides/
