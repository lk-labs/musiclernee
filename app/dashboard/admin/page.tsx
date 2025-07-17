"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [materialUrl, setMaterialUrl] = useState("")

  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")

    if (!userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Redirect if not admin
      if (parsedUser.userType !== "admin") {
        router.push("/dashboard/user")
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const handleSaveMaterialUrl = () => {
    // Save to backend or state logic
    alert("Teaching material URL saved: " + materialUrl)
  }

  if (loading) return <p className="p-4">Loading...</p>

  if (!user || user.userType !== "admin") {
    return <p className="p-4 text-red-500">Access denied. Redirecting...</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>

        <p className="text-gray-700 mb-6">Welcome, {user.email}</p>

        {/* Manage Users */}
        <div className="mb-8 p-4 border rounded bg-gray-50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <p className="text-gray-600 mb-4">View, add, edit or delete registered users.</p>
          <div className="space-x-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white">Add User</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Edit User</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Delete User</Button>
            <Button className="bg-gray-600 hover:bg-gray-700 text-white">View Users</Button>
          </div>
        </div>

        {/* Teaching Material */}
        <div className="mb-8 p-4 border rounded bg-gray-50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Music Teaching Material</h2>
          <p className="text-gray-600 mb-4">Embed a YouTube link or PDF URL for music learners.</p>
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com/teaching-material"
              value={materialUrl}
              onChange={(e) => setMaterialUrl(e.target.value)}
            />
            <Button onClick={handleSaveMaterialUrl}>Save</Button>
          </div>
        </div>

        {/* Contact Messages */}
        <div className="mb-8 p-4 border rounded bg-gray-50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Messages from Contact Form</h2>
          <p className="text-gray-600 mb-4">View and reply to messages sent through the contact form.</p>

          {/* Example message block */}
          <div className="border p-3 rounded mb-3 bg-white shadow-sm">
            <p><strong>From:</strong> user@example.com</p>
            <p><strong>Message:</strong> I am interested in music training, please guide me.</p>
            <div className="mt-2">
              <Textarea placeholder="Type your reply here..." className="mb-2" />
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Reply via Email</Button>
            </div>
          </div>
        </div>

        {/* Reports */}
        <div className="p-4 border rounded bg-gray-50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          <p className="text-gray-600 mb-4">Generate usage or registration reports.</p>
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">Generate Report</Button>
        </div>
      </div>
    </div>
  )
}
