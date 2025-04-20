// storage-adapter-import-placeholder
import { sql, sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Coin } from './collections/Coin'
import { Trade } from './collections/Trade'
import { trade } from './payload-generated-schema'
import { eq, sum } from '@payloadcms/db-sqlite/drizzle'
import { GetCoinsQuotes } from './libs/request'
import { formatUSD } from './libs/format'
// import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Coin, Trade],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
      authToken: process.env.DATABASE_TOKEN,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  endpoints: [
    {
      path: '/dashboard',
      method: 'get',
      handler: async (req) => {
        const querySumBRLIn = await req.payload.db.drizzle
          .select({
            result: sum(trade.amountIn),
          })
          .from(trade)
          .where(eq(trade.coinIn, 8))

        const querySumBRLOut = await req.payload.db.drizzle
          .select({
            result: sum(trade.amountOut),
          })
          .from(trade)
          .where(eq(trade.coinOut, 8))

        const querySumBTCIn = await req.payload.db.drizzle
          .select({
            result: sum(trade.amountIn),
          })
          .from(trade)
          .where(eq(trade.coinIn, 1))

        const querySumBTCOut = await req.payload.db.drizzle
          .select({
            result: sum(trade.amountOut),
          })
          .from(trade)
          .where(eq(trade.coinOut, 1))

        const querySumETHIn = await req.payload.db.drizzle
          .select({
            result: sum(trade.amountIn),
          })
          .from(trade)
          .where(eq(trade.coinIn, 2))

        const querySumETHOut = await req.payload.db.drizzle
          .select({
            result: sum(trade.amountOut),
          })
          .from(trade)
          .where(eq(trade.coinOut, 2))

        const querySumSOLIn = await req.payload.db.drizzle
          .select({
            result: sum(trade.amountIn),
          })
          .from(trade)
          .where(eq(trade.coinIn, 3))

        const querySumSOLOut = await req.payload.db.drizzle
          .select({
            result: sum(trade.amountOut),
          })
          .from(trade)
          .where(eq(trade.coinOut, 3))

        const coinQuotes = await GetCoinsQuotes()

        const sumBRLIn = Number(querySumBRLIn[0].result)
        const sumBRLOut = Number(querySumBRLOut[0].result)
        const totalBTCHold = Number(querySumBTCOut[0].result) - Number(querySumBTCIn[0].result)
        const totalETHHold = Number(querySumETHOut[0].result) - Number(querySumETHIn[0].result)
        const totalSOLHold = Number(querySumSOLOut[0].result) - Number(querySumSOLIn[0].result)

        const balanceBTC = totalBTCHold * coinQuotes.bitcoin.usd

        const balanceETH = totalETHHold * coinQuotes.ethereum.usd

        const balanceSOL = totalSOLHold * coinQuotes.solana.usd

        const totalBalanceBRL =
          totalBTCHold * coinQuotes.bitcoin.brl +
          totalETHHold * coinQuotes.ethereum.brl +
          totalSOLHold * coinQuotes.solana.brl

        return Response.json({
          investing: {
            total: sumBRLIn,
            net: sumBRLIn - sumBRLOut,
          },
          hold: {
            btc: totalBTCHold,
            eth: totalETHHold,
            sol: totalSOLHold,
          },
          balance: {
            total: balanceBTC + balanceETH + balanceSOL,
            totalBRL: totalBalanceBRL,
            btc: balanceBTC,
            eth: balanceETH,
            sol: balanceSOL,
          },
        })
      },
    },
  ],
})
