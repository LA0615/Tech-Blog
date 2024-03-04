const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Creates a relationship between USER and post model
User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

// Creates a relationship between USER and comment model
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

// Creates a relationship between the post and the user
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

// models/Post.js
Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

// In the Comment model
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = { User, Post, Comment };

