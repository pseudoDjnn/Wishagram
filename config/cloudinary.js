const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  // cloudinary_name: process.env.CLOUDINARY_NAME,
  secure: true,
});

module.exports = cloudinary;
