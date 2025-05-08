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
  hold: number
  balance: number
  investing: number
  profit: Profit
}

export type IDashEndpoint = {
  portfolio: Portfolio[]
}
