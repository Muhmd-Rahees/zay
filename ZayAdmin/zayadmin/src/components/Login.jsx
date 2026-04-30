import React, { useState } from "react";
// import axiosInstance from "../../../../ZayClient/src/config/axiosConfig";
import axiosInstance from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/admin/login", form);
      console.log(response);

      if (response.data.user.role === "Admin") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      console.log("form data : ", form);
      navigate("/");
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="shadow-md bg-white rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 min-w-72">
            <p className="text-sm mb-2 font-medium text-gray-700">
              Email Address
            </p>
            <input
              className="rounded-md border w-full px-3 py-2 border-gray-300 outline-none"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm mb-2 font-medium text-gray-700">Password</p>
            <input
              className="rounded-md border w-full px-3 py-2 border-gray-300 outline-none"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white rounded-md w-full mt-2 py-2 px-4 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
