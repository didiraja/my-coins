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
        <div>
          <a
            className="btn-link"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
        </div>
      </div>
      {dashValues && (
        <>
          <div className="summary">
            <h1 className="text-3xl font-semibold pb-2 border-b-2 mb-4 border-white/70">
              (BTC) Bitcoin
            </h1>

            <div>
              <p className="text-base">Token Price</p>
              <p className="text-xl font-semibold">{formatUSD(dashValues?.quote.btc)}</p>
            </div>
          </div>
          <div className="summary">
            <Card label="BTC value:">{formatUSD(dashValues?.quote.btc)}</Card>
            <Card label="BTC hold:">{dashValues?.hold.btc}</Card>
            <Card label="BTC Balance:">{formatBRL(dashValues?.balance.btc)}</Card>
            <Card label="BTC invest net:">{formatBRL(dashValues?.investing.totalBTCNet)}</Card>
            <Card label="BTC Profit:" showProfit profit={dashValues?.profit.btc.hasProfit}>
              {formatBRL(dashValues?.profit.btc.value)}
            </Card>
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
