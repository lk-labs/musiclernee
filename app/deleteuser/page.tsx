"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function DeleteUserPage() {
  const [id, setId] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()

  const handleDeleteUser = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch("http://localhost/musiclernee/backend/deleteuser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, email }),
    })

    const data = await response.json()

    if (data.success) {
      setMessage(data.message)
      setError("")
      setId("")
      setEmail("")
    } else {
      setError(data.message)
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Delete User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDeleteUser} className="space-y-4">
            <div>
              <Label>User ID</Label>
              <Input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Delete User
            </Button>
          </form>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => router.push("/dashboard/admin")}
          >
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
