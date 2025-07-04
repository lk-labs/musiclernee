import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music2, Heart, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About CVGPraySing</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the passion, vision, and inspiration behind our musical ministry
        </p>
      </section>

      {/* Founder Bio */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-full h-96 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Music2 className="w-24 h-24 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Meet the Founder</h2>
            <p className="text-gray-600 mb-4">
              CVGPraySing was born from a deep passion for music and a calling to serve through song. With over a decade
              of experience in gospel music, composition, and teaching, our founder has dedicated their life to
              nurturing musical talent in individuals and communities.
            </p>
            <p className="text-gray-600 mb-4">
              The journey began in childhood, surrounded by the rich sounds of church music and family harmonies. This
              early exposure to the power of music in worship and community building shaped a lifelong commitment to
              musical excellence and spiritual expression.
            </p>
            <p className="text-gray-600">
              Today, CVGPraySing continues this legacy by providing comprehensive music education, creating original
              compositions, and helping others discover their own musical gifts.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="music-card">
            <CardHeader>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-blue-600 to-yellow-500">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                To create a world where music serves as a bridge between hearts, cultures, and communities, fostering
                understanding, healing, and spiritual growth through the universal language of song.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="music-card">
            <CardHeader>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-blue-600 to-yellow-500">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                To nurture musical talent through comprehensive education, create inspiring original compositions, and
                provide professional guidance that empowers individuals and communities to express their faith and
                creativity through music.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center music-card">
            <CardHeader>
              <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <CardTitle>Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We strive for the highest standards in musical education, composition, and performance, believing that
                excellence honors both our craft and our calling.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center music-card">
            <CardHeader>
              <Heart className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <CardTitle>Compassion</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Every student, client, and community member is treated with kindness, patience, and understanding as
                they embark on their musical journey.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center music-card">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We believe in the power of music to bring people together, creating lasting bonds and shared experiences
                that transcend individual differences.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Inspiration */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">The Inspiration Behind CVGPraySing</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 mb-6 text-lg">
            The name "CVGPraySing" reflects our core belief that music is a form of prayer and praise. Each note, each
            harmony, each carefully crafted composition is an offering of gratitude and a celebration of the divine gift
            of music.
          </p>
          <p className="text-gray-600 mb-6 text-lg">
            Our inspiration comes from witnessing the transformative power of music in people's lives. We've seen shy
            children find their voice, adults discover hidden talents, and communities come together in harmony. These
            moments fuel our passion and drive our commitment to musical excellence.
          </p>
          <p className="text-gray-600 text-lg">
            Through CVGPraySing, we aim to continue this tradition of musical ministry, helping others discover not just
            how to make music, but how to make music that matters – music that heals, inspires, and brings glory to the
            Creator of all beautiful sounds.
          </p>
        </div>
        <div className="text-center mt-8">
          <Link href="/contact">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 text-white px-6 py-3 rounded-md"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
