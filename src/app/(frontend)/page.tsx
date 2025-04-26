import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Coin } from '@/payload-types'
import { formatBRL, formatUSD, showReadableDate } from '@/libs/format'
import { GetDashValues } from '@/libs/request'
import Card from '@/components/Card'
// import * as S from './style.module.css'

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
            <Card label="BTC value:">{formatUSD(dashValues?.quote.btc)}</Card>
            <Card label="BTC hold:">{dashValues?.hold.btc}</Card>
            <Card label="BTC Balance:">{formatBRL(dashValues?.balance.btc)}</Card>
            <Card label="Total invest net:">{formatBRL(dashValues?.investing.net)}</Card>
            {/* <Card label="Profit (BRL):" showProfit profit={dashValues?.investing.profit > 0}>
              {formatBRL(dashValues?.investing.profit)}
            </Card>
            <Card label="Total (BRL):" showProfit profit={dashValues?.investing.profit > 0}>
              {formatBRL(dashValues?.balance.totalBRL)}
            </Card>
            <Card label="Total (USD):">{formatUSD(dashValues?.balance.total)}</Card>
            <Card label="Total (BTC):">{formatUSD(dashValues?.balance.btc)}</Card>
            <Card label="Total (ETH):">{formatUSD(dashValues?.balance.eth)}</Card>
            <Card label="Total (SOL):">{formatUSD(dashValues?.balance.sol)}</Card> */}
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
      <div className="footer">
        {/* <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a> */}
      </div>
    </div>
  )
}
