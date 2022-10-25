const router = require("express").Router();
const { User, Comment, Post } = require("../../models");

// GRAB ALL COMMENTS
router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
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
    const comments = dbCommentData.map((comment) =>
      comment.get({ plain: true })
    );
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// GRAB SINGLE COMMENT
router.get("/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });

    const comment = dbCommentData.get({ plain: true });
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//CREATE COMMENT
router.post("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.body.user_id,
    });

    const comment = dbCommentData.get({ plain: true });
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// UPDATE COMMENT
router.put("/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.update(
      {
        comment: req.body.comment,
        post_id: req.body.post_id,
        user_id: req.body.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// DELETE COMMENT
router.delete("/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (dbCommentData) {
      res.json(dbCommentData);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
