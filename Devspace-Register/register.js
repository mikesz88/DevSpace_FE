const registerUser = async (email) => {
  const url = 'https://devspace.cyclic.app/api/v1/auth/register';
  const data = { email };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log('Success:', responseData);
      localStorage.setItem('token', responseData.token);
      window.location.href = './part-one/register-and-edit-part-one.html';
    } else {
      console.log('Error:', responseData);
      alert(responseData.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
const registerButton = document.getElementById('registerButton');

const handleRegistration = () => {
  const emailInput = document.getElementById('email');
  const email = emailInput.value;

  registerUser(email);
};

registerButton.addEventListener('click', handleRegistration);
