"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [materials, setMaterials] = useState([])
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem("user")
        if (!userData) {
          router.push("/login")
          return
        }

        const parsedUser = JSON.parse(userData)
        if (parsedUser.role !== "admin") {
          router.push("/dashboard/user")
          return
        }

        setUser(parsedUser)
        await loadData()
      } catch (error) {
        console.error("Error checking auth:", error)
        localStorage.removeItem("user")
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [mounted, router])

  const loadData = async () => {
    try {
      // Load materials
      const materialsRes = await fetch("/api/admin/materials")
      if (materialsRes.ok) {
        const materialsData = await materialsRes.json()
        setMaterials(materialsData)
      }

      // Load users
      const usersRes = await fetch("/api/admin/users")
      if (usersRes.ok) {
        const usersData = await usersRes.json()
        setUsers(usersData)
      }

      // Load messages
      const messagesRes = await fetch("/api/admin/messages")
      if (messagesRes.ok) {
        const messagesData = await messagesRes.json()
        setMessages(messagesData)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem("user")
      router.push("/")
    } catch (error) {
      console.error("Error during logout:", error)
      window.location.href = "/"
    }
  }

  if (!mounted || loading) {
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
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
            { id: "overview", label: "Overview" },
            { id: "materials", label: "Teaching Materials" },
            { id: "users", label: "Users" },
            { id: "messages", label: "Messages" },
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

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-gray-500">Registered members</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Teaching Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{materials.length}</div>
                <p className="text-xs text-gray-500">Video tutorials</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">New Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{messages.filter((m: any) => m.status === "new").length}</div>
                <p className="text-xs text-gray-500">Unread messages</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{messages.length}</div>
                <p className="text-xs text-gray-500">All contact messages</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Teaching Materials Tab */}
        {activeTab === "materials" && (
          <Card>
            <CardHeader>
              <CardTitle>Teaching Materials</CardTitle>
              <CardDescription>Manage your uploaded teaching materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materials.map((material: any) => (
                  <div key={material.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{material.title}</h3>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs capitalize">
                        {material.category}
                      </span>
                      <span className="text-xs text-gray-500">{new Date(material.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Role</th>
                      <th className="text-left py-2">Joined</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: any) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-2">{user.name}</td>
                        <td className="py-2">{user.email}</td>
                        <td className="py-2">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="py-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {user.role !== "admin" && (
                              <Button variant="destructive" size="sm">
                                Delete
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>View and respond to user inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message: any) => (
                  <div key={message.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{message.name}</h3>
                        <p className="text-sm text-gray-600">{message.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            message.status === "new" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {message.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{message.message}</p>
                    <div className="flex space-x-2">
                      <Button size="sm">Reply</Button>
                      <Button variant="outline" size="sm">
                        Mark as Read
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
