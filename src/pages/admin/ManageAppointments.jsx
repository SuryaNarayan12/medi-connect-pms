import React, { useEffect, useState } from "react";

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  // Simulated data fetch (replace with API call later)
  useEffect(() => {
    const demoAppointments = [
      {
        id: 1,
        patient: "Rahul Sharma",
        doctor: "Dr. Nilesh Rathod",
        date: "2025-09-20",
        time: "10:30 AM",
        status: "Pending",
      },
      {
        id: 2,
        patient: "Priya Patel",
        doctor: "Dr. Amit Verma",
        date: "2025-09-21",
        time: "2:00 PM",
        status: "Confirmed",
      },
      {
        id: 3,
        patient: "Sujit Kumar",
        doctor: "Dr. Amol Joshi",
        date: "2025-09-22",
        time: "11:15 AM",
        status: "Cancelled",
      },
    ];
    setAppointments(demoAppointments);
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
        Manage Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">ID</th>
                  <th className="border border-gray-200 px-4 py-2">Patient</th>
                  <th className="border border-gray-200 px-4 py-2">Doctor</th>
                  <th className="border border-gray-200 px-4 py-2">Date</th>
                  <th className="border border-gray-200 px-4 py-2">Time</th>
                  <th className="border border-gray-200 px-4 py-2">Status</th>
                  <th className="border border-gray-200 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="text-center hover:bg-gray-50">
                    <td className="border px-4 py-2">{appt.id}</td>
                    <td className="border px-4 py-2">{appt.patient}</td>
                    <td className="border px-4 py-2">{appt.doctor}</td>
                    <td className="border px-4 py-2">{appt.date}</td>
                    <td className="border px-4 py-2">{appt.time}</td>
                    <td
                      className={`border px-4 py-2 font-semibold ${
                        appt.status === "Confirmed"
                          ? "text-green-600"
                          : appt.status === "Cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {appt.status}
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        Confirm
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="border rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {appt.patient}
                  </h3>
                  <span
                    className={`text-sm font-semibold ${
                      appt.status === "Confirmed"
                        ? "text-green-600"
                        : appt.status === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Doctor:</span> {appt.doctor}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Date:</span> {appt.date}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Time:</span> {appt.time}
                </p>

                <div className="mt-3 flex gap-2">
                  <button className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-600 text-sm">
                    Confirm
                  </button>
                  <button className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ManageAppointments;
