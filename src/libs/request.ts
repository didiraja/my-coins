import axios from 'axios'

export const GetCoinsQuotes = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      headers: {
        'x-cg-demo-api-key': process.env.API_TOKEN,
      },
      params: {
        ids: 'bitcoin,ethereum,solana',
        vs_currencies: 'usd,brl',
      },
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}
