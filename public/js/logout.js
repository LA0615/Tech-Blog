// Logout route
const logoutFormHandler = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/users/logout', {
    method: 'POST',
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
};

document.getElementById('logout').addEventListener('click', logoutFormHandler);
