export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold">CVGPraySing</span>
            </div>
            <p className="text-gray-400 mb-6">
              Professional music portfolio and learning platform offering comprehensive music education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Contact", "FAQs"].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link === "Home" ? "" : link.toLowerCase()}`}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>
                <strong className="text-white">Email:</strong> miggs63@yahoo.com
              </p>
              <p>
                <strong className="text-white">Phone:</strong> 0718601582
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 CVGPraySing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
