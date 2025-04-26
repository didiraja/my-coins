import { PayloadRequest } from 'payload'
import { eq, sum } from '@payloadcms/db-sqlite/drizzle'
import { trade, wallet } from '@/payload-generated-schema'
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
    net: number
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

  // const querySumBTCIn = await req.payload.db.drizzle
  //   .select({
  //     result: sum(trade.amountIn),
  //   })
  //   .from(trade)
  //   .where(eq(trade.coinIn, 1))

  // const querySumBTCOut = await req.payload.db.drizzle
  //   .select({
  //     result: sum(trade.amountOut),
  //   })
  //   .from(trade)
  //   .where(eq(trade.coinOut, 1))

  // const querySumETHIn = await req.payload.db.drizzle
  //   .select({
  //     result: sum(trade.amountIn),
  //   })
  //   .from(trade)
  //   .where(eq(trade.coinIn, 2))

  // const querySumETHOut = await req.payload.db.drizzle
  //   .select({
  //     result: sum(trade.amountOut),
  //   })
  //   .from(trade)
  //   .where(eq(trade.coinOut, 2))

  // const querySumSOLIn = await req.payload.db.drizzle
  //   .select({
  //     result: sum(trade.amountIn),
  //   })
  //   .from(trade)
  //   .where(eq(trade.coinIn, 3))

  // const querySumSOLOut = await req.payload.db.drizzle
  //   .select({
  //     result: sum(trade.amountOut),
  //   })
  //   .from(trade)
  //   .where(eq(trade.coinOut, 3))

  const coinQuotes = await GetCoinsQuotes()

  const sumBRLIn = Number(querySumBRLIn[0].result)
  const sumBRLOut = Number(querySumBRLOut[0].result)
  // const totalBTCHold = Number(querySumBTCOut[0].result) - Number(querySumBTCIn[0].result)
  // const totalETHHold = Number(querySumETHOut[0].result) - Number(querySumETHIn[0].result)
  // const totalSOLHold = Number(querySumSOLOut[0].result) - Number(querySumSOLIn[0].result)

  // const balanceBTC = totalBTCHold * coinQuotes.bitcoin.usd

  // const balanceETH = totalETHHold * coinQuotes.ethereum.usd

  // const balanceSOL = totalSOLHold * coinQuotes.solana.usd

  // const totalBalanceBRL =
  //   totalBTCHold * coinQuotes.bitcoin.brl +
  //   totalETHHold * coinQuotes.ethereum.brl +
  //   totalSOLHold * coinQuotes.solana.brl

  const totalInvestingNet = sumBRLIn - sumBRLOut

  const Wallets = await req.payload.db.drizzle.select().from(wallet)

  const walletBTC = Wallets.find((item) => item.coin === 1)

  const output: IDashEndpoint = {
    quote: {
      btc: coinQuotes.bitcoin.usd,
    },
    hold: {
      btc: Number(walletBTC?.amount),
    },
    balance: {
      btc: Number(walletBTC?.amount) * coinQuotes.bitcoin.brl,
    },
    investing: {
      net: totalInvestingNet,
      // all money invested on btc, by coin:
      // SELECT coin_in_id, sum(amount_in) as sum_coin FROM trade where coin_out_id = '1' group by coin_in_id;
    },
  }

  return Response.json(output)
}
