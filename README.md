# Couple Diary

カップルで共有する日記アプリ

## 技術スタック

- **フロントエンド**: Next.js 15 (App Router)
- **データベース**: PostgreSQL
- **ORM**: Prisma
- **ストレージ**: AWS S3
- **認証**: AWS Cognito (今後実装予定)
- **デプロイ**: AWS EC2 + Docker

## プロジェクト構成

モノレポ対応のため、フロントエンドは `frontend/` ディレクトリに配置しています。
詳細は [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) を参照してください。

```
couple-diary/
├── frontend/          # Next.jsアプリ
│   ├── src/
│   ├── prisma/
│   └── package.json
├── backend/           # Lambda (将来実装)
├── docker-compose.yml
└── README.md
```

## 主要機能

- ✅ ユーザー登録・ログイン
- ✅ カップルペアリング（招待コード方式）
- ✅ 日記作成・編集・削除
- ✅ プライベート/共有モード
- ✅ 画像アップロード（最大3枚/日記）
- ✅ パートナーの日記閲覧

## データベース構造

### User
- ユーザー情報
- カップルとの紐付け

### Couple
- カップル情報
- 招待コード管理

### Diary
- 日記コンテンツ
- 公開/非公開設定
- S3画像URL（最大3枚）

## セットアップ

### 1. リポジトリクローン

```bash
git clone <repository-url>
cd couple-diary
```

### 2. 環境変数の設定

```bash
cp frontend/.env.example frontend/.env
# frontend/.env を編集
```

### 3. Docker起動

```bash
docker-compose up
```

初回起動時は別ターミナルでマイグレーション実行:

```bash
cd frontend
npx prisma migrate dev --name init
```

http://localhost:3000 でアクセス可能

## ローカル開発（Docker不使用）

### 1. フロントエンド起動

```bash
cd frontend
npm install
npx prisma migrate dev
npm run dev
```

### 2. PostgreSQL準備

ローカルにPostgreSQLをインストールするか、Docker Composeのdbサービスのみ起動:

```bash
docker-compose up db
```

## 本番デプロイ

### 本番ビルド

```bash
cd frontend
docker build -f Dockerfile.prod -t couple-diary:latest .
docker run -p 3000:3000 --env-file .env.production couple-diary:latest
```

## AWS EC2 デプロイ手順

### 1. EC2インスタンス準備

```bash
# Dockerインストール
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# Docker Composeインストール
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. RDS (PostgreSQL) 作成

- AWSコンソールからRDSインスタンス作成
- PostgreSQL 16を選択
- セキュリティグループでEC2からのアクセスを許可

### 3. S3バケット作成

```bash
# AWS CLIでバケット作成
aws s3 mb s3://couple-diary-images --region ap-northeast-1

# バケットポリシー設定（Private）
aws s3api put-public-access-block \
  --bucket couple-diary-images \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### 4. アプリケーションデプロイ

```bash
# リポジトリクローン
git clone your-repository-url
cd couple-diary

# 環境変数設定
cp .env.example .env.production
# .env.production を編集

# Docker起動
docker-compose up -d
```

## API エンドポイント

### カップル関連

- `POST /api/couples` - カップル作成 & 招待コード発行
- `POST /api/couples/join` - 招待コードでカップル参加

### 日記関連

- `GET /api/diaries?coupleId=xxx` - 日記一覧取得
- `POST /api/diaries` - 日記作成
- `GET /api/diaries/[id]` - 日記詳細取得
- `PUT /api/diaries/[id]` - 日記更新
- `DELETE /api/diaries/[id]` - 日記削除

### 画像関連

- `POST /api/diaries/upload-url` - アップロード用署名付きURL取得
- `GET /api/diaries/[id]/images` - 閲覧用署名付きURL取得

## セキュリティ

### S3アクセス制限

- S3バケットは完全Private設定
- 署名付きURL（Presigned URL）でアクセス制御
- APIレベルでカップルIDを検証
- フォルダ構造: `couple-{coupleId}/diary-{diaryId}/image.jpg`

### 認証（今後実装）

- AWS Cognito によるユーザー認証
- JWTトークンベースの認証
- APIエンドポイントの認証ミドルウェア

## 開発コマンド

```bash
# 開発サーバー
npm run dev

# ビルド
npm run build

# 本番起動
npm start

# Prisma Studio
npm run prisma:studio

# マイグレーション
npm run prisma:migrate
```

## ライセンス

MIT
test
