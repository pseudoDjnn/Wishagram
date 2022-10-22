const router = require("express").Router();

const user = require("./user-routes");
const post = require("./post-routes");
const comment = require("./comment-routes");

// APIs
router.use("/users", user);
router.use("/posts", post);
router.use("/comments", comment);

module.exports = router;
