This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
touch .env.local
## generate AUTH_SECRET value
openssl rand -base64 32
# or
npx auth secret

# DB
npx prisma db push
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## create User

`npx tsx src/script/createUser.ts <loginId> <password> (<name>)`

## migration

開発

1. schema.prisma編集
2. `npx prisma migrate dev --name {name}`

本番

1. `npx prisma migrate deploy`

tips: commands
- DBの状態確認: `npx prisma studio`
- マイグレーションの一覧表示: `npx prisma migrate status`

memo links
- [API Routes | Next.js 日本語ドキュメント](https://nextjsjp.org/docs/pages/building-your-application/routing/api-routes)
- [Getting Started: Fetching Data | Next.js](https://nextjs.org/docs/app/getting-started/fetching-data#with-suspense)
- [TypeScript – SWR](https://swr.vercel.app/ja/docs/typescript)
- [Defining schemas | Zod](https://zod.dev/api#numbers)

