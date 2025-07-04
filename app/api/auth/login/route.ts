import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Mock user database for demo purposes
    const mockUsers = {
      "admin@cvgpraysing.com": {
        uid: "admin123",
        email: "admin@cvgpraysing.com",
        name: "Admin User",
        role: "admin",
        password: "demo123",
      },
      "user@example.com": {
        uid: "user123",
        email: "user@example.com",
        name: "Demo User",
        role: "user",
        password: "demo123",
      },
    }

    // Check if user exists and password matches
    const user = mockUsers[email]
    if (!user || password !== user.password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "Login successful",
        user: userWithoutPassword,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
