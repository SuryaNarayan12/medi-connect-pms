// src/pages/PatientList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../features/patients/patientsSlice";
import { Link } from "react-router-dom";

export default function PatientList() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  if (loading) return <div className="text-center py-4">Loading patients...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <ul className="space-y-3">
        {list.map((patient) => (
          <li
            key={patient.id}
            className="p-4 bg-white shadow rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{patient.name}</p>
              <p className="text-gray-600">{patient.email}</p>
            </div>
            <Link
              to={`/patients/${patient.id}`}
              className="text-blue-600 hover:underline"
            >
              View Profile
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
