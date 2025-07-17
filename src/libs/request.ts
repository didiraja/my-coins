import { IDashEndpoint } from '@/types'
import axios, { AxiosResponse } from 'axios'

export const GetCoinsQuotes = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      headers: {
        'x-cg-demo-api-key': process.env.API_TOKEN,
      },
      params: {
        ids: 'bitcoin,ethereum,link,matic-network,uniswap,polkadot,solana,usd-coin,aave',
        vs_currencies: 'usd,brl',
      },
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const GetDashValues = async () => {
  try {
    const response: AxiosResponse<IDashEndpoint> = await axios.get(
      `${process.env.VERCEL_ENV === 'production' ? 'https://my-coins-vert.vercel.app/' : `http://localhost:${process.env.PORT}`}/api/dashboard`,
      {
        headers: {
          'x-secret-token': process.env.PAYLOAD_SECRET,
          'Cache-Control': 'no-store',
          Pragma: 'no-cache',
          Expires: '0',
        },
      },
    )

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const DoLogin = async () => {
  try {
    const response: AxiosResponse<IDashEndpoint> = await axios.post(
      `${process.env.VERCEL_ENV === 'production' ? 'https://my-coins-vert.vercel.app/' : `http://localhost:3000`}/api/users/login`,
      {
        email: 'didiraja@hotmail.com',
        password: process.env.NEXT_PUBLIC_USER_PASS,
      },
      {
        headers: {
          Credentials: true,
        },
      },
    )

    return response.data
  } catch (error) {
    console.log(error)
  }
}
