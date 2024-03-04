const router = require('express').Router();
const { Post, User } = require('../models');
const helpers = require('../utils/helpers');

router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findByPk(postId, {
      include: {
        model: User,
        attributes: ['username'],
      },
    });

    if (!postData) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const formattedPost = postData.get({ plain: true });
    formattedPost.createdBy = formattedPost.User ? formattedPost.User.username : 'Unknown';
    formattedPost.formattedDate = helpers.format_date(formattedPost.createdAt);

    res.render('postDetails', {
      post: formattedPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error in post route:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
