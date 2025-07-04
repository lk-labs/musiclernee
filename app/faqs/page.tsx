import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageCircle } from "lucide-react"
import Link from "next/link"

// This would typically come from your database
const faqs = [
  {
    id: 1,
    question: "What age groups do you teach?",
    answer:
      "We welcome students of all ages, from children as young as 5 to adults. Our programs are tailored to different age groups and skill levels, ensuring everyone can learn at their own pace.",
  },
  {
    id: 2,
    question: "Do I need prior musical experience?",
    answer:
      "Not at all! Our Music Foundation program is specifically designed for complete beginners. We start with the basics of music theory, rhythm, and notation, building a solid foundation before moving to more advanced concepts.",
  },
  {
    id: 3,
    question: "What instruments do you teach?",
    answer:
      "We specialize in voice training and piano instruction, but also offer comprehensive music theory education that applies to various instruments. Our teaching materials cover fundamental concepts that benefit all musicians.",
  },
  {
    id: 4,
    question: "How are the online lessons conducted?",
    answer:
      "Our teaching materials are available through embedded video tutorials on our platform. Registered users can access these materials at their own pace, with downloadable notes and practice exercises to supplement their learning.",
  },
  {
    id: 5,
    question: "Do you offer custom compositions?",
    answer:
      "Yes! We create original gospel and inspirational music for weddings, worship services, and special events. We also collaborate with churches, choirs, and individual artists. Contact us to discuss your specific needs.",
  },
  {
    id: 6,
    question: "What is included in the Music Auditing service?",
    answer:
      "Our Music Auditing service provides comprehensive evaluation of choir performances or solo artists. We offer constructive feedback on musical structure, tone, arrangement, and overall performance quality to help artists refine their sound.",
  },
  {
    id: 7,
    question: "How do I access the teaching materials?",
    answer:
      "After registering and logging into your account, you'll have access to our library of video tutorials, downloadable notes, and practice exercises. Materials are organized by skill level and category for easy navigation.",
  },
  {
    id: 8,
    question: "Can I schedule in-person lessons?",
    answer:
      "Yes, we offer in-person lessons at our Lagos studio. Please contact us to schedule an appointment. We also provide mobile services within Lagos State and surrounding areas for special arrangements.",
  },
  {
    id: 9,
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including bank transfers, mobile money, and online payments. Specific payment details will be provided when you inquire about our services.",
  },
  {
    id: 10,
    question: "Do you provide certificates upon completion?",
    answer:
      "Yes, we provide certificates of completion for students who successfully finish our structured learning programs. These certificates acknowledge the skills and knowledge gained through our courses.",
  },
]

export default function FAQsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about our services, programs, and how we can help you on your musical
          journey.
        </p>
      </section>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* FAQ Accordion */}
        <div className="lg:col-span-2">
          <Card className="music-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <HelpCircle className="w-6 h-6 mr-3" />
                Common Questions
              </CardTitle>
              <CardDescription>Click on any question below to see the answer</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="music-card">
            <CardHeader>
              <CardTitle className="text-xl">Still Have Questions?</CardTitle>
              <CardDescription>Can't find what you're looking for? We're here to help!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Chat
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="music-card bg-gradient-to-r from-blue-600 to-yellow-500 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
              <p className="mb-4">Join our community and begin your musical journey today.</p>
              <Button asChild className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/register">Register Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="music-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/services" className="block text-yellow-500 hover:text-yellow-600">
                → View Our Services
              </Link>
              <Link href="/about" className="block text-yellow-500 hover:text-yellow-600">
                → About CVGPraySing
              </Link>
              <Link href="/location" className="block text-yellow-500 hover:text-yellow-600">
                → Visit Our Studio
              </Link>
              <Link href="/history" className="block text-yellow-500 hover:text-yellow-600">
                → Our History & Legacy
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
