import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  MapPin,
  Star,
  Clock,
  MessageSquare,
  Award,
  Globe,
  BookOpen,
  GraduationCap,
  DollarSign,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ViewDoctorProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = useParams(); // get doctor id from URL
  const doctorsFromStore = useSelector((state) => state.doctors.doctors);

  // ✅ Dummy fallback doctors
  const dummyDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      experience: "12 years",
      location: "Mumbai, India",
      hospital: "Fortis Hospital",
      status: "Active",
      rating: 4.9,
      email: "sarah.johnson@example.com",
      phone: "+91 9876543210",
      dob: "1980-06-15",
      consultationFee: { inPerson: "₹1000", online: "₹700" },
      education: [
        { degree: "MBBS", institute: "AIIMS Delhi", year: 2005 },
        { degree: "MD (Cardiology)", institute: "Harvard Medical School", year: 2009 },
      ],
      certifications: ["American Heart Association Certified", "FACC"],
      achievements: ["Best Cardiologist Award 2019", "Published 20+ research papers"],
      languages: ["English", "Hindi", "Marathi"],
      bio: "Dr. Sarah Johnson is a highly experienced cardiologist with expertise in preventive cardiology and patient education.",
      image: "",
    },
    {
      id: 2,
      name: "Dr. Rajesh Patel",
      specialization: "Dermatology",
      experience: "8 years",
      location: "Ahmedabad, India",
      hospital: "Apollo Hospital",
      status: "Active",
      rating: 4.6,
      email: "rajesh.patel@example.com",
      phone: "+91 9123456780",
      dob: "1985-11-22",
      consultationFee: { inPerson: "₹800", online: "₹500" },
      education: [
        { degree: "MBBS", institute: "BJ Medical College", year: 2008 },
        { degree: "MD (Dermatology)", institute: "AIIMS Delhi", year: 2012 },
      ],
      certifications: ["Indian Association of Dermatologists"],
      achievements: ["Awarded Best Dermatologist 2020"],
      languages: ["English", "Gujarati", "Hindi"],
      bio: "Dr. Rajesh Patel is a dermatologist passionate about skin health, cosmetic dermatology, and holistic care.",
      image: "",
    },
  ];

  // ✅ Prefer Redux data, fallback to dummy doctors
  const doctors = doctorsFromStore.length > 0 ? doctorsFromStore : dummyDoctors;

  // find doctor by id
  const doctor = doctors.find((doc) => String(doc.id) === String(id));

  if (!doctor) {
    return (
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg text-center">
        <h2 className="text-xl font-bold text-red-500">Doctor not found</h2>
        <p className="text-gray-600 mt-2">
          Please go back and select a doctor from the list.
        </p>
      </div>
    );
  }

  const d = doctor;

  // Static demo data for appointments, reviews, availability
  const appointments = [
    { id: 1, patient: "Rahul Sharma", date: "2025-10-01", time: "10:30 AM", status: "Confirmed" },
    { id: 2, patient: "Priya Patel", date: "2025-10-02", time: "2:00 PM", status: "Pending" },
  ];

  const reviews = [
    { id: 1, patient: "Sujit Kumar", rating: 5, comment: "Excellent doctor, very patient and knowledgeable!" },
    { id: 2, patient: "Neha Gupta", rating: 4, comment: "Good consultation, explained everything clearly." },
  ];

  const availability = [
    { day: "Monday", time: "10:00 AM - 2:00 PM" },
    { day: "Wednesday", time: "4:00 PM - 7:00 PM" },
    { day: "Friday", time: "11:00 AM - 3:00 PM" },
  ];

  return (
    <div className="p-3 md:p-6 max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Doctor Image */}
        <div className="flex-shrink-0 flex justify-center">
          <img
            src={d.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&size=150`}
            alt={d.name}
            className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1 space-y-3 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2">
            <User size={20} className="text-blue-600" />
            {d.name}
          </h2>
          <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 text-sm md:text-base">
            <Briefcase size={16} className="text-gray-500" />
            {d.specialization} • {d.experience}
          </p>
          <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 text-sm md:text-base">
            <MapPin size={16} className="text-gray-500" />
            {d.location}
          </p>
          <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 text-sm md:text-base">
            <BookOpen size={16} className="text-gray-500" />
            {d.hospital}
          </p>

          {/* Status + Rating */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-2">
            <span
              className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                d.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {d.status}
            </span>
            <span className="flex items-center text-yellow-500 font-semibold text-sm md:text-base">
              <Star size={16} className="mr-1" /> {d.rating}/5
            </span>
          </div>

          {/* CTA Button */}
          <button className="w-full md:w-auto mt-3 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
            Book Appointment
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <div className="flex border-b overflow-x-auto no-scrollbar">
          {["overview", "appointments", "reviews", "availability"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm md:text-base font-medium capitalize whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mt-4 text-sm md:text-base">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-800">About Doctor</h3>
              <p className="text-gray-600 leading-relaxed">{d.bio}</p>

              {/* Extra Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <p className="flex items-center gap-2 text-gray-700">
                  <Calendar size={16} className="text-blue-600" /> DOB: {d.dob}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail size={16} className="text-blue-600" /> {d.email}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone size={16} className="text-blue-600" /> {d.phone}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <DollarSign size={16} className="text-blue-600" /> 
                  Fees: {d.consultationFee?.inPerson} (in-person), {d.consultationFee?.online} (online)
                </p>
              </div>

              {/* Education */}
              {d.education && (
                <div>
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2 mt-5">
                    <GraduationCap size={16} className="text-blue-600" /> Education
                  </h4>
                  <ul className="list-disc ml-5 mt-2 text-gray-600">
                    {d.education.map((edu, i) => (
                      <li key={i}>{edu.degree} – {edu.institute} ({edu.year})</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Certifications */}
              {d.certifications && (
                <div>
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2 mt-5">
                    <Award size={16} className="text-blue-600" /> Certifications
                  </h4>
                  <ul className="list-disc ml-5 mt-2 text-gray-600">
                    {d.certifications.map((cert, i) => (
                      <li key={i}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements */}
              {d.achievements && (
                <div>
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2 mt-5">
                    <Star size={16} className="text-blue-600" /> Achievements
                  </h4>
                  <ul className="list-disc ml-5 mt-2 text-gray-600">
                    {d.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {d.languages && (
                <div>
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2 mt-5">
                    <Globe size={16} className="text-blue-600" /> Languages Spoken
                  </h4>
                  <p className="text-gray-600">{d.languages.join(", ")}</p>
                </div>
              )}
            </div>
          )}

          {/* Appointments */}
          {activeTab === "appointments" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Upcoming Appointments</h3>
              {appointments.length === 0 ? (
                <p className="text-gray-500">No appointments scheduled.</p>
              ) : (
                <ul className="divide-y">
                  {appointments.map((appt) => (
                    <li key={appt.id} className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span>
                        {appt.patient} – {appt.date} at {appt.time}
                      </span>
                      <span
                        className={`text-xs md:text-sm px-3 py-1 rounded-full self-start sm:self-auto ${
                          appt.status === "Confirmed"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-600" /> Patient Reviews
              </h3>
              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-3 md:p-4 border rounded-lg bg-gray-50 shadow-sm">
                      <p className="font-semibold text-gray-700">{rev.patient}</p>
                      <p className="text-yellow-500 flex items-center gap-1">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={14} />
                        ))}
                      </p>
                      <p className="text-gray-600 mt-1">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Availability */}
          {activeTab === "availability" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Clock size={18} className="text-blue-600" /> Available Slots
              </h3>
              {availability.length === 0 ? (
                <p className="text-gray-500">No schedule available.</p>
              ) : (
                <ul className="space-y-2">
                  {availability.map((slot, index) => (
                    <li key={index} className="flex flex-col sm:flex-row sm:justify-between p-3 border rounded-md bg-gray-50">
                      <span className="font-medium">{slot.day}</span>
                      <span className="text-gray-600">{slot.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewDoctorProfile;
