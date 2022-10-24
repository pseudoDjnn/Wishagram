const { Comment } = require("../models");

const commentdata = [
  {
    comment_text: "Nunc rhoncus dui vel sem.",
    user_id: 6,
    post_id: 1,
  },
  {
    comment_text:
      "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "Aliquam erat volutpat. In congue.",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "Sed vel enim sit amet nunc viverra dapibus.",
    user_id: 3,
    post_id: 1,
  },
  {
    comment_text: "Sed vel enim sit amet nunc viverra dapibus.",
    user_id: 4,
    post_id: 2,
  },
  {
    comment_text: "Nunc rhoncus dui vel sem.",
    user_id: 5,
    post_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
