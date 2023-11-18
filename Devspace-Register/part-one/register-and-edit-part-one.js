const registrationForm = document.getElementById('registrationForm')

registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  verifyRegistrationInfo()});

function verifyRegistrationInfo() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const username = document.getElementById('username').value;
  const jobTitle = document.getElementById('jobTitle').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const token = localStorage.getItem('token');

  if (password.length < 8) {
    alert('Passwords must be a minimum of 8 characters');
  } else if (password !== confirmPassword) {
    alert('Passwords do not match.');
  } else {
    fetch('https://devspace.cyclic.app/api/v1/auth/updatePartOne', {
      method: 'PATCH',
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        jobTitle,
        password,
        confirmPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error('Error updating resource', error);
      });
    window.location.href = '../part-two/register-and-edit-part-two.html';
  }
}
