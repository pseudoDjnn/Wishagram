const router = require("express").Router();

// router.get("/", (req, res) => {
//   res.render("homepage");
// });

const { User, Post, Comment } = require("../models");
const Url = require("url");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "post_url", "created_at"],
      included: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text"],
        },
      ],
    });
    const posts = postData.map((posts) => posts.get({ plain: true }));
    const x = Url.parse(req._parsedOriginalUrl, true);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
      active_home: x.path === "/",
      home: true,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
