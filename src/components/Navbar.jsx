import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHeartbeat,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(true);

  // Simulated logged-in state — later replace with Redux/Auth
  const [isLoggedIn] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md px-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaHeartbeat className="text-white text-2xl animate-pulse" />
            <span className="text-xl md:text-2xl font-bold text-white tracking-wide">
              MediConnect
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/find-doctors">Find Doctors</NavLink>
            <NavLink to="/book-appointment">Book Appointment</NavLink>
            <NavLink to="/appointments">My Appointments</NavLink>

            {isLoggedIn ? (
              <>
                <button className="relative text-white hover:text-yellow-300 transition duration-300">
                  <FaBell size={20} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full shadow-md">
                    3
                  </span>
                </button>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md transition duration-300 border border-white/20"
                >
                  <FaUserCircle size={18} />
                  <span>Profile</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md transition duration-300 border border-white/20"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition duration-300 shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800/95 backdrop-blur-md border-t border-white/10 animate-slideDown">
          <div className="px-4 py-4 space-y-2">
            <MobileNavLink to="/" setMobileMenuOpen={setMobileMenuOpen}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/find-doctors" setMobileMenuOpen={setMobileMenuOpen}>
              Find Doctors
            </MobileNavLink>
            <MobileNavLink to="/book-appointment" setMobileMenuOpen={setMobileMenuOpen}>
              Book Appointment
            </MobileNavLink>
            <MobileNavLink to="/appointments" setMobileMenuOpen={setMobileMenuOpen}>
              My Appointments
            </MobileNavLink>

            {isLoggedIn ? (
              <>
                <button className="flex items-center gap-2 text-white hover:bg-blue-700 rounded-md px-3 py-2 transition duration-300">
                  <FaBell size={18} />
                  <span>Notifications (3)</span>
                </button>
                <MobileNavLink to="/profile" setMobileMenuOpen={setMobileMenuOpen}>
                  Profile
                </MobileNavLink>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" setMobileMenuOpen={setMobileMenuOpen}>
                  Login
                </MobileNavLink>
                <Link
                  to="/register"
                  className="block bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md transition duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/* Reusable desktop link */
function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-white hover:text-yellow-300 transition duration-300 font-medium"
    >
      {children}
    </Link>
  );
}

/* Reusable mobile link */
function MobileNavLink({ to, setMobileMenuOpen, children }) {
  return (
    <Link
      to={to}
      className="block text-white hover:bg-blue-700 rounded-md px-3 py-2 transition duration-300"
      onClick={() => setMobileMenuOpen(false)}
    >
      {children}
    </Link>
  );
}
