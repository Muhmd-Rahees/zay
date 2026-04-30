const cloudinary = require("cloudinary");

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};
console.log("Cloudinary configured:");
console.log("MONGO_URI Name:", process.env.MONGO_URI)
console.log("Cloudinary Name:", process.env.CLOUDINARY_NAME);
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
console.log("Cloudinary Secret:", process.env.CLOUDINARY_SECRET_KEY);

module.exports = connectCloudinary;
