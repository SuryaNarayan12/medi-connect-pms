import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  User,
  Users,
  Stethoscope,
  Calendar,
  Settings,
  Activity,
  Menu,
  X,
} from "lucide-react";

function AdminPanel() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Function to check active link
  const isActive = (path) => location.pathname.includes(path);

  // Dashboard overview cards (fake data for now)
  const dashboardStats = [
    { title: "Total Users", value: "1,245", icon: <Users size={24} />, color: "bg-blue-500" },
    { title: "Doctors", value: "87", icon: <Stethoscope size={24} />, color: "bg-green-500" },
    { title: "Appointments", value: "542", icon: <Calendar size={24} />, color: "bg-purple-500" },
    { title: "System Status", value: "Active", icon: <Activity size={24} />, color: "bg-pink-500" },
  ];

  // Check if we are on main dashboard (no sub-routes)
  const onDashboardRoot = location.pathname === "/admin";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-blue-700 text-white px-4 py-3 flex justify-between items-center shadow-md">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-blue-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">MediConnect Admin</h1>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4 md:space-x-6 relative">
          {/* Notifications */}
          <button className="relative hover:text-gray-200 transition">
            <Bell size={22} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-xs px-1 rounded-full">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 hover:bg-blue-600 px-2 md:px-3 py-1 rounded-md transition"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <User size={22} />
              <span className="hidden sm:inline font-medium">Admin</span>
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg overflow-hidden z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/admin/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 w-64 bg-blue-700 text-gray-200 p-6 transform transition-transform duration-300 z-40
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-100">Dashboard</h2>
          <nav className="flex flex-col space-y-2">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                location.pathname === "/admin"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Activity size={18} />
              Overview
            </Link>
            <Link
              to="users"
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive("users")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Users size={18} />
              Manage Users
            </Link>
            <Link
              to="doctors"
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive("doctors")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Stethoscope size={18} />
              Manage Doctors
            </Link>
            <Link
              to="appointments"
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive("appointments")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Calendar size={18} />
              Manage Appointments
            </Link>
            <Link
              to="settings"
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive("settings")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Settings size={18} />
              Settings
            </Link>
          </nav>
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 mt-14 md:mt-0">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            {onDashboardRoot ? (
              <>
                {/* Hero Section */}
                <div className="mb-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Welcome Back, Admin 👋
                  </h2>
                  <p className="text-gray-500 mt-2 text-sm md:text-base">
                    Here’s a quick overview of what’s happening today.
                  </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dashboardStats.map((stat, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-lg shadow-md text-white flex items-center justify-between ${stat.color}`}
                    >
                      <div>
                        <h3 className="text-base md:text-lg font-semibold">{stat.title}</h3>
                        <p className="text-xl md:text-2xl font-bold mt-2">{stat.value}</p>
                      </div>
                      {stat.icon}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
