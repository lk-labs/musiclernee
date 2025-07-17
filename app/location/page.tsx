import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Phone, Mail, Car, Bus } from "lucide-react"

export default function LocationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Visit Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find us easily and plan your visit to our music studio and learning center
        </p>
      </section>

      {/* Location Info */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Address & Contact */}
        <div className="space-y-6">
          <Card className="music-card">
            <CardHeader>
              <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Our Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">CVGPraySing Music Studio</h3>
                <p className="text-gray-600">
                  123 Harmony Street
                  <br />
                  Music District
                  <br />
                  city stadium
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">0718601582</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">miggs63@yahoo.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="music-card">
            <CardHeader>
              <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Operating Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> We're also available for special appointments outside regular hours. Please
                  contact us to schedule.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map */}
        <div>
          <Card className="music-card h-full">
            <CardHeader>
              <CardTitle className="text-2xl">Find Us on the Map</CardTitle>
              <CardDescription>Use the interactive map below to get directions to our studio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Interactive Map</p>
                  <p className="text-sm text-gray-400">
                    Google Maps integration would be embedded here
                    <br />
                    showing the exact location of CVGPraySing Studio
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://maps.google.com/?q=CVGPraySing+Music+Studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Open in Google Maps →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transportation */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Getting Here</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="music-card">
            <CardHeader>
              <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">By Car</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Free parking available on-site</li>
                <li>• Located 5 minutes from the main highway</li>
                <li>• Easy access from all major routes</li>
                <li>• GPS coordinates: 6.5244° N, 3.3792° E</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="music-card">
            <CardHeader>
              <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Public Transport</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Bus stop "Harmony Junction" - 2 minutes walk</li>
                <li>• Multiple bus routes: 12, 45, 67, 89</li>
                <li>• Nearest BRT station: Music District (10 min walk)</li>
                <li>• Taxi and ride-sharing services available</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Service Areas</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600 mb-8">
            While our main studio is located in Lagos, we serve clients across Nigeria and beyond through our online
            platform and mobile services.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">In-Person Services</h3>
              <p className="text-gray-600">Lagos Metropolitan Area</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Online Learning</h3>
              <p className="text-gray-600">Available Worldwide</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Mobile Services</h3>
              <p className="text-gray-600">Lagos State & Surrounding Areas</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
