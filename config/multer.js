const multer = require("multer");
const upload = multer({ dest: "dashboard/" });

module.exports = upload;
