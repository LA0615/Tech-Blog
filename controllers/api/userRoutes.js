

// userRoutes.js
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const router = require('express').Router();



// Route to create a new user (signup)
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10), // Hash the password before storing
    });

    // Set the user session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(201).json({ user: userData, message: 'Signup successful' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (
      !userData ||
      !(await bcrypt.compare(req.body.password, userData.password))
    ) {
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