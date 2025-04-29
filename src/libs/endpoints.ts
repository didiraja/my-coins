import { PayloadRequest } from 'payload'
import { eq, sql, sum } from '@payloadcms/db-sqlite/drizzle'
import { coin, trade, wallet } from '@/payload-generated-schema'
import { GetCoinsQuotes } from './request'
import { IDashEndpoint } from '@/types'

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

  const walletSOL = Wallets.find((item) => item.coin === 3)

  const walletAAVE = Wallets.find((item) => item.coin === 7)

  const balanceBTC = Number(walletBTC?.amount) * coinQuotes.bitcoin.brl

  const balanceSOL = Number(walletSOL?.amount) * coinQuotes.solana.brl

  const balanceAAVE = Number(walletAAVE?.amount) * coinQuotes.aave.brl

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

  const fullInvestingSOL = await req.payload.db.drizzle
    .select({
      coinName: coin.coin,
      totalInvested: sql<number>`
      SUM(CASE WHEN ${trade.coinOut} = 3 THEN ${trade.amountIn} ELSE 0 END)
    `,
      totalWithdrawn: sql<number>`
      SUM(CASE WHEN ${trade.coinIn} = 3 THEN ${trade.amountOut} ELSE 0 END)
    `,
      netInvestment: sql<number>`
      SUM(CASE WHEN ${trade.coinOut} = 3 THEN ${trade.amountIn} ELSE 0 END)
      -
      SUM(CASE WHEN ${trade.coinIn} = 3 THEN ${trade.amountOut} ELSE 0 END)
    `,
    })
    .from(trade)
    .innerJoin(
      coin,
      sql`
      ${coin.id} = CASE
        WHEN ${trade.coinOut} = 3 THEN ${trade.coinIn}
        WHEN ${trade.coinIn} = 3 THEN ${trade.coinOut}
      END
    `,
    )
    .where(
      sql`
      ${trade.coinOut} = 3 OR ${trade.coinIn} = 3
    `,
    )
    .groupBy(coin.coin)
    .having(
      sql`
      SUM(CASE WHEN ${trade.coinOut} = 3 THEN ${trade.amountIn} ELSE 0 END)
      -
      SUM(CASE WHEN ${trade.coinIn} = 3 THEN ${trade.amountOut} ELSE 0 END)
      != 0
    `,
    )
    .orderBy(
      sql`
      SUM(CASE WHEN ${trade.coinOut} = 3 THEN ${trade.amountIn} ELSE 0 END)
      -
      SUM(CASE WHEN ${trade.coinIn} = 3 THEN ${trade.amountOut} ELSE 0 END)
      DESC
    `,
    )

  const fullInvestingAAVE = await req.payload.db.drizzle
    .select({
      coinName: coin.coin,
      totalInvested: sql<number>`
      SUM(CASE WHEN ${trade.coinOut} = 7 THEN ${trade.amountIn} ELSE 0 END)
    `,
      totalWithdrawn: sql<number>`
      SUM(CASE WHEN ${trade.coinIn} = 7 THEN ${trade.amountOut} ELSE 0 END)
    `,
      netInvestment: sql<number>`
      SUM(CASE WHEN ${trade.coinOut} = 7 THEN ${trade.amountIn} ELSE 0 END)
      -
      SUM(CASE WHEN ${trade.coinIn} = 7 THEN ${trade.amountOut} ELSE 0 END)
    `,
    })
    .from(trade)
    .innerJoin(
      coin,
      sql`
      ${coin.id} = CASE
        WHEN ${trade.coinOut} = 7 THEN ${trade.coinIn}
        WHEN ${trade.coinIn} = 7 THEN ${trade.coinOut}
      END
    `,
    )
    .where(
      sql`
      ${trade.coinOut} = 7 OR ${trade.coinIn} = 7
    `,
    )
    .groupBy(coin.coin)
    .having(
      sql`
      SUM(CASE WHEN ${trade.coinOut} = 7 THEN ${trade.amountIn} ELSE 0 END)
      -
      SUM(CASE WHEN ${trade.coinIn} = 7 THEN ${trade.amountOut} ELSE 0 END)
      != 0
    `,
    )
    .orderBy(
      sql`
      SUM(CASE WHEN ${trade.coinOut} = 7 THEN ${trade.amountIn} ELSE 0 END)
      -
      SUM(CASE WHEN ${trade.coinIn} = 7 THEN ${trade.amountOut} ELSE 0 END)
      DESC
    `,
    )

  const investedBRL = fullInvestingBTC.find((item) => item.coinName === 'brl')

  const investedUSDC = fullInvestingBTC.find((item) => item.coinName === 'usdc')

  const investedSOLBRL = fullInvestingSOL.find((item) => item.coinName === 'brl')

  const investedSOLUSDC = fullInvestingSOL.find((item) => item.coinName === 'usdc')

  const investedAAVEBRL = fullInvestingAAVE.find((item) => item.coinName === 'brl')

  const netInvestBTCAllCoins =
    (investedBRL?.netInvestment as number) +
    (investedUSDC?.netInvestment as number) * coinQuotes['usd-coin'].brl

  const netInvestSOLAllCoins =
    (investedSOLBRL?.netInvestment as number) +
    (investedSOLUSDC?.netInvestment as number) * coinQuotes['usd-coin'].brl

  const netInvestAAVEAllCoins = investedAAVEBRL?.netInvestment as number

  const output: IDashEndpoint = {
    quote: {
      btc: coinQuotes.bitcoin.usd,
      sol: coinQuotes.solana.usd,
      aave: coinQuotes.aave.usd,
    },
    hold: {
      btc: Number(walletBTC?.amount),
      sol: Number(walletSOL?.amount),
      aave: Number(walletAAVE?.amount),
    },
    balance: {
      btc: balanceBTC,
      sol: balanceSOL,
      aave: balanceAAVE,
    },
    investing: {
      totalNet: totalInvestingNet,
      totalBTCNet: netInvestBTCAllCoins,
      totalSOLNet: netInvestSOLAllCoins,
      totalAAVENet: netInvestAAVEAllCoins,
    },
    profit: {
      btc: {
        value: balanceBTC - netInvestBTCAllCoins,
        hasProfit: balanceBTC > netInvestBTCAllCoins,
        percentage: parseInt(String((balanceBTC / netInvestBTCAllCoins) * 100)),
      },
      sol: {
        value: balanceSOL - netInvestSOLAllCoins,
        hasProfit: balanceSOL > netInvestSOLAllCoins,
        percentage: parseInt(String((balanceSOL / netInvestSOLAllCoins) * 100)),
      },
      aave: {
        value: balanceAAVE - netInvestAAVEAllCoins,
        hasProfit: balanceAAVE > netInvestAAVEAllCoins,
        percentage: parseInt(String((balanceAAVE / netInvestAAVEAllCoins) * 100)),
      },
    },
  }

  return Response.json(output)
}
