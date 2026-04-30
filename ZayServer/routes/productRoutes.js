const express = require("express");
const productController = require("../controllers/productController");
const upload = require("../middlewares/multer");
const { verifyRole, verifyToken } = require("../middlewares/authMiddleware");

const productRouter = express.Router();

productRouter.post(
  "/addProduct",
  verifyToken,
  verifyRole(["Admin"]),
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  productController.addProduct
);
productRouter.get("/listProduct", productController.listProduct);
productRouter.get("/singleProduct/:prodId", productController.singleProduct);
productRouter.put(
  "/updateProduct/:prodId",
  verifyToken,
  verifyRole(["Admin"]),
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  productController.updateProduct
);
productRouter.delete(
  "/deleteProduct/:prodId",
  verifyToken,
  verifyRole(["Admin"]),
  productController.deleteProduct
);

module.exports = productRouter;
