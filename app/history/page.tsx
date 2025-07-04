import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Award, Users, Music, Heart, Star } from "lucide-react"

export default function HistoryPage() {
  const timeline = [
    {
      year: "2010",
      title: "The Beginning",
      description:
        "CVGPraySing was founded with a simple mission: to share the gift of music and nurture talent in our community.",
      icon: Music,
    },
    {
      year: "2012",
      title: "First Community Concert",
      description: "Organized our first community gospel concert, bringing together local choirs and solo artists.",
      icon: Users,
    },
    {
      year: "2015",
      title: "Teaching Program Launch",
      description: "Launched our structured music education program, starting with piano and voice lessons.",
      icon: Award,
    },
    {
      year: "2018",
      title: "Digital Expansion",
      description:
        "Began creating online learning materials and video tutorials to reach students beyond our local area.",
      icon: Star,
    },
    {
      year: "2020",
      title: "Virtual Learning Platform",
      description: "Adapted to the digital age by developing our comprehensive online learning platform.",
      icon: Heart,
    },
    {
      year: "2024",
      title: "CVGPraySing Website",
      description: "Launched our complete digital platform, bringing together all our services in one place.",
      icon: Calendar,
    },
  ]

  const achievements = [
    {
      title: "500+ Students Taught",
      description: "Over the years, we've had the privilege of teaching more than 500 students of all ages.",
      icon: Users,
    },
    {
      title: "50+ Original Compositions",
      description: "Created over 50 original gospel and inspirational pieces for various occasions.",
      icon: Music,
    },
    {
      title: "Community Recognition",
      description:
        "Received recognition from local churches and community organizations for our musical contributions.",
      icon: Award,
    },
    {
      title: "Multi-Generational Impact",
      description: "Teaching families across generations, creating lasting musical legacies.",
      icon: Heart,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our History & Legacy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A journey of faith, music, and community spanning over a decade of musical ministry
        </p>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <Card key={index} className="music-card">
              <div className="grid md:grid-cols-4 gap-6 p-6">
                <div className="text-center md:text-left">
                  <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{item.year}</div>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Family & Mentorship Legacy */}
      <section className="mb-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Family & Mentorship Legacy</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Generational Influence</h3>
            <p className="text-gray-600 mb-4">
              The roots of CVGPraySing run deep in family tradition. Music has been passed down through generations,
              with each family member contributing their unique gifts and perspectives to our musical heritage.
            </p>
            <p className="text-gray-600">
              From grandparents who sang in church choirs to parents who played instruments, the foundation of our
              musical calling was built on the shoulders of those who came before us.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Mentorship Circle</h3>
            <p className="text-gray-600 mb-4">
              Throughout our journey, we've been blessed with mentors who shaped our understanding of music as ministry.
              These relationships taught us that music education is not just about technique, but about character,
              faith, and service.
            </p>
            <p className="text-gray-600">
              Today, we continue this tradition by mentoring the next generation of musicians, ensuring that the legacy
              of musical excellence and spiritual devotion continues.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements & Milestones */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Achievements & Milestones</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="music-card text-center">
              <CardHeader>
                <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{achievement.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Legacy Statement */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Continuing Legacy</h2>
        <p className="text-xl mb-8 max-w-4xl mx-auto">
          As we look to the future, we remain committed to our founding principles: excellence in music education,
          authentic worship through song, and building community through shared musical experiences. Our legacy is not
          just in the songs we've written or the students we've taught, but in the lives we've touched and the hearts
          we've inspired to sing.
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Heart className="w-6 h-6" />
          <span className="text-lg font-semibold">Music • Faith • Community • Legacy</span>
          <Heart className="w-6 h-6" />
        </div>
      </section>
    </div>
  )
}
