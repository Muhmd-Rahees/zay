import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { checkAuthStatus } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import useCartInitializer from "../components/useCartInitializer";

const UserLayout = () => {
  useCartInitializer();
  const { loading, error } = useSelector((states) => states.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
