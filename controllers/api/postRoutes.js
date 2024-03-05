const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
router.post('/posts', withAuth, async (req, res) => {
  try {
    // Logic to create a new post based on the data received in the request body
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      User_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error('Error creating a new post:', err);
    res.status(500).json(err);
  }
});
module.exports = router;


// // Route to handle submission of a new post
// router.post('/newpost', (req, res) => {
//   // Logic to handle the submission of a new post
//   const { title, content } = req.body;
//   // Process the new post data (e.g., save to a database)
//   res.send('New post created successfully');
// });