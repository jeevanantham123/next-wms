// app/api/permissions/[id]/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name } = await request.json();
    const updatedPermission = await prisma.userPermissions.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    return NextResponse.json(
      { success: true, data: updatedPermission },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.userPermissions.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(
      { success: true, message: "Permission deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
