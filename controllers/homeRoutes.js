const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
// try {
//     const postData = await Post.findAll({ 
// include: [
//     {
//           model: User,
//         attributes: ['name'],

//     },
//    ],
//  });
router.get('/',async (req, res) => {
  const posts = [
    {name: 'my post', description: 'This is my post.'},
    {name: 'my post 2', description: 'This is my post 2.'}
  ];
  res.render ('homepage', {posts});
});



 

module.exports = router;