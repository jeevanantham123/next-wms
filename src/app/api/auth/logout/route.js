// app/api/auth/logout/route.js

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { success: true, message: "Logout successful" },
    { headers: { "Set-Cookie": "token=; HttpOnly; Path=/; Max-Age=0" } }
  );
}
