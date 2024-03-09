// userRoutes.js
const { User } = require('../../models');
const router = require('express').Router();

// Route to create a new user (signup)
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password:req.body.password // Hash the password before storing
    });

    // Set the user session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      // Redirect the user to the dashboard page after they sign up
      res.redirect('/dashboard');
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }
    console.log( userData);
    const isValid = await userData.checkPassword(req.body.password);
    console.log('test', isValid);
    if (!isValid) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }
    // Set the user session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: 'Login successful' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).json({ message: 'No user to log out' });
  }
});

module.exports = router;
