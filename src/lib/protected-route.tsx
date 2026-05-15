// ProtectedRoute.tsx
import { JSX } from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const adminToken = localStorage.getItem("admin-token");

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
