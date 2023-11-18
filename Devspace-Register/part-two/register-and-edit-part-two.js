const token = localStorage.getItem('token');

async function getRandomColorFromAPI() {
  try {
    const response = await fetch(
      'https://devspace.cyclic.app/api/v1/auth/randomColor'
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to get random color:', error);
    return null;
  }
}

async function getRandomAvatarFromAPI() {
  try {
    const response = await fetch(
      'https://devspace.cyclic.app/api/v1/auth/randomAvatar'
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to get random avatar:', error);
    return null;
  }
}

document
  .getElementById('randomColorBtn1')
  .addEventListener('click', async function () {
    const backgroundColorInput = document.getElementById('backgroundColor');
    const color = await getRandomColorFromAPI();
    if (color) {
      backgroundColorInput.value = color;
    }
  });

document
  .getElementById('randomColorBtn2')
  .addEventListener('click', async function () {
    const complimentingColorInput =
      document.getElementById('complimentingColor');
    const color = await getRandomColorFromAPI();
    if (color) {
      complimentingColorInput.value = color;
    }
  });

document
  .getElementById('avatar')
  .addEventListener('click', async function (event) {
    event.preventDefault();
    const avatar = await getRandomAvatarFromAPI();
    if (avatar) {
      document.getElementById('avatar').src = avatar;
    }
  });

document
  .getElementById('completeProfileForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const backgroundColor = document.getElementById('backgroundColor').value;
    const complimentingColor =
      document.getElementById('complimentingColor').value;
    const favSlogan = document.getElementById('favSlogan').value;
    const favMusic = document.getElementById('favMusic').value;
    const avatar = document.getElementById('avatar').src;
    const biography = document.getElementById('biography').value;

    const response = await fetch(
      'https://devspace.cyclic.app/api/v1/auth/updatePartTwo',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          backgroundColor,
          complimentingColor,
          favSlogan,
          favMusic,
          avatar,
          biography,
        }),
      }
    );
    const data = await response.json();

    console.log(data.errors);
    if (response.ok) {
      window.location.href = '/Devspace-Profile-Updated/profile-updated.html';
    } else {
      alert(
        'Failed to complete profile. Please make sure all fields are filled out correctly.'
      );
    }
  });
