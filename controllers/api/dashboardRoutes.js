const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Check if the user is not logged in and redirect to the login page
    if (!req.session.logged_in) {
      return res.redirect('/login');
    }

    // Fetch user data, including username and posts
    const userData = await User.findByPk(req.session.user_id, {
      attributes: ['username'],
      include: [{ model: Post }],
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = userData.get({ plain: true });

    // Check if the user has any posts
    const posts = user.posts || [];

    // Render the dashboard template with the required data
    res.render('dashboard', {
      username: user.username,
      posts,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

