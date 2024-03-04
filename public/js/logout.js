const router = require('express').Router();

// Logout route
router.post('/', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end(); // Respond with a success status (204 No Content)
    });
  } else {
    res.status(404).end(); // Respond with a not found status (404 Not Found)
  }
});

module.exports = router;
