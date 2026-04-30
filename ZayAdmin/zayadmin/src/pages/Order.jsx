import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { FaBoxOpen } from "react-icons/fa6"; // FaBoxOpen for better semantics
import { toast } from "react-toastify";
import { currency } from "../App";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axiosInstance.post("/api/order/list");
      console.log("Orders:", response.data);
      setOrders(response.data.orders);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axiosInstance.post("/api/order/status", {
        orderId,
        status: e.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Status update failed");
    }
  };

  const handleMarkPaid = async (orderId) => {
    try {
      const response = await axiosInstance.post("/api/order/mark-paid", {
        orderId,
      });
      if (response.data.success) {
        toast.success("Payment COD completed");
        fetchAllOrders();
      }
    } catch (error) {
      console.log("failed to mark as paid", error);
      toast.error(
        error?.response?.data?.message || "Failed to update payment status"
      );
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 mb-6 border border-gray-200"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6">
              {/* Left Section */}
              <div className="flex gap-4 flex-1">
                <FaBoxOpen className="text-3xl text-blue-600" />
                <div>
                  <p className="font-semibold mb-2">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="text-sm text-gray-600 space-y-0.5">
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state},{" "}
                      {order.address.country} - {order.address.zipcode}
                    </p>
                    <p>📞 {order.address.phone}</p>
                  </div>
                </div>
              </div>

              {/* Middle Section - Items */}
              <div className="flex-1">
                <h4 className="font-medium mb-2">Items</h4>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} x {item.quantity}{" "}
                      <span className="text-xs text-gray-500">
                        ({item.size})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Section - Info */}
              <div className="flex-1 space-y-2 text-sm text-gray-800">
                <p>
                  <span className="font-medium">Method:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  <span
                    className={`font-semibold ${
                      order.payment ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                  {!order.payment && order.paymentMethod === "COD" && (
                    <button
                      onClick={() => {
                        handleMarkPaid(order._id);
                      }}
                      disabled={order.payment}
                      className={`ml-2 px-2 py-1 text-xs rounded text-white ${
                        order.payment
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      } `}
                    >
                      Mark as Paid
                    </button>
                  )}
                </p>
                <p>
                  <span className="font-medium">Items:</span>{" "}
                  {order.items.length}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {order.date
                    ? new Date(order.date).toLocaleDateString()
                    : "Invalid"}
                </p>
                <p className="text-lg font-bold mt-2">
                  {currency}
                  {order.amount}
                </p>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="w-full p-2 mt-2 border rounded-md font-medium bg-gray-100 hover:bg-white"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
