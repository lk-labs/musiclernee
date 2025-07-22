import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, BookOpen, Search, GraduationCap, Users, Heart, Award, Mic } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive music services designed to nurture talent, inspire creativity, and build musical excellence
        </p>
      </section>

      {/* Services Grid */}
      <div className="grid gap-12">
        {/* Music Composition */}
        <Card className="music-card overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="h-64 md:h-auto flex items-center justify-center bg-gradient-to-r from-blue-600 to-yellow-500">
              <Music className="w-24 h-24 text-white" />
            </div>
            <div className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-3xl mb-4">🎼 Music Composition</CardTitle>
                <CardDescription className="text-lg">
                  Creating original gospel and inspirational music that touches hearts and lifts spirits
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Original gospel and inspirational music compositions</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Custom compositions for weddings, worship services, and special events</span>
                  </li>
                  <li className="flex items-start">
                    <Mic className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Collaboration opportunities with churches, choirs, and individual artists</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 text-white"
                >
                  <Link href="/contact">Request Composition</Link>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* Music Foundation */}
        <Card className="music-card overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="md:order-2 h-64 md:h-auto flex items-center justify-center bg-gradient-to-r from-blue-600 to-yellow-500">
              <BookOpen className="w-24 h-24 text-white" />
            </div>
            <div className="md:order-1 p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-3xl mb-4">🎹 Music Foundation</CardTitle>
                <CardDescription className="text-lg">
                  Building strong musical fundamentals for beginners of all ages
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <BookOpen className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Beginner-level training on music theory and notation</span>
                  </li>
                  <li className="flex items-start">
                    <Music className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Introduction to rhythm, melody, harmony, and musical structure</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Perfect for children, teens, and adults starting their musical journey</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 text-white"
                >
                  <Link href="/register">Start Learning</Link>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* Music Auditing */}
        <Card className="music-card overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="h-64 md:h-auto flex items-center justify-center bg-gradient-to-r from-blue-600 to-yellow-500">
              <Search className="w-24 h-24 text-white" />
            </div>
            <div className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-3xl mb-4">🧾 Music Auditing</CardTitle>
                <CardDescription className="text-lg">
                  Professional evaluation and constructive feedback for musical improvement
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Search className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive evaluation of choir performances and solo artists</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Constructive feedback on musical structure, tone, and arrangement</span>
                  </li>
                  <li className="flex items-start">
                    <GraduationCap className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Guidance to help artists refine their sound and improve quality</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 text-white"
                >
                  <Link href="/contact">Schedule Audit</Link>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* Music Teaching */}
        <Card className="music-card overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="md:order-2 h-64 md:h-auto flex items-center justify-center bg-gradient-to-r from-blue-600 to-yellow-500">
              <GraduationCap className="w-24 h-24 text-white" />
            </div>
            <div className="md:order-1 p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-3xl mb-4">🎓 Music Teaching</CardTitle>
                <CardDescription className="text-lg">
                  Structured learning programs that guide students from beginner to advanced levels
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <GraduationCap className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Structured programs for voice, piano, and other instruments</span>
                  </li>
                  <li className="flex items-start">
                    <BookOpen className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Downloadable notes, video tutorials, and practice exercises</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Progressive curriculum from beginner to advanced levels</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 text-white"
                >
                  <Link href="/register">Access Materials</Link>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>

      {/* Call to Action */}
      <section className="mt-16 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Whether you're looking to learn, create, or improve your musical skills, we're here to guide you on your
          journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact">Get In Touch</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            <Link href="/register">Join Our Community</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
