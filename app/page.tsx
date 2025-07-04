"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, BookOpen, Search, GraduationCap } from "lucide-react"

export default function HomePage() {
  const [displayedText, setDisplayedText] = useState("")
  const [showSubtext, setShowSubtext] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [mounted, setMounted] = useState(false)

  const fullText = "Welcome to CVGPraySing"
  const typewriterSpeed = 100

  // Ensure component is mounted before running effects
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let currentIndex = 0
    let typewriterInterval: NodeJS.Timeout

    const startTypewriter = () => {
      typewriterInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typewriterInterval)
          setTimeout(() => setShowSubtext(true), 500)
          setTimeout(() => setShowButtons(true), 1000)
        }
      }, typewriterSpeed)
    }

    startTypewriter()

    return () => {
      if (typewriterInterval) {
        clearInterval(typewriterInterval)
      }
    }
  }, [mounted, fullText])

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-yellow-500 text-white min-h-[70vh] flex items-center">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to CVGPraySing</h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Your premier destination for professional music education, composition, and artistic development.
            </p>
          </div>
        </section>
      </div>
    )
  }

  const services = [
    {
      title: "Music Composition",
      description: "Professional music composition services for all occasions.",
      icon: Music,
      delay: "0ms",
    },
    {
      title: "Music Foundation",
      description: "Comprehensive music theory education for beginners.",
      icon: BookOpen,
      delay: "200ms",
    },
    {
      title: "Music Auditing",
      description: "Expert analysis and feedback on performances.",
      icon: Search,
      delay: "400ms",
    },
    {
      title: "Music Teaching",
      description: "Structured music instruction for all levels.",
      icon: GraduationCap,
      delay: "600ms",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-yellow-500 text-white min-h-[70vh] flex items-center">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 min-h-[4rem] md:min-h-[6rem] flex items-center justify-center">
            <span className="inline-block">
              {displayedText}
              <span className="animate-pulse text-yellow-300">|</span>
            </span>
          </h1>

          <div
            className={`transition-all duration-1000 transform ${
              showSubtext ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Your premier destination for professional music education, composition, and artistic development.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 transform ${
              showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <a href="/services">Explore Services</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <a href="/about">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Music Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Comprehensive music education and professional services designed to nurture your musical journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-blue-600 to-yellow-500">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-yellow-500 text-white mt-auto">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Begin Your Musical Journey?</h2>
          <p className="mb-8 max-w-3xl mx-auto text-lg">
            Join our community of passionate musicians and take your skills to the next level.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <a href="/register">Get Started Today</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
