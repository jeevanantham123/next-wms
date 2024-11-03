// app/api/auth/login/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { EncryptJWT, base64url } from "jose"; // Importing JWT functions

const prisma = new PrismaClient();
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
const JWT_EXPIRATION = process.env.NEXT_PUBLIC_JWT_EXPIRATION || "1h";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.users.findUnique({
      where: { email },
      include: {
        permissions: true, // This will fetch the user's permissions
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const secret = base64url.decode(JWT_SECRET);

    // Create JWT
    const token = await new EncryptJWT({
      id: user.id,
      email: user.email,
      permissions: user.permissions.map((p) => p.name), // Including user permissions in token
    })
      .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
      .setIssuedAt()
      .setIssuer("urn:yourapp:issuer")
      .setAudience("urn:yourapp:audience")
      .setExpirationTime(JWT_EXPIRATION)
      .encrypt(secret);

    // Set token as HttpOnly cookie
    return NextResponse.json(
      { success: true, data: user, message: "Login successful" },
      {
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${3600}`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
