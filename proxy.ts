import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { me } from "./app/actions/auth";

export async function proxy(request: NextRequest) {
  const token = (await cookies()).get("token");
  
  if (!token && !request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (token) {
    const req = await me();

    if (req.status === "error" && !request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    
    if (req.status === "success" && request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};