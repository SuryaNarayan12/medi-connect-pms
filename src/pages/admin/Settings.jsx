import React, { useState } from "react";
import { User, Mail, Phone, Lock, Bell, Moon } from "lucide-react";

function Settings() {
  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@mediconnect.com",
    phone: "+91 9876543210",
    password: "",
    confirmPassword: "",
    notifications: true,
    darkMode: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle save
  const handleSave = (e) => {
    e.preventDefault();
    alert("✅ Settings saved successfully!");
    console.log("Saved settings:", formData);
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Page Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
        ⚙️ Settings
      </h2>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Settings */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 border-b pb-2">
            <User size={20} className="text-blue-600" />
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <Mail size={18} className="text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Phone</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <Phone size={18} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full py-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 border-b pb-2">
            <Lock size={20} className="text-blue-600" />
            Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 border-b pb-2">
            <Bell size={20} className="text-blue-600" />
            Preferences
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Enable Notifications
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="darkMode"
                checked={formData.darkMode}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <Moon size={18} className="text-gray-600" />
              Dark Mode
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center md:justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full md:w-auto"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
