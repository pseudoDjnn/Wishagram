const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// router.get("/", (req, res) => {
//   res.render("Response");
// });

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
      included: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    const allPosts = postData.map((post) => post.get({ plain: true }));
    res.json(allPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
