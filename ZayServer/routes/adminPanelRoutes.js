const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const adminPanel = require("../controllers/adminPanel");


const adminPanelRoutes = express.Router();

adminPanelRoutes.get(
  "/user-count",
  verifyToken,
  verifyRole(["Admin"]),
  adminPanel.userCount
);

module.exports = adminPanelRoutes;
