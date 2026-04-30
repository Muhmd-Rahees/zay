import React, { useState } from "react";
import signUp from "../assets/signUp.svg";
import { Link } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.username.trim()) newErrors.username = "Username Required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) newErrors.email = "Email required";
    else if (!emailRegex.test(form.email)) newErrors.email = "Invalid Email";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[\W_])[A-Za-z\d\W_]{6,}$/;
    if (!form.password) newErrors.password = "Password Required";
    else if (!passwordRegex.test(form.password))
      newErrors.password =
        "Password must be at least 6 characters, include a letter and a special character.";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please provide confirm password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Password do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitted___", form);
      try {
        const response = await axiosInstance.post("/auth/signUp", form);
        console.log("response___", response);
        navigate("/signIn");
      } catch (error) {
        console.log("error___", error);
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 lg:py-12 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
          
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 sm:p-8 lg:p-12">
            <div className="w-full max-w-md">
              <img 
                src={signUp} 
                alt="Sign up illustration" 
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
                  Create Account
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Join us today and get started
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {/* Username Field */}
                <div className="space-y-1">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.username 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
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

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.email 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.password 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Create a strong password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.confirmPassword 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 sm:py-4 px-4 rounded-lg hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                  >
                    Create Account
                  </button>
                </div>

                {/* Sign In Link */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm sm:text-base">
                    Already have an account?{" "}
                    <Link 
                      to="/signIn" 
                      className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
