import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/admin/logout");
      toast.success(response.data.message);
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };
  return (
    <div className="flex flex-row items-center gap-3 py-6 px-[4%] sm:px-12 justify-between">
      <div>
        <Link to="/">
          <h1 className="text-green-600 text-2xl sm:text-4xl font-bold cursor-pointer">
            Zay Admin
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="bg-red-700 cursor-pointer text-white rounded-md px-3 py-2 hover:bg-red-800"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
