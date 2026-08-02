import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  // Only protect routes under /admin or /dashboard
  if (!isAdminRoute && !isDashboardRoute) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("session")?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const payload = await verifySessionToken(sessionToken);

    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAdminRoute && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Token is valid
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
