const Cart = require("../models/cartModels");
const Product = require("../models/productModels");
const User = require("../models/userModels");

module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // from your cookie-based JWT middleware
    const { pId, size } = req.body;

    const product = await Product.findOne({ pId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // const productId = product._id.toString();
    const productId = product.pId;

    const userData = await User.findById(userId);
    const cartData = userData.cartData || {};

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = { [size]: 1 };
    }

    await User.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({
      success: true,
      message: "Added to Cart",
      cartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { pId, size, quantity } = req.body;

    const product = await Product.findOne({ pId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // const productId = product._id.toString();
    const productId = product.pId;

    const userData = await User.findById(userId);
    const cartData = userData.cartData || {};

    if (!cartData[productId] || !cartData[productId][size]) {
      return res
        .status(404)
        .json({ success: false, message: "Item not in cart" });
    }

    if (quantity === 0) {
      delete cartData[productId][size];
      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId];
      }
    } else {
      cartData[productId][size] = quantity;
    }

    await User.findByIdAndUpdate(userId, { cartData });

    const cartItems = [];

    for (const pId in cartData) {
      const product = await Product.findOne({ pId });
      if (!product) continue;

      for (const size in cartData[pId]) {
        cartItems.push({
          product,
          size,
          quantity: cartData[pId][size],
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cartData: cartItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports.getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    const cartItems = [];

    for (const pId in cartData) {
      const product = await Product.findOne({ pId });
      if (!product) continue;

      for (const size in cartData[pId]) {
        cartItems.push({
          product,
          size,
          quantity: cartData[pId][size],
        });
      }
    }

    res.status(200).json({
      success: true,
      cartData: cartItems,
    });
  } catch (error) {
    console.error("Error in getUserCart:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("data before cart clear");
    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
    console.log("data after cart clear");
  } catch (error) {
    console.error("Clear cart error:", error);

    res.status(500).json({ success: false, message: "Server error" });
  }
};
