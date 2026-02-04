import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addAppointment } from "../features/appointments/appointmentSlice"; // ✅ correct path

function BookAppointment() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    doctor: "",
    specialty: "",
    reason: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const specialties = [
    "General Medicine",
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "Gynecology",
    "Neurology",
    "Psychiatry",
    "Radiology",
    "Emergency Medicine",
  ];

  const timeSlots = [
    "09:00 AM","09:30 AM","10:00 AM","10:30 AM",
    "11:00 AM","11:30 AM","12:00 PM","12:30 PM",
    "02:00 PM","02:30 PM","03:00 PM","03:30 PM",
    "04:00 PM","04:30 PM","05:00 PM","05:30 PM",
  ];

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // ✅ Validate Form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientName) newErrors.patientName = "Patient name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.specialty) newErrors.specialty = "Specialty is required";
    if (!formData.reason) newErrors.reason = "Reason for visit is required";

    if (formData.date && new Date(formData.date) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.date = "Please select a future date";
    }

    return newErrors;
  };

  // ✅ Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      const newAppointment = {
        id: Date.now(),
        patient: formData.patientName,
        doctor: formData.doctor || "Any Available Doctor",
        date: formData.date,
        time: formData.time,
        specialty: formData.specialty,
        reason: formData.reason,
        address: formData.address,
      };

      dispatch(addAppointment(newAppointment));
      setMessage("Appointment booked successfully!");

      // Reset
      setFormData({
        patientName: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        doctor: "",
        specialty: "",
        reason: "",
        address: "",
      });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaCalendarAlt className="text-primary text-2xl sm:text-3xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Book an Appointment
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Schedule your visit with our healthcare professionals
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Patient Info */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Patient Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="inline mr-2" /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter patient name"
                  />
                  {errors.patientName && <p className="text-sm text-red-600 mt-1">{errors.patientName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2" /> Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter email"
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaPhone className="inline mr-2" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="inline mr-2" /> Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Appointment Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Specialty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUserMd className="inline mr-2" /> Specialty *
                  </label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a specialty</option>
                    {specialties.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.specialty && <p className="text-sm text-red-600 mt-1">{errors.specialty}</p>}
                </div>

                {/* Doctor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUserMd className="inline mr-2" /> Preferred Doctor (Optional)
                  </label>
                  <input
                    type="text"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter doctor name"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCalendarAlt className="inline mr-2" /> Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  {errors.date && <p className="text-sm text-red-600 mt-1">{errors.date}</p>}
                </div>

                {/* Time Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaClock className="inline mr-2" /> Preferred Time *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg flex justify-between items-center focus:ring-2 focus:ring-primary"
                  >
                    {formData.time || "Select a time"}
                    <span className="ml-2">⌄</span>
                  </button>
                  {showTimeDropdown && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-3 max-h-60 overflow-y-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, time: t });
                              setShowTimeDropdown(false);
                            }}
                            className={`px-3 py-2 rounded-lg border text-sm transition ${
                              formData.time === t
                                ? "bg-primary text-white border-primary"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {errors.time && <p className="text-sm text-red-600 mt-1">{errors.time}</p>}
                </div>
              </div>

              {/* Reason */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit *
                </label>
                <textarea
                  name="reason"
                  rows={4}
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Please describe your symptoms..."
                />
                {errors.reason && <p className="text-sm text-red-600 mt-1">{errors.reason}</p>}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 sm:py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105"
              >
                <FaCalendarAlt className="inline mr-2" /> Book Appointment
              </button>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`mt-4 p-3 sm:p-4 rounded-lg text-center font-medium ${
                  message.includes("successfully")
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 sm:mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Important Information
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Please arrive 15 minutes before your appointment</li>
            <li>• Bring a valid ID and insurance card</li>
            <li>• Confirmation email & SMS will be sent</li>
            <li>• Cancellations must be made at least 24 hours in advance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
