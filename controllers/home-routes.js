const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const Url = require("url");
const sequelize = require("../config/connection");

// GRAB ALL USERS
router.get("/", async (req, res) => {
  try {
    const dbPostsData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at", 
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ['username']
          }
        },
      ],
    });
    const posts = dbPostsData.map((post) => post.get({ plain: true }));
    const q = Url.parse(req._parsedOriginalUrl, true);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
      active_home: q.path === "/",
      home: true,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// LOGIN
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
  }
  res.render("login");
});

// REGISTER
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
      attributes: ["id", "title", "content", "created_at",
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "user_id","post_id","created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    const post = dbPostData.get({ plain: true });
    res.render("post-comments", {
      post,
      loggedIn: req.session.loggedIn,
      // user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
