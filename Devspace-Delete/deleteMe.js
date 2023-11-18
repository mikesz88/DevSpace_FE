const token = localStorage.getItem('token');

function deleteMe() {
  fetch('https://devspace.cyclic.app/api/v1/auth/deleteMe', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
      localStorage.removeItem('token');
      window.location.href = '../index.html';
    })
    .catch((error) => {
      alert(`ERROR: ${error}`);
    });
}
