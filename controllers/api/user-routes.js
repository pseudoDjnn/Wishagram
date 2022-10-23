const Post = require("../../models/Post");
const User = require("../../models/User");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const userData = await User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "created_at", "updated_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at", "updated_at"],
      },
    ],
  });
  const users = userData.map((user) => user.get({ plain: true }));
  res.json(users);
});

module.exports = router;
