import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/', '/trades']
const publicRoutes = ['/login']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = req.cookies.get('payload-token')?.value

  return NextResponse.next()
}
