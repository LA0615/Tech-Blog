const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Creates a relationship between USER and post model
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Creates a relationship between USER and comment model
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Creates a relationship between the post and the user
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// In the Comment model
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Post, Comment };
