"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("materials")
  const [loading, setLoading] = useState(true)
  const [materials, setMaterials] = useState([])
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
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
      } catch (error) {
        console.error("Error parsing user data:", error)
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

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Continue your musical journey</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
          {[
            { id: "materials", label: "Learning Materials" },
            { id: "profile", label: "My Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Learning Materials Tab */}
        {activeTab === "materials" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Materials List */}
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

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-lg">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email Address</label>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Account Type</label>
                  <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{user.role}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Videos Watched</span>
                      <span className="text-sm text-gray-600">0 / {materials.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "0%" }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{materials.length}</div>
                      <div className="text-sm text-gray-600">Available Videos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
