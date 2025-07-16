"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MessageCircle, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Ready to start your musical journey? We'd love to hear from you. Get in touch and let's make beautiful music
          together.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="music-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Send className="w-6 h-6 mr-3" />
              Send us a Message
            </CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Enter your last name"
                />
              </div>
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
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 min-h-[120px]"
                  placeholder="Tell us about your musical interests, questions, or how we can help you..."
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700">Thank you for your message! We'll get back to you within 24 hours.</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">
                    Sorry, there was an error sending your message. Please try again or contact us directly.
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="music-card">
            <CardHeader>
              <CardTitle className="text-2xl">Get in Touch</CardTitle>
              <CardDescription>Multiple ways to reach us for your convenience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-600 to-yellow-500">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">0718601582</p>
                  <p className="text-sm text-gray-500">Available during business hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-600 to-yellow-500">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">miggy63@yahoo.com</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-600 to-yellow-500">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">WhatsApp</h3>
                  <a
                    href="https://wa.me/254718601582"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-500 hover:text-yellow-600 font-medium"
                  >
                    Chat with us on WhatsApp
                  </a>
                  <p className="text-sm text-gray-500">Quick responses during business hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-600 to-yellow-500">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visit Us</h3>
                  <p className="text-gray-600">
                    123 Harmony Street
                    <br />
                    Music District, Lagos, Nigeria
                  </p>
                  <a href="/location" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View location details →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="music-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span className="text-gray-600">2:00 PM - 5:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="music-card bg-gradient-to-r from-blue-600 to-yellow-500 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">Ready to Start Learning?</h3>
              <p className="mb-4">Join our community of music learners and discover your musical potential.</p>
              <Button asChild className="bg-white text-purple-600 hover:bg-gray-100">
                <a href="/register">Register Now</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
