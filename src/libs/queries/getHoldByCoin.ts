import { trade } from '@/payload-generated-schema'
import { QueryProps } from '@/types'
import { sql } from '@payloadcms/db-sqlite'

export const getHoldByCoin = async ({ coinId, req }: QueryProps) => {
  const caseTotalBought = sql<number>`SUM(CASE WHEN ${trade.coinOut} = ${coinId} THEN ${trade.amountOut} ELSE 0 END)`

  const caseTotalSold = sql<number>`SUM(CASE WHEN ${trade.coinIn} = ${coinId} THEN ${trade.amountIn} ELSE 0 END)`

  const output = await req.payload.db.drizzle
    .select({
      totalBought: caseTotalBought,
      totalSold: caseTotalSold,
      totalHold: sql<number>`${caseTotalBought} - ${caseTotalSold}`,
    })
    .from(trade)

  return output[0]
}
