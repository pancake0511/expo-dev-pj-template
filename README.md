# AI メンターアプリ 技術スタック検証プロジェクト

[React Native 公式](https://reactnative.dev/) ｜ [Expo 公式](https://docs.expo.dev/) ｜ [Firebase 公式](https://firebase.google.com/docs) ｜ [Expo Router](https://expo.github.io/router/)

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

## ページ構成・ディレクトリ設計

本プロジェクトでは、**Expo Router** のファイルシステムベースルーティングを採用しており、`app` ディレクトリ内のファイルとディレクトリ構造がそのままルーティングパスにマッピングされます。これにより、シンプルかつ直感的な画面遷移の管理が可能です。

```txt
.
├── README.md
├── app # Expo Router のルートディレクトリ
│   ├── (tabs) # タブナビゲーションのグループ（ルーティングパスには含まれない）
│   │   ├── \_layout.tsx # (tabs) グループのレイアウト（タブバーの定義）
│   │   ├── counter.tsx # /counter にルーティングされるタブスクリーン
│   │   ├── guess-number.tsx # /guess-number にルーティングされるタブスクリーン
│   │   ├── index.tsx # /(tabs) のデフォルト（最初のタブ）スクリーン
│   │   ├── sample.tsx # /sample にルーティングされるタブスクリーン
│   │   ├── tic-tac-toe.tsx # /tic-tac-toe にルーティングされるタブスクリーン
│   │   └── two.tsx # /two にルーティングされるタブスクリーン
│   ├── +html.tsx # Web ビルド時のカスタム HTML ファイル
│   ├── +not-found.tsx # 404 ページ
│   ├── \_layout.tsx # アプリ全体のレイアウト（ルートスタック）
│   └── modal.tsx # /modal にルーティングされるモーダルスクリーン
├── app.json # Expo の設定ファイル
├── assets # アプリの画像やフォントなどのリソース
│   ├── fonts
│   │   └── SpaceMono-Regular.ttf
│   └── images
│       ├── adaptive-icon.png
│       ├── favicon.png
│       ├── icon.png
│       └── splash-icon.png
├── components # 汎用 UI コンポーネント、フックなど
│   ├── EditScreenInfo.tsx
│   ├── ExternalLink.tsx
│   ├── GameButton.tsx # ゲームメニュー用のカスタムボタン
│   ├── StyledText.tsx
│   ├── Themed.tsx
│   ├── tests
│   │   └── StyledText-test.js
│   ├── useClientOnlyValue.ts
│   ├── useClientOnlyValue.web.ts
│   ├── useColorScheme.ts
│   └── useColorScheme.web.ts
├── constants # アプリ全体で共通利用する定数
│   └── Colors.ts
├── dir_structure.txt
├── expo-env.d.ts
├── package-lock.json
├── package.json # プロジェクトの依存関係とスクリプト
├── tsconfig.json # TypeScript の設定ファイル
└── utilCommands.md
```

### ルーティングに関する注意点

本プロジェクトでは、**`app.json` の `experiments.typedRoutes` を `false` に設定**しており、Expo Router のルーティングは従来の文字列ベースのパス指定で行われます。

-   **パスの指定方法の厳密な理解:**
    `app/(tabs)/_layout.tsx` でタブとして定義されているスクリーンへの遷移は、`useRouter` フックで取得した `router` オブジェクトの `push` メソッドを使用します。この際、**括弧で囲まれたディレクトリ（例: `(tabs)`）はルーティングパスには含まれない** ため、ファイル名が直接ルートからのパスとして扱われます。

    **例:**
    `app/(tabs)/tic-tac-toe.tsx` へ遷移する場合、コードでは以下のように**ルートからの絶対パス**で指定します。

    ```typescript
    import { useRouter } from "expo-router";
    import GameButton from "@/components/GameButton"; // GameButtonのインポート例

    export default function GameMenuScreen() {
        const router = useRouter();

        return (
            // ... (View, Textなどのコンポーネント)
            <GameButton
                title="三目並べ（Tic-Tac-Toe）"
                onPress={() => router.push("/tic-tac-toe")} // 正しいパス指定
            />
            <GameButton
                title="カウンターゲーム"
                onPress={() => router.push("/counter")} // 正しいパス指定
            />
            <GameButton
                title="数当てゲーム"
                onPress={() => router.push("/guess-number")} // 正しいパス指定
            />
            // ...
        );
    }
    ```

-   **インテリセンスの制限と対策:**
    `typedRoutes` が無効になっているため、`router.push()` の引数として渡す文字列リテラルに対して、**VS Code のインテリセンスがルーティングパスの候補を直接表示することはありません。** これは、TypeScript が動的な文字列パスを静的に解決できないことによるものです。
    この制限は、`npx expo start --clear` によるキャッシュクリアで一時的に誤った推論が解消されるものの、根本的なパス補完は提供されません。タイプミスを防ぎ、コードの可読性を向上させるためには、ルーティングパスを `constants` ディレクトリなどで定数として定義し、それを利用することをお勧めします。

---

## 開発の進め方（推奨フロー）

-   プロジェクトの環境セットアップ後、本リポジトリ PJ の main ブランチからサーバー起動 (npx expo start --web) 時にブラウザでアプリケーションが正しくレンダリングされ、基本的な動作が確認できれば初期セットアップは成功です。
    ![`browser setup screen`](/assets/images/browser_first_screen.png)

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
