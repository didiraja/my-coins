type AmountByCoin = {
  btc: number
  sol: number
}

type Profit = {
  value: number
  hasProfit: boolean
  percentage: number
}

export type IDashEndpoint = {
  quote: AmountByCoin
  hold: AmountByCoin
  balance: AmountByCoin
  investing: {
    totalNet: number
    totalBTCNet: number
    totalSOLNet: number
  }
  profit: {
    btc: Profit
    sol: Profit
  }
}
