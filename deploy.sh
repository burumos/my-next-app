#!/bin/bash
set -e

# プロジェクトディレクトリへ移動
cd "$(dirname "$0")"

echo "最新のコードを取得中..."
git pull origin main

echo "依存関係をインストール中..."
npm install

echo "Prismaのマイグレーションを実行中..."
npx prisma migrate deploy

echo "Next.jsのビルド中..."
npm run build

echo "PM2でアプリを再起動中..."
pm2 restart my-next-app || pm2 start my-next-app

echo "デプロイ完了"
