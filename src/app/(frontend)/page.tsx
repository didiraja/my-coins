import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import './styles.css'
import { Coin } from '@/payload-types'
import { showReadableDate } from '@/libs/format'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Coins Dashboard',
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'trade',
    sort: '-tradeDate',
  })

  // if (typeof window !== 'undefined') {
  //   console.log(result)
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
      <div className="list">
        <ul>
          {result.docs.map((trade) => {
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
