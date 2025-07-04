"use client"

import { useState, useEffect } from "react"
import { Music } from "lucide-react"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
      localStorage.removeItem("user")
    }
  }, [mounted])

  const handleLogout = () => {
    try {
      localStorage.removeItem("user")
      setUser(null)
      window.location.href = "/"
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CVGPraySing</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-sm"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {mounted && user ? (
              <>
                <a
                  href={user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                  className="text-gray-700 hover:text-yellow-600 font-medium"
                >
                  Dashboard ({user.name})
                </a>
                <button onClick={handleLogout} className="text-gray-700 hover:text-yellow-600 font-medium">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <a
                  href="/register"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium px-4 py-2 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-sm"
                >
                  Register
                </a>
                <a
                  href="/login"
                  className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white font-medium px-4 py-2 rounded-md hover:from-blue-700 hover:to-yellow-600 transition-all duration-200 shadow-sm"
                >
                  Login
                </a>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-yellow-600 p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-yellow-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100">
                {mounted && user ? (
                  <>
                    <a
                      href={user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                      className="block text-gray-700 hover:text-yellow-600 font-medium mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard ({user.name})
                    </a>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="block text-gray-700 hover:text-yellow-600 font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <a
                      href="/register"
                      className="block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-md px-4 py-2 text-center hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </a>
                    <a
                      href="/login"
                      className="block bg-gradient-to-r from-blue-600 to-yellow-500 text-white font-medium rounded-md px-4 py-2 text-center hover:from-blue-700 hover:to-yellow-600 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
