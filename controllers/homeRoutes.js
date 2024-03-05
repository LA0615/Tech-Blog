
const router = require('express').Router();
const { Post, User } = require('../models');
const helpers = require('../utils/helpers');
const withAuth = require('../utils/auth');

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

router.get('/signup', (req, res) => {
  res.render('signupPartial', { title: 'Sign Up', signupPage: true });
});
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch the user's posts along with their information
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Post }],
    });

    // Serialize user data for the template
    const user = userData.get({ plain: true });

    // Render the dashboard view with user data
    res.render('dashboard', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error in dashboard route:', err);
    res.status(500).json(err);
  }
});

router.get('/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
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
    formattedPost.createdBy = formattedPost.User
      ? formattedPost.User.username
      : 'Unknown';
    formattedPost.formattedDate = helpers.format_date(formattedPost.createdAt);

    res.render('post', {
      post: formattedPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error in post route:', err);
    res.status(500).json(err);
  }
});
module.exports = router;
