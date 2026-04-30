const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

const adminRoutes = express.Router();

adminRoutes.post("/login", adminController.adminLogin);
adminRoutes.post(
  "/logout",
  verifyToken,
  verifyRole(["Admin"]),
  adminController.adminLogout
);
adminRoutes.post("/new-signups", adminController.getNewSignUps);
adminRoutes.post("/revenue", adminController.getTotalRevenue);
adminRoutes.post("/pending-orders", adminController.getPendingOrders);
adminRoutes.post("/recent-activity", adminController.getRecentActivity);
adminRoutes.post("/add-user", adminController.addUser);

module.exports = adminRoutes;
