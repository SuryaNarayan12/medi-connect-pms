import React, { useState, useEffect } from "react";
import {
  FaUserMd,
  FaMapMarkerAlt,
  FaStar,
  FaPhone,
  FaFilter,
  FaSearch,
  FaGraduationCap,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function FindDoctors() {
  // ✅ Get doctors from Redux
  const doctorsFromStore = useSelector((state) => state.doctors.doctors);

  // ✅ Dummy doctors fallback
  const dummyDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      reviews: 120,
      education: "MD, Harvard Medical School",
      experience: "12 years",
      location: "Downtown",
      phone: "+91 9876543210",
      consultationFee: "₹1000",
      availableToday: true,
      nextAvailable: "Today, 3:00 PM",
    },
    {
      id: 2,
      name: "Dr. Rajesh Patel",
      specialty: "Dermatology",
      rating: 4.7,
      reviews: 90,
      education: "MD, AIIMS Delhi",
      experience: "8 years",
      location: "Midtown",
      phone: "+91 9123456780",
      consultationFee: "₹800",
      availableToday: false,
      nextAvailable: "Tomorrow, 11:00 AM",
    },
    {
      id: 3,
      name: "Dr. Emily Carter",
      specialty: "Pediatrics",
      rating: 4.8,
      reviews: 150,
      education: "MD, Stanford University",
      experience: "10 years",
      location: "Uptown",
      phone: "+91 9988776655",
      consultationFee: "₹700",
      availableToday: true,
      nextAvailable: "Today, 5:30 PM",
    },
    {
      id: 4,
      name: "Dr. Amit Sharma",
      specialty: "Orthopedics",
      rating: 4.6,
      reviews: 110,
      education: "MS, KGMU Lucknow",
      experience: "15 years",
      location: "Central",
      phone: "+91 9090909090",
      consultationFee: "₹1200",
      availableToday: false,
      nextAvailable: "Tomorrow, 9:30 AM",
    },
  ];

  // ✅ Use Redux doctors if available, otherwise dummy
  const doctors = doctorsFromStore.length > 0 ? doctorsFromStore : dummyDoctors;

  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [filters, setFilters] = useState({
    specialty: "",
    location: "",
    availableToday: false,
    minRating: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const specialties = [
    "All",
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Pediatrics",
    "Gynecology",
    "Neurology",
    "General Medicine",
  ];
  const locations = ["All", "Downtown", "Midtown", "Uptown", "Central", "Eastside", "Westside"];

  // ✅ Filtering doctors
  const applyFilters = () => {
    let filtered = doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialty =
        !filters.specialty || filters.specialty === "All" || doctor.specialty === filters.specialty;

      const matchesLocation =
        !filters.location || filters.location === "All" || doctor.location.includes(filters.location);

      const matchesAvailability = !filters.availableToday || doctor.availableToday;

      const matchesRating = doctor.rating >= filters.minRating;

      return (
        matchesSearch &&
        matchesSpecialty &&
        matchesLocation &&
        matchesAvailability &&
        matchesRating
      );
    });

    setFilteredDoctors(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, doctors]); // ✅ re-run when doctors update

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} text-sm`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserMd className="text-primary text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
          <p className="text-xl text-gray-600">Connect with trusted healthcare professionals</p>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaFilter className="inline mr-1" />
                Specialty
              </label>
              <select
                value={filters.specialty}
                onChange={(e) => handleFilterChange("specialty", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty === "All" ? "" : specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline mr-1" />
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {locations.map((location) => (
                  <option key={location} value={location === "All" ? "" : location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaStar className="inline mr-1" />
                Minimum Rating
              </label>
              <select
                value={filters.minRating}
                onChange={(e) => handleFilterChange("minRating", parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.8}>4.8+ Stars</option>
              </select>
            </div>

            {/* Available Today */}
            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.availableToday}
                  onChange={(e) => handleFilterChange("availableToday", e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">Available Today</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserMd className="text-gray-400 text-3xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No doctors found</h2>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <div className="p-6">
                  {/* Doctor Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <FaUserMd className="text-gray-500 text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-primary font-medium">{doctor.specialty}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center space-x-1 mr-2">{renderStars(doctor.rating)}</div>
                    <span className="text-sm text-gray-600">
                      {doctor.rating} ({doctor.reviews} reviews)
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaGraduationCap className="mr-2 text-primary" />
                      <span>{doctor.education}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="mr-2 text-primary" />
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-primary" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaPhone className="mr-2 text-primary" />
                      <span>{doctor.phone}</span>
                    </div>
                  </div>

                  {/* Fee + Availability */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Consultation Fee:</span>
                      <span className="text-lg font-semibold text-primary">{doctor.consultationFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Next Available:</span>
                      <span
                        className={`text-sm font-medium ${
                          doctor.availableToday ? "text-green-600" : "text-orange-600"
                        }`}
                      >
                        {doctor.nextAvailable}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/book-appointment?doctorId=${doctor.id}`}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg text-center transition duration-300"
                    >
                      Book Now
                    </Link>
                    <Link
                      to={`/viewdoc/${doctor.id}`}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg text-center transition duration-300"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FindDoctors;
