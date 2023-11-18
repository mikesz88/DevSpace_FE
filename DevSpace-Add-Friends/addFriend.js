const token = localStorage.getItem('token');

const fetchAndPopulateAvailableFriends = async () => {
  try {
    const response = await fetch(
      'https://devspace.cyclic.app/api/v1/auth/availableFriends',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const friendsData = await response.json();

    if (response.ok) {
      const friendListSelect = document.getElementById('friendListSelect');

      friendListSelect.innerHTML = '';

      friendsData.data.forEach((username) => {
        const option = document.createElement('option');
        option.value = username;
        option.textContent = username;
        friendListSelect.appendChild(option);
      });
    } else {
      console.log('Error fetching available friends:', friendsData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const addSelectedFriends = async () => {
  const friendListSelect = document.getElementById('friendListSelect');
  const selectedOptions = [...friendListSelect.selectedOptions];

  const selectedValues = selectedOptions.map((option) => option.value);

  const requestData = {
    friendUsernames: selectedValues,
  };

  try {
    const response = await fetch(
      'https://devspace.cyclic.app/api/v1/auth/addFriends',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      console.log('Success:', responseData);
      window.location.href =
        '/Devspace-Friends-Dashboard/friends-dashboard.html';
    } else {
      console.log('Error:', responseData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const addFriendButton = document.getElementById('addFriendButton');
addFriendButton.addEventListener('click', addSelectedFriends);

window.addEventListener('load', fetchAndPopulateAvailableFriends);
