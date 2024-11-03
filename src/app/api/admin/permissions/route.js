// app/api/permissions/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const permissions = await prisma.userPermissions.findMany();
    return NextResponse.json(
      { success: true, data: permissions },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json();
    const newPermission = await prisma.userPermissions.create({
      data: { name },
    });
    return NextResponse.json(
      { success: true, data: newPermission },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
