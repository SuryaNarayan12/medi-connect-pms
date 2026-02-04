import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaUserMd, FaPhone, FaMapMarkerAlt, FaEdit, FaTrash, FaFilter } from "react-icons/fa";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "confirmed",
      reason: "Regular checkup",
      phone: "(555) 123-4567",
      location: "Main Hospital - Room 203"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      doctor: "Dr. Michael Brown",
      specialty: "Dermatology",
      date: "2024-01-16",
      time: "02:30 PM",
      status: "pending",
      reason: "Skin consultation",
      phone: "(555) 987-6543",
      location: "Clinic - Room 105"
    },
    {
      id: 3,
      patientName: "Robert Wilson",
      doctor: "Dr. Emily Davis",
      specialty: "Orthopedics",
      date: "2024-01-12",
      time: "09:15 AM",
      status: "completed",
      reason: "Knee pain",
      phone: "(555) 456-7890",
      location: "Orthopedic Center - Room 301"
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter = filter === "all" || appointment.status === filter;
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: "cancelled" } : apt
    ));
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCalendarAlt className="text-primary text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-xl text-gray-600">Manage and track your healthcare appointments</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["all", "confirmed", "pending", "completed", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                    filter === status
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex-1 md:max-w-md">
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Appointments Grid */}
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="text-gray-400 text-3xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No appointments found</h2>
            <p className="text-gray-600 mb-6">
              {filter === "all" ? "You don't have any appointments yet." : `No ${filter} appointments found.`}
            </p>
            <a
              href="/book"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition duration-300"
            >
              <FaCalendarAlt className="mr-2" />
              Book New Appointment
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => console.log("Edit appointment", appointment.id)}
                        className="text-blue-600 hover:text-blue-800 transition duration-300"
                        title="Edit appointment"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-800 transition duration-300"
                        title="Delete appointment"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{appointment.patientName}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaPhone className="mr-2" />
                      {appointment.phone}
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="mb-4">
                    <div className="flex items-center text-gray-800 mb-1">
                      <FaUserMd className="mr-2 text-primary" />
                      <span className="font-medium">{appointment.doctor}</span>
                    </div>
                    <div className="text-sm text-gray-600 ml-6">{appointment.specialty}</div>
                  </div>

                  {/* Date and Time */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center text-gray-800">
                      <FaCalendarAlt className="mr-2 text-primary" />
                      <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center text-gray-800">
                      <FaClock className="mr-2 text-primary" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaMapMarkerAlt className="mr-2" />
                      {appointment.location}
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Reason:</span> {appointment.reason}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {appointment.status === "confirmed" && (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg border border-red-200 transition duration-300"
                      >
                        Cancel
                      </button>
                    )}
                    {appointment.status === "pending" && (
                      <button
                        onClick={() => console.log("Reschedule", appointment.id)}
                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg border border-blue-200 transition duration-300"
                      >
                        Reschedule
                      </button>
                    )}
                    {appointment.status === "completed" && (
                      <button
                        onClick={() => console.log("Download report", appointment.id)}
                        className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg border border-green-200 transition duration-300"
                      >
                        View Report
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/book-appointment"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition duration-300"
            >
              <FaCalendarAlt className="mr-2" />
              Book New Appointment
            </a>
            <a
              href="/find-doctors"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition duration-300"
            >
              <FaUserMd className="mr-2" />
              Find Doctors
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAppointments;