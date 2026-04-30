import { useSelector } from "react-redux";
import LoadSpinner from "./LoadSpinner";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadSpinner />;
  }

  return user ? <Outlet /> : <Navigate to="/signIn" replace />;
};

export default ProtectedRoute;
