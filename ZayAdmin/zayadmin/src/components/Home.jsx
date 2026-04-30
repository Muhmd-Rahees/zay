import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import LoadSpinner from "./LoadSpinner";
import axiosInstance from "../config/axiosConfig";

const Home = () => {
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSignUps, setNewSignUos] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [pndingOrders, setPndingOrders] = useState(null);
  const [latestUser, setLatestUser] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const fetchUserCount = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/user-count");
      setUserCount(response.data.user_count);
    } catch (error) {
      console.log(error.response ? error.response.data : error);
      setError("Failed to fetch user count");
    } finally {
      setLoading(false);
    }
  };

  const newSign_Ups = async () => {
    try {
      const response = await axiosInstance.post("/admin/new-signups");
      console.log("new Singups", response.data);
      setNewSignUos(response.data.count);
      setLatestUser(response.data.latestUser);
    } catch (error) {
      console.error(
        "Error fetching new users:",
        error.response?.data || error.message
      );
    }
  };

  const Total_revenue = async () => {
    try {
      const response = await axiosInstance.post("/admin/revenue");
      console.log("revenue", response.data);
      setRevenue(response.data.revenue);
    } catch (error) {
      console.error(
        "Error fetching new users:",
        error.response?.data || error.message
      );
    }
  };
  const pending_orders = async () => {
    try {
      const response = await axiosInstance.post("/admin/pending-orders");
      console.log("revenue", response.data);
      setPndingOrders(response.data.count);
    } catch (error) {
      console.error(
        "Error fetching new users:",
        error.response?.data || error.message
      );
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const response = await axiosInstance.post("/admin/recent-activity");
      setActivityLogs(response.data.activities);
    } catch (error) {
      console.error("Error fetching activities:", error.message);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/admin/add-user", newUser);
      console.log("User added: ", response.data);
      newSign_Ups();
      fetchUserCount();
      setNewUser({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setShowAddUserModal(false);
    } catch (error) {
      console.error(
        "Failed to add user:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchUserCount();
    newSign_Ups();
    Total_revenue();
    pending_orders();
    fetchRecentActivity();
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-xl font-bold">
              {loading ? <LoadSpinner /> : error ? "Error" : userCount}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <p className="text-sm text-gray-500">New Signups (This Week)</p>
            <p className="text-xl font-bold">
              {loading ? <LoadSpinner /> : error ? "Error" : newSignUps}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-xl font-bold">
              {" "}
              {loading ? <LoadSpinner /> : error ? "Error" : `$${revenue}`}
              {/* {loading ? <LoadSpinner /> : error ? "Error" : `$${revenue}`} */}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-xl font-bold">
              {loading ? <LoadSpinner /> : error ? "Error" : pndingOrders}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>
              ✅ New user{" "}
              <strong>
                {" "}
                {loading ? <LoadSpinner /> : error ? "Error" : latestUser}
              </strong>{" "}
              signed up.
            </li>
            <li>
              {" "}
              {activityLogs.length > 0 ? (
                activityLogs.map((log, idx) => <li key={idx}>{log}</li>)
              ) : (
                <li>No recent activity found.</li>
              )}
              .
            </li>
            {/* <li>✅ Order #1045 has been completed.</li> */}
            {/* <li>⚠️ Payment pending for Order #1046.</li> */}
            {/* <li>✅ System backup completed.</li> */}
          </ul>
        </div>
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(30,58,138,0.8)]">
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                onClick={() => setShowAddUserModal(false)}
              >
                &times;
              </button>
              <form onSubmit={handleAddUser} className="space-y-4">
                <h2 className="text-lg font-semibold">Add New User</h2>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={newUser.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Add User
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setShowAddUserModal(true)}
            className="bg-blue-500 text-white py-3 rounded-2xl shadow hover:bg-blue-600 transition cursor-pointer"
          >
            Add User
          </button>
          {/* <button className="bg-green-500 text-white py-3 rounded-2xl shadow hover:bg-green-600 transition">
            Send Announcement
          </button>
          <button className="bg-purple-500 text-white py-3 rounded-2xl shadow hover:bg-purple-600 transition">
            View Reports
          </button> */}
        </div>
      </main>
    </div>
  );
};

export default Home;
