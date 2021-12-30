import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  return userId && token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
