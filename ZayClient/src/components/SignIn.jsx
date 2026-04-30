import React, { useState } from "react";
import signIn from "../assets/signIn.svg";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newErrors = {};
    if (!form.username) newErrors.username = "Username Required";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[\W_])[A-Za-z\d\W_]{6,}$/;
    if (!form.password) newErrors.password = "Password Required";
    else if (!passwordRegex.test(form.password))
      newErrors.password =
        "Password must be at least 6 characters, include a letter and a special character.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Sign In form submittedd____", form);
      try {
        const response = await axiosInstance.post("/auth/signIn", form);
        console.log("login response____", response);
        navigate("/");
      } catch (error) {
        console.log("error__", error);
        toast.error("Invalid credentials");
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-4 sm:py-8 lg:py-12 flex items-center justify-center px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4 sm:p-8 lg:p-12">
            <div className="w-full max-w-md">
              <img
                src={signIn}
                alt="Sign in illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto lg:mx-0">
              {/* Header */}
              <div className="text-center lg:text-left mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.username
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your username"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.password
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  {/* <Link 
                    to="/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                  >
                    Forgot your password?
                  </Link> */}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 sm:py-4 px-4 rounded-lg hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                  >
                    Sign In
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm sm:text-base">
                    Don't have an account?{" "}
                    <Link
                      to="/signUp"
                      className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>

                {/* Divider */}
                {/* <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Quick access</span>
                  </div>
                </div> */}

                {/* Demo Credentials (Optional - for development) */}
                {/* <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600 text-center">
                    <span className="font-medium">Demo:</span> Use any username with a valid password format
                  </p>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
