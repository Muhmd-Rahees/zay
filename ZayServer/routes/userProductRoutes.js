const express = require("express");

const {
  listProduct,
  singleProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/list-product", listProduct);
router.get("/single-product/:prodId", singleProduct);

module.exports = router;
