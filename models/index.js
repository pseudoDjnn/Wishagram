const User = require("./User");
const Post = require("./Post");
const Like = require("./Like");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Post, {
  through: Like,
  as: "liked_posts",
  foreignKey: "user_id"
});

Post.belongsToMany(User, {
  through: Like,
  as: "liked_posts",
  foreignKey: "post_id"
});

Like.belongsTo(User, {
  foreignKey: "user_id"
});

Like.belongsTo(Post, {
  foreignKey: "post_id"
});

User.hasMany(Like, {
  foreignKey: "user_id"
});

Post.hasMany(Like, {
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
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Like, Comment };
