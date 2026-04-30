const jwt = require("jsonwebtoken");
const user = require("../models/userModels");
const orderModel = require("../models/orderModel");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Isadmin = await user.findOne({ email });
    if (!Isadmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (Isadmin.role !== "Admin") {
      return res.status(404).json({ message: "Access denied : Not an admin" });
    }

    const token = jwt.sign(
      {
        id: Isadmin._id,
        email: Isadmin.email,
        role: Isadmin.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.cookie("authToken", token);
    res.status(200).json({
      message: "Welcome Admin",
      user: { id: Isadmin._id, email: Isadmin.email, role: Isadmin.role },
    });
    console.log("________user token___________", token);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const adminLogout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNewSignUps = async (req, res) => {
  try {
    const oneWeakAgo = new Date();
    oneWeakAgo.setDate(oneWeakAgo.getDate() - 7);

    const newUser = await user
      .find({ createdAt: { $gte: oneWeakAgo } })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: newUser.length,
      latestUser: newUser[0]?.username || null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch new signUp" });
  }
};

// const getTotalRevenue = async (req, res) => {
//   try {
//     const paidOrders = await orderModel.find({ payment: true });
//     console.log("Found paid orders:", paidOrders.length);
//     const revenue = paidOrders.reduce((acc, order) => acc + order.amount, 0);
//     res.status(200).json({ success: true, revenue });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to calculate revenue" });
//   }
// };

const getTotalRevenue = async (req, res) => {
  try {
    const paidOrders = await orderModel.find({ payment: true });

    console.log("Found paid orders:", paidOrders.length);

    if (paidOrders.length === 0) {
      return res.status(200).json({ success: true, revenue: 0 });
    }

    paidOrders.forEach((order, index) => {
      console.log(`Order #${index + 1} - amount:`, order.amount);
    });

    const revenue = paidOrders.reduce((acc, order) => {
      return acc + (Number(order.amount) || 0);
    }, 0);

    res.status(200).json({ success: true, revenue });
  } catch (error) {
    console.error("Revenue error:", error);
    res.status(500).json({ error: "Failed to calculate revenue" });
  }
};

const getPendingOrders = async (req, res) => {
  try {
    const pendingOrders = await orderModel.find({ payment: false });
    res.status(200).json({ count: pendingOrders.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to get pending orders" });
  }
};

// const getRecentActivity = async (req, res) => {
//   try {
//     const latestUsers = await user.find().sort({ createdAt: -1 }).limit(1);
//     const latestOrders = await orderModel.find().sort({ date: -1 }).limit(2);

//     const activities = [];

//     if (latestUsers.length > 0) {
//       activities.push(`🟩 New user ${latestUsers[0].name} signed up.`);
//     }

//     latestOrders.forEach((order) => {
//       if (order.payment) {
//         activities.push(`🟩 Order #${order._id} has been completed.`);
//       } else {
//         activities.push(`🟨 Payment pending for Order #${order._id}.`);
//       }
//     });

//     activities.push("🟩 System backup completed."); // hardcoded example

//     res.json({ activities });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch activity log" });
//   }
// };

const getRecentActivity = async (req, res) => {
  try {
    // Fetch 2 latest orders
    const latestOrders = await orderModel.find().sort({ date: -1 }).limit(2);

    const activities = latestOrders.map((order) => {
      if (order.payment) {
        return `✅ Order #${order._id} has been completed.`;
      } else {
        return `⚠️ Payment pending for Order #${order._id}.`;
      }
    });

    res.status(200).json({ success: true, activities });
  } catch (err) {
    console.error("Error fetching activity log:", err.message);
    res.status(500).json({ error: "Failed to fetch activity log" });
  }
};

const addUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password not match" });
    }

    const existing = await user.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exiist" });
    }

    const newUser = new user({
      username,
      email,
      password,
      confirmPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Add user error: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  adminLogin,
  adminLogout,
  getNewSignUps,
  getTotalRevenue,
  getPendingOrders,
  getRecentActivity,
  addUser,
};
