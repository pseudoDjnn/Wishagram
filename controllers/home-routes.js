const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const Url = require("url");

// GRAB ALL USERS FOR HOMEPAGE DISPLAY
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
    const posts = postData.map((post) => post.get({ plain: true }));
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

// LOGIN REDIRECT
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
  }
  res.render("login");
});

// REGISTER REDIRECT
router.get("/register", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  }
  res.render("register");
});

// GRAB INDIVIDUAL POST AND COMMENTS
router.get("/post/:id/comments", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "title", "post_url", "created_at", "updated_at"],
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: User,
            attributes: ["id", "username"],
          },
        },
      ],
    });
    const post = dbPostData.get({ plain: true });

    res.render("post-comments", {
      post,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
