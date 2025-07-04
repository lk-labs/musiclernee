"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Mock user data for demo purposes
const MOCK_USERS = {
  "admin@cvgpraysing.com": {
    uid: "admin123",
    email: "admin@cvgpraysing.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  "user@example.com": {
    uid: "user123",
    email: "user@example.com",
    name: "Demo User",
    role: "user",
    createdAt: new Date().toISOString(),
  },
}

// Create auth context with default values
const AuthContext = createContext({
  user: null,
  userData: null,
  loading: false,
  login: async (email, password) => null,
  register: async (email, password, name) => null,
  logout: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Mock auth functions for v0 preview
  const login = async (email, password) => {
    setLoading(true)

    try {
      // Simple mock authentication
      if (MOCK_USERS[email] && password === "demo123") {
        const mockUser = { uid: MOCK_USERS[email].uid, email }
        setUser(mockUser)
        setUserData(MOCK_USERS[email])

        // Store in localStorage for persistence
        localStorage.setItem("mockUser", JSON.stringify(mockUser))
        localStorage.setItem("mockUserData", JSON.stringify(MOCK_USERS[email]))

        return mockUser
      }
      throw new Error("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  const register = async (email, password, name) => {
    setLoading(true)

    try {
      // Create a new mock user
      const mockUser = {
        uid: `user_${Date.now()}`,
        email,
      }

      const mockUserData = {
        uid: mockUser.uid,
        email,
        name,
        role: "user",
        createdAt: new Date().toISOString(),
      }

      setUser(mockUser)
      setUserData(mockUserData)

      // Store in localStorage for persistence
      localStorage.setItem("mockUser", JSON.stringify(mockUser))
      localStorage.setItem("mockUserData", JSON.stringify(mockUserData))

      return { user: mockUser }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setUser(null)
    setUserData(null)
    localStorage.removeItem("mockUser")
    localStorage.removeItem("mockUserData")
  }

  // Check for stored user on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("mockUser")
      const storedUserData = localStorage.getItem("mockUserData")

      if (storedUser && storedUserData) {
        setUser(JSON.parse(storedUser))
        setUserData(JSON.parse(storedUserData))
      }
    } catch (error) {
      console.error("Error restoring auth state:", error)
    }
  }, [])

  const value = {
    user,
    userData,
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
