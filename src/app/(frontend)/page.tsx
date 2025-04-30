import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Coin } from '@/payload-types'
import { formatBRL, formatUSD, showReadableDate } from '@/libs/format'
import { GetDashValues } from '@/libs/request'
import Card from '@/components/Card'

export const dynamic = 'force-dynamic'

export const revalidate = 0

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const tradesList = await payload.find({
    collection: 'trade',
    sort: '-tradeDate',
  })

  const dashValues = await GetDashValues()

  // if (typeof window !== 'undefined') {
  //   console.log(dashValues)
  // }

  return (
    <div className="home">
      <div className="title">
        <h1>My Coins</h1>
      </div>
      {dashValues && (
        <>
          <div className="coin-wrapper">
            <div className="coin-title">
              <div className="coin-icon bg-orange-400" />
              <p className="label">
                Bitcoin <span className="text-sm">BTC {dashValues?.hold.btc}</span>
              </p>
            </div>

            <div className="wallet-data">
              <Card label="Token Price">{formatUSD(dashValues?.quote.btc)}</Card>

              <Card
                label="Profit"
                performance
                hasProfit={dashValues?.profit.btc.hasProfit}
                reference={`+${dashValues?.profit.btc.percentage}%`}
              >
                {formatUSD(dashValues?.profit.btc.value)}
              </Card>

              <Card label="Balance" performance hasProfit={dashValues?.profit.btc.hasProfit}>
                {formatUSD(dashValues?.balance.btc)}
              </Card>
            </div>
          </div>
          <div className="coin-wrapper">
            <div className="coin-title">
              <div className="coin-icon bg-indigo-400" />
              <p className="label">
                Solana <span className="text-sm">SOL {dashValues?.hold.sol}</span>
              </p>
            </div>

            <div className="wallet-data">
              <Card label="Token Price">{formatUSD(dashValues?.quote.sol)}</Card>

              <Card
                label="Profit"
                performance
                hasProfit={dashValues?.profit.sol.hasProfit}
                reference={`+${dashValues?.profit.sol.percentage}%`}
              >
                {formatUSD(dashValues?.profit.sol.value)}
              </Card>

              <Card label="Balance" performance hasProfit={dashValues?.profit.sol.hasProfit}>
                {formatUSD(dashValues?.balance.sol)}
              </Card>
            </div>
          </div>
          <div className="coin-wrapper">
            <div className="coin-title">
              <div className="coin-icon bg-teal-400" />
              <p className="label">
                Aave <span className="text-sm">AAVE {dashValues?.hold.aave}</span>
              </p>
            </div>

            <div className="wallet-data">
              <Card label="Token Price">{formatUSD(dashValues?.quote.aave)}</Card>

              <Card
                label="Profit"
                performance
                hasProfit={dashValues?.profit.aave.hasProfit}
                reference={`+${dashValues?.profit.aave.percentage}%`}
              >
                {formatUSD(dashValues?.profit.aave.value)}
              </Card>

              <Card label="Balance" performance hasProfit={dashValues?.profit.aave.hasProfit}>
                {formatUSD(dashValues?.balance.aave)}
              </Card>
            </div>
          </div>
        </>
      )}
      <div className="list">
        <ul>
          {tradesList.docs.map((trade) => {
            return (
              <li key={trade.id}>
                {showReadableDate(trade.tradeDate)} - {(trade.coinIn as Coin).coin}:{' '}
                {trade.amountIn} - {(trade.coinOut as Coin).coin}: {trade.amountOut}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="footer"></div>
    </div>
  )
}
