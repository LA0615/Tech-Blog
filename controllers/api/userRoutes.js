const router = require('express').Router();
const { User } = require('../../models');

// Render the login page
router.get('/login', (req, res) => {
  res.render('main', { title: 'Login', loginPage: true });
});

// Handle user registration
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Handle user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      return res.status(400).json({
        message: 'Incorrect username or password, please try again',
      });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({
        message: 'Incorrect username or password, please try again',
      });
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Handle user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

// Render the signup page
router.get('/signup', (req, res) => {
  res.render('main', { title: 'Signup', signupPage: true });
});

module.exports = router;