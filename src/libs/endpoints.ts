import { PayloadRequest } from 'payload'
import { eq, sql, sum } from '@payloadcms/db-sqlite/drizzle'
import { coin, trade, wallet } from '@/payload-generated-schema'
import { GetCoinsQuotes } from './request'

export type IDashEndpoint = {
  quote: {
    btc: number
  }
  hold: {
    btc: number
  }
  balance: {
    btc: number
  }
  investing: {
    totalNet: number
    totalBTCNet: number
  }
  profit: {
    btc: number
  }
}

export const DashboardEndpoint = async (req: PayloadRequest) => {
  const secretToken = req.headers.get('x-secret-token')

  if (!secretToken || secretToken !== process.env.PAYLOAD_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

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

  const coinQuotes = await GetCoinsQuotes()

  const sumBRLIn = Number(querySumBRLIn[0].result)
  const sumBRLOut = Number(querySumBRLOut[0].result)

  const totalInvestingNet = sumBRLIn - sumBRLOut

  const Wallets = await req.payload.db.drizzle.select().from(wallet)

  const walletBTC = Wallets.find((item) => item.coin === 1)

  const balanceBTC = Number(walletBTC?.amount) * coinQuotes.bitcoin.brl

  const fullInvestingBTC = await req.payload.db.drizzle
    .select({
      coinName: coin.coin,
      totalInvested: sql<number>`
      SUM(CASE WHEN ${trade.coinOut} = 1 THEN ${trade.amountIn} ELSE 0 END)
    `,
      totalWithdrawn: sql<number>`
      SUM(CASE WHEN ${trade.coinIn} = 1 THEN ${trade.amountOut} ELSE 0 END)
    `,
      netInvestment: sql<number>`
      SUM(CASE WHEN ${trade.coinOut} = 1 THEN ${trade.amountIn} ELSE 0 END)
      -
      SUM(CASE WHEN ${trade.coinIn} = 1 THEN ${trade.amountOut} ELSE 0 END)
    `,
    })
    .from(trade)
    .innerJoin(
      coin,
      sql`
      ${coin.id} = CASE
        WHEN ${trade.coinOut} = 1 THEN ${trade.coinIn}
        WHEN ${trade.coinIn} = 1 THEN ${trade.coinOut}
      END
    `,
    )
    .where(
      sql`
      ${trade.coinOut} = 1 OR ${trade.coinIn} = 1
    `,
    )
    .groupBy(coin.coin)
    .having(
      sql`
      SUM(CASE WHEN ${trade.coinOut} = 1 THEN ${trade.amountIn} ELSE 0 END)
      -
      SUM(CASE WHEN ${trade.coinIn} = 1 THEN ${trade.amountOut} ELSE 0 END)
      != 0
    `,
    )
    .orderBy(
      sql`
      SUM(CASE WHEN ${trade.coinOut} = 1 THEN ${trade.amountIn} ELSE 0 END)
      -
      SUM(CASE WHEN ${trade.coinIn} = 1 THEN ${trade.amountOut} ELSE 0 END)
      DESC
    `,
    )

  const investedBRL = fullInvestingBTC.find((item) => item.coinName === 'brl')

  const investedUSDC = fullInvestingBTC.find((item) => item.coinName === 'usdc')

  const netInvestBTCAllCoins =
    (investedBRL?.netInvestment as number) +
    (investedUSDC?.netInvestment as number) * coinQuotes['usd-coin'].brl

  const output: IDashEndpoint = {
    quote: {
      btc: coinQuotes.bitcoin.usd,
    },
    hold: {
      btc: Number(walletBTC?.amount),
    },
    balance: {
      btc: balanceBTC,
    },
    investing: {
      totalNet: totalInvestingNet,
      totalBTCNet: netInvestBTCAllCoins,
      // all money invested on btc, by coin:
      // SELECT coin_in_id, sum(amount_in) as sum_coin FROM trade where coin_out_id = '1' group by coin_in_id;
    },
    profit: {
      btc: balanceBTC - netInvestBTCAllCoins,
    },
  }

  return Response.json(output)
}
