export { default } from "next-auth/middleware";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {}

export const config = {
  matcher: ["/api/:path*", "/main"],
};
