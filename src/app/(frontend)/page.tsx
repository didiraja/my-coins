import React from 'react'
import { GetDashValues } from '@/libs/request'
import CoinPortfolio from '@/components/CoinPortfolio'
import Card from '@/components/Card'
// import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export const revalidate = 0

export default async function HomePage() {
  // const cookieStore = await cookies()

  // console.log('value', cookieStore.get('payload-token'))

  const dashValues = await GetDashValues()

  // if (typeof window !== 'undefined') {
  // console.log(dashValues)
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
        dashValues?.portfolio?.map((item) => (
          <CoinPortfolio key={item.symbol} color={item.color} data={item} />
        ))}
      <div className="footer"></div>
    </div>
  )
}
