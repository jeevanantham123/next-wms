import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const user = request.headers.get("x-user-email");
    if (user)
      return NextResponse.json({ success: true, data: user }, { status: 200 });
    else throw new Error("Not authorized");
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
