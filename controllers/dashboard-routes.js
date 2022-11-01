const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");
const Url = require("url");

// GRAB ALL USER COMMENTS
router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostsData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: [
        "id",
        "title",
        "image_url",
        "content",
        "created_at",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
          ),
          "vote_count",
        ],
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
            attributes: ["username"],
          },
        },
      ],
    });
    const posts = dbPostsData.map((post) => post.get({ plain: true }));
    console.log(posts);
    const q = Url.parse(req._parsedOriginalUrl, true);
    res.render("dashboard", {
      posts,
      loggedIn: req.session.loggedIn,
      // cloudinary_url: req.session.cloudinary,
      active_dashboard: q.path === "/dashboard",
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// GRAB POST BY ID
router.get("/post/:id/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      attributes: [
        "id",
        "title",
        "content",
        "created_at",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
          ),
          "vote_count",
        ],
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
            attributes: ["username"],
          },
        },
      ],
    });

    const post = dbPostData.get({ plain: true });

    res.render("post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// GRAB NEWPOST INFO IF USER IS LOGGED IN
router.get("/new-post", withAuth, (req, res) => {
  res.render("newpost", {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
  });
});

module.exports = router;
