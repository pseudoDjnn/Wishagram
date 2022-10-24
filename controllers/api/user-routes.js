const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GRAB ALL
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

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      const userPassword = await user.validatePassword(req.body.password);
      if (!userPassword) {
        res.status(400).json({ message: "Invalid password" });
        return;
      }
      req.session.save(() => {
        // VARIABLE DECLARATION DURING USER SESSION
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.json({ user: user, message: "Successfully logged in" });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
