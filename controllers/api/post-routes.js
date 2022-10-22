const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("Response");
});

module.exports = router;
