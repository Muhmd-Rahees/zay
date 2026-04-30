import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify"; 

// Custom SVG icons
const UserIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const SaveIcon = () => (
  <svg
    className="w-3 h-3 sm:w-4 sm:h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg
    className="w-3 h-3 sm:w-4 sm:h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    className="w-3 h-3 sm:w-4 sm:h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      toast.success(response.data.message);
      navigate("/signUp");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };
  // Password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user profile data
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/auth/me");

      // Check for successful response - your backend doesn't use 'success' property
      if (response.data.user) {
        const userData = response.data.user;
        setUser(userData);
        setFormData({
          username: userData.username || "",
          email: userData.email || "",
        });
      } else {
        throw new Error(response.data.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfileHandler = async () => {
    try {
      await axiosInstance.put("/auth/update-profile", formData);
      toast.success("Profile updated successfully");
      // Optionally refetch user or update context
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const changePasswordHandler = async () => {
    try {
      await axiosInstance.put("/auth/change-password", passwordData);
      toast.success("Password changed successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  const handlePasswordToggle = () => {
    console.log("🔍 Before toggle:", isChangingPassword);
    setIsChangingPassword(true);

    // Force a re-render after state update
    setTimeout(() => {
      console.log("🔍 After toggle:", isChangingPassword);
    }, 100);
  };
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    try {
      const response = await axiosInstance.put("/auth/profile", {
        username: formData.username,
        email: formData.email,
      });

      //  Check for status code or user data
      if (response.status === 200 && response.data.user) {
        setUser((prev) => ({
          ...prev,
          username: formData.username,
          email: formData.email,
        }));
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        throw new Error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.password !== passwordData.confirmPassword) {
      toast.success("Passwords do not match!");
      return;
    }

    if (passwordData.password.length < 6) {
      toast.success("Password must be at least 6 characters long!");
      return;
    }

    try {
      const response = await axiosInstance.put(
        "/auth/change-password",
        passwordData
      );

      if (response.data.success) {
        setPasswordData({
          currentPassword: "",
          password: "",
          confirmPassword: "",
        });
        setIsChangingPassword(false);
        toast.success("Password updated successfully!");
      } else {
        throw new Error(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response?.data?.message || "Error updating password");
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
    setIsEditing(false);
    setPasswordData({ currentPassword: "", password: "", confirmPassword: "" });
    setIsChangingPassword(false);
  };

  const navigateToOrders = () => {
    navigate("/orders");
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "moderator":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">
            Failed to load profile data
          </div>
          <button
            onClick={fetchProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 mb-4 sm:mb-6">
          <div className="p-4 sm:p-6">
            {/* Header Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                My Profile
              </h1>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {!isEditing && !isChangingPassword ? (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="cursor-pointer inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm sm:text-base"
                    >
                      <SettingsIcon />
                      <span className="ml-2">Edit Profile</span>
                    </button>
                    <button onClick={handleLogout}>
                      <p className="bg-red-400 hover:bg-red-600 py-2 px-3 cursor-pointer text-white rounded-md">
                        Log out
                      </p>
                    </button>
                    {/* <button
                      onClick={
                        (() => setIsChangingPassword(true),
                        handlePasswordToggle)
                      }
                      className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors font-medium text-sm sm:text-base"
                    >
                      <LockIcon />
                      <span className="ml-2">Change Password</span>
                    </button> */}
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={isEditing ? handleSave : handlePasswordUpdate}
                      className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
                    >
                      <SaveIcon />
                      <span className="ml-2">Save Changes</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Picture & Basic Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <CgProfile className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 text-gray-400 border-4 border-white shadow-lg rounded-full bg-gray-100" />
              </div>

              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 truncate">
                    @{user.username}
                  </h2>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
                      user.role
                    )} self-center sm:self-start`}
                  >
                    {user.role}
                  </span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base truncate">
                  {user.email}
                </p>
                {/* <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Account Information
              </h3>

              {isChangingPassword ? (
                // Password Change Form
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-4">
                      Change Password
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password *
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your current password"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password *
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={passwordData.password}
                          onChange={handlePasswordChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter new password (min 6 characters)"
                          minLength="6"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password *
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Confirm your new password"
                          minLength="6"
                          required
                        />
                      </div>

                      {passwordData.password &&
                        passwordData.confirmPassword &&
                        passwordData.password !==
                          passwordData.confirmPassword && (
                          <p className="text-red-500 text-sm flex items-center gap-2">
                            <span>⚠️</span>
                            Passwords do not match
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              ) : (
                // Profile Information Form continues...

                // Profile Information Form
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-shrink-0">
                      <UserIcon />
                    </div>
                    {isEditing ? (
                      <div className="flex-1 min-w-0">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    ) : (
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500">Username</p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                          @{user.username}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-shrink-0">
                      <MailIcon />
                    </div>
                    {isEditing ? (
                      <div className="flex-1 min-w-0">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    ) : (
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                          {user.email}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-shrink-0">
                      <ShieldIcon />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">Role</p>
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button
                  onClick={navigateToOrders}
                  className="w-full flex items-center gap-3 p-3 text-left rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <ShoppingBagIcon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      My Orders
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      View order history
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Account Stats
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">
                    Account Type
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  {/* <span className="text-gray-600 text-sm sm:text-base">
                    Member Since
                  </span> */}
                  {/* <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
