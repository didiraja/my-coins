'use server'

import { login } from '@payloadcms/next/auth'
import config from '@payload-config'

export async function loginAction() {
  const email = process.env.USER_EMAIL
  const password = process.env.USER_PASS

  if (!email || !password) {
    throw new Error('Login is not configured.')
  }

  try {
    await login({
      collection: 'users',
      config,
      email,
      password,
    })
  } catch {
    throw new Error('Login failed. Please check your credentials and try again.')
  }
}
