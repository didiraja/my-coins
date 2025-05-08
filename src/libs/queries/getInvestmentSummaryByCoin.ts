import { coin, trade } from '@/payload-generated-schema'
import { sql } from '@payloadcms/db-sqlite'
import { PayloadRequest } from 'payload'

type Props = {
  coinId: number
  req: PayloadRequest
}

export const getInvestmentSummaryByCoin = async ({ coinId, req }: Props) => {
  const caseTotalInvested = sql<number>`CASE WHEN ${trade.coinOut} = ${coinId} THEN ${trade.amountIn} ELSE 0 END`

  const caseTotalWithdrawn = sql<number>`CASE WHEN ${trade.coinIn} = ${coinId} THEN ${trade.amountOut} ELSE 0 END`

  return await req.payload.db.drizzle
    .select({
      coinName: coin.coin,
      totalInvested: sql<number>`
      SUM(${caseTotalInvested})
    `,
      totalWithdrawn: sql<number>`
      SUM(${caseTotalWithdrawn})
    `,
      netInvestment: sql<number>`
      SUM(${caseTotalInvested})
      -
      SUM(${caseTotalWithdrawn})
    `,
    })
    .from(trade)
    .innerJoin(
      coin,
      sql`
      ${coin.id} = CASE
        WHEN ${trade.coinOut} = ${coinId} THEN ${trade.coinIn}
        WHEN ${trade.coinIn} = ${coinId} THEN ${trade.coinOut}
      END
    `,
    )
    .where(
      sql`
      ${trade.coinOut} = ${coinId} OR ${trade.coinIn} = ${coinId}
    `,
    )
    .groupBy(coin.coin)
    .having(
      sql`
      SUM(${caseTotalInvested})
      -
      SUM(${caseTotalWithdrawn})
      != 0
    `,
    )
    .orderBy(
      sql`
      SUM(${caseTotalInvested})
      -
      SUM(${caseTotalWithdrawn})
      DESC
    `,
    )
}
