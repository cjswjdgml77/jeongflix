export { default } from "next-auth/middleware";
import type { NextRequest } from "next/server";
import { withAuth } from "./lib/middleware/withAuth";

export function middleware(request: NextRequest) {}

export const config = {
  matcher: ["/api/:path*", "/main"],
};
