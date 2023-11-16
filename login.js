// Function to handles the login
async function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Check if inputs are not empty
  if (email && password) {
      try {
          // Make a POST request to the /auth/login endpoint
          const response = await fetch('/https://devspace.cyclic.app/api/v1/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
          });

          // Check if response is ok
          if (response.ok) {
              const data = await response.json();
              // Save token to local storage
              localStorage.setItem('token', data.token);
              // Redirect to profile page
              window.location.href = '/profilePage.html';
          } else {
              // Display the error message
              alert('Username/Password is invalid or does not exist. Please try again.');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  } else {
      alert('Please enter both email and password.');
  }
}

// Attaches the function to the submit button
document.getElementById('login-btn').addEventListener('click', handleLogin);