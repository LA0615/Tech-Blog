
const router = require('express').Router();
const { Post, User } = require('../models');
const helpers = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    // Fetch existing blog posts and include the associated user
    const postData = await Post.findAll({
      include: {
        model: User,
        attributes: ['username'],
      },
    });

    // Serialize data for the template
    const posts = postData.map((post) => {
      const formattedPost = post.get({ plain: true });
      formattedPost.createdBy = formattedPost.User ? formattedPost.User.username : 'Unknown';
      formattedPost.formattedDate = helpers.format_date(formattedPost.createdAt);
      return formattedPost;
    });
    const logged_in = req.session && req.session.logged_in;

    // Render the homepage view
    res.render('homepage', {
      posts,
      logged_in: logged_in
    });
  } catch (err) {
    console.error('Error in home route:', err);
    res.status(500).json(err);
  }
});

// Render the login page
router.get('/login', (req, res) => {
  res.render('loginPartial', { title: 'Login', loginPage: true });
});


module.exports = router;
