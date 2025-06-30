// lib/withRole.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Creates a role-based middleware function for Next.js
 * Protects routes by checking if the user has the required role
 */
export function withRole(requiredRole: "INVESTOR" | "FOUNDER" | "ADMIN") {
  return async (req: NextRequest) => {
    try {
      // Make HTTP request to get session data
      const response = await fetch(`${req.nextUrl.origin}/api/auth/get-session`, {
        headers: {
          cookie: req.headers.get("cookie") || "", // Forward the cookies from the request
        },
      });

      if (!response.ok) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const session = await response.json();
      
      if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      
      const userWithRole = session.user as typeof session.user & { role?: string };
      if (userWithRole.role !== requiredRole) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  };
}

export async function middleware(request: NextRequest) {
  // Protect dashboard routes for ADMIN users only
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return withRole("ADMIN")(request);
  }
  
  // Protect investor routes for INVESTOR users only
  if (request.nextUrl.pathname.startsWith('/investor')) {
    return withRole("INVESTOR")(request);
  }
  
  // Protect founder routes for FOUNDER users only
  if (request.nextUrl.pathname.startsWith('/founder')) {
    return withRole("FOUNDER")(request);
  }
  
  // For all other routes, allow access
  return NextResponse.next();
}

/**
 * Configure which routes the middleware applies to
 */
export const config = {
  matcher: [
    '/admin/:path*',
    '/investor/:path*', 
    '/founder/:path*',
    // Add other protected routes here
  ],
};
