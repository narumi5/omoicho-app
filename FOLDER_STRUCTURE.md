# プロジェクトフォルダ構成

## 概要
将来的なモノレポ対応を考慮し、フロントエンド（Next.js）を `frontend/` ディレクトリに配置。
バックエンド（Lambda等）は `backend/` ディレクトリに配置予定。

## ディレクトリ構造

```
couple-diary/
├── README.md                       # プロジェクト全体のドキュメント
├── FOLDER_STRUCTURE.md            # このファイル
├── docker-compose.yml             # 開発環境用Docker Compose
│
├── frontend/                      # Next.jsフロントエンド
│   ├── .env.example              # 環境変数サンプル
│   ├── .gitignore                # Git除外設定
│   ├── Dockerfile                # 開発環境用Docker
│   ├── Dockerfile.prod           # 本番環境用Docker
│   ├── package.json              # 依存関係
│   ├── tsconfig.json             # TypeScript設定
│   ├── next.config.ts            # Next.js設定
│   │
│   ├── prisma/                   # データベース定義
│   │   ├── schema.prisma        # スキーマ定義
│   │   └── migrations/          # マイグレーションファイル（自動生成）
│   │
│   ├── public/                   # 静的ファイル
│   │   └── images/
│   │       └── logo.png          # ロゴ画像（faviconとしても使用）
│   │
│   ├── tailwind.config.js        # Tailwind CSS設定
│   ├── postcss.config.js         # PostCSS設定
│   │
│   └── src/                      # ソースコード
│       ├── app/                  # Next.js App Router
│       │   ├── layout.tsx       # ルートレイアウト
│       │   ├── page.tsx         # トップページ
│       │   ├── icon.png         # App用アイコン
│       │   ├── globals.css      # グローバルCSS（Tailwind含む）
│       │   │
│       │   ├── (auth)/          # 認証グループルート
│       │   │   ├── login/
│       │   │   │   └── page.tsx
│       │   │   └── signup/
│       │   │       └── page.tsx
│       │   │
│       │   ├── (main)/          # メインアプリ（認証後）
│       │   │   ├── layout.tsx
│       │   │   ├── diary/
│       │   │   │   ├── page.tsx          # 日記一覧
│       │   │   │   ├── [id]/
│       │   │   │   │   └── page.tsx      # 日記詳細
│       │   │   │   └── new/
│       │   │   │       └── page.tsx      # 日記作成
│       │   │   ├── couple/
│       │   │   │   ├── page.tsx          # カップル情報
│       │   │   │   ├── create/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── join/
│       │   │   │       └── page.tsx
│       │   │   └── profile/
│       │   │       └── page.tsx
│       │   │
│       │   └── api/             # API Routes
│       │       ├── auth/
│       │       │   ├── login/route.ts
│       │       │   ├── signup/route.ts
│       │       │   └── logout/route.ts
│       │       ├── users/
│       │       │   ├── route.ts
│       │       │   └── [id]/route.ts
│       │       ├── couples/
│       │       │   ├── route.ts
│       │       │   └── join/route.ts
│       │       └── diaries/
│       │           ├── route.ts
│       │           ├── [id]/
│       │           │   ├── route.ts
│       │           │   └── images/route.ts
│       │           └── upload-url/route.ts
│       │
│       ├── components/          # Reactコンポーネント
│       │   ├── ui/             # 汎用UIコンポーネント
│       │   │   ├── Button.tsx
│       │   │   ├── Input.tsx
│       │   │   ├── Card.tsx
│       │   │   └── Modal.tsx
│       │   ├── diary/          # 日記関連
│       │   │   ├── DiaryCard.tsx
│       │   │   ├── DiaryForm.tsx
│       │   │   ├── DiaryList.tsx
│       │   │   └── ImageUpload.tsx
│       │   ├── couple/         # カップル関連
│       │   │   ├── InviteCodeDisplay.tsx
│       │   │   └── PartnerInfo.tsx
│       │   └── layout/         # レイアウト
│       │       ├── Header.tsx
│       │       ├── Footer.tsx
│       │       └── Navigation.tsx
│       │
│       ├── lib/                # ライブラリ・ユーティリティ
│       │   ├── prisma.ts      # Prismaクライアント
│       │   ├── auth.ts        # 認証ヘルパー
│       │   ├── aws/
│       │   │   ├── s3.ts      # S3操作
│       │   │   └── cognito.ts # Cognito操作
│       │   └── utils/
│       │       ├── validation.ts
│       │       ├── date.ts
│       │       └── format.ts
│       │
│       ├── types/             # TypeScript型定義
│       │   ├── index.ts      # 全型のre-export
│       │   ├── models.ts     # データモデル（User, Couple, Diary）
│       │   └── api.ts        # API Input/Response型
│       │
│       ├── hooks/             # カスタムReactフック
│       │   ├── useDiaries.ts
│       │   ├── useCouple.ts
│       │   └── useAuth.ts
│       │
│       ├── contexts/          # Reactコンテキスト
│       │   ├── AuthContext.tsx
│       │   └── CoupleContext.tsx
│       │
│       └── middleware.ts      # Next.jsミドルウェア
│
└── backend/                   # バックエンド（将来実装）
    ├── package.json
    ├── serverless.yml        # Serverless Framework設定
    ├── prisma/               # バックエンド用Prisma
    │   └── schema.prisma
    └── src/
        ├── handlers/         # Lambda関数
        │   ├── auth.ts
        │   ├── diaries.ts
        │   └── couples.ts
        ├── services/         # ビジネスロジック
        ├── middleware/
        └── lib/
```

## ディレクトリの役割

### frontend/
Next.jsアプリケーション本体。フロントエンドとAPI Routesを含む。

| ディレクトリ | 役割 |
|-------------|------|
| `app/` | Next.js App Router（ページ・API） |
| `components/` | 再利用可能なReactコンポーネント |
| `lib/` | ビジネスロジック・外部サービス連携 |
| `types/` | TypeScript型定義 |
| `hooks/` | カスタムReactフック |
| `contexts/` | グローバル状態管理 |
| `prisma/` | データベーススキーマ定義 |

### backend/ (将来実装)
AWS Lambdaを使ったバックエンドAPI。フロントエンドから分離して独立運用可能。

## モノレポ移行時の注意点

### 現在の構成（Next.js単体）
```
/
├── src/
├── prisma/
├── package.json
└── docker-compose.yml
```

### 移行後の構成（モノレポ）
```
/
├── frontend/
│   ├── src/
│   ├── prisma/
│   └── package.json
├── backend/
│   ├── src/
│   └── package.json
├── package.json (ルート)
└── docker-compose.yml
```

### 移行手順
1. `frontend/` ディレクトリを作成
2. Next.js関連ファイルを `frontend/` に移動
3. `docker-compose.yml` のパスを更新
4. `backend/` ディレクトリを作成（Lambda移行時）
5. ルートに `package.json` を作成（monorepo管理用）

## パッケージ管理

### 現在
- npm (単一プロジェクト)

### 将来（モノレポ化後）
- **Turborepo** または **pnpm workspaces** を推奨
- フロントエンド・バックエンドの依存関係を個別管理
- 共通ライブラリは `packages/` に配置

```
/
├── frontend/
├── backend/
├── packages/
│   ├── shared-types/      # 共通型定義
│   └── shared-utils/      # 共通ユーティリティ
└── package.json
```

## バージョン管理

- Git リポジトリのルートは変更なし
- `.gitignore` はルートに配置
- 各サブプロジェクトに個別の `.gitignore` を配置可能
