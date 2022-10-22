const { Post } = require("../../models");

const router = require("express").Router();

// router.get("/", (req, res) => {
//   res.render("Response");
// });

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

module.exports = router;
