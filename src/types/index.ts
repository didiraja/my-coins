export type AmountByCoin = {
  btc: number
  sol: number
  aave: number
}

type Profit = {
  value: number
  hasProfit: boolean
  percentage: number
}

export type Portfolio = {
  name: string
  symbol: string
  color: string
  price: number
  targetPrice?: number
  hold: number
  balance: number
  investing: number
  profit: Profit
}

export type IDashEndpoint = {
  total: {
    investing: number
    net: number
  }
  portfolio: Portfolio[]
}
