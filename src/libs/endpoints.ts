import { PayloadRequest } from 'payload'
import { eq, sql, sum } from '@payloadcms/db-sqlite/drizzle'
import { coin, trade, wallet } from '@/payload-generated-schema'
import { GetCoinsQuotes } from './request'
import { IDashEndpoint } from '@/types'
import { getInvestmentSummaryByCoin } from './queries/getInvestmentSummaryByCoin'

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

  const investmentBTC = await getInvestmentSummaryByCoin({ coinId: 1, req })

  const BTCbyBRL = investmentBTC.find((item) => item.coinName === 'brl')

  const BTCbyUSDC = investmentBTC.find((item) => item.coinName === 'usdc')

  const netInvestBTC =
    (BTCbyBRL?.netInvestment as number) +
    (BTCbyUSDC?.netInvestment as number) * coinQuotes['usd-coin'].brl

  const investmentSOL = await getInvestmentSummaryByCoin({ coinId: 3, req })

  const SOLbyBRL = investmentSOL.find((item) => item.coinName === 'brl')

  const SOLbyUSDC = investmentSOL.find((item) => item.coinName === 'usdc')

  const netInvestSOL =
    (SOLbyBRL?.netInvestment as number) +
    (SOLbyUSDC?.netInvestment as number) * coinQuotes['usd-coin'].brl

  const investmentAAVE = await getInvestmentSummaryByCoin({ coinId: 7, req })

  const AAVEbyBRL = investmentAAVE.find((item) => item.coinName === 'brl')

  const netInvestAAVE = AAVEbyBRL?.netInvestment as number

  const output: IDashEndpoint = {
    portfolio: [
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        color: 'bg-orange-400',
        price: coinQuotes.bitcoin.usd,
        hold: Number(walletBTC?.amount),
        balance: balanceBTC,
        investing: netInvestBTC,
        profit: {
          value: balanceBTC - netInvestBTC,
          hasProfit: balanceBTC > netInvestBTC,
          percentage: parseInt(String((balanceBTC / netInvestBTC) * 100)),
        },
      },
      {
        name: 'Solana',
        symbol: 'SOL',
        color: 'bg-indigo-400',
        price: coinQuotes.solana.usd,
        hold: Number(walletSOL?.amount),
        balance: balanceSOL,
        investing: netInvestSOL,
        profit: {
          value: balanceSOL - netInvestSOL,
          hasProfit: balanceSOL > netInvestSOL,
          percentage: parseInt(String((balanceSOL / netInvestSOL) * 100)),
        },
      },
      {
        name: 'Aave',
        symbol: 'AAVE',
        color: 'bg-teal-400',
        price: coinQuotes.aave.usd,
        hold: Number(walletAAVE?.amount),
        balance: balanceAAVE,
        investing: netInvestAAVE,
        profit: {
          value: balanceAAVE - netInvestAAVE,
          hasProfit: balanceAAVE > netInvestAAVE,
          percentage: parseInt(String((balanceAAVE / netInvestAAVE) * 100)),
        },
      },
    ],
  }

  return Response.json(output)
}
