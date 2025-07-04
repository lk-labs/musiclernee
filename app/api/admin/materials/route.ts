import { NextResponse } from "next/server"

// Mock data for admin materials management
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
]

export async function GET() {
  try {
    return NextResponse.json(mockMaterials)
  } catch (error) {
    console.error("Error fetching materials:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, youtube_url, youtube_id, category } = await request.json()

    // Validate required fields
    if (!title || !youtube_url || !youtube_id) {
      return NextResponse.json({ message: "Title, YouTube URL, and YouTube ID are required" }, { status: 400 })
    }

    // Create new material (mock)
    const newMaterial = {
      id: Date.now().toString(),
      title,
      description: description || "",
      youtube_url,
      youtube_id,
      category: category || "teaching",
      createdAt: new Date().toISOString(),
    }

    console.log("New material created:", newMaterial)

    return NextResponse.json(newMaterial, { status: 201 })
  } catch (error) {
    console.error("Error creating material:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
