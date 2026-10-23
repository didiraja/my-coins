import { NextRequest, NextResponse } from 'next/server'
import { decodePayloadToken } from '@/libs/session'

const protectedRoutes = ['/', '/dashboard', '/trades']
const publicRoutes = ['/login']

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = req.cookies.get('payload-token')?.value

  const decodedToken = cookie ? await decodePayloadToken(cookie) : null

  if (isProtectedRoute && !decodedToken) {
    const loginUrl = new URL('/login', req.url)
    const response = NextResponse.redirect(loginUrl)
    if (cookie) response.cookies.delete('payload-token')
    return response
  }

  if (isPublicRoute && decodedToken) {
    const loginUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(loginUrl)
  }

  const response = NextResponse.next()
  if (cookie && !decodedToken) response.cookies.delete('payload-token')
  return response
}
