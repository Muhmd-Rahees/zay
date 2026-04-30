require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/dbConfig");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminPanelRoutes = require("./routes/adminPanelRoutes");
const productRouters = require("./routes/productRoutes");
const { verifyToken } = require("./middlewares/authMiddleware");
const connectCloudinary = require("./config/cloudinary");
const cartRouter = require("./routes/cartRoutes");
const userProductRoutes = require("./routes/userProductRoutes");
const orderRouter = require("./rout es/orderRoutes");

const app = express();
connectDb();
connectCloudinary();
  
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/admin", adminPanelRoutes);
app.use("/admin", productRouters);
app.use("/api/cart", cartRouter);
app.use("/api/product", userProductRoutes);
app.use("/api/order", orderRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log("server is running");
});
