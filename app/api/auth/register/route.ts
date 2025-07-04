import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Validate name length
    if (name.trim().length < 2) {
      return NextResponse.json({ message: "Name must be at least 2 characters long" }, { status: 400 })
    }

    // Check if user already exists (mock check)
    const existingEmails = ["admin@cvgpraysing.com", "user@example.com"]
    if (existingEmails.includes(email)) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Create new user (mock)
    const newUser = {
      uid: `user_${Date.now()}`,
      email,
      name: name.trim(),
      role: "user",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        message: "Registration successful",
        user: newUser,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
