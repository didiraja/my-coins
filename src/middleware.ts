import { NextRequest, NextResponse } from 'next/server'
import { decodePayloadToken } from '@/libs/session'

const protectedRoutes = ['/', '/trades']
// const publicRoutes = ['/login']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  // const isPublicRoute = publicRoutes.includes(path)

  const cookie = req.cookies.get('payload-token')?.value

  const decodedToken = await decodePayloadToken(cookie || '')

  if (isProtectedRoute && !decodedToken) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
