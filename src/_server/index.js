;(async () => {
  const data = [
    /* {
      tradeDate: '2024-04-19T03:00:00.000Z',
      coinIn: 8,
      amountIn: 2662.35,
      coinOut: 1,
      amountOut: 0.00761049,
    } */
  ]

  const endpoint = 'http://localhost:3000/api/trade'

  try {
    data.forEach(async (trade) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trade),
      })

      if (!response.ok) {
        throw new Error(`Failed to send trade: ${JSON.stringify(trade)}`)
      }

      const result = await response.json()
      console.log('Success:', result)
    })
  } catch (error) {
    console.error('Error sending trades:', error)
  }
})()
