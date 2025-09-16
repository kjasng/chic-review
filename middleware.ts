import { NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"

export default auth((req) => {
  const { nextUrl } = req
  const session = req.auth
  const isLoggedIn = !!session

  // Define route categories
  const isAuthRoute =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register") ||
    nextUrl.pathname.startsWith("/forgot-password")

  const isAdminRoute =
    nextUrl.pathname.startsWith("/admin") ||
    nextUrl.pathname.startsWith("/api/admin") ||
    nextUrl.pathname.startsWith("/api/crawl") ||
    nextUrl.pathname.startsWith("/api/accommodations/manage")

  const isProtectedRoute =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/profile") ||
    nextUrl.pathname.startsWith("/settings") ||
    nextUrl.pathname.startsWith("/rewards/redeem") ||
    nextUrl.pathname.startsWith("/api/reviews/create") ||
    nextUrl.pathname.startsWith("/api/points") ||
    nextUrl.pathname.startsWith("/api/rewards/redeem")

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  // Admin route protection
  if (isAdminRoute) {
    if (!isLoggedIn) {
      let callbackUrl = nextUrl.pathname
      if (nextUrl.search) {
        callbackUrl += nextUrl.search
      }
      const encodedCallbackUrl = encodeURIComponent(callbackUrl)
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
      )
    }

    // Check if user is admin
    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/403", nextUrl))
    }
  }

  // Protected route protection
  if (isProtectedRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    )
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
}

// Use Node.js runtime instead of Edge Runtime to support bcryptjs
export const runtime = "nodejs"
