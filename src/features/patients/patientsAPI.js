// src/features/patients/patientsAPI.js

// Fake database
const demoPatients = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    address: "123 MG Road, Delhi",
    role: "Patient",
    status: "Active",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 9123456789",
    address: "45 Marine Drive, Mumbai",
    role: "Doctor",
    status: "Inactive",
  },
];

// ✅ Fetch all patients
export const fetchPatientsAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(demoPatients), 500); // simulate delay
  });
};

// ✅ Fetch single patient by ID
export const fetchPatientProfileAPI = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const patient = demoPatients.find((p) => p.id === id);
      if (patient) resolve(patient);
      else reject(new Error("Patient not found"));
    }, 500);
  });
};
