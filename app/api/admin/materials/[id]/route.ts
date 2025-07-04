import { type NextRequest, NextResponse } from "next/server"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Delete material from Firestore
    await deleteDoc(doc(db, "teachingMaterials", id))

    return NextResponse.json({ message: "Material deleted successfully" })
  } catch (error) {
    console.error("Error deleting material:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
