import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Coin } from '@/payload-types'
import { showReadableDate } from '@/libs/format'
import { GetDashValues } from '@/libs/request'
// import * as S from './style.module.css'

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
      <div className="content">
        <h1>My Coins</h1>
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
        </div>
      </div>
      <div className="summary">
        <p>Total invest net: {dashValues?.investing.net}</p>
        <p>Total Balance (USD): {dashValues?.balance.total}</p>
        <p>Total Balance (BRL): {dashValues?.balance.totalBRL}</p>
        <p>Total Balance (BTC): {dashValues?.balance.btc}</p>
        <p>Total Balance (ETH): {dashValues?.balance.eth}</p>
        <p>Total Balance (SOL): {dashValues?.balance.sol}</p>
      </div>
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
