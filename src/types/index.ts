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
  v2: {
    portfolio: Portfolio[]
  }
  quote: AmountByCoin
  hold: AmountByCoin
  balance: AmountByCoin
  investing: {
    totalNet: number
    totalBTCNet: number
    totalSOLNet: number
    totalAAVENet: number
  }
  profit: {
    btc: Profit
    sol: Profit
    aave: Profit
  }
}
