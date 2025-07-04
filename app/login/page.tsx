"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Music } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.user) {
        try {
          localStorage.setItem("user", JSON.stringify(data.user))

          if (data.user.role === "admin") {
            router.push("/dashboard/admin")
          } else {
            router.push("/dashboard/user")
          }
        } catch (storageError) {
          console.error("Error storing user data:", storageError)
          setError("Login successful but there was an issue saving your session. Please try again.")
        }
      } else {
        setError(data.message || "Login failed. Please try again.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your CVGPraySing account</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Enter your password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign up here
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Demo Credentials</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>
                <strong>Admin:</strong> admin@cvgpraysing.com / demo123
              </p>
              <p>
                <strong>User:</strong> user@example.com / demo123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
