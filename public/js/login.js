document.querySelector('#login-link').addEventListener('click', function () {
  console.log('Login link clicked');
  // Add logic for displaying the login box
  document.getElementById('login-container').style.display = 'block';
});

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
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

// Add event listener for the login form outside the loginFormHandler function
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
