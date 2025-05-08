import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Coin } from '@/payload-types'
import { formatBRL, formatUSD, showReadableDate } from '@/libs/format'
import { GetDashValues } from '@/libs/request'
import Card from '@/components/Card'
import CoinPortfolio from '@/components/CoinPortfolio'

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
      {dashValues &&
        dashValues?.portfolio.map((item) => (
          <CoinPortfolio key={item.symbol} color={item.color} data={item} />
        ))}
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
