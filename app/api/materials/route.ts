import { NextResponse } from "next/server"

// Mock data for teaching materials
const mockMaterials = [
  {
    id: "1",
    title: "Introduction to Music Theory",
    description: "Learn the basics of music theory including notes, scales, and rhythm patterns.",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_id: "dQw4w9WgXcQ",
    category: "foundation",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Gospel Piano Basics",
    description: "Essential gospel piano techniques and chord progressions for beginners.",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_id: "dQw4w9WgXcQ",
    category: "teaching",
    createdAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "3",
    title: "Vocal Warm-up Exercises",
    description: "Daily vocal exercises to improve your singing voice and range.",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_id: "dQw4w9WgXcQ",
    category: "teaching",
    createdAt: "2024-01-25T09:15:00Z",
  },
]

export async function GET() {
  try {
    // Return mock materials
    return NextResponse.json(mockMaterials)
  } catch (error) {
    console.error("Error fetching materials:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
