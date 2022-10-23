const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// can make many post 
User.hasMany(Post,{
    foreignKey: 'user_id'
});
// only belong to one user
Post.belongsto(User,{
    foreignKey: 'user_id'
})
// can only belong to one user
Comment.belongsto(User, {
    foreignKey: 'user_id'
});
// can only belong to on use
Comment.belongsto( Post,{
    foreignKey: 'post_id'
});
//can create many comments
User.hasMany(Comment,{
    foreignKey:'user_id'
});

// user can create many posts
Post.hasMany(Comment,{
    foreignKey:'post_id'
});

module.exports = {User, Post , Comment };