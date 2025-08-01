"use client"

import React, { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function EditUserPage() {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState("")
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Fetch user list on page load
  useEffect(() => {
    fetch("http://localhost/musiclernee/backend/getuserslist.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users)
        } else {
          setError("Failed to load users.")
        }
      })
      .catch(() => setError("Failed to load users."))
  }, [])

  // Fetch selected user details
  useEffect(() => {
    if (!selectedUserId) return

    fetch(`http://localhost/musiclernee/backend/getuser.php?id=${selectedUserId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFormData(data.user)
        } else {
          setError("Failed to load user details.")
        }
      })
      .catch(() => setError("Failed to load user details."))
  }, [selectedUserId])

  const handleUpdate = () => {
    setLoading(true)
    setError("")
    setSuccess("")

    fetch("http://localhost/musiclernee/backend/edituser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: selectedUserId, ...formData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess(data.message || "User updated successfully.")
        } else if (data.message === "No changes made or user not found.") {
          setSuccess(data.message)
        } else {
          setError(data.message || "Failed to update user.")
        }
      })
      .catch(() => setError("Failed to update user."))
      .finally(() => setLoading(false))
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
          <CardDescription>Select a user and update their details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="user-select">Select User</Label>
          <Select onValueChange={setSelectedUserId} value={selectedUserId}>
            <SelectTrigger id="user-select" aria-label="Select user">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              {users.length > 0 ? (
                users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.email}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="none">
                  No users found
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          {selectedUserId && (
            <>
              <div className="mt-4">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="Enter first name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Enter last name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <Button
                className="mt-4 w-full"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update User"}
              </Button>

              {error && <p className="text-red-600 mt-3">{error}</p>}
              {success && <p className="text-green-600 mt-3">{success}</p>}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
