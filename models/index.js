const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Vote.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE"
});

User.hasMany(Vote, {
  foreignKey: "user_id"
});

Post.hasMany(Vote, {
  foreignKey: "post_id"
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Vote, Comment };
