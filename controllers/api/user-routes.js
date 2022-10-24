const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

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

// GRAB SINGLE USER
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "post_url", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });
    const user = userData.get({ plain: true });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }
});

module.exports = router;
