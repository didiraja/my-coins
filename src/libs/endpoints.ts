import { PayloadRequest } from 'payload'
import { eq, sum } from '@payloadcms/db-sqlite/drizzle'
import { trade } from '@/payload-generated-schema'
import { GetCoinsQuotes } from './request'
import { IDashEndpoint } from '@/types'
import { getInvestmentSummaryByCoin } from './queries/getInvestmentSummaryByCoin'
import { formatProfitRate } from './format'
import { getHoldByCoin } from './queries/getHoldByCoin'

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

  // MOCK QUOTES
  // const target = 2700
  // const dollarQuote = coinQuotes.[coin].brl / coinQuotes.[coin].usd
  // coinQuotes.[coin] = {
  //   usd: target,
  //   brl: target * dollarQuote,
  // }
  // const target = 26
  // const dollarQuote = coinQuotes.link.brl / coinQuotes.link.usd
  // coinQuotes.link = {
  //   usd: target,
  //   brl: target * dollarQuote,
  // }

  const sumBRLIn = Number(querySumBRLIn[0].result)
  const sumBRLOut = Number(querySumBRLOut[0].result)

  const totalInvestingNet = sumBRLIn - sumBRLOut

  const walletBTC = await getHoldByCoin({ coinId: 1, req })

  const balanceBTC = Number(walletBTC?.totalHold) * coinQuotes.bitcoin.brl

  const investmentBTC = await getInvestmentSummaryByCoin({ coinId: 1, req })

  const BTCbyBRL = investmentBTC.find((item) => item.coinName === 'brl')

  const BTCbyUSDC = investmentBTC.find((item) => item.coinName === 'usdc')

  const netInvestBTC =
    (BTCbyBRL?.netInvestment as number) +
    (BTCbyUSDC?.netInvestment as number) * coinQuotes['usd-coin'].brl

  // -----

  const walletETH = await getHoldByCoin({ coinId: 2, req })

  const balanceETH = Number(walletETH?.totalHold) * coinQuotes.ethereum.brl

  const investmentETH = await getInvestmentSummaryByCoin({ coinId: 2, req })

  const ETHbyBRL = investmentETH.find((item) => item.coinName === 'brl')

  const ETHbyUSDC = investmentETH.find((item) => item.coinName === 'usdc')

  const netInvestETH =
    (ETHbyBRL?.netInvestment as number) +
    (ETHbyUSDC?.netInvestment as number) * coinQuotes['usd-coin'].brl

  // -----

  const walletSOL = await getHoldByCoin({ coinId: 3, req })

  const balanceSOL = Number(walletSOL?.totalHold) * coinQuotes.solana.brl

  const investmentSOL = await getInvestmentSummaryByCoin({ coinId: 3, req })

  const SOLbyBRL = investmentSOL.find((item) => item.coinName === 'brl')

  const SOLbyUSDC = investmentSOL.find((item) => item.coinName === 'usdc')

  const netInvestSOL =
    (SOLbyBRL?.netInvestment as number) +
    (SOLbyUSDC?.netInvestment as number) * coinQuotes['usd-coin'].brl

  // -----

  const walletAAVE = await getHoldByCoin({ coinId: 7, req })

  const balanceAAVE = Number(walletAAVE?.totalHold) * coinQuotes.aave.brl

  const investmentAAVE = await getInvestmentSummaryByCoin({ coinId: 7, req })

  const AAVEbyBRL = investmentAAVE.find((item) => item.coinName === 'brl')

  const netInvestAAVE = AAVEbyBRL?.netInvestment as number

  // -----

  const walletPOL = await getHoldByCoin({ coinId: 4, req })

  const balancePOL = Number(walletPOL?.totalHold) * coinQuotes['matic-network'].brl

  const investmentPOL = await getInvestmentSummaryByCoin({ coinId: 4, req })

  const POLbyBRL = investmentPOL.find((item) => item.coinName === 'brl')

  const netInvestPOL = POLbyBRL?.netInvestment as number

  // -----

  const walletDOT = await getHoldByCoin({ coinId: 10, req })

  const balanceDOT = Number(walletDOT?.totalHold) * coinQuotes.polkadot.brl

  const investmentDOT = await getInvestmentSummaryByCoin({ coinId: 10, req })

  const DOTbyBRL = investmentDOT.find((item) => item.coinName === 'brl')

  const netInvestDOT = DOTbyBRL?.netInvestment as number

  // -----

  const walletUNI = await getHoldByCoin({ coinId: 5, req })

  const balanceUNI = Number(walletUNI?.totalHold) * coinQuotes.uniswap.brl

  const investmentUNI = await getInvestmentSummaryByCoin({ coinId: 5, req })

  const UNIbyBRL = investmentUNI.find((item) => item.coinName === 'brl')

  const netInvestUNI = UNIbyBRL?.netInvestment as number

  // -----

  const walletLINK = await getHoldByCoin({ coinId: 6, req })

  const balanceLINK = Number(walletLINK?.totalHold) * coinQuotes.link.brl

  const investmentLINK = await getInvestmentSummaryByCoin({ coinId: 6, req })

  const LINKbyBRL = investmentLINK.find((item) => item.coinName === 'brl')

  const netInvestLINK = LINKbyBRL?.netInvestment as number

  // -----

  const output: IDashEndpoint = {
    total: {
      investing: sumBRLIn,
      net: totalInvestingNet,
    },
    portfolio: [
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        color: 'bg-orange-400',
        price: coinQuotes.bitcoin.usd,
        hold: Number(walletBTC?.totalHold),
        balance: balanceBTC,
        investing: netInvestBTC,
        profit: {
          value: balanceBTC - netInvestBTC,
          hasProfit: balanceBTC > netInvestBTC,
          percentage: formatProfitRate({ invested: netInvestBTC, balance: balanceBTC }),
        },
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        color: 'bg-blue-400',
        price: coinQuotes.ethereum.usd,
        targetPrice: 2700,
        hold: Number(walletETH?.totalHold),
        balance: balanceETH,
        investing: netInvestETH,
        profit: {
          value: balanceETH - netInvestETH,
          hasProfit: balanceETH > netInvestETH,
          percentage: formatProfitRate({ invested: netInvestETH, balance: balanceETH }),
        },
      },
      {
        name: 'Solana',
        symbol: 'SOL',
        color: 'bg-indigo-400',
        price: coinQuotes.solana.usd,
        targetPrice: 170,
        hold: Number(walletSOL?.totalHold),
        balance: balanceSOL,
        investing: netInvestSOL,
        profit: {
          value: balanceSOL - netInvestSOL,
          hasProfit: balanceSOL > netInvestSOL,
          percentage: formatProfitRate({ invested: netInvestSOL, balance: balanceSOL }),
        },
      },
      {
        name: 'Polygon',
        symbol: 'POL',
        color: 'bg-purple-500',
        price: coinQuotes['matic-network'].usd,
        targetPrice: 0.38,
        hold: Number(walletPOL?.totalHold),
        balance: balancePOL,
        investing: netInvestPOL,
        profit: {
          value: balancePOL - netInvestPOL,
          hasProfit: balancePOL > netInvestPOL,
          percentage: formatProfitRate({ invested: netInvestPOL, balance: balancePOL }),
        },
      },
      {
        name: 'Uniswap',
        symbol: 'UNI',
        color: 'bg-fuchsia-400',
        price: coinQuotes.uniswap.usd,
        targetPrice: 13,
        hold: Number(walletUNI?.totalHold),
        balance: balanceUNI,
        investing: netInvestUNI,
        profit: {
          value: balanceUNI - netInvestUNI,
          hasProfit: balanceUNI > netInvestUNI,
          percentage: formatProfitRate({ invested: netInvestUNI, balance: balanceUNI }),
        },
      },
      {
        name: 'Polkadot',
        symbol: 'DOT',
        color: 'bg-pink-400',
        price: coinQuotes.polkadot.usd,
        // targetPrice: 0.38,
        hold: Number(walletDOT?.totalHold),
        balance: balanceDOT,
        investing: netInvestDOT,
        profit: {
          value: balanceDOT - netInvestDOT,
          hasProfit: balanceDOT > netInvestDOT,
          percentage: formatProfitRate({ invested: netInvestDOT, balance: balanceDOT }),
        },
      },
      {
        name: 'Aave',
        symbol: 'AAVE',
        color: 'bg-teal-400',
        price: coinQuotes.aave.usd,
        targetPrice: 310,
        hold: Number(walletAAVE?.totalHold),
        balance: balanceAAVE,
        investing: netInvestAAVE,
        profit: {
          value: balanceAAVE - netInvestAAVE,
          hasProfit: balanceAAVE > netInvestAAVE,
          percentage: formatProfitRate({ invested: netInvestAAVE, balance: balanceAAVE }),
        },
      },
      {
        name: 'Link',
        symbol: 'LINK',
        color: 'bg-blue-600',
        price: coinQuotes.link.usd,
        targetPrice: 26,
        hold: Number(walletLINK?.totalHold),
        balance: balanceLINK,
        investing: netInvestLINK,
        profit: {
          value: balanceLINK - netInvestLINK,
          hasProfit: balanceLINK > netInvestLINK,
          percentage: formatProfitRate({ invested: netInvestLINK, balance: balanceLINK }),
        },
      },
    ],
  }

  return Response.json(output)
}
