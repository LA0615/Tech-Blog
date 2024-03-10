const saveChanges = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();

  if (title && content) {
    // Send a POST request to the API endpoint
    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the homepage
        document.location.replace('/');
      } else {
        // Handle login failure, for example, display an error message
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
};
const addPostHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.getElementById('update-post-title').value.trim();
  const content = document.getElementById('update-post-content').value.trim();

  if (title && content) {
    // Send a POST request to the API endpoint
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the homepage
        document.location.replace('/');
      } else {
        // Handle login failure, for example, display an error message
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
};
const deletePostHandler = async (postId) => {
  // Send a DELETE request to the API endpoint
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // If successful, reload the page or update UI as needed
      document.location.reload();
    } else {
      // Handle deletion failure, for example, display an error message
      const errorData = await response.json();
      console.error('Deletion failed:', errorData.message);
    }
  } catch (error) {
    console.error('Error during deletion:', error);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const updatePostModal = document.getElementById('update-post-modal');
  const saveChangesBtn = document.getElementById('save-changes-btn');
  const closeButton = document.getElementById('close-btn');

  let currentPostId = null;

  function openModal(post) {
    const titleInput = document.getElementById('update-post-title');
    const contentInput = document.getElementById('update-post-content');

    // Set the input values based on the post data
    titleInput.value = post.title;
    contentInput.value = post.content;

    // Show the modal
    updatePostModal.style.display = 'block';
    // Handle Save Changes button click
    saveChangesBtn.onclick = function () {
      // Check the method and call the appropriate handler
      if (post.method === 'post') {
        addPostHandler();
      } else {
        saveChanges();
      }

      // After saving, hide the modal
      closeModal();
    };
  }

  //saveChangesBtn.onclick = addPostHandler;

  function closeModal() {
    // Close the modal
    updatePostModal.style.display = 'none';
    currentPostId = null;
  }

  // Handle Delete button click using event delegation
  document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('delete-post-btn')) {
      const postId = event.target.dataset.postid;

      if (confirm('Are you sure you want to delete this post?')) {
        deletePostHandler(postId);
      }
    }
  });

  // Handle Edit button click using event delegation
  document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('edit-post-btn')) {
      currentPostId = event.target.dataset.postid;

      try {
        // Fetch post data from your server using currentPostId
        const response = await fetch(`/api/posts/${currentPostId}`);
        const post = await response.json();

        if (!response.ok) {
          throw new Error(`Failed to fetch post data: ${response.statusText}`);
        }

        openModal(post);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    }
  });

  // Handle Save Changes button click
  saveChangesBtn.addEventListener('click', function () {
    // After saving, hide the modal
    closeModal();
  });

  // Handle close button click
  closeButton.addEventListener('click', closeModal);

  // Handle Create Post button click
  document
    .getElementById('create-post-text')
    .addEventListener('click', function () {
      openModal({ title: '', content: '', method: 'post' });
    });
});

