"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Services from "@/components/ui/services" // Adjust path as needed

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("materials")
  const [loading, setLoading] = useState(true)
  const [materials, setMaterials] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (!userData) {
        router.push("/login")
        return
      }
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        loadMaterials()
      } catch {
        localStorage.removeItem("user")
        router.push("/login")
        return
      }
    }
    setLoading(false)
  }, [router])

  const loadMaterials = async () => {
    try {
      const response = await fetch("/api/materials")
      if (response.ok) {
        const data = await response.json()
        setMaterials(data)
      }
    } catch (error) {
      console.error("Error loading materials:", error)
    }
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      router.push("/")
    }
  }

  const handleProfileUpdate = async () => {
    try {
      const updateData = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.passwordToUpdate || "", // passwordToUpdate is a new field for input, blank means no update
      }

      const response = await fetch("http://localhost/backend/update_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })
      const data = await response.json()

      if (data.status === "success") {
        alert("Profile updated successfully!")
        // Remove passwordToUpdate from user state so it doesn't get saved locally
        const newUser = { ...user }
        delete newUser.passwordToUpdate
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
      } else {
        alert(data.message || "Update failed")
      }
    } catch (error) {
      console.error("Error updating user:", error)
      alert("An error occurred.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const firstName = user.first_name || user.name?.split(" ")[0] || "User"

  // Tab colors, always shown, no hover color changes
  const tabColors: Record<string, string> = {
    materials: "bg-blue-500 text-white",
    services: "bg-green-500 text-white",
    profile: "bg-purple-500 text-white",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {firstName}!</h1>
            <p className="text-gray-600">Continue your musical journey</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="grid w-full grid-cols-3 gap-2 mb-6">
          {["materials", "services", "profile"].map((id) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 rounded-md font-semibold ${
                activeTab === id ? tabColors[id] : tabColors[id]
              }`}
              aria-current={activeTab === id ? "page" : undefined}
              // no hover styles, color is persistent
            >
              {id === "materials"
                ? "Learning Materials"
                : id === "services"
                ? "Services"
                : "Profile"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "materials" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Available Materials</CardTitle>
                  <CardDescription>Click on any video to start learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {materials.map((material: any) => (
                      <div
                        key={material.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{material.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 capitalize">
                                {material.category}
                              </span>
                              {new Date(material.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <Button size="sm">Watch</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Video Player Placeholder */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Video Player</CardTitle>
                  <CardDescription className="text-sm">Select a video to start learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-gray-500 text-2xl">▶</span>
                      </div>
                      <p className="text-gray-500 text-sm">Click on any video to start watching</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div>
            <Services />
          </div>
        )}

        {activeTab === "profile" && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Update Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">First Name</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={user.first_name}
                    onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Name</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={user.last_name}
                    onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">New Password</label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Leave blank to keep current password"
                    onChange={(e) => setUser({ ...user, passwordToUpdate: e.target.value })}
                    autoComplete="new-password"
                  />
                </div>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 mt-4"
                  onClick={handleProfileUpdate}
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
