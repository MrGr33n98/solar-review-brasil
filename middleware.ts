import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const session = request.cookies.get('session')

  // Paths that require authentication
  const authPaths = ['/dashboard']
  
  // Check if the requested path requires authentication
  const requiresAuth = authPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // Redirect to login if accessing protected route without session
  if (requiresAuth && !session) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to dashboard if accessing auth pages with valid session
  if (request.nextUrl.pathname.startsWith('/auth/') && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
  ],
}
