async function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) {
    try {
      const response = await fetch(
        'https://devspace.cyclic.app/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = '../Devspace-Home/home.html';
      } else {
        alert(
          'Username/Password is invalid or does not exist. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    alert('Please enter both email and password.');
  }
}

document.getElementById('login-btn').addEventListener('click', handleLogin);
