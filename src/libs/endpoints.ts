import { PayloadRequest } from 'payload'
import { eq, sum } from '@payloadcms/db-sqlite/drizzle'
import { trade, wallet } from '@/payload-generated-schema'
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

  // MOCK QUOTES
  // const target = 2700
  // const dollarQuote = coinQuotes.[coin].brl / coinQuotes.[coin].usd
  // coinQuotes.[coin] = {
  //   usd: target,
  //   brl: target * dollarQuote,
  // }
  // const target = 13
  // const dollarQuote = coinQuotes.uniswap.brl / coinQuotes.uniswap.usd
  // coinQuotes.uniswap = {
  //   usd: target,
  //   brl: target * dollarQuote,
  // }

  const sumBRLIn = Number(querySumBRLIn[0].result)
  const sumBRLOut = Number(querySumBRLOut[0].result)

  const totalInvestingNet = sumBRLIn - sumBRLOut

  const Wallets = await req.payload.db.drizzle.select().from(wallet)

  const walletBTC = Wallets.find((item) => item.coin === 1)

  const balanceBTC = Number(walletBTC?.amount) * coinQuotes.bitcoin.brl

  const investmentBTC = await getInvestmentSummaryByCoin({ coinId: 1, req })

  const BTCbyBRL = investmentBTC.find((item) => item.coinName === 'brl')

  const BTCbyUSDC = investmentBTC.find((item) => item.coinName === 'usdc')

  const netInvestBTC =
    (BTCbyBRL?.netInvestment as number) +
    ((BTCbyUSDC?.netInvestment as number) * coinQuotes['usd-coin'].brl)

  // -----

  const walletETH = Wallets.find((item) => item.coin === 2)

  const balanceETH = Number(walletETH?.amount) * coinQuotes.ethereum.brl

  const investmentETH = await getInvestmentSummaryByCoin({ coinId: 2, req })

  const ETHbyBRL = investmentETH.find((item) => item.coinName === 'brl')

  const ETHbyUSDC = investmentETH.find((item) => item.coinName === 'usdc')

  const netInvestETH =
    (ETHbyBRL?.netInvestment as number) +
    (ETHbyUSDC?.netInvestment as number) * coinQuotes['usd-coin'].brl

  // -----

  const walletSOL = Wallets.find((item) => item.coin === 3)

  const balanceSOL = Number(walletSOL?.amount) * coinQuotes.solana.brl

  const investmentSOL = await getInvestmentSummaryByCoin({ coinId: 3, req })

  const SOLbyBRL = investmentSOL.find((item) => item.coinName === 'brl')

  const SOLbyUSDC = investmentSOL.find((item) => item.coinName === 'usdc')

  const netInvestSOL =
    (SOLbyBRL?.netInvestment as number) +
    (SOLbyUSDC?.netInvestment as number) * coinQuotes['usd-coin'].brl

  // -----

  const walletAAVE = Wallets.find((item) => item.coin === 7)

  const balanceAAVE = Number(walletAAVE?.amount) * coinQuotes.aave.brl

  const investmentAAVE = await getInvestmentSummaryByCoin({ coinId: 7, req })

  const AAVEbyBRL = investmentAAVE.find((item) => item.coinName === 'brl')

  const netInvestAAVE = AAVEbyBRL?.netInvestment as number

  // -----

  const walletPOL = Wallets.find((item) => item.coin === 4)

  const balancePOL = Number(walletPOL?.amount) * coinQuotes['matic-network'].brl

  const investmentPOL = await getInvestmentSummaryByCoin({ coinId: 4, req })

  const POLbyBRL = investmentPOL.find((item) => item.coinName === 'brl')

  const netInvestPOL = POLbyBRL?.netInvestment as number

  // -----

  const walletDOT = Wallets.find((item) => item.coin === 10)

  const balanceDOT = Number(walletDOT?.amount) * coinQuotes.polkadot.brl

  const investmentDOT = await getInvestmentSummaryByCoin({ coinId: 10, req })

  const DOTbyBRL = investmentDOT.find((item) => item.coinName === 'brl')

  const netInvestDOT = DOTbyBRL?.netInvestment as number

  // -----

  const walletUNI = Wallets.find((item) => item.coin === 5)

  const balanceUNI = Number(walletUNI?.amount) * coinQuotes.uniswap.brl

  const investmentUNI = await getInvestmentSummaryByCoin({ coinId: 5, req })

  const UNIbyBRL = investmentUNI.find((item) => item.coinName === 'brl')

  const netInvestUNI = UNIbyBRL?.netInvestment as number

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
        name: 'Ethereum',
        symbol: 'ETH',
        color: 'bg-blue-400',
        price: coinQuotes.ethereum.usd,
        targetPrice: 2700,
        hold: Number(walletETH?.amount),
        balance: balanceETH,
        investing: netInvestETH,
        profit: {
          value: balanceETH - netInvestETH,
          hasProfit: balanceETH > netInvestETH,
          percentage: parseInt(String((balanceETH / netInvestETH) * 100)),
        },
      },
      {
        name: 'Solana',
        symbol: 'SOL',
        color: 'bg-indigo-400',
        price: coinQuotes.solana.usd,
        targetPrice: 170,
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
        name: 'Polygon',
        symbol: 'POL',
        color: 'bg-purple-500',
        price: coinQuotes['matic-network'].usd,
        targetPrice: 0.38,
        hold: Number(walletPOL?.amount),
        balance: balancePOL,
        investing: netInvestPOL,
        profit: {
          value: balancePOL - netInvestPOL,
          hasProfit: balancePOL > netInvestPOL,
          percentage: parseInt(String((balancePOL / netInvestPOL) * 100)),
        },
      },
      {
        name: 'Uniswap',
        symbol: 'UNI',
        color: 'bg-fuchsia-400',
        price: coinQuotes.uniswap.usd,
        targetPrice: 13,
        hold: Number(walletUNI?.amount),
        balance: balanceUNI,
        investing: netInvestUNI,
        profit: {
          value: balanceUNI - netInvestUNI,
          hasProfit: balanceUNI > netInvestUNI,
          percentage: parseInt(String((balanceUNI / netInvestUNI) * 100)),
        },
      },
      {
        name: 'Polkadot',
        symbol: 'DOT',
        color: 'bg-pink-400',
        price: coinQuotes.polkadot.usd,
        // targetPrice: 0.38,
        hold: Number(walletDOT?.amount),
        balance: balanceDOT,
        investing: netInvestDOT,
        profit: null,
      },
      {
        name: 'Aave',
        symbol: 'AAVE',
        color: 'bg-teal-400',
        price: coinQuotes.aave.usd,
        targetPrice: 310,
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
