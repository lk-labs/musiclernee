"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  userType: string
}

export default function ViewUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost/musiclernee/backend/viewusers.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users)
          setError("")
        } else {
          setError(data.message || "Failed to load users")
        }
      })
      .catch(() => setError("Failed to fetch users"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="p-4">Loading users...</p>
  }

  if (error) {
    return <p className="p-4 text-red-600">Error: {error}</p>
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Registered Users</h1>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">User Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.first_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.last_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.userType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
