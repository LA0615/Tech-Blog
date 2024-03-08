// // comment route
// const commentFormHandler = async (event) => {
//   event.preventDefault();
//   const response = await fetch('/api/users/comment', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (response.ok) {
//     // If successful, redirect the browser to  dashboard
//     document.location.replace('/');
//   } else {
//     // Handle comment failure, for example, display an error message
//     const errorData = await response.json();
//     console.error('Comment failed:', errorData.message);
//   }
// };

// document.getElementById('comment').addEventListener('click', commentFormHandler);

const commentFormHandler = async (event) => {
  event.preventDefault();

  const post_id = window.location.href.split('/posts/')[1];

  console.log(post_id);

  // Get the comment text from the form input
  const commentText = document.getElementById('comment-text').value;

  // Create an object with the comment data
  const commentData = { comment_text: commentText, post_id };

  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData), // Send the comment data in the request body
  });

  if (response.ok) {
    // If successful, redirect the browser to the homepage
    console.log('Comment posted!');
    document.location.reload();
  } else {
    // Handle comment failure, for example, display an error message
    const errorData = await response.json();
    console.error('Comment failed:', errorData.message);
  }
};

document
  .getElementById('comment-form')
  .addEventListener('submit', commentFormHandler);
