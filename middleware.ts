// /middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuth = request.cookies.get("auth")?.value === "true"
  const { pathname } = request.nextUrl

  const publicPaths = ["/sign-in", "/favicon.ico", "/_next", "/fonts", "/images", "/api/public"]

  const isPublic = publicPaths.some((path) => pathname.startsWith(path))

  if (!isAuth && !isPublic) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  if (isAuth && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"], // Match all paths except files and _next assets
}
