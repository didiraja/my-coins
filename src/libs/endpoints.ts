import { PayloadRequest } from 'payload'
import { eq, sum } from '@payloadcms/db-sqlite/drizzle'
import { trade } from '@/payload-generated-schema'
import { GetCoinsQuotes } from './request'

export type IDashEndpoint = {
  investing: {
    total: number
    net: number
    profit: number
  }
  hold: {
    btc: number
    eth: number
    sol: number
  }
  balance: {
    total: number
    totalBRL: number
    btc: number
    eth: number
    sol: number
  }
  quote: {
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

  const totalInvestingNet = sumBRLIn - sumBRLOut

  const output: IDashEndpoint = {
    investing: {
      total: sumBRLIn,
      net: totalInvestingNet,
      profit: totalBalanceBRL - totalInvestingNet,
    },
    balance: {
      total: balanceBTC + balanceETH + balanceSOL,
      totalBRL: totalBalanceBRL,
      btc: balanceBTC,
      eth: balanceETH,
      sol: balanceSOL,
    },
    hold: {
      btc: totalBTCHold,
      eth: totalETHHold,
      sol: totalSOLHold,
    },
    quote: {
      btc: coinQuotes.bitcoin.usd,
    },
  }

  return Response.json(output)
}
