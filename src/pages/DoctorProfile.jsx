import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DoctorProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  if (!doctor) {
    return (
      <div className="p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Doctor Profile</h1>
        <p className="text-red-500">No doctor data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Doctor Profile</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={doctor.image || "https://via.placeholder.com/150"}
            alt={doctor.name}
            className="rounded-full w-32 h-32 object-cover"
          />
        </div>

        {/* Profile Details */}
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Name:</span> {doctor.name}
          </p>
          <p>
            <span className="font-semibold">Specialization:</span>{" "}
            {doctor.specialization}
          </p>
          <p>
            <span className="font-semibold">Experience:</span>{" "}
            {doctor.experience || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Hospital:</span> {doctor.hospital}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {doctor.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {doctor.phone}
          </p>
          <p>
            <span className="font-semibold">Languages:</span>{" "}
            {doctor.languages?.join(", ") || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Consultation Fee:</span>{" "}
            {doctor.consultationFee?.inPerson &&
              `In-person: ₹${doctor.consultationFee.inPerson} `}
            {doctor.consultationFee?.online &&
              `| Online: ₹${doctor.consultationFee.online}`}
          </p>
        </div>
      </div>

      {/* About Section */}
      {doctor.bio && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-700">{doctor.bio}</p>
        </div>
      )}

      {/* Education Section */}
      {doctor.education && doctor.education.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {doctor.education.map((edu, idx) => (
              <li key={idx}>
                {edu.degree}, {edu.institute} ({edu.year})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Certifications */}
      {doctor.certifications && doctor.certifications.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Certifications</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {doctor.certifications.map((cert, idx) => (
              <li key={idx}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {doctor.achievements && doctor.achievements.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Achievements</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {doctor.achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default DoctorProfile;
