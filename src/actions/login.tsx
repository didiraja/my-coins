'use server'

import { login } from '@payloadcms/next/auth'
import config from '@payload-config'

export async function loginAction({ email, password }: { email: string; password: string }) {
  try {
    const user = await login({
      collection: 'users',
      config,
      email,
      password,
    })

    return user
  } catch (error) {
    console.error('Login failed:', error)
    throw new Error('Login failed. Please check your credentials and try again.')
  }
}
