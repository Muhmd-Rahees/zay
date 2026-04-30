const express = require("express");
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/signIn", authController.signIn);
router.get("/me", verifyToken, authController.me);
router.post("/logout", verifyToken, authController.userLogOut);

// authRoutes.js
router.put("/updateProfile", verifyToken, authController.updateProfile);
router.put("/changePassword", verifyToken, authController.changePassword);

router.put("/profile", verifyToken, authController.updateProfile);

router.put("/update-profile", verifyToken, authController.updateProfile); // to update username/email
router.put("/change-password", verifyToken, authController.changePassword); // to update password

module.exports = router;
