// module.exports = router;
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Server-side route handling for creating a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create a new post in the database
    const newPost = await Post.create({
      title,
      content,
      user_id: req.session.user_id,
    });

    // Send a successful response with the post ID
    res.status(201).json({ post_id: newPost.id });
  } catch (err) {
    console.error('Error creating a new post:', err);
    res.status(500).json({ message: 'Error creating the post' });
  }
});

// Example server-side route for updating a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const postId = req.params.id;

    // Implement logic to update the post in the database
    const updatedPost = await Post.update(
      { title, content },
      { where: { id: postId, user_id: req.session.user_id } },
    );

    if (updatedPost[0] === 0) {
      // If no rows were updated, the post may not belong to the current user
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error('Error updating the post:', err);
    res.status(500).json({ message: 'Error updating the post' });
  }
});

router.get('/:id', async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      },
    ],
  });

  const post = postData.get({ plain: true });

  res.json(post);
});

// DELETE route for deleting a post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID and ensure it belongs to the authenticated user
    const post = await Post.findOne({
      where: {
        id: postId,
        user_id: req.session.user_id
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    // Delete the post from the database
    await Post.destroy({
      where: {
        id: postId
      }
    });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting the post' });
  }
});
module.exports = router;
