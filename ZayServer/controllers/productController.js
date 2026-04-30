const Product = require("../models/productModels");
const cloudinary = require("cloudinary");

module.exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      categoryOfMonth,
      featuredProducts,
      sizes,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // to store images in database we upload images to cloudinary then that secure url(https) is storing in database
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrls = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      categoryOfMonth: categoryOfMonth === "true" ? true : false,
      featuredProducts: featuredProducts === "true" ? true : false,
      sizes: sizes ? JSON.parse(sizes) : [],
      images: imageUrls,
      date: Date.now(),
    };

    console.log(productData);
    console.log("price from req.body:", price, "type:", typeof price);

    const product = new Product(productData);
    await product.save();

    // console.log(
    //   name,
    //   description,
    //   price,
    //   category,
    //   subCategory,
    //   categoryOfMonth,
    //   featuredProducts,
    //   sizes
    // );

    // console.log(image1, image2, image3, image4);
    // console.log(imageUrls);

    res
      .status(200)
      .json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.listProduct = async (req, res) => {
  try {
    const search = req.query.search || "";
    const categoryOfMonth = req.query.categoryOfMonth;

    const query = {
      name: { $regex: new RegExp(search, "i") },
    };

    // If ?categoryOfMonth=true is passed, add to the query
    if (categoryOfMonth === "true") {
      query.categoryOfMonth = true;
    }

    const product = await Product.find(query);
    res
      .status(200)
      .json({ success: true, message: "Product listed successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Product fetching failed",
      error: error.message,
    });
  }
};

module.exports.singleProduct = async (req, res) => {
  try {
    const { prodId } = req.params; // prodId is defined in the routes and req.params is the url parameter
    const single_product = await Product.findOne({ pId: prodId });
    res
      .status(200)
      .json({ success: true, message: "Product fetched", single_product });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Product fetching failed",
      error: error.message,
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { prodId } = req.params;
    const {
      name,
      description,
      price,
      category,
      subCategory,
      categoryOfMonth,
      featuredProducts,
      sizes,
    } = req.body;

    const update_product = await Product.findOne({ pId: prodId });

    if (!update_product) {
      return res.status(404).json({
        success: false,
        message: "Product not found with the provided prodId",
      });
    }

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const newImages = [image1, image2, image3, image4].filter(Boolean);

    if (newImages.length > 0) {
      let imagesUrl = await Promise.all(
        newImages.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
      update_product.images = imagesUrl;
    }

    update_product.name = name ? name : update_product.name;
    update_product.description = description
      ? description
      : update_product.description;
    update_product.category = category ? category : update_product.category;
    update_product.subCategory = subCategory
      ? subCategory
      : update_product.subCategory;
    update_product.price = price ? Number(price) : update_product.price;
    update_product.categoryOfMonth =
      categoryOfMonth === "true"
        ? true
        : categoryOfMonth === "false"
        ? false
        : update_product.categoryOfMonth;
    update_product.featuredProducts =
      featuredProducts === "true"
        ? true
        : featuredProducts === "false"
        ? false
        : update_product.featuredProducts;
    update_product.sizes = sizes ? JSON.parse(sizes) : update_product.sizes;
    await update_product.save();
    res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ succeess: false, message: "Product update failed" });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { prodId } = req.params;
    await Product.findOneAndDelete({ pId: prodId });
    // await Product.findByIdAndDelete(prodId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Deletion failed",
      error: error.message,
    });
  }
};
