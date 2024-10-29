import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const userName = JSON.parse(localStorage.getItem("user"));

  return userName ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
