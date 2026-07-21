import { useAuth } from "@/context/auth-context";
import { Navigate, Outlet } from "react-router";

type ProtectedRouteProps = {
  allowedRoles: ("USER" | "ADMIN")[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={user?.role === "ADMIN" ? "/admin/dashboard" : "/user/home"}
        replace
      />
    );
  }

  return <Outlet />;
}
