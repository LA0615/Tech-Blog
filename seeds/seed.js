const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, { individualHooks: true });

    const posts = await Post.bulkCreate(postData);

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const user = users[i % users.length];

      await post.setUser(user);

      const postComments = commentData.filter(
        (comment) => comment.postId === post.id,
      );

      for (const comment of postComments) {
        await Comment.create({
          text: comment.text,
          username: comment.username,
          description: comment.description,
          userId: user.id,
          postId: post.id,
        });
      }
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
