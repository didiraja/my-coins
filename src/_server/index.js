;(async () => {
  const data = [
    {
      tradeDate: '2024-08-15T00:00:00.000Z',
      coinIn: 8,
      amountIn: 50,
      coinOut: 1,
      amountOut: 0.00015337,
    },
    {
      tradeDate: '2024-08-15T00:00:00.000Z',
      coinIn: 8,
      amountIn: 50,
      coinOut: 2,
      amountOut: 0.00341366,
    },
    {
      tradeDate: '2024-08-15T00:00:00.000Z',
      coinIn: 8,
      amountIn: 50,
      coinOut: 3,
      amountOut: 0.062961172,
    },
    {
      tradeDate: '2024-08-23T00:00:00.000Z',
      coinIn: 8,
      amountIn: 150,
      coinOut: 9,
      amountOut: 26.89,
    },
    {
      tradeDate: '2024-08-27T00:00:00.000Z',
      coinIn: 9,
      amountIn: 117.21,
      coinOut: 1,
      amountOut: 0.0019435,
    },
    {
      tradeDate: '2024-08-27T00:00:00.000Z',
      coinIn: 8,
      amountIn: 1000,
      coinOut: 1,
      amountOut: 0.00303944,
    },
    {
      tradeDate: '2024-09-05T00:00:00.000Z',
      coinIn: 8,
      amountIn: 500,
      coinOut: 1,
      amountOut: 0.0015662,
    },
    {
      tradeDate: '2024-10-01T00:00:00.000Z',
      coinIn: 8,
      amountIn: 1000,
      coinOut: 1,
      amountOut: 0.00283829,
    },
    {
      tradeDate: '2024-10-16T00:00:00.000Z',
      coinIn: 8,
      amountIn: 100,
      coinOut: 2,
      amountOut: 0.00664148,
    },
    {
      tradeDate: '2024-10-16T00:00:00.000Z',
      coinIn: 8,
      amountIn: 100,
      coinOut: 3,
      amountOut: 0.112541292,
    },
    {
      tradeDate: '2024-10-16T00:00:00.000Z',
      coinIn: 8,
      amountIn: 100,
      coinOut: 4,
      amountOut: 46.736045,
    },
    {
      tradeDate: '2024-10-16T00:00:00.000Z',
      coinIn: 8,
      amountIn: 100,
      coinOut: 5,
      amountOut: 2.276508,
    },
    {
      tradeDate: '2024-11-02T00:00:00.000Z',
      coinIn: 8,
      amountIn: 100,
      coinOut: 2,
      amountOut: 0.00669341,
    },
    {
      tradeDate: '2024-11-02T00:00:00.000Z',
      coinIn: 8,
      amountIn: 100,
      coinOut: 3,
      amountOut: 0.100734095,
    },
    {
      tradeDate: '2024-11-02T00:00:00.000Z',
      coinIn: 8,
      amountIn: 100,
      coinOut: 4,
      amountOut: 52.769749,
    },
    {
      tradeDate: '2024-11-02T00:00:00.000Z',
      coinIn: 8,
      amountIn: 100,
      coinOut: 5,
      amountOut: 2.250702,
    },
    {
      tradeDate: '2024-11-13T00:00:00.000Z',
      coinIn: 1,
      amountIn: 0.00188044,
      coinOut: 8,
      amountOut: 993.74,
    },
    {
      tradeDate: '2024-11-21T00:00:00.000Z',
      coinIn: 5,
      amountIn: 4.52721,
      coinOut: 8,
      amountOut: 228.1,
    },
    {
      tradeDate: '2024-11-21T00:00:00.000Z',
      coinIn: 1,
      amountIn: 0.0018046,
      coinOut: 8,
      amountOut: 1003.83,
    },
    {
      tradeDate: '2024-12-04T00:00:00.000Z',
      coinIn: 1,
      amountIn: 0.00163274,
      coinOut: 8,
      amountOut: 985.19,
    },
    {
      tradeDate: '2024-12-11T00:00:00.000Z',
      coinIn: 8,
      amountIn: 50,
      coinOut: 6,
      amountOut: 0.349808,
    },
    {
      tradeDate: '2024-12-11T00:00:00.000Z',
      coinIn: 8,
      amountIn: 50,
      coinOut: 7,
      amountOut: 0.029181,
    },
    {
      tradeDate: '2025-01-13T00:00:00.000Z',
      coinIn: 8,
      amountIn: 1000,
      coinOut: 1,
      amountOut: 0.00178279,
    },
    {
      tradeDate: '2025-01-21T00:00:00.000Z',
      coinIn: 8,
      amountIn: 4686.07,
      coinOut: 9,
      amountOut: 758.49,
    },
    {
      tradeDate: '2025-02-02T00:00:00.000Z',
      coinIn: 9,
      amountIn: 171.19,
      coinOut: 1,
      amountOut: 0.00172963,
    },
    {
      tradeDate: '2025-02-05T00:00:00.000Z',
      coinIn: 9,
      amountIn: 17.24,
      coinOut: 3,
      amountOut: 0.085896224,
    },
    {
      tradeDate: '2025-02-05T00:00:00.000Z',
      coinIn: 9,
      amountIn: 17.24,
      coinOut: 2,
      amountOut: 0.00613272,
    },
    {
      tradeDate: '2025-02-27T00:00:00.000Z',
      coinIn: 9,
      amountIn: 171.2,
      coinOut: 1,
      amountOut: 0.00204637,
    },
  ]

  const endpoint = 'https://your-api.com/endpoint'

  try {
    await Promise.all(
      data.map(async (trade) => {
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
      }),
    )
  } catch (error) {
    console.error('Error sending trades:', error)
  }
})()
