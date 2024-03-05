// comment route
const commentFormHandler = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/users/comment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If successful, redirect the browser to  dashboard
    document.location.replace('/');
  } else {
    // Handle comment failure, for example, display an error message
    const errorData = await response.json();
    console.error('Comment failed:', errorData.message);
  }
};

document.getElementById('comment').addEventListener('click', commentFormHandler);
