document.addEventListener('DOMContentLoaded', function () {
  const updatePostModal = document.getElementById('update-post-modal');
  const saveChangesBtn = document.getElementById('save-changes-btn');

  let currentPostId = null;

  function openModal(post) {
    const titleInput = document.getElementById('update-post-title');
    const contentInput = document.getElementById('update-post-content');

    // Set the input values based on the post data
    titleInput.value = post.title;
    contentInput.value = post.content;

    // Show the modal
    updatePostModal.style.display = 'block';
  }

  function closeModal() {
    // Close the modal
    updatePostModal.style.display = 'none';
    currentPostId = null;
  }

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
});
