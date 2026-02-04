// src/pages/PatientProfile.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientProfileThunk } from "../features/patients/patientsSlice";

export default function PatientProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatientProfileThunk(id));
  }, [dispatch, id]);

  if (loading) return <div className="text-center py-4">Loading profile...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!profile) return <div className="text-center">No profile found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{profile.name}</h1>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`font-semibold ${
            profile.status === "Active" ? "text-green-600" : "text-red-600"
          }`}
        >
          {profile.status}
        </span>
      </p>
    </div>
  );
}
