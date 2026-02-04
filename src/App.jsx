// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookAppointment from "./pages/BookAppointment";
import ViewAppointments from "./pages/ViewAppointments";
import PatientProfile from "./pages/PatientProfile";
import FindDoctors from "./pages/FindDoctors";
import DoctorProfile from "./pages/DoctorProfile";
import ViewDoctorProfile from "./pages/ViewDoctorProfile";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminPanel from "./pages/AdminPanel";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManageAppointments from "./pages/admin/ManageAppointments";
import Settings from "./pages/admin/Settings";

// Components
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();

  // Hide navbar for admin routes
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      {!hideNavbar && <Navbar />}

      {/* Main content */}
      <main className="flex-grow w-full">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/appointments" element={<ViewAppointments />} />
          <Route path="/profile" element={<PatientProfile />} />
          <Route path="/find-doctors" element={<FindDoctors />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/viewdoc/:id" element={<ViewDoctorProfile />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminPanel />}>
            <Route path="users" element={<ManageUsers />} />
            <Route path="doctors" element={<ManageDoctors />} />
            <Route path="appointments" element={<ManageAppointments />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
