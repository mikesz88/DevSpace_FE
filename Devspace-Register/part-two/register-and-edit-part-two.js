const token = localStorage.getItem('token');

// Function to generate a random color in hex format
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Event listener for the first random color button
document
  .getElementById('randomColorBtn1')
  .addEventListener('click', function () {
    const backgroundColorInput = document.getElementById('backgroundColor');
    backgroundColorInput.value = getRandomColor();
  });

// Event listener for the second random color button
document
  .getElementById('randomColorBtn2')
  .addEventListener('click', function () {
    const complimentingColorInput =
      document.getElementById('complimentingColor');
    complimentingColorInput.value = getRandomColor();
  });

document
  .getElementById('completeProfileForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    let backgroundColor = document.getElementById('backgroundColor').value;
    let complimentingColor =
      document.getElementById('complimentingColor').value;
    let favSlogan = document.getElementById('favSlogan').value;
    let favMusic = document.getElementById('favMusic').value;
    let avatar = document.getElementById('avatar').value;
    let biography = document.getElementById('biography').value;

    if (!favSlogan && !favMusic && !avatar && !biography) {
      favSlogan = 'Where Words Fail, Music Speaks.';
      favMusic = 'Rock n Roll.';
      avatar = 'https://alienbudgets.s3.amazonaws.com/001-cat.png';
      biography =
        'Melodic Harmony: A Journey Through Sound Born from the heartbeats of humanity, music has woven its way through the fabric of time, transcending eras, cultures, and emotions. From the ancient rhythms of primal drums to the symphonic orchestrations of today, music remains a universal language, speaking to the soul in ways words cannot.';
    }

    let response = await fetch(
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

    if (response.ok) {
      window.location.href =
        '../../Devspace-Profile-Updated/profile-updated.html';
    } else {
      alert(
        'Failed to complete profile. Please make sure all fields are filled out correctly.'
      );
    }
  });
