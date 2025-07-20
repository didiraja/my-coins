import React from 'react'
import { GetDashValues } from '@/libs/request'
import CoinPortfolio from '@/components/CoinPortfolio'
import Card from '@/components/Card'

export const dynamic = 'force-dynamic'

export const revalidate = 0

export default async function HomePage() {
  const dashValues = await GetDashValues()

  // if (typeof window !== 'undefined') {
  //   console.log(dashValues)
  // }

  return (
    <div className="home">
      <div className="title">
        <h1>My Coins</h1>
      </div>
      {!dashValues && (
        <Card className="bg-red-950! border-red-900!" label="Something went wrong">
          Couldn&apos;t fetch portfolio data.
        </Card>
      )}
      {dashValues &&
        dashValues?.portfolio
          ?.sort((a, b) => Number(b.profit?.percentage) - Number(a.profit?.percentage))
          .map((item) => <CoinPortfolio key={item.symbol} color={item.color} data={item} />)}
      <div className="footer"></div>
    </div>
  )
}
