import { NextResponse } from "next/server"

// Mock messages data
const mockMessages = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    message: "I'm interested in learning piano. Do you offer beginner classes?",
    status: "new",
    createdAt: "2024-02-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    message: "Can you help me with music composition for my wedding?",
    status: "read",
    createdAt: "2024-02-10T14:15:00Z",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    message: "What are your rates for voice lessons?",
    status: "new",
    createdAt: "2024-02-20T16:45:00Z",
  },
]

export async function GET() {
  try {
    return NextResponse.json(mockMessages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
