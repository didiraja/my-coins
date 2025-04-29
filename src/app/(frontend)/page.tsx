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
              <div className="card">
                <p className="label">Token Price</p>
                <p className="value">{formatUSD(dashValues?.quote.btc)}</p>
              </div>

              <div className="card">
                <p className="label">Profit</p>
                <p
                  className={`value ${dashValues?.profit.btc.hasProfit ? 'text-green-500' : 'text-red-500'}`}
                >
                  {formatBRL(dashValues?.profit.btc.value)}{' '}
                  <span className="text-sm">+{dashValues?.profit.btc.percentage}%</span>
                </p>
              </div>

              <div className="card">
                <p className="label">Balance</p>
                <p
                  className={`value ${dashValues?.profit.btc.hasProfit ? 'text-green-500' : 'text-red-500'}`}
                >
                  {formatBRL(dashValues?.balance.btc)}
                </p>
              </div>
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
