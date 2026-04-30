// // components/Verify.jsx
// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { clearCart, clearCartBackend } from "../features/cartSLice";

// function Verify() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const params = new URLSearchParams(location.search);
//   const success = params.get("success");
//   const orderId = params.get("orderId");

//   const [statusMessage, setStatusMessage] = useState("Verifying payment...");
//   const [isSuccess, setIsSuccess] = useState(null);

//   useEffect(() => {
//     if (!orderId) {
//       // Invalid order – redirect or show error
//       navigate("/");
//     }

//     if (success === "true") {
//       // Optionally update order status via API here
//       dispatch(clearCart());
//       dispatch(clearCartBackend());

//     }
//   }, [orderId, success, dispatch]);

//   return (
//     <div className="p-6 text-center">
//       <h2 className="text-2xl font-bold mb-4">
//         {success === "true" ? "🎉 Payment Successful" : " Payment Failed"}
//       </h2>
//       <p className="text-lg">
//         Order ID: <strong>{orderId}</strong>
//       </p>
//       <button
//         className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         onClick={() => navigate("/orders")}
//       >
//         View Orders
//       </button>
//     </div>
//   );
// }

// export default Verify;

// components/Verify.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart, clearCartBackend } from "../features/cartSLice";
import axiosInstance from "../config/axiosConfig";

function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = new URLSearchParams(location.search);
  const success = params.get("success");
  const orderId = params.get("orderId");

  const [statusMessage, setStatusMessage] = useState("Verifying payment...");
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId) {
        navigate("/");
        return;
      }

      if (success === "true") {
        try {
          const res = await axiosInstance.get(
            `/api/order/verify?success=true&orderId=${orderId}`
          );
          if (res.data.success) {
            setStatusMessage("🎉 Payment Verified Successfully!");
            setIsSuccess(true);
            dispatch(clearCart());
            dispatch(clearCartBackend());
          } else {
            setStatusMessage(" Payment verification failed.");
            setIsSuccess(false);
          }
        } catch (err) {
          console.error("Verification error:", err);
          setStatusMessage(" Server error during verification.");
          setIsSuccess(false);
        }
      } else {
        setStatusMessage(" Payment was not successful.");
        setIsSuccess(false);
      }
    };

    verifyPayment();
  }, [success, orderId, dispatch, navigate]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">{statusMessage}</h2>
      <p className="text-lg">
        Order ID: <strong>{orderId}</strong>
      </p>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => navigate("/orders")}
      >
        View Orders
      </button>
    </div>
  );
}

export default Verify;
