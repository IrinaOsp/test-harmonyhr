import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookies } from "next-client-cookies/server";

export function middleware(request: NextRequest) {
  const cookies = getCookies();
  const token = cookies.get("access_token");

  if (!token && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/my-info", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|static|favicon.ico).*)",
};
