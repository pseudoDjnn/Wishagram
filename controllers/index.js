const router = require("express").Router();

const home = require("./home-routes");

router.use("/", home);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
