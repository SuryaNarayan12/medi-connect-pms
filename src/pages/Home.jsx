import React from "react"
import { Link } from "react-router-dom"
import {
  FaCalendarAlt,
  FaUserMd,
  FaShieldAlt,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa"
import heroImage from "../assets/hero-image.jpg"

function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Main Content Wrapper */}
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Your Health, Our
                <span className="text-accent block">Priority</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-lg">
                Connect with trusted healthcare professionals and manage your
                appointments seamlessly. Experience healthcare like never
                before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                >
                  <FaCalendarAlt className="mr-2" />
                  Book Appointment
                </Link>
                <Link
                  to="/find-doctors"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 transition duration-300"
                >
                  <FaUserMd className="mr-2" />
                  Find Doctors
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src={heroImage}
                alt="Medical professionals caring for patients"
                className="w-full h-[450px] md:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary">50+</div>
                <p className="text-gray-600">Expert Doctors</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">1000+</div>
                <p className="text-gray-600">Happy Patients</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">24/7</div>
                <p className="text-gray-600">Support Available</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">15+</div>
                <p className="text-gray-600">Specialties</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why Choose MediConnect?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                We're revolutionizing healthcare with innovative solutions
                designed around your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <FaCalendarAlt className="text-primary text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Easy Booking
                </h3>
                <p className="text-gray-600">
                  Book appointments with your preferred doctors in just a few
                  clicks. No waiting, no hassle - just seamless healthcare
                  scheduling.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <FaShieldAlt className="text-accent text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Trusted Doctors
                </h3>
                <p className="text-gray-600">
                  Connect with certified healthcare professionals from multiple
                  specialties. All our doctors are verified and highly
                  experienced.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <FaHeartbeat className="text-secondary text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Smart Management
                </h3>
                <p className="text-gray-600">
                  Manage all your appointments, medical records, and health
                  information from one convenient dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our Services
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Comprehensive healthcare solutions tailored for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: FaUserMd,
                  title: "General Medicine",
                  desc: "Comprehensive primary care for all your health needs",
                },
                {
                  icon: FaHeartbeat,
                  title: "Cardiology",
                  desc: "Expert heart care and cardiovascular treatments",
                },
                {
                  icon: FaShieldAlt,
                  title: "Emergency Care",
                  desc: "24/7 emergency medical services and urgent care",
                },
                {
                  icon: FaMapMarkerAlt,
                  title: "Home Visits",
                  desc: "Convenient healthcare services at your doorstep",
                },
                {
                  icon: FaClock,
                  title: "Telemedicine",
                  desc: "Virtual consultations with healthcare professionals",
                },
                {
                  icon: FaCalendarAlt,
                  title: "Health Checkups",
                  desc: "Regular health screenings and preventive care",
                },
              ].map((service, index) => {
                const IconComponent = service.icon
                return (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition duration-300"
                  >
                    <IconComponent className="text-primary text-3xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to take control of your health?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of patients who trust MediConnect for their
              healthcare needs. Sign up now and experience the future of
              healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                to="/find-doctors"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 transition duration-300"
              >
                Browse Doctors
              </Link>
            </div>
          </div>
        </section>
      </div>

     {/* Footer Section */}
<footer className="bg-gray-900 text-white py-12 mt-10">
  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">
    {/* Brand Info */}
    <div>
      <h3 className="text-2xl font-bold mb-4">MediConnect</h3>
      <p className="text-gray-400">
        Your trusted partner in healthcare. Seamlessly book appointments and
        connect with certified doctors anytime, anywhere.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-gray-400">
        <li>
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/find-doctors" className="hover:text-white transition">
            Find Doctors
          </Link>
        </li>
        <li>
          <Link to="/book-appointment" className="hover:text-white transition">
            Book Appointment
          </Link>
        </li>
        <li>
          <Link to="/appointments" className="hover:text-white transition">
            My Appointments
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-white transition">
            My Profile
          </Link>
        </li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h4 className="text-xl font-semibold mb-4">Resources</h4>
      <ul className="space-y-2 text-gray-400">
        <li>
          <Link to="/about" className="hover:text-white transition">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/blog" className="hover:text-white transition">
            Health Blog
          </Link>
        </li>
        <li>
          <Link to="/faq" className="hover:text-white transition">
            FAQs
          </Link>
        </li>
        <li>
          <Link to="/support" className="hover:text-white transition">
            Customer Support
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-white transition">
            Contact Us
          </Link>
        </li>
      </ul>
    </div>

    {/* Legal & Social */}
    <div>
      <h4 className="text-xl font-semibold mb-4">Legal & Connect</h4>
      <ul className="space-y-2 text-gray-400 mb-4">
        <li>
          <Link to="/privacy-policy" className="hover:text-white transition">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link to="/terms" className="hover:text-white transition">
            Terms & Conditions
          </Link>
        </li>
        <li>
          <Link to="/cookies" className="hover:text-white transition">
            Cookie Policy
          </Link>
        </li>
      </ul>

      {/* Social Media */}
      <div className="flex space-x-4">
        <a href="#" className="hover:text-accent transition">
          <FaFacebookF />
        </a>
        <a href="#" className="hover:text-accent transition">
          <FaTwitter />
        </a>
        <a href="#" className="hover:text-accent transition">
          <FaInstagram />
        </a>
        <a href="#" className="hover:text-accent transition">
          <FaLinkedin />
        </a>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm">
    © {new Date().getFullYear()} MediConnect. All Rights Reserved.
  </div>
</footer>

    </div>
  )
}

export default Home
