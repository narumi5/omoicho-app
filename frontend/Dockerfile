# 開発環境用 Dockerfile
FROM node:20-alpine

WORKDIR /app

# 依存関係のインストール
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# アプリケーションのコピー
COPY . .

# Prisma クライアント生成
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
