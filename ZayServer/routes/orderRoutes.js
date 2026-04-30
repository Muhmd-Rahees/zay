const express = require("express");
const {
  placeOrderRazorpay,
  allOrders,
  updateStatus,
  placeOrder,
  placeOrderStripe,
  userOrders,
  verifyPayment,
  updateCod,
} = require("../controllers/orderController");
const { verifyRole, verifyToken } = require("../middlewares/authMiddleware");

const orderRouter = express.Router();

// Admin features
orderRouter.post("/list", verifyToken, verifyRole(["Admin"]), allOrders);
orderRouter.post("/status", verifyToken, verifyRole(["Admin"]), updateStatus);

// Payment features
orderRouter.post("/place", verifyToken, placeOrder);
orderRouter.post("/stripe", verifyToken, placeOrderStripe);

// user feature
orderRouter.post(
  "/razorpay",
  verifyToken,

  placeOrderRazorpay
);
orderRouter.post("/userOrders", verifyToken, userOrders);
orderRouter.get("/verify", verifyPayment);
orderRouter.post("/mark-paid", verifyToken, verifyRole(["Admin"]), updateCod);

module.exports = orderRouter;
