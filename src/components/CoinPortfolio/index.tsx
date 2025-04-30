'use client'

import { formatUSD } from '@/libs/format'
import Card from '../Card'
import { AmountByCoin, IDashEndpoint } from '@/types'

const CoinPortfolio = ({
  coin,
  color = 'bg-gray-400',
  data,
}: {
  coin: keyof AmountByCoin
  color: string
  data: IDashEndpoint
}) => {
  return (
    <div className="coin-wrapper">
      <div className="coin-title">
        <div className={`coin-icon ${color}`} />
        <p className="label">
          Transfero <span className="text-sm">BRZ {data?.hold[coin]}</span>
        </p>
      </div>

      <div className="wallet-data">
        <Card label="Token Price">{formatUSD(data?.quote[coin])}</Card>

        <Card
          label="Profit"
          performance
          hasProfit={data?.profit[coin].hasProfit}
          reference={`+${data?.profit[coin].percentage}%`}
        >
          {formatUSD(data?.profit[coin].value)}
        </Card>

        <Card label="Balance" performance hasProfit={data?.profit[coin].hasProfit}>
          {formatUSD(data?.balance[coin])}
        </Card>
      </div>
    </div>
  )
}

export default CoinPortfolio
