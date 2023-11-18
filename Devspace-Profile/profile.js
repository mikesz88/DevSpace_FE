const token = localStorage.getItem('token');

async function getUserInfo() {
  try {
    const response = await fetch('https://devspace.cyclic.app/api/v1/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}

async function updateProfile() {
  const userData = await getUserInfo();

  if (userData) {
    document.querySelector(
      '.username'
    ).textContent = `Username: ${userData.username}`;
    document.querySelector(
      '.total-friends'
    ).textContent = `Total Friends: ${userData.totalFriends}`;
    document.querySelector(
      '.first-name'
    ).textContent = `First Name: ${userData.firstName}`;
    document.querySelector(
      '.last-name'
    ).textContent = `Last Name: ${userData.lastName}`;
    document.querySelector(
      '.favorite-slogan'
    ).textContent = `Favorite Slogan: ${userData.favSlogan}`;
    document.querySelector(
      '.favorite-music'
    ).textContent = `Favorite Music/Genre: ${userData.favMusic}`;
    document.querySelector(
      '.biography'
    ).textContent = `Biography: ${userData.biography}`;
  }
}

updateProfile();
