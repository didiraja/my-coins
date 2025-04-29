type Profit = {
  value: number
  hasProfit: boolean
  percentage: number
}

export type IDashEndpoint = {
  quote: {
    btc: number
  }
  hold: {
    btc: number
  }
  balance: {
    btc: number
  }
  investing: {
    totalNet: number
    totalBTCNet: number
  }
  profit: {
    btc: Profit
  }
}
