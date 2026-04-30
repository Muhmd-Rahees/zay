const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    images: {
      type: [String], // array of image URLs or file paths
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: "Men",
    },
    subCategory: {
      type: String,
      required: true,
      default: "TopWear",
    },
    categoryOfMonth: {
      type: Boolean,
      default: false,
    },
    featuredProducts: {
      type: Boolean,
      default: false,
    },
    sizes: {
      type: [String], // ["S", "M", "L", "XL", "XXL"]
      default: [],
    },
    pId: {
      type: String,
      default: () => "PID" + Date.now(),
    },
  },
//   { timestamps: true }
); // adds createdAt and updatedAt automatically

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
