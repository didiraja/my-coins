import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Coin } from '@/payload-types'
import { formatBRL, formatGenericAmount, formatUSD, showReadableDate } from '@/libs/format'
import { GetDashValues } from '@/libs/request'
import Card from '@/components/Card'
import CoinPortfolio from '@/components/CoinPortfolio'

export const dynamic = 'force-dynamic'

export const revalidate = 0

export default async function TradesRoute() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const tradesList = await payload.find({
    collection: 'trade',
    sort: '-tradeDate',
    limit: 99,
  })

  if (typeof window !== 'undefined') {
    console.log(tradesList)
  }

  return (
    <div className="trades">
      <div className="title">
        <h1>Trades</h1>
      </div>
      <div className="list">
        <ul>
          {tradesList.docs.map((trade) => {
            return (
              <li key={trade.id}>
                <p className="leading-8">
                  <span className="text-xs">{showReadableDate(trade.tradeDate)}</span>{' '}
                  <span className="font-bold uppercase">{(trade.coinIn as Coin).coin}:</span>{' '}
                  {formatGenericAmount(trade.amountIn)}
                  {' > '}
                  <span className="font-bold uppercase">{(trade.coinOut as Coin).coin}:</span>{' '}
                  {formatGenericAmount(trade.amountOut)}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="footer"></div>
    </div>
  )
}
