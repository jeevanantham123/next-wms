import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PUT(request) {
  try {
    const { active, id } = await request.json();

    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        active,
      },
    });
    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
