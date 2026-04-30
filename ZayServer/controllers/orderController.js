const orderModel = require("../models/orderModel");
const User = require("../models/userModels");
const Stripe = require("stripe");
const Product = require("../models/productModels");

// global variables
const currency = "USD";
const deliveryCharge = 10;

// gateway initialisation
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// COD
module.exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("REQ.BODY___________________________:", req.body);
    const { items, amount, address } = req.body;
    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item._id);
        return {
          ...item,
          images: product?.images || [],
        };
      })
    );
    const orderData = {
      userId,
      items: enrichedItems,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Order placed",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stripe
module.exports.placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("REQ.USER:", req.user);
    console.log("REQ.BODY___________________________:", req.body);
    const { items, amount, address } = req.body;
    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item._id);
        return {
          ...item,
          images: product?.images || [],
        };
      })
    );
    const { origin } = req.headers;
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No items in the order" });
    }
    const orderData = {
      userId,
      items: enrichedItems,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// RazorPay
module.exports.placeOrderRazorpay = async (req, res) => {};
// Order data for frontEnd
module.exports.userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: error.message });
  }
};

// ______________________________________

// Display all orders for adminpanel
module.exports.allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status from admin panel
exports.updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    console.log("REQ.USER ===>", req.user);
    console.log("ORDER ID ===>", req.body.orderId);
    console.log("NEW STATUS ===>", req.body.status);
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error });
  }
};

module.exports.verifyPayment = async (req, res) => {
  try {
    const { success, orderId } = req.query;

    if (success === "true" && orderId) {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { payment: true },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Payment verified and order updated",
        order: updatedOrder,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment failed or invalid request",
      });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.updateCod = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await orderModel.findById(orderId);

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    if (order.paymentMethod !== "COD") {
      return res.status(409).json({
        success: false,
        message: "Only COD orders can be marked as paid manually.",
      });
    }

    order.payment = true;
    await order.save();
    res
      .status(200)
      .json({ success: true, message: "Payment completed for COD" });
      
  } catch (error) {
    console.log("Error in updating the cod status");
    return res
      .status(500)
      .json({ success: false, message: "Cannot update the cod status" });
  }
};
