import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ redirectPath = "/login" }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
