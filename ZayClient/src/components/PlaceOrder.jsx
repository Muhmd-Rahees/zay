// import React from "react";
// import CartTotal from "./CartTotal";
// import stripe_logo from "../assets/stripe_logo.png";
// import razorpay_logo from "../assets/razorpay_logo.png";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axiosInstance from "../config/axiosConfig";
// import { clearCart } from "../features/cartSLice";
// import { toast } from "react-toastify";

// const PlaceOrder = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // const {cartItems, setCartItems,getCartItems,getCartAmount, shippingCharge,products}

//   // const { products, currency } = useSelector((state) => state.products);
//   // const { items, loading, shippingCharge } = useSelector((state) => state.cart);

//   const cartItems = useSelector((state) => state.cart.items);
//   const shippingCharge = useSelector((state) => state.cart.shippingCharge);
//   const products = useSelector((state) => state.products.products);

//   const [method, setMethod] = useState("cod");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const getCartAmount = () => {
//     let total = 0;

//     for (const productId in cartItems) {
//       for (const size in cartItems[productId]) {
//         const quantity = cartItems[productId][size];
//         const product = products.find((p) => p._id === productId);

//         if (product && quantity > 0) {
//           total += product.price * quantity;
//         }
//       }
//     }

//     return total;
//   };
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData((data) => ({ ...data, [name]: value }));
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     console.log("Button clicked, handler triggered");

//     try {
//       let orderItems = [];

//       for (const productId in cartItems) {
//         for (const size in cartItems[productId]) {
//           const quantity = cartItems[productId][size];
//           const product = products.find((p) => p._id === productId);

//           if (product && quantity > 0) {
//             const itemInfo = structuredClone(product);
//             itemInfo.size = size;
//             itemInfo.quantity = quantity;
//             orderItems.push(itemInfo);
//           }
//         }
//       }

//       console.log("Final Order Items:", orderItems);

//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + shippingCharge,
//       };

//       switch (method) {
//         case "cod":
//           const response = await axiosInstance.post(
//             "/api/order/place",
//             orderData
//           );
//           console.log("orderData.address = ", orderData.address);

//           console.log("response check", response.data);
//           if (response.data.success) {
//             dispatch(clearCart());
//             toast.success("Order placed successfully!");
//             navigate("/orders");   // here this is rediecting to orders
//           } else {
//             toast.error(response.data.message || "Order failed");
//           }
//           break;

//         case "stripe":
//           const responseStripe = await axiosInstance.post(
//             "/api/order/stripe",
//             orderData
//           );

//           if (responseStripe.data.success) {
//             const { session_url } = responseStripe.data;
//             window.location.replace(session_url);
//           } else {
//             toast.error(responseStripe.data.message);
//           }
//           break;

//         default:
//           break;
//       }

//       // Proceed with orderItems to backend or next step here
//     } catch (error) {
//       console.error("Caught error in submit:", error);
//       toast.error("Something went wrong while placing order.");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col sm:flex-row justify-between gap-4 p-10 px-15 pt-5 sm:pt-14 min-h-[80vh] border-t"
//     >
//       <div className="flex flex-col gap-2 w-full sm:max-w-[480px]">
//         <div className="text-xl sm:text-2xl my-3">
//           <h1>DELIVERY INFORMATION</h1>
//         </div>
//         <div className="flex gap-3">
//           <input
//             required
//             onChange={onChangeHandler}
//             name="firstName"
//             value={formData.firstName}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="First Name"
//           />
//           <input
//             required
//             onChange={onChangeHandler}
//             name="lastName"
//             value={formData.lastName}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>
//         <input
//           required
//           onChange={onChangeHandler}
//           name="email"
//           value={formData.email}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="email"
//           placeholder="Email"
//         />
//         <input
//           required
//           onChange={onChangeHandler}
//           name="street"
//           value={formData.street}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="text"
//           placeholder="Street address"
//         />{" "}
//         <div className="flex gap-3">
//           <input
//             required
//             onChange={onChangeHandler}
//             name="city"
//             value={formData.city}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             onChange={onChangeHandler}
//             name="state"
//             value={formData.state}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="State "
//           />
//         </div>
//         <div className="flex gap-3">
//           <input
//             required
//             onChange={onChangeHandler}
//             name="zipcode"
//             value={formData.zipcode}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="number"
//             placeholder="Zipcode"
//           />
//           <input
//             required
//             onChange={onChangeHandler}
//             name="country"
//             value={formData.country}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="Country "
//           />
//         </div>
//         <input
//           required
//           onChange={onChangeHandler}
//           name="phone"
//           value={formData.phone}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="number"
//           placeholder="Phone "
//         />
//       </div>

//       <div className="mt-12">
//         <CartTotal />
//         <h2 className="text-lg font-semibold mb-3">PAYMENT METHOD</h2>
//         <div className="flex flex-col gap-3 lg:flex-row lg:gap-6">
//           <div
//             onClick={() => setMethod("stripe")}
//             className="flex items-center gap-3 border rounded px-4 py-2 cursor-pointer"
//           >
//             <p
//               className={`min-w-3.5 h-3.5 border rounded-full ${
//                 method === "stripe" ? "bg-green-400" : ""
//               }`}
//             ></p>
//             <img className="h-5" src={stripe_logo} alt="Stripe" />
//             <span className="text-sm text-gray-600">Stripe</span>
//           </div>

//           <div
//             onClick={() => setMethod("razorpay")}
//             className="flex items-center gap-3 border rounded px-4 py-2 cursor-pointer"
//           >
//             <p
//               className={`min-w-3.5 h-3.5 border rounded-full ${
//                 method === "razorpay" ? "bg-green-400" : ""
//               }`}
//             ></p>
//             <img className="h-5" src={razorpay_logo} alt="Razorpay" />
//             <span className="text-sm text-gray-600">Razorpay</span>
//           </div>

//           <div
//             onClick={() => setMethod("cod")}
//             className="flex items-center gap-3 border rounded px-4 py-2 cursor-pointer"
//           >
//             <p
//               className={`min-w-3.5 h-3.5 border rounded-full ${
//                 method === "cod" ? "bg-green-400" : ""
//               }`}
//             ></p>
//             <span className="text-sm text-gray-600">Cash on Delivery</span>
//           </div>
//         </div>

//         <div className="w-full text-end mt-8">
//           <button
//             type="submit"
//             className="bg-green-600 rounded-md hover:bg-blue-600 cursor-pointer text-white px-16 py-3 text-sm"
//           >
//             PLACE ORDER
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

import React from "react";
import CartTotal from "./CartTotal";
import stripe_logo from "../assets/stripe_logo.png";
import razorpay_logo from "../assets/razorpay_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../config/axiosConfig";
import { clearCart } from "../features/cartSLice";
import { toast, ToastContainer } from "react-toastify";

// Enhanced Responsive Success Popup Component
const OrderSuccessPopup = ({ isOpen, onClose, orderData }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleViewOrders = () => {
    onClose();
    navigate("/orders"); // Redirect to orders page
  };

  const handleContinueShopping = () => {
    onClose(); // if you want to close a modal or something
    navigate("/"); // navigate to home
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4 lg:p-6">
      <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mx-2 sm:mx-4 transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
        {/* Header with enhanced responsiveness */}
        <div className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 rounded-t-xl sm:rounded-t-2xl lg:rounded-t-3xl p-4 sm:p-6 lg:p-8 text-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-2 left-4 w-8 h-8 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-6 right-8 w-4 h-4 bg-white rounded-full animate-bounce delay-75"></div>
            <div className="absolute bottom-4 left-8 w-6 h-6 bg-white rounded-full animate-pulse delay-150"></div>
          </div>

          {/* Success icon with enhanced animation */}
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 shadow-xl">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-500 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2">
            🎉 Order Placed!
          </h2>
          <p className="text-green-100 text-sm sm:text-base lg:text-lg">
            Your order has been successfully placed
          </p>
        </div>

        {/* Body with enhanced spacing */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Order Details Card */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                {/* <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg> */}
                {/* <h3 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
                  Order Summary
                </h3> */}
              </div>

              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base">
                <div className="flex justify-between sm:flex-col sm:justify-start">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-green-600 text-sm sm:text-base lg:text-lg">
                    ${orderData?.amount}
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col sm:justify-start">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold capitalize text-blue-600">
                    {orderData?.method}
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col sm:justify-start">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-semibold text-purple-600">
                    {orderData?.itemCount} items
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col sm:justify-start">
                  <span className="text-gray-600">Status:</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 font-medium">
                    Processing
                  </span>
                </div>
              </div> */}
            </div>

            {/* Delivery Info Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
                  Delivery Address
                </h3>
              </div>

              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold">
                    {orderData?.address?.firstName}{" "}
                    {orderData?.address?.lastName}
                  </span>
                  <br />
                  {orderData?.address?.street}
                  <br />
                  {orderData?.address?.city}, {orderData?.address?.state}{" "}
                  {orderData?.address?.zipcode}
                  <br />
                  {orderData?.address?.country}
                  <br />
                  <span className="text-blue-600">
                    📞 {orderData?.address?.phone}
                  </span>
                </p>
              </div>
            </div>

            {/* Timeline/Progress
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border border-green-100">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                What's Next?
              </h3>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Order confirmation email sent
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700">Processing your order</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Preparing for shipment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Out for delivery</span>
                </div>
              </div>
            </div> */}

            {/* Success Message */}
            <div className="text-center py-2 sm:py-4">
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-4 px-2">
                🎊 Thank you for your order!
              </p>
            </div>
          </div>

          {/* Action Buttons - Enhanced for all devices */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 mt-6 sm:mt-8">
            <button
              onClick={handleViewOrders}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View My Orders
            </button>

            <button
              onClick={handleContinueShopping}
              className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-gray-300"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
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
              Continue Shopping
            </button>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const shippingCharge = useSelector((state) => state.cart.shippingCharge);
  const products = useSelector((state) => state.products.products);

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Add popup state
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const getCartAmount = () => {
    let total = 0;

    cartItems.forEach((item) => {
      const { product, quantity } = item;
      if (product && quantity > 0) {
        total += product.price * quantity;
      }
    });

    return total;
  };

  const getItemCount = () => {
    let count = 0;

    cartItems.forEach((item) => {
      count += item.quantity;
    });

    return count;
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Button clicked, handler triggered");
    console.log("Cart items before Stripe order:", cartItems);

    try {
      if (!cartItems || cartItems.length === 0) {
        toast.error("Your cart is empty.");
        return;
      }

      const orderItems = cartItems
        .filter((item) => item.product && item.quantity > 0)
        .map((item) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          size: item.size,
        }));

      console.log("Final Order Items:", orderItems);

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + shippingCharge,
      };

      switch (method) {
        case "cod":
          const response = await axiosInstance.post(
            "/api/order/place",
            orderData
          );
          console.log("orderData.address = ", orderData.address);
          console.log("response check", response.data);

          if (response.data.success) {
            dispatch(clearCart());

            // Set order summary and show popup
            setOrderSummary({
              amount: orderData.amount,
              method: method,
              itemCount: getItemCount(),
              address: formData,
            });
            setShowSuccessPopup(true);

            // Reset form
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              street: "",
              city: "",
              state: "",
              zipcode: "",
              country: "",
              phone: "",
            });
            setMethod("cod");

            toast.success("Order placed successfully!");
          } else {
            toast.error(response.data.message || "Order failed");
          }
          break;

        case "stripe":
          const responseStripe = await axiosInstance.post(
            "/api/order/stripe",
            orderData
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Caught error in submit:", error);
      toast.error("Something went wrong while placing order.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-4 p-4 sm:p-6 lg:p-10 pt-5 sm:pt-14 min-h-[80vh] border-t"
      >
        <div className="flex flex-col gap-3 sm:gap-4 w-full sm:max-w-[480px]">
          <div className="text-lg sm:text-xl lg:text-2xl my-3">
            <h1 className="font-bold text-gray-800">DELIVERY INFORMATION</h1>
          </div>

          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              type="text"
              placeholder="First Name"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-gray-300 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              type="text"
              placeholder="Last Name"
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            type="email"
            placeholder="Email"
          />

          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            type="text"
            placeholder="Street address"
          />

          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-gray-300 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              type="text"
              placeholder="City"
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-gray-300 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              type="text"
              placeholder="State"
            />
          </div>

          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-gray-300 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              type="number"
              placeholder="Zipcode"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-gray-300 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              type="text"
              placeholder="Country"
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            type="number"
            placeholder="Phone"
          />
        </div>

        <div className="mt-6 sm:mt-12">
          <CartTotal />
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
            PAYMENT METHOD
          </h2>

          <div className="flex flex-col gap-3 lg:flex-row lg:gap-6">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border rounded-lg px-3 sm:px-4 py-2 sm:py-3 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-200"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full transition-colors duration-200 ${
                  method === "stripe"
                    ? "bg-green-400 border-green-400"
                    : "border-gray-400"
                }`}
              ></p>
              <img className="h-4 sm:h-5" src={stripe_logo} alt="Stripe" />
              <span className="text-xs sm:text-sm text-gray-600">Stripe</span>
            </div>

            {/* <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border rounded-lg px-3 sm:px-4 py-2 sm:py-3 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-200"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full transition-colors duration-200 ${
                  method === "razorpay"
                    ? "bg-green-400 border-green-400"
                    : "border-gray-400"
                }`}
              ></p>
              <img className="h-4 sm:h-5" src={razorpay_logo} alt="Razorpay" />
              <span className="text-xs sm:text-sm text-gray-600">Razorpay</span>
            </div> */}

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border rounded-lg px-3 sm:px-4 py-2 sm:py-3 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-200"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full transition-colors duration-200 ${
                  method === "cod"
                    ? "bg-green-400 border-green-400"
                    : "border-gray-400"
                }`}
              ></p>
              <span className="text-xs sm:text-sm text-gray-600">
                Cash on Delivery
              </span>
            </div>
          </div>

          <div className="w-full text-center sm:text-end mt-6 sm:mt-8">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 cursor-pointer text-white px-8 sm:px-16 py-3 sm:py-4 text-sm sm:text-base font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>

      {/* Enhanced Success Popup */}
      <OrderSuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        orderData={orderSummary}
      />
    </>
  );
};

export default PlaceOrder;
