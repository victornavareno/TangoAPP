import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  //Get the current role from localStorage
  const role = localStorage.getItem("role");

  //Check if the current role is allowed
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // If the role is not within the allowed roles, redirect to the login page as well
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // If the role is allowed, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
