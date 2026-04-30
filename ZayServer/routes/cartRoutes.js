const express = require("express");
const cartControllers = require("../controllers/cartController");
const { verifyToken } = require("../middlewares/authMiddleware");

const cartRouter = express.Router();

cartRouter.post("/addToCart",verifyToken, cartControllers.addToCart);
cartRouter.post("/updateCart",verifyToken, cartControllers.updateCart);
cartRouter.post("/getUserCart",verifyToken, cartControllers.getUserCart);
cartRouter.post("/clearCart",verifyToken, cartControllers.clearCart);

module.exports = cartRouter;
