const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GRAB ALL COMMENTS
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Post,
          attributes: ["id", "title"],
        },
      ],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// GRAB SINGLE COMMENT
router.use("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });
    const comment = commentData.get({ plain: true });
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
