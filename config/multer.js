const cloudinary = require("./cloudinary.js");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const uuid = require("../utils/uuid.js");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

const upload = multer({ storage: storage });
module.exports = upload;
