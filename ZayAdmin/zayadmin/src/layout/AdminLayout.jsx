import React from "react";
import NavBar from "../components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import LoadSpinner from "../components/LoadSpinner";
import { checkAuthAdminStatus } from "../feature/authSlice";
import { useEffect } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { loading, error, admin } = useSelector((states) => states.adminAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthAdminStatus());
  }, []);
  if (loading) {
    return <LoadSpinner />;
  }
if (error){
  navigate('/admin/login');
  return null
}
  return (
    <div>
      <NavBar />
      <hr />
      <div className="flex">
        <SideBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
