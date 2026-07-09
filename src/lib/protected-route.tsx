import { useAuth } from "@/context/auth-context";
import { Navigate } from "react-router";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/home" replace />;
  }

  return children;
}
