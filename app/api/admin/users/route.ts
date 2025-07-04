import { NextResponse } from "next/server"

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@cvgpraysing.com",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Demo User",
    email: "user@example.com",
    role: "user",
    createdAt: "2024-01-10T12:00:00Z",
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    createdAt: "2024-01-15T09:30:00Z",
  },
]

export async function GET() {
  try {
    return NextResponse.json(mockUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
