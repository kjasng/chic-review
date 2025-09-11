import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { hash } from "bcryptjs"
import { z } from "zod"

import { prisma } from "@/lib/db/prisma"
import { registerSchema } from "@/lib/validations/auth.schema"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 },
      )
    }

    // Hash the password
    const hashedPassword = await hash(validatedData.password, 12)

    // Create the user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation Error", details: error.issues },
        { status: 400 },
      )
    }

    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    )
  }
}
