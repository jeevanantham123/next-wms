// app/middleware.js

import { NextResponse } from "next/server";
import { base64url, jwtDecrypt } from "jose";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export default async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Verify token
    const secret = base64url.decode(JWT_SECRET);

    const { payload, protectedHeader } = await jwtDecrypt(token, secret, {
      issuer: "urn:yourapp:issuer",
      audience: "urn:yourapp:audience",
    });

    const response = NextResponse.next();
    response.headers.set("x-user-email", payload.email);
    response.headers.set("x-user-id", payload.id);

    return response;

    // Add custom logic to check roles or permissions if needed
    // e.g., if route requires admin privileges:
    // if (decoded.role !== 'admin') {
    //   return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    // }
  } catch (error) {
    console.log("Middleware error", error);
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}

// // Apply middleware only to specific paths
export const config = {
  matcher: ["/api/admin/:path*"], // Apply middleware to all /api/users routes
};
