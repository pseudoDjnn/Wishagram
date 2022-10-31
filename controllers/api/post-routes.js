const router = require("express").Router();
const { Post, User, Comment, Vote } = require("../../models");
const upload = require("../../config/multer");

// GRAB ALL POSTS
router.get("/", async (req, res) => {
  console.log(req.file);
  try {
    const dbPostsData = await Post.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    const posts = dbPostsData.map((post) => post.get({ plain: true }));
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GRAB SINGLE POST
router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    const post = dbPostData.get({ plain: true });
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE POST
router.post("/", upload.single("image"), async (req, res) => {
  console.log("HIT POST =", req.file);
  // console.log(JSON.stringify(req.file));
  // console.log("HIT POST");
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      // image: req.body.path,
      // data: req.body.data,
      user_id: req.body.user_id,
    });
    res.json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LIKE POST
router.put("/upvote", (req, res) => {
  // make sure the session exists first
  if (req.session) {
    Post.upvote(
      { ...req.body, user_id: req.session.user_id },
      { Vote, Comment, User }
    )
      .then((updatedVoteData) => res.json(updatedVoteData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
