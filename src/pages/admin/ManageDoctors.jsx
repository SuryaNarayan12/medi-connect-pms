import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    address: "",
    degree: "",
    experience: "",
    hospital: "",
    status: "Active",
    rating: 4.5,
    dob: "",
    consultationFee: { inPerson: "", online: "" },
    languages: "",
    education: "",
    certifications: "",
    achievements: "",
    bio: "",
    image: "",
  });

  const navigate = useNavigate();

  // Handle input changes (nested for consultationFee)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("consultationFee.")) {
      const feeType = name.split(".")[1];
      setNewDoctor((prev) => ({
        ...prev,
        consultationFee: { ...prev.consultationFee, [feeType]: value },
      }));
    } else {
      setNewDoctor({ ...newDoctor, [name]: value });
    }
  };

  // Add doctor
  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialization) {
      alert("Name and Specialization are required!");
      return;
    }

    const newEntry = {
      id: doctors.length + 1,
      ...newDoctor,
      education: newDoctor.education
        ? newDoctor.education.split(";").map((edu) => {
            const [degree, institute, year] = edu.split(",");
            return { degree, institute, year };
          })
        : [],
      certifications: newDoctor.certifications
        ? newDoctor.certifications.split(";")
        : [],
      achievements: newDoctor.achievements
        ? newDoctor.achievements.split(";")
        : [],
      languages: newDoctor.languages
        ? newDoctor.languages.split(",")
        : [],
    };

    setDoctors([...doctors, newEntry]);

    // Reset form
    setNewDoctor({
      name: "",
      specialization: "",
      phone: "",
      email: "",
      address: "",
      degree: "",
      experience: "",
      hospital: "",
      status: "Active",
      rating: 4.5,
      dob: "",
      consultationFee: { inPerson: "", online: "" },
      languages: "",
      education: "",
      certifications: "",
      achievements: "",
      bio: "",
      image: "",
    });
  };

  // Delete doctor
  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter((doc) => doc.id !== id));
  };

  // View profile
  const handleViewProfile = (doctor) => {
    navigate(`/doctor/${doctor.id}`, { state: { doctor } });
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Doctors</h2>

      {/* Add Doctor Form */}
      <form
        onSubmit={handleAddDoctor}
        className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-8 space-y-4"
      >
        <h3 className="text-lg font-semibold">Add New Doctor</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={newDoctor.name}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={newDoctor.specialization}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="degree"
            placeholder="Degree (MBBS, MD, etc.)"
            value={newDoctor.degree}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g., 12 years)"
            value={newDoctor.experience}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="hospital"
            placeholder="Hospital"
            value={newDoctor.hospital}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="date"
            name="dob"
            value={newDoctor.dob}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newDoctor.address}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={newDoctor.phone}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="doctor@email.com"
            value={newDoctor.email}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="consultationFee.inPerson"
            placeholder="In-Person Fee"
            value={newDoctor.consultationFee.inPerson}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="consultationFee.online"
            placeholder="Online Fee"
            value={newDoctor.consultationFee.online}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="languages"
            placeholder="Languages (comma separated)"
            value={newDoctor.languages}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
        </div>

        <textarea
          name="bio"
          placeholder="Doctor Bio"
          value={newDoctor.bio}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 w-full"
        />

        <input
          type="text"
          name="education"
          placeholder="Education (degree,institute,year;... )"
          value={newDoctor.education}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <input
          type="text"
          name="certifications"
          placeholder="Certifications (; separated)"
          value={newDoctor.certifications}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <input
          type="text"
          name="achievements"
          placeholder="Achievements (; separated)"
          value={newDoctor.achievements}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newDoctor.image}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 w-full"
        />

        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Doctor
        </button>
      </form>

      {/* Doctors List */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="hidden md:table w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Specialization</th>
              <th className="px-4 py-2 border">Hospital</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500"
                >
                  No doctors added yet.
                </td>
              </tr>
            ) : (
              doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{doc.id}</td>
                  <td className="px-4 py-2 border">{doc.name}</td>
                  <td className="px-4 py-2 border">{doc.specialization}</td>
                  <td className="px-4 py-2 border">{doc.hospital}</td>
                  <td className="px-4 py-2 border">{doc.phone}</td>
                  <td className="px-4 py-2 border">{doc.email}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleViewProfile(doc)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doc.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4 p-4">
          {doctors.length === 0 ? (
            <p className="text-center text-gray-500">
              No doctors added yet.
            </p>
          ) : (
            doctors.map((doc) => (
              <div
                key={doc.id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-2"
              >
                <p>
                  <span className="font-semibold">Name:</span> {doc.name}
                </p>
                <p>
                  <span className="font-semibold">Specialization:</span>{" "}
                  {doc.specialization}
                </p>
                <p>
                  <span className="font-semibold">Hospital:</span>{" "}
                  {doc.hospital}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {doc.phone}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {doc.email}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewProfile(doc)}
                    className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteDoctor(doc.id)}
                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageDoctors;
